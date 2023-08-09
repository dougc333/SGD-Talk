<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher;

use Session;
use Exception;
use HttpClient;
use Vanderbilt\REDCap\Classes\Utility\FileCache\FileCache;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\NoState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\SessionDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\DebugState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\ErrorState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\LoginState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\ReadyState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\FhirCookieDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\PatientState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\REDCapConfigDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\EhrLaunchState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\MapEhrUserState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\StoreTokenState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\AuthSuccessState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\TryAutoLoginState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\ConformanceStatementDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\StandaloneLaunchState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\RequestAccessTokenState;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\PersistenceStrategies\SessionStrategy;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\PersistenceStrategies\PersistenceStrategyInterface;

class FhirLauncher
{
	/**
	 * GET labels for the states
	 */
	const FLAG_EHR_LAUNCH = 'launch';
	const FLAG_STANDALONE_LAUNCH = 'standalone_launch';
	const FLAG_REQUEST_TOKEN = 'code';
	const FLAG_AUTH_SUCCESS = 'auth_success';
	const FLAG_PATIENT_ID = 'fhirPatient';
	const FLAG_ERROR = 'error';
	const FLAG_SESSION_ID = 'state';
	const FLAG_LOGIN = 'login';
	const FLAG_MAP_EHR_USER = 'map_ehr_user';
	const FLAG_TRY_AUTO_LOGIN = 'auto_login';
	const FLAG_STORE_TOKEN = 'store_token';
	const FLAG_SESSION_CREATE_COUNTER = 's_counter';
	const FLAG_DEBUG = 'debug';
	const FLAG_LAUNCH_TYPE = 'launch_type';

	/**
	 * launch types
	 */
	const LAUNCHTYPE_STANDALONE = 'standalone';
    const LAUNCHTYPE_EHR = 'ehr';

	/**
	 * name of the cookie used in the
	 * authentication process
	 */
	const COOKIE_NAME = 'fhir-launch-cookie';

	/**
	 * redirect URL page
	 */
	const REDIRECT_PAGE = 'ehr.php';

	/**
	 *
	 * @var State
	 */
	private $state;

	/**
	 *
	 * @var SessionDTO
	 */
	private $session;

	/**
	 * REDCap system configuration
	 *
	 * @var REDCapConfigDTO
	 */
	private $config;

	/**
	 *
	 * @var ConformanceStatementDTO
	 */
	private $conformanceStatement;

	/**
	 * list of errors
	 *
	 * @var Exception[]
	 */
	private $errors = [];

	/**
	 * logs
	 *
	 * @var string[]
	 */
	private $logs = [];
	
	/**
	 *
	 * @var PersistenceStrategyInterface
	 */
	private $persistenceStrategy;
	

	/**
	 *
	 * @param PersistenceStrategyInterface|null $strategy
	 */
	public function __construct($strategy=null)
	{
		$this->config =  REDCapConfigDTO::fromDB();
		if(is_null($strategy)) {
			$strategy = new SessionStrategy(); // default persistence strategy
			// $strategy = new FileCacheStrategy(); // default persistence strategy
			// $strategy = new CookieStrategy();
		}
		$this->persistenceStrategy = $strategy;
		// set_error_handler([$this, 'errorHandler'], $error_levels = E_ALL);
	}

	public function persistenceStrategy() {
		return $this->persistenceStrategy;
	}

	public function __destruct()
	{
		if( !($this->session instanceof SessionDTO) ) return;
		$this->session->addPreviousState($this->state); //record current state
		$this->copyLogsToSession($this->session);
		$this->resetLogs();
		$this->session->save($this->persistenceStrategy());
	}

	/**
	 * make sure we are starting from scratch
	 * (the previous state must be a NoState)
	 *
	 * @return void
	 */
	public function forceBlankSession() {
		if(!($this->session instanceof SessionDTO)) return;
		$previousState = end($this->session->previousStates);
		if($previousState!=false && !($previousState === NoState::class)) HttpClient::redirect($this->getRedirectUrl(), true, 302);
	}

	/**
	 * provide the conformance statement from
	 * the local variable, the cache, or remote
	 *
	 * @return ConformanceStatementDTO
	 */
	public function getConformanceStatement() {
		if(isset($this->conformanceStatement)) return $this->conformanceStatement; // already available

		$removeTrailingSlashes = function($string) {
			return preg_replace('/\/*$/', '',$string);
		};
		$fhirBaseUrl = $removeTrailingSlashes($this->config->fhir_endpoint_base_url);
		$conformanceStatementURL = "$fhirBaseUrl/metadata"; // this is also used as key for the cache
		$fileCache = new FileCache(__CLASS__);
		/** @var ConformanceStatementDTO $conformanceStatement */
		$conformanceStatement = unserialize($fileCache->get($conformanceStatementURL));
		if(!$conformanceStatement) {
			try {
				$response = HttpClient::request('GET', $conformanceStatementURL, ['headers' => ['Accept' => 'application/json']]);
				$data = json_decode($response->getBody(), true);
				if(!$data) throw new Exception("no valid data received", 1);
				
				$conformanceStatement = ConformanceStatementDTO::fromArray($data);
				$fileCache->set($conformanceStatementURL, serialize($conformanceStatement));
			} catch (\Throwable $th) {
				// fail silently; set to empty object
				$conformanceStatement = new ConformanceStatementDTO;
			}
		}
		$this->conformanceStatement = $conformanceStatement;
		return $this->conformanceStatement;
	}

	/**
	 * detect if we are in a launch from EHR context
	 * 
	 * if EHR launch context then:
	 * - disable REDCap messanger
	 * - prevent ClickJackingControl
	 *
	 * @return boolean
	 */
	public static function inEhrLaunchContext() {
		try {
			$fhirCookie = self::getFhirContextCookie();
			if(!($fhirCookie instanceof FhirCookieDTO)) return false;
			$launchType = $fhirCookie->launchType;
			return (strcasecmp($launchType, self::LAUNCHTYPE_EHR)===0);
		} catch (\Throwable $th) {
			print_r($th);
		}
	}

	public static function getFhirContextCookie() {
		return FhirCookieDTO::fromName(self::COOKIE_NAME);
	}

	/**
	 *
	 * @return void
	 */
	private function resetLogs() { $this->logs = []; }

	/**
	 * copy the logs to a session DTO
	 *
	 * @param SessionDTO $session
	 * @return void
	 */
	private function copyLogsToSession($session) {
		foreach ($this->logs as $message) {
			$session->log($message); 
		}
	}

	/**
	 *
	 * @param string $state
	 * @return SessionDTO
	 */
	public function getSession() {
		if(!$this->session) {
			$this->initSession();
		}
		return $this->session;
	}

	/**
	 * create a new session if there is no one or the state is invalid.
	 * if a session is available, then save a reference to it
	 * 
	 *
	 * @return void
	 */
	public function initSession() {
		$redirectToNoState = function() {
			// send back to redirect URL with no state (so it will be generated
			// also count how many tries REDCap will try to generate a new session
			$URL = $this->getRedirectUrl();
			$_GET = [self::FLAG_SESSION_CREATE_COUNTER => intval(@$_GET[self::FLAG_SESSION_CREATE_COUNTER])+1];
			$query = http_build_query($_GET);
			HttpClient::redirect("$URL?$query", true, 302);
		};
		Session::init();
		$state = @$_GET[self::FLAG_SESSION_ID];
		$strategy = $this->persistenceStrategy();
		$this->session = $session = SessionDTO::fromState($state, $strategy); // this is fine
		if(!$session) $redirectToNoState(); // the session could not be recreated; redirect to no state
	}

	/**
	 * create an empty session
	 * with the persistence strategy defined in constructor
	 * 
	 * @return SessionDTO
	 */
	public function makeSession() {
		$session = new SessionDTO();
		return $session;
	}

	/**
	 * destroy the session if available
	 *
	 * @return void
	 */
	public function destroySession() {
		$session = $this->session;
		if($session instanceof SessionDTO) $session->destroy($this->persistenceStrategy());
	}

	/**
	 *
	 * @param SessionDTO $session
	 * @return void
	 */
	public function setSession(SessionDTO $session) {
		$this->session = $session;
	}

	/**
	 *
	 * @param string $state
	 * @param PersistenceStrategyInterface|null $strategy
	 * @return SessionDTO
	 */
	public static function getSessionFromState($state, $strategy=null) {
		$instance = new self($strategy);
		$strategy = $instance->persistenceStrategy();
		$session = SessionDTO::fromState($state, $strategy);
		return $session;
	}

	/**
	 *
	 * @param integer $errno
	 * @param string $errstr
	 * @param string|null $errfile
	 * @param integer|null $errline
	 * @param array|null $errcontext
	 * @return boolean
	 */
	public function errorHandler($errno, $errstr, $errfile = null, $errline = null, $errcontext = null): bool {
		if (!(error_reporting() & $errno)) {
			// This error code is not included in error_reporting, so let it fall
			// through to the standard PHP error handler
			return false;
		}
		return true;
	}

	/**
	 * return the REDCap system configuration
	 *
	 * @return REDCapConfigDTO
	 */
	public function getConfig() { return $this->config; }

	/**
	 * detect and transition to a specific state using global variables
	 *
	 * @return void
	 */
	public function detectState() {
		// order is important
 		if(@$_GET[self::FLAG_ERROR]) { $state = new ErrorState($this); }
		// debug screen
		else if(@$_GET[self::FLAG_DEBUG]) { $state = new DebugState($this); }
		// make sure there is a state
		else if(!@$_GET[self::FLAG_SESSION_ID]) { $state = new NoState($this); }

		else if(@$_GET[self::FLAG_LOGIN]) { $state = new LoginState($this); }
		else if(@$_GET[self::FLAG_STORE_TOKEN]) { $state = new StoreTokenState($this); }
		else if(@$_GET[self::FLAG_MAP_EHR_USER]) { $state = new MapEhrUserState($this); }
		else if(@$_GET[self::FLAG_TRY_AUTO_LOGIN]) { $state = new TryAutoLoginState($this); }

		// every other state
		else if(@$_GET[self::FLAG_STANDALONE_LAUNCH]) $state = new StandaloneLaunchState($this);
		// if(@$_GET['client_credentials']) $state = null; //self::MODE_CLIENT_CREDENTIALS;
		else if(@$_GET[self::FLAG_AUTH_SUCCESS]) $state = new AuthSuccessState($this); //self::MODE_SHOW_PORTAL;
		else if(@$_GET[self::FLAG_PATIENT_ID]) $state = new PatientState($this); //self::MODE_SHOW_PORTAL;
		else if(@$_GET[self::FLAG_EHR_LAUNCH]) $state = new EhrLaunchState($this); //self::MODE_AUTHORIZE;
		// else if(@$_GET[self::FLAG_EHR_LAUNCH] && @$_GET['iss']) $state = new EhrLaunchState($this); //self::MODE_AUTHORIZE;
		else if(@$_GET[self::FLAG_REQUEST_TOKEN]) $state = new RequestAccessTokenState($this); //self::MODE_TOKEN;
		else $state = new ReadyState($this);
		// none of the above
		$this->log(":: entering state $state ::");
		$this->transitionTo($state);
	}

	/**
	 * Undocumented function
	 *
	 * @param string $message
	 * @return void
	 */
	public function log($message) {
		$this->logs[] = $message;
	}

	/**
	 *
	 * @param State $state
	 * @param bool $exit
	 */
	public function transitionTo($state, $exit=false) {
		$this->state = $state;
		$this->state->run();
		if($exit) exit();
	}


	/**
	 * get FHIR data from the EHR system
	 *
	 * @param string $URL
	 * @param string $accessToken
	 * @return array
	 */
	public function getFhirData($URL, $accessToken) {
		$http_options = [
			'headers' => [
				'Accept' => 'application/json',
				'Authorization' => "Bearer {$accessToken}",
			],
			'form_params' => [],
		];

		$response = HttpClient::request('GET', $URL, $http_options);
		$payload = json_decode($response->getBody(), true);
		return $payload;
	}


	/** service methods */

	
	public function getIdentityProvider() {
		$config = $this->getConfig();
		if($identityProvider = @$config->fhir_identity_provider) return $identityProvider;
		return $baseURL = @$config->fhir_endpoint_base_url;
	}
	
	/**
	 * Returns the validated URL, or false if the filter fails
	 * 
	 * @param string $url
	 * @return string|false
	 */
	public static function validateURL($URL) {
		// remove double slashes if not preceeded by a colon symbol
		$URL = preg_replace('/(?<!:)\/\//', '/', $URL);
		// validate URL
		return filter_var($URL, FILTER_VALIDATE_URL);
	}
	
	public function getAuthorizeURL () { return self::validateURL(@$this->getConfig()->fhir_endpoint_authorize_url); }
	
	public function getTokenURL () { return self::validateURL(@$this->getConfig()->fhir_endpoint_token_url); }

	public function getRedirectUrl() { return self::validateURL(APP_PATH_WEBROOT_FULL.self::REDIRECT_PAGE);}

	public function getLaunchURL() { return self::validateURL(APP_PATH_WEBROOT_FULL.self::REDIRECT_PAGE);}

	public static function getStandaloneLaunchURL() {
			// $fhir_standalone_authentication_flow = @$this->getConfig()['fhir_standalone_authentication_flow'];
			$URL = APP_PATH_WEBROOT_FULL.self::REDIRECT_PAGE.'?standalone_launch=1';
			return self::validateURL($URL);
	}

	/**
	 *
	 * @param Throwable $error
	 * @return void
	 */
	public function addError($error) { $this->errors[] = $error; }

	/**
	 *
	 * @return Throwable[]
	 */
	public function getErrors() { return $this->errors; }

}