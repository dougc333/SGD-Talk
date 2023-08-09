<?php

namespace Vanderbilt\REDCap\Classes\MyCap\Api\Handler;

use GuzzleHttp\Psr7\LazyOpenStream;
use GuzzleHttp\Psr7\UploadedFile;
use REDCapExt\File;
use Vanderbilt\REDCap\Classes\MyCap\Annotation;
use Vanderbilt\REDCap\Classes\MyCap\Api\DB\ParticipantDB;
use Vanderbilt\REDCap\Classes\MyCap\Api\DB\Project;
use Vanderbilt\REDCap\Classes\MyCap\Api\Exceptions\NotFoundException;
use Vanderbilt\REDCap\Classes\MyCap\Api\Exceptions\ParticipantNotFoundException;
use Vanderbilt\REDCap\Classes\MyCap\Api\Exceptions\SaveException;
use Vanderbilt\REDCap\Classes\MyCap\Api\Exceptions\StudyNotFoundException;
use Vanderbilt\REDCap\Classes\MyCap\Api\Handler\Error\ResultHandlerError;
use Vanderbilt\REDCap\Classes\MyCap\Api\Response;
use Vanderbilt\REDCap\Classes\MyCap\MyCap;
use Vanderbilt\REDCap\Classes\MyCap\MyCapApi;
use Vanderbilt\REDCap\Classes\MyCap\Api\DB\ProjectMapper;
use Vanderbilt\REDCap\Classes\MyCap\SyncIssues;
use Vanderbilt\REDCap\Classes\MyCap\Task;

/**
 * MyCap API Result actions.
 */
class ResultHandler
{

    /** @var array $actions Array of actions this handler implements */
    public static $actions = [
        "SAVE_RESULT" => "saveResult",
        "GET_RESULTS" => "getResults"
    ];

    /**
     * Save result. We try to send a successful response even when there are issues saving the request. Cases:
     * 1) Invalid JSON: Return FAILURE
     * 2) Missing required key: Return FAILURE
     * 3) Invalid project code: Return FAILURE
     * 4) Valid project code, invalid participant code: Save sync issue, return SUCCESS
     * 5) Valid project code, valid participant code, invalid instrument: Save sync issue, return SUCCESS
     * 6) Valid project code, valid participant code, valid instrument, missing field: Save sync issue, return SUCCESS
     * 7) Valid project code, valid participant code, valid instrument, invalid value: Save sync issue, return SUCCESS
     *
     * @param array $data
     * @param int $attemptNumber
     */
    public function saveResult($data, $attemptNumber = 1)
    {
        MyCapApi::validateParameters(
            $data,
            ["stu_code", "par_code", "result"]
        );

        $stu_code = $data['stu_code'];
        $par_code = $data['par_code'];
        $jsonResult = $data['result'];

        try {
            $result = json_decode(
                $jsonResult,
                true
            );
            if (json_last_error() != JSON_ERROR_NONE) {
                $msg = "Could not decode JSON: ";

                switch (json_last_error()) {
                    case JSON_ERROR_DEPTH:
                        $msg .= 'Maximum stack depth exceeded';
                        break;
                    case JSON_ERROR_STATE_MISMATCH:
                        $msg .= 'Underflow or the modes mismatch';
                        break;
                    case JSON_ERROR_CTRL_CHAR:
                        $msg .= 'Unexpected control character found';
                        break;
                    case JSON_ERROR_SYNTAX:
                        $msg .= 'Syntax error, malformed JSON';
                        break;
                    case JSON_ERROR_UTF8:
                        $msg .= 'Malformed UTF-8 characters, possibly incorrectly encoded';
                        break;
                    default:
                        $msg .= 'Unknown error';
                        break;
                }

                /*Log::message(
                    $msg . ' > ' . print_r(
                        $jsonResult,
                        true
                    ),
                    __FILE__,
                    __LINE__
                );*/
                //error_log("---- json array issue ----");
                //error_log($msg .print_r($jsonResult, true));
                Response::sendError(
                    400,
                    ResultHandlerError::INVALID_REQUEST,
                    $msg
                );
            }

            $requiredResultKeys = [
                'taskIdentifier',
                Annotation::TASK_UUID,
                Annotation::TASK_STATUS,
                Annotation::TASK_SUPPLEMENTALDATA
            ];

            $errors = [];

            foreach ($requiredResultKeys as $key) {
                if (!array_key_exists(
                    $key,
                    $result
                )) {
                    $errors[] = "Missing required key: $key";
                }
            }

            if (count($errors)) {
                /*Log::message(
                    json_encode($errors),
                    __FILE__,
                    __LINE__
                );*/
                //error_log("---- errors in required fields ----");
                //error_log(json_encode($errors));
                Response::sendError(
                    400,
                    ResultHandlerError::INVALID_REQUEST,
                    json_encode($errors)
                );
            }

            $responseData = $resultArr = $result;
            // A REDCap instrument/form is a MyCap task
            $instrument = $result['taskIdentifier'];
            unset($result['taskIdentifier']);
            $uuid = $result[Annotation::TASK_UUID];

            // Load Project
            $proj = new Project();
            $projects = $proj->loadByCode($stu_code);

            // Load Participant
            $participant = new ParticipantDB();
            $participants = $participant->loadByCode($par_code);

            $projectMapper = new ProjectMapper($projects['project_id']);
            $responseData['project_id'] = $projects['project_id'];
            // Get projects is id field
            $Proj = new \Project($projects['project_id']);
            $recordIdFieldName = $Proj->table_pk;

            // Saving data for these fields
            $fields = array_combine(
                array_keys($result),
                array_keys($result)
            );
            $fields[$recordIdFieldName] = $recordIdFieldName;
            $fields[Annotation::TASK_SERIALIZEDRESULT] = Annotation::TASK_SERIALIZEDRESULT;

            // REDCap record id = participant id
            $result[$recordIdFieldName] = $participants['record'];

            $projectMapper->repeatInstanceName = $instrument;
            $projectMapper->repeatRecordId = $participants['record'];
            $responseData['record'] = $participants['record'];
            $projectMapper->fields = $fields;

            // If the REDCap project already contains a record for this task UUID then we are updating
            $existingRecord = $projectMapper->oneByFilter("[" . Annotation::TASK_UUID . "] = '$uuid'")->results();

            if (is_array($existingRecord)) {
                $result['redcap_repeat_instance'] = $existingRecord['redcap_repeat_instance'];
            } else {
                $result['redcap_repeat_instance'] = $projectMapper->nextId();
                $result[$projectMapper->completeFieldName()] = ProjectMapper::FIELD_STATUS_INCOMPLETE;
            }
            $responseData['instance'] = $result['redcap_repeat_instance'];
            $responseData['instrument'] = $instrument;
            // Assigning default event id as it supports only non-longitudinal projects
            $responseData['event_id'] = $Proj->firstEventId;
            // Save record
            $savedResult = $projectMapper->save($result);

            $project_id = $projects['project_id'];
            $record = $responseData['record'];
            $instance = $responseData['instance'];
            $dictionary = \REDCap::getDataDictionary($project_id, 'array', false, true, $instrument);
            foreach ($dictionary as $fieldName => $props) {
                if ($props['field_type'] == 'file') {
                    if (strpos($props['field_annotation'], Annotation::TASK_SERIALIZEDRESULT) !== false) {
                        $fieldName = $props['field_name'];
                        $fileFieldName = Annotation::TASK_SERIALIZEDRESULT;
                    } else {
                        $fileFieldName = $fieldName;
                    }
                    if (!isset($_FILES[$fileFieldName]['tmp_name'])) {
                        continue;
                    }
                    $fileData = $_FILES[$fileFieldName];
                    $docSize = $fileData['size'];
                    # Check if file is larger than max file upload limit
                    if (($docSize/1024/1024) > maxUploadSizeEdoc() || $fileData['error'] != UPLOAD_ERR_OK) {
                        continue;
                    }
                    $docId = \Files::uploadFile($fileData, $project_id);

                    # Update tables if file was successfully uploaded
                    if ($docId !== 0) {
                        $this->updateFieldToDocId($record, $fieldName, $docId, $project_id, $instance, $instrument);
                    }
                }
            }
            Response::sendSuccess(["record" => $uuid]);
        } catch (SaveException $e) {
            if ($attemptNumber === 1) {
                $this->saveSyncIssue(
                    $data,
                    $uuid,
                    $instrument,
                    $stu_code,
                    $par_code,
                    SyncIssues::ERROR_COULD_NOT_SAVE_TO_REDCAP,
                    $e->issues
                );
                $fixedResult = self::attemptToFixResult(
                    json_decode(
                        $data['result'],
                        true
                    ),
                    $e->parsedIssues()
                );
                $data['result'] = json_encode($fixedResult);
                $this->saveResult(
                    $data,
                    $attemptNumber + 1
                );
            }
            Response::sendSuccess(["record" => $uuid]);
        } catch (ParticipantNotFoundException $e) {
            $this->saveSyncIssue(
                $data,
                $uuid,
                $instrument,
                $stu_code,
                $par_code,
                SyncIssues::ERROR_COULD_NOT_FIND_PARTICIPANT,
                $e->getMessage()
            );
            Response::sendSuccess(["record" => $uuid]);
        } catch (StudyNotFoundException $e) {
            $this->saveSyncIssue(
                $data,
                $uuid,
                $instrument,
                $stu_code,
                $par_code,
                SyncIssues::ERROR_COULD_NOT_FIND_PROJECT,
                $e->getMessage()
            );
            Response::sendSuccess(["record" => $uuid]);
        } catch (\Exception $e) {
            $this->saveSyncIssue(
                $data,
                $uuid,
                $instrument,
                $stu_code,
                $par_code,
                SyncIssues::ERROR_OTHER,
                $e->getMessage()
            );
            //error_log("---- errors in saving fields ----");
            //error_log($e->getMessage());
            Response::sendError(
                400,
                ResultHandlerError::INVALID_REQUEST,
                $e->getMessage()
            );
        }
    }

    /**
     * @param array $data
     * @param string $uuid
     * @param string $instrument
     * @param string $projectCode
     * @param string $participantCode
     * @param SyncIssues $errorType
     * @param string|array $errorMessage
     * @param string $recordId
     * @throws \Exception
     */
    private function saveSyncIssue($data, $uuid, $instrument, $projectCode, $participantCode, $errorType, $errorMessage)
    {
        $payload = $data;
        unset($payload['expires']);
        unset($payload['signature']);
        $syncIssue['uuid'] = $uuid;
        $syncIssue['receivedDate'] = date("Y-m-d H:i:s");
        $syncIssue['instrument'] = $instrument;
        $syncIssue['participantCode'] = $participantCode;
        $syncIssue['projectCode'] = $projectCode;
        $syncIssue['payload'] = json_encode($payload);
        $syncIssue['errorType'] = $errorType;
        $syncIssue['errorMessage'] = json_encode($errorMessage);
        SyncIssues::save($syncIssue);

        foreach ($data as $key => $val) {
            if (!$val instanceof UploadedFile) {
                continue;
            }
            $path = $_FILES[$key]['tmp_name'];
            if (!file_exists($path)) {
                continue;
            }
            $tempPath = $path . time();
            copy($path, $tempPath);
            $docId = \Files::uploadFile($val);
            if ($docId !== 0) {
                $syncIssueFile['docId'] = $docId;
                // TODO: Save key name so you can match it to a REDCap field more easily
                //$syncIssueFile->key = $key;
                $syncIssueFile['uuid'] = $uuid;
                SyncIssues::saveFile($syncIssueFile);
            }
            copy($tempPath, $path);
            unlink($tempPath);
        }
    }

    /**
     * @param string $record
     * @param string $fieldName
     * @param integer $docId
     * @param integer $project_id
     * @param integer $instance
     * @param string $form_name
     * @return void
     */
    private function updateFieldToDocId($record, $fieldName, $docId, $project_id, $instance, $form_name)
    {
        $Proj = new \Project($project_id);

        $eventId = $Proj->firstEventId; // As project is non-longitudinal
        $isRepeatingForm = $Proj->isRepeatingForm($eventId, $form_name);
        # Check to make sure the record exists
        $sql = "SELECT 1 FROM redcap_data WHERE project_id = $project_id AND record = '".db_escape($record)."' LIMIT 1";
        $result = db_query($sql);
        if (db_num_rows($result) == 0) {
            //The record '$record' does not exist. It must exist to upload a file
            return;
        }

        # Determine if the field exists in the metadata table and if of type 'file'
        $sql = "SELECT 1 FROM redcap_metadata WHERE project_id = $project_id AND field_name = '".db_escape($fieldName)."' AND element_type = 'file'";
        $metadataResult = db_query($sql);
        if (db_num_rows($metadataResult) == 0) {
            // The field '$fieldName' does not exist or is not a 'file' field
            return;
        }

        // If this 'file' field is a Signature field type, then prevent uploading it because signatures
        // can only be created in the web interface.
        if ($Proj->metadata[$fieldName]['element_validation_type'] == 'signature') {
            // The field '$fieldName' is a signature field, which cannot be imported using the API but can only be created using the web interface. However, it can be downloaded or deleted using the API.
            return;
        }

        # Now see if field has had a previous value. If so, update; if not, insert.
        $sql = "SELECT value FROM redcap_data WHERE project_id = $project_id
                                                    AND record = '".db_escape($record)."'
                                                    AND event_id = $eventId
                                                    AND field_name = '".db_escape($fieldName)."'";
        $sql .= $instance > 1 ? " AND instance = '".db_escape($instance)."'" : " AND instance is NULL";
        $result = db_query($sql);

        if (db_num_rows($result) > 0) // row exists
        {
            # Set the file as "deleted" in redcap_edocs_metadata table, but don't really delete the file or the table entry (unless the File Version History is enabled for the project)
            if (!\Files::fileUploadVersionHistoryEnabledProject($project_id)) {
                $id = db_result($result, 0, 0);
                $sql = "UPDATE redcap_edocs_metadata SET delete_date = '" . NOW . "' WHERE doc_id = $id";
                db_query($sql);
            }

            $sql = "UPDATE redcap_data SET value = '$docId' WHERE project_id = $project_id
                                                                AND record = '".db_escape($record)."'
                                                                AND event_id = $eventId
                                                                AND field_name = '".db_escape($fieldName)."'";
            $sql .= $instance > 1 ? " AND instance = '".db_escape($instance)."'" : " AND instance is NULL";
            db_query($sql);
        }
        else // row did not exist
        {
            // Add edoc_id to data table
            $sql = "INSERT INTO redcap_data (project_id, event_id, record, field_name, value, instance)
				VALUES ($project_id, $eventId, '".db_escape($record)."', '$fieldName', '$docId', ".($instance > 1 ? "'".db_escape($instance)."'" : "null").")";
            db_query($sql);
        }

        // If the File Upload field's instrument is a repeating instrument, then make sure there is a value stored for the form status field
        if ($isRepeatingForm)
        {
            $sql = "select 1 from redcap_data where project_id = $project_id and event_id = $eventId and record = '".db_escape($record)."' 
				and instance ".($instance > 1 ? "= '".db_escape($instance)."'" : "is null")." and field_name = '".db_escape($form_name."_complete")."'";
            $formCompleteValueExists = db_num_rows(db_query($sql));
            if (!$formCompleteValueExists)
            {
                $sql = "INSERT INTO redcap_data (project_id, event_id, record, field_name, value, instance)
                    VALUES ($project_id, $eventId, '".db_escape($record)."', '".db_escape($form_name."_complete")."', '0', ".($instance > 1 ? "'".db_escape($instance)."'" : "null").")";
                db_query($sql);
            }
        }
    }

    /**
     * A result could not be saved to REDCap for some reason. Attempt to determine what the problem is based on issues
     * and delete the offending field. We want to save as much data as possible to REDCap and then let the
     * investigator figure out what to do with the unsavable data. Example:
     *
     * Original Dropdown | Changed Dropdown
     *  1, Chocolate     |  1, Chocolate
     *  2, Vanilla       |  2, Vanilla
     *  3, Strawberry    |  5, Strawberry
     *
     * Receiving a value of 3 will be problematic since REDCap is now using value 5 for Strawberry. We want to delete
     * the dropdown value from the data result and re-save.
     *
     * @param array $result
     * @param array $issues Array returned from REDCapExt\ProjectMapper\SaveException->parseIssues()
     * @return array
     */
    private static function attemptToFixResult($result, $issues)
    {
        foreach ($issues as $issue) {
            if ($issue['parseSuccessful']) {
                $field = $issue['key'];
                if (array_key_exists($field, $result)) {
                    unset($result[$field]);
                }
            }
        }
        return $result;
    }

    /**
     * Get results for a participant. Called when restoring device state (Someone changes phones or such). This converts
     * REDCap instrument data into MyCap Results
     *
     * @param array $data
     */
    public function getResults($data)
    {

        MyCapApi::validateParameters(
            $data,
            ["stu_code", "par_code"]
        );

        $stu_code = $data['stu_code'];
        $par_code = $data['par_code'];

        try {
            // Load Project
            $proj = new Project();
            $projects = $proj->loadByCode($stu_code);

            // Load Participant
            $participant = new ParticipantDB();
            $participants = $participant->loadByCode($par_code);

            // Create a temp folder for this participant's results
            //$tempFolder = APP_PATH_TEMP . $par_code . '/';
            $tempFolder = APP_PATH_TEMP;
            /*if (!is_dir($tempFolder)) {
                $wasCreated = mkdir(
                    $tempFolder,
                    0700,
                    true
                );
                if (!$wasCreated) {
                    Log::message(
                        "Unable to create a folder at path: $tempFolder",
                        __FILE__,
                        __LINE__
                    );
                    throw new \Exception("Server cannot write to temporary directory");
                }
            }*/

            $count = 0;

            $record = $participants['record'];
            $count = self::processTaskResults(
                $projects['project_id'],
                $record,
                $tempFolder
            );

            $successData = [
                'count' => $count
            ];

            if ($count) {
                $stream = self::compressResults(
                    $tempFolder,
                    str_replace("-","_", $par_code)
                );

                $zipData = $stream->getContents();
                self::rmdirRecursive($tempFolder);
                $successData['file'] = base64_encode($zipData);
            }

            //self::rmdirRecursive($tempFolder);
            Response::sendSuccess($successData);
        } catch (\Exception $e) {
            /*Log::message(
                $e->getMessage(),
                __FILE__,
                __LINE__
            );*/
            Response::sendError(
                400,
                ResultHandlerError::INVALID_REQUEST,
                $e->getMessage()
            );
        }
    }

    /**
     * Each task result has a result.zip file containing a [BA56A4DA-4CDE-4703-B4FB-79BBB23354C1].json file stored in
     * the "serialized result" file upload field. Loop through each task result and decompress the zip result.zip file
     * to a temporary directory.
     *
     * @param integer $projectId
     * @param string $record
     * @param string $directoryPath
     * @return int How many tasks have a serialized result
     */
    private function processTaskResults($projectId, $record, $directoryPath)
    {
        $myCapProj = new MyCap($projectId);
        $tasks = $myCapProj->tasks;
        $forms = [];
        foreach ($tasks as $task => $details) {
            $forms[] = $task;
        }
        $map = array();
        $data = \REDCap::getDataDictionary($projectId, 'array', false, true, $forms);
        foreach ($data as $field => $fieldDetails) {
            $map[$field] = $fieldDetails['field_annotation'];
        }

        $data = \REDCap::getData(
            $projectId,
            'array',
            array($record),
            array_keys($map)
        );

        $count = 0;
        $zip = new \ZipArchive();

        foreach ($data as $record=>&$event_data)
        {
            foreach (array_keys($event_data) as $event_id)
            {
                if ($event_id == 'repeat_instances') {
                    $eventNormalized = $event_data['repeat_instances'];
                } else {
                    $eventNormalized = array();
                    $eventNormalized[$event_id][""][0] = $event_data[$event_id];
                }
                foreach ($eventNormalized as $event_id=>&$data1)
                {
                    foreach ($data1 as $repeat_instrument=>&$data2)
                    {
                        foreach ($data2 as $instance=>&$data3)
                        {
                            foreach ($data3 as $field=>$value)
                            {
                                if (strpos($map[$field], Annotation::TASK_SERIALIZEDRESULT) !== false) {
                                    if ($value == '' || $value == 0) {
                                        continue;
                                    }

                                    $fileId = $value;

                                    if (is_numeric($fileId)) {
                                        $file = self::fileForEdocId($fileId);
                                        $raw = base64_decode($file->base64contents);

                                        $zipFile = $directoryPath . $fileId . ".zip";
                                        file_put_contents(
                                            $zipFile,
                                            $raw
                                        );

                                        $res = $zip->open($zipFile);
                                        if ($res === true) {
                                            $zip->extractTo($directoryPath);
                                            $zip->close();
                                            $count += 1;
                                        }
                                        unlink($zipFile);
                                    } else {
                                        /*Log::message(
                                            "Could not restore task result $resultUuid for $participantIdentifier because the serialized " .
                                            "result file appears to be missing.",
                                            __FILE__,
                                            __LINE__
                                        );*/
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            unset($data[$record], $event_data, $data1, $data2, $data3);
        }
        return $count;
    }

    /**
     * Get a file from EDOC storage
     *
     * @param $id
     * @return bool|Object
     */
    public static function fileForEdocId($id)
    {
        // Uses an internal REDCap method for retrieving files. See /redcap_vX.X.X/Classes/Files.php
        $attributes = \Files::getEdocContentsAttributes($id);

        if ($attributes === false) {
            return false;
        }

        $file = new \stdClass();
        $file->mimeType = $attributes[0];
        $file->name = $attributes[1];
        $file->base64contents = base64_encode($attributes[2]);

        return $file;
    }

    /**
     * Recursively delete a directory and all of it's contents - e.g.the equivalent of `rm -r` on the command-line.
     *
     * @see http://php.net/manual/en/function.rmdir.php
     * @param string $dir absolute path to directory to delete
     * @return bool true on success; false on failure
     */
    public static function rmdirRecursive($dir)
    {
        $files = array_diff(
            scandir($dir),
            array('.', '..')
        );
        foreach ($files as $file) {
            (is_dir("$dir/$file")) ? "" : unlink("$dir/$file");
        }
        return "";
    }

    /**
     * The tempFolder will contain many json files that we want to compress into a single results.zip file.
     * Decompressing will have a results folder with JSON files
     *   results/
     *           BA56A4DA-4CDE-4703-B4FB-79BBB23354C1.json
     *           BEE145A6-40E6-4A54-A244-48401B134D14.json
     *           etc...
     *
     * I initially wanted to password protect the zip file but ZipArchive::setEncryptionName is only available in
     * PHP 7.2+. The request itself requires a valid HMAC signature, so I'm unsure password protecting will actually
     * add much security.
     *
     * @param string $tempFolder Directory containing all files we want to compress
     * @param string $par_code
     * @return LazyOpenStream
     */
    private function compressResults($tempFolder, $par_code)
    {
        $permitted_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $rand = substr(str_shuffle($permitted_chars), 0, 10);

        // Set the target zip file to be saved in the temp dir (set timestamp in filename as 1 hour from now so that
        // it gets deleted automatically in 1 hour)
        $inOneHour = date(
            "YmdHis",
            mktime(
                date("H") + 1,
                date("i"),
                date("s"),
                date("m"),
                date("d"),
                date("Y")
            )
        );
        $zipfile = $tempFolder . "{$inOneHour}_{$par_code}_{$rand}.zip";

        $zip = new \ZipArchive();

        if ($zip->open(
            $zipfile,
            \ZipArchive::CREATE
        ) === true) {
            $options = array('add_path' => './results/', 'remove_all_path' => true);
            $zip->addGlob(
                $tempFolder . '*.json',
                0,
                $options
            );
            $zip->close();
        } else {
            /*Log::message(
                "Could not compress task results for $par_code to zip file: $zipfile.",
                __FILE__,
                __LINE__
            );*/
        }

        try {
            $stream = new LazyOpenStream(
                $zipfile,
                'r'
            );
            return $stream;
        } catch (\Exception $e) {
            echo 'here!';
        }
    }
}
