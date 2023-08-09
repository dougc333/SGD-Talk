<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\FhirCustomMetadataValidator;

use Exception;

class FhirCustomMetadataNonEmptyValidation implements FhirCustomMetadataValidationStrategy {
  public function validate($header, $rows) {
    if(!is_array($header) || count($header)===0) throw new Exception("Header cannot be empty");
    if(!is_array($rows) || count($rows)===0) throw new Exception("No data was detected");
    return true;
  }
}