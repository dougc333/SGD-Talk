<?php
use Vanderbilt\REDCap\Classes\MyCap\ActiveTask;
use Vanderbilt\REDCap\Classes\MyCap\Task;

require_once dirname(dirname(__FILE__)) . "/Config/init_project.php";

global $myCapProj, $lang, $Proj;

$title = $lang['mycap_mobile_app_536'];

foreach ($myCapProj->tasks as $task) {
    $task_ids[] = $task['task_id'];
}

if (count($task_ids) > 0) {
    $rows[] = '';
    $hdr = array();
    $hdr[] = "<b>".$lang['mycap_mobile_app_108']."</b>";
    $hdr[] = "<b>".$lang['shared_library_25']."</b>";
    $hdr[] = "<b>".$lang['mycap_mobile_app_110']."</b>";
    $hdr[] = "<b>".$lang['mycap_mobile_app_537']."</b>";

    // Retrieve task info
    $q = db_query("SELECT * FROM redcap_mycap_tasks WHERE project_id = ".$_GET['pid']." AND task_id IN (".implode(",",$task_ids).")");
    if(db_num_rows($q) > 0) {
        $rows[] = $hdr;
        while ($task = db_fetch_assoc($q)) {
            $helpLink = '';
            $question_format = $task['question_format'];
            $isActive = ActiveTask::isActiveTask($question_format);
            $colorCSS = ($isActive) ? 'text-success-more' : '';

            $row[$task['form_name']][] = RCView::span(array('class'=>'wrap '.$colorCSS), RCView::escape($task['task_title']));
            $row[$task['form_name']][] = RCView::span(array('class'=>'wrap '.$colorCSS), RCView::escape($Proj->forms[$task['form_name']]['menu']));

            $urlPostFix = ActiveTask::getHelpURLForTaskFormat($question_format);
            if ($urlPostFix != '') {
                $helpLink = '<a class="modmycapstg" target="_blank" href="'.ActiveTask::RESEARCHKIT_DOCS_URL.$urlPostFix.'"><i class="fas fa-external-link-alt"></i></a>';
                $helpLink = RCView::span(array('style'=>'padding-left: 8px; font-weight: bold !important;', 'class' => $colorCSS), $helpLink);
            }
            $row[$task['form_name']][] = ($isActive) ? RCView::span(array('class'=>$colorCSS), RCView::escape(ActiveTask::toString($question_format))).$helpLink
                : RCView::escape(Task::toString($question_format))
            ;
            $row[$task['form_name']][] = RCView::span(array('class'=>'wrap '.$colorCSS), RCView::escape($myCapProj->tasks[$task['form_name']]['schedule_details']));

            // Make sure tasks are in form order
            $tasks_order[$task['form_name']] = $Proj->forms[$task['form_name']]['form_number'];
        }

        asort($tasks_order);
        $row2 = array();
        foreach ($tasks_order as $this_form=>$order) {
            $row2 = $row[$this_form];
            $rows[] = $row2;
        }
        $widths = array(200, 180, 250, 215);

        $content = RCView::div(array('style'=>'margin:0px;'), $lang['mycap_mobile_app_538']);
        $content .= '<div class="text-dangerrc my-3 font-weight-bold"> '.$lang['mycap_mobile_app_539'].'<span class="ms-1 fs14 text-danger">'.db_num_rows($q).'</span></div>';

        $content .= RCView::simpleGrid($rows, $widths);
    }
}

// Return title and content
echo json_encode(array(
    'title' => $title,
    'content' => $content
));