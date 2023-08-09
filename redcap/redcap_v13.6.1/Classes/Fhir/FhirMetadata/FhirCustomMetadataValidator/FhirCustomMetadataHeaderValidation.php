<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\FhirCustomMetadataValidator;

use Exception;

class FhirCustomMetadataHeaderValidation implements FhirCustomMetadataValidationStrategy {
  private $expectedHeader;

  public function __construct($expectedHeader) {
    $this->expectedHeader = $expectedHeader;
  }

  public function validate($header, $rows) {
    $result = array_diff($header, $this->expectedHeader);
    if (empty($result)) return true;
    throw new Exception(sprintf("Invalid header. Please use the expected format %s", implode(', ', $this->expectedHeader)));
  }
}