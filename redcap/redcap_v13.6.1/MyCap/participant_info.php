<?php
use Vanderbilt\REDCap\Classes\MyCap\Participant;
use Vanderbilt\REDCap\Classes\MyCap\MyCap;
use Vanderbilt\REDCap\Classes\MyCap\MyCapConfiguration;

if (isset($_GET['action']) && $_GET['action'] == 'displayParticipantQrCode')
{
    // Disable REDCap's authentication
    defined("NOAUTH") or define("NOAUTH", true);
    // Convert pid=[project-id] on the fly for the preview mode to allow an image to be seen
    if (isset($_GET['preview_pid']) && isset($_GET['pid']) && $_GET['pid'] == '[project-id]') {
        $_GET['pid'] = $_GET['preview_pid'];
    }
}

require_once dirname(dirname(__FILE__)) . "/Config/init_project.php";

// Include the QR Code class
require_once APP_PATH_LIBRARIES . "phpqrcode/qrlib.php";

if (isset($_GET['action']) && $_GET['action'] == 'displayParticipantQrCode') {
    // Display Participant QR Code Image
    $par_code_placeholder = '[mycap-participant-code]';
    $par_code = $_GET['par_code'];
    $emptyPngPath = APP_PATH_DOCROOT.'Resources'.DS.'images'.DS.'qr_placeholder.png';
    // REDCap alerts and notifications may pass an empty participant code
    // in the WYSIWYG editor. Show a placeholder image in this case.
    if ((!isset($par_code) || empty($par_code) || $par_code === $par_code_placeholder) && file_exists($emptyPngPath)) {
        $imgInfo = getimagesize($emptyPngPath);
        header("Content-type: image/png");
        readfile($emptyPngPath);
        exit();
    }

    $myCapProj = new MyCap($_GET['pid']);
    $project_code = $myCapProj->project['code'];
    if ($project_code != '' && $_GET['par_code'] != '') {
        $qrcode = Participant::makeParticipantImage(
            MyCapConfiguration::ENDPOINT,
            $project_code,
            $_GET['par_code'],
            APP_PATH_DOCROOT.'Resources/images/mycap_qr_overlay.png'
        );
    }

    header("Content-type: image/gif");
    echo base64_decode($qrcode);
    exit();
} else if (isset($_GET['action']) && $_GET['action'] == 'setIdentifier') {
    global $myCapProj;
    // Set dialog title
    $title = RCView::span(array('style'=>'margin-left:3px;vertical-align:middle;'),
        "<i class='fas fa-tag'></i> ".$lang['mycap_mobile_app_357']);

    $participant_custom_field = $myCapProj->project['participant_custom_field'];
    $participant_custom_label = $myCapProj->project['participant_custom_label'];

    $contents = '<div>
                    <div class="mb-3 fs13" style="line-height: 1.4;">'.$lang['mycap_mobile_app_358'].'</div>
                        <div class="round chklist" style="padding:10px 20px;max-width:900px;">
                            <form id="setuplabelsform" action="'.APP_PATH_WEBROOT .'ProjectGeneral/edit_project_settings.php?pid='.PROJECT_ID.'" method="post">
                                <table style="width:100%;" cellspacing=0>
                                    <tr>
                                        <td colspan="2" valign="top" style="margin-left:1.5em;text-indent:-2.2em;padding:10px 5px 10px 40px;">
                                            <i class="fas fa-tags" style="text-indent: 0;"></i>
                                            <b style=""><u>'.$lang['mycap_mobile_app_359'].'</u></b><br>
                                            '.$lang['mycap_mobile_app_361'].'
                                            <div id="participant_id_div" style="text-indent: 0em; padding: 10px; '.(($participant_custom_field == '' && $participant_custom_label != '')? 'opacity: 0.3;' : '').'">
                                                '.Participant::renderParticipantDisplayLabelDropDown("participant_custom_field", "participant_custom_field", $participant_custom_field, (($participant_custom_field == '' && $participant_custom_label != '')? 'disabled="disabled"' : '')).'
                                            </div>
                                            <div style="padding:5px 0;font-weight:normal;color:#777;">&mdash; '.$lang['global_46'].' &mdash;</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" valign="top" style="margin-left:1.5em;text-indent:-2.2em;padding:0px 5px 10px 40px;">
                                            <div style="margin:5px; padding-top: 10px; font-weight: bold;">
                                                <input type="checkbox" name="participant_id_custom_chk" id="participant_id_custom_chk" '.($participant_custom_label != '' ? 'checked="checked"' : '').'>
                                                <i class="fas fa-tag" style="text-indent: 0;"></i>
                                                <b style=""><u>'.$lang['mycap_mobile_app_362'].'</u></b>
                                            </div>                                        
                                            <div id="participant_id_custom_div" style="text-indent:0em; '.($participant_custom_label == ''? 'opacity: 0.3;' : '').'">
                                                <input type="text" class="x-form-text x-form-field" style="width:300px;" id="participant_custom_label" name="participant_custom_label" '.($participant_custom_label == ''? 'disabled="disabled"' : '').' value="'.str_replace('"', '&quot;', $participant_custom_label??"").'"><br>
                                                <span style="color:#800000;font-family:tahoma;font-size:10px;">
                                                    '.$lang['mycap_mobile_app_379'].'
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>   
                   </div>';
} else if (isset($_GET['action']) && $_GET['action'] == 'getHTML') {
    // Get HTML Message templates
    // Set dialog title
    $title = RCView::span(array('style'=>'margin-left:3px;vertical-align:middle;'),
            "<i class='fas fa-user-plus'></i> ".$lang['mycap_mobile_app_383']);

    // Set dialog content
    $contents = loadJS('MyCapProject.js', false);

    $type = (isset($_GET['type'])) ? $_GET['type'] : 'qr';
    $text = Participant::getTemplateMessage($type, !(isset($_GET['record']) && !empty($_GET['record'])));

    $qrChecked = ($type == 'qr') ? "checked" : "";
    $urlChecked = ($type == 'url') ? "checked" : "";
    $bothChecked = ($type == 'both') ? "checked" : "";

    $templateOptions =  RCView::div(array('class' => 'd-inline-block', 'style' => 'margin: 5px;'),
                            RCView::label(array('style' => 'display:inline;font-weight:normal;color:#A00000;margin-bottom:2px;'),
                                RCView::radio(array('name'=>'template-type', 'value'=>'qr', 'id' => 'qr', $qrChecked => $qrChecked)) .' '. $lang['mycap_mobile_app_384']
                            ) .
                            RCView::label(array('style' => 'display:inline;font-weight:normal;color:#A00000;margin-bottom:2px;padding-left:10px;'),
                                RCView::radio(array('name'=>'template-type', 'value'=>'url', 'id' => 'url', $urlChecked => $urlChecked)) .' '. $lang['mycap_mobile_app_385']
                            ) .
                            RCView::label(array('style' => 'display:inline;font-weight:normal;color:#A00000;margin-bottom:2px;padding-left:10px;'),
                                RCView::radio(array('name'=>'template-type', 'value'=>'both', 'id' => 'both', $bothChecked => $bothChecked)) .' '. $lang['mycap_mobile_app_386']
                            )
                        ) .
                        RCView::div(array('class' => 'clear'),'');
    $templateOptions .= RCView::hidden(array('id' => 'recordVal', 'value' => $_GET['record']));

    $copyTextHtml = "<div class='' style='width:99%; box-sizing:border-box;'>
                        <div class='clear'></div>                       
                        <div id='textboxTemplate' class='text-block wrap-long-url staticInput' style='border:1px solid #ccc; padding: 4px;'>$text</div>
                     </div>"
                    . '<div><textarea id="html-message-generated" class="staticInput fs15" readonly style="display:none;color:#e83e8c;white-space:pre-wrap!important;height:200px;width:98%;font-family:SFMono-Regular,Menlo,Monaco,Consolas,\'Liberation Mono\',\'Courier New\',monospace" onclick="this.select();">'.$text.'</textarea></div>'
                    . '';

    // Give warning if we're on Config Version 0
    $zeroVersionWarning = "";
    if ($myCapProj->getConfigVersion() == 0) {
        $zeroVersionWarning = RCView::div(['class'=>'red my-4'], RCView::b('<i class="fa-solid fa-circle-exclamation"></i> ' . $lang['global_48'].$lang['colon']) . " " .$lang['mycap_mobile_app_676']);
    }

    $contents .= '<div>
                        <div class="mb-3 fs13" style="line-height: 1.2;">'.$lang['mycap_mobile_app_382'].'</div>
                        '.$zeroVersionWarning.'
                        <!-- Step 1: Choose Template format -->
                        <div class="font-weight-bold ms-1 fs16" style="color:#C00000;">'.$lang['mycap_mobile_app_378'].'</div>
                        <div class="mt-2" style="background-color:#f5f5f5;padding:8px;border:1px solid #ccc;">
                            '.$templateOptions.'
                        </div>
                        
                        <!-- Step 2 -->
                        <div class="mt-4 mb-4">
                            <div class="clearfix">
                                <div class="font-weight-bold ms-1 fs16 float-start" style="color:#C00000;">'.$lang['mycap_mobile_app_380'].'</div>
                                <button id=\'change\' class=\'btn btn-xs btn-defaultrc float-end me-2 mb-1\'><i class=\'fas fa-code\'></i> View HTML</button>
                                <button class="btn btn-primaryrc btn-xs btn-clipboard float-end me-2 mb-1" onclick="return false;" title="'.js_escape2($lang['global_137']).'" data-clipboard-target="#textboxTemplate"><i class="fas fa-paste"></i> '.$lang['global_137'].'</button>
                            </div>
                            '.$copyTextHtml.'
                        </div>
                        
                        <!-- Step 3 -->
                        <div class="font-weight-bold ms-1 fs16" style="color:#C00000;">'.$lang['mycap_mobile_app_381'].'</div>
                        <div class="mt-2" style="background-color:#f5f5f5;padding:8px;border:1px solid #ccc;">
                            <div class="p mt-1">
                                '.$lang['mycap_mobile_app_666'].'
                                <ul>
                                    <li class="mt-1">'.$lang['mycap_mobile_app_667'].'</li>
                                    <li class="mt-1">'.$lang['mycap_mobile_app_668'].'</li>
                                </ul>
                            </div>
                            <div class="p mb-1">
                                '.$lang['mycap_mobile_app_409'].'<br>'.$lang['mycap_mobile_app_410'].'
                            </div>
                        </div>';

    $contents .= '</div>';

} elseif (isset($_GET['action']) && $_GET['action'] == 'getHTMLByType') {
    print Participant::getTemplateMessage($_GET['type'], !(isset($_GET['record']) && !empty($_GET['record'])));
    exit;
} else {
    // Check record
    if (!isset($_GET['record'])) exit('0');
    $record = $_GET['record'];

    global $myCapProj;
    // Get mycap participant code
    $sql = "SELECT code FROM redcap_mycap_participants WHERE record = '".db_escape($record)."' AND project_id = '".PROJECT_ID."'";
    $q = db_query($sql);
    $par_code = db_result($q, 0);

    $participant = Participant::getParticipantIdentifier($record);
    if ($par_code != '') {
        $qrcode = Participant::makeParticipantImage(
                            MyCapConfiguration::ENDPOINT,
                                    $myCapProj->project['code']??"",
                                    $par_code,
                                    APP_PATH_DOCROOT.'Resources/images/mycap_qr_overlay.png'
                                );
    }

    $participant_link = Participant::makeParticipantmakeJoinUrl(
                            MyCapConfiguration::ENDPOINT,
                                    $myCapProj->project['code']??"",
                                    $par_code
                                );
    // Set dialog title
    $title = RCView::img(array('src'=>'access_qr_code.gif','style'=>'vertical-align:middle;')) .
        RCView::span(array('style'=>'margin-left:3px;vertical-align:middle;'),
            (gd2_enabled()
                ? $lang['mycap_mobile_app_387']
                : $lang['mycap_mobile_app_388'])
        );

    // Give warning if we're on Config Version 0
    $zeroVersionWarning = "";
    if ($myCapProj->getConfigVersion() == 0) {
        $zeroVersionWarning = RCView::div(['class'=>'red my-4'], RCView::b('<i class="fa-solid fa-circle-exclamation"></i> ' . $lang['global_48'].$lang['colon']) . " " .$lang['mycap_mobile_app_676']);
    }

    // Set dialog content
    $contents = RCView::div(array('style'=>'font-size:'.($isAjax ? '14px' : '16px').';color:#800000;'),
            $lang['mycap_mobile_app_357'] . $lang['colon'] . " \"" . RCView::b(RCView::escape($participant)) . "\" (".$lang['global_49']." \"" . RCView::escape($record) . "\")"
        ) .
        ($isAjax ? RCView::div(array('style'=>'font-size:14px;margin:15px 0 20px;'),
            $lang['mycap_mobile_app_389'] . $zeroVersionWarning
        ) : '').
        RCView::table(array('style'=>'table-layout:fixed;border-top:1px solid #ccc;padding-top:10px;width:100%;'),
            RCView::tr(array(),
                (!gd2_enabled() ? '' :
                    RCView::td(array('id'=>'qrcode-info', 'valign'=>'top', 'style'=>'padding-right:20px;padding-top:10px; width: 50%;'),
                        ## QR CODE
                        RCView::div(array('style'=>'color:#800000;font-weight:bold;font-size:15px;margin-bottom:10px;'),
                            RCView::span(array('style'=>'vertical-align:middle;'), '<i class="fas fa-qrcode"></i> '.$lang['survey_620'])
                        ) .
                        ($par_code != '' ?
                            RCView::div(array('style'=>''),
                                ($isAjax ? $lang['mycap_mobile_app_394'] : $lang['mycap_mobile_app_395'])
                            ) .
                            RCView::div(array('style'=>'text-align:center;margin-top:20px;'),
                                "<img height='265px' src='data:image/png;base64,".$qrcode."'>"
                            ) : RCView::div(array('style'=>'margin-bottom:2px;', 'class'=>'error'), $lang['mycap_mobile_app_392'])
                        ) .
                        (($isAjax && $par_code != '') ?
                            RCView::div(array('class'=>'error mt-3 mb-1'), RCView::button(array('class'=>'btn btn-xs btn-primaryrc fs12', 'onclick'=>"openEmailTemplatePopup('".$record."', 'qr');return false;"),
                                RCView::fa('fas fa-code me-1').' '.$lang['mycap_mobile_app_396'])
                            ) .
                            RCView::div(array('class'=>'error mt-3 mb-1'), RCView::button(array('class'=>'btn btn-xs btn-defaultrc fs12', 'onclick'=>"printQRCode('".$record."');return false;"),
                                RCView::fa('fas fa-print me-1').' '.$lang['mycap_mobile_app_397'])
                            ) : '')
                    )
                ) .
                ($isAjax ? RCView::td(array('valign'=>'top', 'style'=>'width:325px;padding-left:20px;padding-top:10px;border-left:1px solid #ccc;'),
                    ## JOIN BY URL
                    RCView::div(array('style'=>'color:#800000;font-weight:bold;font-size:15px;margin-bottom:10px;'),
                        RCView::span(array('style'=>'vertical-align:middle;'), '<i class="fas fa-link"></i> '.$lang['mycap_mobile_app_390'])
                    ) .
                    ($par_code != '' ?
                        RCView::div(array('style'=>''),
                            $lang['mycap_mobile_app_391']
                        ) .
                        RCView::div(array('class' => 'wrap-long-url', 'style'=>'color:#e83e8c;white-space:wrap!important;width:97%;margin:10px;'),
                            $participant_link
                        )  .
                        RCView::div(array('class'=>'error mt-3 mb-1'),
                            RCView::button(array('class'=>'btn btn-xs btn-primaryrc fs12', 'onclick'=>"openEmailTemplatePopup('".$record."', 'url');return false;"),
                                '<i class="fas fa-code me-1"></i> '.$lang['mycap_mobile_app_393']
                            )
                        )
                        : RCView::div(array('style'=>'margin-bottom:2px;', 'class'=>'error'), $lang['mycap_mobile_app_392'])
                    )
                ) : '')
            )
        ) .
        ($isAjax ? '' :
            // Dialog
            RCView::div(array('class'=>'d-print-none', 'style'=>'text-align:center;margin:50px 0 0;'),
                RCView::button(array('style'=>'color:#800000;font-size:15px;padding:4px 8px;', 'onclick'=>"var currentWin = window.self;currentWin.close();"),
                    $lang['data_export_tool_160']
                )
            )
        );
}

// Output JSON if AJAX
if ($isAjax) {
	print json_encode_rc(array('content'=>$contents, 'title'=>$title));
} else {
	// Displaying on the "print" page
	print $contents;
}