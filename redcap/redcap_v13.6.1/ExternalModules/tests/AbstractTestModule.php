<?php namespace ExternalModules;

class AbstractTestModule extends AbstractExternalModule {

	function redcap_pdf($project_id, $metadata, $data){
		$metadata[] = 'metadata added by ' . $this->PREFIX;
		$data[] = 'data added by ' . $this->PREFIX;

		return [
			'metadata' => $metadata,
			'data' => $data
		];
	}
}
