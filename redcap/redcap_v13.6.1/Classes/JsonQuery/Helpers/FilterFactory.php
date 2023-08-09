<?php
namespace Vanderbilt\REDCap\Classes\JsonQuery\Helpers;

use Vanderbilt\REDCap\Classes\JsonQuery\Filters;

/**
 * factory for the value filters of a Node
 */
class FilterFactory
{
  public static function make($condition, $value, $key=null)
  {
    $condition = strtolower($condition);
    switch($condition) {
      case '=':
        $callback = Functional::partialRight([Filters::class, 'isEqual'], $value, $key);
        break;
      case '!=':
        $callback = Functional::partialRight([Filters::class, 'isNotEqual'], $value, $key);
        break;
      case '>':
        $callback = Functional::partialRight([Filters::class, 'isBigger'], $value, $key);
        break;
      case '>=':
        $callback = Functional::partialRight([Filters::class, 'isBiggerOrEqual'], $value, $key);
        break;
      case '<':
        $callback = Functional::partialRight([Filters::class, 'isSmaller'], $value, $key);
        break;
      case '<=':
        $callback = Functional::partialRight([Filters::class, 'isSmallerOrEqual'], $value, $key);
        break;
      case 'in':
        $callback = Functional::partialRight([Filters::class, 'isIn'], $value, $key);
        break;
      case 'not in':
        $callback = Functional::partialRight([Filters::class, 'isNotIn'], $value, $key);
        break;
      case 'beetween':
        $callback = Functional::partialRight([Filters::class, 'isBeetween'], $value, $key);
        break;
      case 'not beetween':
        $callback = Functional::partialRight([Filters::class, 'isNotBeetween'], $value, $key);
        break;
      case 'not like':
        $callback = Functional::partialRight([Filters::class, 'isNotLike'], $value, $key);
        break;
      case 'like':
        $callback = Functional::partialRight([Filters::class, 'isLike'], $value, $key);
        break;
    }
    return $callback;
  }
 }