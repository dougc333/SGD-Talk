<?php


require_once dirname(dirname(__FILE__)) . "/Config/init_global.php";

$Stats = new Stats();

// SET STATS REPORTING TO "AUTO"
if (isset($_POST['set_auto_reporting']) && $super_user && !$auto_report_stats)
{
	updateConfig('auto_report_stats', '1');
	exit;
}

// REPORT STATS (ALTERNATE EMAIL METHOD VIA CONTROL CENTER BUTTON)
elseif (isset($_POST['report_alternate']) && $super_user)
{
	// Get URL for sending stats to
	$url = $Stats->getUrlReportingStats();
	// Get JSON of URL and params for sending Shared Library stats
	$sl_array = Stats::sendSharedLibraryStats(true);
	$shared_lib_url = $sl_array['url']."&params=" . urlencode(json_encode($sl_array['params']));
	// Set message
	$message = '
		<html>
		<body style="font-family:arial,helvetica;">
		[This message was automatically generated by REDCap at ANOTHER institution]<br><br>
		Reported by <b>'.$user_firstname.' '.$user_lastname.'</b> ('.$user_email.') at "<b>'.$institution.'</b>"<br><br>
		<a href="'.$url.'">Report basic REDCap stats</a><br><br>
		<a href="'.$shared_lib_url.'">Report Shared Library stats</a><br><br>
		</body>
		</html>';
	$email = new Message();
	$email->setFrom('redcap@vumc.org');
	$email->setFromName("REDCap");
	$email->setTo('rob.taylor@vumc.org');
	$email->setSubject('REDCap site stats (alternative report method)');
	$email->setBody($message);
	// Send message
	if ($email->send())
	{
		redirect(APP_PATH_WEBROOT . "ControlCenter/index.php?sentstats=" . $_POST['sentstats'] . "&alternative=1");
	}
	// If didn't send, then redirect back to Control Center, just in case
	redirect(APP_PATH_WEBROOT . "ControlCenter/index.php");
}


// REPORT STATS FOR THE SHARED LIBRARY AND SAVE TIME OF LAST STATS REPORTED
// Only used when stats were sent directly via ajax
if (isset($_GET['report_library_stats'])) {
	// Save the current data
	updateConfig('auto_report_stats_last_sent', date("Y-m-d"));
	// Return JSON of URL and params for sending Shared Library stats
	print json_encode_rc(Stats::sendSharedLibraryStats(true));
	exit;
}

// REPORT STATS FOR THE PUBLICATION MATCHING
// Only used when stats were sent directly via ajax
if (isset($_GET['report_pub_matching_stats'])) {
	if ($pub_matching_enabled) {
		// Return JSON of URL and params for sending Pub Matching stats
		print json_encode_rc(Stats::sendPubMatchList(true));
	} else {
		print '0';
	}
	exit;
}


/**
 * SEND BASIC STATS (SERVER SIDE)
 */
// Get URL for sending stats to
$url = $Stats->getUrlReportingStats(false);
// Separate module stats for separate POST request
$send_separate_modules_request = false;
if (strlen($url) > 2000) { // If URL is longer than 2000 characters, then request might fail
	list ($url2, $module_param) = explode("&modules=", $url, 2);
	$module_param = urldecode($module_param);
	$module_json = json_decode($module_param, true);
	$send_separate_modules_request = (is_array($module_json) && !empty($module_json));
	if ($send_separate_modules_request) {
		$url = $url2;
	}
}
// Send basic stats
$response = http_get($url);
// If stats were accepted from approved site, change date for stats last sent in config table
if ($response == "1") {
	// Save to table
	db_query("update redcap_config set value = '" . date("Y-m-d") . "' where field_name = 'auto_report_stats_last_sent'");
	// Try to send module-specific stats now
	if ($send_separate_modules_request) {
		$response_modules = http_post($url, array('modules'=>$module_param));
	}
}
// In order to continue to library stats reporting, make sure cURL is installed and that Library usage is enabled
// and that $response above was successful (1).
if (!$pub_matching_enabled || $response == "0") {
	exit($response);
}


// SEND LIBRARY STATS (SERVER SIDE)
$libresponse = Stats::sendSharedLibraryStats();
if ($libresponse == "" || $libresponse === false) $libresponse = "0";


// SEND PUB MATCHING STATS (SERVER SIDE)
$pubstats_response = "1";
if ($pub_matching_enabled) {
	$pubstats_response = Stats::sendPubMatchList();
	if ($pubstats_response == "" || $pubstats_response === false) $pubstats_response = "0";
}

// Return response if called asynchronously, else redirect to Control Center
print ($libresponse && $pubstats_response) ? "1" : "0";