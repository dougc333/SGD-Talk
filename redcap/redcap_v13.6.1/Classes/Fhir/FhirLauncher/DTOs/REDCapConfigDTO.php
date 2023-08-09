<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs;

use System;
use Vanderbilt\REDCap\Classes\DTOs\DTO;

/**
 * REDCap configuration variables
 * relevant for the CDIS features
 */
final class REDCapConfigDTO extends DTO {
    
    /**
     * FHIR client ID
     *
     * @var string
     */
    public $fhir_client_id;

    /**
     * FHIR client secret
     *
     * @var string
     */
    public $fhir_client_secret;

    /**
     * The identity provider is used in the OAuth2 authorization
     * process to identify the server that will exchange the FHIR
     * access token with REDCap
     *
     * @var string
     */
    public $fhir_identity_provider;

    /**
     * base URL of the FHIR server
     *
     * @var string
     */
    public $fhir_endpoint_base_url;

    /**
     * endpoint used to get anauthorization code
     *
     * @var string
     */
    public $fhir_endpoint_authorize_url;

    /**
     * endpoint used to exchange an authorization code
     * for an access token
     * 
     * @var string
     */
    public $fhir_endpoint_token_url;

    /**
     * language setting
     *
     * @var string
     */
    public $language_global;

    /**
     * patient string identifier
     *
     * @var string
     */
    public $fhir_ehr_mrn_identifier;

    /**
     * get a set of REDCap configuration directly from the database
     *
     * @return REDCapConfigDTO
     */
    public static function fromDB() {
        return REDCapConfigDTO::fromArray(System::getConfigVals());
    }

   
}