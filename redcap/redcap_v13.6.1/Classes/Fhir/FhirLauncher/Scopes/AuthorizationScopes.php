<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\Scopes;


final class AuthorizationScopes extends Scopes
{
	protected $scopes = [
		'launch', // do not send in standalone launch
		'openid',
		'fhirUser',
		'online_access', // for refresh token
		'*/AllergyIntolerance.read',
		'*/Condition.read',
		'*/Patient.read',
		'*/Observation.read',
		'*/MedicationOrder.read',
		'*/MedicationRequest.read',
		'*/Encounter.read',
		'*/FamilyMemberHistory.read',
		'*/DiagnosticReport.read',
		'*/Immunization.read',
		'*/Procedure.read',
		'*/Device.read',
		'*/DocumentReference.read',
		'*/ResearchStudy.read',
		'*/AdverseEvent.read',
		'*/CarePlan.read',
		'*/QuestionnaireResponse.read',
		'*/QuestionnaireResponse.write',
	];
	
}