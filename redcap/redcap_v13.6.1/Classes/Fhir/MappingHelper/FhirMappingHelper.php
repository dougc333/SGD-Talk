<?php
namespace Vanderbilt\REDCap\Classes\Fhir\MappingHelper;

use User;
use Exception;
use UserRights;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\DataMartRevision;
use Vanderbilt\REDCap\Classes\Fhir\Endpoints\AbstractEndpoint;
use Vanderbilt\REDCap\Classes\Fhir\Facades\FhirClientFacade;
use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;
use Vanderbilt\REDCap\Classes\Fhir\MappingHelper\EndpointOptionsVisitor;

class FhirMappingHelper
{
    private $project_id;
    private $user_id;
    /**
     *
     * @param integer $project_id
     * @param integer $user_id
     */
    public function __construct($project_id, $user_id)
    {
        $this->project_id = $project_id;
        $this->user_id = $user_id;
    }

    /**
     * @return integer
     */
    public function getProjectId()
    {
        return $this->project_id;
    }

    /**
     * @return integer
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * print the link button pointing to the Mapping Helper page
     *
     * @param integer $project_id
     * @return void
     */
    public static function printLink($project_id)
    {
        $link = self::getLink($project_id);
        $html = sprintf('<a class="btn btn-primaryrc btn-xs" style="color:#fff !important;" href="%s">Mapping Helper</a>', $link);

        print $html;
    }

    /**
     * print the link button pointing to the Mapping Helper page
     *
     * @param integer $project_id
     * @return void
     */
    public static function getLink($project_id)
    {
        $parseUrl = function($URL) {
            $parts = parse_url($URL);
            $base = sprintf("%s://%s",@$parts['scheme'], @$parts['host']);
            return $base;
        };
        $root = $parseUrl(APP_PATH_WEBROOT_FULL);
        $version_dir = APP_PATH_WEBROOT;
        $url = $root.$version_dir."index.php?pid={$project_id}&route=FhirMappingHelperController:index";
        $double_slashes_regexp = "#(?<!https:)(?<!http:)\/\/#";
        $link = preg_replace($double_slashes_regexp, '/', $url);
        return $link;
    }

    /**
     *
     * @param Project $project
     * @return DataMartRevision|false
     */
    public function getDatamartRevision($project)
    {
        $datamart_enabled = boolval($project->project['datamart_enabled']);
        if(!$datamart_enabled) return false;
        $active_revision = DataMartRevision::getActive($project->project_id);
        return $active_revision;
    }

    public function getClinicalDataPullMapping()
    {
        $query_string = sprintf(
            'SELECT * FROM redcap_ddp_mapping
            WHERE project_id = %u', $this->project_id
        );
        $result = db_query($query_string);
        $mapping = array();
        while($row = db_fetch_assoc($result))
        {
            $mapping[] = $row;
        }
        return $mapping;
    }

    /**
     * Undocumented function
     *
     * @param string $fhir_category
     * @param string $mrn
     * @param array $options
     * @return FhirResource
     */
    public function getResourceByMrn($fhir_category, $mrn, $options=[])
    {
        /** 
         * create an error with a reference to all previous errors
         * @param Exception[] $errors
         */
        $combineErrors = function($errors):Exception {
            $last = current($errors);
            while($next = next($errors)) {
                $last = new Exception($next->getMessage(), $next->getCode(), $last);
            }
            return $last;
        };

        $fhirClient = FhirClientFacade::getInstance($this->project_id, $this->user_id);
        


        
        $patient_id = $fhirClient->getPatientID($mrn);
        if(!$patient_id) throw new \Exception("Patient ID not found", 404);

        
        $endpoint_factory = $fhirClient->getEndpointFactory();
        $endpoint = $endpoint_factory->makeEndpoint($fhir_category);
        if(!($endpoint instanceof AbstractEndpoint)) {
            throw new \Exception(sprintf('No endpoint available for the category %s', $fhir_category), 1);
        };
        $options_visitor = new EndpointOptionsVisitor($patient_id, $options, $fhirClient);
        $params = $endpoint->accept($options_visitor);
        $request = $endpoint->getSearchRequest($params);
        
        $response = [];
        if($request) {
            $clientResponse = $fhirClient->sendRequest($request);
            if($fhirClient->hasErrors()) {
                $combinedErrors = $combineErrors($fhirClient->getErrors());
                throw $combinedErrors;
            }
            $resource = $clientResponse->resource;
            // $fhir_code = $fhirClient->getFhirVersionManager()->getFhirCode();
            $resource_visitor = new ResourceVisitor();
            $data = $resource->accept($resource_visitor);
            $response['data'] = $data;
            $response['metadata'] = $resource->getMetadata();
        }
        return $response;
    }

    /**
     *
     * @param string $relative_url
     * @param string $method
     * @param array $options
     * @return AbstractResource
     */
    public function getCustomFhirResource($relative_url, $method='GET', $options=[] )
    {   
        $fhir_client = FhirClientFacade::getInstance($this->project_id, $this->user_id);
        $queryOptions = ['query'=>$options];
        $fhir_request = $fhir_client->getFhirRequest($relative_url, $method, $queryOptions);
        $clientResponse = $fhir_client->sendRequest($fhir_request);
        $resource = $clientResponse->resource;
        if(is_null($resource) && $clientResponse->hasError()) throw $clientResponse->error;
        $resource = $clientResponse->resource;
        return $resource;
    }

    /**
     * check if a user can use the mapping helper in a specific project
     *
     * @param int $user_id
     * @param int $project_id
     * @return boolean
     */
    public static function availableToUser($user_id, $project_id) {
        $canCreateDataMartRevisions = function($project_id) {
            $project = new \Project($project_id);
            $projectInfo = $project->project;
            return boolval(@$projectInfo['datamart_allow_create_revision']);
        };
        $hasMappingPrivileges = function($username, $project_id) {
            $user_rights = @UserRights::getPrivileges($project_id, $username)[$project_id][$username];
            return boolval(@$user_rights['realtime_webservice_mapping']);
        };
        $hasCreateDatamartProjectsPrivileges = function($userInfo) {
            $canCreateDataMartProject = $userInfo['fhir_data_mart_create_project'] ?? 0;
            return boolval($canCreateDataMartProject);
        };

        $userInfo = User::getUserInfoByUiid($user_id);
        
        $superUser = boolval(@$userInfo['super_user']);
        $hasMappingPrivileges = $hasMappingPrivileges(@$userInfo['username'], $project_id);
        $canCreateDataMartRevisions = $canCreateDataMartRevisions($project_id);
        $canCreateDatamartProjects = $hasCreateDatamartProjectsPrivileges($userInfo);
        return $superUser || $hasMappingPrivileges || $canCreateDataMartRevisions || $canCreateDatamartProjects;
    }


    /**
     * get a list of codes that are available in REDCap, but not used
     *
     * @return void
     */
    public function getBlocklistedCodes()
    {
        $list = array();
        // Vital signs
        $list[] = new BlocklistCode('8716-3','too generic');
        return $list;
    }
}