<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\FhirCustomMetadataValidator;

use Exception;

class FhirCustomMetadataCategoryValidation implements FhirCustomMetadataValidationStrategy {

  private $categories;

  public function __construct($categories)
  {
    $this->categories = $categories;
  }

  public function validate($header, $rows) {
    foreach ($rows as $row) {
      $category = $row["category"];
      if (!in_array($category, $this->categories)) {
        throw new Exception(sprintf("Invalid category ($category). Allowed categories are: %s", implode( ', ', $this->categories)));
      }
    }
    return true;
  }
}