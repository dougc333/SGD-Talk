<?php

use Vanderbilt\REDCap\Classes\Fhir\DataMart\DataMart;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\DesignChecker\DesignChecker;
use Vanderbilt\REDCap\Classes\Fhir\SerializableException;
use Vanderbilt\REDCap\Classes\Utility\FileCache\FileCache;

class DataMartController extends BaseController {

    /**
     * maximum number of simultaneous revisions per hour
     */
    const MAX_REVISIONS_PER_HOUR = 10;

    /**
     * instance of the model
     *
     * @var DataMart
     */
    private $model;

    /**
     * numeric ID of the currrent user
     *
     * @var int
     */
    private $userid;

    /**
     * current project ID
     *
     * @var int
     */
    private $project_id;

    /**
     * caching system
     *
     * @var FileCache
     */
    private $fileCache;

    public function __construct()
    {
        parent::__construct();
        $this->userid = defined('UI_ID') ? UI_ID : null;
        $this->project_id = defined('PROJECT_ID') ? PROJECT_ID : intval(@$_REQUEST['pid']);
        // $this->enableCORS();
        $this->model = new DataMart($this->userid);
        $this->fileCache = new FileCache('DataMartController'.$this->project_id);
    }

    /**
     * route, get a list of revisions
     *
     * @return string json response
     */
    public function revisions()
    {
        $request_id = @$_REQUEST['request_id'];
        if($request_id)
        {
            $revision = $this->model->getRevisionFromRequest($request_id);
            if(!$revision)
            {
                $error = new JsonError(
                    $title = 'revision not found',
                    $detail = sprintf("no revision associated to the request ID %s has been found", $request_id),
                    $status = 400,
                    $source = PAGE // get the current page
                );
                $this->printJSON($error, $status_code=400);
            }
            $response = array($revision);
        }else
        {
            $response = $this->model->getRevisions($this->project_id);
        }
        $this->printJSON($response, $status_code=200);
    }

    /**
     * route, get the user
     *
     * @return string json response
     */
    public function getUser()
    {
        /* 
         * static version
        $modelClassName = get_class($this->model);
        $response =   call_user_func_array(array($modelClassName, "getUserInfo"), array($this->username, $this));
        */
        $response =   $this->model->getUser($this->project_id);
        $this->printJSON($response, $status_code=200);
    }

    /**
     * add a revision
     *
     * @return string
     */
    public function addRevision()
    {
        $post_data = file_get_contents("php://input");
        $params = json_decode($post_data, $assoc=true);
        $settings = array(
            'project_id'    => $this->project_id,
            'request_id'    => $_REQUEST['request_id'] ?? null,
            'mrns'          => $params['mrns'] ?? null,
            'fields'        => $params['fields'] ?? null,
            'date_min'      => $params['date_min'] ?? null,
            'date_max'      => $params['date_max'] ?? null,
        );
        $response = $this->model->addRevision($settings);
        if($response==true)
            $this->printJSON($response, $status_code=200);
        else
            $this->printJSON($response, $status_code=400);
    }

    /**
     * delete a revision
     *
     * @return void
     */
    public function deleteRevision()
    {
        // gete the data from the DELETE method
        $data = file_get_contents("php://input");
        $params = json_decode($data, $assoc=true);
        $id = @$params['revision_id'];
        $deleted = $this->model->deleteRevision($id);
        if($deleted==true)
        {
            $response = array('data'=>array('id'=>$id));
            $this->printJSON($response, $status_code=200);
        } else
        {
            // typical structure for a json object
            $error = new JsonError(
                $title = 'Revision not deleted',
                $detail = sprintf("The revision ID %u could not be deleted.", $id ),
                $status = 400,
                $source = PAGE
            );
            $this->printJSON($error, $status_code=400);
        }
    }
    /**
     * export a revision
     *
     * @return void
     */
    public function exportRevision()
    {
        $revision_id = @$_REQUEST['revision_id'];
        $format = @$_REQUEST['format'] ?: 'csv';
        $csv_delimiter = @$_REQUEST['csv_delimiter'] ?: User::getCsvDelimiter();
        $fields = @$_REQUEST['fields'] ?: [];
        if(!is_array($fields)) $fields = explode(',', $fields); // make sure it is an array
        $this->model->exportRevision($revision_id, $fields, $format, $csv_delimiter);
    }

    /**
     * parse a file for a revision
     *
     * @return string
     */
    public function importRevision()
    {
        $uploaded_files = FileManager::getUploadedFiles();
        $files = $uploaded_files['files'];
        $file = reset($files); // get the first element in the array of files
        if($file)
        {
            $data = $this->model->importRevision($file);
            $this->printJSON($data, $status_code=200);
        }else
        {
            $error = new JsonError(
                $title = 'no file to process',
                $detail = 'A file must be provided to import a revision',
                $status = 400,
                $source = PAGE // get the current page
            );
            $this->printJSON($error, $status_code=400);
        }
    }

    public function getSettings()
    {
        global $lang;
        try {
            $request_id = @$_REQUEST['request_id'];
            $settings = $this->model->getSettings($this->project_id, $request_id, $lang);
            $this->printJSON($settings, $status_code=200);
        } catch (\Exception $e) {
            $code = $e->getCode();
            if($code<400) $code = 400;
            $this->printJSON($e->getMessage(), $code);
        }
    }

    /**
     * helper function that sends an error response if the maximum
     * number of requests for a page has been reached
     *
     * @param integer $limit
     * @return string|null
     */
    public function throttle($limit=10)
    {
        $page = PAGE; // get the current page
        $throttler = new Throttler();
        
        if($throttler->throttle($page, $limit))
        {
            // typical structure for a json object
            $error = new JsonError(
                $title = 'Too Many Requests',
                $detail = sprintf('The maximum of %u simultaneus request%s has been reached. Try again later.', $limit, $singular=($limit===1) ? '' : 's' ),
                $status = Throttler::ERROR_CODE,
                $source = PAGE
            );

            $this->printJSON($error , $status_code=$status);
        }
    }

    /**
     * method for testing the throttle
     *
     * @return string
     */
    private function throttleTest()
    {
        $this->throttle(1); //limit to a maximum of 1
        sleep(10);
        $this->printJSON(array('success' => true, 'errors'=>array()), $status_code=200);
    }

    /**
     * run a revision
     *
     * @return string
     */
    public function runRevision()
    {
        $this->throttle(self::MAX_REVISIONS_PER_HOUR);
        try {
            $post_data = file_get_contents("php://input");
            $post_params = json_decode($post_data, $assoc=true);
            $revisionId = @$post_params['revision_id'];
            $mrn = @$post_params['mrn'];
            $mrn_list = $post_params['mrn_list'] ?? [];
            $send_feedback = @$post_params['send_feedback'];
            $background = @$post_params['background'];

            if($background) {
                $message = $this->model->runBackgroundProcess($revisionId, $mrn_list, $send_feedback);
                $response = [
                    'success' => true,
                    'message' => $message,
                ];
                $this->printJSON($response, $status_code=200);
            }else {
                $response = $this->model->runRevision($revisionId, $mrn);
                $this->printJSON($response, $status_code=200);
            }
        } catch (\Exception $e) {
            $exception = new SerializableException($e->getMessage(), $code=$e->getCode());
            $this->printJSON($exception, $code);
        }
    }

    /**
     * approve a revision
     *
     * @return string
     */
    public function approveRevision()
    {
        $post_data = file_get_contents("php://input");
        $post_params = json_decode($post_data, $assoc=true);
        $id = @$post_params['revision_id'];
        
        $revision = $this->model->approveRevision($id);
        if($revision)
        {
            $response = array('data'=>$revision);
            $this->printJSON($response, $status_code=200);
        }else
        {
            $error_code = 401; //unauthorized
            $error = new JsonError(
                $title = 'Revision not approved',
                $detail = sprintf("The revision ID %u could not be approved.", $id),
                $status = $error_code,
                $source = PAGE
            );
            $this->printJSON($error, $status_code=$error_code);
        }
    }

    public function index()
    {
        // helper function to print using cache buster
        $objHtmlPage = new HtmlPage();

        extract($GLOBALS);
        $browser_supported = !$isIE || vIE() > 10;
        $datamart_enabled = DataMart::isEnabled($this->project_id);

        ob_start();
        // ********** HTML **********
        ?>
        <?php if(!$browser_supported) : ?>
            <h3>
                <i class="fas fa-exclamation-triangle"></i>
                <span>This feature is not available for your browser.</span>
            </h3>
        <?php elseif($datamart_enabled) : ?>
            <div style="max-width: 768px;">
                <div id="datamart-design-checker"></div>
                <div id="datamart-app"></div>
            </div>

            <?php print loadJS('vue/vue-factory/dist/js/app.js') ?>
            <?php print loadJS('vue/datamart/dist/datamart_vue.umd.js') ?>
            <?php print loadJS('vue/datamart-design-checker/dist/datamart_design_checker.umd.js') ?>

            <script>
                window.addEventListener('DOMContentLoaded', function(event) {
                    const checkerPromise = window.renderVueComponent(datamart_design_checker, '#datamart-design-checker')
                    checkerPromise.then(component => {
                        console.log('datamart checker is ready')
                    })

                    const dataMartPromise = window.renderVueComponent(datamart_vue, '#datamart-app')
                    dataMartPromise.then(component => {
                        console.log('datamart is ready')
                    })
                })
            </script>
        <?php else : ?>
            <h3>
                <i class="fas fa-info-circle"></i>
                <span>This is not a Datamart Project!</span>
            </h3>
        <?php endif; ?>

        <?php
        // ********** HTML **********
        $contents = ob_get_contents();
        ob_end_clean();

        include APP_PATH_DOCROOT . 'ProjectGeneral/header.php';
        print $contents;
        include APP_PATH_DOCROOT . 'ProjectGeneral/footer.php';
    }

    public function searchMrns()
    {
        $query = @$_GET['query'];
        $start = @$_GET['start'] ?: 0;
        $limit = @$_GET['limit'] ?: 0;
        $result = $this->model->searchMrns($this->project_id, $query, $start, $limit);
        $this->printJSON($result);

    }



    public function checkDesign()
    {
        $deisgnChecker = new DesignChecker($this->project_id, $this->userid);
        // extract just the privileges: no project ID, no username
        $commands = $deisgnChecker->check();
        $deisgnChecker->backupCommands();
        $settings = $deisgnChecker->getSettings();
        $response = [
            'commands' => $commands,
            // 'user' => User::getUserInfoByUiid($this->userid),
            'settings' => $settings,
        ];
        HttpClient::printJSON($response);
    }

    public function fixDesign()
    {
        $deisgnChecker = new DesignChecker($this->project_id, $this->userid);
        $runFixCheck = function() use($deisgnChecker) {
            // prepare the response in case of errors
            $response = [
                'error' => true,
                'message' => "error",
            ];
            $settings = $deisgnChecker->getSettings();
            $privileges = @$settings['privileges'];
            $project_metadata = @$settings['project_metadata'];
            $projectCanBeModified = @$project_metadata['can_be_modified'] ?? false;
            $userHasDesignPrivileges = @$privileges['design'] ?? false;
            
            if(!$projectCanBeModified) {
                $response['message'] = "The project can only be modified in draft mode";
                HttpClient::printJSON($response, 401);
            }

            if(!$userHasDesignPrivileges) {
                $response['message'] = "The project can only be modified by a user with 'design' privileges";
                HttpClient::printJSON($response, 403);
            }
            return true;
        };
        
        $runFixCheck(); // verify if the conditions to fix the project are met

        $deisgnChecker = new DesignChecker($this->project_id, $this->userid);
        $response = $deisgnChecker->executeCachedCommands();
        HttpClient::printJSON($response);
    }
    
    public function executeFixcommand()
    {
        $deisgnChecker = new DesignChecker($this->project_id, $this->userid);
        $request = json_decode(file_get_contents("php://input"), true);
        $command = @$request['command'];
        $options = @$request['options'] ?? [];
        $result = $deisgnChecker->executeCachedCommands();
        $response = [
            'message' => 'completed',
            'success' => true,
        ];
        HttpClient::printJSON($response);
    }


}