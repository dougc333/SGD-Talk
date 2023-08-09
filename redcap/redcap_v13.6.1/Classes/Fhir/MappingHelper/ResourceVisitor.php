<?php
namespace Vanderbilt\REDCap\Classes\Fhir\MappingHelper;

use ReflectionClass;
use Vanderbilt\REDCap\Classes\Fhir\Resources\R4\Encounter;
use Vanderbilt\REDCap\Classes\Fhir\Resources\Shared\Bundle;
use Vanderbilt\REDCap\Classes\Fhir\Resources\Shared\Patient;
use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;
use Vanderbilt\REDCap\Classes\Fhir\Resources\Shared\Observation;
use Vanderbilt\REDCap\Classes\Fhir\Resources\R4\MedicationRequest;
use Vanderbilt\REDCap\Classes\Fhir\Resources\DSTU2\MedicationOrder;
use Vanderbilt\REDCap\Classes\Fhir\Resources\ResourceVisitorInterface;
use Vanderbilt\REDCap\Classes\Fhir\Resources\R4\AllergyIntolerance as AllergyIntolerance_R4;
use Vanderbilt\REDCap\Classes\Fhir\Resources\DSTU2\AllergyIntolerance as AllergyIntolerance_DSTU2;
use Vanderbilt\REDCap\Classes\Fhir\Resources\Shared\OperationOutcome;

/**
 * FHIR resource visitor
 * 
 * adjust the data based on the type of resource visited
 */
class ResourceVisitor implements ResourceVisitorInterface
{

    /**
     * setting to convert timestamps
     * to local timezone (where applicable)
     *
     * @var boolean
     */
    private $convertToLocalTime = false;

    public function __construct()
    {
        $systemConfigs = \System::getConfigVals();
        $this->convertToLocalTime = boolval(@$systemConfigs['fhir_convert_timestamp_from_gmt']);
    }

    /**
     * store modified data
     *
     * @var array
     */
    private $data = [];

    public function getData()
    {
      return $this->data;
    }
  
    public function addData($data)
    {
      $this->data[] = $data;
    }

    /**
     * create a structure containing the data of a resource and some metadata (type)
     *
     * @param AbstractResource $resource
     * @param array $data
     * @return void
     */
    public function makeResult($resource, $data=null) {
        $getClassName = function($object) {
            $reflect = new ReflectionClass($object);
            return $reflect->getShortName();
        };
        $className = $getClassName($resource);
        // if no data was passed, then get data from the resuorce
        if(is_null($data)) {
            $data = $resource->getData();
        }
        $entry = [
            'type' => $className,
            'data' => $data,
        ];
        return $entry;
    }

    /**
     * manipulate the resource
     * return an array in each resource so that Bundle
     * can perform an array_merge. This is needed for resources
     * like "Observation" where we need to create a different entry for
     * each LOINC CODE
     * 
     * @param AbstractResource $resource
     * @return object
     */
    public function visit($resource)
    {
        $results = [];
        /**
         * NOTE: To use switch with get_class
         * I need to process the resources in specific
         * methods to avoid warnings from the IDE.
         * As an alternative I can add a comment before
         * using one of its methods.
         * E.g. :
         * // @var Bundle $resource
         * $entries = $resource->getEntries();
         * 
         * I can also use if statements with instanceof
         */
        $class = get_class($resource);
        switch ($class) {
            case Bundle::class:
                $results = $this->visitBundle($resource);
                break;
            case OperationOutcome::class:
                // OperationOutcome is skipped
                break;
            case Observation::class:
                $results = $this->visitObservation($resource);
                break;
            case Encounter::class:
                $results = $this->visitEncounter($resource);
                break;
            case MedicationOrder::class:
                $results = $this->visitMedicationOrder($resource);
                break;
            case MedicationRequest::class:
                $results = $this->visitMedicationRequest($resource);
                break;
            case Patient::class:
            case AllergyIntolerance_R4::class:
            case AllergyIntolerance_DSTU2::class:
            default:
                $data = $this->makeResult($resource);
                $results = [$data];
                break;
        }
        return $results;
    }


    /**
     * get data for Bundles
     *
     * @param Bundle $resource
     * @return array
     */
    private function visitBundle($resource)
    {
        $results = [];
        $generator = $resource->makeEntriesGenerator();
        while($entry = $generator->current()) {
            $generator->next();
            $result = $this->visit($entry);
            $results = array_merge($results, $result);
        }
        return $results;
    }

    /**
     *
     * @param Observation $resource
     * @return array
     */
    private function visitObservation($resource)
    {
        $results = [];
        $observations = $resource->split();
        foreach ($observations as $observation) {
            $results[] = $this->makeResult($observation);
        }
        return $results;
    }

    /**
     *
     * @param MedicationRequest $resource
     * @return array
     */
    private function visitMedicationRequest($resource)
    {
        $results = [];
        $medications = $resource->split();
        foreach ($medications as $medication) {
            $results[] = $this->makeResult($medication);
        }
        return $results;
    }

    /**
     *
     * @param MedicationOrder $resource
     * @return array
     */
    private function visitMedicationOrder($resource)
    {
        $results = [];
        $medications = $resource->split();
        foreach ($medications as $medication) {
            $results[] = $this->makeResult($medication);
        }
        return $results;
    }
    
    /**
     *
     * @param Encounter $resource
     * @return array
     */
    private function visitEncounter($resource)
    {
        $data = $resource->getData();
        $data['normalized_period-start'] = $resource->getTimestampStart($this->convertToLocalTime);
        $data['normalized_period-end'] = $resource->getTimestampEnd($this->convertToLocalTime);
        $data = $this->makeResult($resource, $data);
        return [$data];
    }
}