<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\FhirCustomMetadataValidator;



interface FhirCustomMetadataValidationStrategy
{
  /**
   * validation interface
   *
   * @param array $header
   * @param array $rows
   * @return bool
   */
  public function validate($header, $rows);
}