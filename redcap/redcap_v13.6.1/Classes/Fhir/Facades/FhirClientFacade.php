<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Facades;

use HttpClient;
use Vanderbilt\REDCap\Classes\BreakTheGlass\GlassBreaker;
use Vanderbilt\REDCap\Classes\Fhir\FhirClient;
use Vanderbilt\REDCap\Classes\Fhir\Logs\FhirLogger;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirTokenManager;

/**
 * provides a facade to the FhirClient
 */
class FhirClientFacade {

    /**
     * Get an instance of the FhirClient based on the provided project ID and user ID.
     * Also, attach the FhirTokenManager and the FhirLogger
     *
     * @param int $project_id
     * @param int $user_id
     * @return FhirClient
     */
    public static function getInstance($project_id=null, $user_id=null) {
        $tokenManager = new FhirTokenManager($user_id, $project_id);
        $fhirLogger = new FhirLogger();

        $fhirClient = new FhirClient($project_id, $tokenManager);
        
        $fhirClient->attach($fhirLogger, FhirClient::NOTIFICATION_RESOURCE_RECEIVED);
        $fhirClient->attach($tokenManager, FhirClient::NOTIFICATION_PATIENT_IDENTIFIED);
		$fhirClient->attach($tokenManager, FhirClient::NOTIFICATION_RESOURCE_ERROR);

        if(GlassBreaker::isAvailable($project_id)) {
            $glassBreaker = new GlassBreaker($user_id);
            $fhirClient->attach($glassBreaker, FhirClient::NOTIFICATION_ERROR);
            $fhirClient->attach($glassBreaker, FhirClient::NOTIFICATION_ENTRY_RECEIVED);
        }

        return $fhirClient;
    }

    /* public static function __callStatic($name, $arguments)
    {
        if(!method_exists(__CLASS__, $name)) return;
        $method = new ReflectionMethod(__CLASS__, $name);
        $instance = null; // instance can be null for static methods
        if(!$method->isStatic()) {
            $instance = new static();
        }
        return $method->invokeArgs($instance, $arguments);
    } */
}