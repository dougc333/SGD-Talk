<?php

require_once dirname(dirname(__FILE__)) . "/Config/init_project.php";

// Initialize vars
$popupContent = $popupTitle = "";
$storedData = array();


## RENDER DIALOG CONTENT FOR SETTING UP CONDITIONS
if (isset($_POST['action']) && $_POST['action'] == "view")
{
	// Response
	$popupTitle = "<i class=\"fas fa-eye-slash\"></i> ".$lang['design_985'];
	$popupContent = FormDisplayLogic::displayFormDisplayLogicTable();
	$storedData = FormDisplayLogic::getFormDisplayLogicTableValues(PROJECT_ID);
}


## SAVE CONDITIONS SETTINGS
elseif (isset($_POST['action']) && $_POST['action'] == "save")
{
	$forms_list = array();
	$sql_all = array();
	$hide_filled_forms = ($_POST['prevent_hiding_filled_forms'] == true) ? 0 : 1;
	$hide_disabled_forms = ($_POST['hide_disabled_forms'] == true) ? 1 : 0;
	$enable_survey_support = (isset($_POST['enable_survey_support']) && $_POST['enable_survey_support'] == true) ? 1 : 0;

	$sql_all[] = $sql = "UPDATE redcap_projects 
						SET hide_filled_forms = '$hide_filled_forms', hide_disabled_forms = '$hide_disabled_forms', form_activation_survey_autocontinue = '$enable_survey_support' 
						WHERE project_id = " . PROJECT_ID;
	db_query($sql);

	$deletedIds = json_decode($_POST['deleted_ids']);
	if (!empty($deletedIds)) {
		// Delete Controls
		$sql_all[] = $sql = "DELETE FROM redcap_form_display_logic_conditions WHERE control_id IN (" . prep_implode($deletedIds) . ") and project_id = '" . PROJECT_ID . "'";
		db_query($sql);
	}

	$sql = "SELECT control_id FROM redcap_form_display_logic_conditions WHERE project_id = '" . PROJECT_ID . "'";
	$q = db_query($sql);
	while ($row = db_fetch_assoc($q)) {
		$controlIds[] = $row['control_id'];
	}

	if (isset($_POST['outer-list'])) {
		foreach ($_POST['outer-list'] as $post_controls) {
			$control_id = $post_controls['control_id'];
			if (empty($control_id)) {
				// Insert
				$sql_all[] = $sql = "INSERT INTO redcap_form_display_logic_conditions (project_id, control_condition) VALUES
									 ('" . PROJECT_ID . "', '" . db_escape($post_controls['control-condition']) . "')";
				if (db_query($sql)) {
					$control_id = db_insert_id();
				}
			} else {
				// Update
				$sql_all[] = $sql = "UPDATE redcap_form_display_logic_conditions SET control_condition = '" . db_escape($post_controls['control-condition']) . "' WHERE control_id ='" . $control_id . "'";
				db_query($sql);
			}

			if ($control_id > 0) {
				$sql_all[] = $sql = "DELETE FROM redcap_form_display_logic_targets WHERE control_id ='" . $control_id . "'";
				$q = db_query($sql);
				foreach ($post_controls['form-name'] as $form_event_pair) {
					list($form_name, $event_id) = explode("-", $form_event_pair);
					if ($Proj->longitudinal) {
						$event_name = ($event_id == '') ? $lang['alerts_70'] : $Proj->eventInfo[$event_id]['name_ext'];
						$forms_label = "{$Proj->forms[$form_name]['menu']} ($event_name)";
					} else {
						$forms_label = "{$Proj->forms[$form_name]['menu']}";
					}
					if (!in_array($forms_label, $forms_list)) {
						$forms_list[] = $forms_label;
					}
					// Insert Target Forms
					$sql_all[] = $sql = "INSERT INTO redcap_form_display_logic_targets (control_id, form_name, event_id) VALUES
											('" . db_escape($control_id) . "', '" . db_escape($form_name) . "', " . checkNull($event_id) . ")";
					$q = db_query($sql);
				}
			}
		}
	} else {
		// Delete Controls
		$sql_all[] = $sql = "DELETE FROM redcap_form_display_logic_conditions WHERE project_id = '" . PROJECT_ID . "'";
		db_query($sql);
	}

    // Response
    $popupTitle = $lang['design_243'];

    $forms_list_text = "";
	if (!empty($forms_list)) {
	    $forms_list_text = "<p>".$lang['design_963']."</p>";
        $forms_list_text .= "<ul>";
        foreach ($forms_list as $form) {
            $forms_list_text .= "<li>".$form."</li>";
        }
        $forms_list_text .= "</ul>";
    }
    $popupContent = RCView::img(array('src'=>'tick.png')) .
        RCView::span(array('style'=>"color:green;"), $lang['design_987']).
        $forms_list_text;
	// Log the event
	Logging::logEvent(implode(";\n", $sql_all), "redcap_form_render_skip_logic", "MANAGE", PROJECT_ID, "project_id = ".PROJECT_ID, "Edit settings for Form Render Skip Logic");
}

// Send back JSON response
header("Content-Type: application/json");
print json_encode_rc(array('content'=>$popupContent,
                            'title'=>$popupTitle,
                            'stored_data'=>$storedData));