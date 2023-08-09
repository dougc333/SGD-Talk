<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Resources\R4;

use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;


class Practitioner extends AbstractResource
{

  public function getFhirID()
  {
    return $this->query()->select('#/id$')->results()->single();
  }
  
  public function getNameGiven()
  {
    return $this->query()
      ->select('#/name/\d+')
      ->where('use', '=', 'usual')
      ->select('given')
      ->results()
      ->join(' ');
  }
  
  public function getNameFamily()
  {
    return $this->query()
      ->select('#/name/\d+')
      ->where('use', '=', 'usual')
      ->select('family')
      ->results()
      ->join(' ');
  }

  public function getData()
  {
    $data = [
      'fhir_id'     =>  $this->getFhirID(),
      'name-given'  =>  $this->getNameGiven(),
      'name-family' =>  $this->getNameFamily(),
    ];
    return $data;
  }
  
}