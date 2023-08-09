<?php namespace ExternalModules;

require_once '../../redcap_connect.php';

$pid = ExternalModules::getProjectId();
if(!empty($pid)){
	ExternalModules::requireDesignRights($pid);
}
else if(!ExternalModules::isSuperUser()){
	echo 'You do not have access to this page.';
	return;
}

$parameters = [
	$_GET['messageLengthLimit'],
	$_GET['start'],
	date('Y-m-d', strtotime($_GET['end'] . ' + 1 day'))
];

$whereClause = '
	where
		timestamp >= ? 
		and timestamp < ?
';

if(!empty($pid)){
	$whereClause .= ' and project_id = ?';
	$parameters[] = $pid;
}

$prefixes = $_GET['modules'];
if(!empty($prefixes)){
	foreach($prefixes as $prefix){
		$questionMarks[] = '?';
		$parameters[] = $prefix;
	}

	$whereClause .= ' and directory_prefix in (' . implode(',', $questionMarks) . ') ';
}

$results = ExternalModules::query("
	select
		log_id,
		timestamp,
		directory_prefix,
		project_id,
		substring(message, 1, ?) as message
	from redcap_external_modules_log l
	join redcap_external_modules m
		on m.external_module_id = l.external_module_id
	$whereClause
	order by log_id desc
", $parameters);

$rows = [];
while($row = $results->fetch_assoc()){
	$rows[] = ExternalModules::escape($row);
}

echo json_encode([
	'data' => $rows
], JSON_PRETTY_PRINT);
