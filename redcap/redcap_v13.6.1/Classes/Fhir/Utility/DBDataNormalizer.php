<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Utility;

class DBDataNormalizer
{

  /**
   * max bytes allowed in a TEXT field of a MySQL database
   * (as used by redcap_data)
   */
  const MAX_FIELD_SIZE = 65535;

  /**
   *
   * @param string $string
   * @param int $byteCount
   * @return void
   */
  function isSizeExceeded($string, $maxTextSize) {
    // Get the size of the string in bytes
    $stringSize = strlen($string);
    
    // Check if the size of the string exceeds the maximum size of TEXT data type
    if ($stringSize > $maxTextSize) {
      return true; // Size exceeded
    } else {
      return false; // Size within limit
    }
  }

  /**
   *
   * @param string $string
   * @param int $byteCount
   * @return void
   */
  function truncateStringToBytes($string, $byteCount) {
    if (strlen($string) > $byteCount) {
      $string = substr($string, 0, $byteCount);
      $lastChar = substr($string, -1);
      
      // Check if the last character is a multi-byte character
      if (ord($lastChar) > 127) {
        $string = substr($string, 0, -1);
      }
      
      // Append an ellipsis to indicate that the string has been truncated
      $string .= '...';
    }
    return $string;
  }
  
  /**
	 * normalize data before it is saevd to the database
   *
   * @param string $data
   * @param string $maxSize
   * @return string
   */
	function normalize($data, $maxSize=self::MAX_FIELD_SIZE) {
		$checkDataSize = function($data) use($maxSize) {
			$tooLargeNotice = 'DATA TOO LARGE, TRUNCATED';
      if($this->isSizeExceeded($data, $maxSize)) {
        $data = "--- $tooLargeNotice --- \n".$data;
        // make it half the allowed size
        $data = $this->truncateStringToBytes($data, $maxSize/2);
      }
      return $data;
		};
		// Make sure value gets trimmed before storing it (just in case of whitespace padding)
		$normalized = trim($data);
		// truncate data if it is too much
		$normalized = $checkDataSize($normalized);
		return $normalized;
	}
 }