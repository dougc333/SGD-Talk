<?php namespace MultiLanguageManagement;

/**
 * Outputs the Multi-Language Managment pages (Project, Control Center)
 */

use Crypto, RCView, System, UserRights;

#region PHP code

// Prevent this page from being called directly
if ($_GET["route"] === "MultiLanguageController:systemConfig") {
    require_once dirname(dirname(__FILE__)) . "/Config/init_global.php";
    if (!defined("USERID")) System::redirectHome();
	if (!ACCESS_CONTROL_CENTER) redirect(APP_PATH_WEBROOT);
    $isProject = false;
    $pid = "SYSTEM";
    $endpoint = APP_PATH_WEBROOT . "index.php?context=sys&route=MultiLanguageController:ajax";
}
// Project-context - only show when enabled on system
else if ($_GET["route"] === "MultiLanguageController:projectSetup" && MultiLanguage::isActive()) {
    require_once dirname(dirname(__FILE__)) . "/Config/init_project.php";
    if (!defined("USERID") || !defined("PROJECT_ID")) System::redirectHome();
    $isProject = true;
    $pid = PROJECT_ID;
    $endpoint = APP_PATH_WEBROOT . "index.php?pid={$pid}&context=proj&route=MultiLanguageController:ajax";
}
else {
    System::redirectHome();
}
$userid = USERID;

$concurrent_user = MultiLanguage::checkSimultaneousUsers();

if ($concurrent_user === false) {
    // Setup ajax verification
    $crypto = Crypto::init();
    $ajax = array(
        "verification" => $crypto->encrypt(array(
            "random" => $crypto->genKey(),
            "pid" => $pid,
            "user" => $userid,
            "timestamp" => time(),
        )),
        "endpoint" => $endpoint,
        "csrfToken" => System::getCsrfToken(),
    );
    
    // Get settings and languages
    if ($isProject) {
        $settings = MultiLanguage::getProjectSettings($pid, true);
        $project_in_production = $GLOBALS["status"] == 1;
        // Project metadata
        $proj_meta = MultiLanguage::getProjectMetadata($pid);
        // Add project metadata hash to settings to know if something has changed since the setup page has loaded
        $settings["projMetaHash"] = MultiLanguage::getProjectMetadataHash($pid);
        // Designated field candidates
        $designated = MultiLanguage::getDesignatedFieldCandidates($pid);
        // Admin activation required
        $require_admin_activation = MultiLanguage::isAdminActivationRequired();
        $langs_defined = count($settings["langs"]) > 0;
    }
    else {
        $settings = MultiLanguage::getSystemSettings();
        $proj_meta = array();
    }
    
    // User Interface Translations
    $ui_subheadings = MultiLanguage::getUISubheadings();
    $ui_categories = MultiLanguage::getUICategories();
    $ui_meta = MultiLanguage::getUIMetadata(!$isProject);
    
    // System Languages
    $sys_langs = MultiLanguage::getSystemLanguages();
    
    addLangToJS(array(
        "datatables_02",
        "datatables_03",
        "datatables_04",
        "datatables_05",
        "datatables_06",
        "datatables_07",
        "datatables_08",
        "datatables_09",
        "datatables_10",
        "datatables_11",
        "data_entry_64",
        "edit_project_207",
        "global_29",
        "global_30",
        "global_106",
        "global_159",
        "home_30",
        "home_33",
        "home_65",
        "multilang_04",
        "multilang_05",
        "multilang_06",
        "multilang_34",
        "multilang_58",
        "multilang_59",
        "multilang_66",
        "multilang_67",
        "multilang_77",
        "multilang_78",
        "multilang_83",
        "multilang_103",
        "multilang_107",
        "multilang_137",
        "multilang_138",
        "multilang_150",
        "multilang_151",
        "multilang_164",
        "multilang_165",
        "multilang_166",
        "multilang_167",
        "multilang_168",
        "multilang_170",
        "multilang_176",
        "multilang_185",
        "multilang_202",
        "multilang_219",
        "multilang_565",
        "multilang_567",
        "multilang_572",
        "multilang_594",
        "multilang_595",
        "multilang_598",
        "multilang_599",
        "multilang_600",
        "multilang_570",
        "multilang_601",
        "multilang_602",
        "multilang_603",
        "multilang_604",
        "multilang_605",
        "multilang_609",
        "multilang_610",
        "multilang_611",
        "multilang_612",
        "multilang_613",
        "multilang_614",
        "multilang_620",
        "multilang_621",
        "multilang_637",
        "multilang_639",
        "multilang_640",
        "multilang_641",
        "multilang_642",
        "multilang_643",
        "multilang_644",
        "setup_87",
        "survey_1017",
    ));

    // Prepare data to be sent to JavaScript
    $js_data = array(
        "ajax" => $ajax,
        "mode" => $isProject ? "Project" : "System",
        "projMeta" => $proj_meta,
        "settings" => $settings,
        "snapshots" => false, // Lazy loading
        "uiMeta" => $ui_meta,
        "uiSubheadings" => $ui_subheadings,
        "csvDelimiter" => \User::getCsvDelimiter()
    );
    
    $init_json = MultiLanguage::convertAssocArrayToJSON($js_data);
    
    // JS initialization
    
    loadJS("MultiLanguage.js");
    ?>
    <script>
        window.REDCap.MultiLanguage.init(<?=$init_json?>);
    </script>
    <?php
    if (!$isProject) {
        ?><style type="text/css">#pagecontainer { max-width: 1400px; } </style><?php
    }
}

#endregion

#region Main content (HTML)

#region Concurrent Use

if ($concurrent_user) {
?>
<div class="mlm-setup-container">
    <?php if ($isProject): ?>
    <div class="projhdr"><i class="fas fa-globe"></i> <?= RCView::tt("multilang_01") ?></div>
    <?php else: ?>
    <h4 style="margin-top:0;"><i class="fas fa-globe"></i> <?= RCView::tt("multilang_01") ?></h4>
    <?php endif; ?>
    <div class="yellow my-3" style="max-width: 850px;">
        <div>
            <img src="<?=APP_PATH_IMAGES?>exclamation_orange.png">
            <b><?=RCView::tt("multilang_584")?></b><br><br><?=RCView::tt_i("multilang_585", array(
                "<b>{$concurrent_user["user_id"]}</b> - <a href=\"mailto:{$concurrent_user["email"]}\">{$concurrent_user["full_name"]}</a>"), false)?>
        </div>
        <div id="errconflict" class="brown" style="display:none;margin:10px 0;">
            <?=RCView::tt_i("multilang_586", array($concurrent_user["timer"]))?>
        </div>
        <div style="margin-top:10px;">
            <table role="presentation" style="width:100%;">
                <tr>
                    <td>
                        <button onclick="window.location.reload();return false;"><?=RCView::tt("data_entry_84")?></button>
                    </td>
                    <td style="text-align:right;">
                        <a href="javascript:;" onclick="$(this).remove();$('#errconflict').show('fast');" style="font-size:11px;"><?=RCView::tt("data_entry_85")?></a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
<?php
}

#endregion

if (!$concurrent_user) {

#region Title and Instructions
?>
<div class="mlm-setup-container">
<?php if ($isProject): ?>
<div class="projhdr clearfix">
    <div style="max-width:900px;margin-bottom:10px;">
        <div style="color: #800000;font-size: 16px;font-weight: bold;float:left;"><i class="fas fa-globe"></i> <?= RCView::tt("multilang_01") ?></div>
        <div class="d-print-none" style="float:right;padding:0 5px 5px 0;"><i class="fas fa-film"></i> <a href="javascript:;" style="font-size:12px;font-weight:normal;text-decoration:underline;" onclick="popupvid('mlm01.mp4','<?=RCView::tt_js('multilang_01')?>');"><?= RCView::tt("training_res_109") ?></a></div>
    </div>
</div>
<p id="mlmInstr1">
    <?=RCView::tt("multilang_55") // Use this page to configure multiple display languages for your project (surveys, data entry forms, alerts, ASIs, etc.) and to import/export translation sets. Do not forget to save your changes when you are done editing this page (you can use the keyboard shortcut <span class="badge badge-secondary shortcut" title="On Mac, use CMD-S">CTRL-S</span>)! ?> 
    <a id="mlmLearnMore" href="javascript:;" onclick="$(this).hide();$('#mlmInstr2, #mlmInstr3').removeClass('hide');" style="text-decoration:underline;"><?= RCView::tt("multilang_54") // Learn more. ?></a>
</p>
<p id="mlmInstr2" class="hide">
    <?=RCView::tt("multilang_148") // Multi-language support in REDCap works by providing translations for each display item, i.e. field labels, choice labels, and user interface elements, but also for items such as email subjects and body texts of alerts and automated survey invitations. Translations for each supported item can be set on this page. In case an item is not translated, the item will be shown in the language defined as fallback, or, if not set there either, the <i>reference</i> value will be used. ?>
</p>
<p id="mlmInstr3" class="hide">
    <?=RCView::tt("multilang_149") // The reference language is defined as the one that has been used to set up the project's data dictionary (i.e. what is shown in the Online Designer). A reference language must always be defined, although it is possible to not expose it to the user (by setting its <i>Active</i> state to off). Furthermore, note that by default, a language is turned off for instruments in data entry and survey modes unless explicitly turned on. ?>
    <a href="javascript:;" onclick="$('#mlmLearnMore').show();$('#mlmInstr2, #mlmInstr3').addClass('hide');" style="text-decoration:underline;"><?= RCView::tt("multilang_53") // Show less. ?></a>
</p>
<?php if ($GLOBALS['status'] > 0) { ?>
    <p id="mlm-draft-mode-notice" class="yellow my-3" style="max-width: 850px;">
        <i class="fas fa-exclamation-circle"></i>
        <?php if ($GLOBALS['draft_mode'] == '1') { ?>
            <?=RCView::b(RCView::tt("design_14")) // Since this project is currently in PRODUCTION, changes will not be made in real time.  ?><br>
            <?=RCView::tt("multilang_222") // Your project is currently in draft mode... ?>
        <?php } else { ?>
            <?=RCView::tt("multilang_221") // Because the project is currently in production status, this page can only be modified while in draft mode... ?>
        <?php } ?>
    </p>
<?php } ?>
<p class="mlm-off-notice red hide"><?=RCView::tt("multilang_573") // Multi-Langauage Management is currently <b>turned off</b> in this project! ?></p>
<?php else: ?>
<h4 style="margin-top:0;"><i class="fas fa-globe"></i> <?= RCView::tt("multilang_01") ?></h4>
<p id="mlmInstr1">
    <?=RCView::tt("multilang_56") // Use this page to configure multiple display languages available on this REDCap instance that are available for projects to use. When used in a project, user interface translations defined here will be copied to the project and can be freely customized there. Do not forget to save your changes when you are done editing this page (you can use the keyboard shortcut <span class="badge badge-secondary shortcut" title="On Mac, use CMD-S">CTRL-S</span>)! ?> 
</p>
<p class="mlm-off-notice red hide"><?=RCView::tt("multilang_65") // Multi-Langauage Management is currently <b>turned off</b> system-wide. In all projects, surveys and data entry forms are currently <b>not</b> translated and the Multi-Language Mangagement menu is not visible. ?></p>
<?php endif; ?>
<p class="mlm-hash-mismatch-warning yellow hide">
    <i class="fas fa-exclamation-triangle fa-2x text-danger"></i>
    <?=RCView::tt("multilang_104") // <b>ATTENTION:</b> The underlying project data has changed since this page was loaded. It is suggested that you save any unsaved changes and then reload this page before you make any further changes. ?>
</p>
<div class="mlm-items-hash-changed-warning yellow hide mb-4">
    <i class="fas fa-exclamation-triangle text-danger"></i>
    <?=RCView::tt("multilang_564") // <b>ATTENTION:</b> The original values of some translated items have changed, and thus some translations might be out of date. ?>
    <a href="javascript:;" data-mlm-action="review-changed-hash-items" style="text-decoration:underline;" data-mlm-review-hash-changed-items>multilang_565</a>
</div>
<p data-mlm-loading>
    <i class="fas fa-spinner fa-spin"></i> <?=RCView::tt("multilang_52") // Initializing ... ?>
</p>
<?php
#endregion

#region Sub-Navigation
?>
<div data-mlm-initialized id="sub-nav" class="d-sm-block" style="display:none !important;margin-bottom:0.5em !important;">
    <ul>
        <li class="active">
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="languages" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-globe"></i> <?=RCView::tt("multilang_67") // Languages ?></a>
        </li>
        <?php if ($isProject): ?>
        <li class="hidden-when-no-langs">
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="forms" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-table"></i> <?=RCView::tt("multilang_68") // Forms/Surveys ?></a>
        </li>
        <li class="hidden-when-no-langs">
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="alerts" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-bell"></i> <?=RCView::tt("multilang_69") // Alerts ?></a>
        </li>
        <li class="hidden-when-no-langs">
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="misc" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-random"></i> <?=RCView::tt("multilang_70") // Misc ?></a>
        </li>
        <?php endif; ?>
        <li class="hidden-when-no-langs">
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="ui" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-desktop"></i> <?=RCView::tt("multilang_71") // User Interface ?></a>
        </li>
        <?php if (false && !$isProject): ?>
        <li class="hidden-when-no-langs">
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="defaults" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-align-left"></i> <?=RCView::tt("multilang_141") // Defaults ?></a>
        </li>
        <?php endif; ?>
        <?php if (!$isProject): ?>
        <li>
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="usage" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-chart-line"></i> <?=RCView::tt("multilang_635") // Statistics ?></a>
        </li>
        <?php endif; ?>
        <li>
            <a href="javascript:;" data-mlm-action="main-nav" data-mlm-target="settings" style="font-size:13px;color:#393733;padding:7px 9px;"><i class="fas fa-cog"></i> <?=RCView::tt("multilang_72") // Settings ?></a>
        </li>
    </ul>
    <div style="font-weight:normal;display:inline-block;margin-left:10px;padding-top:3px;">
        &mdash;
        <button data-mlm-action="save-changes" class="btn btn-light btn-xs">
            <i class="fas fa-save"></i> &nbsp; <?=RCView::tt("report_builder_28") // Save Changes ?>
        </button>
    </div>
</div>
<div data-mlm-initialized class="mlm-tabs">
<?php
#endregion

#region Languages Tab
?>
<div data-mlm-tab="languages" class="d-none">
    <?php if ($isProject): ?>
    <p>
        <?=RCView::tt("multilang_236") ?>
    </p>
        <ol class="my-0">
            <li><?=RCView::tt("multilang_237") ?></li>
            <li><?=RCView::tt("multilang_238") ?></li>
            <li><?=RCView::tt("multilang_239") ?></li>
            <li><?=RCView::tt("multilang_241") ?>
            <li><?=RCView::tt("multilang_240") ?><button class='btn btn-xs btn-rcred btn-rcred-light ms-2' data-mlm-action="explain-actiontags" style='line-height: 14px;padding:1px 3px;font-size:11px;margin-right:6px;'>@ <?=RCView::tt("global_132")?></button></li>
        </ol>
    <?php else: ?>
    <p>
        <?=RCView::tt("multilang_08") // Here, system languages are defined and it is determined, which languages are available to import in projects. Since translations are copied to projects during the import, changing anything here will not affect existing projects. The default language is the language that is shown when no user language preference is found. ?>
    </p>
    <?php endif; ?>
    <p>
        <button data-mlm-action="add-language" class="btn btn-rcgreen btn-xs fs13 my-2">
            <i class="fas fa-plus"></i> <?=RCView::tt("multilang_07") // Add a new language ?>
        </button>
        <span class="ms-2 hidden-when-no-langs remove-when-control-center">
            <?= RCView::tt("multilang_606") // Export or import general settings ?><a class="help fs10" href="javascript:;" onclick="simpleDialog(window.lang.multilang_610 + '<br><br>' + window.lang.multilang_611, window.lang.multilang_609, null, 400);">?</a>
            :
            <button data-mlm-action="export-general" class="btn btn-light btn-sm text-primary" title="<?=RCView::tt_js2('multilang_607')?>"><i class="fas fa-file-download"></i></button>
            <button data-mlm-action="import-general" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_608')?>"><i class="fas fa-file-upload"></i></button>
        </span>
    </p>
    <p class="mlm-no-languages">
        <?=$isProject 
            ? RCView::tt("multilang_09") // Currently, there are no languages set up in this project.
            : RCView::tt("multilang_10") // Currently, there are no system languages configured.?>
    </p>
    <?php if ($isProject): // LANGUAGES TABLE (Project) ?>
    <div id="mlm-languages">
        <table class="table table-responsive table-md">
            <thead>
                <tr>
                    <th scope="col"><?=RCView::tt("multilang_73") // ID ?></th>
                    <th scope="col"><?=RCView::tt("multilang_25") // Display Name ?></th>
                    <th scope="col"><?=RCView::tt("setup_87") // Active ?></th>
                    <th scope="col" title="<?=js_escape2(RCView::tt("multilang_203", ""))?>"><?=RCView::tt("multilang_75") // Reference ?></th>
                    <th scope="col" title="<?=js_escape2(RCView::tt("multilang_204", ""))?>"><?=RCView::tt("multilang_76") // Fallback ?></th>
                    <th scope="col">
                        <?=RCView::tt("multilang_77") // RTL ?><a class="help fs10" href="javascript:;" onclick="simpleDialog(window.lang.multilang_202, window.lang.multilang_77, null, 400);">?</a>
                    </th>
                    <th scope="col"><?=RCView::tt("control_center_4540") // Actions ?></th>
                </tr>
            </thead>
            <tbody id="mlm-languages-rows">
            </tbody>
        </table>
    </div>
    <template data-mlm-template="languages-row">
        <tr data-mlm-language="">
            <th scope="row">
                <div class="mlm-text-cell">
                    <span data-mlm-config="key"></span>
                </div>
            </th>
            <td>
                <div class="mlm-text-cell">
                    <span data-mlm-config="display"></span>
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-toggle-cell">
                    <span class="switch switch-xs">
                        <input type="checkbox" class="switch" data-mlm-config="active" name="active" id="">
                        <label data-mlm-config="active" for=""></label>
                    </span>
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-radio-cell">
                    <input data-mlm-config="refLang" type="radio" name="refLang">
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-radio-cell">
                    <input data-mlm-config="fallbackLang" type="radio" name="fallbackLang">
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-toggle-cell">
                    <span class="switch switch-xs">
                        <input type="checkbox" class="switch" data-mlm-config="rtl" name="rtl" id="">
                        <label data-mlm-config="rtl" for=""></label>
                    </span>
                </div>
            </td>
            <td>
                <button data-mlm-action="edit-language" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_20')?>"><i class="fas fa-pencil-alt"></i></button>
                <button data-mlm-action="translate-forms" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_68')?>"><i class="fas fa-table"></i></button>
                <button data-mlm-action="translate-alerts" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_69')?>"><i class="fas fa-bell"></i></button>
                <button data-mlm-action="translate-misc" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_70')?>"><i class="fas fa-random"></i></button>
                <button data-mlm-action="translate-ui" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_71')?>"><i class="fas fa-desktop"></i></button>
                |
                <button data-mlm-action="export-language" class="btn btn-light btn-sm text-primary" title="<?=RCView::tt_js2('multilang_97')?>"><i class="fas fa-file-download"></i></button>
                |
                <button data-mlm-action="delete-language" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_45')?>"><i class="far fa-trash-alt text-danger"></i></button>
            </td>
        </tr>
    </template>
    <p class="mt-5 boldish fs14 text-dangerrc">
        <?=RCView::tt("multilang_563") // Designate a field for language preference ?>
    </p>
    <p>
        <?=RCView::tt("multilang_120") . " " // Use this feature to set a source for a participant's language preference. This must be a radio or dropdown field with choices matching the language ids shown on this page, or a text box field without any validation. The value of this field can be set manually or with the <em>@LANGUAGE-CURRENT-FORM/SURVEY</em> action tags. It will be used to determine the language for rendering ASIs, Alerts, and PDFs. ?>
        <?=RCView::tt("multilang_201") // Text fields are denoted [T], and radio and dropdown fields are denoted [R] and, in case they include all language keys, are highlighted with a green background. ?>
    </p>
    <div class="form-group form-group-sm mlm-designated-field-block">
        <label for="designated-language-field" class="col-12-sm control-label d-inline-block me-2 text-dangerrc">
            <i class="fas fa-language fs16 align-middle me-1"></i>
            <?=RCView::tt("multilang_121") // Language preference field: ?>
        </label>
        <select id="designated-language-field" data-mlm-config="designatedField" class="d-inline x-form-text x-form-field" style="width: auto;">
            <option value=""><?=RCView::tt_attr("multilang_122")?></option>
            <?php foreach ($designated as $line) { print $line["html"]; } ?>
        </select>
        <p class="mlm-designated-field-warning hide">
            <i class="fas fa-exclamation-circle text-danger"></i> 
            <?=RCView::tt("multilang_124") // <b>NOTE:</b> The field's options do not include all active languages! ?>
        </p>
    </div>
    <p class="cc_info text-secondary">
        <?=RCView::tt("multilang_123") // <b>NOTE:</b> Similar to a designated email field, when this field exists on multiple events in longitudinal projects, on a repeating instrument, or on a repeating event, the field's value will be syncronized across all instances/events so that changing it in one location will change the value across all events/instances where the field appears. ?>
    </p>
    <?php else: // LANGUAGES TABLE (System) ?>
    <div id="mlm-languages">
        <table class="table table-responsive table-md">
            <thead>
                <tr>
                    <th scope="col"><?=RCView::tt("multilang_73") // ID ?></th>
                    <th scope="col"><?=RCView::tt("multilang_25") // Display Name ?></th>
                    <th scope="col" class="text-end">%</th>
                    <th scope="col">
                        <?=RCView::tt("setup_87") // Active 
                        ?><a class="help fs10" href="javascript:;" onclick="simpleDialog(window.lang.multilang_605, window.lang.setup_87, null, 400);">?</a>
                    </th>
                    <th scope="col">
                        <?=RCView::tt("multilang_78") // Visible 
                        ?><a class="help fs10" href="javascript:;" onclick="simpleDialog(window.lang.multilang_604, window.lang.multilang_78, null, 400);">?</a>
                    </th>
                    <th scope="col">
                        <?=RCView::tt("survey_1017") // Default 
                        ?><a class="help fs10" href="javascript:;" onclick="simpleDialog(window.lang.multilang_603, window.lang.survey_1017, null, 400);">?</a>
                    </th>
                    <th scope="col">
                        <?=RCView::tt("multilang_601") // Initial 
                        ?><a class="help fs10" href="javascript:;" onclick="simpleDialog(window.lang.multilang_602, window.lang.multilang_601, null, 400);">?</a>
                    </th>
                    <th scope="col">
                        <?=RCView::tt("multilang_77") // RTL 
                        ?><a class="help fs10" href="javascript:;" onclick="simpleDialog(window.lang.multilang_202, window.lang.multilang_77, null, 400);">?</a>
                    </th>
                    <th scope="col"><?=RCView::tt("control_center_4540") // Actions ?></th>
                </tr>
            </thead>
            <tbody id="mlm-languages-rows">
            </tbody>
        </table>
    </div>
    <template data-mlm-template="languages-row">
        <tr data-mlm-language="">
            <th scope="row">
                <div class="mlm-text-cell">
                    <span data-mlm-config="key"></span>
                </div>
            </th>
            <td>
                <div class="mlm-text-cell">
                    <span data-mlm-config="display"></span>
                </div>
            </td>
            <td>
                <div class="mlm-text-cell text-end">
                    <span data-mlm-config="percent"></span>
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-toggle-cell">
                    <span class="switch switch-xs">
                        <input type="checkbox" class="switch" data-mlm-config="active" name="active" id="">
                        <label data-mlm-config="active" for=""></label>
                    </span>
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-toggle-cell">
                    <span class="switch switch-xs">
                        <input type="checkbox" class="switch" data-mlm-config="visible" name="visible" id="">
                        <label data-mlm-config="visible" for=""></label>
                    </span>
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-radio-cell">
                    <input data-mlm-config="refLang" type="radio" name="refLang">
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-radio-cell">
                    <input data-mlm-config="initialLang" type="radio" name="initialLang">
                </div>
            </td>
            <td class="text-center">
                <div class="mlm-radio-cell">
                    <input type="checkbox" class="switch" data-mlm-config="rtl" name="rtl">
                </div>
            </td>
            <td>
                <button data-mlm-action="edit-language" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_20')?>"><i class="fas fa-pencil-alt"></i></button>
                <button data-mlm-action="translate-ui" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_71')?>"><i class="fas fa-desktop"></i></button>
                |
                <button data-mlm-action="export-language" class="btn btn-light btn-sm text-primary" title="<?=RCView::tt_js2('multilang_97')?>"><i class="fas fa-file-download"></i></button>
                |
                <button data-mlm-action="delete-language" class="btn btn-light btn-sm" title="<?=RCView::tt_js2('multilang_45')?>"><i class="far fa-trash-alt text-danger"></i></button>
            </td>
        </tr>
    </template>
    <?php endif; ?>
</div>
<?php
#endregion 

if ($isProject):

#region Forms, Fields, Survey Settings, ASIs
?>
<div data-mlm-tab="forms" class="d-none">
    <!-- Language Switcher -->
    <div class="mlm-language-switcher">
        <div class="mlm-switcher-buttons-pretext"><?=RCView::tt("multilang_60") // Language: ?></div>
        <div class="mlm-switcher-buttons"></div>
    </div>
    <p class="mlm-reflang-notice yellow"><?=RCView::tt("multilang_57") // This is the reference language. Thus, items cannot be edited here. Instead, edit fields, survey settings, etc., in the <i>Online Designer</i> (or via <i>Data Dictionary</i> upload) and the <i>Survey Settings</i> page. However, fields and individual survey settings can be set to be excluded from translation on this page. ?></p>
    <div id="mlm-forms" data-mlm-mode="table">
        <p><?=RCView::tt("multilang_140") // Use this page to manage which instruments will be translated, separately in data entry and survey modes. Furthermore, use it to navigate to the various sub-pages, such as field exclusions (reference language only), or translations of field items (labels, etc.), survey settings (title, instructions, etc.) and ASI emails. ?></p>
        <p class="remove-when-surveys-off hide-when-ref-lang" data-mlm-sq-item="sq-survey_queue_custom_text">
            <button href="javascript:;" data-mlm-indicator data-mlm-action="translate-surveyqueue" class="btn btn-light btn-xs"><i class="fas fa-edit"></i> <?=RCView::tt("multilang_58") // Custom Survey Queue Text ?></button>
            <span class="mlm-ref-changed-icon text-danger" title="<?=RCView::tt_attr("multilang_146")?>" data-rc-lang-attrs="title=multilang_146" data-mlm-ref-changed><i class="fas fa-exclamation-circle"></i></span>
        </p>
        <p class="remove-when-surveys-off hide-when-ref-lang" data-mlm-sq-item="sq-survey_auth_custom_message">
            <button href="javascript:;" data-mlm-indicator data-mlm-action="translate-surveylogin" class="btn btn-light btn-xs"><i class="fas fa-edit"></i> <?=RCView::tt("multilang_59") // Custom Survey Login Error Message ?></button>
            <span class="mlm-ref-changed-icon text-danger" title="<?=RCView::tt_attr("multilang_146")?>" data-rc-lang-attrs="title=multilang_146" data-mlm-ref-changed><i class="fas fa-exclamation-circle"></i></span>
        </p>
        <!-- Instruments Table -->
        <table class="table table-responsive table-md">
            <thead>
                <tr>
                    <th scope="col"><?=RCView::tt("global_89") // Instrument ?></th>
                    <th scope="col"><?=RCView::tt("bottom_20") // Data Entry ?></th>
                    <th scope="col" class="remove-when-surveys-off"><?=RCView::tt("survey_437") // Survey ?></th>
                    <th scope="col"><?=RCView::tt("home_32") // Fields ?></th>
                    <th class="remove-when-surveys-off" scope="col"><?=RCView::tt("multilang_63") // Survey Settings ?></th>
                    <th class="remove-when-surveys-off" scope="col"><span class="hide-when-ref-lang"><?=RCView::tt("multilang_79") // ASIs ?></span><span class="show-when-ref-lang"><?=RCView::tt("multilang_650") // ASI Langauge Source ?></span></th>
                    <th class="hide-when-ref-lang" scope="col"><?=RCView::tt("global_71") // Export ?></th>
                </tr>
            </thead>
            <tbody id="mlm-forms-rows">
            </tbody>
        </table>
    </div>

    <div id="mlm-fields" data-mlm-mode="fields">
        <h3>
            <?=RCView::tt("home_32") // Fields ?>
            <span data-mlm-form class="mlm-formname">
                <?=RCView::tt("design_493") // Instrument: ?> <b data-mlm-display="form-display"></b>
                <span class="mlm-survey-settings-link">&ndash; <button data-mlm-action="translate-survey" class="btn btn-link btn-xs"><?=RCView::tt("multilang_63") // Survey Settings ?></button></span>
                <span class="mlm-asis-link">| <button data-mlm-action="translate-asis" class="btn btn-link btn-xs"><?=RCView::tt("multilang_79") // ASIs ?></button></span>
            </span>
        </h3>
        <p data-mlm-promis class="red"><?=RCView::tt("multilang_590") // <b>This is a PROMIS adaptative or auto-scoring instrument</b>. PROMIS instruments are validated for their specific language and should never be translated. Therefore, translation has been disabled for this instrument. ?></p>
        <p data-mlm-fromsharedlibrary class="yellow"><?=RCView::tt("multilang_591") // <b>This instrument has been downloaded from the REDCap Shared Library</b>. Care must be taken when translating curated instruments. Please check if this is even allowed or if there is a version of this instrument that has already been validated for the target language. ?></p>
        <div data-mlm-render="fields"><!-- Fields (rendered in JS) --></div>
        <p data-mlm-no-fields class="yellow"><?=RCView::tt("multilang_61") // There are no translatable fields on this form. They may have been excluded from translation. ?></p>
    </div>

    <div id="mlm-survey" data-mlm-mode="survey">
        <h3 class="mb-4">
            <?=RCView::tt("multilang_63") // Survey Settings ?>
            <span data-mlm-form class="mlm-formname">
                <?=RCView::tt("design_493") // Instrument: ?> <b data-mlm-display="form-display"></b>
                <span class="mlm-fields-link">&ndash; <button data-mlm-action="translate-fields" class="btn btn-link btn-xs nowrap"><?=RCView::tt("home_32") // Fields ?></button></span>
                <span class="mlm-asis-link">| <button data-mlm-action="translate-asis" class="btn btn-link btn-xs nowrap"><?=RCView::tt("multilang_79") // ASIs ?></button></span>
            </span>
        </h3>
        <div data-mlm-render="survey"><!-- Survey Settings (rendered in JS) --></div>
    </div>

    <div id="mlm-survey" data-mlm-mode="asi">
        <h3 class="mb-4">
            <?=RCView::tt("multilang_79") // ASIs ?>
            <span data-mlm-form class="mlm-formname">
                <?=RCView::tt("design_493") // Instrument: ?> <b data-mlm-display="form-display"></b>
                <span class="mlm-survey-settings-link">&ndash; <button data-mlm-action="translate-fields" class="btn btn-link btn-xs nowrap"><?=RCView::tt("home_32") // Fields ?></button></span>
                <span class="mlm-survey-settings-link">| <button data-mlm-action="translate-survey" class="btn btn-link btn-xs nowrap"><?=RCView::tt("multilang_63") // Survey Settings ?></button></span>
            </span>
        </h3>
        <div data-mlm-render="asi"><!-- Survey Settings (rendered in JS) --></div>
    </div>

    <div class="d-none"><!-- Templates -->
        <!--#region Forms/Surveys Table Row Template -->
        <template data-mlm-template="forms-row">
            <tr data-mlm-form="" data-mlm-language="">
                <th scope="row">
                    <div class="mlm-text-cell">
                        <!--
                        <button data-mlm-indicator="form-name" data-mlm-ref-changed="form-name" href="javascript:;" data-mlm-action="translate-formname" class="btn btn-light btn-xs disable-when-ref-lang" data-toggle="tooltip" data-placement="top" title="<?=RCView::tt_attr("multilang_80") // Translate the instrument's name ?>"><i class="fas fa-edit"></i></button>
                        -->
                        <span data-mlm-display="form"></span>
                    </div>
                </th>
                <td class="text-center">
                    <div class="mlm-text-cell text-center">
                        <span class="switch switch-xs" data-mlm-switch="form-active">
                            <input type="checkbox" class="switch" id="" data-mlm-type="form-active" data-mlm-name>
                            <label for="" data-toggle="tooltip" title="<?=RCView::tt_attr("multilang_81") // Check to enable translations on this data entry instrument ?>"></label>
                        </span>
                    </div>
                </td>
                <td class="remove-when-surveys-off">
                    <div class="mlm-text-cell text-center">
                        <span class="switch switch-xs" data-mlm-switch="survey-active">
                            <input type="checkbox" class="switch" id="" data-mlm-type="survey-active" data-mlm-name>
                            <label for="" data-toggle="tooltip" title="<?=RCView::tt_attr("multilang_82") // Check to enable translations on this survey ?>"></label>
                        </span>
                    </div>
                </td>
                <td>
                    <button href="javascript:;" data-mlm-action="translate-fields" class="btn btn-light btn-xs nowrap"><i class="fas fa-edit"></i> <?=RCView::tt("multilang_83") // Translate ?></button>
                </td>
                <td class="remove-when-surveys-off">
                    <div class="mlm-text-cell">
                        <span class="remove-when-survey">&mdash;</span>
                        <button href="javascript:;" data-mlm-action="translate-survey" class="btn btn-light btn-xs nowrap remove-when-not-survey"><i class="fas fa-edit"></i> <?=RCView::tt("multilang_83") // Translate ?></button>
                    </div>
                </td>
                <td class="remove-when-surveys-off">
                    <div class="mlm-text-cell">
                        <span class="remove-when-asis">&mdash;</span>
                        <button href="javascript:;" data-mlm-action="translate-asis" class="btn btn-light btn-xs nowrap remove-when-no-asis hide-when-ref-lang"><i class="fas fa-edit"></i> <?=RCView::tt("multilang_83") // Translate ?></button>
                        <div class="mlm-select-cell remove-when-no-asis show-when-ref-lang">
                            <select data-mlm-type="asi-source" data-mlm-name>
                                <option value="field"><?=RCView::tt_attr("multilang_209") // Language preference field ?></option>
                                <option value="user" selected><?=RCView::tt_attr("multilang_210") // User's or survey respondent's active language ?></option>
                            </select>
                        </div>
                    </div>
                </td>
                <td class="text-center hide-when-ref-lang">
                    <button data-mlm-action="export-single-form" class="btn btn-light btn-xs text-primary" title="<?=RCView::tt_js2('multilang_574')?>"><i class="fas fa-file-download"></i></button>
                </td>
            </tr>
        </template>
        <!--#endregion-->
        <!--#region Fields Templates -->
        <template data-mlm-template="field-exclusion-table">
            <table class="table table-responsive table-md">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"><?=RCView::tt("data_import_tool_98") // Field Name ?></th>
                        <th scope="col"><?=RCView::tt("multilang_84") // Excluded ?></th>
                    </tr>
                </thead>
                <tbody data-mlm-form></tbody>
            </table>
        </template>
        <template data-mlm-template="field-exclusion-row">
            <tr data-mlm-field data-mlm-language>
                <th scope="row">
                    <div class="mlm-text-cell text-center">
                        <span data-mlm-display="rowNumber"></span>
                    </div>
                </th>
                <td>
                    <div class="mlm-text-cell">
                        <span data-mlm-display="fieldName"></span>
                    </div>
                </td>
                <td class="text-center">
                    <div class="mlm-radio-cell">
                        <input data-mlm-type="field-excluded" type="checkbox" title="<?=RCView::tt_attr("multilang_85") // Check to exclude this field from being translated ?>">
                    </div>
                </td>
            </tr>
        </template>
        <template data-mlm-template="field-jumplist">
            <div class="mlm-field-jumplist">
                <div class="form-group form-group-sm form-inline">
                    <label for="field-jumplist" class="col-12-sm control-label d-inline-block">
                        <?=RCView::tt("multilang_05") // CTRL-G - Go to field: ?>
                    </label>
                    <select id="field-jumplist" data-mlm-type="fields-jumplist" class="form-control form-control-sm d-inline-block mlm-jumplist ms-2">
                        <option></option>
                    </select>
                    &nbsp;&nbsp;&nbsp;
                    <input class="form-check-input d-inline-block" type="checkbox" data-mlm-action="toggle-hide-fielditems-translated" name="ui-hide-translated" id="ui-hide-translated">
                    <label class="d-inline-block" for="ui-hide-translated">
                        <?=RCView::tt("multilang_51") // Hide translated items ?> 
                    </label>
                    &nbsp;
                    <button class="btn btn-sm btn-link ms-1" data-mlm-action="refresh-hide-fielditems-translated">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
                <div class="text-secondary">
                    <?=RCView::tt("multilang_207") // You may check the checkbox for fields whose text does not require translating. ?>
                </div>
            </div>
        </template>
        <template data-mlm-template="field">
            <div data-mlm-field class="mlm-field-block">
                <hr>
                <div class="mlm-item-translated-indicator">
                    <span data-mlm-indicator="translated" class="badge badge-light" data-mlm-display="fieldNum"></span>
                    <div style="display: inline-block;">
                        <input data-mlm-translation data-mlm-type="field-complete" style="position:relative;top:2.5px;margin-left:3px;" type="checkbox" id="" value="1" title="<?=RCView::tt_attr("multilang_86") // Check to mark this field as translated ?>">
                    </div>
                    <label class="mlm-field-name" data-mlm-display="fieldName" for=""></label>
                    <span class="mlm-matrix-name" hidden>&ndash; (<span data-mlm-display="matrixName"></span>)</span>
                </div>
                <div class="mlm-field-items">
                    <!-- Items -->
                </div>
            </div>
        </template>
        <template data-mlm-template="matrix">
            <div data-mlm-matrix class="mlm-field-block">
                <hr>
                <div class="mlm-item-translated-indicator">
                    <span data-mlm-indicator="translated" class="badge badge-light">#</span>
                    <div style="display: inline-block;">
                        <input data-mlm-translation data-mlm-type="matrix-complete" style="position:relative;top:2.5px;margin-left:3px;" type="checkbox" id="" value="1" title="<?=RCView::tt_attr("multilang_87") // Check to mark this matrix as translated ?>">
                    </div>
                    <label class="mlm-field-name" for=""><i style="font-weight: normal;"><?=RCView::tt("design_300") // Matrix group name: ?></i>
                        <span data-mlm-display="matrixName"></span>
                    </label>
                </div>
                <div class="mlm-field-items">
                    <!-- Items -->
                </div>
            </div>
        </template>
        <template data-mlm-template="field-item-text">
            <div data-mlm-field-item>
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="field-item-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <input type="text" data-mlm-translation data-mlm-type data-mlm-index="" data-mlm-refhash class="form-control form-control-sm mlm-textarea" id="" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>">
                </div>
            </div>
        </template>
        <template data-mlm-template="field-item-textarea">
            <div data-mlm-field-item>
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="field-item-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <div class="form-inline">
                        <textarea data-mlm-translation data-mlm-type data-mlm-index="" data-mlm-refhash class="form-control form-control-sm mlm-textarea textarea-autosize" id="" rows="1" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>"></textarea>
                        <button data-mlm-action="rich-text-editor" data-mlm-rtemode="inverted" data-mlm-name data-mlm-type data-mlm-index="" class="btn btn-xs btn-defaultrc mlm-rte-button"><?=RCView::tt("multilang_90") // Rich Text Editor ?></button>
                    </div>
                </div>
            </div>
        </template>
        <template data-mlm-template="field-item-table">
            <div data-mlm-field-item>
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="field-item-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <table class="table table-responsive table-md mt-2 mlm-choices-table" style="width: 90%;height:auto;">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" data-mlm-display="choiceType" class="text-center"></th>
                                <th scope="col" style="width: 100%;"><?=RCView::tt("multilang_91") // Translation ?></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </template>
        <template data-mlm-template="field-item-table-row">
            <tr data-mlm-choice>
                <td class="mlm-choices-table-indicator">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="field-choice-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                </td>
                <td class="mlm-choices-table-code">
                    <label data-mlm-display="code" for></label>
                </td>
                <td class="mlm-choices-table-translation">
                    <input type="text" data-mlm-translation data-mlm-name data-mlm-type data-mlm-index data-mlm-refhash class="form-control form-control-sm mlm-textarea" id="" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>">
                </td>
            </tr>
        </template>
        <!--#endregion-->
        <!--#region Survey Settings Templates -->
        <template data-mlm-template="survey-setting-exclusion-table">
            <table class="table table-responsive table-md">
                <thead>
                    <tr>
                        <th scope="col"><?=RCView::tt("multilang_92") // Setting ?></th>
                        <th scope="col"><?=RCView::tt("multilang_84") // Excluded ?></th>
                    </tr>
                </thead>
                <tbody data-mlm-form></tbody>
            </table>
        </template>
        <template data-mlm-template="survey-setting-exclusion-row">
            <tr data-mlm-setting data-mlm-language>
                <td>
                    <div class="mlm-text-cell">
                        <span data-mlm-display="settingName"></span>
                    </div>
                </td>
                <td class="text-center">
                    <div class="mlm-radio-cell">
                        <input data-mlm-type="setting-excluded" type="checkbox" title="<?=RCView::tt_attr("multilang_93") // Check to exclude this setting from being translated ?>">
                    </div>
                </td>
            </tr>
        </template>
        <template data-mlm-template="survey-setting-title">
            <div class="mlm-survey-setting-title">
                <h5 class="mlm-sub-category-subheading"><span data-mlm-display="title"></span></h5>
            </div>
        </template>
        <template data-mlm-template="survey-setting-text">
            <div data-mlm-survey-setting class="mlm-field-block">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <input type="text" data-mlm-translation data-mlm-type data-mlm-name data-mlm-index="" data-mlm-refhash class="form-control form-control-sm mlm-textarea" id="" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>">
                </div>
            </div>
        </template>
        <template data-mlm-template="survey-setting-textarea">
            <div data-mlm-survey-setting class="mlm-field-block">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <div class="form-inline">
                        <textarea data-mlm-translation data-mlm-type data-mlm-name data-mlm-index="" data-mlm-refhash class="form-control form-control-sm mlm-textarea textarea-autosize" id="" rows="1" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>"></textarea>
                        <button data-mlm-action="rich-text-editor" data-mlm-rtemode="normal" data-mlm-name data-mlm-type data-mlm-index="" style="float:right;" class="btn btn-xs btn-defaultrc mlm-rte-button">
                            <?=RCView::tt("multilang_90") // Rich Text Editor ?>
                        </button>
                    </div>
                </div>
            </div>
        </template>
        <template data-mlm-template="survey-setting-select">
            <div data-mlm-survey-setting class="mlm-field-block">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <select data-mlm-translation data-mlm-type data-mlm-name data-mlm-index="" class="form-control form-control-sm mlm-textarea" id="" placeholder="">
                        <option value=""><?=RCView::tt_attr("multilang_105") // -- Select an option -- ?></option>
                    </select>
                </div>
            </div>
        </template>
        <!--#endregion-->
        <!--#region ASI Templates -->
        <template data-mlm-template="asi-ref-lang-notice">
            <p><i><?=RCView::tt("multilang_147") // There are no options to be set for the reference language. Please choose another language. ?></i></p>
        </template>
        <template data-mlm-template="asi-settings">
            <div data-mlm-asi class="mlm-field-block">
                <hr>
                <div class="mlm-item-translated-indicator">
                    <span data-mlm-indicator="asi-translated" class="badge badge-light">&nbsp;</span>
                    <label class="mlm-field-name" data-mlm-display="event-name" for=""></label> (<span data-mlm-display="unique-event-name"></span>)
                </div>
                <div class="mlm-asi-items">
                    <!-- Items -->
                </div>
            </div>
        </template>
        <template data-mlm-template="asi-setting-text">
            <div data-mlm-asi-setting class="mlm-field-block">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="asi-setting-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <input type="text" data-mlm-translation data-mlm-type data-mlm-name data-mlm-index="" data-mlm-refhash class="form-control form-control-sm  mlm-textarea" id="" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>">
                </div>
            </div>
        </template>
        <template data-mlm-template="asi-setting-textarea">
            <div data-mlm-asi-setting class="mlm-field-block">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="asi-setting-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <div class="form-inline">
                        <textarea data-mlm-translation data-mlm-type data-mlm-name data-mlm-index="" data-mlm-refhash class="form-control form-control-sm mlm-textarea textarea-autosize" id="" rows="1" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>"></textarea>
                        <button data-mlm-action="rich-text-editor" data-mlm-rtemode="normal" data-mlm-name data-mlm-type data-mlm-index="" style="float:right;" class="btn btn-xs btn-defaultrc mlm-rte-button">
                            <?=RCView::tt("multilang_90") // Rich Text Editor ?>
                        </button>
                    </div>
                </div>
            </div>
        </template>
        <!--#endregion-->
        <!--#region Reference Value Template -->
        <template data-mlm-template="reference-value">
            <div class="mlm-reference form-inline">
                <span data-mlm-ref-changed class="badge badge-warning" style="min-width:3em;">&nbsp;</span>
                <span class="mlm-reference-title"><?=RCView::tt("multilang_94") // Reference text: ?></span>
                <button data-mlm-ref-changed data-mlm-action="accept-ref-change" class="btn btn-xs text-danger btn-link" title="<?=RCView::tt_attr("multilang_95") // Mark this translation as adequate for the changed reference ?>" style="display:none;">
                    <i class="far fa-check-circle"></i>
                </button><button data-mlm-action="copy-reference" class="btn btn-xs btn-link copy-reference" title="<?=RCView::tt_attr("multilang_96") // Copy reference value to the clipboard)?>">
                    <i class="far fa-copy"></i>
                </button> 
                <span class="mlm-reference-value" data-mlm-display="reference"></span>
            </div>
        </template>
        <!--#endregion-->
    </div>
</div>
<?php
#endregion

#region Alerts
//
?>
<div data-mlm-tab="alerts" class="d-none">
    <!-- Language Switcher -->
    <div class="mlm-language-switcher">
        <div class="mlm-switcher-buttons-pretext"><?=RCView::tt("multilang_60") // Language: ?></div>
        <div class="mlm-switcher-buttons"></div>
    </div>
    <!-- Content -->
    <p class="mlm-reflang-notice yellow"><?=RCView::tt("multilang_152") // <b>This is the default/reference language.</b> Thus, items cannot be edited here, but they can be modified on the <i>Alerts & Notifications</i> page. However, individual alerts can be set to be excluded from translation here. <b>If you wish to begin/continue translating the default language text, click a language button above.</b> ?></p>
    <!-- Alerts Exclusion Table -->
    <div data-mlm-mode="alerts-exclusion">
        <p><?=RCView::tt("multilang_153") // Use this page to manage which alerts should be translated. Alerts that are turned off will not show up for (nor be translated into) other languages. Note that since alerts can be set up for various purposes and triggered in different contexts, it is not possible to automatically determine the language that should be used to render an alert. Therefore, for each alert, the source for the language information needs to be set. This can either be the <b>'Language preference field'</b> (as set on the 'Languages' tab; this is the default), or the <b>'User's or survey respondent's active language'</b> (as set in their profile/browser cookie). ?></p>
        <table class="table table-responsive table-md">
            <thead>
                <tr>
                    <th scope="col"><?=RCView::tt("multilang_73") // ID ?></th>
                    <th scope="col"><?=RCView::tt("alerts_24") // Alert ?></th>
                    <th scope="col"><?=RCView::tt("multilang_84") // Excluded ?></th>
                    <th scope="col"><?=RCView::tt("multilang_208") // Language Source ?></th>
                </tr>
            </thead>
            <tbody id="mlm-alets-exclusion-rows">
            </tbody>
        </table>
    </div>
    <!-- Alerts Translation -->
    <div data-mlm-mode="alerts-translation">
        <!-- Search Tool -->
        <div class="mlm-search-tool form-group form-inline hide-when-no-alerts">
            <label id="mlm-alerts-search-box-label" for="mlm-alerts-search-box"><?=RCView::tt("multilang_49") // Filter items on this page: ?></label>
            <input data-mlm-config="alerts-search" type="search" class="form-control form-control-sm" id="mlm-alerts-search-box" aria-describedby="mlm-alerts-search-box-label" placeholder="<?=RCView::tt_attr("multilang_50") // Search for anything... ?>">
            <a href="javascript:;" data-mlm-action="alerts-collapse-all" class="ms-2">
                <?=RCView::tt("multilang_157") // Collapse all ?>
            </a> &nbsp;|&nbsp;
            <a href="javascript:;" data-mlm-action="alerts-expand-all">
                <?=RCView::tt("multilang_158") // Expand all ?>
            </a>
        </div>
        <!-- Alerts Settings -->
        <div data-mlm-render="alerts"></div>
        <p class="show-when-no-alerts mt-5">
            <i><?=RCView::tt("multilang_156") // There are no alerts that can be translated. ?></i>
        </p>
        <p class="mlm-alerts-no-items mt-5 hide"><i><?=RCView::tt("multilang_103") // There are no items matching the current filter criteria. ?></i></p>
    </div>
    <!-- Templates -->
    <div class="d-none">
        <!--#region Alert Templates -->
        <template data-mlm-template="alert-exclusion-row">
            <tr data-mlm-alert>
                <th scope="row">
                    <div class="mlm-text-cell text-center">
                        <span data-mlm-display="alert-id"></span>
                    </div>
                </th>
                <td>
                    <div class="mlm-text-cell">
                        <span data-mlm-display="alert-number"></span>
                        <span data-mlm-display="alert-name"></span>
                    </div>
                </td>
                <td class="text-center">
                    <div class="mlm-radio-cell">
                        <input data-mlm-type="alert-excluded" data-mlm-name type="checkbox" title="<?=RCView::tt_attr("multilang_155") // Check to exclude this alert from being translated ?>">
                    </div>
                </td>
                <td>
                    <div class="mlm-select-cell">
                        <select data-mlm-type="alert-source" data-mlm-name>
                            <option value="field" selected><?=RCView::tt_attr("multilang_209") // Language preference field ?></option>
                            <option value="user"><?=RCView::tt_attr("multilang_210") // User's or survey respondent's active language ?></option>
                        </select>
                    </div>
                </td>
            </tr>
        </template>
        <template data-mlm-template="no-alerts-exclusion-row">
            <tr>
                <td colspan="3">
                    <div class="mlm-text-cell">
                        <i><?=RCView::tt("multilang_174") // There are no alerts in this project. ?></i>
                    </div>
                </td>
            </tr>
        </template>
        <template data-mlm-template="alert-settings">
            <div data-mlm-alert class="mlm-field-block">
                <hr>
                <div class="mlm-item-translated-indicator">
                    <span data-mlm-indicator="alert-translated" class="badge badge-light">&nbsp;</span>
                    <a href="javascript:;" data-mlm-alert-id data-mlm-action="alert-toggle-collapse" class="mlm-alert-toggle">
                        <b><?=RCView::tt("alerts_24") // Alert ?> <span data-mlm-display="alert-number"></span> <span data-mlm-display="alert-name"></span></b>
                        [ <span data-mlm-display="alert-id"></span> ]
                        <i class="fas fa-angle-up hide-when-collapsed ms-2"></i>
                        <i class="far fa-caret-square-down show-when-collapsed ms-2"></i>
                    </a>
                </div>
                <div class="mlm-alert-items hide-when-collapsed">
                    <!-- Items -->
                </div>
            </div>
        </template>
        <template data-mlm-template="alert-setting-text">
            <div data-mlm-alert-setting class="mlm-field-block">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="alert-setting-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <input type="text" data-mlm-translation data-mlm-type data-mlm-name data-mlm-index="" data-mlm-refhash class="form-control form-control-sm mlm-textarea" id="" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>">
                </div>
            </div>
        </template>
        <template data-mlm-template="alert-setting-textarea">
            <div data-mlm-alert-setting class="mlm-field-block">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="alert-setting-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt" data-mlm-display="prompt" for=""></label>
                    <div class="form-inline">
                        <textarea data-mlm-translation data-mlm-type data-mlm-name data-mlm-index="" data-mlm-refhash class="form-control form-control-sm mlm-textarea textarea-autosize" id="" rows="1" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>"></textarea>
                        <button data-mlm-action="rich-text-editor" data-mlm-rtemode="normal" data-mlm-name data-mlm-type data-mlm-index="" style="float:right;" class="btn btn-xs btn-defaultrc mlm-rte-button">
                            <?=RCView::tt("multilang_90") // Rich Text Editor ?>
                        </button>
                    </div>
                </div>
            </div>
        </template>
        <!--#endregion-->
    </div>
</div>
<?php
#endregion

#region Misc
$has_mdcs = count($proj_meta["mdcs"]) > 0;
$has_pdfcustomizations = count($proj_meta["pdfCustomizations"]);
$has_protmail = count($proj_meta["protectedMail"]);
?>
<div data-mlm-tab="misc" class="d-none">
    <!-- Language Switcher -->
    <div class="mlm-language-switcher">
    <div class="mlm-switcher-buttons-pretext"><?=RCView::tt("multilang_60") // Language: ?></div>
        <div class="mlm-switcher-buttons"></div>
    </div>
    <!-- Content -->
    <p class="mlm-reflang-notice yellow mt-3"><?=RCView::tt("multilang_177") // <b>This is the reference language.</b> There are no items on the <b>'Misc'</b> tab that can be edited for the references language.<br><i>Please choose another language.</i> ?></p>
    <p class="hide-when-ref-lang"><?=RCView::tt("multilang_213") // Note that some tabs on this page (such as e.g., Missing Data Codes or Protected Email) will only be shown when the corresponding features are enabled in this project. ?></p>
    <!-- Misc Category Nav -->
    <div class="mlm-sub-category-nav nav d-block">
        <ul class="nav nav-tabs hide-when-ref-lang">
            <?php if ($has_mdcs): ?>
            <li class="nav-item">
                <a href="javascript:;" data-mlm-action="cat-nav" data-mlm-sub-category="misc-mdc" class="nav-link mlm-sub-category-link"><?=RCView::tt("missing_data_04") // Missing Data Codes ?></a>
            </li>
            <?php endif; ?>
            <?php if ($has_pdfcustomizations): ?>
            <li class="nav-item">
                <a href="javascript:;" data-mlm-action="cat-nav" data-mlm-sub-category="misc-pdf" class="nav-link mlm-sub-category-link"><?=RCView::tt("global_85") // PDF ?></a>
            </li>
            <?php endif; ?>
            <?php if ($has_protmail): ?>
            <li class="nav-item">
                <a href="javascript:;" data-mlm-action="cat-nav" data-mlm-sub-category="misc-protmail" class="nav-link mlm-sub-category-link"><?=RCView::tt("multilang_189") // Protected Mail ?></a>
            </li>
            <?php endif; ?>
            <!--
            <li class="nav-item">
                <a href="javascript:;" data-mlm-action="cat-nav" data-mlm-sub-category="misc-soon" class="nav-link mlm-sub-category-link">Coming soon &hellip;</a>
            </li>
            -->
        </ul>
    </div>
    <div class="mlm-misc-category-tabs hide-when-ref-lang">
        <!-- Coming Soon Placeholder -->
        <!--
        <div class="mlm-misc-category-tab hide" data-mlm-sub-category="misc-soon">
            <p>
                Translation of items such as the following might be possible in the future:
                <ul>
                    <li>Event Names and Custom Event Labels</li>
                    <li>Custom Record Label</li>
                    <li>Custom label for repeating instruments</li>
                    <li>Survey Notification Emails</li>
                </ul>
            </p>
        </div>
        -->
        <?php if ($has_mdcs): ?>
        <!-- Missing Data Codes -->
        <div class="mlm-misc-category-tab hide" data-mlm-sub-category="misc-mdc">
            <div data-mlm-field-item class="mt-4">
                <div class="form-group">
                    <div class="mlm-item-translated-indicator">
                        <span data-mlm-indicator="mdcs-translated" class="badge badge-light" >&nbsp;</span>
                    </div>
                    <label class="mlm-translation-prompt"><?=RCView::tt("multilang_178") // Missing Data Code Translations ?></label>
                    <table class="table table-responsive table-md mt-2 mlm-choices-table" style="width: 90%;height:auto;">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"><?=RCView::tt("multilang_179") // Code ?></th>
                                <th scope="col" style="width: 100%;"><?=RCView::tt("multilang_91") // Translation ?></th>
                            </tr>
                        </thead>
                        <tbody><!-- Uses 'field-item-table-row' template --></tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php endif; ?>
        <?php if ($has_pdfcustomizations): ?>
        <!-- PDF Customizations -->
        <div class="mlm-misc-category-tab hide" data-mlm-sub-category="misc-pdf">
            <div data-mlm-pdf-items class="mt-4">
            <?php foreach($proj_meta["pdfCustomizations"][""] as $pdfcust_name => $pdfcust_data): ?>
                <div data-mlm-pdf-setting class="mlm-field-block">
                    <div class="form-group">
                        <div class="mlm-item-translated-indicator">
                            <span data-mlm-indicator="pdf-setting-translated" class="badge badge-light" >&nbsp;</span>
                        </div>
                        <label class="mlm-translation-prompt" for="<?=$pdfcust_name?>"><?=$pdfcust_data["prompt"]?></label>
                        <div class="mlm-reference">
                            <span data-mlm-ref-changed class="badge badge-warning" style="min-width:3em;">&nbsp;</span>
                            <span class="mlm-reference-title"><?=RCView::tt("multilang_94") // Reference text: ?></span>
                            <button data-mlm-ref-changed data-mlm-action="accept-ref-change" class="btn btn-xs text-danger btn-link" title="<?=RCView::tt_attr("multilang_95") // Mark this translation as adequate for the changed reference ?>" style="display:none;">
                                <i class="far fa-check-circle"></i>
                            </button><button data-mlm-action="copy-reference" class="btn btn-xs btn-link copy-reference" title="<?=RCView::tt_attr("multilang_96") // Copy reference value to the clipboard)?>">
                                <i class="far fa-copy"></i>
                            </button> 
                            <span class="mlm-reference-value"><?=$pdfcust_data["reference"]?></span>
                        </div>
                        <input type="text" data-mlm-translation data-mlm-type="<?=$pdfcust_name?>" data-mlm-name="" data-mlm-index="" data-mlm-refhash="<?=$pdfcust_data["refHash"]?>" class="form-control form-control-sm mlm-textarea" id="<?=$pdfcust_name?>" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>">
                    </div>
                </div>
            <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
        <?php if ($has_protmail): ?>
        <!-- Protected Email -->
        <div class="mlm-misc-category-tab hide" data-mlm-sub-category="misc-protmail">
            <div data-mlm-pdf-items class="mt-4">
            <?php foreach($proj_meta["protectedMail"][""] as $pe_name => $pe_data): ?>
                <div data-mlm-protmail-setting class="mlm-field-block">
                    <div class="form-group">
                        <div class="mlm-item-translated-indicator">
                            <span data-mlm-indicator="protmail-setting-translated" class="badge badge-light" >&nbsp;</span>
                        </div>
                        <label class="mlm-translation-prompt" for="<?=$pe_name?>"><?=$pe_data["prompt"]?></label>
                        <div class="mlm-reference">
                            <span data-mlm-ref-changed class="badge badge-warning" style="min-width:3em;">&nbsp;</span>
                            <span class="mlm-reference-title"><?=RCView::tt("multilang_94") // Reference text: ?></span>
                            <button data-mlm-ref-changed data-mlm-action="accept-ref-change" class="btn btn-xs text-danger btn-link" title="<?=RCView::tt_attr("multilang_95") // Mark this translation as adequate for the changed reference ?>" style="display:none;">
                                <i class="far fa-check-circle"></i>
                            </button><button data-mlm-action="copy-reference" class="btn btn-xs btn-link copy-reference" title="<?=RCView::tt_attr("multilang_96") // Copy reference value to the clipboard)?>">
                                <i class="far fa-copy"></i>
                            </button> 
                            <span class="mlm-reference-value"><?=$pe_data["reference"]?></span>
                        </div>
                        <div class="form-inline">

                            <textarea data-mlm-translation data-mlm-type="<?=$pe_name?>" data-mlm-name="" data-mlm-index="" data-mlm-refhash="<?=$pe_data["refHash"]?>" class="form-control form-control-sm mlm-textarea textarea-autosize" id="<?=$pe_name?>" rows="1" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>"></textarea>
                            <button data-mlm-action="rich-text-editor" data-mlm-rtemode="normal" data-mlm-name="" data-mlm-type="<?=$pe_name?>" data-mlm-index="" style="float:right;" class="btn btn-xs btn-defaultrc mlm-rte-button">
                                <?=RCView::tt("multilang_90") // Rich Text Editor ?>
                            </button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>
<?php 

#endregion

;elseif(false):

#region Defaults
?>
<div data-mlm-tab="defaults" class="d-none">
    <!-- Language Switcher -->
    <div class="mlm-language-switcher">
    <div class="mlm-switcher-buttons-pretext"><?=RCView::tt("multilang_60") // Language: ?></div>
        <div class="mlm-switcher-buttons"></div>
    </div>
    <!-- Content -->
    <p>
        Not implemented yet.
    </p>
    <p>
        This will (eventually) allow translation of miscellaneous defaults such as:
        <ul>
            <li>Preset survey setting texts</li>
            <li>Default ASI email content</li>
            <li>Default Missing Data Code labels</li>
        </ul>
    </p>
</div>
<?php
#endregion

;endif;

#region User Interface
?>
<div data-mlm-tab="ui" class="d-none">
    <!-- Language Switcher -->
    <div class="mlm-language-switcher">
        <div class="mlm-switcher-buttons-pretext"><?=RCView::tt("multilang_60") // Language: ?></div>
        <div class="mlm-switcher-buttons"></div>
    </div>
    <p>
		<?=RCView::tt("multilang_220") // You may translate any of the REDCap's stock user interface elements... ?>
    </p>
    <!-- Search Tool -->
    <div class="mlm-search-tool form-group form-inline">
        <label id="mlm-ui-search-box-label" for="mlm-ui-search-box"><?=RCView::tt("multilang_49") // Filter items on this page: ?></label>
        <input data-mlm-config="ui-search" type="search" class="form-control form-control-sm" id="mlm-ui-search-box" aria-describedby="mlm-ui-search-box-label" placeholder="<?=RCView::tt_attr("multilang_50") // Search for anything... ?>">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input class="form-check-input" type="checkbox" data-mlm-action="toggle-hide-ui-translated" name="ui-hide-translated" id="ui-hide-translated">
        <label for="ui-hide-translated">
            <?=RCView::tt("multilang_51") // Hide translated items ?> 
        </label>
    </div>
    <!-- UI Category Nav -->
    <div class="mlm-sub-category-nav nav d-block">
        <ul class="nav nav-tabs">
        <?php 
        foreach ($ui_categories as $cat => $display) {
            if (strpos($cat, "_") !== false) continue;
        ?>
            <li class="nav-item">
                <a href="javascript:;" data-mlm-action="cat-nav" data-mlm-sub-category="<?=$cat?>" class="nav-link mlm-sub-category-link"><?=$display?></a>
            </li>
        <?php } ?>
        </ul>
    </div>
    <div class="mlm-ui-translations">
        <?php $item = 0; foreach ($ui_meta as $id => $meta) { 
            $item++;
            $badge = $meta["type"] == "bool" ? "badge badge-secondary" : "badge"; // Default badge class for switches
        ?>
        <div data-mlm-ui-translation data-mlm-group="<?=$meta["group"]?>" class="mlm-translation-item form-group <?=$meta["category"]?>">
            <div class="mlm-item-translated-indicator">
                <span data-mlm-indicator="translated" class="<?=$badge?>" >&nbsp;</span>
            </div>
            <label class="mlm-translation-prompt" for="mlm-item-<?=$item?>"><?=$meta["prompt"]?></label>
            <?php if ($meta["type"] == "string") { ?>
                <div class="mlm-reference">
                    <span data-mlm-ref-changed class="badge badge-warning" style="min-width:3em;">&nbsp;</span>
                    <span class="mlm-reference-title"><?=RCView::tt("multilang_94") // Reference text: ?></span>
                    <button data-mlm-ref-changed data-mlm-action="accept-ref-change" class="btn btn-xs text-danger btn-link" title="<?=RCView::tt_attr("multilang_95") // Mark this translation as adequate for the changed reference ?>" style="display:none;">
                        <i class="far fa-check-circle"></i>
                    </button><button data-mlm-action="copy-reference" class="btn btn-xs btn-link copy-reference" title="<?=RCView::tt_attr("multilang_96") // Copy reference value to the clipboard ?>"><i class="far fa-copy"></i></button>
                    <span class="mlm-reference-value"><?=htmlentities($meta["default"])?></span>
                </div>
                <textarea rows="1" class="form-control mlm-textarea textarea-autosize" id="mlm-item-<?=$item?>" data-mlm-translation="<?=$id?>" data-mlm-type="ui" data-mlm-refhash="<?=$meta["refHash"]?>" placeholder="<?=RCView::tt_attr("multilang_89") // Enter translation ?>"></textarea>
            <?php } else if ($meta["type"] == "bool") { ?>
                <div class="mlm-translation-toggle">
                    <span class="switch switch-xs">
                        <input type="checkbox" class="switch" data-mlm-translation="<?=$id?>" id="mlm-item-<?=$item?>">
                        <label for="mlm-item-<?=$item?>"></label>
                    </span>
                </div>
            <?php } ?>
        </div>
        <?php } // foreach ?>
        <p class="mlm-ui-no-items hide"><i><?=RCView::tt("multilang_103") // There are no items matching the current filter criteria. ?></i></p>
    </div>
</div>
<?php
#endregion

if ($isProject) {

#region Project Settings Tab 
?>
<div data-mlm-tab="settings" class="d-none">
    <p>
        <?= RCView::tt("multilang_14") // Use the following settings to facilitate translation during project development. For PRODUCTION projects, it is recommended to turn off the highlight options. ?>
    </p>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-highlightMissingDataentry" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="highlightMissingDataentry" id="switch-highlightMissingDataentry">
                    <label for="switch-highlightMissingDataentry"></label>
                </span>
                <?=RCView::tt("multilang_15") // Highlight untranslated text on Data Entry pages that should be translated ?>
            </label>
        </p>
    </div>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-highlightMissingSurvey" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="highlightMissingSurvey" id="switch-highlightMissingSurvey">
                    <label for="switch-highlightMissingSurvey"></label>
                </span>
                <?=RCView::tt("multilang_16") // Highlight untranslated text on Survey pages that should be translated ?>
            </label>
        </p>
    </div>
    <p>
        <?= RCView::tt("multilang_622") // Turn on the following option for REDCap to try to match the user's preferred language as set in the web browser used to the languages available in this project. Note that for this to work, the languages' IDs <b>must</b> match a valid ISO code. Autodetection will only take effect in case the user has not actively chosen a language yet, i.e. on their first visit. ?>
        <span class="mlm-input-description">
            <a href="<?=RCView::tt_attr("multilang_624")?>" target="_blank"><u><?=RCView::tt("multilang_205")?></u></a>
            <a href="<?=RCView::tt_attr("multilang_626")?>" target="_blank"><u><?=RCView::tt("multilang_627")?></u></a>
        </span>
    </p>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-autoDetectBrowserLang" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="autoDetectBrowserLang" id="switch-autoDetectBrowserLang">
                    <label for="switch-autoDetectBrowserLang"></label>
                </span>
                <?=RCView::tt("multilang_623") // Attempt to match initially displayed language with preferred languages set in web browsers ?>
            </label>
        </p>
    </div>
    <hr>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-disabled" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="disabled" id="switch-disabled">
                    <label for="switch-disabled"></label>
                </span>
                <?=RCView::tt("multilang_11") // Disable (i.e. turn off) multi-language support for this project ?>
            </label>
        </p>
    </div>
    <?php if (UserRights::isSuperUserNotImpersonator()): ?>
    <hr>
    <p><?=RCView::tt("multilang_18", "b", [ "class" => "text-danger" ]) // Admin-only settings ?></p>
    <?php if($require_admin_activation): ?>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-admin-enabled" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="admin-enabled" id="switch-admin-enabled">
                    <label for="switch-admin-enabled"></label>
                </span>
                <span>
                    <?=RCView::tt("multilang_631") // <b>Enable</b> multi-language support for this project ?>
                    <?php if ($langs_defined): ?>
                    <br>
                    <?=RCView::tt("multilang_632", "span", ["class" => "small text-danger"]) // Note, since there already is at least one language defined, multi-language support will remain available irrespective of the state of this switch. However, unless switched on, once all languages are deleted, the Multi-Language Management menu link will be hidden and users will be locked out of the Multi-Language Management page. ?>
                    <?php endif; ?>
                </span>
            </label>
        </p>
    </div>
    <?php endif; ?>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-admin-disabled" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="admin-disabled" id="switch-admin-disabled">
                    <label for="switch-admin-disabled"></label>
                </span>
                <span>
                    <?=RCView::tt("multilang_633") // <b>Disable</b> multi-language support for this project ?>
                    <br>
                    <?=RCView::tt("multilang_634", "span", ["class" => "small"]) // Turning on this option will hide the Multi-Language Management menu link and prevent access to Multi-Language Management for users even when there are languages defined. ?>
                </span>
            </label>
        </p>
    </div>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-debug" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="debug" id="switch-debug">
                    <label for="switch-debug"></label>
                </span>
                <?=RCView::tt("multilang_17") // Debug mode (status messages will be output to the browser console) ?>
            </label>
        </p>
    </div>
    <?php endif; // Super User ?>
    <hr>
    <p><b><?=RCView::tt("multilang_159") // Translation Snapshots ?></b></p>
    <p><?=RCView::tt("multilang_162") // A snapshot of your current translation settings (all translations and settings for all languages) can be saved and stored by simply clicking the 'Create Snapshot' button on this page. All snapshots can be accessed and downloaded at any time from the table below (click the 'Show/Hide Snapshots' link to toggle display of the table). There is no limit to how many snapshots can be created. Creating a snapshot can be useful to allow you to revert your translations back to a specific point in time, if desired, by downloading the snapshot (a ZIP file) and re-importing the individual files (one per language) contained in it. Note that restoring this way will be based on a <i>best effort</i> scheme, as the underlying project structure may have changed since the snapshot was created. ?></p>
    <div class="ms-3 mt-2">
        <button data-mlm-action="create-snapshot" class="btn btn-sm btn-defaultrc"><i class="fas fa-spinner fa-spin me-1 when-disabled hide"></i><i class="fas fa-camera me-1 when-enabled"></i> <?=RCView::tt("multilang_160") // Create Snapshot ?></button>
        <button data-mlm-action="toggle-snapshots" class="btn btn-xs btn-link ms-4"><?=RCView::tt("multilang_161") // Show/Hide Snapshot ?></button>
        <span style="display:inline-block">(</span>
        <div class="mlm-inline-checkbox">
            <input data-mlm-action="toggle-show-deleted-snapshots" type="checkbox" id="mlm-show-deleted-snapshots">
          <label for="mlm-show-deleted-snapshots"><?=RCView::tt("multilang_169") // Show deleted snapshots ?></label>
        </div>
        )
    </div>
    <div class="mlm-snapshots-table hide">
        <table class="table table-responsive table-md">
            <thead>
                <tr>
                    <th scope="col"><?=RCView::ttfy("Timestamp") // Timestamp ?></th>
                    <th scope="col"><?=RCView::tt("rev_history_14") // Created by ?></th>
                    <th scope="col"><?=RCView::tt("control_center_4540") // Actions ?></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <!-- Templates -->
    <div class="d-none">
        <template data-mlm-template="snapshot-row">
            <tr data-mlm-snapshot>
                <td class="mlm-vertical-baseline">
                    <div class="mlm-text-cell">
                        <span data-mlm-display="timestamp"></span>
                    </div>
                </td>
                <td class="mlm-vertical-baseline">
                    <div class="mlm-text-cell">
                        <span data-mlm-display="user"></span>
                    </div>
                </td>
                <td>
                    <div class="mlm-radio-cell remove-when-deleted">
                        <button data-mlm-action="download-snapshot" data-mlm-snapshot class="btn btn-sm text-primary"><i class="fas fa-file-download"></i></button>
                        |
                        <button data-mlm-action="delete-snapshot" data-mlm-snapshot class="btn btn-light btn-sm text-danger"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <div class="mlm-radio-cell remove-when-not-deleted" data-toggle="popover" style="cursor: pointer;">
                        <span class="badge badge-danger"><?=RCView::tt("global_106") // Deleted ?></span>
                    </div>
                </td>
            </tr>
        </template>
        <template data-mlm-template="snapshots-loading">
            <tr>
                <td class="mlm-vertical-baseline" colspan="3">
                    <div class="mlm-text-cell">
                        <i class="fas fa-spinner fa-spin"></i> <?=RCView::tt("data_entry_64") // Loading ... ?>
                    </div>
                </td>
            </tr>
        </template>
        <template data-mlm-template="snapshots-loading-failed">
            <tr>
                <td class="mlm-vertical-baseline" colspan="3">
                    <div class="mlm-text-cell">
                        <i class="fas fa-exclamation-circle text-danger"></i> <?=RCView::tt("multilang_163") // Failed to load the snapshots table. Please try again after reloading this page. ?>
                    </div>
                </td>
            </tr>
        </template>
        <template data-mlm-template="no-snapshots-row">
            <tr>
                <td class="mlm-vertical-baseline" colspan="3">
                    <div class="mlm-text-cell">
                        <i data-mlm-display="message"></i> 
                    </div>
                </td>
            </tr>
        </template>
    </div>
</div>
<?php 
#endregion

} else {

#region Usage Tab
?>
<div data-mlm-tab="usage" class="d-none">
    <p><?=RCView::tt("multilang_636"); //= This page ... ?></p>
    <p data-mlm-visibility="hide-when-usage-loaded"><i class="fas fa-spinner fa-spin"></i> <?=RCView::tt("data_entry_64"); //= Loading ... ?></p>
    <div data-mlm-visibility="show-when-usage-loaded">
        <div class="mlm-usage-controls">
            <div class="mlm-option">
                <p class="mlm-description mlm-setting-option">
                    <label for="switch-show-all-projects">
                        <span class="switch switch-xs switch-inline">
                            <input type="checkbox" class="switch" data-mlm-switch="show-all-projects" id="switch-show-all-projects">
                            <label for="switch-show-all-projects"></label>
                        </span>
                        <span>
                            <?=RCView::tt("multilang_638") //= Show all projects ?>
                        </span>
                    </label>
                </p>
            </div>
            <div>
                <button data-mlm-action="refresh-usage" class="btn btn-success btn-xs"><i class="fas fa-redo-alt"></i> <?=RCView::tt("control_center_4471") //= Refresh ?></button>
                <button data-mlm-action="export-usage" class="btn btn-defaultrc btn-xs"><i class="fas fa-file-excel text-success"></i> <?=RCView::tt("global_71") //= Export ?></button>
            </div>
        </div>
        <div class="mlm-usage-stats">
            <table style="width:100%;" class="hover row-border"></table>
        </div>
    </div>
    <p data-mlm-visibility="show-when-usage-loaded">
        <b><?=RCView::tt("multilang_645")?></b>
        <br><i class="ms-2 fas fa-toggle-off"></i> <?=RCView::tt("multilang_642")?>
        <br><i class="ms-2 fas fa-user-check text-success"></i> <?=RCView::tt("multilang_644")?>
        <br><i class="ms-2 fas fa-user-lock text-danger"></i> <?=RCView::tt("multilang_643")?>
        <br><i class="ms-2 fas fa-bug"></i> <?=RCView::tt("multilang_641")?>
    </p>
</div>
<?php 
#endregion

#region System Settings Tab
?>
<div data-mlm-tab="settings" class="d-none">
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-highlightMissing">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="highlightMissing" id="switch-highlightMissing">
                    <label for="switch-highlightMissing"></label>
                </span>
                <?=RCView::tt("multilang_145") // Highlight translation fallbacks on non-project pages ?>
            </label>
        </p>
    </div>
    <hr>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-disabled" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="disabled" id="switch-disabled">
                    <label for="switch-disabled"></label>
                </span>
                <span>
                    <?=RCView::tt("multilang_12") // Disable (i.e. turn off) multi-language support for all projects ?>
                    <br>
                    <?=RCView::tt("multilang_13", "b", array("class" => "text-danger")) // WARNING: THIS WILL AFFECT ALL PROJECTS! ?>
                </span>
            </label>
        </p>
    </div>
    <hr>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-require-admin-activation" class="mlm-setting-option">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="require-admin-activation" id="switch-require-admin-activation">
                    <label for="switch-require-admin-activation"></label>
                </span>
                <span>
                    <?=RCView::tt("multilang_629") // Require <b>admin activation</b> of multi-language support in projects ?>
                    <br>
                    <?=RCView::tt("multilang_630", "span", array("class" => "text-danger")) // When enabled, admins must enable multi-language support in each project. This option will not affect any projects where multi-language support is already enabled (either because it had previously been enabled explicitly by an admin or there is at least one language already set up). ?>
                </span>
            </label>
        </p>
    </div>
    <hr>
    <div class="mlm-option">
        <p class="mlm-description">
            <label for="switch-debug">
                <span class="switch switch-xs switch-inline">
                    <input type="checkbox" class="switch" data-mlm-config="debug" id="switch-debug">
                    <label for="switch-debug"></label>
                </span>
                <?=RCView::tt("multilang_17") // Debug mode (status messages will be output to the browser console) ?>
            </label>
        </p>
    </div>
</div>
<?php 

#endregion

} ?>
</div><!-- mlm-tabs -->
</div><!-- mlm-setup-container -->
<?php 
#endregion

#region Modals (HTML)

#region Add/Edit/Import Language Modal
?>
<div class="modal" id="mlm-add-edit-language-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-add-edit-language-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <?php
            #region Header
            ?>
            <div class="modal-header" id="mlm-add-edit-language-modal-title">
                <h1 class="modal-add-title"><?=RCView::tt("multilang_19") // Add New Language ?></h1>
                <h1 class="modal-edit-title">
                    <?=RCView::tt("multilang_20") // Edit Language ?>
                    <span class="modal-language-key" id="modal-language-key">??</span>
                </h1>
            </div>
            <?php
            #endregion
            #region Add / Edit
            ?>
            <div class="modal-body modal-mlm-edit">
                <form id="mlm-add-edit-language-form" novalidate>
                    <div class="form-group">
                        <label for="mlm-add-edit-language-field-key" class="text-dangerrc"><?=RCView::tt("multilang_21") // Language ID ?></label>
                        <input data-mlm-config="key" type="text" pattern="[-a-zA-Z]+" class="form-control form-control-sm" id="mlm-add-edit-language-field-key" aria-describedby="mlm-add-edit-language-field-help-key" placeholder="<?=RCView::tt_attr("multilang_22") // Enter a unique ID for this language ?>" required>
                        <div class="invalid-feedback"><?=RCView::tt("multilang_23") // The language ID is invalid or, when adding a new language, may already exist. ?></div>
                        <div class="mlm-input-description" id="mlm-add-edit-language-field-help-key" class="form-text text-muted">
                            <?=RCView::tt("multilang_24") // A unique identifier for this language. It is recommended to use the ISO code, such as 'en' or 'en-US' for English, or 'es' for Spanish. Use only letters and hyphen. ?>
                            <a href="<?=RCView::tt_attr("multilang_624")?>" target="_blank"><u><?=RCView::tt("multilang_205")?></u></a>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="mlm-add-edit-language-field-display" class="text-dangerrc"><?=RCView::tt("multilang_206") // Display Name ?></label>
                        <input data-mlm-config="display" type="text" class="form-control form-control-sm" id="mlm-add-edit-language-field-display" aria-describedby="mlm-add-edit-language-field-help-display" placeholder="<?=RCView::tt_attr("multilang_26") // Enter a display name ?>" required>
                        <div class="invalid-feedback"><?=RCView::tt("multilang_27") // You must provide a value. ?></div>
                        <div class="mlm-input-description" id="mlm-add-edit-language-field-help-display" class="form-text text-muted"><?=RCView::tt("multilang_28") // This is the name of the language as shown in the language selectors. This should be entered in its language, such as 'English' or 'Deutsch' (for German). ?></div>
                    </div>
                    <div class="form-group">
                        <label for="mlm-add-edit-language-field-sort" class="font-weight-normal"><?=RCView::tt("multilang_29") // Sort Override ?></label>
                        <input data-mlm-config="sort" type="text" class="form-control form-control-sm" id="mlm-add-edit-language-field-sort" aria-describedby="mlm-add-edit-language-field-help-sort" placeholder="<?=RCView::tt_attr("multilang_30") // Provide a sort name (optional) ?>">
                        <div class="mlm-input-description" id="mlm-add-edit-language-field-help-sort" class="form-text text-muted"><?=RCView::tt("multilang_31") // If set, this will be used instead of the display name for determining the sort order of languages in language selectors. ?></div>
                    </div>
                </form>
            </div>
            <?php
            #endregion
            #region Import
            ?>
            <div class="modal-body modal-mlm-import">
                <div class="modal-import-title"><?=RCView::tt("multilang_101") // Import language data ... ?></div>
                <form class="mlm-import-language-form">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mlm-import-source" id="mlm-import-from-file" value="file" checked>
                        <label class="form-check-label font-weight-bold text-danger" for="mlm-import-from-file"><?=RCView::tt("multilang_33") // from a file (JSON, CSV, or INI) ?></label>
                    </div>
                    <div class="modal-from-file">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" name="mlm-import-file" id="mlm-import-file" accept=".json,.csv,.ini" />
                            <label class="custom-file-label" for="mlm-import-file">
                                <?=RCView::tt("multilang_34") // Choose or drop file&hellip; ?>
                                <div class="processing-file hide"><i class="fas fa-cog fa-spin"></i> <?=RCView::tt("multilang_142") // Processing file ... ?></div>
                            </label>
                            <div class="invalid-feedback"><?=RCView::tt("multilang_35") // This is not a valid language file. ?></div>
                        </div>
                    </div>
                    <?php if ($isProject): ?>
                    <div class="modal-import-include">
                        <p class="mt-1"><?=RCView::tt("multilang_133") // Include the following: ?></p>
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="import-include-ui" id="import-include-ui" checked>
                            <label class="form-check-label" for="import-include-ui">
                                <?=RCView::tt("multilang_134") // Translations of user interface items ?> 
                            </label>
                        </div>
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="import-include-psi" id="import-include-psi" checked>
                            <label class="form-check-label" for="import-include-psi">
                                <?=RCView::tt("multilang_187") // Translations of project-specific items (fields, survey settings, ASIs, alerts, ...) ?> 
                            </label>
                            <span class="ms-4 fs12"><?=RCView::tt("multilang_188") // *These include: fields, survey settings, ASIs, alerts, form and event names, missing data code labels, ... ?></span>
                        </div>
                    </div>
                    <div class="modal-mlm-import-or">&ndash; <?=RCView::tt("global_47") // or ?> &ndash;</div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mlm-import-source" id="mlm-import-from-system" value="system" <?=count($sys_langs) ? "" : "disabled"?>>
                        <label class="form-check-label font-weight-bold text-danger" for="mlm-import-from-system"><?=RCView::tt("multilang_36") // from available system languages ?></label>
                    </div>
                    <div class="modal-from-system">
                        <?php if (count($sys_langs)): ?>
                        <div class="modal-mlm-system-langs">
                            <select id="mlm-import-system" class="form-control form-control-sm">
                                <option value=""><?=RCView::ttfy("-- Select a language to import --") ?></option>
                                <?php foreach ($sys_langs as $sys_lang): ?>
                                <option value="<?=$sys_lang["key"]?>"><?=$sys_lang["display"]?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <?php else: ?>
                        <div class="modal-mlm-no-system-langs">
                            <i><?=RCView::tt("multilang_37") // There are no system languages available. ?></i>
                        </div>
                        <?php endif; ?>
                    </div>
                    <?php endif; ?>
                    <div class="modal-import-options">
                        <div><i><?=RCView::tt("multilang_38") // Import options: ?></i></div>
                        <div class="modal-import-options-radios">
                            <div class="label"><?=RCView::tt("multilang_39") // When merging, ?></div>
                            <div class="form-check ms-2">
                                <input class="form-check-input" type="radio" name="import-merge-mode" value="local" id="import-mode-merge-local" checked>
                                <label class="form-check-label" for="import-mode-merge-local">
                                    <?=RCView::tt("multilang_40") // keep local values ?> 
                                </label>
                            </div>
                            <div class="form-check ms-2">
                                <input class="form-check-input" type="radio" name="import-merge-mode" value="imported" id="import-mode-merge-imported">
                                <label class="form-check-label" for="import-mode-merge-imported">
                                    <?=RCView::tt("multilang_41") // use imported values ?> 
                                </label>
                            </div>
                            <div class="form-check form-inline ms-3">
                                <input class="form-check-input" type="checkbox" name="import-overwrite" id="import-overwrite">
                                <label class="form-overwritelabel" for="import-overwrite">
                                    <?=RCView::tt("multilang_42") // Import empty values(clears local values) ?> 
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <?php
            #endregion
            #region Footer
            ?>
            <div class="modal-footer">
                <div class="modal-footer-links"><button id="mlm-modal-import-link" type="button" class="btn btn-defaultrc btn-sm"><i class="fas fa-file-import"></i> <?=RCView::tt($isProject ? "multilang_232" : "multilang_233") // Import from file or system / Import from file ?></button></div>
                <button id="mlm-modal-cancel" type="button" class="btn btn-secondary btn-sm"><?=RCView::tt("global_53") // Cancel ?></button>
                <button id="mlm-modal-save" type="button" class="btn btn-primary btn-sm" data-mlm-add="<?=RCView::tt_attr("multilang_43") // Add Language ?>" data-mlm-edit="<?=RCView::tt_attr("multilang_44") // Apply Changes ?>"><i class="fas fa-plus"></i> <span class="mlm-modal-save-label"></span></button>
                <button id="mlm-modal-import-button" type="button" class="btn btn-primary btn-sm"><i class="fas fa-file-import"></i> <span class="mlm-modal-save-label"><?=RCView::tt_attr("global_72") // Import ?></span></button>
            </div>
            <?php
            #endregion ?>
        </div>
    </div>
</div>
<?php
#endregion

#region Import General Settings Modal
?>
<div class="modal" id="mlm-import-general-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-import-general-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header" id="mlm-import-general-title">
                <h1><?=RCView::tt("multilang_608") // Import General Settings ?></h1>
            </div>
            <div class="modal-body">
                <form class="mlm-import-general-settings-form">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" name="mlm-import-file" accept=".json" />
                        <label class="custom-file-label" for="mlm-import-file">
                            <?=RCView::tt("multilang_34") // Choose or drop file&hellip; ?>
                            <div class="processing-file hide"><i class="fas fa-cog fa-spin"></i> <?=RCView::tt("multilang_142") // Processing file ... ?></div>
                        </label>
                        <div class="invalid-feedback"><?=RCView::tt("multilang_615") // This is not a valid MLM settings file. It must be a .json file.?></div>
                    </div>
                    <div class="ms-1 mt-2 mb-2"><?=RCView::tt("multilang_133") // Include the following: ?></div>
                    <div class="form-check form-inline">
                        <input class="form-check-input" type="checkbox" name="gs-import-include-langs-tab" id="gs-import-include-langs-tab" checked>
                        <label class="form-check-label" for="gs-import-include-langs-tab">
                            <?=RCView::tt("multilang_616") // Languages tab settings ?> 
                        </label>
                    </div>
                    <div class="form-check form-inline">
                        <input class="form-check-input" type="checkbox" name="gs-import-include-forms-tab" id="gs-import-include-forms-tab" checked>
                        <label class="form-check-label" for="gs-import-include-forms-tab">
                            <?=RCView::tt("multilang_617") // Forms/Surveys tab settings ?> 
                        </label>
                    </div>
                    <div class="form-check form-inline">
                        <input class="form-check-input" type="checkbox" name="gs-import-include-alerts-tab" id="gs-import-include-alerts-tab" checked>
                        <label class="form-check-label" for="gs-import-include-alerts-tab">
                            <?=RCView::tt("multilang_618") // Alerts tab settings ?> 
                        </label>
                    </div>
                    <div class="form-check form-inline">
                        <input class="form-check-input" type="checkbox" name="gs-import-include-settings-tab" id="gs-import-include-settings-tab" checked>
                        <label class="form-check-label" for="gs-import-include-settings-tab">
                            <?=RCView::tt("multilang_619") // Settings tab settings ?> 
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" data-mlm-action="cancel" class="btn btn-secondary btn-sm"><?=RCView::tt("global_53") // Cancel ?></button>
                <button type="button" data-mlm-action="import" class="btn btn-primary btn-sm"><i class="fas fa-file-import"></i> <span class="mlm-modal-save-label"><?=RCView::tt_attr("global_72") // Import ?></span></button>
            </div>
        </div>
    </div>
</div>
<?php
#endregion

#region Delete Language Modal
?>
<div class="modal" id="mlm-delete-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-delete-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 id="mlm-delete-modal-title">
                    <?=RCView::tt("multilang_45") // Delete Language? ?>
                    <span class="modal-language-key">??</span>
                </h1>
            </div>
            <div class="modal-body">
                <?=$isProject 
                    ? RCView::tt("multilang_46") // When a language is deleted, all associated instrument/survey and user interface translations will be deleted from this project permanently. This cannot be undone. Are you sure you want to delete this language? 
                    : RCView::tt("multilang_47") // When a language is deleted, all associated user interface translations will be deleted permanently. This cannot be undone. Projects currently using this language are not affected. Are you sure you want to delete this language?
                ?>
            </div>
            <div class="modal-footer">
                <button action="cancel" type="button" class="btn btn-secondary btn-sm"><?=RCView::tt("global_53") // Cancel ?></button>
                <button action="delete" type="button" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i> &nbsp; <?=RCView::tt("multilang_48") // Delete Language ?></button>
            </div>
        </div>
    </div>
</div>
<?php
#endregion

#region Delete Snapshot Modal
?>
<div class="modal" id="mlm-delete-snapshot-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-delete-snapshot-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 id="mlm-delete-snapshot-modal-title">
                    <?=RCView::tt("multilang_171") // Delete Snapshot? ?>
                </h1>
            </div>
            <div class="modal-body">
                <?=RCView::tt("multilang_172") // Are you sure you want to delete this snapshot?<br><br><b>This action cannot be undone!</b> ?>
            </div>
            <div class="modal-footer">
                <button action="cancel" type="button" class="btn btn-secondary btn-sm"><?=RCView::tt("global_53") // Cancel ?></button>
                <button action="delete" type="button" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i> &nbsp; <?=RCView::tt("multilang_173") // Delete Snapshot ?></button>
            </div>
        </div>
    </div>
</div>
<?php
#endregion

#region Export Language Modal
?>
<div class="modal mlm-export-modal" id="mlm-export-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-export-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 id="mlm-export-modal-title">
                    <span class="mlm-hide-when-exporting-general">
                        <?=RCView::tt("multilang_97") // Export Language ?>
                        <span class="modal-language-key">??</span>
                    </span>
                    <span class="mlm-show-when-exporting-general">
                        <?=RCView::tt("multilang_607") // Export General Settings ?>
                    </span>
                </h1>
            </div>
            <div class="modal-body">
                <?php if ($isProject): ?>
                <div class="mlm-hide-when-exporting-changes mlm-hide-when-exporting-general">
                    <p>
                        <?=RCView::tt("multilang_98") // Set export options and download the translations of data entry and survey elements. The exported translations will reflect the current state, including potentially unsaved changes. ?>
                    </p>
                    <p class="mt-1"><?=RCView::tt("multilang_133") // Include the following: ?></p>
                    <div class="modal-export-options-checkboxes mlm-export-items form-group">
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="export-include-ui" id="export-include-ui" checked>
                            <label class="form-check-label" for="export-include-ui">
                                <?=RCView::tt("multilang_134") // Translations of user interface items ?> 
                            </label>
                        </div>
                        <!-- <div class="form-check form-inline mlm-single-form-export-item">
                            <input class="form-check-input" type="checkbox" name="export-include-forms" id="export-include-forms" checked>
                            <label class="form-check-label" for="export-include-forms">
                                <?=RCView::tt("multilang_182") // Translations of instruments names ?> 
                            </label>
                        </div> -->
                        <div class="form-check form-inline mlm-single-form-export-item">
                            <input class="form-check-input" type="checkbox" name="export-include-fields" id="export-include-fields" checked>
                            <label class="form-check-label" for="export-include-fields">
                                <?=RCView::tt("multilang_135") // Translations of field items ?> 
                            </label>
                        </div>
                        <div class="form-check form-inline mlm-single-form-export-item">
                            <input class="form-check-input" type="checkbox" name="export-include-surveysettings" id="export-include-surveysettings" checked>
                            <label class="form-check-label" for="export-include-surveysettings">
                                <?=RCView::tt("multilang_575") // Translations of survey settings ?> 
                            </label>
                        </div>
                        <div class="form-check form-inline mlm-single-form-export-item">
                            <input class="form-check-input" type="checkbox" name="export-include-asis" id="export-include-asis" checked>
                            <label class="form-check-label" for="export-include-asis">
                                <?=RCView::tt("multilang_180") // Translations of automated survey invitations ?> 
                            </label>
                        </div>
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="export-include-surveyqueue" id="export-include-surveyqueue" checked>
                            <label class="form-check-label" for="export-include-surveyqueue">
                                <?=RCView::tt("multilang_576") // Translations of survey queue items ?> 
                            </label>
                        </div>
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="export-include-alerts" id="export-include-alerts" checked>
                            <label class="form-check-label" for="export-include-alerts">
                                <?=RCView::tt("multilang_181") // Translations of alerts ?> 
                            </label>
                        </div>
                        <!-- <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="export-include-events" id="export-include-events" checked>
                            <label class="form-check-label" for="export-include-events">
                                <?=RCView::tt("multilang_183") // Translations of event names ?> 
                            </label>
                        </div> -->
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="export-include-mdc" id="export-include-mdc" checked>
                            <label class="form-check-label" for="export-include-mdc">
                                <?=RCView::tt("multilang_184") // Translations of missing data code labels ?> 
                            </label>
                        </div>
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="export-include-pdf" id="export-include-pdf" checked>
                            <label class="form-check-label" for="export-include-pdf">
                                <?=RCView::tt("multilang_214") // Translations of PDF customizations ?> 
                            </label>
                        </div>
                        <div class="form-check form-inline">
                            <input class="form-check-input" type="checkbox" name="export-include-protemail" id="export-include-protemail" checked>
                            <label class="form-check-label" for="export-include-protemail">
                                <?=RCView::tt("multilang_215") // Translations of Protected Email settings ?> 
                            </label>
                        </div>
                    </div>
                </div>
                <?php else: ?>
                <p>
                    <?=RCView::tt("multilang_130") // This will export the user interface translations for this language. Optionally, the translation prompts and the default values (from the currently active language file) can be included (e.g., when the file is not purely intended for transfer or backup purposes). ?>
                </p>
                <?php endif; ?>
                <p class="mt-1"><?=RCView::tt("multilang_131") // Export Options: ?></p>
                <div class="modal-export-options-checkboxes form-group">
                    <div class="form-check form-inline mlm-hide-when-exporting-general">
                        <input class="form-check-input mlm-disable-when-exporting-changes" type="checkbox" name="export-prompts" id="export-prompts">
                        <label class="form-check-label" for="export-prompts">
                            <?=RCView::tt("multilang_128") // Include translation prompts ?> 
                        </label>
                    </div>
                    <div class="form-check form-inline mlm-hide-when-exporting-general">
                        <input class="form-check-input mlm-disable-when-exporting-changes" type="checkbox" name="export-defaults" id="export-defaults">
                        <label class="form-check-label" for="export-defaults">
                            <?=RCView::tt("multilang_129") // Include default values ?> 
                        </label>
                    </div>
                    <div class="form-check form-inline">
                        <input class="form-check-input" type="radio" name="export-format" id="export-format-json" value="json" checked>
                        <label class="form-check-label" for="export-format-json">
                            JSON
                        </label>
                    </div>
                    <div class="form-check form-inline">
                        <input class="form-check-input mlm-disable-when-exporting-general" type="radio" name="export-format" id="export-format-csv-comma" value="csv">
                        <label class="form-check-label" for="export-format-csv-comma">
                            CSV
                        </label>
                        &nbsp;&mdash;&nbsp;&nbsp;
                        <div class="form-check-inline">
                            <input class="form-check-input mlm-disable-when-exporting-general" type="radio" name="export-csv-format" id="export-csv-format-comma" value="comma" checked>
                            <label class="form-check-label" for="export-csv-format-comma">
                                <?=RCView::tt("global_162") // Comma (,) ?>
                            </label>
                        </div>
                        <div class="form-check-inline">
                            <input class="form-check-input mlm-disable-when-exporting-general" type="radio" name="export-csv-format" id="export-csv-format-semicolon" value="semicolon">
                            <label class="form-check-label" for="export-csv-format-semicolon">
                                <?=RCView::tt("global_164") // Semicolon (;) ?>
                            </label>
                        </div>
                        <div class="form-check-inline">
                            <input class="form-check-input mlm-disable-when-exporting-general" type="radio" name="export-csv-format" id="export-csv-format-tab" value="tab">
                            <label class="form-check-label" for="export-csv-format-tab">
                                <?=RCView::tt("global_163") // Tab ?>
                            </label>
                        </div>
                    </div>
                </div>
                <p class="small mlm-hide-when-exporting-changes"><?=RCView::tt("multilang_132") // NOTE: The exported translations will reflect the current state, including potentially unsaved changes.?></p>
            </div>
            <div class="modal-footer">
                <button action="cancel" type="button" class="btn btn-secondary btn-sm"><?=RCView::tt("global_53") // Cancel ?></button>
                <button action="download" type="button" class="btn btn-success btn-sm"><i class="fas fa-file-download"></i> &nbsp; <?=RCView::tt("api_46") // Download ?></button>
            </div>
        </div>
    </div>
</div>
<?php
#endregion

#region Rich Text Editor Modal
?>
<div class="modal" id="mlm-rte-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-rte-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 id="mlm-rte-modal-title">RTE</h1>
            </div>
            <div class="modal-body">
                <textarea id="mlm-rte-editor"></textarea>
            </div>
            <div class="modal-footer">
                <!-- Links -->
                <div class="modal-footer-links"><a id="mlm-modal-rte-pasteref" href="javascript:;" class="" action="paste-ref"><i class="fas fa-paste"></i></i> <?=RCView::tt("multilang_106") // Paste reference ?></a></div>
                <!-- Buttons -->
                <button action="cancel" type="button" class="btn btn-secondary btn-sm"><?=RCView::tt("global_53") // Cancel ?></button>
                <button action="apply" type="button" class="btn btn-success btn-sm"><i class="fas fa-save"></i> &nbsp; <?=RCView::tt("report_builder_28") // Save Changes ?></button>
            </div>
        </div>
    </div>
</div>
<?php
#endregion

#region Single Item Translation Modal
?>
<div class="modal" id="mlm-sit-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-sit-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 id="mlm-sit-modal-title">Single Item Translation</h1>
            </div>
            <div class="modal-body mlm-sit-editor-container">
                <textarea id="mlm-sit-rte"></textarea>
                <input class="form-control form-control-sm" type="text">
            </div>
            <div class="modal-body mlm-sit-reference-container">
                <b>Reference:</b>
                <p class="mlm-sit-reference">Reference Value</p>
            </div>
            <div class="modal-footer">
                <!-- Links -->
                <div class="modal-footer-links"><a id="mlm-modal-sit-pasteref" href="javascript:;" class="" action="paste-ref"><i class="fas fa-paste"></i></i> <?=RCView::tt("multilang_106") // Paste reference ?></a></div>
                <!-- Buttons -->
                <button action="cancel" type="button" class="btn btn-secondary btn-sm"><?=RCView::tt("global_53") // Cancel ?></button>
                <button action="apply" type="button" class="btn btn-success btn-sm"><i class="fas fa-save"></i> &nbsp; <?=RCView::tt("report_builder_28") // Save Changes ?></button>
            </div>
        </div>
    </div>
</div>
<?php
#endregion

#region Data Changed Report Modal
?>
<div class="modal" id="mlm-dcr-modal" tabindex="-1" role="dialog" aria-labelledby="mlm-dcr-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header mlm-dcr-title">
                <h1 id="mlm-dcr-modal-title"><i class="fas fa-exclamation-triangle text-danger"></i> <?=RCView::tt("multilang_566")?></h1>
            </div>
            <div class="modal-body mlm-dcr-container">
                <p class="mlm-dcr-intro yellow"><?=RCView::tt("multilang_567")?></p>
                <table class="table table-md" style="width:100%">
                    <thead>
                        <tr>
                            <th><?=RCView::tt("multilang_568") // Item ?></th>
                            <th><?=RCView::tt("multilang_569") // Default text ?></th>
                            <th><?=RCView::tt("multilang_91") // Translation ?></th>
                            <th><?=RCView::tt("docs_45") // Action ?></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <!-- Links -->
                <div class="modal-footer-links">
                    <button data-mlm-action="accept-all-changed-items" type="button" class="btn btn-link btn-sm"><?=RCView::tt("multilang_571") // Accept all translations as valid ?></button>
                </div>
                <!-- Buttons -->
                <button data-bs-dismiss="modal" type="button" class="btn btn-secondary btn-sm"><?=RCView::tt("design_401") // Okay ?></button>
            </div>
        </div>
    </div>
    <template data-mlm-template="dcr-row-title">
        <tr class="mlm-lang-title" data-mlm-lang>
            <td colspan="3">
                <i data-mlm-display="lang" class="text-danger"></i>
            </td>
            <td>
                <a href="javascript:;" class="text-primary" data-mlm-action="export-changed-items">
                    <i class="fas fa-file-download text-secondary"></i>
                    <?=RCView::tt("global_71") // Export ?>
                </a>
            </td>
        </tr>
    </template>
    <template data-mlm-template="dcr-row-item">
        <tr class="mlm-changed-item" data-mlm-lang data-mlm-type data-mlm-name data-mlm-index>
            <td data-mlm-prompt></td>
            <td data-mlm-display="default"></td>
            <td data-mlm-display="translation"></td>
            <td data-mlm-actions>
                <a href="javascript:;" class="text-primary" data-mlm-action="accept-changed-item"><?=RCView::tt("multilang_570") // Accept ?></a>&nbsp;|&nbsp;<a href="javascript:;" class="text-primary" data-mlm-action="edit-changed-item"><?=RCView::tt("global_27") // Edit ?></a>
            </td>
        </tr>
    </template>
</div>

<?php
#endregion

#endregion

#region Toasts (HTML)
?>
<!-- Success toast -->
<div class="position-fixed bottom-0 right-0 p-3" style="z-index: 99999; right: 0; bottom: 0;">
    <div id="mlm-successToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" data-animation="true" data-autohide="true">
        <div class="toast-header">
            <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#28a745"></rect></svg>
            <strong class="mr-auto"><?=RCView::tt("multilang_100") // Success ?></strong>
            <button type="button" class="ms-2 mb-1 close" data-bs-dismiss="toast" aria-label="<?=RCView::tt_attr("calendar_popup_01") // Close ?>">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body" data-content="toast"></div>
    </div>
</div>
<!-- Error toast -->
<div class="position-fixed bottom-0 right-0 p-3" style="z-index: 99999; right: 0; bottom: 0;">
    <div id="mlm-errorToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" data-animation="true" data-autohide="false">
        <div class="toast-header">
            <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#dc3545"></rect></svg>
            <strong class="mr-auto"><?=RCView::tt("global_01") // ERROR ?></strong>
            <button type="button" class="ms-2 mb-1 close" data-bs-dismiss="toast" aria-label="<?=RCView::tt_attr("calendar_popup_01") // Close ?>">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body" data-content="toast"></div>
    </div>
</div>
<?php
#endregion

} // if (!$concurrent_user)