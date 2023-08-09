<?php
global $format, $returnFormat, $post;



// If user has "No Access" export rights, then return error
if ($post['export_rights'] == '0') {
	exit(RestUtility::sendResponse(403, 'The API request cannot complete because currently you have "No Access" data export rights. Higher level data export rights are required for this operation.'));
}

// Get project attributes
$Proj = new Project();

// Get user rights
$user_rights_proj_user = UserRights::getPrivileges(PROJECT_ID, USERID);
$user_rights = $user_rights_proj_user[PROJECT_ID][strtolower(USERID)];
$ur = new UserRights();
$user_rights = $ur->setFormLevelPrivileges($user_rights);
unset($user_rights_proj_user);

// De-Identification settings
$hashRecordID = (isset($user_rights['forms_export'][$Proj->firstForm]) && $user_rights['forms_export'][$Proj->firstForm] > 1 && $Proj->table_pk_phi);

// Ensure that this report_id belongs to this project
$allReports = DataExport::getReports(null, array(), array(), PROJECT_ID);
if (!isset($allReports[$post['report_id']])) {
    exit(RestUtility::sendResponse(403, 'The API request cannot complete because report_id='.$post['report_id'].' does not belong to this project.'));
}

// Export the data for this report
$content = DataExport::doReport($post['report_id'], 'export', $format, ($post['rawOrLabel'] == 'label'), ($post['rawOrLabelHeaders'] == 'label'),
								false, false, null, $hashRecordID, null, null, null, false, false, array(), array(), false, $post['exportCheckboxLabel'],
								false, true, true, "", "", "", false, (isset($post['csvDelimiter']) ? $post['csvDelimiter'] : ","),
								(isset($post['decimalCharacter']) ? $post['decimalCharacter'] : null), array(),
								false, true, false, false, false, true, true);

// Send the response to the requestor
RestUtility::sendResponse(200, $content, $format);