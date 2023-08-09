<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirRenderer;

class ReadyState extends State
{

	public function run() {
		$standaloneLaunchURL = FhirLauncher::getStandaloneLaunchURL();
		$this->context->log("FHIR launcher is ready");
		$renderer = FhirRenderer::engine();
		$html = $renderer->run('standalone_launch', compact('standaloneLaunchURL'));
		// $html .= $debug = $renderer->run('partials.debug', ['session' => $this->context->getSession()]);
		print($html);
	}

}