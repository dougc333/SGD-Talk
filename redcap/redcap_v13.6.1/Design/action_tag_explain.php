<?php


if (isset($_GET['pid'])) {
	include_once dirname(dirname(__FILE__)) . '/Config/init_project.php';
} else {
	include_once dirname(dirname(__FILE__)) . '/Config/init_global.php';
}

// Build list of all action tags
$action_tag_descriptions = "";
foreach (Form::getActionTags() as $tag=>$description) {
    // Ignore the @PREFILL since it is no longer used
   if ($tag == '@PREFILL') continue;
    // Add row
	$action_tag_descriptions .=
		RCView::tr([],
			RCView::td(array('class'=>'nowrap', 'data-cell'=>'button', 'style'=>'text-align:center;background-color:#f5f5f5;color:#912B2B;padding:7px 15px 7px 12px;font-weight:bold;border:1px solid #ccc;border-bottom:0;border-right:0;'),
				((!$isAjax || (isset($_POST['hideBtns']) && $_POST['hideBtns'] == '1')) ? '' :
					RCView::button(array('class'=>'btn btn-xs btn-rcred', 'style'=>'', 'onclick'=>"$('#field_annotation').val(trim('".js_escape($tag)." '+$('#field_annotation').val())); highlightTableRowOb($(this).parentsUntil('tr').parent(),2500);"), $lang['design_171'])
				)
			) .
			RCView::td(array('class'=>'nowrap', 'data-cell'=>'name', 'style'=>'background-color:#f5f5f5;color:#912B2B;padding:7px;font-weight:bold;border:1px solid #ccc;border-bottom:0;border-left:0;border-right:0;'),
				$tag
			) .
			RCView::td(array('data-cell'=>'desc', 'style'=>'line-height:1.3;font-size:13px;background-color:#f5f5f5;padding:7px;border:1px solid #ccc;border-bottom:0;border-left:0;'),
				$description
			)
		);
}

// Content
$content  = (!$isAjax ? '' :
				RCView::div(array('class'=>'clearfix'),
					RCView::div(array('style'=>'color:#A00000;font-size:18px;font-weight:bold;float:left;padding:10px 0;'),
						'@ ' . $lang['global_132']
					) .
					RCView::div(array('style'=>'text-align:right;float:right;'),
						RCView::a(array('href'=>PAGE_FULL, 'target'=>'_blank', 'style'=>'text-decoration:underline;'),
							$lang['survey_977']
						)
					)
				)
			) . 
			RCView::div(array('style'=>''),
				$lang['design_724'] . " " . $lang['design_723']
			) .
			// If Twilio telephony for surveys is enabled, then add text that Action Tags do not work with SMS/Voice surveys
			(!(isset($_GET['pid']) && $twilio_enabled && $Proj->twilio_enabled_surveys) ? '' :
				RCView::div(array('class'=>'yellow', 'style'=>'margin-top:10px;'),
					RCView::b($lang['global_03'].$lang['colon']) . " " . $lang['survey_1154']
				)
			) .
			RCView::div([
				"id" => "action-tag-filter",
				"class" => "mt-3 mb-2"
			], 
				RCView::div([
					"class" => "input-group input-group-sm at-search"
				], 
					RCView::input([
						"type" => "text",
						"class" => "form-control filter-text fs12",
						"placeholder" => RCView::tt_attr("design_1067") // Filter action tags
					]) . 
					RCView::span([
						"class" => "input-group-text fs12"
					], RCView::fa("fa-solid fa-filter")) .
					RCView::button([
						"class" => "btn btn-secondary btn-clear-search fs12"
					], RCView::fa("fa-solid fa-filter-circle-xmark"))
				) .
				RCView::input([
					"type" => "checkbox",
					"class" => "ml-2",
					"name" => "include-desc",
					"id" => "at-search-include-desc"
				]) .
				RCView::label([
					"class" => "ml-1",
					"for" => "at-search-include-desc"
				], 
					RCView::tt("design_1068") // Include descriptions
				)
			) .
			RCView::div([],
				RCView::tt("design_608", "b") .
				RCView::table([
					'style' => 'margin-top:5px;width:100%;border-bottom:1px solid #ccc;line-height:13px;',
					'class' => 'action-tag-descriptions'
				], $action_tag_descriptions)
			) .
			RCView::iife(<<<END
				const search = $('#action-tag-filter');
				const rows = [];
				function getRowCount() {
					const count = $('.action-tag-descriptions tr').length;
					return count;
				}
				function cacheRows() {
					rows.length = 0;
					$('.action-tag-descriptions tr').each(function() {
						const tr = $(this);
						const name = tr.find('[data-cell="name"]').text().toLowerCase();
						const desc = tr.find('[data-cell="desc"]').text().toLowerCase();
						rows.push({ el: this, name: name, all: name + ' ' + desc });
					});
				}
				cacheRows();
				search.find('.btn-clear-search').on('click', () => search.find('input.filter-text').val('').trigger('keyup'));
				search.find('input[type=checkbox][name=include-desc]')
				search.find('input.filter-text').on('keyup', function(e) {
					const searchText = e.target.value.toLowerCase();
					const scope = search.find('input[type=checkbox][name=include-desc]').prop('checked') ? 'all' : 'name';
					if (rows.length != getRowCount()) cacheRows();
					rows.forEach((row) => row.el.classList[searchText == '' || row[scope].includes(searchText) ? 'remove' : 'add']('hide'));
				});
				$(() => search.find('input.filter-text').trigger('focus'));
			END) .
			RCView::style(<<<END
				#action-tag-filter {
					display: flex;
					align-items: center;
				}
				#action-tag-filter .input-group {
					max-width: 300px;
				}
				#action-tag-filter label {
					margin: 0;
				}
				#action-tag-filter .btn-clear-search {
					background-color: var(--bs-gray-200);
					border: 1px solid #ced4da;
					color: var(--bs-danger);
				}
				#action-tag-filter .at-search > input ~ span,
				#action-tag-filter .at-search > input:placeholder-shown ~ button.btn-clear-search {
					display: none;
					border-top-right-radius: .25rem;
					border-bottom-right-radius: .25rem;
				}
				#action-tag-filter .at-search > input:placeholder-shown ~ span, 
				#action-tag-filter .at-search > input ~ button.btn-clear-search {
					display: block;
				}
				#action_tag_explain_popup {
					overflow-y: scroll;
				}
			END);

if ($isAjax) {	
	// Return JSON
    header("Content-Type: application/json");
	print json_encode_rc(array('content'=>$content, 'title'=>$lang['design_606']));
} else {
	$objHtmlPage = new HtmlPage();
	$objHtmlPage->PrintHeaderExt();
	print 	RCView::div('',
				RCView::div(array('style'=>'color:#A00000;font-size:18px;font-weight:bold;float:left;padding:10px 0 0;'),
					'@ ' . $lang['global_132']
				) .
				RCView::div(array('style'=>'text-align:right;float:right;'),
					RCView::img(array('src'=>'redcap-logo.png'))
				) .
				RCView::div(array('class'=>'clear'), '')
			) .
			RCView::div(array('style'=>'margin:10px 0;font-size:13px;'),
				$content
			);
	?><style type="text/css">#footer { display: block; }</style><?php
	$objHtmlPage->PrintFooterExt();
}
