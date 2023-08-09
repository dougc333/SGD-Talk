<?php

namespace Vanderbilt\REDCap\Classes\MyCap;

use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Promis;
use Vanderbilt\REDCap\Classes\ProjectDesigner;

class Task
{
    const AMSLERGRID = '.AmslerGrid';
    const AUDIO = '.Audio';
    const DBHLTONEAUDIOMETRY = '.DbhlToneAudiometry';
    const FITNESSCHECK = '.FitnessCheck';
    /** Custom task. Display all fields as a form */
    const FORM = '.Form';
    const HOLEPEG = '.HolePeg';
    /** PROMIS computer adaptive test from REDCap Shared Library */
    const PROMIS = '.PROMIS';
    const PSAT = '.PSAT';
    /** Custom task. Display all fields as individual qustions */
    const QUESTIONNAIRE = '.Questionnaire';
    const RANGEOFMOTION = '.RangeOfMotion';
    const REACTIONTIME = '.ReactionTime';
    const SHORTWALK = '.ShortWalk';
    const SPATIALSPANMEMORY = '.SpatialSpanMemory';
    const SPEECHINNOISE = '.SpeechInNoise';
    const SPEECHRECOGNITION = '.SpeechRecognition';
    const STROOP = '.Stroop';
    const TIMEDWALK = '.TimedWalk';
    const TONEAUDIOMETRY = '.ToneAudiometry';
    const TOWEROFHANOI = '.TowerOfHanoi';
    const TRAILMAKING = '.TrailMaking';
    const TWOFINGERTAPPINGINTERVAL = '.TwoFingerTappingInterval';
    /** Custom active task for Alex Gelbard */
    const VUMCAUDIORECORDING = '.VumcAudioRecording';
    const VUMCCONTRACTIONTIMER = '.VumcContractionTimer';

    const TYPE_CONTRACTIONTIMER = '.ContractionTimer';
    const TYPE_DATELINE = '.DateLine';
    const TYPE_PERCENTCOMPLETE = '.Percent';

    public static $typeEnum = [
        self::TYPE_CONTRACTIONTIMER,
        self::TYPE_DATELINE,
        self::TYPE_PERCENTCOMPLETE
    ];

    /** Task Schedule vars */

    const ENDS_NEVER = '.Never';
    const ENDS_AFTERCOUNT = '.AfterCountOccurrences';
    const ENDS_AFTERDAYS = '.AfterNDays';
    const ENDS_ONDATE = '.OnDate';

    const FREQ_DAILY = '.Daily';
    const FREQ_MONTHLY = '.Monthly';
    const FREQ_WEEKLY = '.Weekly';

    const TYPE_FIXED = '.Fixed';
    const TYPE_INFINITE = '.Infinite';
    const TYPE_ONETIME = '.OneTime';
    const TYPE_REPEATING = '.Repeating';

    const RELATIVETO_JOINDATE = '.JoinDate';
    const RELATIVETO_ZERODATE = '.ZeroDate';

    public static $requiredAnnotations = [
        Annotation::TASK_UUID,
        Annotation::TASK_STARTDATE,
        Annotation::TASK_ENDDATE,
        Annotation::TASK_SCHEDULEDATE,
        Annotation::TASK_STATUS,
        Annotation::TASK_SUPPLEMENTALDATA,
        Annotation::TASK_SERIALIZEDRESULT
    ];
     /**
     * Returns human readable string for the given format
     *
     * @param string $format
     * @return string
     */
    public static function toString($format)
    {
        switch ($format) {
            case self::FORM:
                $retVal = 'Form';
                break;
            case self::QUESTIONNAIRE:
                $retVal = 'Questionnaire';
                break;
            default:
                $retVal = 'Invalid Format';
                break;
        }
        return $retVal;
    }

    /**
     * Get all fields of form having specific data type
     *
     * @param string $field_type
     * @param string $form
     * @return array
     */
    public static function getDataTypeBasedFieldsList($field_type, $form)
    {
        global $Proj, $lang;
        $fields[''] = '-- '.$lang['random_02'].' --';

        switch ($field_type) {
            case 'date':
                $fields_pre = \Form::getFieldDropdownOptions(true, false, false, false, array('date', 'date_ymd', 'date_mdy', 'date_dmy'), false, false);
                break;

            case 'time':
                $fields_pre = \Form::getFieldDropdownOptions(true, false, false, false, array('time', 'time_hh_mm_ss'), false, false);
                break;

            case 'numeric':
                $fields_pre = \Form::getFieldDropdownOptions(true, false, false, false, array('int', 'float'), false, false);
                break;
        }

        foreach ($fields_pre as $this_field=>$this_label) {
            $this_form_label = strip_tags($lang['alerts_243']." \"".$Proj->forms[$Proj->metadata[$this_field]['form_name']]['menu']."\"");
            $this_form = $Proj->metadata[$this_field]['form_name'];
            $this_label = preg_replace('/'.$this_field.'/', "[$this_field]", $this_label, 1);
            list ($this_label2, $this_label1) = explode(" ", $this_label, 2);
            if ($this_form == $form) {
                if ($Proj->longitudinal) {
                    foreach ($Proj->eventsForms as $this_event_id=>$these_forms) {
                        if (in_array($this_form, $these_forms)) {
                            if (!isset($datetime_fields[$this_form_label]["[$this_field]"])) {
                                $fields["[$this_field]"] = "$this_label1 " . $lang['alerts_237'] . " - $this_label2";
                            }
                            $this_event_name = $Proj->getUniqueEventNames($this_event_id);
                            $fields["[$this_event_name][$this_field]"] = "$this_label1 (".$Proj->eventInfo[$this_event_id]['name_ext'].") - $this_label2";
                        }
                    }
                } else {
                    $fields["[$this_field]"] = "$this_label1 $this_label2";
                }
            }
        }
        return $fields;
    }

    /**
     * Get days listing of week
     *
     * @return array
     */
    public static function getDaysOfWeekList() {
        global $lang;
        return 	array("1"=>$lang['global_99'], "2"=>$lang['global_100'], "3"=>$lang['global_101'],
            "4"=>$lang['global_102'], "5"=>$lang['global_103'], "6"=>$lang['global_104'],
            "7"=>$lang['global_105']);
    }

    /**
     * Display friendly string of task schedule description
     *
     * @param int $taskId
     * @return string
     */
    public static function displayTaskSchedule($taskId)
    {

        $sql = "SELECT schedule_type, schedule_frequency, schedule_interval_week, schedule_days_of_the_week, schedule_interval_month,
                        schedule_days_of_the_month, schedule_days_fixed, schedule_relative_offset, schedule_ends, schedule_end_count, schedule_end_after_days, schedule_end_date
                FROM 
                    redcap_mycap_tasks
                WHERE 
                    task_id='".(int)$taskId."'
                LIMIT 1";
        $result = db_query($sql);
        $details = db_fetch_assoc($result);
        db_free_result($result);

        if ($details['schedule_type'] == self::TYPE_ONETIME) {
            $retVal = 'One time';
        } elseif ($details['schedule_type'] == self::TYPE_INFINITE) {
            $retVal = 'Infinite';
        } elseif ($details['schedule_type'] == self::TYPE_REPEATING) {
            $retVal = 'Repeats';

            if ($details['schedule_frequency'] == self::FREQ_DAILY) {
                $retVal .= ' daily';
            } elseif ($details['schedule_frequency'] == self::FREQ_WEEKLY) {
                if (is_numeric($details['schedule_interval_week'])) {
                    if ($details['schedule_interval_week'] == 1) {
                        $retVal .= ' every week';
                    } elseif ($details['schedule_interval_week'] > 1) {
                        $retVal .= ' every ' . $details['schedule_interval_week'] . ' weeks';
                    }

                    if (strlen($details['schedule_days_of_the_week'])) {
                        $dayInts = explode(',', $details['schedule_days_of_the_week']);
                        $daysOfWeek = self::getDaysOfWeekList();
                        if (count($dayInts)) {
                            foreach ($dayInts as $day) {
                                $dayStrings[] = $daysOfWeek[$day];
                            }
                            $retVal .= ' on ' . implode(', ', $dayStrings);
                        }
                    }
                }
            } elseif ($details['schedule_frequency'] == self::FREQ_MONTHLY) {
                if (is_numeric($details['schedule_interval_month'])) {
                    if ($details['schedule_interval_month'] == 1) {
                        $retVal .= ' every month';
                    } elseif ($details['schedule_interval_month'] > 1) {
                        $retVal .= ' every ' . $details['schedule_interval_month'] . ' months';
                    }

                    if (strlen($details['schedule_days_of_the_month'])) {
                        $dayInts = explode(',', $details['schedule_days_of_the_month']);
                        if (count($dayInts)) {
                            foreach ($dayInts as $day) {
                                if (substr($day, -1) == 1 && $day != 11)  $dayStrings[] = $day."st"; // check if last digit is 1 exa. 1,21,31
                                elseif(substr($day, -1) == 2 && $day != 12) $dayStrings[] = $day."nd"; // check if last digit is 2 exa. 2,22
                                elseif(substr($day, -1) == 3 && $day != 13) $dayStrings[] = $day."rd"; // check if last digit is 3 exa. 3,23
                                else $dayStrings[] = $day."th";
                            }
                            $retVal .= ' on ' . implode(', ', $dayStrings);
                        }
                    }
                }
            }
        } elseif ($details['schedule_type'] == self::TYPE_FIXED) {
            $retVal = 'Fixed';
        } else {
            $retVal = 'Invalid schedule';
        }

        return $retVal;
    }

    /**
     * Returns list of all mycap task settings
     *
     * @param integer $projectId
     * @param integer $taskId
     *
     * @return array
     */
    public static function getAllTasksSettings($projectId, $taskId = null)
    {
        global $Proj;

        $sql = "SELECT * FROM redcap_mycap_tasks WHERE project_id = $projectId";
        if (is_numeric($taskId)) $sql .= " AND task_id = $taskId";

        $q = db_query($sql);
        $tasks = array();
		$tasks_order = array();
        while ($row = db_fetch_assoc($q))
        {
            // Add task information
            foreach ($row as $key=>$value)
            {
                if ($key != 'project_id' && $key != 'task_id') {
                    // Remove any HTML from task title
                    if ($key == 'task_title') $value = label_decode($value);

                    // Add to array
                    $tasks[$row['task_id']][$key] = $value;
                }
            }
            // Make sure tasks are in form order
            $tasks_order[$row['task_id']] = $Proj->forms[$row['form_name']]['form_number'];
        }
        // Make sure tasks are in form order
        asort($tasks_order);
        $tasks_ordered = array();
        foreach ($tasks_order as $this_task_id=>$order) {
            $tasks_ordered[$this_task_id] = $tasks[$this_task_id];
        }
        // Return array of task(s) attributes
        if ($taskId == null) {
            return $tasks_ordered;
        } else {
            return $tasks_ordered[$taskId];
        }
        return $tasks_ordered;
    }

    /**
     * Merges PROMIS battery instruments with the instrument list from the REDCap online designer. Intent is to
     * determine which instruments belong to the same battery (group) and in which position each instrument falls
     * within the battery. Returns a structure:
     * [
     *   'promis_instrument_a' => BatteryInstrument(
     *     'batteryPosition' = 1,
     *     'instrumentPosition' = 1,
     *     'title' = 'PROMIS Instrument A'
     *   ],
     *   'promis_instrument_b' => BatteryInstrument(
     *     'batteryPosition' = 1,
     *     'instrumentPosition' = 2,
     *     'title' = 'PROMIS Instrument B'
     *   ],
     *   'another_instrument_x' => BatteryInstrument(
     *     'batteryPosition' = 2,
     *     'instrumentPosition' = 1,
     *     'title' = 'Another instrument X'
     *   ],
     * ]
     *
     * @param $pid
     * @param array $instruments This is an array of instruments ordered as they appear in the Online Designer
     * @return \REDCapExt\Promis\BatteryInstrument[]
     */
    public static function batteryInstrumentPositions()
    {
        global $Proj;
        $instruments = $Proj->forms;

        $batteryInstruments = PromisApi::batteryInstruments();
        if (!count($batteryInstruments)) {
            return [];
        }

        $identifierKeyMap = [];
        foreach ($batteryInstruments as $instrument) {
            $identifierKeyMap[$instrument['form_name']] = $instrument['promis_battery_key'];
        }

        $retVal = [];
        $batteryPosition = [];
        $instrumentPosition = [];
        foreach ($instruments as $identifier => $form) {
            if (!array_key_exists($identifier, $identifierKeyMap)) {
                continue;
            }
            $batteryKey = $identifierKeyMap[$identifier];
            if (!in_array($batteryKey, $batteryPosition)) {
                $batteryPosition[] = $batteryKey;
            }
            if (!array_key_exists($batteryKey, $instrumentPosition)) {
                $instrumentPosition[$batteryKey] = 0;
            }
            $instrumentPosition[$batteryKey] += 1;
            $retVal[$identifier]['batteryPosition'] = array_search($batteryKey, $batteryPosition) + 1;
            $retVal[$identifier]['instrumentPosition'] = $instrumentPosition[$batteryKey];
            $retVal[$identifier]['title'] = $form['menu'];
        }
        return $retVal;
    }

    /**
     * Returns list of all issues if instrument is from unsupported PROMIS instruments list
     *
     * @param string $instrument
     *
     * @return array
     */
    public static function getUnsupportedPromisInstrumentsIssues($instrument) {
        global $Proj;
        $key = \PROMIS::getPromisKey($instrument);
        $issues = array();
        if (in_array($key, Promis::unsupportedPromisInstruments())) {
            $issues[] = "The instrument \"".$Proj->forms[$instrument]['menu']."\" is a health measure that is not currently supported by MyCap.";
        }
        return $issues;
    }

    /**
     * Erase the sync issues for a record/instance or record/form/instance (if a user deletes all the data for a form)
     *
     * @param integer $project_id
     * @param string $record
     * @param string $instance
     *
     * @return void
     */
    public static function eraseMyCapSyncIssues($project_id, $record, $instance=1)
    {
        $uuids = self::getUUIDFieldValue($project_id, $record, $instance);
        // Remove MyCap Sync issues
        if (!empty($uuids)) {
            $sql = "DELETE FROM redcap_mycap_syncissues WHERE uuid IN ('".implode("', '", $uuids)."')";
            db_query($sql);
        }
    }

    /**
     * Check if instruments contains any error
     *
     * @param string $form
     * @param integer $projectId
     *
     * @return array
     */
    public static function checkErrors($form, $projectId)
    {
		global $lang;
		$errors = [];
        $warnings = [];

		// Error if this instrument contains the randomization field
		if ($GLOBALS['randomization'] && \Randomization::setupStatus($projectId)) {
			$Proj = new \Project($projectId);
			$randAttr = \Randomization::getRandomizationAttributes($projectId);
			$randomization_form = $Proj->metadata[$randAttr['targetField']]['form_name'];
			if ($form == $randomization_form) {
				$errors[] = $lang['mycap_mobile_app_690'];
			}
		}

		if (empty($errors)) {
            $currentDictionary = \REDCap::getDataDictionary(
                $projectId,
                'array',
                false,
                array(),
                $form
            );

            $instrumentDictionary = self::splitDictionaryByInstrument($currentDictionary);
            $dictionary = self::joinDictionaryInstruments($instrumentDictionary);

            $dataDictionary = self::convertFlatMetadataToDDarray($dictionary);

            list ($errors, $warnings, $dataDictionary) = \MetaData::error_checking($dataDictionary, false, false, true);
            // Ignore Randamization error as this is already handled
            unset($errors[30]);
        }
        return array($errors, $warnings);
    }

    /**
     * Split Dictionary By Instrument
     *
     * @param array $dictionary
     *
     * @return array
     */
    private static function splitDictionaryByInstrument($dictionary)
    {
        $split = [];
        foreach ($dictionary as $fieldName => $field) {
            $split[$field['form_name']][$fieldName] = $field;
        }
        return $split;
    }

    /**
     * Join Dictionary Instruments
     *
     * @param array $splitDictionary
     *
     * @return array
     */
    private static function joinDictionaryInstruments($splitDictionary)
    {
        $join = [];
        foreach ($splitDictionary as $instrument => $fields) {
            $join = array_merge($join, $fields);
        }
        return $join;
    }

    /**
     * Convert a flat item-based metadata array into Data Dictionary array with specific Excel-cell-named keys-subkeys (e.g. A1)
     *
     * @param array $data
     *
     * @return array
     */
    public static function convertFlatMetadataToDDarray($data)
    {
        $csv_cols = \MetaData::getCsvColNames();
        $dd_array = array();
        $r = 1; // Start with 1 so that the record ID field gets row 2 position (assumes headers in row 1)

        foreach($data as $row)
        {
            ++$r;
            $row_keys = array_keys($row);

            foreach($csv_cols as $n => $l)
            {
                if(!isset($dd_array[$l]))
                {
                    $dd_array[$l] = array();
                }

                $dd_array[$l][$r] = $row[$row_keys[$n-1]];
            }
        }
        return $dd_array;
    }

    /**
     * Get list of missing annotations required for MyCap
     *
     * @param string $form
     *
     * @return array
     */
    public static function getMissingAnnotationList($form)
    {
        $fields = \MetaData::getDataDictionary('array', false, array(), array($form));

        $requiredAnnotations = self::$requiredAnnotations;
        foreach ($fields as $field) {
            if (count($requiredAnnotations) === 0) {
                break;
            }
            foreach ($requiredAnnotations as $idx => $annotation) {
                if (strpos(
                        $field['field_annotation'],
                        $annotation
                    ) !== false) {
                    unset($requiredAnnotations[$idx]);
                    continue 2;
                }
            }
        }
        return $requiredAnnotations;
    }

    /**
     * Get Error text for missing annotations required for MyCap
     *
     * @param array $missingAnnotations
     *
     * @return string
     */
    public static function getMissingAnnotationErrorText($missingAnnotations)
    {
        global $lang;

        $errorText = '';
        if (count($missingAnnotations) > 0) {
            foreach ($missingAnnotations as $annotation) {
                $list[] = $annotation;
            }
            $errorText = $lang['mycap_mobile_app_703']."<br>".$lang['mycap_mobile_app_704']." ";
            if (!empty($list)) $errorText .= "<code><b>".implode(", ", $list)."</b></code>";
        }

        return $errorText;
    }

    /**
     * Get Error text for missing annotations required for MyCap
     *
     * @param array $missingAnnotations
     *
     * @return string
     */
    public static function getMissingAnnotationErrorTextForAll($forms)
    {
        global $lang, $Proj;
        $errorText = '';
        if (count($forms) > 0) {
            $errorText = $lang['mycap_mobile_app_703']."<br>".$lang['mycap_mobile_app_698']." ";
            $errorText .= '<ul>';
            foreach ($forms as $form) {
                $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
            }
            $errorText .= '</ul>';
        }

        return $errorText;
    }

    /**
     * Fix Missing annotations issues for instrument
     *
     * @param array $missingAnnotations
     * @param string $form
     *
     * @return void
     */
    public static function fixMissingAnnotationsIssues($missingAnnotations, $form)
    {
        $fieldsArr = self::getFormFields($missingAnnotations);
        if (count($fieldsArr) > 0) {
            global $Proj;
            $Proj->loadMetadata();
            $projectDesigner = new ProjectDesigner($Proj);

            foreach ($fieldsArr as $field) {
                $field['field_name'] = ActiveTask::getNewFieldName($field['field_name']);
                $projectDesigner->createField($form, $field);
                if ($field['field_annotation'] == Annotation::TASK_UUID) {
                    $section_header_field = array('field_label' => 'MyCap App Fields - Do Not Modify',
                                                'field_type' => 'section_header');
                    $projectDesigner->createField($form, $section_header_field, $field['field_name'], true);
                }
            }
        }
    }

    /**
     * Get list of form fields to add Missing annotations fields for instrument
     *
     * @param array $missingAnnotations
     *
     * @return array
     */
    public static function getFormFields($missingAnnotations) {
        foreach ($missingAnnotations as $annotation) {
            switch ($annotation) {
                case Annotation::TASK_UUID:
                    $fieldArr[] = array('field_name' => 'uuid',
                                        'field_label' => 'UUID',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_UUID);
                    break;
                case Annotation::TASK_STARTDATE:
                    $fieldArr[] = array('field_name' => 'startdate',
                                        'field_label' => 'Start Date',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_STARTDATE);
                    break;
                case Annotation::TASK_ENDDATE:
                    $fieldArr[] = array('field_name' => 'enddate',
                                        'field_label' => 'End Date',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_ENDDATE);
                    break;
                case Annotation::TASK_SCHEDULEDATE:
                    $fieldArr[] = array('field_name' => 'scheduledate',
                                        'field_label' => 'Schedule Date',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_SCHEDULEDATE);
                    break;
                case Annotation::TASK_STATUS:
                    $choices = "0, Deleted \\n 1, Completed \\n 2, Incomplete";
                    $fieldArr[] = array('field_name' => 'status',
                                        'field_label' => 'Status',
                                        'field_type' => 'select',
                                        'element_enum' => $choices,
                                        'field_annotation' => Annotation::TASK_STATUS);
                    break;
                case Annotation::TASK_SUPPLEMENTALDATA:
                    $fieldArr[] = array('field_name' => 'supplementaldata',
                                        'field_label' => 'Supplemental Data (JSON)',
                                        'field_type' => 'textarea',
                                        'field_annotation' => Annotation::TASK_SUPPLEMENTALDATA);
                    break;
                case Annotation::TASK_SERIALIZEDRESULT:
                    $fieldArr[] = array('field_name' => 'serializedresult',
                                        'field_label' => 'Serialized Result',
                                        'field_type' => 'file',
                                        'field_annotation' => Annotation::TASK_SERIALIZEDRESULT);
                    break;
            }
        }
        return $fieldArr;
    }

    /**
     * Returns all values of fields having annotation set to "@MC-TASK-UUID"
     *
     * @param integer $projectId
     * @param string $record
     * @param integer $instanceNum
     *
     * @return array
     */
    public static function getUUIDFieldValue($projectId, $record, $instanceNum = '') {
        $dictionary = \REDCap::getDataDictionary($projectId, 'array', false, true);

        foreach ($dictionary as $field => $fieldDetails) {
            if (strpos($fieldDetails['field_annotation'], Annotation::TASK_UUID) !== false) {
                $map[$field] = $fieldDetails['field_annotation'];
            }
        }
        $data = \REDCap::getData(
            $projectId,
            'array',
            array($record)
        );
        $uuid = array();
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
                            if ($instanceNum != '') {
                                if ($instanceNum == $instance) {
                                    foreach ($data3 as $field=>$value)
                                    {
                                        if (array_key_exists($field, $map) && $value != '') {
                                            $uuid[] = $value;
                                        }
                                    }
                                }
                            } else {
                                foreach ($data3 as $field=>$value)
                                {
                                    if (isset($map) && is_array($map) && $value != '' && array_key_exists($field, $map)) {
                                        $uuid[] = $value;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            unset($data[$record], $event_data, $data1, $data2, $data3);
        }
        return $uuid;
    }

    /**
     * Returns all MyCap Task errors for selected instrument
     *
     * @param string $form
     *
     * @return array
     */
    public static function getMyCapTaskErrors($form = '') {
        global $Proj, $myCapProj, $lang;
        $errors = array();
        if ($form == '') {
            foreach ($Proj->forms as $form => $attr) {
                if ($myCapProj->tasks[$form]['enabled_for_mycap'] == 1) {
                    $missingAnnotations = self::getMissingAnnotationList($form);
                    if (!empty($missingAnnotations)) {
                        $missingAnnotationsForms[] = $form;
                    }
                    if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                        $errorRepeatingForms[] = $form;
                    }
                }
            }
            if (!empty($missingAnnotationsForms)) {
                $errors[] = self::getMissingAnnotationErrorTextForAll($missingAnnotationsForms);
            }

            if (!empty($errorRepeatingForms)) {
                $errorText = $lang['mycap_mobile_app_699'];
                $errorText .= '<ul>';
                foreach ($errorRepeatingForms as $form) {
                    $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
                }
                $errorText .= '</ul>';
                if (!empty($list)) $errorText .= "<code><b>".implode(", ", $list)."</b></code>";
                $errors[] = $errorText;
            }
        } else {
            $missingAnnotations = self::getMissingAnnotationList($form);
            if (!empty($missingAnnotations)) {
                $missingAnnotationsError = self::getMissingAnnotationErrorText($missingAnnotations);
                $errors[] = $missingAnnotationsError;
            }
            if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                $errors[] = $lang['mycap_mobile_app_588'];
            }
        }

        return $errors;
    }

    /**
     * Fix all MyCap Task errors for selected instrument
     *
     * @param string $form
     *
     * @return void
     */
    public static function fixMyCapTaskErrors($form) {
        global $Proj;
        if ($form == '') {
            foreach ($Proj->forms as $form => $attr) {
                $missingAnnotations = self::getMissingAnnotationList($form);
                if (count($missingAnnotations) > 0) {
                    self::fixMissingAnnotationsIssues($missingAnnotations, $form);
                }
                if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                    // Make this form as repeatable with default eventId as project is classic
                    $sql = "INSERT INTO redcap_events_repeat (event_id, form_name) 
                    VALUES ({$Proj->firstEventId}, '" . db_escape($form) . "')";
                    db_query($sql);
                }
            }
        } else {
            $missingAnnotations = self::getMissingAnnotationList($form);
            if (count($missingAnnotations) > 0) {
                self::fixMissingAnnotationsIssues($missingAnnotations, $form);
            }
            if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                // Make this form as repeatable with default eventId as project is classic
                $sql = "INSERT INTO redcap_events_repeat (event_id, form_name) 
                    VALUES ({$Proj->firstEventId}, '" . db_escape($form) . "')";
                db_query($sql);
            }
        }

    }

    /**
     * Remove extra spaces from comma seperated string (Exa. Fixed Schedule 1,  7 should return as 1,7)
     *
     * @param string $string
     *
     * @return string
     */
    public static function removeSpaces($string) {
        $arr = explode(",", $string);
        foreach ($arr as $value) {
            $trimedArr[] = trim($value);
        }
        return implode(",", $trimedArr);
    }
}
