<?php
global $format, $returnFormat, $post;

$content = REDCap::renameRecord(PROJECT_ID, $post['record'], $post['new_record_name'], $post['arm']);

# Logging
Logging::logEvent("", "redcap_data_access_groups_users", "MANAGE", PROJECT_ID, "project_id = " . PROJECT_ID, "Switch DAG (API$playground)");

# Send the response to the requestor
RestUtility::sendResponse(200, $content, $format);