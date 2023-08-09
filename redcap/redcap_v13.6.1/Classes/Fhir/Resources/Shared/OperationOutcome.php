<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Resources\Shared;

use Vanderbilt\REDCap\Classes\JsonParser\Nodes\EmptyNode;
use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;

class OperationOutcome extends AbstractResource
{

  /**
   * explanation
   *
   * @return string
   */
  public function getDiagnostics() {
    $diagnostic = $this->scraper()->issue->diagnostics ?? '';
    return strval($diagnostic);
  }

  /**
   * FHIR BGT token used to break the glass
   *
   * @return string
   */
  public function getFhirBgtToken() {
    $extension = $this->scraper()->issue->extension->where('url','~','fhir-btg-token$');
    $token = $extension->valueString;
    if($token instanceof EmptyNode) return;
    return strval($token);
  }

  public function getData()
  {
    $data = [
      'diagnostics'      => $this->getDiagnostics(),
      'fhir-bgt-token'   => $this->getFhirBgtToken(),
    ];
    return $data;
  }
  
}