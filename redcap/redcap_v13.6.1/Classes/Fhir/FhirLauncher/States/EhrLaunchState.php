<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use Vanderbilt\REDCap\Classes\DTOs\REDCapConfigDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\Scopes\Scopes;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\Scopes\AuthorizationScopes;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\Traits\CanSetSessionCookie;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\AuthorizationRequestDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLaunchContexts;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\Traits\CanGetAuthorizationToken;

class EhrLaunchState extends State
{
	use CanGetAuthorizationToken;
	use CanSetSessionCookie;

	public function run() {
		$session = $this->context->getSession();
		$this->context->forceBlankSession();

		$session->launchType = FhirLauncher::LAUNCHTYPE_EHR; // save the launch type
		$state = $session->state;
		if($fhirUser = @$_GET['user']) {
			// capture ehr user if available in the URL (Epic)
			// it is important to capture the user this way only in launch from EHR context!
			$session->fhirUser = trim(rawurldecode(urldecode($fhirUser)));
		}

		$scopes = new AuthorizationScopes();
		$scopes->setLevel(Scopes::PATIENT_LEVEL); // set provider level for resource scopes
		
		$config = REDCapConfigDTO::fromDB();
		$launch = @$_GET['launch'];
		$iss = @$_GET['iss'];
		$aud = $this->getIdentityProvider($config->fhir_endpoint_base_url, $config->fhir_identity_provider, $iss);

		$authorizationDTO = AuthorizationRequestDTO::fromArray([
			'response_type' => AuthorizationRequestDTO::RESPONSE_TYPE_CODE,
			'client_id' => @$config->fhir_client_id,
			'redirect_uri' => $this->context->getRedirectUrl(),
			'scope' => strval($scopes),
			'launch' => $launch, // only set during launch from EHR 
			'aud' => $aud,
			'state' => $state,
			'legacy_login_page' => 0, // optional, Epic-only parameter that forces the authentication to use the legacy OAuth2
		]);
		$URL = $this->context->getAuthorizeURL();
		$params = $authorizationDTO->getData();
		$this->applyConfigOverrides(FhirLaunchContexts::EHR_LAUNCH, $params);

		$this->context->log(sprintf("setting params for authorization URL: ", json_encode($params, JSON_PRETTY_PRINT))); // diagram step
		$this->context->log("request authorization via OAuth2: redirecting to $URL"); // diagram step

		$this->setCookie($state, FhirLauncher::LAUNCHTYPE_EHR);
		
		
		$this->redirectToAuthorizeURL($URL, $params);
	}

}