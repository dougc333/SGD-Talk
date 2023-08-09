<?php

namespace Vanderbilt\REDCap\Classes\Fhir;

use Vanderbilt\REDCap\Classes\Fhir\DataMart\DataMart;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirToken;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirTokenManager;

class FhirEhr
{	
	// Other FHIR-related settings
	private static $fhirRedirectPage = 'ehr.php';
	public $ehrUIID = null;
	public $fhirPatient = null; // Current patient
	public $fhirAccessToken = null; // Current FHIR access token
	public $fhirResourceErrors = array();

	/**
	 * Standard Standalone Launch authentication flow
	 */
	const AUTHENTICATION_FLOW_STANDARD = 'standalone_launch';
	/**
	 * OAuth2 client credentials authentication flow (cerner only)
	 */
	const AUTHENTICATION_FLOW_CLIENT_CREDENTIALS = 'client_credentials';

	
	// Construct
	public function __construct()
	{
		// Start the session if not started
		\Session::init();
		// Initialization check to ensure we have all we need
		$this->initCheck();
	}


	// Capture EHR user and add it to session if "user" param is in launch query string
	public function getEhrUserFromUrl()
	{
		global $fhir_endpoint_base_url;
		$testWebsitesUsers = array(
			// 'smarthealthit.org' => 'SMART_FAKE_USER',
			'open-ic.epic.com' => 'OPEN_EPIC_FAKE_USER',
		);
		foreach ($testWebsitesUsers as $url => $user) {
			$regExp = sprintf('/%s/i', preg_quote($url, '/'));
			if(preg_match($regExp, $fhir_endpoint_base_url)) return $user;
		}

		// change all key to lowercase to get both user or USER
		$_GET_lower = array_change_key_case($_GET, CASE_LOWER);
		if($user = trim(rawurldecode(urldecode($_GET_lower['user']))))
		{
			return $user;
		}
	}

	public static function getUserID()
	{
		if ($GLOBALS['auth_meth_global'] == 'none') {
			$_SESSION['username'] = 'site_admin';
		}
		\Session::init();
		if (!isset($_SESSION['username'])) return;
		if(!defined("USERID")) define("USERID", strtolower($_SESSION['username']));
		$user_id = \User::getUIIDByUsername(USERID);
		/* $user_info = (object)\User::getUserInfo($id=USERID);
		$user_id = $user_info->ui_id; */
		return $user_id;
	}
	
	
	// Query table to determine if REDCap username has been allowlisted for DDP on FHIR
	public static function isDdpUserAllowlistedForFhir($username)
	{		
		$sql = "select 1 from redcap_ehr_user_map m, redcap_user_information i
				where i.ui_id = m.redcap_userid and i.username = '".db_escape($username)."'";
		$q = db_query($sql);
		return (db_num_rows($q) > 0);
	}
	
	/**
	 * Query table to determine if REDCap username has been allowlisted for Data Mart project creation rights.
	 * Super users are allowed by default.
	 * 
	 */
	public static function isDdpUserAllowlistedForDataMart($username)
	{		
		$sql = "SELECT 1 FROM redcap_user_information WHERE username = '".db_escape($username)."'
				AND (super_user = 1 OR fhir_data_mart_create_project = 1)";
		$q = db_query($sql);
		return (db_num_rows($q) > 0);
	}
	
	// Obtain the FHIR redirect URL for this external module (assumes that page=index is the main launching page)
	public static function getFhirRedirectUrl()
	{
		return APP_PATH_WEBROOT_FULL . self::$fhirRedirectPage;
	}
	
	
	// Initialization check to ensure we have all we need
	private function initCheck()
	{
		$errors = array();
		if (empty($GLOBALS['fhir_client_id'])) {
			$errors[] = "Missing the FHIR client_id! Please add value to module configuration.";
		}
		if (empty($GLOBALS['fhir_endpoint_base_url'])) {
			$errors[] = "Missing the FHIR endpoint base URL! Please add value to module configuration.";
		}
		if (!empty($errors)) {
			throw new \Exception("<br>- ".implode("<br>- ", $errors));
		}	
	}

	/**
	 * check if a project has EHR servvices enabled
	 *
	 * @param integer $project_id
	 * @return boolean
	 */
	public static function isFhirEnabledInProject($project_id)
	{
		$project = new \Project($project_id);
		$realtime_webservice_enabled = $project->project['realtime_webservice_enabled'];
		$realtime_webservice_type = $project->project['realtime_webservice_type'];
		$datamart_enabled = DataMart::isEnabledInSystem() && DataMart::isEnabled($project_id);
		return ( $datamart_enabled==true || ($realtime_webservice_enabled==true && $realtime_webservice_type=='FHIR') );
	}

	/**
	 * render the menu for the FHIR tools
	 *
	 * @param string $menu_id
	 * @param boolean $collapsed 
	 * @return string
	 */
	public static function renderFhirLaunchModal()
	{
		global $lang, $fhir_standalone_authentication_flow, $fhir_source_system_custom_name;
		$autorization_flow = $fhir_standalone_authentication_flow;
		// exit if we are in client credentials authentication mode or if standalone launch is not enabled
		if( $autorization_flow != self::AUTHENTICATION_FLOW_STANDARD) return;
		
		// get token 
		$user_id = FhirEhr::getUserID();
		$tokenManager = new FhirTokenManager($user_id);
		$token = $tokenManager->getToken();
		$token_found = $token instanceof FhirToken;
		$token_valid =  $token_found and $token->isValid();

		// exit if the token is valid
		if($token_valid) return;

		$data = array(
			'lang' => $lang,
			'autorization_flow' => $autorization_flow,
			'ehr_system_name' => strip_tags($fhir_source_system_custom_name),
			'app_path_webroot' => APP_PATH_WEBROOT,
		);
		$modal = \Renderer::run('ehr.launch_modal', $data);
		return $modal;
	}
	

	/**
	 * check if clinical data interoperability services are enabled
	 * at the system-level in REDCap
	 *
	 * @return boolean
	 */
	public static function isCdisEnabledInSystem()
	{
		global $realtime_webservice_global_enabled, $fhir_ddp_enabled, $fhir_data_mart_create_project;
		
		$cdp_custom_enabled = boolval($realtime_webservice_global_enabled);
		$cdp_enabled = boolval($fhir_ddp_enabled);
		$data_mart_enabled = boolval($fhir_data_mart_create_project);
		return $cdp_custom_enabled || $cdp_enabled || $data_mart_enabled;
	}
	
}
