<?php
use Vanderbilt\REDCap\Classes\MyCap\Task;

if (isset($_POST['pid']))   $_GET['pid']  = $_POST['pid'];
if (isset($_POST['page'])) 	$_GET['page'] = $_POST['page'];

require_once dirname(dirname(__FILE__)) . '/Config/init_project.php';

global $Proj, $lang;

$data = array('title' => ($_GET['page'] != '') ? $lang['mycap_mobile_app_591']." \"".$Proj->forms[$_GET['page']]['menu']."\"" : $lang['mycap_mobile_app_700'],
              'payload' => '');

// Set the form menu description for the form
if (isset($_POST['action']) && $_POST['action'] == "list_issues") {
    $taskErrors = Task::getMyCapTaskErrors($_GET['page']);
    $data['count'] = count($taskErrors);
    $html = '';
    if (!empty($taskErrors)) {
        $html = '<p>'.(($_GET['page'] != '') ? $lang['mycap_mobile_app_589'] : $lang['mycap_mobile_app_701']).'</p>';
        $html .= '<ul>';
        foreach ($taskErrors as $error) {
            $html .= '<li style="padding-top: 5px;">'.$error.'</li>';
        }
        $html .= '</ul>';
    } else {
        $html = $lang['dataqueries_190'];
    }
    $data['payload'] = $html;
}
elseif (isset($_POST['action']) && $_POST['action'] == "fix_issues") {
    Task::fixMyCapTaskErrors($_GET['page']);
    $data = array('payload' => "<div style='color:green;font-size:13px;'><img src='".APP_PATH_IMAGES."tick.png'> ".($_GET['page'] != '' ? $lang['mycap_mobile_app_590'] : $lang['mycap_mobile_app_702'])."</div>");
}
print json_encode_rc($data);
