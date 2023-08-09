<?php

namespace Vanderbilt\REDCap\Classes\MyCap;

use RCView;

class Participant
{
    const PARTICIPANTS_PER_PAGE = 100;

    /**
     * Get table layout of all participant stored in db
     *
     * @return string
     */
    public static function renderParticipantList()
    {
        global $lang, $myCapProj, $user_rights, $Proj;

        $baselineDateEnabled = ZeroDateTask::baselineDateEnabled();

        $participantIdentifierEnabled = ((isset($myCapProj->project['participant_custom_field']) && $myCapProj->project['participant_custom_field'] != '')
                                      || (isset($myCapProj->project['participant_custom_label']) && $myCapProj->project['participant_custom_label'] != ''));
        $participant_identifier_img = $participantIdentifierEnabled ? 'tick_small_circle.png' : 'bullet_delete.png';

        print RCView::p(array('class'=>'mt-0 mb-2', 'style'=>'max-width:900px;'), $lang['mycap_mobile_app_554']);
        print RCView::p(array('class'=>'mt-3 mb-1 fs12', 'style'=>'line-height:1.2;color:#666;max-width:900px;'), $lang['mycap_mobile_app_585']);
        print RCView::p(array('class'=>'mt-0 mb-4 fs12', 'style'=>'line-height:1.2;color:#666;max-width:900px;'), $lang['mycap_mobile_app_627']);
        // Get list of participants to display as table
        $part_list = self::getParticipantList(PROJECT_ID);

        ## BUILD THE DROP-DOWN FOR PAGING THE PARTICIPANTS
        // Get participant count
        $participantCount = count($part_list);
        // Section the Participant List into multiple pages
        $num_per_page = self::PARTICIPANTS_PER_PAGE;
        // Calculate number of pages for dropdown
        $num_pages = ceil($participantCount/$num_per_page);
        // Limit
        $limit_begin  = 0;
        if (!isset($_GET['pagenum'])) $_GET['pagenum'] = 1;
        if (isset($_GET['pagenum']) && $_GET['pagenum'] == 'last') {
            $_GET['pagenum'] = $num_pages;
        }
        if (isset($_GET['pagenum']) && is_numeric($_GET['pagenum']) && $_GET['pagenum'] > 1) {
            $limit_begin = ($_GET['pagenum'] - 1) * $num_per_page;
        }
        ## Build the paging drop-down for participant list
        $pageDropdown = "<select onchange='loadParticipantList(this.value)' style='vertical-align:middle;font-size:11px;'>";
        //Loop to create options for dropdown
        for ($i = 1; $i <= $num_pages; $i++) {
            $end_num   = $i * $num_per_page;
            $begin_num = $end_num - $num_per_page + 1;
            $value_num = $end_num - $num_per_page;
            if ($end_num > $participantCount) $end_num = $participantCount;
            $pageDropdown .= "<option value='$i' " . ($_GET['pagenum'] == $i ? "selected" : "") . ">$begin_num - $end_num</option>";
        }
        $pageDropdown .= "</select>";
        $pageDropdown  = "{$lang['survey_45']} $pageDropdown {$lang['survey_133']} $participantCount";

        // If viewing ALL participants, then set $num_per_page to null to return all participants
        if ($_GET['pagenum'] == 'ALL') $num_per_page = null;


        list($all_participants, $all_records) = self::getDropDownList(PROJECT_ID);

        foreach (array_slice($part_list, $limit_begin, $num_per_page) as $this_part=>&$attr)
        {
            // Trim identifier
            $identifier = trim($attr['identifier']);

            if ($attr['is_deleted'] == 0) {
                $access_code = 	RCView::a(array('href'=>'javascript:;', 'onclick'=>"getQRCode('{$attr['record']}');"),
                    (!gd2_enabled()
                        ? RCView::img(array('src'=>'ticket_arrow.png', 'style'=>'vertical-align:middle;'))
                        : RCView::img(array('src'=>'access_qr_code.gif', 'style'=>'vertical-align:middle;'))
                    )
                );
            } else {
                $access_code = '<span style="color:#ccc;">'.$lang['control_center_149'].'</span>';
            }

            $display_id = "<a href='".APP_PATH_WEBROOT."DataEntry/record_home.php?pid=".PROJECT_ID."&arm=".getArm()."&id={$attr['record']}' style='font-size:12px;text-decoration:underline;'>{$attr['record']}</a>";

            // Add to array
            $part_list_full[$i] = array();
            $part_list_full[$i][] = "<div class='wrapemail'>{$identifier}</div>";
            $part_list_full[$i][] = "<div class='wrap' style='word-wrap:break-word;'>$display_id</div>";
            $part_list_full[$i][] = "<div class='wrapemail'>{$attr['join_date']}</div>";
            if ($baselineDateEnabled) {
                $part_list_full[$i][] = "<div class='wrapemail'>{$attr['baseline_date']}</div>";
            }
            // Quick code and QR code
            $part_list_full[$i][] = $access_code;
            $buttons = '';
            if ($attr['record'] != '') {
                $buttons .= '<a onclick="openMessagesHistory(\''.$this_part.'\');" href="javascript:;" style="outline:none;color:#3E72A8;font-family:Tahoma;font-size:12px;"><i class="fas fa-comment-alt"></i> '.$lang['mycap_mobile_app_415'].'</a>';
                if ($attr['is_deleted'] == 1) {
                    $buttons .= '<a onclick="deleteMyCapParticipant(\''.$attr['record'].'\',\''.$this_part.'\',\'undelete\');" href="javascript:;" style="margin-left:12px;outline:none;color:#B00000;font-family:Tahoma;font-size:12px;"><i class="fas fa-trash-restore"></i> '.$lang['mycap_mobile_app_373'].'</a>';
                } else {
                    $buttons .= '<a onclick="deleteMyCapParticipant(\''.$attr['record'].'\',\''.$this_part.'\',\'delete\');" href="javascript:;" style="margin-left:12px;outline:none;color:#777;font-family:Tahoma;font-size:12px;"><i class="fas fa-trash"></i> '.$lang['global_19'].'</a>';
                }
                $part_list_full[$i][] = $buttons;
            } else {
                $part_list_full[$i][] = '';
            }

            $i++;
            // Remove this row to save memory
            unset($part_list[$this_part]);
        }

        // If no participants exist yet, render one row to let user know that
        //$part_list_full = array();
        if (empty($part_list_full))
        {
            // No participants exist yet
            $part_list_full[0] = array(RCView::div(array('class'=>'wrap','style'=>'color:#800000;'), $lang['survey_34']),"","","","","");
        }

        // Build participant list table
        $partTableWidth = 955;
        $partTableHeaders = array();
        $partTableHeaders[] = array(269, $lang['mycap_mobile_app_357']. RCView::button(array('class'=>'btn btn-defaultrc btn-xs fs11 ms-4',
                                'id'=>"set-identifier"), '<i class="fas fa-tag"></i> '. $lang['survey_152']. RCView::img(array('src' => APP_PATH_IMAGES . $participant_identifier_img, 'style'=>'margin-left:5px;position:relative;top:-1px;'))));
        $partTableHeaders[] = array(100, $lang['global_49'], "center");
        $partTableHeaders[] = array(($baselineDateEnabled ? 150 : 312), $lang['mycap_mobile_app_125']);
        if ($baselineDateEnabled) {
            $partTableHeaders[] = array(150, $lang['mycap_mobile_app_127']);
        }

        // Quick code and QR code
        $partTableHeaders[] = array(65, "<div class='wrap' style='line-height:1.1;'>".(gd2_enabled() ? $lang['mycap_mobile_app_356'] : $lang['survey_628'])."</div>", "center", "string", false);
        $partTableHeaders[] = array(135, $lang['mobile_app_87']);

        $partTableTitle = RCView::div(array(),
            RCView::div(array('style'=>'padding:2px 5px 0 5px;float:left;font-size:14px;'),
                $lang['mycap_mobile_app_626'] . RCView::br() .
                RCView::span(array('style'=>'line-height:24px;color:#666;font-size:11px;font-weight:normal;'),
                    $lang['mycap_mobile_app_374'] .
                    RCView::br() .
                    RCView::br() .
                    ## PAGING
                    RCView::span(array('style'=>'color:#555;font-size:11px;font-weight:normal;'),
                        $pageDropdown
                    )
                )
            ) .
            ## QUICK BUTTONS
            RCView::div(array('style'=>'font-weight:normal;float:left;font-size:11px;padding-left:12px;border-left:1px solid #ccc;'),
                RCView::button(array('class'=>'btn btn-defaultrc btn-xs fs11', 'style'=>'margin-top:5px;color:#000066;display:block;',
                    'onclick'=>"openEmailTemplatePopup('', 'qr');return false;"), '<i class="fas fa-user-plus"></i> '.$lang['mycap_mobile_app_375']) .
                RCView::button(array('class'=>'btn btn-defaultrc btn-xs fs11', 'style'=>'margin-top:20px;color:#A00000;display:block;',
                    'onclick'=>"displayParticipantsLogicPopup();return false;"), '<i class="fas fa-eye-slash"></i> '.$lang['mycap_mobile_app_376'])
            ) .
            ## FILTERS
            RCView::div(array('style'=>'max-width:500px;font-weight:normal;float:left;font-size:11px;padding-left:15px;margin-left:10px;border-left:1px solid #ccc;'),
                // Date/time range
                $lang['mycap_mobile_app_125']." ".$lang['survey_439'] .
                RCView::text(array('id'=>'filterIBeginTime','value'=>$_GET['filterIBeginTime']??'','class'=>'x-form-text x-form-field filter_datetime_mdy','style'=>'margin-right:8px;margin-left:3px;width:102px;height:20px;line-height:20px;font-size:11px;', 'onblur'=>"redcap_validate(this,'','','hard','datetime_'+user_date_format_validation,1,1,user_date_format_delimiter);")) .
                $lang['mycap_mobile_app_125']." ".$lang['survey_440'] .
                RCView::text(array('id'=>'filterIEndTime','value'=>(isset($_GET['filterIEndTime']) ? $_GET['filterIEndTime'] : ""),'class'=>'x-form-text x-form-field filter_datetime_mdy','style'=>'margin-left:3px;width:102px;height:20px;line-height:20px;font-size:11px;', 'onblur'=>"redcap_validate(this,'','','hard','datetime_'+user_date_format_validation,1,1,user_date_format_delimiter);")) .
                RCView::span(array('class'=>'df','style'=>'color:#777;'), '('.\DateTimeRC::get_user_format_label().' H:M)') . RCView::br() .
                // Date/time range
                (!$baselineDateEnabled ? '' :
                    $lang['mycap_mobile_app_127']." ".$lang['survey_439'] .
                    RCView::text(array('id'=>'filterBBeginTime','value'=>($_GET['filterBBeginTime']??""),'class'=>'x-form-text x-form-field filter_datetime_mdy','style'=>'margin-right:8px;margin-left:3px;width:102px;height:20px;line-height:20px;font-size:11px;', 'onblur'=>"redcap_validate(this,'','','hard','datetime_'+user_date_format_validation,1,1,user_date_format_delimiter);")) .
                    $lang['mycap_mobile_app_127']." ".$lang['survey_440'] .
                    RCView::text(array('id'=>'filterBEndTime','value'=>(isset($_GET['filterBEndTime']) ? $_GET['filterBEndTime'] : ""),'class'=>'x-form-text x-form-field filter_datetime_mdy','style'=>'margin-left:3px;width:102px;height:20px;line-height:20px;font-size:11px;', 'onblur'=>"redcap_validate(this,'','','hard','datetime_'+user_date_format_validation,1,1,user_date_format_delimiter);")) .
                    RCView::span(array('class'=>'df','style'=>'color:#777;'), '('.\DateTimeRC::get_user_format_label().' H:M)') . RCView::br()
                ) .
                // Display all active participants displayed in this view
                $lang['survey_441'] .
                RCView::select(array('id'=>'filterParticipant','style'=>'font-size:11px;margin:2px 3px;'), $all_participants, $_GET['filterParticipant']??'',300) .
                // Display record names displayed in this view
                $lang['survey_441'] .
                RCView::select(array('id'=>'filterRecord','style'=>'margin-left:3px;font-size:11px;'), $all_records, $_GET['filterRecord']??'',300) .
                RCView::br() .
                // "Apply filters" button
                RCView::button(array('class'=>'jqbuttonsm','style'=>'margin-top:5px;font-size:11px;color:#800000;','onclick'=>"loadParticipantList(1)"), $lang['survey_442']) .
                RCView::a(array('href'=>PAGE_FULL."?participants=1&pid=".PROJECT_ID,'style'=>'vertical-align:middle;margin-left:15px;text-decoration:underline;font-weight:normal;font-size:11px;'), $lang['setup_53'])
            ) .
            RCView::div(array('class'=>'clear'), '')
        );
        // Build Participant List
        renderGrid("participant_table", $partTableTitle, $partTableWidth-count($partTableHeaders), "auto", $partTableHeaders, $part_list_full);
    }

    /**
     * Get list of all fields as type text to set as participant identifier
     *
     * @param string $id
     * @param string $name
     * @param string $selected
     * @param string $disabled
     * @return string
     */
    public static function renderParticipantDisplayLabelDropDown($id="", $name="", $selected="", $disabled="")
    {
        global $table_pk, $lang;
        // Set id and name
        $id   = (trim($id)   == "") ? "" : "id='$id'";
        $name = (trim($name) == "") ? "" : "name='$name'";
        // Staring building drop-down
        $html = "<select $id $name class='x-form-text x-form-field' $disabled>
                    <option value=''>{$lang['edit_project_60']}</option>";
        // Get list of fields ONLY from follow up forms to add to Select list
        $followUpFldOptions = "";
        $sql = "SELECT field_name, element_label FROM redcap_metadata 
                WHERE project_id = " . PROJECT_ID . "
                    AND field_name != CONCAT(form_name,'_complete') AND field_name != '$table_pk' 
                    AND (misc IS NULL OR (misc NOT LIKE '%@CALCTEXT%' AND misc NOT LIKE '%@CALCDATE%'))
                    AND element_type = 'text' ORDER BY field_order";
        $q = db_query($sql);
        while ($row = db_fetch_assoc($q))
        {
            $this_field = $row['field_name'];
            // Set field label
            $this_label = "$this_field - " . strip_tags(br2nl(label_decode($row['element_label'], false)));
            // Ensure label is not too long
            if (strlen($this_label) > 57) $this_label = substr($this_label, 0, 40) . "..." . substr($this_label, -15);
            // Add option
            $html .= "<option value='$this_field' " . ($this_field == $selected ? "selected" : "") . ">$this_label</option>";
        }
        // Finish drop-down
        $html .= "</select>";
        return $html;
    }

    /**
     * Get all participants stored in db
     *
     * @param interget $project_id
     * @return array
     */
    public static function getParticipantList($project_id)
    {
        global $user_rights;
        $groupID = ($user_rights['group_id'] != '' ? $user_rights['group_id'] : array());
        $codesList = array();
        // Format $codesList as array
        if (!is_array($groupID) && $groupID == '0') {
            // If passing group_id as "0", assume we want to return unassigned records.
        } elseif (!empty($groupID) && is_numeric($groupID)) {
            $codesList = self::getParticipantsInDAG(array($groupID));
        } elseif (!is_array($groupID)) {
            $codesList = array();
        }

        // Build participant list
        $part_list = array();
        $sql = "SELECT * FROM redcap_mycap_participants WHERE project_id = ".$project_id;
        if (!empty($_GET['filterRecord'])) $sql .= " AND record = '".db_escape($_GET['filterRecord'])."'";
        if (!empty($_GET['filterParticipant'])) $sql .= " AND record = '".db_escape($_GET['filterParticipant'])."'";
        if (!empty($codesList)) $sql .= " AND code IN (".prep_implode($codesList).")";
        $sql .= " ORDER BY record regexp '^[A-Z]', abs(record), left(record,1), CONVERT(SUBSTRING_INDEX(record,'-',-1),UNSIGNED INTEGER), CONVERT(SUBSTRING_INDEX(record,'_',-1),UNSIGNED INTEGER), record";

        $q = db_query($sql);

        ## DEFINE FILTERING VALUES
        // Set defaults
        if (isset($_GET['pagenum']) && (is_numeric($_GET['pagenum']) || $_GET['pagenum'] == 'last')) {
            // do nothing
        } elseif (!isset($_GET['pagenum'])) {
            $_GET['pagenum'] = 1;
        } else {
            $_GET['pagenum'] = 'ALL';
        }

        ## PERFORM MORE FILTERING
        // Now filter participants by filters defined
        if (isset($_GET['filterIBeginTime']) && $_GET['filterIBeginTime'] != '') {
            $filterIBeginTimeYmd = \DateTimeRC::format_ts_to_ymd($_GET['filterIBeginTime']);
        }
        if (isset($_GET['filterIEndTime']) && $_GET['filterIEndTime'] != '') {
            $filterIEndTimeYmd = \DateTimeRC::format_ts_to_ymd($_GET['filterIEndTime']);
        }
        if (isset($_GET['filterIBeginTime']) && $_GET['filterBBeginTime'] != '') {
            $filterBBeginTimeYmd = \DateTimeRC::format_ts_to_ymd($_GET['filterBBeginTime']);
        }
        if (isset($_GET['filterBEndTime']) && $_GET['filterBEndTime'] != '') {
            $filterBEndTimeYmd = \DateTimeRC::format_ts_to_ymd($_GET['filterBEndTime']);
        }

        global $myCapProj;
        $condition = $myCapProj->project['participant_allow_condition'] ?? null;
        while ($row = db_fetch_assoc($q))
        {
            // Check if logic set in "Allow participant logic" evaluates to TRUE
            $logicTest = true;
            $baseline_date_identifier = self::getBaselineDateIdentifier($row['record'], $project_id, false);

            if ($condition != '') {
                $logicTest = \REDCap::evaluateLogic($condition, $project_id, $row['record']);
            }
            if ($logicTest == false) {
                unset($row); continue;
            }
            // Filter by begin time - Install Date
            if (isset($filterIBeginTimeYmd) && substr($row['join_date'], 0, 16) < $filterIBeginTimeYmd) {
                unset($row); continue;
            }
            // Filter by end time - Install Date
            if (isset($filterIEndTimeYmd) && substr($row['join_date'], 0, 16) > $filterIEndTimeYmd) {
                unset($row); continue;
            }

            $baselineDateIdentifierYmd = $baseline_date_identifier;
            // Filter by begin time - Baseline Date
            if (isset($filterBBeginTimeYmd) && substr($baselineDateIdentifierYmd, 0, 16) < $filterBBeginTimeYmd) {
                unset($row); continue;
            }
            // Filter by end time - Baseline Date
            if (isset($filterBEndTimeYmd) && substr($baselineDateIdentifierYmd, 0, 16) > $filterBEndTimeYmd) {
                unset($row); continue;
            }
            $identifier = self::getParticipantIdentifier($row['record'], $project_id);
            // Set with identifier, and basic defaults for counts
            $part_list[$row['code']] = array('record' => $row['record'],
                                            'repeat_instance' => 1,
                                            'identifier' => $identifier,
                                            'join_date' => (!empty($row['join_date'])) ? \DateTimeRC::format_user_datetime($row['join_date'], 'Y-M-D_24') : '-',
                                            'baseline_date' => (!empty($baseline_date_identifier) ? \DateTimeRC::format_user_datetime($baseline_date_identifier, 'M-D-Y_24') : '-'),
                                            'is_deleted' => $row['is_deleted']);
        }

        // Return array
        return $part_list;
    }

    /**
     * Get participant identifier details by record
     *
     * @param string $record
     * @return string
     */
    public static function getParticipantIdentifier($record, $projectId = null, $participantCode=null)
    {
        if (!isinteger($projectId) && $participantCode != null) {
            $sql = "select project_id from redcap_mycap_participants where code = '".db_escape($participantCode)."'";
            $q = db_query($sql);
            if (db_num_rows($q)) {
                $projectId = db_result($q, 0);
            }
        } elseif (!isinteger($projectId) && defined("PROJECT_ID")) {
            $projectId = PROJECT_ID;
        }
        $myCapProj = new MyCap($projectId);
        $participant_identifier = (($myCapProj->project['participant_custom_field']??'') == '') ? ($myCapProj->project['participant_custom_label']??'') : "[".$myCapProj->project['participant_custom_field']."]";
        $identifier = \Piping::replaceVariablesInLabel($participant_identifier, $record, null, 1, array(), false, $projectId, false);
        return $identifier;
    }

    /**
     * Get baseline identifier details by record
     *
     * @param string $record
     * @return string
     */
    public static function getBaselineDateIdentifier($record, $projectId=null, $convertDateFormat=true)
    {
        global $myCapProj;
        if (is_null($myCapProj) && !is_null($projectId)) {
            $myCapProj = new MyCap($projectId);
            $Proj = new \Project($projectId);
        } else {
            $projectId = PROJECT_ID;
            global $Proj;
        }

        $field = (!isset($myCapProj->project['baseline_date_field']) || $myCapProj->project['baseline_date_field'] == '') ? '' : $myCapProj->project['baseline_date_field'];
        $this_field = (!isset($myCapProj->project['baseline_date_field']) || $myCapProj->project['baseline_date_field'] == '') ? '' : "[".$myCapProj->project['baseline_date_field']."]";

        $identifier = \Piping::replaceVariablesInLabel($this_field, $record, null, 1, array(), false, $projectId, false);

        // Convert date value to y-m-d format
        if ($convertDateFormat && (isset($Proj->metadata[$field]) && $Proj->metadata[$field]['element_type'] == 'text'
            && substr($Proj->metadata[$field]['element_validation_type'], 0, 4) == "date"
            && (substr($Proj->metadata[$field]['element_validation_type'], -4) == "_dmy" || substr($Proj->metadata[$field]['element_validation_type'], -4) == "_mdy")))
        {
            $thisValType = $Proj->metadata[$field]['element_validation_type'];
            if (in_array($thisValType, array('date_mdy', 'datetime_mdy', 'datetime_seconds_mdy', 'date_dmy', 'datetime_dmy', 'datetime_seconds_dmy'))) {
                $identifier = \DateTimeRC::datetimeConvert($identifier, substr($thisValType, -3), 'ymd');
            }
        }

        return $identifier;
    }
    /**
     * Make QR code for a participant. Optionally overlay an image onto the QR code.
     *
     * @param string $endpoint
     * @param string $project_code
     * @param string $par_code
     * @param string $overlayPngPath
     * @return string
     */
    public static function makeParticipantImage($endpoint, $project_code, $par_code, $overlayPngPath = '', $outfile=null)
    {
        $data = [
            "endpoint" => $endpoint,
            "studyCode" => $project_code,
            "participantCode" => $par_code
        ];

        return ParticipantQRCode::makeBase64(json_encode($data), $overlayPngPath, $outfile);
    }

    /**
     * Generate unique code for MyCap project
     *
     * @param integer $project_id
     * @return string $code
     */
    public static function generateUniqueCode($project_id)
    {
        do {
            // Excluding letters I & O and number 0 to avoid confusion
            $code = 'U-' . MyCap::generateRandomString(20);
            $sql = "SELECT * FROM redcap_mycap_participants WHERE project_id = ".$project_id." AND code = '".db_escape($code)."'";
            $q = db_query($sql);
            $count = db_num_rows($q);
        } while ($count > 0);

        return $code;
    }

    /**
     * Save into mycap participant db table.
     *
     * @param integer $project_id
     * @param string $record
     * @return void
     */
    public static function saveParticipant($project_id, $record)
    {
        $sql = "INSERT INTO redcap_mycap_participants (code, project_id, record) VALUES
                ('".db_escape(self::generateUniqueCode($project_id))."', ".$project_id.", '".db_escape($record)."')";
        db_query($sql);
    }

    /**
     * Get Participant code for a record.
     *
     * @param integer $project_id
     * @param string $record
     * @return string
     */
    public static function getRecordParticipantCode($project_id=null, $record=null)
    {
        // Verify project_id as numeric
        if (!is_numeric($project_id)) return false;
        // Make sure record is not null
        if ($record == null) return false;
        // Query data table
        $sql = "SELECT code FROM redcap_mycap_participants WHERE project_id = ".$project_id." AND record = '".db_escape($record)."'";
        $q = db_query($sql);
        if (!$q || ($q && !db_num_rows($q))) return false;
        // Get participant_code
        $participant_code = db_result($q, 0);
        // Return participant_code
        return $participant_code;
    }

    /**
     * Get participants and records dropdown list for filtering
     *
     * @param integer $project_id
     * @return array
     */
    public static function getDropDownList($project_id)
    {
        global $lang, $user_rights;

        $filterByGroupID = ($user_rights['group_id'] != '' ? $user_rights['group_id'] : array());
        // Format $filterByGroupID as array
        if (!is_array($filterByGroupID) && $filterByGroupID == '0') {
            // If passing group_id as "0", assume we want to return unassigned records.
        } elseif (!empty($filterByGroupID) && is_numeric($filterByGroupID)) {
            $filterByGroupID = array($filterByGroupID);
        } elseif (!is_array($filterByGroupID)) {
            $filterByGroupID = array();
        }
        $sql = "SELECT p.* FROM redcap_mycap_participants p, redcap_record_list AS rl 
                WHERE p.project_id = rl.project_id and p.project_id = ".$project_id." AND p.record = rl.record";

        if (!is_array($filterByGroupID) && $filterByGroupID == '0') {
            $sql .= " AND rl.dag_id is null";
        } elseif (!empty($filterByGroupID)) {
            $sql .= " AND rl.dag_id in (".prep_implode($filterByGroupID).")";
        }
        $sql .= " ORDER BY p.record";
        $q = db_query($sql);
        $all_participants = array('' => $lang['mycap_mobile_app_365']);
        $all_records = array('' => $lang['reporting_37']);

        global $myCapProj;
        $condition = $myCapProj->project['participant_allow_condition'] ?? "";
        while ($row = db_fetch_assoc($q))
        {
            $logicTest = true;

            if ($condition != '') {
                $logicTest = \REDCap::evaluateLogic($condition, $project_id, $row['record']);
            }
            if ($logicTest == false) {
                unset($row); continue;
            }
            $all_participants[$row['record']] = self::getParticipantIdentifier($row['record']);
            $all_records[$row['record']] = $row['record'];
        }

        // Return array
        return array($all_participants, $all_records);
    }

    /**
     * Display Allow participant logic section
     *
     * @return string
     */
    public static function displayLogicTable()
    {
        global $lang, $longitudinal, $myCapProj;

        // Instructions
        $html = RCView::div(array('style' => 'margin:0 0 5px;'),
            $lang['mycap_mobile_app_366']
        );
        $html .= RCView::div(array('style' => 'color:green;font-size:11px;'),
            $lang['mycap_mobile_app_368']
        );
        $participant_allow_logic = $myCapProj->project['participant_allow_condition'];
        ob_start();
        ?>
        <style type="text/css">
            .form-control-custom textarea{
                display: block;
                width: 100%;
                height: 32px;
                padding: 4px 8px;
                font-size: 13px;
                line-height: 1.42857143;
                color: #555;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
                -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
                -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            }
            .form-control-custom textarea{
                height: 100%;
            }
        </style>
        <form id="LogicForm">
            <div>
                <div class="form-control-custom" style="overflow:hidden;color:#A00000;background-color:#f7f7f7;border:1px solid #ddd;margin:10px 0 30px;" >
                    <table width="100%">
                        <tr>
                            <td class="external-modules-input-td pb-0 ps-3">
                                <div class="mb-1 boldish condition-andor-text2"><?=$lang['mycap_mobile_app_367']?></div>
                                <textarea tabindex="-1" id="allow-participant-condition" name="allow-participant-condition" onfocus="openLogicEditor($(this))" class="external-modules-input-element ms-4" style="max-width:95%;" onkeydown="logicSuggestSearchTip(this, event);" onblur="validate_logic($(this).val());"><?php echo htmlspecialchars(label_decode($participant_allow_logic), ENT_QUOTES) ?></textarea>
                                <div class="clearfix">
                                    <div class='my-1 ms-4 fs11 float-start text-secondary'><?php echo ($longitudinal ? "(e.g., [enrollment_arm_1][age] > 30 and [enrollment_arm_1][sex] = \"1\")" : "(e.g., [age] > 30 and [sex] = \"1\")") ?></div>
                                    <div class="float-end"><a href="javascript:;" class="opacity75" style="text-decoration:underline;font-size:11px;font-weight:normal;" onclick="helpPopup('5','category_33_question_1_tab_5')" ;"=""><?php echo $lang['survey_527']; ?></a></div>
                                </div>
                                <div id='allow-participant-condition_Ok' class='logicValidatorOkay ms-4'></div>
                                <script type='text/javascript'>logicValidate($('#allow-participant-condition'), false, 1);</script>
                                <?php
                                print logicAdd("allow-participant-condition");
                                ?>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </form>
        <?php
        $html .= ob_get_clean();

        // Return all html to display
        return $html;
    }

    /**
     * Generate Participant URL
     *
     * @param string $endpoint
     * @param string $project_code
     * @param string $par_code
     * @return string
     */
    public static function makeParticipantmakeJoinUrl($endpoint, $project_code, $par_code) {
        $payload = [
            "endpoint" => $endpoint,
            "project" => $project_code,
        ];
        // This is not a security mechanism. This exists solely to
        // make the JSON URL-friendly and hopefully shorten the
        // URL.
        $base64Payload = (base64_encode(json_encode($payload)));
        $paramaters = [
            'payload' => $base64Payload,
            'participant' => $par_code
        ];
        return DynamicLink::makeJoinUrl($paramaters);
    }

    /**
     * Generate HTML template for sending joining info to particpant depending on type
     *
     * @param string $type
     * @return string
     */
    public static function getTemplateMessage($type = 'qr', $preview=false)
    {
        $project_id = "[project-id]";
        $par_code = "[mycap-participant-code]";
        if ($preview && defined("PROJECT_ID")) {
            $project_id .= '&amp;preview_pid='.PROJECT_ID;
        }

        switch ($type) {
            case 'qr':
                $message = '<b>To join the project on MyCap:</b>
<ol>
    <li>Install the MyCap app on your mobile device (iOS: <a href="'.MyCap::URL_IOS_APP_STORE.'"><u>App Store</u></a>, Android: <a href="'.MyCap::URL_GOOGLE_PLAY_STORE.'"><u>Play Store</u></a>).</li>
    <li> Open the MyCap app, tap "Join Project", and scan the QR code below.<br /><img src="'.APP_PATH_WEBROOT_FULL.'redcap_v'.REDCAP_VERSION.'/MyCap/participant_info.php?action=displayParticipantQrCode&amp;pid='.$project_id.'&amp;par_code='.$par_code.'" width="185" height="185" style="margin-top:5px;width:185px;height:185px;border:1px solid #ccc;" /></li>
</ol>';
                break;
            case 'url':
                $message = '<b>To join the project on MyCap:</b>
<ol>
    <li>[mycap-participant-link:Click this MyCap link] while on your mobile device. (If the MyCap app is not installed, it will prompt you to install MyCap.)</li>
    <li>Open the MyCap app, and tap "Join Project". (If you have other MyCap projects, you may need to go to your Profile and click "Join Another Project".)</li>
</ol>';
                break;
            case 'both':
                $message = '<b>Use one of the options below to join the project on MyCap:</b>
<ol>
    <li>[mycap-participant-link:Click this MyCap link] while on your mobile device, which will prompt you to install MyCap if it’s not already installed. After MyCap is open, tap "Join Project". (Note: If you have other MyCap projects, you may need to go to your Profile and click "Join Another Project").</li>
    <li>To scan the QR Code below, install the MyCap app on your mobile device (iOS: <a href="'.MyCap::URL_IOS_APP_STORE.'"><u>App Store</u></a>, Android: <a href="'.MyCap::URL_GOOGLE_PLAY_STORE.'"><u>Play Store</u></a>), open the MyCap app, and tap "Join Project".<br /><img src="'.APP_PATH_WEBROOT_FULL.'redcap_v'.REDCAP_VERSION.'/MyCap/participant_info.php?action=displayParticipantQrCode&amp;pid='.$project_id.'&amp;par_code='.$par_code.'" width="185" height="185" style="margin-top:5px;width:185px;height:185px;border:1px solid #ccc;" /></li>
</ol>';
                break;
            default:
                $message = 'Invalid Template type selected.';
        }
        $text = ($_GET['pid'] != '' && $_GET['record'] != '') ? \Piping::pipeSpecialTags($message, $_GET['pid'], $_GET['record']) : $message;
        $text = str_replace(["\r", "\n", "\t"], '', $text);
        return $text;
    }

    /**
     * Validate if passed participant code is valid
     *
     * @param string $participantCode
     * @return string
     */
    public static function isValidParticipant($participantCode, $projectId = null, $checkDeleted = true) {
        if (is_null($projectId)) {
            $projectId = PROJECT_ID;
        }
        // some basic checks before going to the DB
        if (empty($participantCode) || strlen($participantCode) !== 22 || !preg_match('/[a-z0-9]/', $participantCode)) {
            return false;
        }
        $sql = "SELECT COUNT(*) AS matchCount FROM redcap_mycap_participants WHERE project_id = ".$projectId." AND code = '".$participantCode."'";
        if ($checkDeleted) $sql .= " AND is_deleted = 0";

        $q = db_query($sql);
        $total = db_result($q, 0, 'matchCount');

        return ($total == 1) ? true : false;
    }

    /**
     * Return participant details
     *
     * @param int $participantCode
     * @return array $details
     */
    public static function getParticipantDetails($participantCode)
    {
        $details = array();

        // Get main attributes
        $sql = "SELECT * FROM redcap_mycap_participants 
                WHERE code='".db_escape($participantCode)."' ".(defined("PROJECT_ID") ? "AND project_id = ".PROJECT_ID : "");
        $q = db_query($sql);
        while ($row = db_fetch_assoc($q)) {
            // Add to participants array
            $identifier = self::getParticipantIdentifier($row['record'], (defined("PROJECT_ID") ? PROJECT_ID : null), $participantCode);

            $details[$row['code']] = array('record' => $row['record'],
                                            'repeat_instance' => 1,
                                            'identifier' => $identifier,
                                            'join_date' => (!empty($row['join_date'])) ? \DateTimeRC::format_user_datetime($row['join_date'], 'Y-M-D_24') : '-',
                                            'baseline_date' => (!empty($row['baseline_date'])) ? \DateTimeRC::format_user_datetime($row['baseline_date'], 'Y-M-D_24') : '-',
                                            'push_notification_ids' => $row['push_notification_ids'],
                                            'is_deleted' => $row['is_deleted']);
        }

        // If no participant, then return empty array
        if (empty($details)) return array();

        return $details;
    }

    /**
     * Get participants dropdown list for filtering in sync issues - values will be code
     * returns all participants (do not test allow logic)
     *
     * @param integer $project_id
     * @return array
     */
    public static function getAllParticipantCodesDropDownList($project_id)
    {
        global $lang, $user_rights;

        $filterByGroupID = ($user_rights['group_id'] != '' ? $user_rights['group_id'] : array());
        // Format $filterByGroupID as array
        if (!is_array($filterByGroupID) && $filterByGroupID == '0') {
            // If passing group_id as "0", assume we want to return unassigned records.
        } elseif (!empty($filterByGroupID) && is_numeric($filterByGroupID)) {
            $filterByGroupID = array($filterByGroupID);
        } elseif (!is_array($filterByGroupID)) {
            $filterByGroupID = array();
        }

        $sql = "SELECT p.* FROM redcap_mycap_participants p, redcap_record_list AS rl 
                WHERE p.project_id = rl.project_id and p.project_id = ".$project_id." AND p.record = rl.record";
        if (!is_array($filterByGroupID) && $filterByGroupID == '0') {
            $sql .= " AND rl.dag_id is null";
        } elseif (!empty($filterByGroupID)) {
            $sql .= " AND rl.dag_id in (".prep_implode($filterByGroupID).")";
        }

        $sql .= " ORDER BY p.record";
        $q = db_query($sql);
        $all_participants = array('' => $lang['mycap_mobile_app_365']);

        while ($row = db_fetch_assoc($q))
        {
            $all_participants[$row['code']] = self::getParticipantIdentifier($row['record']);
        }

        // Return array
        return $all_participants;
    }

    /**
     * Return all participants (unless one is specified explicitly) as an array of their attributes
     *
     * @param int $project_id
     * @param string $par_code
     * @return string
     */
    public static function getParticipants($project_id, $par_code='')
    {
        $pars = array();

        // Get main attributes
        $sql = "SELECT * FROM redcap_mycap_participants WHERE project_id = ".$project_id;
        if (!empty($par_code)) $sql .= " AND code = $par_code";
        $q = db_query($sql);
        while ($row = db_fetch_assoc($q)) {
            // Add to $pars array
            $pars[$row['code']] = $row;
        }
        // If no participants, then return empty array
        if (empty($pars)) return array();

        // Return array of report(s) attributes
        if ($par_code == '') {
            return $pars;
        } else {
            return $pars[$par_code];
        }
    }

    /**
     * Return all participant codes belongs to list of all dags
     *
     * @param array $groupID
     * @param integer $projectId
     * @return array
     */
    public static function getParticipantsInDAG($groupID, $projectId = null) {
        if (is_null($projectId)) {
            $projectId = PROJECT_ID;
        }
        $par_codes = array();
        $sql = "SELECT p.code FROM redcap_mycap_participants AS p, redcap_record_list AS rl WHERE p.project_id = ".$projectId." AND p.record = rl.record";

        if (!is_array($groupID) && $groupID == '0') {
            $sql .= " AND rl.dag_id is null";
        } elseif (!empty($groupID)) {
            $sql .= " AND rl.dag_id in (".prep_implode($groupID).")";
        }
        $q = db_query($sql);
        while ($row = db_fetch_assoc($q))
        {
            $par_codes[] = $row['code'];
        }
        return $par_codes;
    }

    /**
     * Translate all images from MyCap EM format to REDCap Core format in joining info template/message
     *
     * @param string $message
     * @param string $par_code_field
     * @return string
     */
    public static function translateJoiningInfoImages($message, $par_code_field) {
        $skipParams = array('type=module', 'prefix=mycap', 'page=web/api/index', 'NOAUTH');
        preg_match_all('/<img[^>]+>/i', $message, $images);

        foreach ($images[0] as $image) {
            $doc = new \DOMDocument();
            $doc->loadHTML($image);
            $xpath = new \DOMXPath($doc);
            $src = $xpath->evaluate("string(//img/@src)");

            $parts = explode("?", $src);

            if ($parts[0] == APP_PATH_WEBROOT_FULL.'api/') {
                $part1 = str_replace(APP_PATH_WEBROOT_FULL.'api/', APP_PATH_WEBROOT_FULL.'redcap_v'.REDCAP_VERSION.'/MyCap/participant_info.php', $parts[0]);

                $params = explode("&", $parts[1]);

                $result = array_intersect($params, $skipParams);
                if ($result == $skipParams) {
                    foreach ($params as $param) {
                        if (!in_array($param, $skipParams)) {
                            list($attr, $value) = explode("=", $param);
                            if ($attr == 'stu_code') {
                                $pid = MyCap::getProjectIdByCode($value);
                                $newAttr['pid'] = ($pid == false) ? PROJECT_ID : $pid;
                            }
                            if ($attr == 'par_code' && $value == "[".$par_code_field."]") {
                                $newAttr['par_code'] = "[mycap-participant-code]";
                            } else {
                                $newAttr['par_code'] = $value;
                            }
                            if ($attr == 'action') {
                                $newAttr['action'] = $value;
                            }
                        }
                    }
                    foreach ($newAttr as $attr => $val) {
                        $attrArr[] = $attr."=".$val;
                    }
                    $part2 = join("&amp;", $attrArr);
                }
                $newImage = $part1."?".$part2;

                $message = str_replace('&amp;', '&', $message);
                $message = str_replace($src, $newImage, $message);
            }
        }
        $message = str_replace("[".$par_code_field."]", "[mycap-participant-code]", $message);
        return $message;
    }

    /**
     * Returns true if the participant exists for record, false if not.
     *
     * @param int $project_id
     * @param string $record
     * @return boolean
     */
    public static function existParticipant($project_id, $record) {
        $sql = "SELECT 1 FROM redcap_mycap_participants WHERE project_id = '".db_escape($project_id)."' AND record = '".db_escape($record)."'";
        return db_num_rows(db_query($sql)) > 0;
    }

    /**
     * Sync Participant db table with records - Data Import/Auto Record Generation - v1.7 EM
     *
     * @param int $project_id
     * @return void
     */
    public static function fixParticipantList($project_id) {
        // Fetch all records and insert into MyCap participants db table
        $recordNames = array_values(\Records::getRecordList($project_id));
        if (!empty($recordNames)) {
            foreach ($recordNames as $record) {
                if (!Participant::existParticipant($project_id, $record)) {
                    Participant::saveParticipant($project_id, $record);
                }
            }
        }
    }


}
