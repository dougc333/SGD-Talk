<?php namespace GuzzleHttp\Event; // required for interface definition below

require_once __DIR__ . '/../psalm/autoload.php';
require_once __DIR__ . '/ExternalModulesTest.php';

/**
 * This is required to avoid an the following error when running psalm, which was caused by the guzzle update in commit e52c00c.
 * Fatal error: Interface 'GuzzleHttp\Event\SubscriberInterface' not found in /app001/www/redcap/redcap_v12.2.0/Libraries/vendor/google/auth/src/Subscriber/AuthTokenSubscriber.php on line 37
 */
require_once APP_PATH_DOCROOT . '/Libraries/vendor/autoload.php';
if(!interface_exists('GuzzleHttp\Event\SubscriberInterface')){
    // This requires the namespace to be set to GuzzleHttp\Event above.
    interface SubscriberInterface {}
}