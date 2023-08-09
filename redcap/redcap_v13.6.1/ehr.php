<?php

function isTest()
{
	return (
	    (isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] == 'redcap.test')
	    || (isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] == 'localhost')
    );
}
if(isTest()) $GLOBALS['cookie_samesite'] = 'None'; // set to 'none' to allow authentication in iFrames in dev environments

use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States\ErrorState;

define("EHR", true);
// Disable authentication unless receiving REDCap login form submission
if (!isset($_POST['redcap_login_a38us_09i85'])) define("NOAUTH", true);
// Config for project-level or non-project pages
if (isset($_GET['pid'])) {
	require_once dirname(__FILE__) . "/Config/init_project.php";
} else {
	require_once dirname(__FILE__) . "/Config/init_global.php";
}

$fhirLauncher = new FhirLauncher();
try {
	
	$fhirLauncher->detectState();
} catch (Throwable $th) {
	// log the error and redirect to the error state
	$error = $th->getMessage();
	$fhirLauncher->log($error);
	$params = $_GET;
	$existingError = $params[FhirLauncher::FLAG_ERROR] ?? false;
	if($existingError) {
		// stop if there is a pre existing error to avoid infinite reloads
		$fhirLauncher->transitionTo(new ErrorState($fhirLauncher), true);
		return;
	}
	$params[FhirLauncher::FLAG_ERROR] = $error;
	$URL = $fhirLauncher->getRedirectUrl();
	$query = http_build_query($params);
	HttpClient::redirect("$URL?$query", true, 302);
}

?>