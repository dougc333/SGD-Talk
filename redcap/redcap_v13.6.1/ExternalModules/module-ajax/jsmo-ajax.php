<?php namespace ExternalModules;

/**
 * jsmo-ajax-php
 * 
 * This file handles EM Framework ajax requests that are initiated from the JSMO.ajax() method.
 */

// Get payload
$data = $_POST;

if (isset($_GET['NOAUTH'])) {
    define('NOAUTH', true);
}

// Initialize REDCap
/**
 * In case NOAUTH is not set and there is no valid user session (either because a bad request was 
 * sent or the login session has expired) the caller will get the REDCap login page HTML as 
 * response. They will have to deal with this in their Promise.catch implementation.
 */
require_once __DIR__ . '/../redcap_connect.php';

// We got here, which means either a valid session is still active or we are on a survey page.
// Handle the request:
$response = ExternalModules::handleAjaxRequest($data);

// Return result
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
