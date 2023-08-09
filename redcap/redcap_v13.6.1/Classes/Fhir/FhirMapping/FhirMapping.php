<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirMapping;

use DateTime;
use JsonSerializable;
use Vanderbilt\REDCap\Classes\Traits\CanMakeDateTime;

/**
 * define a set of options that will be used
 * to retrieve data from the FHIR system
 * 
 * this is the syntax for a mapping:
 * - mapping => field_name?options
 * - options => option&option
 * - option => key=value
 */
class FhirMapping implements JsonSerializable
{
  use CanMakeDateTime;

  const FIELD_OPTIONS_SEPARATOR = '?'; // separate the resource from the options
  const VALUE_PAIRS_SEPARATOR = '&';
  const KEY_VALUE_SEPARATOR = '=';
  const DATE_FORMAT = 'Y-m-d H:i:s';

  protected $name;
  protected $options = [];
  protected $dateMin;
  protected $dateMax;
  protected $metadata;

  public function __construct($data, $dateMin=null, $dateMax=null) {
    list($name, $rawOptions) = $this->parseFieldData($data);
    $this->name = $name;
    $this->options = $this->parseKeyValuePairString($rawOptions);
    $this->dateMin = $this->makeDateTime($dateMin);
    $this->dateMax = $this->makeDateTime($dateMax);
  }

  protected function getMetadataProperty($key, $metadata_array=[]) {
    $property = $metadata_array[$key] ?? null;
    return $property;
  }

  /**
   *
   * @return string
   */
  public function getName() { return $this->name; }

  /**
   *
   * @return array
   */
  public function getOptions() { return $this->options; }

  /**
   *
   * @return DateTime|null
   */
  public function getDateMin() { return $this->dateMin; }

  /**
   *
   * @return DateTime|null
   */
  public function getDateMax() { return $this->dateMax; }


  /**
   * each mapped field can contain
   * a set of key/value options
   *
   * @param string $field
   * @return array
   */
  function parseFieldData(string $field) {
    $field = strval($field); // make sure it is a string
    list($field_name, $options) = explode(self::FIELD_OPTIONS_SEPARATOR, $field);
    return [$field_name, $options];
  }

  /**
   * parse a string of key/value pairs
   * and return an associative array
   *
   * @param string $string
   * @return array
   */
  function parseKeyValuePairString($string) {
    $string = $string ?? '';
    $result = [];
    if(!str_contains($string, self::VALUE_PAIRS_SEPARATOR)) return $result;
    $pairs = explode(self::VALUE_PAIRS_SEPARATOR, $string);

    foreach ($pairs as $pair) {
      $key_value = explode(self::KEY_VALUE_SEPARATOR, $pair);
      $key = $key_value[0];
      $value = $key_value[1];
      $result[$key] = $value;
    }

    return $result;
  }

  /**
   * serialized object
   *
   * @return array
   */
  #[\ReturnTypeWillChange]
  public function jsonSerialize()
  {
    $timestamp_min = $this->getDateMin();
    $timestamp_max = $this->getDateMax();
    return [
      'field' => $this->getName(),
      'timestamp_min' => ($timestamp_min instanceof DateTime) ? $timestamp_min->format(self::DATE_FORMAT) : $timestamp_min,
      'timestamp_max' => ($timestamp_max instanceof DateTime) ? $timestamp_max->format(self::DATE_FORMAT) : $timestamp_max,
    ];
  }

}