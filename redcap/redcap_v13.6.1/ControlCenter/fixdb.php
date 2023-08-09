<?php

require_once dirname(dirname(__FILE__)) . '/Config/init_global.php';

// Must be an admin
if (!ACCESS_CONTROL_CENTER) redirect(APP_PATH_WEBROOT);


## INIT VARS
$sqlFixTableData1 = "";
$sqlFixTableData2 = "";
$sqlFixTableData3 = "";
$sqlFixTableData4 = "";
$allColsAllTables = []; // Array to collect column names of all db tables
$tablesNoPidSidEid = ['redcap_alerts_sent_log', 'redcap_data_quality_resolutions', 'redcap_external_modules_log_parameters',
					  'redcap_randomization_allocation', 'redcap_surveys_response', 'redcap_surveys_scheduler_queue', 'redcap_surveys_themes'];

## FUNCTIONS
// Get Xth occurrence of a character
function strposX($haystack, $needle, $number=0)
{
	return strpos($haystack, $needle, (($number > 1) ? (strposX($haystack, $needle, $number - 1) + strlen($needle)) : 0));
}
// Generate SQL to update a table's data
function generateUpdateSql($table, $col, $pids=[], $sids=[], $eids=[], $pids_include=true)
{
	global $allColsAllTables, $tablesNoPidSidEid;
	// Get table columns
	$allCols = $allColsAllTables[$table];
	// If the column defaults to NULL, add extra check to ignore NOT NULLs to make the query faster
	$sqlNull = ($allCols[$col] === null) ? "`$col` is not null and " : "";
	// Build the query to return
	$sql = "update ignore `$table`
	set `$col` = if((length(@value_converted:=convert(binary convert(`$col` using latin1) using utf8mb4)) <= char_length(@value_converted) or isnull(@value_converted) or (instr(@value_converted, '?') > 0 and (char_length(@value_converted) - char_length(replace(@value_converted,'?','')) - (char_length(`$col`) - char_length(replace(`$col`,'?','')))) > 0)), `$col`, @value_converted)
	where {$sqlNull}length(`$col`) > char_length(`$col`)";
	if ($pids === null) {
		$sql .= " and project_id is null";
	} elseif (is_array($pids) && !empty($pids)) {
		// Project Tables - namely 2nd Half of Step 2A ("Active Projects"), and Step 2B ("Inactive Projects")
		// Detect if the db table contains project_id, survey_id, or event_id field so we know which to use in WHERE clause
		if (array_key_exists('project_id', $allCols)) {
			// project_id
			if (!$pids_include) $sql .= " and project_id is not null";
			$sql .= " and project_id ".($pids_include ? "in" : "not in")." (".implode(",", $pids).")";
		} elseif (array_key_exists('survey_id', $allCols) && !empty($sids)) {
			// survey_id
			if (!$pids_include) $sql .= " and survey_id is not null";
			$sql .= " and survey_id ".($pids_include ? "in" : "not in")." (".implode(",", $sids).")";
		} elseif (array_key_exists('event_id', $allCols) && !empty($eids)) {
			// event_id
			if (!$pids_include) $sql .= " and event_id is not null";
			$sql .= " and event_id ".($pids_include ? "in" : "not in")." (".implode(",", $eids).")";
		} elseif (!$pids_include && in_array($table, $tablesNoPidSidEid)) {
			// For specific tables that don't have project_id, survey_id, or event_id, skip them here for the inactive
			// project SQL block so that we don't add the same PID-less query for both active and inactive project SQL blocks
			// For accounting clarity, note that these tables...
			// -  *Are already* included in the "active" projects block - since $pids_include = true, thus bypassing all elseif conditions and returning the $sql.
			// -  Were excluded from the "non-project" array - where an if condition prevented these tables from getting moved into the non project tables array.
			// -  Will not be included in the "inactive" projects array - since $pids_include is False and $table is in the $NoPidSidEid array.
			return "";
		}
	}
	$sql .= ";\n";
	return $sql;
}
// Wrap SQL block in commands (db set, transactions, etc.) to let it run without issues
function wrapSqlDbFlags($sql, $transaction=false, $comment="SQL to execute", $disableFkChecks=false, $setDataFixConfigFlagComplete=false)
{
	$fkc1 = $disableFkChecks ? "SET FOREIGN_KEY_CHECKS = 0;\n" : "";
	$fkc2 = $disableFkChecks ? "SET FOREIGN_KEY_CHECKS = 1;\n" : "";
	$transaction1 = $transaction ? "SET AUTOCOMMIT = 0;\nSET NAMES utf8mb4;\nBEGIN;\n" : "";
	$transaction2 = $transaction ? "COMMIT;\nSET AUTOCOMMIT = 1;" : "";
	$setDataFixConfigFlag = "";
	if ($setDataFixConfigFlagComplete !== false && isset($GLOBALS[$setDataFixConfigFlagComplete])) {
		$setDataFixConfigFlag = "-- Set config flag to show that we have completed this step\nreplace into redcap_config (field_name, value) values ('$setDataFixConfigFlagComplete', '1');\n";
	}
	return "-- $comment
USE `{$GLOBALS['db']}`;
SET SESSION SQL_SAFE_UPDATES = 0;
{$transaction1}{$fkc1}{$sql}{$setDataFixConfigFlag}{$fkc2}{$transaction2}";
}



## Init vars
// Set REDCap table column whose data should NOT be converted (not including any columns that include "%field_name%", which will always be ignored)
// (2023) Note regarding emails - Email addresses can contain accented characters, but not sure if this is allowed everywhere in REDCap. 
// https://gmail.googleblog.com/2014/08/a-first-step-toward-more-global-email.html
// Will keep the pre-existing email fields in this blocklist but will refrain from adding more.

$columnsNotConvertData = [
	"redcap_auth" => ["password", "password_salt", "password_answer", "password_reset_key"],
	"redcap_auth_history" => ["password"],
	"redcap_sendit_recipients" => [], // Ignore whole table
	"redcap_sessions" => [], // Ignore whole table
	"redcap_surveys_emails_recipients" => [], // Ignore whole table
	"redcap_surveys_erase_twilio_log" => [], // Ignore whole table
"redcap_user_information" => [], // Ignore whole table
	"redcap_instrument_zip" => [], // Ignore whole table
	"redcap_instrument_zip_origins" => ["server_name"],
	"redcap_ehr_access_tokens" => [], // Ignore whole table
	"redcap_crons_history" => [], // Ignore whole table
	"redcap_crons" => [], // Ignore whole table
	"redcap_dashboard_ip_location_cache" => [], // Ignore whole table
	"redcap_ehr_fhir_logs" => [], // Ignore whole table
	"redcap_external_modules_downloads" => [], // Ignore whole table
	"redcap_external_modules" => [], // Ignore whole table
	"redcap_history_version" => [], // Ignore whole table
	"redcap_ip_cache" => [], // Ignore whole table
	"redcap_ip_banned" => [], // Ignore whole table
	"redcap_validation_types" => ["legacy_value", "regex_js", "regex_php", "validation_name"],
	"redcap_ddp_preview_fields" => [], // Ignore whole table
	"redcap_ddp_log_view" => [], // Ignore whole table
	"redcap_ddp_log_view_data" => [], // Ignore whole table
	"redcap_ddp_mapping" => [], // Ignore whole table
	"redcap_ddp_records_data" => [], // Ignore whole table
	"redcap_edocs_metadata" => ["stored_name", "mime_type", "file_extension"],
	"redcap_ehr_datamart_revisions" => [], // Ignore whole table
	"redcap_metadata" => ["field_phi", "element_type", "element_validation_type", "element_validation_checktype", "grid_name", "video_url", "element_validation_min", "element_validation_max"],
	"redcap_metadata_temp" => ["field_phi", "element_type", "element_validation_type", "element_validation_checktype", "grid_name", "video_url", "element_validation_min", "element_validation_max"],
	"redcap_metadata_archive" => ["field_phi", "element_type", "element_validation_type", "element_validation_checktype", "grid_name", "video_url", "element_validation_min", "element_validation_max"],
	"redcap_messages" => ["stored_url"],
	"redcap_mobile_app_devices" => ["uuid"],
	"redcap_events_metadata" => ["external_id"],
	"redcap_external_links" => ["link_url"],
	"redcap_docs" => ["docs_type", "docs_rights"],
	"redcap_library_map" => ["promis_key", "promis_battery_key"],
	"redcap_external_module_settings" => ["key", "type"],
	"redcap_external_modules_log" => ["ip"],
	"redcap_external_modules_log_parameters" => ["name"],
	"redcap_todo_list" => ["request_to", "todo_type", "action_url", "status"],
	"redcap_surveys" => ["theme_text_buttons", "theme_bg_page", "theme_text_title", "theme_bg_title", "theme_text_sectionheader", "theme_bg_sectionheader", "theme_text_question", "theme_bg_question", "survey_expiration", "confirmation_email_from", "text_to_speech_language"],
	"redcap_surveys_themes" => ["theme_text_buttons", "theme_bg_page", "theme_text_title", "theme_bg_title", "theme_text_sectionheader", "theme_bg_sectionheader", "theme_text_question", "theme_bg_question"],
	"redcap_user_rights" => [],
	"redcap_surveys_short_codes" => [],
	"redcap_two_factor_response" => [],
	"redcap_user_roles" => ["data_entry", "external_module_config"],
	"redcap_surveys_response" => ["return_code", "results_code"],
	"redcap_surveys_queue_hashes" => ["hash"],
	"redcap_reports" => ["hash", "short_url", "dynamic_filter1", "dynamic_filter2", "dynamic_filter3"], // dynamic filters are field names only
	"redcap_actions" => ["custom_text"],
	"redcap_surveys_pdf_archive" => ["ip"],
	"redcap_project_dashboards" => ["hash", "short_url"],
	"redcap_surveys_participants" => ["hash", "legacy_hash", "access_code", "access_code_numeral", "participant_email", "participant_phone"],
	"redcap_log_event" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event2" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event3" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event4" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event5" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event6" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event7" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event8" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_event9" => ["user", "sql_log", "object_type", "page", "ip", "description"],
	"redcap_log_view" => ["ip", "browser_name", "browser_version", "page", "full_url"],
	"redcap_log_view_old" => [ "ip", "browser_name", "browser_version", "page", "full_url"],
	"redcap_alerts_sent_log" => ["email_from", "email_to", "phone_number_to", "email_cc", "email_bcc"],
	"redcap_alerts" => ["email_from", "email_to", "phone_number_to", "email_cc", "email_bcc", "email_attachment_variable", "email_failed", "sendgrid_template_id"],
	"redcap_outgoing_email_sms_log" => ["sender", "recipients", "email_cc", "email_bcc", "attachment_doc_ids", "hash", "instrument"], 
	"redcap_projects" => ["project_name", "completed_by", "log_event_table", "__SALT__", "auth_meth", "project_language", "is_child_of", "project_contact_email", "headerlogo", "order_id_by", "project_pi_email", "project_irb_number", "secondary_pk", "data_entry_trigger_url", "twilio_account_sid", "twilio_auth_token", "twilio_voice_language", "mosio_api_key", "sendgrid_project_api_key"],
	"redcap_cde_cache" => ["tinyId"],
	"redcap_cde_field_mapping" => ["tinyId", "publicId", "questionId"],
	"redcap_events_calendar" => ["event_time"],
	"redcap_multilanguage_metadata" => ["type", "name"], // field name - ASCII only
	"redcap_multilanguage_metadata_temp" => ["type", "name"], // field name - ASCII only
	"redcap_multilanguage_ui" => ["item"], // field name - ASCII only
	"redcap_multilanguage_ui_temp" => ["item"], // field name - ASCII only
	"redcap_mycap_projectfiles" => ["project_code"],
	"redcap_mycap_syncissues" => ["project_code", "resolved_by"],
	"redcap_pub_articles" => ["pub_id"],
	"redcap_sendit_docs" => ["doc_type"],
	"redcap_mycap_aboutpages" => ["identifier"], // looks like a GUID
	"redcap_mycap_contacts" => ["identifier","phone_number"],
	"redcap_mycap_links" => ["identifier", "link_icon"],
	"redcap_mycap_messages" => ["processed_by"],
	"redcap_mycap_participants" => ["push_notification_ids"],
	"redcap_mycap_projects" => ["code", "hmac_key"],
	"redcap_mycap_tasks" => ["question_format", "card_display", "schedule_relative_to", "schedule_type", "schedule_frequency", "schedule_ends"], // Possible values given in table comments, all ASCII
	"redcap_mycap_themes" => ["primary_color", "light_primary_color", "accent_color", "dark_primary_color", "light_bg_color", "theme_type", "system_type"], // Color codes and systematic values, all ASCII
	"redcap_surveys_phone_codes" => ["phone_number", "twilio_number", "access_code"],
	"redcap_folders" => ["foreground", "background"]
];


// Does db need fixing?
$fixData = ($GLOBALS['db_character_set'] == 'latin1');
$fixStructure = !SQLTableCheck::using_utf8mb4();
$connectionIsMb3 = in_array(strtolower($GLOBALS['db_character_set']),['utf8mb3', 'utf8']);

// With regard to fixing data, set multiple flags in redcap_config (if not exist yet) to indicate progress of data fixed
if (!isset($GLOBALS['db_fix_data_nonproject'])) {
	$db_fix_val = $fixData ? "0" : "1";
	db_query("replace into redcap_config (field_name, value) values ('db_fix_data_nonproject', '$db_fix_val')");
	db_query("replace into redcap_config (field_name, value) values ('db_fix_data_project_active', '$db_fix_val')");
	db_query("replace into redcap_config (field_name, value) values ('db_fix_data_project_inactive', '$db_fix_val')");
	db_query("replace into redcap_config (field_name, value) values ('db_fix_data_extra', '$db_fix_val')");
	// Redirect so that these new config values get pulled into GLOBALS
	redirect(PAGE_FULL);
}

// Reset fixData based on config flag completeness
$fixData = !($GLOBALS['db_fix_data_nonproject'] == '1' && $GLOBALS['db_fix_data_project_active'] == '1' && $GLOBALS['db_fix_data_project_inactive'] == '1' && $GLOBALS['db_fix_data_extra'] == '1');


// HTML
$html = RCView::h4([], "<i class=\"fas fa-hat-wizard fs18\"></i> Updating your REDCap Database Tables to support full Unicode");
$html .= RCView::p(['class'=>'mt-4'],
	"REDCap installations that were first installed on a version prior to REDCap 8.5.0 will have an older, legacy type of database encoding or charset (character set) for its columns, known in MariaDB/MySQL as <i>UTF8</i> or <i>UTF8MB3</i>. The recommended character set supporting languages in the Unicode Standard is known as <a href=\"https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb4.html\" target=\"_blank\" rel=\"noopener noreferrer\"><i>UTF8<u>MB4</u></i></a>.
	<p>Additionally, if these installations were paired with a version of MariaDB/MySQL whose server-level charset was left unchanged from its default value of \"latin1,\" then any special/non-<u><a href=\"https://en.wikipedia.org/wiki/ASCII#Character_set\" target=\"_blank\" rel=\"noopener noreferrer\">ASCII</a></u> characters will appear garbled in the backend database due to a mismatch between the <i>latin1</i> connection charset presumed by PHP and the <i>utf8*</i> column charset in the database. For instance, the string \"qué\" may be stored as \"quÃ©\" when viewed with a database client. Fortunately, in this setup, since any garbled text stored in the database is also un-garbled when read and rendered in the browser, this issue has been mostly transparent (invisible) to users and administrators on the frontend. However, since special characters in this setup are still stored as malformed text, this configuration is not ideal and may require extra care when restoring from a backup, etc. to ensure data integrity.
	Mixed-encoding content may also occasionally get imported through data uploads, etc., appearing as question marks, black diamonds �, or \"<a href=\"https://en.wikipedia.org/wiki/Mojibake\" target=\"_blank\" rel=\"noopener noreferrer\"><u>Mojibake</u></a>\" when rendered in REDCap.</p>
	<p>As part of the v8.5 upgrade (2018), REDCap began detecting and storing this connection charset and its collation in the <i>redcap_config</i> table (i.e., <i>db_character_set</i> and <i>db_collation</i>) as a \"stopgap\" to ensure consistent encoding behavior, as well as implementing full <i>UTF8MB4</i> databases on *new* installations of REDCap.</p>
	<p>This page is designed to resolve these legacy issues and modernize the character encoding on affected installations by:
	<ol type=\"1\"><li>upgrading database columns from the legacy <i>UTF8/UTF8MB3</i> charset to <i>UTF8MB4</i>, and</li>
	<li>converting database values with non-ASCII characters from 'garbled' UTF8 to 'clean' UTF8 and resetting the connection encoding from <i>latin1</i> to <i>UTF8MB4</i>&mdash;thus restoring consistency and enabling full Unicode 'from front to back.'</li></ol>
	If you see red text below that says \"Issues Exist\", then this affects your REDCap installation, in which it is *highly* recommended that you follow the steps below to update your database.
	<b>Please note that if you are affected, this is NOT an urgent issue, but it is something we recommend you address sooner rather than later since your current database charset and collation
	(<i>UTF8</i> or <i>UTF8MB3</i>) have been deprecated in the latest versions of MySQL/MariaDB and thus will eventually be removed altogether in future versions of MySQL/MariaDB.</b></p>"
);

if (!$fixStructure && !$fixData) {
	include 'header.php';
	$html .= RCView::p(['class'=>'text-success mt-4'],
		"<b>STEP 1:</b> Database table structure is correct! The tables already have a UTF8MB4 charset and collation."
	);
	$html .= RCView::p(['class'=>'text-success'],
		"<b>STEP 2:</b> Database table data is correct! All table data is correctly encoded with the UTF8MB4 character set."
	);
	$html .= RCView::p(['class'=>'mt-4 fs15 text-success'],
		"<b><i class=\"fas fa-check\"></i> You're all good!</b> It appears that your REDCap database tables and their data are in the correct format. So there is nothing to do here. Enjoy REDCapping!"
	);
	print $html;
	include 'footer.php';
    exit;
}
$html .= RCView::p(['class'=>'mb-5'],
	"If you are affected, it is important to know that <u>the changes required to update your database character set/collation are significant</u>, 
	in which *every* REDCap database table will need to have its table structure modified, 
	and additionally some of the data in the tables must be modified and converted into the new character encoding. If you have a large REDCap installation
	(e.g., thousands of REDCap projects or a `redcap_data` table with tens of millions or more rows), then this process could take anywhere from 30 minutes to many hours to complete. 
	It is not possible to know exactly how long this process will take for you because it is affected by server CPU/RAM, the size of your database tables, and many other factors.
	Please follow the steps below to begin updating your database. <b>This is a multi-step process that must be performed one step at a time until all steps have been completed.</b>"
);

// Put all redcap tables in array
$redcapTables = [];
// $q = db_query("show tables like 'redcap\_%'");
$q = db_query("select `table_name` from information_schema.tables where `table_schema` = database() and `table_type` = 'BASE TABLE' and table_name like 'redcap\_%'");
while ($row = db_fetch_array($q)) {
	$redcapTables[] = $row[0];
}

## FIX TABLES
// Get db table structure changes
$sqlFixTableStructure = "";
if ($fixStructure)
{
	$tablesToFixStructure = [];
	$sqlFixTableStructureConfig = "";
	$tableCheck = new SQLTableCheck();
	$sql_fixes = $tableCheck->build_table_fixes(false, true);
	$dbStructureFixed = ($sql_fixes == "");
	$sqlUpdateConnectionMb3toMb4 = "";	
	if (!$dbStructureFixed) {
		// Group SQL by table
		$sql_fixes2 = [];
		foreach (explode("\n", $sql_fixes) as $line) {
			$posThirdSpace = strposX($line, " ", 3);
			$firstPart = substr($line, 0, $posThirdSpace);
			$secondPart = substr($line, $posThirdSpace + 1);
			$sql_fixes2[$firstPart][] = $secondPart;
			$tablesToFixStructure[] = trim(str_replace(["ALTER TABLE `", "`"], "", $firstPart));
		}
		$tablesToFixStructure = array_unique($tablesToFixStructure);
		// Fix tables that don't need columns fix
		foreach (array_diff($redcapTables, $tablesToFixStructure) as $table) {
			$sql_fixes2["ALTER TABLE `$table`"] = [];
		}
		ksort($sql_fixes2);
		$tableRowFormats = array();
        	$tableRowFormatQry = db_query("SHOW TABLE STATUS FROM `$db` where Name like 'redcap%'");
		while ($row2 = db_fetch_assoc($tableRowFormatQry)) {
			$tableRowFormats[$row2['Name']] = $row2['Row_format'];
		}
		foreach ($sql_fixes2 as $alterTable => $lines) {
			foreach ($lines as &$line) $line = rtrim(trim($line), ";");
			$table = trim(str_replace(["ALTER TABLE `", "`"], "", $alterTable));
			// Add ROW_FORMAT=DYNAMIC if it's in another format such as COMPACT, REDUNDANT, etc. (do this in one fell swoop instead of separately)
			$alterFormat = "";
			if (isset($tableRowFormats[$table]) && strtolower($tableRowFormats[$table]) != 'dynamic') {
				$alterFormat = "\n\tROW_FORMAT=DYNAMIC,";
            		}
            		// Set whole query
			$thisTableStructure = $alterTable . $alterFormat . "\n\tCHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci" . (empty($lines) ? "" : ",\n\t" . implode(",\n\t", $lines)) . ";\n";
			// Set config table separate because we'll append it manually later
			if ($table == "redcap_config") {
				$sqlFixTableStructureConfig = $thisTableStructure;
			} else {
				$sqlFixTableStructure .= $thisTableStructure;
			}
		}
	}
	if ($fixStructure && $connectionIsMb3) {
		$sqlUpdateConnectionMb3toMb4 = "\n-- Update Connection Encoding to UTF8MB4 --\n-- The config for the connection encoding (db_character_set) is set to 3-byte UTF-8 or 'utf8[mb3],' which is a subset of full UTF-8 encoding (utf8mb4).\n-- Since no text conversions are needed, update the connection encoding/collation utf8mb4/utf8mb4_unicode_ci at this step to complete the conversion process.";
		$sqlUpdateConnectionMb3toMb4 .= "\nUPDATE redcap_config\n\tSET `value` = 'utf8mb4' \n\tWHERE field_name = 'db_character_set' AND lower(`value`) IN ('utf8', 'utf8mb3');";	
		$sqlUpdateConnectionMb3toMb4 .= "\nUPDATE redcap_config\n\tSET `value` = 'utf8mb4_unicode_ci'\n\tWHERE field_name = 'db_collation' AND lower(`value`) like 'utf8%';\n";
	}
	// Append the config table at the very end since all this depends on its collation
	$sqlFixTableStructure = wrapSqlDbFlags("{$sqlFixTableStructure}{$sqlFixTableStructureConfig}{$sqlUpdateConnectionMb3toMb4}", false, "TABLE STRUCTURE: SQL to fix the table charset and collation of the REDCap database tables", true);
}


## FIX DATA
## Separate into 3 steps with 3 separate blocks of SQL to execute: Fix data for 1) Non-project tables (don't contain project_id field),
## 2) Projects with activity in the past year, 3) Projects with no activity in the past year, and 4) redcap_log_event and redcap_log_view where project_id is null.
## The config db_collation value can be set after Step 2, and thus Steps 3 and 4 can be run at a slightly later time if needed.

// Get project_ids, survey_ids, and event_ids of projects active in the past year
$pidsActivePastYear = $eventIdsActivePastYear = $surveyIdsActivePastYear = [];
$sql = "select project_id from redcap_projects where last_logged_event > DATE_SUB(NOW(), INTERVAL 1 YEAR)";
$q = db_query($sql);
if (!$q) print_array("DB QUERY ERROR: ".db_error()."<br>on the query:<br>$sql");
while ($row = db_fetch_assoc($q)) {
	$pidsActivePastYear[] = $row['project_id'];
}
if (!empty($pidsActivePastYear)) {
	$sql = "select survey_id from redcap_surveys where project_id in (" . implode(",", $pidsActivePastYear) . ")";
	$q = db_query($sql);
	if (!$q) print_array("DB QUERY ERROR: " . db_error() . "<br>on the query:<br>$sql");
	while ($row = db_fetch_assoc($q)) {
		$surveyIdsActivePastYear[] = $row['survey_id'];
	}
	$sql = "select event_id from redcap_events_arms a, redcap_events_metadata e 
			where a.arm_id = e.arm_id and a.project_id in (" . implode(",", $pidsActivePastYear) . ")";
	$q = db_query($sql);
	if (!$q) print_array("DB QUERY ERROR: " . db_error() . "<br>on the query:<br>$sql");
	while ($row = db_fetch_assoc($q)) {
		$eventIdsActivePastYear[] = $row['event_id'];
	}
}

// Find all table columns whose data needs to be converted
if ($fixData) {
	// Populate array of tables and columns to fix
	$redcapCols = [];
	foreach ($redcapTables as $table) {
		$allColsAllTables[$table] = getTableColumns($table);
		// Ignore table?
		if (isset($columnsNotConvertData[$table]) && empty($columnsNotConvertData[$table])) {
			continue;
		}
		// Get columns and add any text/varchars to array (always ignore fields named '%field_name%')
		// (All of the fixed length char fields are either hashes or uuid's.)
		$sql2 = "SHOW COLUMNS FROM `$table` WHERE `Field` not like '%field_name%' and `Field` not like '%form_name%' and `Field` not like '%user%' 
				 and `Field` not like '%unique%' and `Field` not like '%session_id%' and `Field` not like '%\_field%' and `Field` not like '%\lang_id%'
				  and `Field` not like '%\instrument%' and `Field` not like '%hash'";
		$q2 = db_query($sql2);
		while ($row2 = db_fetch_assoc($q2)) {
			$colType = strtolower($row2['Type']);
			$colName = $row2['Field'];
			// Only convert data for text/varchars
			if ((in_array($colType, ['text', 'mediumtext', 'longtext']) || strpos($colType, "varchar") === 0)
				// Skip this field if we are ignoring it manually
				&& !(isset($columnsNotConvertData[$table]) && in_array($colName, $columnsNotConvertData[$table]))
			) {
				$redcapCols[$table][] = $colName;
			}
		}
	}
	ksort($redcapCols);

	// #1: Fix data in non-project tables
	$nonProjectTables = [];
	foreach ($redcapCols as $table => $cols) {
		$allCols = $allColsAllTables[$table];
		// classify as non-project-table if table is missing project/event/survey id and doesn't match the following strings. 
		// all tables that DO match the following strings will stay in redcapCols (will not be moved to nonProjectTables).
		if (!(array_key_exists('project_id', $allCols) || array_key_exists('survey_id', $allCols) || array_key_exists('event_id', $allCols)
			|| strpos($table, "_surveys") !== false || strpos($table, "_randomization") !== false || strpos($table, "_alerts") !== false
			|| strpos($table, "_data_quality") !== false || strpos($table, "_external_modules") !== false
		)) {
			// Move table from $redcapCols to $nonProjectTables
			$nonProjectTables[$table] = $redcapCols[$table];
			unset($redcapCols[$table]);
		}
	}
	// SQL to fix data in non-project-tables
	foreach ($nonProjectTables as $table => $cols) {
		foreach ($cols as $col) {
			$sqlFixTableData1 .= generateUpdateSql($table, $col);
		}
	}
	// Fix redcap_user_information manually since we're ignoring all "user*" fields
	$sqlFixTableData1 .= generateUpdateSql("redcap_user_information", "user_firstname");
	$sqlFixTableData1 .= generateUpdateSql("redcap_user_information", "user_lastname");
	$sqlFixTableData1 .= generateUpdateSql("redcap_user_information", "user_comments");
	$sqlFixTableData1 = wrapSqlDbFlags($sqlFixTableData1, true, "NON-PROJECT-RELATED TABLES & ACTIVE PROJECTS\n\n-- NON-PROJECT-RELATED TABLES: SQL to fix the garbled data in non-project-related REDCap database tables (as a single transaction)", false, 'db_fix_data_nonproject');

	// #2: Fix data in project-related tables, separating active and non-active projects
    $sqlFixTableData2 .= "-- Clear rows that might fail FK update
update redcap_outgoing_email_sms_log l left join redcap_projects p on p.project_id = l.project_id set l.project_id = null where l.project_id is not null and p.project_id is null;
delete l.* from redcap_user_rights l left join redcap_projects p on p.project_id = l.project_id where l.project_id is not null and p.project_id is null;
delete l.* from redcap_user_roles l left join redcap_projects p on p.project_id = l.project_id where l.project_id is not null and p.project_id is null;\n";
	foreach ($redcapCols as $table => $cols) {
		foreach ($cols as $col) {
			// For projects that have been recently active
			$sqlFixTableData2 .= generateUpdateSql($table, $col, $pidsActivePastYear, $surveyIdsActivePastYear, $eventIdsActivePastYear, true);
			// For projects that have not been recently active
			$sqlFixTableData3 .= generateUpdateSql($table, $col, $pidsActivePastYear, $surveyIdsActivePastYear, $eventIdsActivePastYear, false);
		}
	}
	// Update config table
	$sqlFixTableData2 .= "UPDATE `redcap_config` SET `value` = 'utf8mb4' WHERE `field_name` = 'db_character_set';\n"
		. "UPDATE `redcap_config` SET `value` = 'utf8mb4_unicode_ci' WHERE `field_name` = 'db_collation';\n";
	
	// Put everything inside a transaction
	$sqlFixTableData2 = wrapSqlDbFlags($sqlFixTableData2, true, "ACTIVE PROJECTS: SQL to fix the garbled data in project-related REDCap database tables (as a single transaction)", false, 'db_fix_data_project_active');

	// Put everything inside a transaction
	$sqlFixTableData3 = wrapSqlDbFlags($sqlFixTableData3, true, "NON-ACTIVE PROJECTS: SQL to fix the garbled data in project-related REDCap database tables (as a single transaction)", false, 'db_fix_data_project_inactive');

	// #4: Manually add redcap_log_event and redcap_log_view where PROJECT_ID IS NULL
	$sqlFixTableData4 .= generateUpdateSql("redcap_log_event", "pk", [0]); // redcap_log_event project_id's are not nullable, default to 0
	$sqlFixTableData4 .= generateUpdateSql("redcap_log_event", "data_values", [0]);
	$sqlFixTableData4 .= generateUpdateSql("redcap_log_event", "change_reason", [0]);
	$sqlFixTableData4 .= generateUpdateSql("redcap_log_view", "record", null);
	$sqlFixTableData4 .= generateUpdateSql("redcap_log_view", "miscellaneous", null);
	$sqlFixTableData4 = wrapSqlDbFlags($sqlFixTableData4, true, "LOW-PRIORITY: SQL to fix the garbled data in non-project-related log tables (as a single transaction)", false, 'db_fix_data_extra');
}


// Only list the "fix data" steps we haven't completed yet (based on the config values)
if ($GLOBALS['db_fix_data_nonproject'] == '1') $sqlFixTableData1 = "";
if ($GLOBALS['db_fix_data_project_active'] == '1') $sqlFixTableData2 = "";
if ($GLOBALS['db_fix_data_project_inactive'] == '1') $sqlFixTableData3 = "";
if ($GLOBALS['db_fix_data_extra'] == '1') $sqlFixTableData4 = "";



$addlInstructions = '
	<p class="mt-5"><b style="font-size:13px;">RECOMMENDATION: Save the SQL above as a file and run it via command line.</b></p>
	<ol>
		<li>Copy and paste the SQL upgrade script to a file, and place the file somewhere on your MySQL database server
		(via FTP or however you access the database server\'s file system). Make sure the filename remains as "redcap_db_fix.sql".</li>
		<li>Open a terminal window (command line interface) to your MySQL database server, and on that server navigate to the directory where you placed the 
		upgrade script file (using "cd" or other similar command).</li>
		<li>Via command line, execute the line below (replacing USERNAME with the username of the MySQL user you are connecting with).</li>
	</ol>
	<div style=\'margin:6px 0 20px 22px;\'>
		<textarea style=\'margin:0 0 0 8px;padding: 3px 5px; background: none repeat scroll 0 0 #F6F6F6;border-color: #A4A4A4 #B9B9B9 #B9B9B9; border-radius: 3px;border-right: 1px solid #B9B9B9; border-style: solid; border-width: 1px;box-shadow: 0 1px 0 #FFFFFF, 0 1px 1px rgba(0, 0, 0, 0.17) inset;color:#444;font-size:12px;width:96%;height:30px;\' readonly=\'readonly\' onclick=\'this.select();\'>mysql -u USERNAME -p -h '.$GLOBALS['hostname'].' '.$GLOBALS['db'].' < redcap_db_fix.sql</textarea>
	</div>
	<p class="text-danger fs14"><b>After you execute the SQL above, refresh this page</b> to see if there is anything else to do afterward.</p>';


// 1) DB structure needs to be fixed
if ($sqlFixTableStructure != "") {
	$html .= RCView::p(['class'=>'mb-4 text-danger fs15 font-weight-bold'],
		"<i class=\"fas fa-exclamation-circle\"></i> ISSUES EXIST IN YOUR REDCAP DATABASE: Follow all the instructions below to fix them."
	);
	$html .= RCView::p([],
		"<b>PRE-STEP:</b> It is *HIGHLY* recommended that you <b>perform a database backup</b> before running any of the SQL generated below (in case of the unlikely event that something goes wrong
		and you have to restore your database). Also prior to performing Step 1, it is recommended that you take REDCap offline (via the General Configuration page in the Control Center)
		so that users are not using the system while doing this. You might additionally <u>consider performing this process on a REDCap test server first or (even better) a MySQL replica
		of your production server</u>."
	);
	$html .= RCView::p([],
		"<b>STEP 1:</b> Changes need to be made to the REDCap database tables. Copy, paste, and execute the SQL below to change the tables. Please note that this process may
		take a VERY LONG TIME (possibly hours) to run depending on the size of your database. 
		For this step, it is recommended that you <b>take REDCap offline</b> (via the General Configuration page in the Control Center)
		so that users are not using the system while doing this."
	);
	$html .= "<textarea style='margin:8px 0 8px 10px;padding: 3px 5px; background: none repeat scroll 0 0 #F6F6F6;border-color: #A4A4A4 #B9B9B9 #B9B9B9; border-radius: 3px;border-right: 1px solid #B9B9B9; border-style: solid; border-width: 1px;box-shadow: 0 1px 0 #FFFFFF, 0 1px 1px rgba(0, 0, 0, 0.17) inset;color:#444;font-size:11px;width:90%;height:210px;' readonly='readonly' onclick='this.select();'>$sqlFixTableStructure</textarea>";
	$html .= RCView::p(['style'=>'color:#999;'],
		"<b>STEP 2:</b> Changes need to be made to fix the incorrectly encoded (garbled) data in the REDCap database tables. (Instructions for this step will only be revealed after performing Step 1.)"
	);
	$html .= $addlInstructions;
}
// 2) DB data needs to be fixed
elseif ($sqlFixTableData1.$sqlFixTableData2.$sqlFixTableData3.$sqlFixTableData4 != "") {
	$html .= RCView::p(['class'=>'mb-4 text-danger fs15 font-weight-bold'],
		"<i class=\"fas fa-exclamation-circle\"></i> ISSUES EXIST IN YOUR REDCAP DATABASE: Follow all the instructions below to fix them."
	);
	$html .= RCView::p(['class'=>'text-success'],
		"<b>STEP 1:</b> Database table structure is correct! The tables already have a UTF8MB4 charset and collation."
	);
	$html .= RCView::p(['class'=>'mb-3'],
		"<b>STEP 2:</b> Changes need to be made to <u>fix the incorrectly encoded (garbled) data</u> in the REDCap database tables. 
		Copy, paste, and execute the SQL below to update the tables. Please note that this process may
		take a VERY LONG TIME (possibly hours) to run depending on the size of your database and your server's performance. 
		You should <b>execute the SQL in the textboxes below <u>one box at a time</u></b> -
		i.e., execute the first, then refresh this page, then execute the next, then refresh this page, until they have all been executed."
	);
	if ($sqlFixTableData1.$sqlFixTableData2 != '') {
		$html .= "<b>STEP 2A:</b> For this step, it is recommended that you <b>take REDCap offline</b> (via the General Configuration page in the Control Center)
				so that users are not using the system while doing this.
				<textarea style='display:block;margin:8px 0 18px 10px;padding: 3px 5px; background: none repeat scroll 0 0 #F6F6F6;border-color: #A4A4A4 #B9B9B9 #B9B9B9; border-radius: 3px;border-right: 1px solid #B9B9B9; border-style: solid; border-width: 1px;box-shadow: 0 1px 0 #FFFFFF, 0 1px 1px rgba(0, 0, 0, 0.17) inset;color:#444;font-size:11px;width:90%;height:210px;' readonly='readonly' onclick='this.select();'>{$sqlFixTableData1}\n\n{$sqlFixTableData2}</textarea>";
	} else {
		$html .= RCView::div(['class'=>'text-success mb-3'],
			"<b>STEP 2A:</b> Done!"
		);
	}
	if ($sqlFixTableData3 != '') {
		$html .= "<b>STEP 2B:</b> For the following steps, <b>it is okay to bring REDCap back online again</b> when executing these. Executing the rest of the SQL should not affect 
				users currently using the system. If you are worried that server performance might be impacted by running these, it is perfectly fine to keep REDCap offline for this step too.
				<textarea style='display:block;margin:8px 0 18px 10px;padding: 3px 5px; background: none repeat scroll 0 0 #F6F6F6;border-color: #A4A4A4 #B9B9B9 #B9B9B9; border-radius: 3px;border-right: 1px solid #B9B9B9; border-style: solid; border-width: 1px;box-shadow: 0 1px 0 #FFFFFF, 0 1px 1px rgba(0, 0, 0, 0.17) inset;color:#444;font-size:11px;width:90%;height:210px;' readonly='readonly' onclick='this.select();'>$sqlFixTableData3</textarea>";
	} else {
		$html .= RCView::div(['class'=>'text-success mb-3'],
			"<b>STEP 2B:</b> Done!"
		);
	}
	if ($sqlFixTableData4 != '') {
		$html .= "<b>STEP 2C:</b> Because the SQL in this step is much lower priority, is unlikely to affect users if not executed.
				This SQL can be executed at a later time, if needed (e.g., hours or days later). But it still must be done
				to complete the overall process of updating your database tables and data.
				<textarea style='display:block;margin:8px 0 18px 10px;padding: 3px 5px; background: none repeat scroll 0 0 #F6F6F6;border-color: #A4A4A4 #B9B9B9 #B9B9B9; border-radius: 3px;border-right: 1px solid #B9B9B9; border-style: solid; border-width: 1px;box-shadow: 0 1px 0 #FFFFFF, 0 1px 1px rgba(0, 0, 0, 0.17) inset;color:#444;font-size:11px;width:90%;height:210px;' readonly='readonly' onclick='this.select();'>$sqlFixTableData4</textarea>";
	}
	$html .= $addlInstructions;
}

## ADD CONFIG SETTINGS TO DENOTE EACH OF THE 4 DATA FIX STEPS BEING COMPLETED,
## SO WE DON'T HAVE TO RELY ONLY OFF OF THE DB_COLLATION CONFIG SETTING, WHICH WILL BE FIXED HALFWAY THROUGH


// Render page
include 'header.php';
print $html;
include 'footer.php';
