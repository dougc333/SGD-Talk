<?php

namespace Vanderbilt\REDCap\ControlCenter;

use RCView;
use System;
use Logging;
use Renderer;
use Vanderbilt\REDCap\Classes\BreakTheGlass\BreakTheGlassTypes;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLaunchContexts;

// If auto-finding FHIR token/authorize URLs
if (isset($_POST['url'])) 
{
	// Config for non-project pages
	require_once dirname(dirname(__FILE__)) . "/Config/init_global.php";
	// Call the URL
	$headers = array("Accept: application/json");
	$response = http_get($_POST['url'], 10, "", $headers);
	$metadata = json_decode($response, true);
	if (!is_array($metadata)) exit('0');
	// Get authorize endpoint URL and token endpoint URL
	$authorizeUrl = $tokenUrl = "";
	foreach ($metadata['rest'][0]['security']['extension'][0]['extension'] as $attr) {
		if ($attr['url'] == 'authorize') {
			$authorizeUrl = $attr['valueUri'];
		} elseif ($attr['url'] == 'token') {
			$tokenUrl = $attr['valueUri'];
		}
	}
	if ($authorizeUrl == "" || $tokenUrl == "") exit('0');
	// Return URLs
	exit("$authorizeUrl\n$tokenUrl");
}

include 'header.php';
if (!ACCESS_CONTROL_CENTER) redirect(APP_PATH_WEBROOT);
if (!ACCESS_SYSTEM_CONFIG) print "<script type='text/javascript'>$(function(){ disableAllFormElements(); });</script>";

$saveMessages = [];

// If project default values were changed, update redcap_config table with new values
if ($_SERVER['REQUEST_METHOD'] == 'POST' && ACCESS_SYSTEM_CONFIG)
{
	// store current settings for comparison
	$currentSettings = System::getConfigVals();
	/**
	 * run after that settings are updated
	 */
	$checkClientIdChanged = function($currentSettings, $newSettings) {
		$currentClientId = @$currentSettings['fhir_client_id'];
		$newClientId = @$newSettings['fhir_client_id'];
		if($currentClientId==$newClientId) return false;
		$query_string = 'DELETE FROM `redcap_ehr_access_tokens`';
		$result = db_query($query_string);
		if($result) Logging::logEvent($query_string,"redcap_ehr_access_tokens","MANAGE","",'',"Existing access tokens have been removed becuase the client ID is changed.");
		return $result;
	};


	$changes_log = array();
	$sql_all = array();
	foreach ($_POST as $this_field=>$this_value) {
		// Save this individual field value
		$sql = "UPDATE redcap_config SET value = '".db_escape($this_value)."' WHERE field_name = '$this_field'";
		$q = db_query($sql);

		// Log changes (if change was made)
		if ($q && db_affected_rows() > 0) {
			$sql_all[] = $sql;
			$changes_log[] = "$this_field = '$this_value'";
		}
	}

	$saveMessages[] = $lang['control_center_19'];

	// Log any changes in log_event table
	if (count($changes_log) > 0) {
		Logging::logEvent(implode(";\n",$sql_all),"redcap_config","MANAGE","",implode(",\n",$changes_log),"Modify system configuration");
		// check if the client ID has been changed
		$accessTokensDeleted =$checkClientIdChanged($currentSettings, $_POST);
		if($accessTokensDeleted) $saveMessages[] = 'Please note that existing access tokens were removed because the FHIR client ID has been updated.';
	}

}

// Retrieve data to pre-fill in form
$element_data = System::getConfigVals();


/**
 * CREATE A BLADE TEMPLATING MANAGER
 * @return BladeOne
 */
$makeBladeSettingsInstance = function($lang, $configVals) {
	$blade = Renderer::getBlade();
	$blade->share('lang', $lang); // set the lang variable available for all views
	$blade->share('form_data', $configVals); // the the options available for all views
	return $blade;
};
$blade = $makeBladeSettingsInstance($lang, $element_data);

// Set values if they are invalid
if (!is_numeric($element_data['fhir_stop_fetch_inactivity_days']) || $element_data['fhir_stop_fetch_inactivity_days'] < 1) {
	$element_data['fhir_stop_fetch_inactivity_days'] = 7;
}
if (!is_numeric($element_data['fhir_data_fetch_interval']) || $element_data['fhir_data_fetch_interval'] < 1) {
	$element_data['fhir_data_fetch_interval'] = 24;
}

?>


<div style="font-size:18px;">
	<h4 class="float-start fs18" style="margin-top:10px;"><i class="fas fa-fire"></i> <?php echo $lang['ws_262'] ?></h4>
	<div class="float-end" style="margin-right:30px;">
		<?php echo RCView::img(array('src'=>'ehr_fhir.png')) ?>
	</div>
</div>
<div class="clear"></div>

<?php
if (!empty($saveMessages)) :
	$messagesList = "\n<p>".implode("</p>\n<p>", $saveMessages)."<p>\n";
	// Show user message that values were changed
?>
	<div class="mt-2 alert alert-success alert-dismissible fade show" role="alert">
		<span type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></span>
		<p>
			<i class="fas fa-exclamation-circle"></i>
			<strong>Success!</strong>
		</p>
		<?php foreach ($saveMessages as $message) : ?>
			<p><?php print $message; ?></p>
		<?php endforeach; ?>
	</div>
<?php endif; ?>

<!-- display Epic upgrade alert -->
<?= $blade->run('control-center.cdis.epic-update-info') ?>
<?= $redcapAppVersion??"" ?>


<p> <?= $lang['ws_207'] . " " . $lang['ws_297'] ?> </p>
<p><?= $lang['ws_317'] ?></p>
<div class="card mb-4">
	<div class="card-body">
		<h6 class="card-title"><?= $lang['ws_335'] ?></h6>
		<div style="text-decoration:underline;" class="d-flex flex-column gap-2">
			<a href="<?= APP_PATH_WEBROOT."Resources/misc/redcap_fhir_overview.pdf" ?>" target="_blank" >
				<i class="fas fa-file-pdf fa-fw"></i><span class="ms-2"><?= $lang['ws_296'] ?></span>
			</a>
			<a href="<?= APP_PATH_WEBROOT."DynamicDataPull/info.php?type=fhir" ?>" target="_blank" >
				<i class="fas fa-info-circle fa-fw"></i><span class="ms-2"><?= $lang['ws_266'] ?></span>
			</a>
			<a href="<?= APP_PATH_WEBROOT."Resources/misc/redcap_fhir_setup.zip" ?>" target="_blank" download>
				<i class="fas fa-file-archive fa-fw"></i><span class="ms-2"><?= $lang['ws_236'] ?></span>
			</a>
			<a href="https://redcap.link/mappingrequest" target="_blank">
				<i class="fas fa-tasks fa-fw"></i><span class="ms-2"><?= $lang['ws_336'] ?></span>
			</a>
			<a href="<?= APP_PATH_WEBROOT?>ControlCenter/cdis_custom_mappings.php">
				<i class="fas fa-project-diagram fa-fw"></i><span class="ms-2"><?= $lang['ws_337'] ?></span>
			</a>
			<a href="<?= APP_PATH_WEBROOT."Resources/misc/redcap_fhir_metadata_DSTU2.csv" ?>" target="_blank" download>
				<i class="fas fa-file-csv fa-fw"></i><span class="ms-2"><?= $lang['ws_334'] ?> (DSTU2)</span>
			</a>
			<a href="<?= APP_PATH_WEBROOT."Resources/misc/redcap_fhir_metadata_R4.csv" ?>" target="_blank" download>
				<i class="fas fa-file-csv fa-fw"></i><span class="ms-2"><?= $lang['ws_334'] ?> (R4)</span>
			</a>
		</div>
	</div>
</div>

<style type="text/css">
    #cdis-diff {display:none;}
    #cdis-diff table {background-color: #fff;}
    #cdis-diff td {padding:7px 10px;}
    #cdis-diff ul {margin:0px;margin-block-start:0em;margin-block-end:0em;padding-inline-start:10px;}
</style>

<form action='ddp_fhir_settings.php' enctype='multipart/form-data' target='_self' method='post' name='form' id='form'>
<?php
// Go ahead and manually add the CSRF token even though jQuery will automatically add it after DOM loads.
// (This is done in case the page is very long and user submits form before the DOM has finished loading.)
print "<input type='hidden' name='redcap_csrf_token' value='".System::getCsrfToken()."'>";
?>
<table style="border: 1px solid #ccc; background-color: #f0f0f0; width: 100%;">


<tr>
    <td class="cc_label" style="border-top:1px solid #ccc;color:#C00000;" colspan="2">
        <?php echo $lang['ws_267'] ?>
    </td>
</tr>
<tr>
	<td class="cc_label">
        <i class="fas fa-database"></i>
		<?php echo $lang['ws_265'] ?>
        <div class="cc_info">
            <?php echo $lang['ws_288'] ?>
        </div>
	</td>
	<td class="cc_data">
		<select class="x-form-text x-form-field" style="" name="fhir_ddp_enabled">
			<option value='0' <?php echo ($element_data['fhir_ddp_enabled'] == 0) ? "selected" : "" ?>><?php echo $lang['global_23'] ?></option>
			<option value='1' <?php echo ($element_data['fhir_ddp_enabled'] == 1) ? "selected" : "" ?>><?php echo $lang['system_config_27'] ?></option>
		</select>
		<div class="cc_info">
			<?php echo $lang['ws_216'] ?>
		</div>
	</td>
</tr>

<tr>
    <td class="cc_label" style="padding-bottom:20px;">
        <i class="fas fa-shopping-cart"></i>
        <?php echo $lang['global_155'] ?>
        <div class="cc_info">
            <?php echo $lang['ws_295'] ?>
        </div>
    </td>
    <td class="cc_data" style="padding-bottom:20px;">
        <select class="x-form-text x-form-field" style="" name="fhir_data_mart_create_project">
            <option value='0' <?php echo ($element_data['fhir_data_mart_create_project'] == 0) ? "selected" : "" ?>><?php echo $lang['global_23'] ?></option>
            <option value='1' <?php echo ($element_data['fhir_data_mart_create_project'] == 1) ? "selected" : "" ?>><?php echo $lang['system_config_27'] ?></option>
        </select>
        <div class="cc_info" style="color:#C00000;">
            <?php echo $lang['ws_243'] ?>
        </div>
    </td>
</tr>
<tr>
    <td class="cc_data" style="padding-top:2px;" colspan="2">
        <div class="boldish" style="color:#C00000;">
            <i class="fas fa-lightbulb"></i> <?php echo $lang['ws_294'] ?>
            <button type="button" class="btn btn-xs btn-rcred ms-2" onclick="simpleDialog(null,null,'cdis-diff',1000);fitDialog($('#cdis-diff'));return false;"><?php echo $lang['global_84'] ?></button>
        </div>
        <!-- CDP vs Data Mart dialog -->
        <div id="cdis-diff" class="mt-2 simpleDialog" title="<?=js_escape2($lang['ws_294'])?>">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                        </th>
                        <th scope="col" class="boldish clearfix">
                            <div class="float-start fs15 mt-1" style="color:#000066;">
                                <i class="fas fa-database"></i>
                                <?php echo $lang['ws_265'] ?>
                            </div>
                            <div class="float-end">
                                <button class="btn btn-xs invisible"><?=$lang['scheduling_35']?></button>
                            </div>
                        </th>
                        <th scope="col" class="boldish clearfix">
                            <div class="float-start fs15 mt-1" style="color:#A00000;">
                                <i class="fas fa-shopping-cart"></i>
                                <?php echo $lang['global_155'] ?>
                            </div>
                            <div class="float-end">
                                <button class="btn btn-xs btn-defaultrc" onclick="$('#cdis-diff button').hide();$('#cdis-diff td, #cdis-diff th').css({'padding-bottom':'10px','vertical-align':'top','font-family':'arial'});printDiv('cdis-diff');return false;"><?=$lang['scheduling_35']?></button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th class="boldish" scope="row">
                            <?php echo $lang['cdis_diff_category_1'] ?>
                        </th>
                        <td>
                            <ul>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_1'] ?></li>
								<li class="diff_ddp"><?= $lang['cdis_diff_ddp_2'] ?></li>
								<li class="diff_ddp"><?= $lang['cdis_diff_ddp_3'] ?></li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li class="diff_ddm"><?= $lang['cdis_diff_ddm_1'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_2'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_3'] ?></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th class="boldish" scope="row">
                            <?php echo $lang['cdis_diff_category_2'] ?>
                        </th>
                        <td>
                            <ul>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_4'] ?></li>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_5'] ?></li>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_6'] ?></li>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_7'] ?></li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li class="diff_ddm"><?= $lang['cdis_diff_ddm_4'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_5'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_6'] ?></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th class="boldish" scope="row">
                            <?php echo $lang['cdis_diff_category_3'] ?>
                        </th>
                        <td>
                            <ul>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_8'] ?></li>
								<li class="diff_ddp"><?= $lang['cdis_diff_ddp_9'] ?></li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li class="diff_ddm"><?= $lang['cdis_diff_ddm_7'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_8'] ?></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th class="boldish" scope="row">
                            <?php echo $lang['cdis_diff_category_4'] ?>
                        </th>
                        <td>
                            <ul>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_10'] ?></li>
								<li class="diff_ddp"><?= $lang['cdis_diff_ddp_11'] ?></li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li class="diff_ddm"><?= $lang['cdis_diff_ddm_9'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_10'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_11'] ?></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th class="boldish" scope="row">
                            <?php echo $lang['cdis_diff_category_5'] ?>
                        </th>
                        <td>
                            <ul>
                                <li class="diff_ddp"><?= $lang['cdis_diff_ddp_12'] ?></li>
								<li class="diff_ddp"><?= $lang['cdis_diff_ddp_13'] ?></li>
								<li class="diff_ddp"><?= $lang['cdis_diff_ddp_14'] ?></li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li class="diff_ddm"><?= $lang['cdis_diff_ddm_12'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_13'] ?></li>
								<li class="diff_ddm"><?= $lang['cdis_diff_ddm_14'] ?></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </td>
</tr>


<tr>
    <td class="cc_label" style="border-top:1px solid #ccc;color:#C00000;padding-top:2px;" colspan="2"></td>
</tr>
<tr>
	<td class="cc_label">
		<?php echo $lang['ws_214'] ?>
		<div class="cc_info" style="margin-bottom:20px;">
			<?php echo $lang['ws_235'] ?>
		</div>
	</td>
	<td class="cc_data">
		<input class='x-form-text x-form-field' style='width:150px;' type='text' name='fhir_source_system_custom_name' value='<?php echo htmlspecialchars($element_data['fhir_source_system_custom_name'], ENT_QUOTES) ?>' /><br/>
		<div class="cc_info">
			<?=js_escape($lang['control_center_4881'])?>
		</div>
	</td>
</tr>

<!-- redirect URL -->

<tr>
	<td class="cc_label" style="font-weight:normal;border-top:1px solid #ccc;" colspan="2">
		<div style="margin-bottom:10px;font-weight:bold;color:#C00000;"><?php echo $lang['ws_237'] ?></div>
		<div style="margin-bottom:10px;"><?php echo $lang['ws_238'] ?></div>
		<b><?php echo $lang['ws_239'] ?></b>
		<input id="redirectURL" value="<?php echo APP_PATH_WEBROOT_FULL ?>ehr.php" onclick="this.select();" readonly="readonly" class="staticInput" style="width:80%;max-width:400px;margin-bottom:5px;margin-right:5px;">
		<button class="btn btn-defaultrc btn-xs btn-clipboard" title="Copy to clipboard" onclick="return false;" data-clipboard-target="#redirectURL" style="padding:3px 8px 3px 6px;"><i class="fas fa-paste"></i></button>
	</td>
</tr>

<!-- CDP instant adjudication -->
<tr>
    <td class="cc_label" style="border-top:1px solid #ccc;color:#C00000;padding-top:10px;" colspan="2">
        <?php echo $lang['cc_cdp_auto_adjudication_title'] ?>
    </td>
</tr>
<tr>
    <td class="cc_data" style="padding-top:5px;padding-bottom:5px;" colspan="2">
        <?php echo $lang['cc_cdp_auto_adjudication_description'] ?>
    </td>
</tr>
<tr>
	<td class="cc_label" style="">
		<?php echo $lang['cc_cdp_auto_adjudication_label'] ?>
    </td>
    <td class="cc_data">
		<select class="x-form-text x-form-field" name="fhir_cdp_allow_auto_adjudication">
            <option value='0' <?php echo ($element_data['fhir_cdp_allow_auto_adjudication'] == 0) ? "selected" : "" ?>><?php echo $lang['global_23'] ?></option>
            <option value='1' <?php echo ($element_data['fhir_cdp_allow_auto_adjudication'] == 1) ? "selected" : "" ?>><?php echo $lang['system_config_27'] ?></option>
        </select>
	</td>
</tr>

<tr>
	<td class="cc_label" style="border-top:1px solid #ccc;color:#C00000;" colspan="2">
		<?php echo $lang['ws_234'] ?>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_219'] ?>
		<div class="cc_info">
			<?php echo $lang['ws_220'] ?>
		</div>
	</td>
	<td class="cc_data">
		<table style="width:100%;">
			<tr>
				<td style='color:#800000;padding-bottom:5px;font-weight:bold;' class='nowrap'><?php print $lang['ws_221'] ?></td>
				<td style='padding-bottom:5px;'>
					<input class='x-form-text x-form-field' style='width:320px;' autocomplete='new-password' type='text' name='fhir_client_id' value='<?php echo htmlspecialchars($element_data['fhir_client_id'], ENT_QUOTES) ?>' />
				</td>
			</tr>
			<tr>
				<td style='color:#800000;font-weight:bold;' class='nowrap'><?php print $lang['ws_222'] ?> &nbsp;</td>
				<td>
					<input class='x-form-text x-form-field' style='width:220px;' autocomplete='new-password' type='password' name='fhir_client_secret' value='<?php echo htmlspecialchars($element_data['fhir_client_secret'], ENT_QUOTES) ?>' />
					<a href="javascript:;" class="cclink password-mask-reveal" style="text-decoration:underline;font-size:7pt;margin-left:5px;" onclick="$(this).remove();showPasswordField('fhir_client_secret');"><?php print $lang['ws_223'] ?></a>
				</td>
			</tr>
		</table>
		<div class="cc_info" style="margin-top:15px;">
			<?php echo $lang['ws_232'] ?>
		</div>
	</td>
</tr>

<tr>
	<td class="cc_label" colspan="2" style="padding:20px 10px;">
		<?php echo $lang['ws_224'] ?>
		<div class="cc_info">
			<?php echo $lang['ws_225']."<br>".$lang['ws_260'] ?>
		</div>
		
		<table style="max-width: 92%;margin-left: 35px;">
			<tr>
				<td style='color:#800000;padding-bottom:10px;padding-top:5px;' class='nowrap'><?php print $lang['ws_228'] ?></td>
				<td style='padding-bottom:10px;padding-top:5px;'>
					<input class='x-form-text x-form-field ' style='width:450px;' type='text' id='fhir_endpoint_base_url' name='fhir_endpoint_base_url' value='<?php echo htmlspecialchars($element_data['fhir_endpoint_base_url'], ENT_QUOTES) ?>' onblur="validateUrl(this);">
				</td>
			</tr>
			<tr>
				<td colspan='2'>
					<div class="cc_info">
						<?php echo $lang['ws_229'] ?> &nbsp;
						<button class="jqbuttonmed" style="color:#0101bb;font-size: 11px;top: 3px;" onclick="autoFindFhirUrls();return false;"><?php echo $lang['ws_231'] ?></button>
					</div>
				</td>
			</tr>
			<tr>
				<td style='color:#800000;padding-bottom:5px;padding-top:10px;' class='nowrap'><?php print $lang['ws_226'] ?></td>
				<td style='padding-bottom:5px;padding-top:10px;'>
					<input class='x-form-text x-form-field ' style='width:450px;' type='text' id='fhir_endpoint_token_url' name='fhir_endpoint_token_url' value='<?php echo htmlspecialchars($element_data['fhir_endpoint_token_url'], ENT_QUOTES) ?>' onblur="validateUrl(this);">
				</td>
			</tr>
			<tr>
				<td style='color:#800000;padding-bottom:5px;' class='nowrap'><?php print $lang['ws_227'] ?></td>
				<td style='padding-bottom:5px;'>
					<input class='x-form-text x-form-field ' style='width:450px;' type='text' id='fhir_endpoint_authorize_url' name='fhir_endpoint_authorize_url' value='<?php echo htmlspecialchars($element_data['fhir_endpoint_authorize_url'], ENT_QUOTES) ?>' onblur="validateUrl(this);">
				</td>
			</tr>
		</table>
</tr>
<tr>
	<td class='cc_label'>
		<?php print "Identity provider (optional)" ?>
		<div class="cc_info">
			<?php echo $lang['fhir_identity_provider_title'] ?>
		</div>
	</td>
	<td class="cc_data">
		<input class='x-form-text x-form-field ' style='width:350px;' type='text' id='fhir_identity_provider' name='fhir_identity_provider' value='<?php echo htmlspecialchars($element_data['fhir_identity_provider'], ENT_QUOTES) ?>' onblur="validateUrl(this);">
		<div class="cc_info">
			<span><?php echo $lang['fhir_identity_provider_description'] ?></span>
			<span class="d-block"><?php echo $lang['fhir_identity_provider_description2'] ?></span>
		</div>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_217'] ?>
		<div class="cc_info">
			<?php echo $lang['ws_218'] ?>
		</div>
	</td>
	<td class="cc_data">
		<input class='x-form-text x-form-field' style='width:350px;' type='text' name='fhir_ehr_mrn_identifier' value='<?php echo htmlspecialchars($element_data['fhir_ehr_mrn_identifier'], ENT_QUOTES) ?>' /><br/>
		<div class="cc_info">
		<?=js_escape($lang['control_center_4882'])?>
			<?php print $blade->run('control-center.cdis.string-identifier-helper') ?>
		</div>
        <div class="cc_info" style="color:#0101bb;margin-top:15px;">
		<?=js_escape($lang['control_center_4883'])?>
        </div>
	</td>
</tr>

<!-- custom authentication parameters -->
<tr>
	<td class="cc_label" style="font-weight:normal;border-top:1px solid #ccc;" colspan="2" >
		<div style="margin-bottom:10px;font-weight:bold;color:#C00000;"><?= $lang['cdis_custom_auth_params_01'] ?></div>
		<div style="margin-bottom:10px;"><?= $lang['cdis_custom_auth_params_02'] ?></div>
	</td>
</tr>


<tr>
	<td class="cc_label" colspan="2">
        <span><?= $lang['cdis_custom_auth_params_03'] ?></span>
		<div class="cc_info">
			<span><?= $lang['cdis_custom_auth_params_04'] ?></span>
		</div>
		<div class="mt-2">
			<button data-add-auth-param type="button" class="btn btn-primary btn-sm">
				<i class="fas fa-plus-circle fa-fw"></i>
				<span><?= $lang['cdis_custom_auth_params_05'] ?></span>
			</button>

			<template id="custom-auth-params-template">
				<div class="d-flex gap-2 my-2" data-auth-params>
					<input type="text" class="form-control form-control-sm" placeholder="<?= $lang['cdis_custom_auth_params_06'] ?>..." data-auth-key>
					<input type="text" class="form-control form-control-sm" placeholder="<?= $lang['cdis_custom_auth_params_07'] ?>..." data-auth-value>

					<select class="form-select form-select-sm" data-auth-context>
						<option value=""><?= $lang['cdis_custom_auth_params_09'] ?></option>
						<option value="<?= FhirLaunchContexts::EHR_LAUNCH ?>"><?= $lang['cdis_custom_auth_params_10'] ?></option>
						<option value="<?= FhirLaunchContexts::STANDALONE_LAUNCH ?>"><?= $lang['cdis_custom_auth_params_11'] ?></option>
					</select>

					<button data-delete-auth-param type="button" class="btn btn-danger btn-sm">
						<i class="fas fa-trash fa-fw"></i>
					</button>
				</div>
			</template>
			
			<div id="custom-auth-params"></div>
		</div>
	</td>
</tr>
<!-- custom authentication parameters -->

<?php
	function isSelected($current, $option) { return ($current==$option) ? 'selected' : ''; }
	$BTG_userTypes = BreakTheGlassTypes::userTypes();
?>

<!-- BREAK THE GLASS -->
<tr>
	<td class="cc_label" style="font-weight:normal;border-top:1px solid #ccc;" colspan="2" >
		<div style="margin-bottom:10px;font-weight:bold;color:#C00000;"><?= $lang['break_glass_003'] ?></div>
		<div style="margin-bottom:10px;"><?= $lang['break_glass_004'] ?></div>
	</td>
</tr>

<!--  is enabled -->
<tr>
	<td class="cc_label">
        <?=$lang['break_the_glass_settings_01'] ?>
	</td>
	<td class="cc_data">
		<select class="x-form-text x-form-field" style="max-width:380px;" name="fhir_break_the_glass_enabled">
            <option value="" <?= isSelected($element_data['fhir_break_the_glass_enabled'], '')  ?>><?= $lang['break_the_glass_disabled']  ?></option>
            <option value="enabled" <?= isSelected($element_data['fhir_break_the_glass_enabled'], 'enabled')  ?>><?=$lang['break_the_glass_enabled'] ?></option>
		</select>
        <div class="cc_info">
			<span><?=$lang['break_glass_description'] ?></span><br/>
		</div>
	</td>
</tr>

<!-- EHR user type -->
<tr>
	<td class="cc_label">
		<?= $lang['break_glass_007']  ?>
		<div class="cc_info"><?= $lang['break_glass_ehr'] ?></div>
	</td>
	<td class="cc_data">
		<select class="x-form-text x-form-field" name="fhir_break_the_glass_ehr_usertype">

			<?php foreach ($BTG_userTypes as $ehr_user_type) : ?>
			<option value="<?=$ehr_user_type ?>" <?= isSelected($element_data['fhir_break_the_glass_ehr_usertype'], $ehr_user_type)  ?>><?=$ehr_user_type ?></option>
			<?php endforeach; ?>
		</select>
		<div class="cc_info">
			<span><?= $lang['break_glass_usertype_ehr'] ?></span><br/>
		</div>
	</td>
</tr>
<!-- BREAK THE GLASS -->


<tr>
	<td class="cc_label" style="border-top:1px solid #ccc;color:#C00000;" colspan="2">
		<?php echo $lang['ws_233'] ?>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_74'] ?>
		<div class="cc_info">
			<?php echo $lang['ws_274'] . " " . $lang['ws_230'] ?>
		</div>
	</td>
	<td class="cc_data">
		<input class='x-form-text x-form-field ' style='width:300px;' type='text' id='fhir_url_user_access' name='fhir_url_user_access' value='<?php echo htmlspecialchars($element_data['fhir_url_user_access'], ENT_QUOTES) ?>' onblur="validateUrl(this);">
		<button class="jqbuttonmed" onclick="setupTestUrl( $('#fhir_url_user_access') );return false;"><?php echo $lang['edit_project_138'] ?></button><br>
		<div class="cc_info">
			<?php echo $lang['ws_94'] ?>
		</div>
		<div class="cc_info" style="color:#800000;">
			<?php echo $lang['ws_97'] ?>
		</div>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_69'] ?>
		<div class="cc_info">
			<?php echo $lang['ws_269'] ?>
		</div>
	</td>
	<td class="cc_data">
		<textarea style='height:60px;' class='x-form-field notesbox' name='fhir_custom_text' id='fhir_custom_text'><?php echo $element_data['fhir_custom_text'] ?></textarea>
		<div id='fhir_custom_text-expand' style='text-align:right;'>
			<a href='javascript:;' style='font-weight:normal;text-decoration:none;color:#999;font-family:tahoma;font-size:10px;'
				onclick="growTextarea('fhir_custom_text')"><?php echo $lang['form_renderer_19'] ?></a>&nbsp;
		</div>
		<div class="cc_info">
			<?php echo $lang['system_config_195'] ?>
		</div>
		<div class="cc_info">
			<?php echo $lang['ws_71'] . RCView::br() . RCView::span(array('style'=>'color:#C00000;'), "\"{$lang['ws_268']}\"") ?>
		</div>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_270'] ?>
	</td>
	<td class="cc_data">
		<select class="x-form-text x-form-field" style="" name="fhir_display_info_project_setup">
			<option value='0' <?php echo ($element_data['fhir_display_info_project_setup'] == 0) ? "selected" : "" ?>><?php echo $lang['ws_272'] ?></option>
			<option value='1' <?php echo ($element_data['fhir_display_info_project_setup'] == 1) ? "selected" : "" ?>><?php echo $lang['ws_271'] ?></option>
		</select>
		<div class="cc_info">
			<?php echo $lang['ws_273'] ?>
		</div>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_275'] ?>
		<div class="cc_info" style="color:#C00000;">
			<?php echo $lang['ws_99'] ?>
		</div>
	</td>
	<td class="cc_data">
		<select class="x-form-text x-form-field" style="" name="fhir_user_rights_super_users_only">
			<option value='0' <?php echo ($element_data['fhir_user_rights_super_users_only'] == 0) ? "selected" : "" ?>><?php echo $lang['ws_276'] ?></option>
			<option value='1' <?php echo ($element_data['fhir_user_rights_super_users_only'] == 1) ? "selected" : "" ?>><?php echo $lang['ws_277'] ?></option>
		</select>
		<div class="cc_info">
			<?php echo $lang['ws_278'] ?>
		</div>
	</td>
</tr>


<tr>
	<td class="cc_label">
		<?php echo $lang['ws_84'] ?>
	</td>
	<td class="cc_data">
		<span class="cc_info" style="font-weight:bold;color:#000;">
			<?php echo $lang['ws_91'] ?>
		</span>
		<input class='x-form-text x-form-field' type='text' style='width:35px;' maxlength='3' onblur="redcap_validate(this,'1','999','hard','int');"  name='fhir_data_fetch_interval' value='<?php echo htmlspecialchars($element_data['fhir_data_fetch_interval'], ENT_QUOTES) ?>' />
		<span class="cc_info" style="font-weight:bold;color:#000;">
			<?php echo $lang['control_center_406'] ?>
		</span>
		<span class="cc_info" style="margin-left:20px;">
			<?php echo $lang['ws_88'] ?>
		</span>
		<div class="cc_info">
			<?php echo $lang['ws_279'] ?>
		</div>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_85'] ?>
		<div class="cc_info">
			<?php echo $lang['ws_87'] ?>
		</div>
	</td>
	<td class="cc_data">
		<input class='x-form-text x-form-field' type='text' style='width:35px;' maxlength='3' onblur="redcap_validate(this,'1','100','hard','int');" name='fhir_stop_fetch_inactivity_days' value='<?php echo htmlspecialchars($element_data['fhir_stop_fetch_inactivity_days'], ENT_QUOTES) ?>' />
		<span class="cc_info" style="font-weight:bold;color:#000;">
			<?php echo $lang['scheduling_25'] ?>
		</span>
		<span class="cc_info" style="margin-left:20px;">
			<?php echo $lang['ws_89'] ?>
		</span>
		<div class="cc_info">
			<?php echo $lang['ws_280'] ?>
		</div>
	</td>
</tr>

<tr>
	<td class="cc_label">
		<?php echo $lang['ws_252'] ?>
		<div class="cc_info">
			<?php echo $lang['ws_255'] ?>
		</div>
	</td>
	<td class="cc_data">
		<select class="x-form-text x-form-field" style="max-width:360px;" name="fhir_convert_timestamp_from_gmt">
			<option value='0' <?php echo ($element_data['fhir_convert_timestamp_from_gmt'] == 0) ? "selected" : "" ?>><?php echo $lang['ws_254'] ?></option>
			<option value='1' <?php echo ($element_data['fhir_convert_timestamp_from_gmt'] == 1) ? "selected" : "" ?>><?php echo $lang['ws_253'] ?></option>
		</select>
		<div class="cc_info" style="color:#C00000;">
			<?php echo $lang['ws_256'] ?>
		</div>
	</td>
</tr>

<tr>
    <td class="cc_label">
        <?php echo $lang['ws_299'] ?>
        <div class="cc_info">
            <?php echo $lang['ws_302'] ?>
        </div>
    </td>
    <td class="cc_data">
        <select class="x-form-text x-form-field" style="max-width:360px;" name="fhir_include_email_address">
            <option value='0' <?php echo ($element_data['fhir_include_email_address'] == 0) ? "selected" : "" ?>><?php echo $lang['ws_301'] ?></option>
            <option value='1' <?php echo ($element_data['fhir_include_email_address'] == 1) ? "selected" : "" ?>><?php echo $lang['ws_300'] ?></option>
        </select>
    </td>
</tr>

<tr>
    <td class="cc_label">
        <?php echo $lang['override_system_bundle_ca_title'] ?>
        <div class="cc_info">
            <?php echo $lang['override_system_bundle_ca_description'] ?>
        </div>
    </td>
    <td class="cc_data">
        <select class="x-form-text x-form-field" style="max-width:360px;" name="override_system_bundle_ca">
            <option value='1' <?php echo ($element_data['override_system_bundle_ca'] == 1) ? "selected" : "" ?>><?php echo $lang['override_system_bundle_ca_use_redcap'] ?></option>
            <option value='0' <?php echo ($element_data['override_system_bundle_ca'] == 0) ? "selected" : "" ?>><?php echo $lang['override_system_bundle_ca_use_system'] ?></option>
        </select>
    </td>
</tr>

</table><br/>
<div style="text-align: center;"><input type='submit' name='' value='<?=js_escape($lang['control_center_4876'])?>' /></div><br/>
</form>

<?php loadJS('Libraries/clipboard.js'); ?>
<script type="text/javascript">
// Function to test the URL via web request and give popup message if failed/succeeded
function validateUrl(ob) {
	ob = $(ob);
	ob.val( trim(ob.val()) );
	var url = ob.val();
	if (url.length == 0) return;
	// Get or set the object's id
	if (ob.attr('id') == null) {
		var input_id = "input-"+Math.floor(Math.random()*10000000000000000);
		ob.attr('id', input_id);
	} else {
		var input_id = ob.attr('id');
	}
	// Disallow localhost
	var localhost_array = new Array('localhost', 'http://localhost', 'https://localhost', 'localhost/', 'http://localhost/', 'https://localhost/');
	if (in_array(url, localhost_array)) {
		simpleDialog('<?php echo js_escape($lang['edit_project_126']) ?>','<?php echo js_escape($lang['global_01']) ?>',null,null,"$('#"+input_id+"').focus();");
		return;
	}
	// Validate URL
	if (!isUrl(url)) {
		if (url.substr(0,4).toLowerCase() != 'http' && isUrl('http://'+url)) {
			// Prepend 'http' to beginning
			ob.val('http://'+url);
			// Now test it again
			validateUrl(ob);
		} else {
			// Error msg
			simpleDialog('<?php echo js_escape($lang['edit_project_126']) ?>','<?php echo js_escape($lang['global_01']) ?>',null,null,"$('#"+input_id+"').focus();");
		}
	}
}
// Perform the setup for testUrl()
function setupTestUrl(ob) {
	if (ob.val() == '') {
		ob.focus();
		return false;
	}
	// Get or set the object's id
	if (ob.attr('id') == null) {
		var input_id = "input-"+Math.floor(Math.random()*10000000000000000);
		ob.attr('id', input_id);
	} else {
		var input_id = ob.attr('id');
	}
	// Test it
	testUrl(ob.val(),'post',"$('#"+input_id+"').focus();");
}
// Auto-find the FHIR authorize and token URLs using base URL
var foundFhirUrls = false;
var metaurl, tokenUrl, authorizeUrl;
function autoFindFhirUrls() {
	foundFhirUrls = false;
	$('#fhir_endpoint_base_url').val().trim();
	var url = $('#fhir_endpoint_base_url').val().replace(/\/$/, "");
	if (url == '') {
		simpleDialog('<?=js_escape($lang['control_center_4884'])?>', '<?=js_escape($lang['control_center_4885'])?>');
		return;
	}
	var k = 0;
	// Start "working..." progress bar
	showProgress(1,0);
	// Loop through URL and sub-URLs till we find the right metadata path
	while (k < 25 && foundFhirUrls === false) {		
		if (url == '' || url == 'https:/' || url == 'http:/' || url == 'https:' || url == 'http:') {
			break;
		}
		// Do ajax request to test the URL
		var thisAjax = $.ajax({
			url: '<?php echo PAGE_FULL ?>',
			type: 'POST',
			data: { url: url+"/metadata", redcap_csrf_token: redcap_csrf_token },
			async: false,
			success:
				function(data){
					if (data != '0') foundFhirUrls = data;
					metaurl = url+"/metadata";
				}
		});
		// Prep for the next loop
		url = dirname(url);
		k++;
	}
	showProgress(0,0);
	if (foundFhirUrls !== false) {
		var urls = foundFhirUrls.split("\n");
		authorizeUrl = urls[0];
		tokenUrl = urls[1];
		simpleDialog("The FHIR URLs below for your Authorize endpoint and Token endpoint were found from the FHIR Conformance Statement (<i>"+metaurl+"</i>). "
			+ "You may copy these URLs into their corresponding text boxes on this page."
			+ "<div style='font-size:13px;padding:20px 0 5px;color:green;'>Token endpoint: &nbsp;<b>"+tokenUrl+"</b></div>"
			+ "<div style='font-size:13px;padding:5px 0;color:green;'>Authorize endpoint: &nbsp;<b>"+authorizeUrl+"</b></div>",
			"<img src='"+app_path_images+"tick.png' style='vertical-align:middle;'> <span style='color:green;vertical-align:middle;'>Success!</span>",null,600,null,'Close',function(){
				$('#fhir_endpoint_authorize_url').val(authorizeUrl).effect('highlight',{},3000);
				$('#fhir_endpoint_token_url').val(tokenUrl).effect('highlight',{},3000);
			},'Copy');
	} else {
		simpleDialog("The FHIR Conformance Statement that contains the values of the URLs for your FHIR Authorize endpoint and FHIR Token endpoint could not found under your FHIR base URL nor under any higher-level directories. "
			+ "You should consult your EHR's technical team to determine these two FHIR endpoints. The DDP on FHIR function cannot work successfully without these URLs being set.", "<img src='"+app_path_images+"cross.png' style='vertical-align:middle;'> <span style='color:#C00000;vertical-align:middle;'>Failed to find FHIR Conformance Statement</span>");
	}
}
// Copy the public survey URL to the user's clipboard
function copyUrlToClipboard(ob) {
	// Create progress element that says "Copied!" when clicked
	var rndm = Math.random()+"";
	var copyid = 'clip'+rndm.replace('.','');
	var clipSaveHtml = '<span class="clipboardSaveProgress" id="'+copyid+'">Copied!</span>';
	$(ob).after(clipSaveHtml);
	$('#'+copyid).toggle('fade','fast');
	setTimeout(function(){
		$('#'+copyid).toggle('fade','fast',function(){
			$('#'+copyid).remove();
		});
	},2000);
}
// Copy-to-clipboard action
var clipboard = new Clipboard('.btn-clipboard');
$(function(){
	// Copy-to-clipboard action
	$('.btn-clipboard').click(function(){
		copyUrlToClipboard(this);
	});
});
</script>

<script type="module">
	/**
	 * logic for custom authentication parameters
	 */
	import AuthParamsManager from '<?= APP_PATH_JS ?>EHR/AuthParamsManager.js'
	
	const authParamsManager = new AuthParamsManager('custom-auth-params', 'custom-auth-params-template');
	authParamsManager.renderConfig(<?= $element_data['fhir_custom_auth_params'] ?>)

	const addButton = document.querySelector('[data-add-auth-param]')
	addButton.addEventListener('click', (e) => {
		e.preventDefault()
		authParamsManager.createAuthParams();
	})
	
</script>

<?php include 'footer.php'; ?>