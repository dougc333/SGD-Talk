<?php
namespace Vanderbilt\REDCap\Classes\Fhir\DataMart;

use Sabre\VObject\InvalidDataException;
use SplObserver;
use Vanderbilt\REDCap\Classes\Fhir\FhirClient;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Form;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Labs;
use Vanderbilt\REDCap\Classes\Fhir\Utility\InstanceSeeker;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Allergies;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Diagnosis;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\ResourceVisitor;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Demography;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Encounters;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\VitalSigns;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Medications;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\ProblemList;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\AdverseEvents;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\Immunizations;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\SocialHistory;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms\CoreCharacteristics;
use Vanderbilt\REDCap\Classes\Fhir\FhirCategory;

/**
 * Adapter to save data coming from FHIR endpoints into a Data Mart record.
 * this object will listen for notification from the FHIR client
 * to populate it's data array (grouped by category)
 */
class DataMartRecordAdapter implements SplObserver
{

	/**
	 * collect stats of fetched data
	 *
	 * @var array
	 */
	private $stats = [];

	/**
	 *
	 * @var string
	 */
	private $mrn;

	/**
	 *
	 * @var DataMartRevision
	 */
	private $revision;

	/**
	 *
	 * @var int
	 */
	private $project_id;

	/**
	 *
	 * @var Project
	 */
	private $project;

	/**
	 * contains all data for a specific record
	 * grouped by category
	 *
	 * @var array
	 */
	private $data = [];
	/**
	 * list of errors
	 *
	 * @var array
	 */
	private $errors = [];

	/**
	 * Create an instance of the adapter
	 *
	 * @param string $mrn
	 * @param \DataMartRevision $revision
	 */
	public function __construct($mrn, $revision)
	{
		$this->mrn = $mrn;
		$this->revision = $revision;
		$this->project_id = $this->revision->project_id;
		$this->project = new \Project($this->project_id);
		// cache a list of fields in the current project
	}

	/**
	 * react to notifications (from the FHIR client)
	 *
	 * @param SplSubject $subject
	 * @param string $event
	 * @param mixed $data
	 * @return void
	 */
	public function update($subject, string $event = null, $data = null): void
	{
		if(!($subject instanceof FhirClient)) return;
		switch ($event) {
			case FhirClient::NOTIFICATION_ENTRIES_RECEIVED:
				$category = $data['category'] ?? '';
				$entries = $data['entries'] ?? [];
				$mappingGroup = $data['mappingGroup'] ?? null;
				$this->addData($category, $entries, $mappingGroup, $fhirClient=$subject);
				break;
			case FhirClient::NOTIFICATION_ERROR:
				$this->addError($data);
				break;
			default:
				# code...
				break;
		}
	}

	/**
	 * apply the resource visitor to the received data
	 * and store it in its group
	 *
	 * @param string $category
	 * @param array $entries
	 * @param array $mapping [[field, timestamp_min, timestamp_max]]
	 * @param FhirCLient|null $fhirClient
	 * @return void
	 */
	public function addData($category, $entries, $mappingGroup, $fhirClient=null)
	{
		/**
		 * extract data from each resource
		 * and make necessary transformations if needed
		 */
		$mapEntries = function($entries, $mappingGroup) use($fhirClient){
			$resourceVisitor = new ResourceVisitor($mappingGroup, $fhirClient);
			$data = [];
			foreach ($entries as $entry) {
				$entryData = $entry->accept($resourceVisitor);
				$data = array_merge($data, $entryData);
			}
			return $data;
		};
		if(!$mappingGroup) throw new InvalidDataException('No mapping group is present; cannot add data.');

		$mappedEntries = $mapEntries($entries, $mappingGroup);
		$this->data[$category] = $mappedEntries;
	}

	public function addError($data)
	{
		$this->errors[] = $data;
	}

	public function getErrors()
	{
		return $this->errors;
	}

	public function hasErrors()
	{
		return count($this->errors)>0;
	}


	private function getFormforCategory($fhirCategory)
	{
		$project = $this->project;
		switch ($fhirCategory) {
			case FhirCategory::LABORATORY:
				$form = new Labs($project);
				break;
			case FhirCategory::VITAL_SIGNS:
				$form = new VitalSigns($project);
				break;
			case FhirCategory::SOCIAL_HISTORY:
				$form = new SocialHistory($project);
				break;
			case FhirCategory::ALLERGY_INTOLERANCE:
				$form = new Allergies($project);
				break;
			case FhirCategory::MEDICATIONS:
				$form = new Medications($project);
				break;
			case FhirCategory::CONDITION:
				$form = new ProblemList($project);
				break;
			case FhirCategory::DIAGNOSIS:
				$form = new Diagnosis($project);
				break;
			case FhirCategory::DEMOGRAPHICS:
				$form = new Demography($project);
				break;
			case FhirCategory::ENCOUNTER:
				$form = new Encounters($project);
				break;
			case FhirCategory::IMMUNIZATION:
				$form = new Immunizations($project);
				break;
			case FhirCategory::CORE_CHARACTERISTICS:
				$form = new CoreCharacteristics($project);
				break;
			case FhirCategory::ADVERSE_EVENT:
				$form = new AdverseEvents($project);
				break;
			default:
				$form = null;
				break;
		}
		return $form;
	}

	/**
	 * update the stats with the amount of
	 * data fetched and saved per category
	 *
	 * @param string $category
	 * @param array $data
	 * @param Boolean $repeating
	 * @return void
	 */
	function updateStats($category, $data, $repeating)
	{
		if($repeating) {
			$this->stats[$category] = intval(@$this->stats[$category])+1;
		}else {
			$this->stats[$category] = intval(@$this->stats[$category])+count($data);
		}
	}

	/**
	 * return collected stats
	 *
	 * @return array
	 */
	function getStats() {
		return $this->stats;
	}

	public function getRecord()
	{
		$cache = [];
		/**
		 * check if data has already been processed (dulpicate entries)
		 */
		$isDuplicateEntry = function(...$params) use(&$cache){
			// hash the parameters and cache them to skip duplicates
			$hasedData = md5(json_encode($params));
			if(in_array($hasedData, $cache)) return true;
			$cache[] =$hasedData;
			return false;
		};

		$getNextInstanceInRecord = function($record, $formName) {
			if(empty($record)) return 1;
			$recordData = reset($record) ?: []; //extract what is inside recordId
			$repeatInstancesList = @$recordData['repeat_instances'] ?: [];
			$repeatInstancesData = reset($repeatInstancesList) ?: []; // extract what is inside event_id
			$repeatInstanceData = @$repeatInstancesData[$formName] ?: [];
			$lastInstance = end(array_keys($repeatInstanceData));
			return intval($lastInstance)+1;
		};
		
		$mrn = $this->mrn;
		$groupedData = $this->data;
		// Instantiate project
		$project = $this->project;
		$project_id = $project->project_id;
		$event_id = $project->firstEventId;
		$recordId = InstanceSeeker::getRecordID($project_id, $event_id, 'mrn', $mrn);
		if(!$recordId) {
			throw new \Exception("Error: the specified MRN is not in the project", 1);
		}
		
		$recordSeed = [];
		// get the event ID. Will be used to save data in the record structure
		foreach ($groupedData as $category => $entries) {
			$form = $this->getFormforCategory($category);
			if(!$form instanceof Form) continue;
			$formName = $form->getFormName();
			$instanceSeeker = new InstanceSeeker($project, $formName);
			
			foreach ($entries as $entry) {
				$data = $form->mapFhirData($entry);
				if($isDuplicateEntry($recordId, $data)) continue;
				if($repeating=$form->isRepeating()) {
					$fullMatch = $instanceSeeker->findMatches($recordId, $data, array_keys($data));
					if($fullMatch) continue;
					$uniquenessFields = $form->getUniquenessFields();
					$matchingInstance = $instance_number = $instanceSeeker->findMatches($recordId, $data, $uniquenessFields);
					if(!$matchingInstance) {
						// choose the next instance number between the database and the recordSeed 
						$db_instance_number = $instanceSeeker->getAutoInstanceNumber($recordId);
						$recordSeedInstance = $getNextInstanceInRecord($recordSeed, $formName);
						$instance_number = max($db_instance_number, $recordSeedInstance);
					}
				}else {
					$differentFields = $instanceSeeker->getNonMatchingFields($recordId, $data);
					// only consider different and non empty values for insertion
					$data = array_filter($data, function($value, $key) use($differentFields) {
						if($value==='') return false; // skip empty values
						return in_array($key, $differentFields); // only keep different fields
					}, ARRAY_FILTER_USE_BOTH);
					if(count($data)<1) continue;
					$instance_number = 1;
				}
				
				$completeData = [];
				// add the information to mark the form as "completed" if there is data to save
				if(!empty($data)) $completeData = $form->addCompleteFormData($data);
				// add data to the record seed
				foreach($completeData as $field_name => $value) {
					$recordSeed = $form->reduceRecord($recordId, $event_id, $field_name, $value, $instance_number, $recordSeed);
				}
				// update stats using the data (do not count the {form_name}_complete field)
				$this->updateStats($category, $data, $repeating);
			}

		}
		return $recordSeed;
	}

}