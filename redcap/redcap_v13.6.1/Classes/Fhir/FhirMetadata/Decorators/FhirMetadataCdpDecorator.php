<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\Decorators;

/**
 * decorator made specifically for CDP projects
 */
class FhirMetadataCdpDecorator extends FhirMetadataAbstractDecorator
{

  /**
   * apply decorator and get a new list
   *
   * @param array $list
   * @return array
   */
  public function getList()
  {
    $metadata_array = $this->fhirMetadata->getList();
    $disableKey = function($key, $reason) use($metadata_array) {
      if(!array_key_exists($key, $metadata_array)) return $metadata_array; // return as is since the key is not available
      $reason = $reason ?? "`{$key}` is not available for `Clinical Data Pull` projects";
      $metadata_array[$key]['disabled'] = true;
      $metadata_array[$key]['disabled_reason'] = $reason;
      return $metadata_array;
    };

    // these will be disabled (still visible)
    $disabledResources = [
      ['key'=>'encounters-list', 'reason' => '`Encounters` are not available for `Clinical Data Pull` projects.']
    ];
    foreach ($disabledResources as $disabledResource) {
      $key = $disabledResource['key'];
      $reason = $disabledResource['reason'];
      $metadata_array = $disableKey($key, $reason);
    }

    // these will be deleted
    $hiddenResources = ['encounter-diagnosis-list'];
    foreach ($hiddenResources as $hiddenResource) {
      if(!array_key_exists($hiddenResource, $metadata_array)) continue; // not found; go on
      unset($metadata_array[$hiddenResource]);
    }

    return $metadata_array;
  }
}