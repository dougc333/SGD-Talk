(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require('../../modules/es.aggregate-error');
require('../../modules/es.array.iterator');
require('../../modules/es.object.to-string');
require('../../modules/es.promise');
require('../../modules/es.promise.all-settled');
require('../../modules/es.promise.any');
require('../../modules/es.promise.finally');
require('../../modules/es.string.iterator');
var path = require('../../internals/path');

module.exports = path.Promise;

},{"../../internals/path":95,"../../modules/es.aggregate-error":129,"../../modules/es.array.iterator":130,"../../modules/es.object.to-string":131,"../../modules/es.promise":138,"../../modules/es.promise.all-settled":132,"../../modules/es.promise.any":134,"../../modules/es.promise.finally":137,"../../modules/es.string.iterator":142}],2:[function(require,module,exports){
var isCallable = require('../internals/is-callable');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};

},{"../internals/is-callable":61,"../internals/try-to-string":121}],3:[function(require,module,exports){
var isConstructor = require('../internals/is-constructor');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a constructor');
};

},{"../internals/is-constructor":62,"../internals/try-to-string":121}],4:[function(require,module,exports){
var isCallable = require('../internals/is-callable');

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};

},{"../internals/is-callable":61}],5:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var defineProperty = require('../internals/object-define-property').f;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/object-create":80,"../internals/object-define-property":82,"../internals/well-known-symbol":127}],6:[function(require,module,exports){
var isPrototypeOf = require('../internals/object-is-prototype-of');

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
};

},{"../internals/object-is-prototype-of":87}],7:[function(require,module,exports){
var isObject = require('../internals/is-object');

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};

},{"../internals/is-object":65}],8:[function(require,module,exports){
var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/length-of-array-like":74,"../internals/to-absolute-index":112,"../internals/to-indexed-object":113}],9:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis([].slice);

},{"../internals/function-uncurry-this":45}],10:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":127}],11:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

},{"../internals/function-uncurry-this":45}],12:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var isCallable = require('../internals/is-callable');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

},{"../internals/classof-raw":11,"../internals/is-callable":61,"../internals/to-string-tag-support":119,"../internals/well-known-symbol":127}],13:[function(require,module,exports){
var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

},{"../internals/has-own-property":51,"../internals/object-define-property":82,"../internals/object-get-own-property-descriptor":83,"../internals/own-keys":94}],14:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":37}],15:[function(require,module,exports){
// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};

},{}],16:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":17,"../internals/descriptors":21,"../internals/object-define-property":82}],17:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],18:[function(require,module,exports){
var makeBuiltIn = require('../internals/make-built-in');
var defineProperty = require('../internals/object-define-property');

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};

},{"../internals/make-built-in":75,"../internals/object-define-property":82}],19:[function(require,module,exports){
var isCallable = require('../internals/is-callable');
var definePropertyModule = require('../internals/object-define-property');
var makeBuiltIn = require('../internals/make-built-in');
var defineGlobalProperty = require('../internals/define-global-property');

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

},{"../internals/define-global-property":20,"../internals/is-callable":61,"../internals/make-built-in":75,"../internals/object-define-property":82}],20:[function(require,module,exports){
var global = require('../internals/global');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/global":50}],21:[function(require,module,exports){
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":37}],22:[function(require,module,exports){
var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};

},{}],23:[function(require,module,exports){
var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":50,"../internals/is-object":65}],24:[function(require,module,exports){
var IS_DENO = require('../internals/engine-is-deno');
var IS_NODE = require('../internals/engine-is-node');

module.exports = !IS_DENO && !IS_NODE
  && typeof window == 'object'
  && typeof document == 'object';

},{"../internals/engine-is-deno":25,"../internals/engine-is-node":28}],25:[function(require,module,exports){
/* global Deno -- Deno case */
module.exports = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

},{}],26:[function(require,module,exports){
var userAgent = require('../internals/engine-user-agent');

module.exports = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != 'undefined';

},{"../internals/engine-user-agent":30}],27:[function(require,module,exports){
var userAgent = require('../internals/engine-user-agent');

// eslint-disable-next-line redos/no-vulnerable -- safe
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":30}],28:[function(require,module,exports){
(function (process){(function (){
var classof = require('../internals/classof-raw');

module.exports = typeof process != 'undefined' && classof(process) == 'process';

}).call(this)}).call(this,require('_process'))

},{"../internals/classof-raw":11,"_process":143}],29:[function(require,module,exports){
var userAgent = require('../internals/engine-user-agent');

module.exports = /web0s(?!.*chrome)/i.test(userAgent);

},{"../internals/engine-user-agent":30}],30:[function(require,module,exports){
module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

},{}],31:[function(require,module,exports){
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

},{"../internals/engine-user-agent":30,"../internals/global":50}],32:[function(require,module,exports){
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],33:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

},{"../internals/function-uncurry-this":45}],34:[function(require,module,exports){
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var clearErrorStack = require('../internals/error-stack-clear');
var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable');

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};

},{"../internals/create-non-enumerable-property":16,"../internals/error-stack-clear":33,"../internals/error-stack-installable":35}],35:[function(require,module,exports){
var fails = require('../internals/fails');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});

},{"../internals/create-property-descriptor":17,"../internals/fails":37}],36:[function(require,module,exports){
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIn = require('../internals/define-built-in');
var defineGlobalProperty = require('../internals/define-global-property');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};

},{"../internals/copy-constructor-properties":13,"../internals/create-non-enumerable-property":16,"../internals/define-built-in":19,"../internals/define-global-property":20,"../internals/global":50,"../internals/is-forced":63,"../internals/object-get-own-property-descriptor":83}],37:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],38:[function(require,module,exports){
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

},{"../internals/function-bind-native":40}],39:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this-clause');
var aCallable = require('../internals/a-callable');
var NATIVE_BIND = require('../internals/function-bind-native');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-callable":2,"../internals/function-bind-native":40,"../internals/function-uncurry-this-clause":44}],40:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

},{"../internals/fails":37}],41:[function(require,module,exports){
var NATIVE_BIND = require('../internals/function-bind-native');

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

},{"../internals/function-bind-native":40}],42:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

},{"../internals/descriptors":21,"../internals/has-own-property":51}],43:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

},{"../internals/a-callable":2,"../internals/function-uncurry-this":45}],44:[function(require,module,exports){
var classofRaw = require('../internals/classof-raw');
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};

},{"../internals/classof-raw":11,"../internals/function-uncurry-this":45}],45:[function(require,module,exports){
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};

},{"../internals/function-bind-native":40}],46:[function(require,module,exports){
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

},{"../internals/global":50,"../internals/is-callable":61}],47:[function(require,module,exports){
var classof = require('../internals/classof');
var getMethod = require('../internals/get-method');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};

},{"../internals/classof":12,"../internals/get-method":49,"../internals/is-null-or-undefined":64,"../internals/iterators":73,"../internals/well-known-symbol":127}],48:[function(require,module,exports){
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var getIteratorMethod = require('../internals/get-iterator-method');

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};

},{"../internals/a-callable":2,"../internals/an-object":7,"../internals/function-call":41,"../internals/get-iterator-method":47,"../internals/try-to-string":121}],49:[function(require,module,exports){
var aCallable = require('../internals/a-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"../internals/a-callable":2,"../internals/is-null-or-undefined":64}],50:[function(require,module,exports){
(function (global){(function (){
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],51:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

},{"../internals/function-uncurry-this":45,"../internals/to-object":116}],52:[function(require,module,exports){
module.exports = {};

},{}],53:[function(require,module,exports){
module.exports = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};

},{}],54:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":46}],55:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":21,"../internals/document-create-element":23,"../internals/fails":37}],56:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

},{"../internals/classof-raw":11,"../internals/fails":37,"../internals/function-uncurry-this":45}],57:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/function-uncurry-this":45,"../internals/is-callable":61,"../internals/shared-store":106}],58:[function(require,module,exports){
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};

},{"../internals/create-non-enumerable-property":16,"../internals/is-object":65}],59:[function(require,module,exports){
var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var shared = require('../internals/shared-store');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/create-non-enumerable-property":16,"../internals/global":50,"../internals/has-own-property":51,"../internals/hidden-keys":52,"../internals/is-object":65,"../internals/shared-key":105,"../internals/shared-store":106,"../internals/weak-map-basic-detection":126}],60:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":73,"../internals/well-known-symbol":127}],61:[function(require,module,exports){
var $documentAll = require('../internals/document-all');

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

},{"../internals/document-all":22}],62:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof');
var getBuiltIn = require('../internals/get-built-in');
var inspectSource = require('../internals/inspect-source');

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

},{"../internals/classof":12,"../internals/fails":37,"../internals/function-uncurry-this":45,"../internals/get-built-in":46,"../internals/inspect-source":57,"../internals/is-callable":61}],63:[function(require,module,exports){
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":37,"../internals/is-callable":61}],64:[function(require,module,exports){
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

},{}],65:[function(require,module,exports){
var isCallable = require('../internals/is-callable');
var $documentAll = require('../internals/document-all');

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"../internals/document-all":22,"../internals/is-callable":61}],66:[function(require,module,exports){
module.exports = false;

},{}],67:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"../internals/get-built-in":46,"../internals/is-callable":61,"../internals/object-is-prototype-of":87,"../internals/use-symbol-as-uid":123}],68:[function(require,module,exports){
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var iteratorClose = require('../internals/iterator-close');

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};

},{"../internals/an-object":7,"../internals/function-bind-context":39,"../internals/function-call":41,"../internals/get-iterator":48,"../internals/get-iterator-method":47,"../internals/is-array-iterator-method":60,"../internals/iterator-close":69,"../internals/length-of-array-like":74,"../internals/object-is-prototype-of":87,"../internals/try-to-string":121}],69:[function(require,module,exports){
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getMethod = require('../internals/get-method');

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

},{"../internals/an-object":7,"../internals/function-call":41,"../internals/get-method":49}],70:[function(require,module,exports){
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/create-property-descriptor":17,"../internals/iterators":73,"../internals/iterators-core":72,"../internals/object-create":80,"../internals/set-to-string-tag":104}],71:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var IS_PURE = require('../internals/is-pure');
var FunctionName = require('../internals/function-name');
var isCallable = require('../internals/is-callable');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};

},{"../internals/create-non-enumerable-property":16,"../internals/define-built-in":19,"../internals/export":36,"../internals/function-call":41,"../internals/function-name":42,"../internals/is-callable":61,"../internals/is-pure":66,"../internals/iterator-create-constructor":70,"../internals/iterators":73,"../internals/iterators-core":72,"../internals/object-get-prototype-of":86,"../internals/object-set-prototype-of":91,"../internals/set-to-string-tag":104,"../internals/well-known-symbol":127}],72:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/define-built-in":19,"../internals/fails":37,"../internals/is-callable":61,"../internals/is-object":65,"../internals/is-pure":66,"../internals/object-create":80,"../internals/object-get-prototype-of":86,"../internals/well-known-symbol":127}],73:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{}],74:[function(require,module,exports){
var toLength = require('../internals/to-length');

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

},{"../internals/to-length":115}],75:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var DESCRIPTORS = require('../internals/descriptors');
var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE;
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

},{"../internals/descriptors":21,"../internals/fails":37,"../internals/function-name":42,"../internals/function-uncurry-this":45,"../internals/has-own-property":51,"../internals/inspect-source":57,"../internals/internal-state":59,"../internals/is-callable":61}],76:[function(require,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

},{}],77:[function(require,module,exports){
var global = require('../internals/global');
var bind = require('../internals/function-bind-context');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var macrotask = require('../internals/task').set;
var Queue = require('../internals/queue');
var IS_IOS = require('../internals/engine-is-ios');
var IS_IOS_PEBBLE = require('../internals/engine-is-ios-pebble');
var IS_WEBOS_WEBKIT = require('../internals/engine-is-webos-webkit');
var IS_NODE = require('../internals/engine-is-node');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var microtask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!microtask) {
  var queue = new Queue();

  var flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (fn = queue.get()) try {
      fn();
    } catch (error) {
      if (queue.head) notify();
      throw error;
    }
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // `webpack` dev server bug on IE global methods - use bind(fn, global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }

  microtask = function (fn) {
    if (!queue.head) notify();
    queue.add(fn);
  };
}

module.exports = microtask;

},{"../internals/engine-is-ios":27,"../internals/engine-is-ios-pebble":26,"../internals/engine-is-node":28,"../internals/engine-is-webos-webkit":29,"../internals/function-bind-context":39,"../internals/global":50,"../internals/object-get-own-property-descriptor":83,"../internals/queue":101,"../internals/task":111}],78:[function(require,module,exports){
'use strict';
var aCallable = require('../internals/a-callable');

var $TypeError = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw $TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-callable":2}],79:[function(require,module,exports){
var toString = require('../internals/to-string');

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};

},{"../internals/to-string":120}],80:[function(require,module,exports){
/* global ActiveXObject -- old IE, WSH */
var anObject = require('../internals/an-object');
var definePropertiesModule = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

},{"../internals/an-object":7,"../internals/document-create-element":23,"../internals/enum-bug-keys":32,"../internals/hidden-keys":52,"../internals/html":54,"../internals/object-define-properties":81,"../internals/shared-key":105}],81:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

},{"../internals/an-object":7,"../internals/descriptors":21,"../internals/object-define-property":82,"../internals/object-keys":89,"../internals/to-indexed-object":113,"../internals/v8-prototype-define-bug":124}],82:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":7,"../internals/descriptors":21,"../internals/ie8-dom-define":55,"../internals/to-property-key":118,"../internals/v8-prototype-define-bug":124}],83:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"../internals/create-property-descriptor":17,"../internals/descriptors":21,"../internals/function-call":41,"../internals/has-own-property":51,"../internals/ie8-dom-define":55,"../internals/object-property-is-enumerable":90,"../internals/to-indexed-object":113,"../internals/to-property-key":118}],84:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":32,"../internals/object-keys-internal":88}],85:[function(require,module,exports){
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],86:[function(require,module,exports){
var hasOwn = require('../internals/has-own-property');
var isCallable = require('../internals/is-callable');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

},{"../internals/correct-prototype-getter":14,"../internals/has-own-property":51,"../internals/is-callable":61,"../internals/shared-key":105,"../internals/to-object":116}],87:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis({}.isPrototypeOf);

},{"../internals/function-uncurry-this":45}],88:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

},{"../internals/array-includes":8,"../internals/function-uncurry-this":45,"../internals/has-own-property":51,"../internals/hidden-keys":52,"../internals/to-indexed-object":113}],89:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":32,"../internals/object-keys-internal":88}],90:[function(require,module,exports){
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],91:[function(require,module,exports){
/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = require('../internals/function-uncurry-this-accessor');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/a-possible-prototype":4,"../internals/an-object":7,"../internals/function-uncurry-this-accessor":43}],92:[function(require,module,exports){
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/classof":12,"../internals/to-string-tag-support":119}],93:[function(require,module,exports){
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};

},{"../internals/function-call":41,"../internals/is-callable":61,"../internals/is-object":65}],94:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"../internals/an-object":7,"../internals/function-uncurry-this":45,"../internals/get-built-in":46,"../internals/object-get-own-property-names":84,"../internals/object-get-own-property-symbols":85}],95:[function(require,module,exports){
var global = require('../internals/global');

module.exports = global;

},{"../internals/global":50}],96:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],97:[function(require,module,exports){
var global = require('../internals/global');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var isCallable = require('../internals/is-callable');
var isForced = require('../internals/is-forced');
var inspectSource = require('../internals/inspect-source');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_BROWSER = require('../internals/engine-is-browser');
var IS_DENO = require('../internals/engine-is-deno');
var IS_PURE = require('../internals/is-pure');
var V8_VERSION = require('../internals/engine-v8-version');

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var SPECIES = wellKnownSymbol('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT;
});

module.exports = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
  SUBCLASSING: SUBCLASSING
};

},{"../internals/engine-is-browser":24,"../internals/engine-is-deno":25,"../internals/engine-v8-version":31,"../internals/global":50,"../internals/inspect-source":57,"../internals/is-callable":61,"../internals/is-forced":63,"../internals/is-pure":66,"../internals/promise-native-constructor":98,"../internals/well-known-symbol":127}],98:[function(require,module,exports){
var global = require('../internals/global');

module.exports = global.Promise;

},{"../internals/global":50}],99:[function(require,module,exports){
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":7,"../internals/is-object":65,"../internals/new-promise-capability":78}],100:[function(require,module,exports){
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;

module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
});

},{"../internals/check-correctness-of-iteration":10,"../internals/promise-constructor-detection":97,"../internals/promise-native-constructor":98}],101:[function(require,module,exports){
var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    var tail = this.tail;
    if (tail) tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      var next = this.head = entry.next;
      if (next === null) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;

},{}],102:[function(require,module,exports){
var isNullOrUndefined = require('../internals/is-null-or-undefined');

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};

},{"../internals/is-null-or-undefined":64}],103:[function(require,module,exports){
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineBuiltInAccessor(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

},{"../internals/define-built-in-accessor":18,"../internals/descriptors":21,"../internals/get-built-in":46,"../internals/well-known-symbol":127}],104:[function(require,module,exports){
var defineProperty = require('../internals/object-define-property').f;
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

},{"../internals/has-own-property":51,"../internals/object-define-property":82,"../internals/well-known-symbol":127}],105:[function(require,module,exports){
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":107,"../internals/uid":122}],106:[function(require,module,exports){
var global = require('../internals/global');
var defineGlobalProperty = require('../internals/define-global-property');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;

},{"../internals/define-global-property":20,"../internals/global":50}],107:[function(require,module,exports){
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.30.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.30.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

},{"../internals/is-pure":66,"../internals/shared-store":106}],108:[function(require,module,exports){
var anObject = require('../internals/an-object');
var aConstructor = require('../internals/a-constructor');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
};

},{"../internals/a-constructor":3,"../internals/an-object":7,"../internals/is-null-or-undefined":64,"../internals/well-known-symbol":127}],109:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/function-uncurry-this":45,"../internals/require-object-coercible":102,"../internals/to-integer-or-infinity":114,"../internals/to-string":120}],110:[function(require,module,exports){
/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/engine-v8-version":31,"../internals/fails":37}],111:[function(require,module,exports){
var global = require('../internals/global');
var apply = require('../internals/function-apply');
var bind = require('../internals/function-bind-context');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var fails = require('../internals/fails');
var html = require('../internals/html');
var arraySlice = require('../internals/array-slice');
var createElement = require('../internals/document-create-element');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var IS_IOS = require('../internals/engine-is-ios');
var IS_NODE = require('../internals/engine-is-node');

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global.location;
});

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var eventListener = function (event) {
  run(event.data);
};

var globalPostMessageDefer = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    global.addEventListener('message', eventListener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

},{"../internals/array-slice":9,"../internals/document-create-element":23,"../internals/engine-is-ios":27,"../internals/engine-is-node":28,"../internals/fails":37,"../internals/function-apply":38,"../internals/function-bind-context":39,"../internals/global":50,"../internals/has-own-property":51,"../internals/html":54,"../internals/is-callable":61,"../internals/validate-arguments-length":125}],112:[function(require,module,exports){
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer-or-infinity":114}],113:[function(require,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":56,"../internals/require-object-coercible":102}],114:[function(require,module,exports){
var trunc = require('../internals/math-trunc');

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

},{"../internals/math-trunc":76}],115:[function(require,module,exports){
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer-or-infinity":114}],116:[function(require,module,exports){
var requireObjectCoercible = require('../internals/require-object-coercible');

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":102}],117:[function(require,module,exports){
var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var getMethod = require('../internals/get-method');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

},{"../internals/function-call":41,"../internals/get-method":49,"../internals/is-object":65,"../internals/is-symbol":67,"../internals/ordinary-to-primitive":93,"../internals/well-known-symbol":127}],118:[function(require,module,exports){
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

},{"../internals/is-symbol":67,"../internals/to-primitive":117}],119:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":127}],120:[function(require,module,exports){
var classof = require('../internals/classof');

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

},{"../internals/classof":12}],121:[function(require,module,exports){
var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

},{}],122:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"../internals/function-uncurry-this":45}],123:[function(require,module,exports){
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

},{"../internals/symbol-constructor-detection":110}],124:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

},{"../internals/descriptors":21,"../internals/fails":37}],125:[function(require,module,exports){
var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw $TypeError('Not enough arguments');
  return passed;
};

},{}],126:[function(require,module,exports){
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

},{"../internals/global":50,"../internals/is-callable":61}],127:[function(require,module,exports){
var global = require('../internals/global');
var shared = require('../internals/shared');
var hasOwn = require('../internals/has-own-property');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":50,"../internals/has-own-property":51,"../internals/shared":107,"../internals/symbol-constructor-detection":110,"../internals/uid":122,"../internals/use-symbol-as-uid":123}],128:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var installErrorCause = require('../internals/install-error-cause');
var installErrorStack = require('../internals/error-stack-install');
var iterate = require('../internals/iterate');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Error = Error;
var push = [].push;

var $AggregateError = function AggregateError(errors, message /* , options */) {
  var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
  var that;
  if (setPrototypeOf) {
    that = setPrototypeOf($Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
  } else {
    that = isInstance ? this : create(AggregateErrorPrototype);
    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
  installErrorStack(that, $AggregateError, that.stack, 1);
  if (arguments.length > 2) installErrorCause(that, arguments[2]);
  var errorsArray = [];
  iterate(errors, push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

if (setPrototypeOf) setPrototypeOf($AggregateError, $Error);
else copyConstructorProperties($AggregateError, $Error, { name: true });

var AggregateErrorPrototype = $AggregateError.prototype = create($Error.prototype, {
  constructor: createPropertyDescriptor(1, $AggregateError),
  message: createPropertyDescriptor(1, ''),
  name: createPropertyDescriptor(1, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({ global: true, constructor: true, arity: 2 }, {
  AggregateError: $AggregateError
});

},{"../internals/copy-constructor-properties":13,"../internals/create-non-enumerable-property":16,"../internals/create-property-descriptor":17,"../internals/error-stack-install":34,"../internals/export":36,"../internals/install-error-cause":58,"../internals/iterate":68,"../internals/normalize-string-argument":79,"../internals/object-create":80,"../internals/object-get-prototype-of":86,"../internals/object-is-prototype-of":87,"../internals/object-set-prototype-of":91,"../internals/well-known-symbol":127}],129:[function(require,module,exports){
// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/es.aggregate-error.constructor');

},{"../modules/es.aggregate-error.constructor":128}],130:[function(require,module,exports){
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineProperty = require('../internals/object-define-property').f;
var defineIterator = require('../internals/iterator-define');
var createIterResultObject = require('../internals/create-iter-result-object');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  if (kind == 'keys') return createIterResultObject(index, false);
  if (kind == 'values') return createIterResultObject(target[index], false);
  return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

},{"../internals/add-to-unscopables":5,"../internals/create-iter-result-object":15,"../internals/descriptors":21,"../internals/internal-state":59,"../internals/is-pure":66,"../internals/iterator-define":71,"../internals/iterators":73,"../internals/object-define-property":82,"../internals/to-indexed-object":113}],131:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var defineBuiltIn = require('../internals/define-built-in');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}

},{"../internals/define-built-in":19,"../internals/object-to-string":92,"../internals/to-string-tag-support":119}],132:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-callable":2,"../internals/export":36,"../internals/function-call":41,"../internals/iterate":68,"../internals/new-promise-capability":78,"../internals/perform":96,"../internals/promise-statics-incorrect-iteration":100}],133:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-callable":2,"../internals/export":36,"../internals/function-call":41,"../internals/iterate":68,"../internals/new-promise-capability":78,"../internals/perform":96,"../internals/promise-statics-incorrect-iteration":100}],134:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var getBuiltIn = require('../internals/get-built-in');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  any: function any(iterable) {
    var C = this;
    var AggregateError = getBuiltIn('AggregateError');
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-callable":2,"../internals/export":36,"../internals/function-call":41,"../internals/get-built-in":46,"../internals/iterate":68,"../internals/new-promise-capability":78,"../internals/perform":96,"../internals/promise-statics-incorrect-iteration":100}],135:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var defineBuiltIn = require('../internals/define-built-in');

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

},{"../internals/define-built-in":19,"../internals/export":36,"../internals/get-built-in":46,"../internals/is-callable":61,"../internals/is-pure":66,"../internals/promise-constructor-detection":97,"../internals/promise-native-constructor":98}],136:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var IS_NODE = require('../internals/engine-is-node');
var global = require('../internals/global');
var call = require('../internals/function-call');
var defineBuiltIn = require('../internals/define-built-in');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var aCallable = require('../internals/a-callable');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var speciesConstructor = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var hostReportErrors = require('../internals/host-report-errors');
var perform = require('../internals/perform');
var Queue = require('../internals/queue');
var InternalStateModule = require('../internals/internal-state');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var PromiseConstructorDetection = require('../internals/promise-constructor-detection');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var PromiseConstructor = NativePromiseConstructor;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

},{"../internals/a-callable":2,"../internals/an-instance":6,"../internals/define-built-in":19,"../internals/engine-is-node":28,"../internals/export":36,"../internals/function-call":41,"../internals/global":50,"../internals/host-report-errors":53,"../internals/internal-state":59,"../internals/is-callable":61,"../internals/is-object":65,"../internals/is-pure":66,"../internals/microtask":77,"../internals/new-promise-capability":78,"../internals/object-set-prototype-of":91,"../internals/perform":96,"../internals/promise-constructor-detection":97,"../internals/promise-native-constructor":98,"../internals/queue":101,"../internals/set-species":103,"../internals/set-to-string-tag":104,"../internals/species-constructor":108,"../internals/task":111}],137:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var fails = require('../internals/fails');
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var speciesConstructor = require('../internals/species-constructor');
var promiseResolve = require('../internals/promise-resolve');
var defineBuiltIn = require('../internals/define-built-in');

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromiseConstructor && fails(function () {
  // eslint-disable-next-line unicorn/no-thenable -- required for testing
  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = isCallable(onFinally);
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromisePrototype['finally'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'finally', method, { unsafe: true });
  }
}

},{"../internals/define-built-in":19,"../internals/export":36,"../internals/fails":37,"../internals/get-built-in":46,"../internals/is-callable":61,"../internals/is-pure":66,"../internals/promise-native-constructor":98,"../internals/promise-resolve":99,"../internals/species-constructor":108}],138:[function(require,module,exports){
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/es.promise.constructor');
require('../modules/es.promise.all');
require('../modules/es.promise.catch');
require('../modules/es.promise.race');
require('../modules/es.promise.reject');
require('../modules/es.promise.resolve');

},{"../modules/es.promise.all":133,"../modules/es.promise.catch":135,"../modules/es.promise.constructor":136,"../modules/es.promise.race":139,"../modules/es.promise.reject":140,"../modules/es.promise.resolve":141}],139:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-callable":2,"../internals/export":36,"../internals/function-call":41,"../internals/iterate":68,"../internals/new-promise-capability":78,"../internals/perform":96,"../internals/promise-statics-incorrect-iteration":100}],140:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});

},{"../internals/export":36,"../internals/function-call":41,"../internals/new-promise-capability":78,"../internals/promise-constructor-detection":97}],141:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var IS_PURE = require('../internals/is-pure');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;
var promiseResolve = require('../internals/promise-resolve');

var PromiseConstructorWrapper = getBuiltIn('Promise');
var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
  }
});

},{"../internals/export":36,"../internals/get-built-in":46,"../internals/is-pure":66,"../internals/promise-constructor-detection":97,"../internals/promise-native-constructor":98,"../internals/promise-resolve":99}],142:[function(require,module,exports){
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var toString = require('../internals/to-string');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/iterator-define');
var createIterResultObject = require('../internals/create-iter-result-object');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});

},{"../internals/create-iter-result-object":15,"../internals/internal-state":59,"../internals/iterator-define":71,"../internals/string-multibyte":109,"../internals/to-string":120}],143:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],144:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright (c) 2011 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @fileoverview Assertions and other code used to test a canvas proxy.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

var CanvasAssertions = {};

/**
 * Updates path attributes to match fill/stroke operations.
 *
 * This sets fillStyle to undefined for stroked paths,
 * and strokeStyle to undefined for filled paths, to simplify
 * matchers such as numLinesDrawn.
 *
 * @private
 * @param {Array.<Object>} List of operations.
 */
CanvasAssertions.cleanPathAttrs_ = function (calls) {
  var isStroked = true;
  for (var i = calls.length - 1; i >= 0; --i) {
    var call = calls[i];
    var name = call.name;
    if (name == 'stroke') {
      isStroked = true;
    } else if (name == 'fill') {
      isStroked = false;
    } else if (name == 'lineTo') {
      if (isStroked) {
        call.properties.fillStyle = undefined;
      } else {
        call.properties.strokeStyle = undefined;
      }
    }
  }
};

/**
 * Assert that a line is drawn between the two points
 *
 * This merely looks for one of these four possibilities:
 * moveTo(p1) -> lineTo(p2)
 * moveTo(p2) -> lineTo(p1)
 * lineTo(p1) -> lineTo(p2)
 * lineTo(p2) -> lineTo(p1)
 *
 * predicate is meant to be used when you want to track things like
 * color and stroke width. It can either be a hash of context properties,
 * or a function that accepts the current call.
 */
CanvasAssertions.assertLineDrawn = function (proxy, p1, p2, predicate) {
  CanvasAssertions.cleanPathAttrs_(proxy.calls__);
  // found = 1 when prior loop found p1.
  // found = 2 when prior loop found p2.
  var priorFound = 0;
  for (var i = 0; i < proxy.calls__.length; i++) {
    var call = proxy.calls__[i];

    // This disables lineTo -> moveTo pairs.
    if (call.name == "moveTo" && priorFound > 0) {
      priorFound = 0;
    }
    var found = 0;
    if (call.name == "moveTo" || call.name == "lineTo") {
      var matchp1 = CanvasAssertions.matchPixels(p1, call.args);
      var matchp2 = CanvasAssertions.matchPixels(p2, call.args);
      if (matchp1 || matchp2) {
        if (priorFound == 1 && matchp2) {
          if (CanvasAssertions.match(predicate, call)) {
            return;
          }
        }
        if (priorFound == 2 && matchp1) {
          if (CanvasAssertions.match(predicate, call)) {
            return;
          }
        }
        found = matchp1 ? 1 : 2;
      }
    }
    priorFound = found;
  }
  var toString = function toString(x) {
    var s = "{";
    for (var prop in x) {
      if (x.hasOwnProperty(prop)) {
        if (s.length > 1) {
          s = s + ", ";
        }
        s = s + prop + ": " + x[prop];
      }
    }
    return s + "}";
  };
  throw "Can't find a line drawn between " + p1 + " and " + p2 + " with attributes " + toString(predicate);
};

/**
 * Return the lines drawn with specific attributes.
 *
 * This merely looks for one of these four possibilities:
 * moveTo(p1) -> lineTo(p2)
 * moveTo(p2) -> lineTo(p1)
 * lineTo(p1) -> lineTo(p2)
 * lineTo(p2) -> lineTo(p1)
 *
 * attrs is meant to be used when you want to track things like
 * color and stroke width.
 */
CanvasAssertions.getLinesDrawn = function (proxy, predicate) {
  CanvasAssertions.cleanPathAttrs_(proxy.calls__);
  var lastCall;
  var lines = [];
  for (var i = 0; i < proxy.calls__.length; i++) {
    var call = proxy.calls__[i];
    if (call.name == "lineTo") {
      if (lastCall != null) {
        if (CanvasAssertions.match(predicate, call)) {
          lines.push([lastCall, call]);
        }
      }
    }
    lastCall = call.name === "lineTo" || call.name === "moveTo" ? call : null;
  }
  return lines;
};

/**
 * Verifies that every call to context.save() has a matching call to
 * context.restore().
 */
CanvasAssertions.assertBalancedSaveRestore = function (proxy) {
  var depth = 0;
  for (var i = 0; i < proxy.calls__.length; i++) {
    var call = proxy.calls__[i];
    if (call.name == "save") depth++;
    if (call.name == "restore") {
      if (depth == 0) {
        fail("Too many calls to restore()");
      }
      depth--;
    }
  }
  if (depth > 0) {
    fail("Missing matching 'context.restore()' calls.");
  }
};

/**
 * Checks how many lines of the given color have been drawn.
 * @return {Integer} The number of lines of the given color.
 */
// TODO(konigsberg): change 'color' to predicate? color is the
// common case. Possibly allow predicate to be function, hash, or
// string representing color?
CanvasAssertions.numLinesDrawn = function (proxy, color) {
  CanvasAssertions.cleanPathAttrs_(proxy.calls__);
  var num_lines = 0;
  var num_potential_calls = 0;
  for (var i = 0; i < proxy.calls__.length; i++) {
    var call = proxy.calls__[i];
    if (call.name == "beginPath") {
      num_potential_calls = 0;
    } else if (call.name == "lineTo") {
      num_potential_calls++;
    } else if (call.name == "stroke") {
      // note: Don't simplify these two conditionals into one. The
      // separation simplifies debugging tricky tests.
      if (call.properties.strokeStyle == color) {
        num_lines += num_potential_calls;
      }
      num_potential_calls = 0;
    }
  }
  return num_lines;
};

/**
 * Asserts that a series of lines are connected. For example,
 * assertConsecutiveLinesDrawn(proxy, [[x1, y1], [x2, y2], [x3, y3]], predicate)
 * is shorthand for
 * assertLineDrawn(proxy, [x1, y1], [x2, y2], predicate)
 * assertLineDrawn(proxy, [x2, y2], [x3, y3], predicate)
 */
CanvasAssertions.assertConsecutiveLinesDrawn = function (proxy, segments, predicate) {
  for (var i = 0; i < segments.length - 1; i++) {
    CanvasAssertions.assertLineDrawn(proxy, segments[i], segments[i + 1], predicate);
  }
};
CanvasAssertions.matchPixels = function (expected, actual) {
  // Expect array of two integers. Assuming the values are within one
  // integer unit of each other. This should be tightened down by someone
  // who knows what pixel a value of 5.8888 results in.
  return Math.abs(expected[0] - actual[0]) < 1 && Math.abs(expected[1] - actual[1]) < 1;
};

/**
 * For matching a proxy call against defined conditions.
 * predicate can either by a hash of items compared against call.properties,
 * or it can be a function that accepts the call, and returns true or false.
 * If it's null, this function returns true.
 */
CanvasAssertions.match = function (predicate, call) {
  if (predicate === null) {
    return true;
  }
  if (typeof predicate === "function") {
    return predicate(call);
  } else {
    for (var attr in predicate) {
      if (predicate.hasOwnProperty(attr) && predicate[attr] != call.properties[attr]) {
        return false;
      }
    }
  }
  return true;
};
var _default = CanvasAssertions;
exports["default"] = _default;
module.exports = exports.default;

},{}],145:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Copyright (c) 2011 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @fileoverview Utility functions for Dygraphs.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */
var DygraphOps = {};
DygraphOps.defaultEvent_ = {
  type: '',
  canBubble: true,
  cancelable: true,
  view: document.defaultView,
  detail: 0,
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  button: 0,
  relatedTarget: null
};

/**
 * Create an event. Sets default event values except for special ones
 * overridden by the 'custom' parameter.
 *
 * @param command the command to create.
 * @param custom an associative array of event attributes and their new values.
 */
DygraphOps.createEvent = function (command, custom) {
  var copy = function copy(from, to) {
    if (from != null) {
      for (var prop in from) {
        if (from.hasOwnProperty(prop)) {
          to[prop] = from[prop];
        }
      }
    }
  };
  var e = {};
  copy(DygraphOps.defaultEvent_, e);
  copy(command, e);
  copy(custom, e);
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent(e.type, e.canBubble, e.cancelable, e.view, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
  return event;
};

/**
 * Dispatch an event onto the graph's canvas.
 */
DygraphOps.dispatchCanvasEvent = function (g, event) {
  g.canvas_.dispatchEvent(event);
};
DygraphOps.dispatchDoubleClick = function (g, custom) {
  var opts = {
    type: 'dblclick',
    detail: 2
  };
  var event = DygraphOps.createEvent(opts, custom);
  DygraphOps.dispatchCanvasEvent(g, event);
};

/*
 * Create an 'opts' argument which can be passed to createEvent that contains
 * type, screenX, screenY, clientX, clientY.
 */
DygraphOps.createOptsForPoint_ = function (g, type, x, y) {
  var pos = utils.findPos(g.canvas_);
  var pageX = pos.x + x;
  var pageY = pos.y + y;
  return {
    type: type,
    screenX: pageX,
    screenY: pageY,
    clientX: pageX,
    clientY: pageY
  };
};
DygraphOps.dispatchMouseDown_Point = function (g, x, y, custom) {
  var opts = DygraphOps.createOptsForPoint_(g, 'mousedown', x, y);
  opts.detail = 1;
  var event = DygraphOps.createEvent(opts, custom);
  DygraphOps.dispatchCanvasEvent(g, event);
};
DygraphOps.dispatchMouseMove_Point = function (g, x, y, custom) {
  var opts = DygraphOps.createOptsForPoint_(g, 'mousemove', x, y);
  var event = DygraphOps.createEvent(opts, custom);
  DygraphOps.dispatchCanvasEvent(g, event);
};
DygraphOps.dispatchMouseUp_Point = function (g, x, y, custom) {
  var opts = DygraphOps.createOptsForPoint_(g, 'mouseup', x, y);
  var event = DygraphOps.createEvent(opts, custom);
  DygraphOps.dispatchCanvasEvent(g, event);
};
DygraphOps.dispatchMouseOver_Point = function (g, x, y, custom) {
  var opts = DygraphOps.createOptsForPoint_(g, 'mouseover', x, y);
  var event = DygraphOps.createEvent(opts, custom);
  DygraphOps.dispatchCanvasEvent(g, event);
};
DygraphOps.dispatchMouseOut_Point = function (g, x, y, custom) {
  var opts = DygraphOps.createOptsForPoint_(g, 'mouseout', x, y);
  var event = DygraphOps.createEvent(opts, custom);
  DygraphOps.dispatchCanvasEvent(g, event);
};

/**
 * Dispatches a mouse down using the graph's data coordinate system.
 * (The y value mapped to the first axis.)
 */
DygraphOps.dispatchMouseDown = function (g, x, y, custom) {
  DygraphOps.dispatchMouseDown_Point(g, g.toDomXCoord(x), g.toDomYCoord(y), custom);
};

/**
 * Dispatches a mouse move using the graph's data coordinate system.
 * (The y value mapped to the first axis.)
 */
DygraphOps.dispatchMouseMove = function (g, x, y, custom) {
  DygraphOps.dispatchMouseMove_Point(g, g.toDomXCoord(x), g.toDomYCoord(y), custom);
};

/**
 * Dispatches a mouse up using the graph's data coordinate system.
 * (The y value mapped to the first axis.)
 */
DygraphOps.dispatchMouseUp = function (g, x, y, custom) {
  DygraphOps.dispatchMouseUp_Point(g, g.toDomXCoord(x), g.toDomYCoord(y), custom);
};

/**
 * Dispatches a mouse over using the graph's data coordinate system.
 * (The y value mapped to the first axis.)
 */
DygraphOps.dispatchMouseOver = function (g, x, y, custom) {
  DygraphOps.dispatchMouseOver_Point(g, g.toDomXCoord(x), g.toDomYCoord(y), custom);
};

/**
 * Dispatches a mouse out using the graph's data coordinate system.
 * (The y value mapped to the first axis.)
 */
DygraphOps.dispatchMouseOut = function (g, x, y, custom) {
  DygraphOps.dispatchMouseOut_Point(g, g.toDomXCoord(x), g.toDomYCoord(y), custom);
};
var _default = DygraphOps;
exports["default"] = _default;
module.exports = exports.default;

},{"../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],146:[function(require,module,exports){
// Copyright 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview A class to facilitate sampling colors at particular pixels on a
 * dygraph.
 * @author danvk@google.com (Dan Vanderkam)
 * @license MIT
 */

'use strict';

/**
 * @constructor
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var PixelSampler = function PixelSampler(dygraph) {
  this.dygraph_ = dygraph;
  var canvas = dygraph.hidden_;
  var ctx = canvas.getContext("2d");
  this.imageData_ = ctx.getImageData(0, 0, canvas.width, canvas.height);
  this.scale = canvas.width / dygraph.width_;
};

/**
 * @param {number} x The screen x-coordinate at which to sample.
 * @param {number} y The screen y-coordinate at which to sample.
 * @return {Array.<number>} a 4D array: [R, G, B, alpha]. All four values
 * are in [0, 255]. A pixel which has never been touched will be [0,0,0,0].
 */
PixelSampler.prototype.colorAtPixel = function (x, y) {
  var i = 4 * (x * this.scale + this.imageData_.width * y * this.scale);
  var d = this.imageData_.data;
  return [d[i], d[i + 1], d[i + 2], d[i + 3]];
};

/**
 * Convenience wrapper around colorAtPixel if you only care about RGB (not A).
 * @param {number} x The screen x-coordinate at which to sample.
 * @param {number} y The screen y-coordinate at which to sample.
 * @return {Array.<number>} a 3D array: [R, G, B]. All three values
 *     are in [0, 255]. A pixel which has never been touched will be [0,0,0].
 */
PixelSampler.prototype.rgbAtPixel = function (x, y) {
  return this.colorAtPixel(x, y).slice(0, 3);
};

/**
 * The method samples a color using data coordinates (not screen coordinates).
 * This will round your data coordinates to the nearest screen pixel before
 * sampling.
 * @param {number} x The data x-coordinate at which to sample.
 * @param {number} y The data y-coordinate at which to sample.
 * @return {Array.<number>} a 4D array: [R, G, B, alpha]. All four values
 * are in [0, 255]. A pixel which has never been touched will be [0,0,0,0].
 */
PixelSampler.prototype.colorAtCoordinate = function (x, y) {
  var dom_xy = this.dygraph_.toDomCoords(x, y);
  return this.colorAtPixel(Math.round(dom_xy[0]), Math.round(dom_xy[1]));
};
var _default = PixelSampler;
exports["default"] = _default;
module.exports = exports.default;

},{}],147:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright (c) 2011 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @fileoverview A general purpose object proxy that logs all method calls.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

var Proxy = function Proxy(delegate) {
  var _this = this;
  this.delegate__ = delegate;
  this.calls__ = [];
  this.propertiesToTrack__ = [];
  var _loop = function _loop() {
    type = typeof delegate[propname]; // Functions are passed through to the delegate, and are logged
    // prior to the call.
    if (type == "function") {
      var makeFunc = function makeFunc(name) {
        return function () {
          this.log__(name, arguments);
          return this.delegate__[name].apply(this.delegate__, arguments);
        };
      };
      ;
      _this[propname] = makeFunc(propname);
    } else if (type == "string" || type == "number") {
      var makeSetter = function makeSetter(name) {
        return function (x) {
          this.delegate__[name] = x;
        };
      };
      var makeGetter = function makeGetter(name) {
        return function () {
          return this.delegate__[name];
        };
      };
      // String and number properties are just passed through to the delegate.
      _this.propertiesToTrack__.push(propname);
      ;
      _this.__defineSetter__(propname, makeSetter(propname));
      ;
      _this.__defineGetter__(propname, makeGetter(propname));
    }
  };
  for (var propname in delegate) {
    var type;
    _loop();
  }
};
Proxy.prototype.log__ = function (name, args) {
  var properties = {};
  for (var propIdx in this.propertiesToTrack__) {
    var prop = this.propertiesToTrack__[propIdx];
    properties[prop] = this.delegate__[prop];
  }
  var call = {
    name: name,
    args: args,
    properties: properties
  };
  this.calls__.push(call);
};
Proxy.reset = function (proxy) {
  proxy.calls__ = [];
};
var _default = Proxy;
exports["default"] = _default;
module.exports = exports.default;

},{}],148:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @fileoverview Utility functions for Dygraphs.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

var Util = {};

/**
 * Get the y-labels for a given axis.
 *
 * You can specify a parent if more than one graph is in the document.
 */
Util.getYLabels = function (axis_num, parent) {
  axis_num = axis_num || "";
  parent = parent || document;
  var y_labels = parent.getElementsByClassName("dygraph-axis-label-y" + axis_num);
  var ary = [];
  for (var i = 0; i < y_labels.length; i++) {
    ary.push(y_labels[i].innerHTML.replace(/&#160;|&nbsp;/g, ' '));
  }
  return ary;
};

/**
 * Get the x-labels for a given axis.
 *
 * You can specify a parent if more than one graph is in the document.
 */
Util.getXLabels = function (parent) {
  parent = parent || document;
  var x_labels = parent.getElementsByClassName("dygraph-axis-label-x");
  var ary = [];
  for (var i = 0; i < x_labels.length; i++) {
    ary.push(x_labels[i].innerHTML.replace(/&#160;|&nbsp;/g, ' '));
  }
  return ary;
};

/**
 * Returns all text in tags w/ a given css class, sorted.
 * You can specify a parent if more than one graph is on the document.
 */
Util.getClassTexts = function (css_class, parent) {
  parent = parent || document;
  var texts = [];
  var els = parent.getElementsByClassName(css_class);
  for (var i = 0; i < els.length; i++) {
    texts[i] = els[i].textContent;
  }
  texts.sort();
  return texts;
};

// Convert &nbsp; to a normal space
Util.nbspToSpace = function (str) {
  return str.replace(/ /g, ' ');
};
Util.getLegend = function (parent) {
  parent = parent || document;
  var legend = parent.getElementsByClassName("dygraph-legend")[0];
  return Util.nbspToSpace(legend.textContent);
};

/**
 * Assert that all elements have a certain style property.
 */
Util.assertStyleOfChildren = function (selector, property, expectedValue) {
  assert.isTrue(selector.length > 0);
  for (var idx = 0; idx < selector.length; idx++) {
    var child = selector[idx];
    assert.equal(expectedValue, window.getComputedStyle(child)[property]);
  }
};

/**
 * Takes in an array of strings and returns an array of floats.
 */
Util.makeNumbers = function (ary) {
  var ret = [];
  for (var i = 0; i < ary.length; i++) {
    ret.push(parseFloat(ary[i]));
  }
  return ret;
};

/**
 * Sample a pixel from the canvas.
 * Returns an [r, g, b, a] tuple where each values is in [0, 255].
 * This is _very_ slow! If you want to sample many pixels, use PixelSampler.
 */
Util.samplePixel = function (canvas, x, y) {
  var ctx = canvas.getContext("2d"); // bypasses Proxy if applied.

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var scale = utils.getContextPixelRatio(ctx);
  var i = 4 * (x * scale + imageData.width * y * scale);
  var d = imageData.data;
  return [d[i], d[i + 1], d[i + 2], d[i + 3]];
};

/**
 * Overrides the browser's built-in XMLHttpRequest with a mock.
 * Usage:
 *
 * var mockXhr = Util.overrideXMLHttpRequest(your_data);
 * ... call code that does an XHR ...
 * mockXhr.respond();  // restores default behavior.
 * ... do your assertions ...
 */
Util.overrideXMLHttpRequest = function (data) {
  var originalXMLHttpRequest = XMLHttpRequest;
  var requests = [];
  var FakeXMLHttpRequest = function FakeXMLHttpRequest() {
    requests.push(this);
  };
  FakeXMLHttpRequest.prototype.open = function () {};
  FakeXMLHttpRequest.prototype.send = function () {
    this.readyState = 4;
    this.status = 200;
    this.responseText = data;
  };
  FakeXMLHttpRequest.restore = function () {
    window.XMLHttpRequest = originalXMLHttpRequest;
  };
  FakeXMLHttpRequest.respond = function () {
    for (var i = 0; i < requests.length; i++) {
      requests[i].onreadystatechange();
    }
    FakeXMLHttpRequest.restore();
  };
  window.XMLHttpRequest = FakeXMLHttpRequest;
  return FakeXMLHttpRequest;
};

/**
 * Format a date as 2000/01/23
 * @param {number} dateMillis Millis since epoch.
 * @return {string} The date formatted as YYYY-MM-DD.
 */
Util.formatDate = function (dateMillis) {
  return utils.dateString_(dateMillis).slice(0, 10); // 10 == "YYYY/MM/DD".length
};

/**
 * Capture console.{log,warn,error} statements into obj.
 * obj will look like {log:[], warn:[], error:[]}
 * This returns a function which will restore the original console.
 */
Util.captureConsole = function (obj) {
  obj.log = [];
  obj.warn = [];
  obj.error = [];
  var orig = [console.log, console.warn, console.error];
  console.log = function (text) {
    obj.log.push(text);
  };
  console.warn = function (text) {
    obj.warn.push(text);
  };
  console.error = function (text) {
    obj.error.push(text);
  };
  return function () {
    console.log = orig[0];
    console.warn = orig[1];
    console.error = orig[2];
  };
};
var _default = Util;
exports["default"] = _default;
module.exports = exports.default;

},{"../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],149:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests relating to annotations
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("annotations", function () {
  cleanupAfterEach();
  it('testAnnotationsDrawn', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setAnnotations([{
      series: 'Y',
      x: 1,
      shortText: 'A',
      text: 'Long A',
      cssClass: 'ann1'
    }, {
      series: 'Y',
      x: 2,
      shortText: 'B',
      text: 'Long B',
      cssClass: 'ann2'
    }]);
    assert.equal(2, g.annotations().length);
    var a1 = document.getElementsByClassName('ann1');
    assert.equal(1, a1.length);
    a1 = a1[0];
    assert.equal('A', a1.textContent);
    var a2 = document.getElementsByClassName('ann2');
    assert.equal(1, a2.length);
    a2 = a2[0];
    assert.equal('B', a2.textContent);
  });

  // Some errors that should be flagged:
  // 1. Invalid series name (e.g. 'X' or 'non-existent')
  // 2. Passing a string as 'x' instead of a number (e.g. x: '1')

  it('testAnnotationsDontDisappearOnResize', function () {
    var opts = {};
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setAnnotations([{
      series: 'Y',
      x: 1,
      shortText: 'A',
      text: 'Long A',
      cssClass: 'ann1'
    }]);

    // Check that it displays at all
    assert.equal(1, g.annotations().length);
    var a1 = document.getElementsByClassName('ann1');
    assert.equal(1, a1.length);
    a1 = a1[0];
    assert.equal('A', a1.textContent);

    // ... and that resizing doesn't kill it.
    g.resize(400, 300);
    assert.equal(1, g.annotations().length);
    var a1 = document.getElementsByClassName('ann1');
    assert.equal(1, a1.length);
    a1 = a1[0];
    assert.equal('A', a1.textContent);
  });

  // Verify that annotations outside of the visible x-range are not shown.
  it('testAnnotationsOutOfRangeX', function () {
    var opts = {};
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setAnnotations([{
      series: 'Y',
      x: 1,
      shortText: 'A',
      text: 'Long A',
      cssClass: 'ann1'
    }]);

    // Check that it displays at all
    assert.equal(1, g.annotations().length);
    var a1 = document.getElementsByClassName('ann1');
    assert.equal(1, a1.length);
    a1 = a1[0];
    assert.equal('A', a1.textContent);

    // ... and that panning right removes the annotation.
    g.updateOptions({
      dateWindow: [2, 6]
    });
    assert.equal(1, g.annotations().length);
    a1 = document.getElementsByClassName('ann1');
    assert.equal(0, a1.length);

    // ... and that panning left brings it back.
    g.updateOptions({
      dateWindow: [0, 4]
    });
    assert.equal(1, g.annotations().length);
    a1 = document.getElementsByClassName('ann1');
    assert.equal(1, a1.length);
  });

  // Verify that annotations outside of the visible y-range are not shown.
  it('testAnnotationsOutOfRangeY', function () {
    var opts = {};
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setAnnotations([{
      series: 'Y',
      x: 1,
      shortText: 'A',
      text: 'Long A',
      cssClass: 'ann1'
    }]);

    // ... check that panning up removes the annotation.
    g.updateOptions({
      valueRange: [0.5, 2.5]
    });
    assert.equal(1, g.annotations().length);
    var a1 = document.getElementsByClassName('ann1');
    assert.equal(0, a1.length);

    // ... and that panning down brings it back.
    g.updateOptions({
      valueRange: [-1, 1]
    });
    assert.equal(1, g.annotations().length);
    a1 = document.getElementsByClassName('ann1');
    assert.equal(1, a1.length);
  });
  it('testAnnotationsDrawnInDrawCallback', function () {
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n";
    var graph = document.getElementById("graph");
    var calls = [];
    var g = new _dygraph["default"](graph, data, {
      width: 480,
      height: 320,
      drawCallback: function drawCallback(g, initial) {
        calls.push(initial);
        if (initial) {
          g.setAnnotations([{
            series: 'Y',
            x: 1,
            shortText: 'A',
            text: 'Long A'
          }]);
        }
      }
    });
    assert.deepEqual([true, false], calls);
  });

  // Test that annotations on the same point are stacked.
  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=256
  it('testAnnotationsStacked', function () {
    var data = 'X,Y1,Y2\n' + '0,1,2\n' + '1,2,3\n';
    var graph = document.getElementById("graph");
    var annotations = [{
      series: 'Y1',
      x: 0,
      shortText: '1',
      attachAtBottom: true
    }, {
      series: 'Y2',
      x: 0,
      shortText: '2',
      attachAtBottom: true
    }];
    var g = new _dygraph["default"](graph, data, {
      width: 480,
      height: 320
    });
    g.setAnnotations(annotations);
    var annEls = document.getElementsByClassName('dygraphDefaultAnnotation');
    assert.equal(2, annEls.length);
    assert.equal(annEls[0].offsetLeft, annEls[1].offsetLeft);
    assert(annEls[1].offsetTop < annEls[0].offsetTop - 10);
  });

  // Test the .ready() method, which is most often used with setAnnotations().
  it('testReady', function () {
    var data = 'X,Y1,Y2\n' + '0,1,2\n' + '1,2,3\n';
    var mockXhr = _Util["default"].overrideXMLHttpRequest(data);
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, "data.csv", {
      width: 480,
      height: 320
    });
    var ready_calls = 0;
    g.ready(function () {
      ready_calls++;
    });
    assert.equal(0, ready_calls);
    mockXhr.respond();
    assert.equal(1, ready_calls);

    // Make sure that ready isn't called on redraws.
    g.updateOptions({});
    assert.equal(1, ready_calls);

    // Or data changes.
    g.updateOptions({
      file: data
    });
    assert.equal(1, ready_calls);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./Util":148}],150:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _dygraphDefaultAttrs = _interopRequireDefault(require("../../src/dygraph-default-attrs"));
var _Util = _interopRequireDefault(require("./Util"));
var _custom_asserts = require("./custom_asserts");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for how axis labels are chosen and formatted.
 *
 * @author dan@dygraphs.com (Dan Vanderkam)
 */

describe("axis-labels", function () {
  cleanupAfterEach();
  var simpleData = "X,Y,Y2\n" + "0,-1,.5\n" + "1,0,.7\n" + "2,1,.4\n" + "3,0,.98\n";
  var kCloseFloat = 1.0e-10;
  it('testMinusOneToOne', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    // TODO(danvk): would ['-1.0','-0.5','0.0','0.5','1.0'] be better?
    assert.deepEqual(['-1', '-0.5', '0', '0.5', '1'], _Util["default"].getYLabels());

    // Go up to 2
    data += "4,2\n";
    g.updateOptions({
      file: data
    });
    assert.deepEqual(['-1', '-0.5', '0', '0.5', '1', '1.5', '2'], _Util["default"].getYLabels());

    // Now 10
    data += "5,10\n";
    g.updateOptions({
      file: data
    });
    assert.deepEqual(['-2', '0', '2', '4', '6', '8', '10'], _Util["default"].getYLabels());

    // Now 100
    data += "6,100\n";
    g.updateOptions({
      file: data
    });
    assert.deepEqual(['0', '20', '40', '60', '80', '100'], _Util["default"].getYLabels());
    g.setSelection(0);
    assert.equal('0: Y: -1', _Util["default"].getLegend());
  });
  it('testSmallRangeNearZero', function () {
    var opts = {
      drawAxesAtZero: true,
      width: 480,
      height: 320
    };
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    opts.valueRange = [-0.1, 0.1];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    (0, _custom_asserts.assertDeepCloseTo)([-0.1, -0.05, 0, 0.05], _Util["default"].makeNumbers(_Util["default"].getYLabels()), kCloseFloat);
    opts.valueRange = [-0.05, 0.05];
    g.updateOptions(opts);
    assert.deepEqual([-0.04, -0.02, 0, 0.02, 0.04], _Util["default"].makeNumbers(_Util["default"].getYLabels()));
    opts.valueRange = [-0.01, 0.01];
    g.updateOptions(opts);
    assert.deepEqual([-0.01, -0.005, 0, 0.005], _Util["default"].makeNumbers(_Util["default"].getYLabels()));
    g.setSelection(1);
    assert.equal('1: Y: 0', _Util["default"].getLegend());
  });
  it('testSmallRangeAwayFromZero', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    opts.valueRange = [9.9, 10.1];
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(["9.9", "9.92", "9.94", "9.96", "9.98", "10", "10.02", "10.04", "10.06", "10.08"], _Util["default"].getYLabels());
    opts.valueRange = [9.99, 10.01];
    g.updateOptions(opts);
    // TODO(danvk): this is bad
    assert.deepEqual(["9.99", "9.99", "9.99", "10", "10", "10", "10", "10", "10.01", "10.01"], _Util["default"].getYLabels());
    opts.valueRange = [9.999, 10.001];
    g.updateOptions(opts);
    // TODO(danvk): this is even worse!
    assert.deepEqual(["10", "10", "10", "10"], _Util["default"].getYLabels());
    g.setSelection(1);
    assert.equal('1: Y: 0', _Util["default"].getLegend());
  });
  it('testXAxisTimeLabelFormatter', function () {
    var opts = {
      width: 480,
      height: 320,
      labels: ['X', 'Y1']
    };
    var data = [[5.0, 0], [5.1, 1], [5.2, 2], [5.3, 3], [5.4, 4], [5.5, 5], [5.6, 6], [5.7, 7], [5.8, 8], [5.9, 9]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.updateOptions({
      axes: {
        x: {
          axisLabelFormatter: function axisLabelFormatter(totalMinutes) {
            var hours = Math.floor(totalMinutes / 60);
            var minutes = Math.floor(totalMinutes - hours * 60);
            var seconds = Math.round(totalMinutes * 60 - hours * 3600 - minutes * 60);
            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            return hours + ':' + minutes + ':' + seconds;
          }
        }
      }
    });
    assert.deepEqual(["00:05:00", "00:05:12", "00:05:24", "00:05:36", "00:05:48"], _Util["default"].getXLabels());

    // The legend does not use the axisLabelFormatter:
    g.setSelection(1);
    assert.equal('5.1: Y1: 1', _Util["default"].getLegend());
  });
  it('testAxisLabelFormatter', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          axisLabelFormatter: function axisLabelFormatter(x, granularity, opts, dg) {
            assert.equal('number', typeof x);
            assert.equal('number', typeof granularity);
            assert.equal('function', typeof opts);
            assert.equal('[Dygraph graph]', dg.toString());
            return 'x' + x;
          }
        },
        y: {
          axisLabelFormatter: function axisLabelFormatter(y, granularity, opts, dg) {
            assert.equal('number', typeof y);
            assert.equal('number', typeof granularity);
            assert.equal('function', typeof opts);
            assert.equal('[Dygraph graph]', dg.toString());
            return 'y' + y;
          }
        }
      },
      labels: ['x', 'y']
    };
    var data = [];
    for (var i = 0; i < 10; i++) {
      data.push([i, 2 * i]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(['x0', 'x2', 'x4', 'x6', 'x8'], _Util["default"].getXLabels());
    assert.deepEqual(["y0", "y5", "y10", "y15"], _Util["default"].getYLabels());
    g.setSelection(2);
    assert.equal("2: y: 4", _Util["default"].getLegend());
  });
  it('testDateAxisLabelFormatter', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          pixelsPerLabel: 60,
          axisLabelFormatter: function axisLabelFormatter(x, granularity, opts, dg) {
            assert.isTrue(utils.isDateLike(x));
            assert.equal('number', typeof granularity);
            assert.equal('function', typeof opts);
            assert.equal('[Dygraph graph]', dg.toString());
            return 'x' + _Util["default"].formatDate(x);
          }
        },
        y: {
          axisLabelFormatter: function axisLabelFormatter(y, granularity, opts, dg) {
            assert.equal('number', typeof y);
            assert.equal('number', typeof granularity);
            assert.equal('function', typeof opts);
            assert.equal('[Dygraph graph]', dg.toString());
            return 'y' + y;
          }
        }
      },
      labels: ['x', 'y']
    };
    var data = [];
    for (var i = 1; i < 10; i++) {
      data.push([new Date("2011/01/0" + i), 2 * i]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(["x2011/01/02", "x2011/01/04", "x2011/01/06", "x2011/01/08"], _Util["default"].getXLabels());
    assert.deepEqual(["y5", "y10", "y15"], _Util["default"].getYLabels());
    g.setSelection(0);
    assert.equal("2011/01/01: y: 2", _Util["default"].getLegend());
  });

  // This test verifies that when a valueFormatter is set (but not an
  // axisLabelFormatter), then the valueFormatter is used to format the axis
  // labels.
  it('testValueFormatter', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          valueFormatter: function valueFormatter(x, opts, series_name, dg, row, col) {
            assert.equal('number', typeof x);
            assert.equal('function', typeof opts);
            assert.equal('string', typeof series_name);
            assert.equal('[Dygraph graph]', dg.toString());
            assert.equal('number', typeof row);
            assert.equal('number', typeof col);
            assert.equal(dg, this);
            return 'x' + x;
          }
        },
        y: {
          valueFormatter: function valueFormatter(y, opts, series_name, dg, row, col) {
            assert.equal('number', typeof y);
            assert.equal('function', typeof opts);
            assert.equal('string', typeof series_name);
            assert.equal('[Dygraph graph]', dg.toString());
            assert.equal('number', typeof row);
            assert.equal('number', typeof col);
            assert.equal(dg, this);
            return 'y' + y;
          }
        }
      },
      labels: ['x', 'y']
    };
    var data = [];
    for (var i = 0; i < 10; i++) {
      data.push([i, 2 * i]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    // the valueFormatter options do not affect the ticks.
    assert.deepEqual(['0', '2', '4', '6', '8'], _Util["default"].getXLabels());
    assert.deepEqual(["0", "5", "10", "15"], _Util["default"].getYLabels());

    // they do affect the legend, however.
    g.setSelection(2);
    assert.equal("x2: y: y4", _Util["default"].getLegend());
  });
  it('testDateValueFormatter', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          pixelsPerLabel: 60,
          valueFormatter: function valueFormatter(x, opts, series_name, dg, row, col) {
            assert.equal('number', typeof x);
            assert.equal('function', typeof opts);
            assert.equal('string', typeof series_name);
            assert.equal('[Dygraph graph]', dg.toString());
            assert.equal('number', typeof row);
            assert.equal('number', typeof col);
            assert.equal(dg, this);
            return 'x' + _Util["default"].formatDate(x);
          }
        },
        y: {
          valueFormatter: function valueFormatter(y, opts, series_name, dg, row, col) {
            assert.equal('number', typeof y);
            assert.equal('function', typeof opts);
            assert.equal('string', typeof series_name);
            assert.equal('[Dygraph graph]', dg.toString());
            assert.equal('number', typeof row);
            assert.equal('number', typeof col);
            assert.equal(dg, this);
            return 'y' + y;
          }
        }
      },
      labels: ['x', 'y']
    };
    var data = [];
    for (var i = 1; i < 10; i++) {
      data.push([new Date("2011/01/0" + i), 2 * i]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    // valueFormatters do not affect ticks.
    assert.deepEqual(["02 Jan", "04 Jan", "06 Jan", "08 Jan"], _Util["default"].getXLabels());
    assert.deepEqual(["5", "10", "15"], _Util["default"].getYLabels());

    // the valueFormatter options also affect the legend.
    g.setSelection(2);
    assert.equal('x2011/01/03: y: y6', _Util["default"].getLegend());
  });

  // This test verifies that when both a valueFormatter and an axisLabelFormatter
  // are specified, the axisLabelFormatter takes precedence.
  it('testAxisLabelFormatterPrecedence', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          valueFormatter: function valueFormatter(x) {
            assert.equal('[Dygraph graph]', this.toString());
            return 'xvf' + x;
          },
          axisLabelFormatter: function axisLabelFormatter(x, granularity) {
            assert.equal('[Dygraph graph]', this.toString());
            return 'x' + x;
          }
        },
        y: {
          valueFormatter: function valueFormatter(y) {
            assert.equal('[Dygraph graph]', this.toString());
            return 'yvf' + y;
          },
          axisLabelFormatter: function axisLabelFormatter(y) {
            assert.equal('[Dygraph graph]', this.toString());
            return 'y' + y;
          }
        }
      },
      labels: ['x', 'y']
    };
    var data = [];
    for (var i = 0; i < 10; i++) {
      data.push([i, 2 * i]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(['x0', 'x2', 'x4', 'x6', 'x8'], _Util["default"].getXLabels());
    assert.deepEqual(["y0", "y5", "y10", "y15"], _Util["default"].getYLabels());
    g.setSelection(9);
    assert.equal("xvf9: y: yvf18", _Util["default"].getLegend());
  });

  // This is the same as the previous test, except that options are added
  // one-by-one.
  it('testAxisLabelFormatterIncremental', function () {
    var opts = {
      width: 480,
      height: 320,
      labels: ['x', 'y']
    };
    var data = [];
    for (var i = 0; i < 10; i++) {
      data.push([i, 2 * i]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.updateOptions({
      axes: {
        x: {
          valueFormatter: function valueFormatter(x) {
            return 'xvf' + x;
          }
        }
      }
    });
    g.updateOptions({
      axes: {
        y: {
          valueFormatter: function valueFormatter(y) {
            return 'yvf' + y;
          }
        }
      }
    });
    g.updateOptions({
      axes: {
        x: {
          axisLabelFormatter: function axisLabelFormatter(x, granularity) {
            return 'x' + x;
          }
        }
      }
    });
    g.updateOptions({
      axes: {
        y: {
          axisLabelFormatter: function axisLabelFormatter(y) {
            return 'y' + y;
          }
        }
      }
    });
    assert.deepEqual(["x0", "x2", "x4", "x6", "x8"], _Util["default"].getXLabels());
    assert.deepEqual(["y0", "y5", "y10", "y15"], _Util["default"].getYLabels());
    g.setSelection(9);
    assert.equal("xvf9: y: yvf18", _Util["default"].getLegend());
  });
  it('testGlobalFormatters', function () {
    var opts = {
      width: 480,
      height: 320,
      labels: ['x', 'y'],
      valueFormatter: function valueFormatter(x) {
        assert.equal('[Dygraph graph]', this);
        return 'vf' + x;
      },
      axisLabelFormatter: function axisLabelFormatter(x) {
        assert.equal('[Dygraph graph]', this);
        return 'alf' + x;
      }
    };
    var data = [];
    for (var i = 0; i < 10; i++) {
      data.push([i, 2 * i]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(['alf0', 'alf2', 'alf4', 'alf6', 'alf8'], _Util["default"].getXLabels());
    assert.deepEqual(["alf0", "alf5", "alf10", "alf15"], _Util["default"].getYLabels());
    g.setSelection(9);
    assert.equal("vf9: y: vf18", _Util["default"].getLegend());
  });
  it('testValueFormatterParameters', function () {
    var calls = [];
    // change any functions in list to 'fn' -- functions can't be asserted.
    var killFunctions = function killFunctions(list) {
      var out = [];
      for (var i = 0; i < list.length; i++) {
        if (typeof list[i] == 'function') {
          out[i] = 'fn';
        } else {
          out[i] = list[i];
        }
      }
      return out;
    };
    var taggedRecorder = function taggedRecorder(tag) {
      return function () {
        calls.push([tag].concat([this], killFunctions(arguments)));
        return '';
      };
    };
    var opts = {
      axes: {
        x: {
          valueFormatter: taggedRecorder('x')
        },
        y: {
          valueFormatter: taggedRecorder('y')
        },
        y2: {
          valueFormatter: taggedRecorder('y2')
        }
      },
      series: {
        'y1': {
          axis: 'y1'
        },
        'y2': {
          axis: 'y2'
        }
      },
      labels: ['x', 'y1', 'y2']
    };
    var data = [[0, 1, 2], [1, 3, 4]];
    var graph = document.getElementById('graph');
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual([], calls);
    g.setSelection(0);
    assert.deepEqual([
    // num or millis, opts, series, dygraph, row, col
    ['x', g, 0, 'fn', 'x', g, 0, 0], ['y', g, 1, 'fn', 'y1', g, 0, 1], ['y2', g, 2, 'fn', 'y2', g, 0, 2]], calls);
    calls = [];
    g.setSelection(1);
    assert.deepEqual([['x', g, 1, 'fn', 'x', g, 1, 0], ['y', g, 3, 'fn', 'y1', g, 1, 1], ['y2', g, 4, 'fn', 'y2', g, 1, 2]], calls);
  });
  it('testSeriesOrder', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "x,00,01,10,11\n" + "0,101,201,301,401\n" + "1,102,202,302,402\n" + "2,103,203,303,403\n" + "3,104,204,304,404\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setSelection(2);
    assert.equal('2: 00: 103 01: 203 10: 303 11: 403', _Util["default"].getLegend());

    // Sanity checks for indexFromSetName
    assert.equal(0, g.indexFromSetName("x"));
    assert.equal(1, g.indexFromSetName("00"));
    assert.equal(null, g.indexFromSetName("abcde"));

    // Verify that we get the label list back in the right order
    assert.deepEqual(["x", "00", "01", "10", "11"], g.getLabels());
  });
  it('testLabelKMB', function () {
    var data = [];
    data.push([0, 0]);
    data.push([1, 2000]);
    data.push([2, 1000]);
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['X', 'bar'],
      axes: {
        y: {
          labelsKMB: true
        }
      }
    });
    assert.deepEqual(["0", "500", "1k", "1.5k", "2k"], _Util["default"].getYLabels());
  });
  it('testLabelKMG2', function () {
    var data = [];
    data.push([0, 0]);
    data.push([1, 2000]);
    data.push([2, 1000]);
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['X', 'bar'],
      axes: {
        y: {
          labelsKMG2: true
        }
      }
    });
    assert.deepEqual(["0", "256", "512", "768", "1Ki", "1.25Ki", "1.5Ki", "1.75Ki", "2Ki"], _Util["default"].getYLabels());
  });

  // Same as testLabelKMG2 but specifies the option at the
  // top of the option dictionary.
  it('testLabelKMG2_top', function () {
    var data = [];
    data.push([0, 0]);
    data.push([1, 2000]);
    data.push([2, 1000]);
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['X', 'bar'],
      labelsKMG2: true
    });
    assert.deepEqual(["0", "256", "512", "768", "1Ki", "1.25Ki", "1.5Ki", "1.75Ki", "2Ki"], _Util["default"].getYLabels());
  });
  it('testSmallLabelKMB', function () {
    var data = [];
    data.push([0, 0]);
    data.push([1, 1e-6]);
    data.push([2, 2e-6]);
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['X', 'bar'],
      axes: {
        y: {
          labelsKMB: true
        }
      }
    });
    assert.deepEqual(['0', '500n', '1µ', '1.5µ', '2µ'], _Util["default"].getYLabels());
  });
  it('testSmallLabelKMG2', function () {
    var data = [];
    data.push([0, 0]);
    data.push([1, 1 * Math.pow(2, -20)]);
    data.push([2, 2 * Math.pow(2, -20)]);
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['X', 'bar'],
      axes: {
        y: {
          labelsKMG2: true
        }
      }
    });
    assert.deepEqual(['0', '256p-30', '512p-30', '768p-30', '1p-20', '1.25p-20', '1.5p-20', '1.75p-20', '2p-20'], _Util["default"].getYLabels());
  });
  it('testSmallLabelKMG2legacy', function () {
    var data = [];
    data.push([0, 0]);
    data.push([1, 1 * Math.pow(2, -20)]);
    data.push([2, 2 * Math.pow(2, -20)]);
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['X', 'bar'],
      axes: {
        y: {
          labelsKMB: true,
          labelsKMG2: true
        }
      }
    });
    assert.deepEqual(['0', '256n', '512n', '768n', '1µ', '1.25µ', '1.5µ', '1.75µ', '2µ'], _Util["default"].getYLabels());
  });

  /**
   * Verify that log scale axis range is properly specified.
   */
  it('testLogScale', function () {
    var g = new _dygraph["default"]("graph", [[0, 5], [1, 1000]], {
      logscale: true,
      labels: ['X', 'Y']
    });
    var nonEmptyLabels = _Util["default"].getYLabels().filter(function (x) {
      return x.length > 0;
    });
    assert.deepEqual(["5", "10", "20", "50", "100", "200", "500", "1000"], nonEmptyLabels);
    g.updateOptions({
      logscale: false
    });
    assert.deepEqual(['0', '200', '400', '600', '800', '1000'], _Util["default"].getYLabels());
  });

  /**
   * Verify that log scale axis range works with yRangePad.
   *
   * This is a regression test for https://github.com/danvk/dygraphs/issues/661 .
   */
  it('testLogScalePad', function () {
    var g = new _dygraph["default"]("graph", [[0, 1e-5], [1, 0.25], [2, 1], [3, 3], [4, 10]], {
      width: 250,
      height: 130,
      logscale: true,
      yRangePad: 30,
      axes: {
        y: {
          valueRange: [1, 10]
        }
      },
      labels: ['X', 'Y']
    });
    var nonEmptyLabels = _Util["default"].getYLabels().filter(function (x) {
      return x.length > 0;
    });
    assert.deepEqual(['1', '7', '30'], nonEmptyLabels);
    g.updateOptions({
      yRangePad: 10,
      axes: {
        y: {
          valueRange: [0.25005, 3]
        }
      }
    });
    nonEmptyLabels = _Util["default"].getYLabels().filter(function (x) {
      return x.length > 0;
    });
    assert.deepEqual(['0.4', '1', '3'], nonEmptyLabels);
    g.updateOptions({
      axes: {
        y: {
          valueRange: [0.01, 3]
        }
      }
    });
    nonEmptyLabels = _Util["default"].getYLabels().filter(function (x) {
      return x.length > 0;
    });
    assert.deepEqual(['0.01', '0.1', '0.7', '5'], nonEmptyLabels);
  });

  /**
   * Verify that include zero range is properly specified.
   */
  it('testIncludeZero', function () {
    var g = new _dygraph["default"]("graph", [[0, 500], [1, 1000]], {
      includeZero: true,
      labels: ['X', 'Y1']
    });
    assert.deepEqual(['0', '200', '400', '600', '800', '1000'], _Util["default"].getYLabels());
    g.updateOptions({
      includeZero: false
    });
    assert.deepEqual(['500', '600', '700', '800', '900', '1000'], _Util["default"].getYLabels());
  });
  it('testAxisLabelFontSize', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, simpleData, {});

    // Be sure we're dealing with a 14-point default.
    assert.equal(14, _dygraphDefaultAttrs["default"].axisLabelFontSize);
    var assertFontSize = function assertFontSize(selector, expected) {
      _Util["default"].assertStyleOfChildren(selector, "font-size", expected);
    };
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-x"), "14px");
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-y"), "14px");
    g.updateOptions({
      axisLabelFontSize: 8
    });
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-x"), "8px");
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-y"), "8px");
    g.updateOptions({
      axisLabelFontSize: null,
      axes: {
        x: {
          axisLabelFontSize: 5
        }
      }
    });
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-x"), "5px");
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-y"), "14px");
    g.updateOptions({
      axes: {
        y: {
          axisLabelFontSize: 20
        }
      }
    });
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-x"), "5px");
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-y"), "20px");
    g.updateOptions({
      series: {
        Y2: {
          axis: "y2"
        } // copy y2 series to y2 axis.
      },

      axes: {
        y2: {
          axisLabelFontSize: 12
        }
      }
    });
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-x"), "5px");
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-y1"), "20px");
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-y2"), "12px");
  });
  it('testAxisLabelFontSizeNull', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, simpleData, {
      axisLabelFontSize: null
    });
    var assertFontSize = function assertFontSize(selector, expected) {
      _Util["default"].assertStyleOfChildren(selector, "font-size", expected);
    };

    // Be sure we're dealing with a 14-point default.
    assert.equal(14, _dygraphDefaultAttrs["default"].axisLabelFontSize);
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-x"), "14px");
    assertFontSize(document.querySelectorAll(".dygraph-axis-label-y"), "14px");
  });

  /*
   * This test shows that the label formatter overrides labelsKMB for all values.
   */
  it('testLabelFormatterOverridesLabelsKMB', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "X,a,b\n" + "1,0,2000\n" + "2,500,1500\n" + "3,1000,1000\n" + "4,2000,0\n", {
      labelsKMB: true,
      axisLabelFormatter: function axisLabelFormatter(v) {
        return v + ":X";
      }
    });
    assert.deepEqual(["0:X", "500:X", "1000:X", "1500:X", "2000:X"], _Util["default"].getYLabels());
    assert.deepEqual(["1:X", "2:X", "3:X"], _Util["default"].getXLabels());
  });

  /*
   * This test shows that you can override labelsKMB on the axis level.
   */
  it('testLabelsKMBPerAxis', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "x,a,b\n" + "1000,0,2000\n" + "2000,500,1500\n" + "3000,1000,1000\n" + "4000,2000,0\n", {
      labelsKMB: false,
      axes: {
        y2: {
          labelsKMB: true
        },
        x: {
          labelsKMB: true
        }
      },
      series: {
        b: {
          axis: "y2"
        }
      }
    });

    // labelsKMB doesn't apply to the x axis. This value should be different.
    // BUG : https://code.google.com/p/dygraphs/issues/detail?id=488
    assert.deepEqual(["1000", "2000", "3000"], _Util["default"].getXLabels());
    assert.deepEqual(["0", "500", "1000", "1500", "2000"], _Util["default"].getYLabels(1));
    assert.deepEqual(["0", "500", "1k", "1.5k", "2k"], _Util["default"].getYLabels(2));
  });

  /*
   * This test shows that you can override labelsKMG2 on the axis level.
   */
  it('testLabelsKMG2PerAxis', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "x,a,b\n" + "1000,0,2000\n" + "2000,500,1500\n" + "3000,1000,1000\n" + "4000,2000,0\n", {
      labelsKMG2: false,
      axes: {
        y2: {
          labelsKMG2: true
        },
        x: {
          labelsKMG2: true,
          pixelsPerLabel: 60
        }
      },
      series: {
        b: {
          axis: "y2"
        }
      }
    });

    // It is weird that labelsKMG2 does something on the x axis but KMB does not.
    // Plus I can't be sure they're doing the same thing as they're done in different
    // bits of code.
    // BUG : https://code.google.com/p/dygraphs/issues/detail?id=488
    assert.deepEqual(["1024", "2048", "3072"], _Util["default"].getXLabels());
    assert.deepEqual(["0", "500", "1000", "1500", "2000"], _Util["default"].getYLabels(1));
    assert.deepEqual(["0", "500", "1000", "1.46Ki", "1.95Ki"], _Util["default"].getYLabels(2));
  });

  /**
   * This test shows you can override sigFigs on the axis level.
   */
  it('testSigFigsPerAxis', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "x,a,b\n" + "1000,0,2000\n" + "2000,500,1500\n" + "3000,1000,1000\n" + "4000,2000,0\n", {
      sigFigs: 2,
      axes: {
        y2: {
          sigFigs: 6
        },
        x: {
          sigFigs: 8
        }
      },
      series: {
        b: {
          axis: "y2"
        }
      }
    });
    // sigFigs doesn't apply to the x axis. This value should be different.
    // BUG : https://code.google.com/p/dygraphs/issues/detail?id=488
    assert.deepEqual(["1000", "2000", "3000"], _Util["default"].getXLabels());
    assert.deepEqual(["0.0", "5.0e+2", "1.0e+3", "1.5e+3", "2.0e+3"], _Util["default"].getYLabels(1));
    assert.deepEqual(["0.00000", "500.000", "1000.00", "1500.00", "2000.00"], _Util["default"].getYLabels(2));
  });

  /**
   * This test shows you can override digitsAfterDecimal on the axis level.
   */
  it('testDigitsAfterDecimalPerAxis', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "x,a,b\n" + "0.006,0.001,0.008\n" + "0.007,0.002,0.007\n" + "0.008,0.003,0.006\n" + "0.009,0.004,0.005\n", {
      digitsAfterDecimal: 1,
      series: {
        b: {
          axis: "y2"
        }
      }
    });
    g.updateOptions({
      axes: {
        y: {
          digitsAfterDecimal: 3
        }
      }
    });
    assert.deepEqual(["0.001", "0.002", "0.002", "0.003", "0.003", "0.004", "0.004"], _Util["default"].getYLabels(1));
    g.updateOptions({
      axes: {
        y: {
          digitsAfterDecimal: 4
        }
      }
    });
    assert.deepEqual(["0.001", "0.0015", "0.002", "0.0025", "0.003", "0.0035", "0.004"], _Util["default"].getYLabels(1));
    g.updateOptions({
      axes: {
        y: {
          digitsAfterDecimal: 5
        }
      }
    });
    assert.deepEqual(["0.001", "0.0015", "0.002", "0.0025", "0.003", "0.0035", "0.004"], _Util["default"].getYLabels(1));
    g.updateOptions({
      axes: {
        y: {
          digitsAfterDecimal: null
        }
      }
    });
    assert.deepEqual(["1e-3", "2e-3", "2e-3", "3e-3", "3e-3", "4e-3", "4e-3"], _Util["default"].getYLabels(1));
    g.updateOptions({
      axes: {
        y2: {
          digitsAfterDecimal: 3
        }
      }
    });
    assert.deepEqual(["0.005", "0.006", "0.006", "0.007", "0.007", "0.008", "0.008"], _Util["default"].getYLabels(2));
    g.updateOptions({
      axes: {
        y2: {
          digitsAfterDecimal: 4
        }
      }
    });
    assert.deepEqual(["0.005", "0.0055", "0.006", "0.0065", "0.007", "0.0075", "0.008"], _Util["default"].getYLabels(2));
    g.updateOptions({
      axes: {
        y2: {
          digitsAfterDecimal: 5
        }
      }
    });
    assert.deepEqual(["0.005", "0.0055", "0.006", "0.0065", "0.007", "0.0075", "0.008"], _Util["default"].getYLabels(2));
    g.updateOptions({
      axes: {
        y2: {
          digitsAfterDecimal: null
        }
      }
    });
    assert.deepEqual(["5e-3", "6e-3", "6e-3", "7e-3", "7e-3", "7e-3", "8e-3"], _Util["default"].getYLabels(2));

    // digitsAfterDecimal is ignored for the x-axis.
    // BUG : https://code.google.com/p/dygraphs/issues/detail?id=488
    g.updateOptions({
      axes: {
        x: {
          digitsAfterDecimal: 3
        }
      }
    });
    assert.deepEqual(["0.006", "0.007", "0.008"], _Util["default"].getXLabels());
    g.updateOptions({
      axes: {
        x: {
          digitsAfterDecimal: 4
        }
      }
    });
    assert.deepEqual(["0.006", "0.007", "0.008"], _Util["default"].getXLabels());
    g.updateOptions({
      axes: {
        x: {
          digitsAfterDecimal: 5
        }
      }
    });
    assert.deepEqual(["0.006", "0.007", "0.008"], _Util["default"].getXLabels());
    g.updateOptions({
      axes: {
        x: {
          digitsAfterDecimal: null
        }
      }
    });
    assert.deepEqual(["0.006", "0.007", "0.008"], _Util["default"].getXLabels());
  });

  /**
   * This test shows you can override digitsAfterDecimal on the axis level.
   */
  it('testMaxNumberWidthPerAxis', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "x,a,b\n" + "12401,12601,12804\n" + "12402,12602,12803\n" + "12403,12603,12802\n" + "12404,12604,12801\n", {
      maxNumberWidth: 1,
      series: {
        b: {
          axis: "y2"
        }
      }
    });
    g.updateOptions({
      axes: {
        y: {
          maxNumberWidth: 4
        }
      }
    });
    assert.deepEqual(["1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4"], _Util["default"].getYLabels(1));
    g.updateOptions({
      axes: {
        y: {
          maxNumberWidth: 5
        }
      }
    });
    assert.deepEqual(["12601", "12601.5", "12602", "12602.5", "12603", "12603.5", "12604"], _Util["default"].getYLabels(1));
    g.updateOptions({
      axes: {
        y: {
          maxNumberWidth: null
        }
      }
    });
    assert.deepEqual(["1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4", "1.26e+4"], _Util["default"].getYLabels(1));
    g.updateOptions({
      axes: {
        y2: {
          maxNumberWidth: 4
        }
      }
    });
    assert.deepEqual(["1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4"], _Util["default"].getYLabels(2));
    g.updateOptions({
      axes: {
        y2: {
          maxNumberWidth: 5
        }
      }
    });
    assert.deepEqual(["12801", "12801.5", "12802", "12802.5", "12803", "12803.5", "12804"], _Util["default"].getYLabels(2));
    g.updateOptions({
      axes: {
        y2: {
          maxNumberWidth: null
        }
      }
    });
    assert.deepEqual(["1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4", "1.28e+4"], _Util["default"].getYLabels(2));

    // maxNumberWidth is ignored for the x-axis.
    // BUG : https://code.google.com/p/dygraphs/issues/detail?id=488
    g.updateOptions({
      axes: {
        x: {
          maxNumberWidth: 4
        }
      }
    });
    assert.deepEqual(["12401", "12402", "12403"], _Util["default"].getXLabels());
    g.updateOptions({
      axes: {
        x: {
          maxNumberWidth: 5
        }
      }
    });
    assert.deepEqual(["12401", "12402", "12403"], _Util["default"].getXLabels());
    g.updateOptions({
      axes: {
        x: {
          maxNumberWidth: null
        }
      }
    });
    assert.deepEqual(["12401", "12402", "12403"], _Util["default"].getXLabels());
  });

  /*
  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=147
  // Checks that axis labels stay sane across a DST change.
  it('testLabelsCrossDstChange', function() {
    // (From tests/daylight-savings.html)
    var g = new Dygraph(
        document.getElementById("graph"),
        "Date/Time,Purchases\n" +
        "2010-11-05 00:00:00,167082\n" +
        "2010-11-06 00:00:00,168571\n" +
        "2010-11-07 00:00:00,177796\n" +
        "2010-11-08 00:00:00,165587\n" +
        "2010-11-09 00:00:00,164380\n",
        { width: 1024 }
        );
  
    // Dates and "nice" hours: 6AM/PM and noon, not 5AM/11AM/...
    var okLabels = {
      '05Nov': true,
      '06Nov': true,
      '07Nov': true,
      '08Nov': true,
      '09Nov': true,
      '06:00': true,
      '12:00': true,
      '18:00': true
    };
  
    var xLabels = Util.getXLabels();
    for (var i = 0; i < xLabels.length; i++) {
      assert.isTrue(okLabels[xLabels[i]]);
    }
  
    // This range had issues of its own on tests/daylight-savings.html.
    g.updateOptions({
      dateWindow: [1289109997722.8127, 1289261208937.7659]
    });
    xLabels = Util.getXLabels();
    for (var i = 0; i < xLabels.length; i++) {
      assert.isTrue(okLabels[xLabels[i]]);
    }
  });
  
  // Tests data which crosses a "fall back" at a high enough frequency that you
  // can see both 1:00 A.M.s.
  it('testLabelsCrossDstChangeHighFreq', function() {
    // Generate data which crosses the EST/EDT boundary.
    var dst_data = [];
    var base_ms = 1383454200000;
    for (var x = base_ms; x < base_ms + 1000 * 60 * 80; x += 1000) {
      dst_data.push([new Date(x), x]);
    }
  
    var g = new Dygraph(
            document.getElementById("graph"),
            dst_data,
        { width: 1024, labels: ['Date', 'Value'] }
        );
  
    assert.deepEqual([
      '00:50', '00:55',
      '01:00', '01:05', '01:10', '01:15', '01:20', '01:25',
      '01:30', '01:35', '01:40', '01:45', '01:50', '01:55',
      '01:00', '01:05'  // 1 AM number two!
    ], Util.getXLabels());
  
    // Now zoom past the initial 1 AM. This used to cause trouble.
    g.updateOptions({
      dateWindow: [1383454200000 + 15*60*1000, g.xAxisExtremes()[1]]}
    );
    assert.deepEqual([
      '01:05', '01:10', '01:15', '01:20', '01:25',
      '01:30', '01:35', '01:40', '01:45', '01:50', '01:55',
      '01:00', '01:05'  // 1 AM number two!
    ], Util.getXLabels());
  });
  
  // Tests data which crosses a "spring forward" at a low frequency.
  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=433
  it('testLabelsCrossSpringForward', function() {
    var g = new Dygraph(
        document.getElementById("graph"),
        "Date/Time,Purchases\n" +
        "2011-03-11 00:00:00,167082\n" +
        "2011-03-12 00:00:00,168571\n" +
        "2011-03-13 00:00:00,177796\n" +
        "2011-03-14 00:00:00,165587\n" +
        "2011-03-15 00:00:00,164380\n",
        {
          width: 1024,
          dateWindow: [1299989043119.4365, 1300080693627.4866]
        });
  
    var okLabels = {
      '13Mar': true,
      // '02:00': true,  // not a real time!
      '04:00': true,
      '06:00': true,
      '08:00': true,
      '10:00': true,
      '12:00': true,
      '14:00': true,
      '16:00': true,
      '18:00': true,
      '20:00': true,
      '22:00': true,
      '14Mar': true
    };
  
    var xLabels = Util.getXLabels();
    for (var i = 0; i < xLabels.length; i++) {
      assert.isTrue(okLabels[xLabels[i]]);
    }
  });
  
  it('testLabelsCrossSpringForwardHighFreq', function() {
    var base_ms_spring = 1299999000000;
    var dst_data_spring = [];
    for (var x = base_ms_spring; x < base_ms_spring + 1000 * 60 * 80; x += 1000) {
      dst_data_spring.push([new Date(x), x]);
    }
  
    var g = new Dygraph(
        document.getElementById("graph"),
        dst_data_spring,
        { width: 1024, labels: ['Date', 'Value'] }
    );
  
    assert.deepEqual([
      '01:50', '01:55',
      '03:00', '03:05', '03:10', '03:15', '03:20', '03:25',
      '03:30', '03:35', '03:40', '03:45', '03:50', '03:55',
      '04:00', '04:05'
    ], Util.getXLabels());
  });
  */
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-default-attrs":"dygraphs/src/dygraph-default-attrs.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./Util":148,"./custom_asserts":154}],151:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Util = _interopRequireDefault(require("./Util"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for the callbacks.
 *
 * @author uemit.seren@gmail.com (Ümit Seren)
 */

describe("callback", function () {
  cleanupAfterEach();
  var xhr, styleSheet;
  var graph;
  beforeEach(function () {
    var container = document.getElementById('graph');
    container.innerHTML = "<div id='inner-graph'></div><div id='selection'></div>";
    graph = container.querySelector('#inner-graph');
    xhr = XMLHttpRequest;
    styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(styleSheet);
  });
  afterEach(function () {
    window.XMLHttpRequest = xhr;
  });
  var data = "X,a,b,c\n" + "10,-1,1,2\n" + "11,0,3,1\n" + "12,1,4,2\n" + "13,0,2,3\n";

  /**
   * This tests that when the function idxToRow_ returns the proper row and the onHiglightCallback
   * is properly called when the  first series is hidden (setVisibility = false)
   *
   */
  it('testHighlightCallbackIsCalled', function () {
    var h_row;
    var h_pts;
    var highlightCallback = function highlightCallback(e, x, pts, row) {
      assert.equal(g, this);
      h_row = row;
      h_pts = pts;
    };
    var g = new _dygraph["default"](graph, data, {
      width: 100,
      height: 100,
      visibility: [false, true, true],
      highlightCallback: highlightCallback
    });
    _DygraphOps["default"].dispatchMouseMove(g, 13, 10);

    //check correct row is returned
    assert.equal(3, h_row);
    //check there are only two points (because first series is hidden)
    assert.equal(2, h_pts.length);
  });

  /**
   * Test that drawPointCallback isn't called when drawPoints is false
   */
  it('testDrawPointCallback_disabled', function () {
    var called = false;
    var callback = function callback() {
      assert.equal(g, this);
      called = true;
    };
    var g = new _dygraph["default"](graph, data, {
      drawPointCallback: callback
    });
    assert.isFalse(called);
  });

  /**
   * Test that drawPointCallback is called when drawPoints is true
   */
  it('testDrawPointCallback_enabled', function () {
    var called = false;
    var callbackThis = null;
    var callback = function callback() {
      callbackThis = this;
      called = true;
    };
    var g = new _dygraph["default"](graph, data, {
      drawPoints: true,
      drawPointCallback: callback
    });
    assert.isTrue(called);
    assert.equal(g, callbackThis);
  });

  /**
   * Test that drawPointCallback is called when drawPoints is true
   */
  it('testDrawPointCallback_pointSize', function () {
    var pointSize = 0;
    var count = 0;
    var callback = function callback(g, seriesName, canvasContext, cx, cy, color, pointSizeParam) {
      assert.equal(g, this);
      pointSize = pointSizeParam;
      count++;
    };
    var g = new _dygraph["default"](graph, data, {
      drawPoints: true,
      drawPointCallback: callback
    });
    assert.equal(1.5, pointSize);
    assert.equal(12, count); // one call per data point.

    var g = new _dygraph["default"](graph, data, {
      drawPoints: true,
      drawPointCallback: callback,
      pointSize: 8
    });
    assert.equal(8, pointSize);
  });

  /**
   * Test that drawPointCallback is called for isolated points when
   * drawPoints is false, and also for gap points if that's enabled.
   */
  it('testDrawPointCallback_isolated', function () {
    var xvalues = [];
    var g;
    var callback = function callback(g, seriesName, canvasContext, cx, cy, color, pointSizeParam) {
      assert.equal(g, this);
      var dx = g.toDataXCoord(cx);
      xvalues.push(dx);
      utils.Circles.DEFAULT.apply(this, arguments);
    };
    var testdata = [[10, 2], [11, 3], [12, NaN], [13, 2], [14, NaN], [15, 3]];
    var graphOpts = {
      labels: ['X', 'Y'],
      valueRange: [0, 4],
      drawPoints: false,
      drawPointCallback: callback,
      pointSize: 8
    };

    // Test that isolated points get drawn
    g = new _dygraph["default"](graph, testdata, graphOpts);
    assert.equal(2, xvalues.length);
    assert.equal(13, xvalues[0]);
    assert.equal(15, xvalues[1]);

    // Test that isolated points + gap points get drawn when
    // drawGapEdgePoints is set.  This should add one point at the right
    // edge of the segment at x=11, but not at the graph edge at x=10.
    xvalues = []; // Reset for new test
    graphOpts.drawGapEdgePoints = true;
    g = new _dygraph["default"](graph, testdata, graphOpts);
    assert.equal(3, xvalues.length);
    assert.equal(11, xvalues[0]);
    assert.equal(13, xvalues[1]);
    assert.equal(15, xvalues[2]);
  });

  /**
   * This tests that when the function idxToRow_ returns the proper row and the onHiglightCallback
   * is properly called when the first series is hidden (setVisibility = false)
   *
   */
  it('testDrawHighlightPointCallbackIsCalled', function () {
    var called = false;
    var drawHighlightPointCallback = function drawHighlightPointCallback() {
      assert.equal(g, this);
      called = true;
    };
    var g = new _dygraph["default"](graph, data, {
      width: 100,
      height: 100,
      drawHighlightPointCallback: drawHighlightPointCallback
    });
    assert.isFalse(called);
    _DygraphOps["default"].dispatchMouseMove(g, 13, 10);
    assert.isTrue(called);
  });

  /**
   * Test the closest-series highlighting methods for normal and stacked modes.
   * Also pass in line widths for plain and highlighted lines for easier visual
   * confirmation that the highlighted line is drawn on top of the others.
   */
  var runClosestTest = function runClosestTest(isStacked, widthNormal, widthHighlighted) {
    var h_row;
    var h_pts;
    var h_series;
    var g = new _dygraph["default"](graph, data, {
      width: 600,
      height: 400,
      visibility: [false, true, true],
      stackedGraph: isStacked,
      strokeWidth: widthNormal,
      strokeBorderWidth: 2,
      highlightCircleSize: widthNormal * 2,
      highlightSeriesBackgroundAlpha: 0.3,
      highlightSeriesOpts: {
        strokeWidth: widthHighlighted,
        highlightCircleSize: widthHighlighted * 2
      }
    });
    var highlightCallback = function highlightCallback(e, x, pts, row, set) {
      assert.equal(g, this);
      h_row = row;
      h_pts = pts;
      h_series = set;
      document.getElementById('selection').innerHTML = 'row=' + row + ', set=' + set;
    };
    g.updateOptions({
      highlightCallback: highlightCallback
    }, true);
    if (isStacked) {
      _DygraphOps["default"].dispatchMouseMove(g, 11.45, 1.4);
      assert.equal(1, h_row);
      assert.equal('c', h_series);

      //now move up in the same row
      _DygraphOps["default"].dispatchMouseMove(g, 11.45, 1.5);
      assert.equal(1, h_row);
      assert.equal('b', h_series);

      //and a bit to the right
      _DygraphOps["default"].dispatchMouseMove(g, 11.55, 1.5);
      assert.equal(2, h_row);
      assert.equal('c', h_series);
    } else {
      _DygraphOps["default"].dispatchMouseMove(g, 11, 1.5);
      assert.equal(1, h_row);
      assert.equal('c', h_series);

      //now move up in the same row
      _DygraphOps["default"].dispatchMouseMove(g, 11, 2.5);
      assert.equal(1, h_row);
      assert.equal('b', h_series);
    }
    return g;
  };

  /**
   * Test basic closest-point highlighting.
   */
  it('testClosestPointCallback', function () {
    runClosestTest(false, 1, 3);
  });

  /**
   * Test setSelection() with series name
   */
  it('testSetSelection', function () {
    var g = runClosestTest(false, 1, 3);
    assert.equal(1, g.attr_('strokeWidth', 'c'));
    g.setSelection(false, 'c');
    assert.equal(3, g.attr_('strokeWidth', 'c'));
  });

  /**
   * Test closest-point highlighting for stacked graph
   */
  it('testClosestPointStackedCallback', function () {
    runClosestTest(true, 1, 3);
  });

  /**
   * Closest-point highlighting with legend CSS - border around active series.
   */
  it('testClosestPointCallbackCss1', function () {
    var css = "div.dygraph-legend > span { display: block; }\n" + "div.dygraph-legend > span.highlight { border: 1px solid grey; }\n";
    styleSheet.innerHTML = css;
    runClosestTest(false, 2, 4);
    styleSheet.innerHTML = '';
  });

  /**
   * Closest-point highlighting with legend CSS - show only closest series.
   */
  it('testClosestPointCallbackCss2', function () {
    var css = "div.dygraph-legend > span { display: none; }\n" + "div.dygraph-legend > span.highlight { display: inline; }\n";
    styleSheet.innerHTML = css;
    runClosestTest(false, 10, 15);
    styleSheet.innerHTML = '';
    // TODO(klausw): verify that the highlighted line is drawn on top?
  });

  /**
   * Closest-point highlighting with locked series.
   */
  it('testSetSelectionLocking', function () {
    var g = runClosestTest(false, 2, 4);

    // Default behavior, 'b' is closest
    _DygraphOps["default"].dispatchMouseMove(g, 11, 4);
    assert.equal('b', g.getHighlightSeries());

    // Now lock selection to 'c'
    g.setSelection(false, 'c', true);
    _DygraphOps["default"].dispatchMouseMove(g, 11, 4);
    assert.equal('c', g.getHighlightSeries());

    // Unlock, should be back to 'b'
    g.clearSelection();
    _DygraphOps["default"].dispatchMouseMove(g, 11, 4);
    assert.equal('b', g.getHighlightSeries());
  });

  /**
   * This tests that closest point searches work for data containing NaNs.
   *
   * It's intended to catch a regression where a NaN Y value confuses the
   * closest-point algorithm, treating it as closer as any previous point.
   */
  it('testNaNData', function () {
    var dataNaN = [[9, -1, NaN, NaN], [10, -1, 1, 2], [11, 0, 3, 1], [12, 1, 4, NaN], [13, 0, 2, 3], [14, -1, 1, 4]];
    var h_row;
    var h_pts;
    var highlightCallback = function highlightCallback(e, x, pts, row) {
      assert.equal(g, this);
      h_row = row;
      h_pts = pts;
    };
    var g = new _dygraph["default"](graph, dataNaN, {
      width: 600,
      height: 400,
      labels: ['x', 'a', 'b', 'c'],
      visibility: [false, true, true],
      highlightCallback: highlightCallback
    });
    _DygraphOps["default"].dispatchMouseMove(g, 10.1, 0.9);
    //check correct row is returned
    assert.equal(1, h_row);

    // Explicitly test closest point algorithms
    var dom = g.toDomCoords(10.1, 0.9);
    assert.equal(1, g.findClosestRow(dom[0]));
    var res = g.findClosestPoint(dom[0], dom[1]);
    assert.equal(1, res.row);
    assert.equal('b', res.seriesName);
    res = g.findStackedPoint(dom[0], dom[1]);
    assert.equal(1, res.row);
    assert.equal('c', res.seriesName);
  });

  /**
   * This tests that stacked point searches work for data containing NaNs.
   */
  it('testNaNDataStack', function () {
    var dataNaN = [[9, -1, NaN, NaN], [10, -1, 1, 2], [11, 0, 3, 1], [12, 1, NaN, 2], [13, 0, 2, 3], [14, -1, 1, 4], [15, 0, 2, NaN], [16, 1, 1, 3], [17, 1, NaN, 3], [18, 0, 2, 5], [19, 0, 1, 4]];
    var h_row;
    var h_pts;
    var highlightCallback = function highlightCallback(e, x, pts, row) {
      assert.equal(g, this);
      h_row = row;
      h_pts = pts;
    };
    var g = new _dygraph["default"](graph, dataNaN, {
      width: 600,
      height: 400,
      labels: ['x', 'a', 'b', 'c'],
      visibility: [false, true, true],
      stackedGraph: true,
      highlightCallback: highlightCallback
    });
    _DygraphOps["default"].dispatchMouseMove(g, 10.1, 0.9);
    //check correct row is returned
    assert.equal(1, h_row);

    // Explicitly test stacked point algorithm.
    var dom = g.toDomCoords(10.1, 0.9);
    var res = g.findStackedPoint(dom[0], dom[1]);
    assert.equal(1, res.row);
    assert.equal('c', res.seriesName);

    // All-NaN area at left, should get no points.
    dom = g.toDomCoords(9.1, 0.9);
    res = g.findStackedPoint(dom[0], dom[1]);
    assert.equal(0, res.row);
    assert.equal(undefined, res.seriesName);

    // First gap, get 'c' since it's non-NaN.
    dom = g.toDomCoords(12.1, 0.9);
    res = g.findStackedPoint(dom[0], dom[1]);
    assert.equal(3, res.row);
    assert.equal('c', res.seriesName);

    // Second gap, get 'b' since 'c' is NaN.
    dom = g.toDomCoords(15.1, 0.9);
    res = g.findStackedPoint(dom[0], dom[1]);
    assert.equal(6, res.row);
    assert.equal('b', res.seriesName);

    // Isolated points should work, finding series b in this case.
    dom = g.toDomCoords(15.9, 3.1);
    res = g.findStackedPoint(dom[0], dom[1]);
    assert.equal(7, res.row);
    assert.equal('b', res.seriesName);
  });
  it('testGapHighlight', function () {
    var dataGap = [[1, null, 3], [2, 2, null], [3, null, 5], [4, 4, null], [5, null, 7], [6, NaN, null], [8, 8, null], [10, 10, null]];
    var h_row;
    var h_pts;
    var highlightCallback = function highlightCallback(e, x, pts, row) {
      assert.equal(g, this);
      h_row = row;
      h_pts = pts;
    };
    var g = new _dygraph["default"](graph, dataGap, {
      width: 400,
      height: 300,
      //stackedGraph: true,
      connectSeparatedPoints: true,
      drawPoints: true,
      labels: ['x', 'A', 'B'],
      highlightCallback: highlightCallback
    });
    _DygraphOps["default"].dispatchMouseMove(g, 1.1, 10);
    //point from series B
    assert.equal(0, h_row);
    assert.equal(1, h_pts.length);
    assert.equal(3, h_pts[0].yval);
    assert.equal('B', h_pts[0].name);
    _DygraphOps["default"].dispatchMouseMove(g, 6.1, 10);
    // A is NaN at x=6
    assert.equal(1, h_pts.length);
    assert(isNaN(h_pts[0].yval));
    assert.equal('A', h_pts[0].name);
    _DygraphOps["default"].dispatchMouseMove(g, 8.1, 10);
    //point from series A
    assert.equal(6, h_row);
    assert.equal(1, h_pts.length);
    assert.equal(8, h_pts[0].yval);
    assert.equal('A', h_pts[0].name);
  });
  it('testFailedResponse', function () {
    // Fake out the XMLHttpRequest so it doesn't do anything.
    XMLHttpRequest = function XMLHttpRequest() {};
    XMLHttpRequest.prototype.open = function () {};
    XMLHttpRequest.prototype.send = function () {};
    var highlightCallback = function highlightCallback(e, x, pts, row) {
      throw "should not reach here";
    };
    graph.style.border = "2px solid black";
    var g = new _dygraph["default"](graph, "data.csv", {
      // fake name
      width: 400,
      height: 300,
      highlightCallback: highlightCallback
    });
    _DygraphOps["default"].dispatchMouseOver_Point(g, 800, 800);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 800, 800);
    var oldOnerror = window.onerror;
    var failed = false;
    window.onerror = function () {
      failed = true;
      return false;
    };
    _DygraphOps["default"].dispatchMouseOut_Point(g, 800, 800); // This call should not throw an exception.

    assert.isFalse(failed, "exception thrown during mouseout");
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=355
  it('testHighlightCallbackRow', function () {
    var highlightRow;
    var highlightCallback = function highlightCallback(e, x, pts, row) {
      assert.equal(g, this);
      highlightRow = row;
    };
    var g = new _dygraph["default"](graph, "X,Y,Z\n" + "0,1,2\n" +
    // 0
    "1,2,3\n" +
    // 100
    "2,3,4\n" +
    // 200
    "3,4,5\n" +
    // 300
    "4,5,6\n",
    // 400
    {
      // fake name
      width: 400,
      height: 300,
      highlightCallback: highlightCallback
    });

    // Mouse over each of the points
    _DygraphOps["default"].dispatchMouseOver_Point(g, 0, 0);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 0, 0);
    assert.equal(0, highlightRow);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 100, 0);
    assert.equal(1, highlightRow);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 200, 0);
    assert.equal(2, highlightRow);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 300, 0);
    assert.equal(3, highlightRow);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 400, 0);
    assert.equal(4, highlightRow);

    // Now zoom and verify that the row numbers still refer to rows in the data
    // array.
    g.updateOptions({
      dateWindow: [2, 4]
    });
    _DygraphOps["default"].dispatchMouseOver_Point(g, 0, 0);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 0, 0);
    assert.equal(2, highlightRow);
    assert.equal('2: Y: 3 Z: 4', _Util["default"].getLegend());
  });

  /**
   * Test that underlay callback is called even when there are no series,
   * and that the y axis ranges are not NaN.
   */
  it('testUnderlayCallback_noSeries', function () {
    var called = false;
    var yMin, yMax;
    var callback = function callback(canvas, area, g) {
      assert.equal(g, this);
      called = true;
      yMin = g.yAxisRange(0)[0];
      yMax = g.yAxisRange(0)[1];
    };
    var g = new _dygraph["default"](graph, "\n", {
      underlayCallback: callback
    });
    assert.isTrue(called);
    assert.isFalse(isNaN(yMin));
    assert.isFalse(isNaN(yMax));
  });

  /**
   * Test that underlay callback receives the correct y-axis range.
   */
  it('testUnderlayCallback_yAxisRange', function () {
    var called = false;
    var yMin, yMax;
    var callback = function callback(canvas, area, g) {
      assert.equal(g, this);
      yMin = g.yAxisRange(0)[0];
      yMax = g.yAxisRange(0)[1];
    };
    var g = new _dygraph["default"](graph, "\n", {
      valueRange: [0, 10],
      underlayCallback: callback
    });
    assert.equal(0, yMin);
    assert.equal(10, yMax);
  });

  /**
   * Test that drawPointCallback is called for isolated points and correct idx for the point is returned.
   */
  it('testDrawPointCallback_idx', function () {
    var indices = [];
    var g;
    var callback = function callback(g, seriesName, canvasContext, cx, cy, color, pointSizeParam, idx) {
      assert.equal(g, this);
      indices.push(idx);
      utils.Circles.DEFAULT.apply(this, arguments);
    };
    var testdata = [[10, 2], [11, 3], [12, NaN], [13, 2], [14, NaN], [15, 3]];
    var graphOpts = {
      labels: ['X', 'Y'],
      valueRange: [0, 4],
      drawPoints: false,
      drawPointCallback: callback,
      pointSize: 8
    };

    // Test that correct idx for isolated points are passed to the callback.
    g = new _dygraph["default"](graph, testdata, graphOpts);
    assert.equal(2, indices.length);
    assert.deepEqual([3, 5], indices);

    // Test that correct indices for isolated points + gap points are passed to the callback when
    // drawGapEdgePoints is set.  This should add one point at the right
    // edge of the segment at x=11, but not at the graph edge at x=10.
    indices = []; // Reset for new test
    graphOpts.drawGapEdgePoints = true;
    g = new _dygraph["default"](graph, testdata, graphOpts);
    assert.equal(3, indices.length);
    assert.deepEqual([1, 3, 5], indices);

    //Test that correct indices are passed to the callback when zoomed in.
    indices = []; // Reset for new test
    graphOpts.dateWindow = [12.5, 13.5];
    graphOpts.drawPoints = true;
    testdata = [[10, 2], [11, 3], [12, 4], [13, 2], [14, 5], [15, 3]];
    g = new _dygraph["default"](graph, testdata, graphOpts);
    assert.equal(3, indices.length);
    assert.deepEqual([2, 3, 4], indices);
  });

  /**
   * Test that the correct idx is returned for the point in the onHiglightCallback.
   */
  it('testDrawHighlightPointCallback_idx', function () {
    var idxToCheck = null;
    var drawHighlightPointCallback = function drawHighlightPointCallback(g, seriesName, canvasContext, cx, cy, color, pointSizeParam, idx) {
      assert.equal(g, this);
      idxToCheck = idx;
    };
    var testdata = [[1, 2], [2, 3], [3, NaN], [4, 2], [5, NaN], [6, 3]];
    var g = new _dygraph["default"](graph, testdata, {
      drawHighlightPointCallback: drawHighlightPointCallback,
      labels: ['X', 'Y']
    });
    assert.isNull(idxToCheck);
    _DygraphOps["default"].dispatchMouseMove(g, 3, 0);
    // check that NaN point is not highlighted
    assert.isNull(idxToCheck);
    _DygraphOps["default"].dispatchMouseMove(g, 1, 2);
    // check that correct index is returned
    assert.equal(0, idxToCheck);
    _DygraphOps["default"].dispatchMouseMove(g, 6, 3);
    assert.equal(5, idxToCheck);
  });

  /**
   * Test that drawCallback is called with the correct value for `this`.
   */
  it('should set this in drawCallback', function () {
    var g = new _dygraph["default"]('graph', data, {
      drawCallback: function drawCallback(g, is_initial) {
        assert.isTrue(is_initial);
        assert.equal(g, this);
      }
    });
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./DygraphOps":145,"./Util":148}],152:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for the option "connectSeparatedPoints" especially for the scenario where not every series has a value for each timestamp.
 *
 * @author julian.eichstaedt@ch.sauter-bc.com (Fr. Sauter AG)
 */

describe("connect-separated-points", function () {
  cleanupAfterEach();
  var origFunc = utils.getContext;
  beforeEach(function () {
    utils.getContext = function (canvas) {
      return new _Proxy["default"](origFunc(canvas));
    };
  });
  afterEach(function () {
    _dygraph["default"].getContext = origFunc;
  });
  it('testEdgePointsSimple', function () {
    var opts = {
      width: 480,
      height: 320,
      labels: ["x", "series1", "series2", "additionalSeries"],
      connectSeparatedPoints: true,
      dateWindow: [2.5, 7.5]
    };
    var data = [[0, -1, 0, null], [1, null, 2, null], [2, null, 4, null], [3, 0.5, 0, null], [4, 1, -1, 5], [5, 2, -2, 6], [6, 2.5, -2.5, 7], [7, 3, -3, null], [8, 4, null, null], [9, 4, -10, null]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Test if series1 is drawn correctly.
    // ------------------------------------

    // The first point of the first series
    var x1 = data[0][0];
    var y1 = data[0][1];
    var xy1 = g.toDomCoords(x1, y1);

    // The next valid point of this series
    var x2 = data[3][0];
    var y2 = data[3][1];
    var xy2 = g.toDomCoords(x2, y2);

    // Check if both points are connected at the left edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if series2 is drawn correctly.
    // ------------------------------------

    // The last point of the second series.
    var x2 = data[9][0];
    var y2 = data[9][2];
    var xy2 = g.toDomCoords(x2, y2);

    // The previous valid point of this series
    var x1 = data[7][0];
    var y1 = data[7][2];
    var xy1 = g.toDomCoords(x1, y1);

    // Check if both points are connected at the right edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
  });
  it('testEdgePointsCustomBars', function () {
    var opts = {
      width: 480,
      height: 320,
      labels: ["x", "series1", "series2", "additionalSeries"],
      connectSeparatedPoints: true,
      dateWindow: [2.5, 7.5],
      customBars: true
    };
    var data = [[0, [4, 5, 6], [1, 2, 3], [null, null, null]], [1, [null, null, null], [2, 3, 4], [null, null, null]], [2, [null, null, null], [3, 4, 5], [null, null, null]], [3, [0, 1, 2], [2, 3, 4], [null, null, null]], [4, [1, 2, 3], [2, 3, 4], [4, 5, 6]], [5, [1, 2, 3], [3, 4, 5], [4, 5, 6]], [6, [0, 1, 2], [4, 5, 6], [5, 6, 7]], [7, [0, 1, 2], [4, 5, 6], [null, null, null]], [8, [2, 3, 4], [null, null, null], [null, null, null]], [9, [0, 1, 2], [2, 4, 9], [null, null, null]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Test if values of the series1 are drawn correctly.
    // ------------------------------------

    // The first point of the first series
    var x1 = data[0][0];
    var y1 = data[0][1][1];
    var xy1 = g.toDomCoords(x1, y1);

    // The next valid point of this series
    var x2 = data[3][0];
    var y2 = data[3][1][1];
    var xy2 = g.toDomCoords(x2, y2);

    // Check if both points are connected at the left edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if the custom bars of the series1 are drawn correctly
    // --------------------------------------------

    // The first min-point of this series
    x1 = data[0][0];
    y1 = data[0][1][0];
    xy1 = g.toDomCoords(x1, y1);

    // The next valid min-point of the second series.
    x2 = data[3][0];
    y2 = data[3][1][0];
    xy2 = g.toDomCoords(x2, y2);

    // Check if both points are connected at the left edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // The first max-point of this series
    x1 = data[0][0];
    y1 = data[0][1][2];
    xy1 = g.toDomCoords(x1, y1);

    // The next valid max-point of the second series.
    x2 = data[3][0];
    y2 = data[3][1][2];
    xy2 = g.toDomCoords(x2, y2);

    // Check if both points are connected at the left edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if values of the series2 are drawn correctly.
    // ------------------------------------

    // The last point of the second series.
    var x2 = data[9][0];
    var y2 = data[9][2][1];
    var xy2 = g.toDomCoords(x2, y2);

    // The previous valid point of this series
    var x1 = data[7][0];
    var y1 = data[7][2][1];
    var xy1 = g.toDomCoords(x1, y1);

    // Check if both points are connected at the right edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if the custom bars of the series2 are drawn correctly
    // --------------------------------------------

    // The last min-point of the second series.
    x2 = data[9][0];
    y2 = data[9][2][0];
    xy2 = g.toDomCoords(x2, y2);

    // The previous valid min-point of this series
    x1 = data[7][0];
    y1 = data[7][2][0];
    xy1 = g.toDomCoords(x1, y1);

    // Check if both points are connected at the right edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // The last max-point of the second series.
    x2 = data[9][0];
    y2 = data[9][2][2];
    xy2 = g.toDomCoords(x2, y2);

    // The previous valid max-point of this series
    x1 = data[7][0];
    y1 = data[7][2][2];
    xy1 = g.toDomCoords(x1, y1);

    // Check if both points are connected at the right edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
  });
  it('testEdgePointsErrorBars', function () {
    var opts = {
      width: 480,
      height: 320,
      labels: ["x", "series1", "series2", "seriesTestHelper"],
      connectSeparatedPoints: true,
      dateWindow: [2, 7.5],
      errorBars: true
    };
    var data = [[0, [5, 1], [2, 1], [null, null]], [1, [null, null], [3, 1], [null, null]], [2, [null, null], [4, 1], [null, null]], [3, [1, 1], [3, 1], [null, null]], [4, [2, 1], [3, 1], [5, 1]], [5, [2, 1], [4, 1], [5, 1]], [6, [1, 1], [5, 1], [6, 1]], [7, [1, 1], [5, 1], [null, null]], [8, [3, 1], [null, null], [null, null]], [9, [1, 1], [4, 1], [null, null]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Test if values of the series1 are drawn correctly.
    // ------------------------------------

    // The first point of the first series
    var x1 = data[0][0];
    var y1 = data[0][1][0];
    var xy1 = g.toDomCoords(x1, y1);

    // The next valid point of this series
    var x2 = data[3][0];
    var y2 = data[3][1][0];
    var xy2 = g.toDomCoords(x2, y2);

    // Check if both points are connected at the left edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if the upper error bars of series1 are drawn correctly
    // --------------------------------------------

    // The first upper error-point of this series
    x1 = data[0][0];
    var y1error = y1 + data[0][1][1] * 2;
    xy1 = g.toDomCoords(x1, y1error);

    // The next valid upper error-point of the second series.
    x2 = data[3][0];
    var y2error = y2 + data[3][1][1] * 2;
    xy2 = g.toDomCoords(x2, y2error);

    // Check if both points are connected at the left edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if the lower error bars of series1 are drawn correctly
    // --------------------------------------------

    // The first lower error-point of this series
    x1 = data[0][0];
    y1error = y1 - data[0][1][1] * 2;
    xy1 = g.toDomCoords(x1, y1error);

    //The next valid lower error-point of the second series.
    x2 = data[3][0];
    y2error = y2 - data[3][1][1] * 2;
    xy2 = g.toDomCoords(x2, y2error);

    // Check if both points are connected at the left edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if values of the series2 are drawn correctly.
    // ------------------------------------

    // The last point of this series
    x2 = data[9][0];
    y2 = data[9][2][0];
    xy2 = g.toDomCoords(x2, y2);

    // The previous valid point of the first series
    x1 = data[7][0];
    y1 = data[7][2][0];
    xy1 = g.toDomCoords(x1, y1);

    // Check if both points are connected at the right edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if the upper error bars of series2 are drawn correctly
    // --------------------------------------------

    // The last upper error-point of the second series.
    x2 = data[9][0];
    var y2error = y2 + data[9][2][1] * 2;
    xy2 = g.toDomCoords(x2, y2error);

    // The previous valid upper error-point of this series
    x1 = data[7][0];
    var y1error = y1 + data[7][2][1] * 2;
    xy1 = g.toDomCoords(x1, y1error);

    // Check if both points are connected at the right edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

    // Test if the lower error bars of series1 are drawn correctly
    // --------------------------------------------

    // The last lower error-point of the second series.
    x2 = data[9][0];
    y2error = y2 - data[9][2][1] * 2;
    xy2 = g.toDomCoords(x2, y2error);

    // The previous valid lower error-point of this series
    x1 = data[7][0];
    y1error = y1 - data[7][2][1] * 2;
    xy1 = g.toDomCoords(x1, y1error);

    // Check if both points are connected at the right edge of the canvas and if the option "connectSeparatedPoints" works properly
    // even if the point is outside the visible range and only one series has a valid value for this point.
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
  });
  it('testConnectSeparatedPointsPerSeries', function () {
    var assertExpectedLinesDrawnPerSeries = function assertExpectedLinesDrawnPerSeries(htx, expectedSeries1, expectedSeries2, expectedSeries3) {
      var expected = [expectedSeries1, expectedSeries2, expectedSeries3];
      var actual = [_CanvasAssertions["default"].numLinesDrawn(htx, "#ff0000"), _CanvasAssertions["default"].numLinesDrawn(htx, "#00ff00"), _CanvasAssertions["default"].numLinesDrawn(htx, "#0000ff")];
      assert.deepEqual(expected, actual);
    };
    var g = new _dygraph["default"](document.getElementById("graph"), [[1, 10, 10, 10], [2, 15, 11, 12], [3, null, null, 12], [4, 20, 14, null], [5, 15, null, 17], [6, 18, null, null], [7, 12, 14, null]], {
      labels: ["Date", "Series1", "Series2", "Series3"],
      connectSeparatedPoints: false,
      colors: ["#ff0000", "#00ff00", "#0000ff"]
    });
    var htx = g.hidden_ctx_;
    assertExpectedLinesDrawnPerSeries(htx, 4, 1, 2);
    _Proxy["default"].reset(htx);
    g.updateOptions({
      connectSeparatedPoints: true
    });
    assertExpectedLinesDrawnPerSeries(htx, 5, 3, 3);
    _Proxy["default"].reset(htx);
    g.updateOptions({
      connectSeparatedPoints: false,
      series: {
        Series1: {
          connectSeparatedPoints: true
        }
      }
    });
    assertExpectedLinesDrawnPerSeries(htx, 5, 1, 2);
    _Proxy["default"].reset(htx);
    g.updateOptions({
      connectSeparatedPoints: true,
      series: {
        Series1: {
          connectSeparatedPoints: false
        }
      }
    });
    assertExpectedLinesDrawnPerSeries(htx, 4, 3, 3);
  });
  it('testNaNErrorBars', function () {
    var data = [[0, [1, 2, 3]], [1, [2, 3, 4]], [2, [3, 4, 5]], [3, [null, null, null]], [4, [2, 3, 4]], [5, [3, 4, 5]], [6, [2, 3, 4]], [7, [NaN, NaN, NaN]], [8, [2, 3, 4]], [9, [2, 3, 4]], [10, [2, 3, 4]], [11, [2, 3, 4]]];
    var opts = {
      labels: ["x", "y"],
      colors: ["#ff0000"],
      customBars: true,
      connectSeparatedPoints: true
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Line should be drawn across the null gap.
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(data[2][0], data[2][1][1]), g.toDomCoords(data[4][0], data[4][1][1]), attrs);

    // No line across the NaN gap, and a single line (not two)
    // across the null gap.
    assert.equal(8, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147}],153:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Regression test based on some strange customBars data.
 * @author danvk@google.com (Dan Vanderkam)
 * @license MIT
 */

describe("css", function () {
  cleanupAfterEach();
  var data = "X,Y,Z\n1,2,3\n4,5,6\n";
  var styleSheet;
  beforeEach(function () {
    styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(styleSheet);
  });
  afterEach(function () {
    styleSheet.innerHTML = '';
  });

  // Verifies that an unstyled, unsized dygraph gets a default size.
  it('testDefaultSize', function () {
    var opts = {};
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.equal(480, graph.offsetWidth);
    assert.equal(320, graph.offsetHeight);
    assert.deepEqual({
      width: 480,
      height: 320
    }, g.size());
  });

  // Verifies that the width/height parameters work.
  it('testExplicitParamSize', function () {
    var opts = {
      width: 640,
      height: 480
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.equal(640, graph.offsetWidth);
    assert.equal(480, graph.offsetHeight);
    assert.deepEqual({
      width: 640,
      height: 480
    }, g.size());
  });

  // Verifies that setting a style on the div works.
  it('testExplicitStyleSize', function () {
    var opts = {};
    var graph = document.getElementById("graph");
    graph.style.width = '600px';
    graph.style.height = '400px';
    var g = new _dygraph["default"](graph, data, opts);
    assert.equal(600, graph.offsetWidth);
    assert.equal(400, graph.offsetHeight);
    assert.deepEqual({
      width: 600,
      height: 400
    }, g.size());
  });

  // Verifies that CSS pixel styles on the div trump explicit parameters.
  it('testPixelStyleWins', function () {
    var opts = {
      width: 987,
      height: 654
    };
    var graph = document.getElementById("graph");
    graph.style.width = '600px';
    graph.style.height = '400px';
    var g = new _dygraph["default"](graph, data, opts);
    assert.equal(600, graph.offsetWidth);
    assert.equal(400, graph.offsetHeight);
    assert.deepEqual({
      width: 600,
      height: 400
    }, g.size());
  });

  // Verifies that a CSS percentage size works.
  it('testPercentageSize', function () {
    var testdiv = document.getElementById("graph");
    testdiv.innerHTML = '<div style="width: 600px; height: 400px;">' + '<div id="inner-graph"></div></div>';
    var opts = {};
    var graph = document.getElementById("inner-graph");
    graph.style.width = '50%';
    graph.style.height = '50%';
    var g = new _dygraph["default"](graph, data, opts);
    assert.equal(300, graph.offsetWidth);
    assert.equal(200, graph.offsetHeight);
    assert.deepEqual({
      width: 300,
      height: 200
    }, g.size());
  });

  // Verifies that a CSS class size works.
  it('testClassPixelSize', function () {
    styleSheet.innerHTML = '.chart { width: 456px; height: 345px; }';
    var opts = {};
    var graph = document.getElementById("graph");
    graph.className = "chart";
    var g = new _dygraph["default"](graph, data, opts);
    assert.equal(456, graph.offsetWidth);
    assert.equal(345, graph.offsetHeight);
    assert.deepEqual({
      width: 456,
      height: 345
    }, g.size());
  });

  // An invisible chart div shouldn't produce an error.
  it('testInvisibleChart', function () {
    graph.innerHTML = '<div style="display:none;">' + '<div id="inner-graph" style="width: 640px; height: 480px;"></div>' + '</div>';
    new _dygraph["default"]('inner-graph', data, {});
  });

  // An invisible chart div shouldn't produce an error.
  it('testInvisibleChartDate', function () {
    graph.innerHTML = '<div style="display:none;">' + '<div id="inner-graph" style="width: 640px; height: 480px;"></div>' + '</div>';
    new _dygraph["default"]('inner-graph', "Date,Y\n" + "2010/01/01,100\n" + "2010/02/01,200\n" + "2010/03/01,300\n" + "2010/04/01,400\n" + "2010/05/01,300\n" + "2010/06/01,100\n", {});
  });

  // An invisible chart div that becomes visible.
  it('testInvisibleThenVisibleChart', function () {
    var testdiv = document.getElementById("graph");
    testdiv.innerHTML = '<div id="x" style="display:none;">' + '<div id="inner-graph" style="width: 640px; height: 480px;"></div>' + '</div>';
    var graph = document.getElementById("inner-graph");
    var g = new _dygraph["default"](graph, "Date,Y\n" + "2010/01/01,100\n" + "2010/02/01,200\n" + "2010/03/01,300\n" + "2010/04/01,400\n" + "2010/05/01,300\n" + "2010/06/01,100\n", {});

    // g.size() is undefined here (probably 0x0)
    document.getElementById("x").style.display = "";

    // This resize() call is annoying but essential.
    // There are no DOM events to inform the dygraph that its div has changed size
    // or visibility so we need to let it know ourselves.
    g.resize();
    assert.equal(640, graph.offsetWidth);
    assert.equal(480, graph.offsetHeight);
    assert.deepEqual({
      width: 640,
      height: 480
    }, g.size());
  });

  // Verifies that a div resize gets picked up.
  /*
    this one isn't quite ready yet.
  it('testDivResize', function() {
    var opts = {
    };
    var graph = document.getElementById("graph");
    graph.style.width = '640px';
    graph.style.height = '480px';
    var g = new Dygraph(graph, data, opts);
  
    assert.equal(640, graph.offsetWidth);
    assert.equal(480, graph.offsetHeight);
    assert.deepEqual({width: 640, height: 480}, g.size());
  
    graph.style.width = '650px';
    graph.style.height = '490px';
    assert.equal(650, graph.offsetWidth);
    assert.equal(490, graph.offsetHeight);
    assert.deepEqual({width: 650, height: 490}, g.size());
  });
  */
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js"}],154:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertDeepCloseTo = assertDeepCloseTo;
/**
 * @fileoverview Assertions that chai doesn't provide out of the box.
 */

function assertDeepCloseTo(actualArray, expectedArray, epsilon) {
  assert.isArray(actualArray);
  assert.isArray(expectedArray);
  for (var i = 0; i < actualArray.length; i++) {
    assert.closeTo(actualArray[i], expectedArray[i], epsilon);
  }
}
;

},{}],155:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _PixelSampler = _interopRequireDefault(require("./PixelSampler"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Regression test based on some strange customBars data.
 * @author danvk@google.com (Dan Vanderkam)
 * @license MIT
 */

describe("custom-bars", function () {
  cleanupAfterEach();
  var _origFunc = utils.getContext;
  beforeEach(function () {
    utils.getContext = function (canvas) {
      return new _Proxy["default"](_origFunc(canvas));
    };
  });
  afterEach(function () {
    utils.getContext = _origFunc;
  });

  // This test used to reliably produce an infinite loop.
  it('testCustomBarsNoHang', function () {
    var opts = {
      width: 480,
      height: 320,
      customBars: true
    };
    var data = "X,Y1,Y2\n" + "1,1178.0;1527.5;1856.6,0;22365658;0\n" + "2,1253.0;1303.3;1327.3,0;22368228;0\n" + "3,878.0;1267.0;1357.1,0;22368895;0\n" + "4,1155.0;1273.1;1303.5,0;22369665;0\n" + "5,1089.0;1294.8;1355.3,0;22370160;0\n" + "6,1088.0;1268.6;1336.1,0;22372346;0\n" + "7,1141.0;1269.1;1301.2,0;22373318;0\n" + "8,1072.0;1255.8;1326.2,0;22374310;0\n" + "9,1209.0;1309.2;1351.8,0;22374924;0\n" + "10,1230.0;1303.9;1332.6,0;22380163;0\n" + "11,1014.0;1263.5;1330.8,0;22381117;0\n" + "12,853.0;1215.6;1330.6,0;22381556;0\n" + "13,1134.0;1581.9;1690.1,0;22384631;0\n" + "14,1113.0;1540.1;1676.5,0;22386933;0\n" + "15,1130.0;1542.7;1678.3,0;22393459;0\n" + "18,1582.0;1644.4;1690.2,0;22395914;0\n" + "19,878.0;1558.3;1708.1,0;22397732;0\n" + "20,1076.0;1598.4;1723.8,0;22397886;0\n" + "21,1077.0;1574.0;1685.3,0;22398659;0\n" + "22,1118.0;1590.4;1697.6,0;22399009;0\n" + "23,1031.0;1473.1;1644.9,0;22401969;0\n" + "24,1090.0;1480.7;1640.0,0;22417989;0\n" + "25,1592.0;1681.7;1714.4,0;22422819;0\n" + "26,1251.0;1657.8;1750.6,0;22423681;0\n" + "27,1144.0;1660.9;1776.2,0;22426947;0\n" + "28,1178.0;1642.4;1745.6,0;22428238;0\n" + "29,1169.0;1649.1;1757.5,0;22429524;0\n" + "30,1150.0;1596.1;1746.7,0;22433472;0\n" + "31,1099.0;1586.5;1732.8,0;22434308;0\n" + "32,1120.0;1456.0;1620.3,0;22434821;0\n" + "33,1640.0;1687.7;1709.0,0;22434882;0\n" + "34,1671.0;1712.1;1733.7,0;22435116;0\n" + "35,,0;22437620;0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=201
  it('testCustomBarsZero', function () {
    var opts = {
      customBars: true
    };
    var data = "X,Y1,Y2\n" + "1,1;2;3,0;0;0\n" + "2,2;3;4,0;0;0\n" + "3,1;3;5,0;0;0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var range = g.yAxisRange();
    assert.isTrue(range[0] <= 0, 'y-axis must include 0');
    assert.isTrue(range[1] >= 5, 'y-axis must include 5');
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=229
  it('testCustomBarsAtTop', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), [[1, [10, 10, 100]], [1, [10, 10, 100]], [2, [15, 20, 110]], [3, [10, 30, 100]], [4, [15, 40, 110]], [5, [10, 120, 100]], [6, [15, 50, 110]], [7, [10, 70, 100]], [8, [15, 90, 110]], [9, [10, 50, 100]]], {
      width: 500,
      height: 350,
      customBars: true,
      errorBars: true,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      valueRange: [0, 120],
      fillAlpha: 0.15,
      colors: ['#00FF00'],
      labels: ['X', 'Y']
    });
    var sampler = new _PixelSampler["default"](g);
    assert.deepEqual([0, 255, 0, 38], sampler.colorAtCoordinate(5, 60));
  });

  // Tests that custom bars work with log scale.
  it('testCustomBarsLogScale', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), [[1, [10, 10, 100]], [5, [15, 120, 80]], [9, [10, 50, 100]]], {
      width: 500,
      height: 350,
      customBars: true,
      errorBars: true,
      valueRange: [1, 120],
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      fillAlpha: 1.0,
      logscale: true,
      colors: ['#00FF00'],
      labels: ['X', 'Y']
    });

    // The following assertions describe the sides of the custom bars, which are
    // drawn in two halves.
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(g.hidden_ctx_, [[0, 13.329014086362069], [247.5, 29.64240889852502], [247.5, 152.02209814465604], [0, 181.66450704318103]], {
      fillStyle: "#00ff00"
    });
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(g.hidden_ctx_, [[247.5, 29.64240889852502], [495, 13.329014086362069], [495, 181.66450704318103], [247.5, 152.02209814465604]], {
      fillStyle: "#00ff00"
    });
  });
  it('testCustomBarsWithNegativeValuesInLogScale', function () {
    var graph = document.getElementById("graph");
    var count = 0;
    var drawPointCallback = function drawPointCallback() {
      count++;
    };
    var g = new _dygraph["default"](graph, [[1, [10, 20, 30]], [2, [5, 10, 15]], [3, [-1, 5, 10]]], {
      drawPoints: true,
      drawPointCallback: drawPointCallback,
      customBars: true,
      labels: ['X', 'Y']
    });

    // Normally all three points would be drawn.
    assert.equal(3, count);
    count = 0;

    // In log scale, the third point shouldn't be shown.
    g.updateOptions({
      logscale: true
    });
    assert.equal(2, count);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./PixelSampler":146,"./Proxy":147}],156:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for data access methods.
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

describe("data-api", function () {
  cleanupAfterEach();
  var opts, graphDiv;
  beforeEach(function () {
    opts = {
      width: 480,
      height: 320
    };
    graphDiv = document.getElementById("graph");
  });
  it('testBasicAccessors', function () {
    var g = new _dygraph["default"](graphDiv, temperature_data, opts);
    assert.equal(365, g.numRows());
    assert.equal(3, g.numColumns());

    // 2007-01-01,62,39
    assert.equal(62, g.getValue(0, 1));
    assert.equal(39, g.getValue(0, 2));

    // 2007-12-31,57,42
    assert.equal(57, g.getValue(364, 1));
    assert.equal(42, g.getValue(364, 2));
  });
  it('testAccessorsCustomBars', function () {
    var g = new _dygraph["default"](graphDiv, data_temp_high_low, {
      customBars: true
    });
    assert.equal(1070, g.numRows());
    assert.equal(3, g.numColumns());

    // 2007-01-01,46;51;56,43;45;48
    assert.deepEqual([46, 51, 56], g.getValue(0, 1));
    assert.deepEqual([43, 45, 48], g.getValue(0, 2));

    // 2009-12-05,37;42;47  (i.e. missing second column)
    assert.deepEqual([37, 42, 47], g.getValue(1069, 1));
    assert.deepEqual([null, null, null], g.getValue(1069, 2));
  });

  // Regression test for #554.
  it('testGetRowForX', function () {
    var g = new _dygraph["default"](graphDiv, ["x,y", "1,2", "3,4", "5,6", "7,8", "9,10"].join('\n'), opts);
    assert.equal(null, g.getRowForX(0));
    assert.equal(0, g.getRowForX(1));
    assert.equal(null, g.getRowForX(2));
    assert.equal(1, g.getRowForX(3));
    assert.equal(null, g.getRowForX(4));
    assert.equal(2, g.getRowForX(5));
    assert.equal(null, g.getRowForX(6));
    assert.equal(3, g.getRowForX(7));
    assert.equal(null, g.getRowForX(8));
    assert.equal(4, g.getRowForX(9));
    assert.equal(null, g.getRowForX(10));
  });

  // If there are rows with identical x-values, getRowForX promises that it will
  // return the first one.
  it('testGetRowForXDuplicates', function () {
    var g = new _dygraph["default"](graphDiv, ["x,y", "1,2",
    // 0
    "1,4",
    // 1
    "1,6",
    // 2
    "1,8",
    // 3
    "1,6",
    // 4
    "9,2",
    // 5
    "9,4", "9,6", "9,8", "9,10"].join('\n'), opts);
    assert.equal(0, g.getRowForX(1));
    assert.equal(null, g.getRowForX(2));
    assert.equal(5, g.getRowForX(9));
  });

  // indexFromSeriesName should return a value even if the series is invisible
  // In 1.1.1, if you request the last set and it's invisible, the method returns undefined.
  it('testIndexFromSetNameOnInvisibleSet', function () {
    var localOpts = utils.clone(opts);
    localOpts.visibility = [true, false];
    var g = new _dygraph["default"](graphDiv, ["x,y1,y2", "1,1,1", "2,2,2", "3,3,3"].join('\n'), localOpts);
    assert.equal(2, g.indexFromSetName("y2"));
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],157:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for DygraphOptions.
 */

describe("dygraph-data-types", function () {
  cleanupAfterEach();
  var graph;
  beforeEach(function () {
    graph = document.getElementById("graph");
  });

  /*
   * Test to ensure ints are correctly interpreted as ints and not as dates
   */
  it('testNumberOfData', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "x	y\n" + "20033000	1\n" + "20034000	2\n" + "20035000	3\n" + "20036000	4";
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(4, g.rawData_.length);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js"}],158:[function(require,module,exports){
"use strict";

var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @fileoverview Tests that various formats of date are understood by dygraphs.
 *
 * @author dan@dygraphs.com (Dan Vanderkam)
 */

describe("date-formats", function () {
  it('testISO8601', function () {
    // Format: YYYY-MM-DDTHH:MM:SS.ddddddZ
    // The "Z" indicates UTC, so this test should pass regardless of the time
    // zone of the machine on which it is run.

    // Firefox <4 does not support this format:
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/parse
    if (navigator.userAgent.indexOf("Firefox/3.5") == -1) {
      assert.equal(946816496789, utils.dateParser("2000-01-02T12:34:56.789012Z"));
    }
  });
  it('testHyphenatedDate', function () {
    // Format: YYYY-MM-DD HH:MM

    // Midnight February 2, 2000, UTC
    var d = new Date(Date.UTC(2000, 1, 2));

    // Convert to a string in the local time zone: YYYY-DD-MM HH:MM
    var zp = function zp(x) {
      return x < 10 ? '0' + x : x;
    };
    var str = d.getFullYear() + '-' + zp(1 + d.getMonth()) + '-' + zp(d.getDate()) + ' ' + zp(d.getHours()) + ':' + zp(d.getMinutes());
    assert.equal(Date.UTC(2000, 1, 2), utils.dateParser(str));
  });
  it('testMillisecondsDate', function () {
    // Format: YYYY-MM-DD HH:MM:SS.MS

    // Midnight February 2, 2000 14:25:42.123 UTC
    var ts = Date.UTC(2000, 1, 2, 14, 25, 42, 123);
    assert.equal("2000/02/02 14:25:42.123", utils.dateString_(ts, true));
  });
});

},{"../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],159:[function(require,module,exports){
"use strict";

var DygraphTickers = _interopRequireWildcard(require("../../src/dygraph-tickers"));
var _dygraphDefaultAttrs = _interopRequireDefault(require("../../src/dygraph-default-attrs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @fileoverview Test cases for the tick-generating functions.
 * These were generated by adding logging code to the old ticker functions. The
 * tests serve to track existing behavior should it change in the future.
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

describe("date-ticker-tests", function () {
  cleanupAfterEach();
  var createOptionsViewForAxis = function createOptionsViewForAxis(axis, dict) {
    return function (x) {
      if (dict && dict.hasOwnProperty(x)) {
        return dict[x];
      }
      if (_dygraphDefaultAttrs["default"].axes[axis].hasOwnProperty(x)) {
        return _dygraphDefaultAttrs["default"].axes[axis][x];
      }
      if (_dygraphDefaultAttrs["default"].hasOwnProperty(x)) {
        return _dygraphDefaultAttrs["default"][x];
      }
      if (x == 'axisLabelFormatter') return null;
      throw "mysterious " + axis + "-axis option: " + x;
    };
  };

  // Change '&#160;' (non-breaking space) to ' ' in all labels. Cleans up expected values.
  function changeNbspToSpace(ticks) {
    for (var i = 0; i < ticks.length; i++) {
      if (ticks[i].label) {
        ticks[i].label = ticks[i].label.replace(/&#160;/g, ' ');
      }
    }
  }
  it('testBasicDateTicker', function () {
    var opts = {
      labelsUTC: true
    };
    var options = createOptionsViewForAxis('x', opts);
    var ticks = DygraphTickers.dateTicker(-1797534000000, 1255579200000, 800, options);
    var expected_ticks = [{
      "v": -1577923200000,
      "label": "1920"
    }, {
      "v": -1262304000000,
      "label": "1930"
    }, {
      "v": -946771200000,
      "label": "1940"
    }, {
      "v": -631152000000,
      "label": "1950"
    }, {
      "v": -315619200000,
      "label": "1960"
    }, {
      "v": 0,
      "label": "1970"
    }, {
      "v": 315532800000,
      "label": "1980"
    }, {
      "v": 631152000000,
      "label": "1990"
    }, {
      "v": 946684800000,
      "label": "2000"
    }];
    assert.deepEqual(expected_ticks, ticks);
    var start = Date.UTC(1999, 11, 31, 14, 0, 0);
    var end = Date.UTC(2000, 0, 1, 12, 0, 0);
    var granularity = DygraphTickers.Granularity.TWO_HOURLY;
    ticks = DygraphTickers.getDateAxis(start, end, granularity, options);
    changeNbspToSpace(ticks);
    expected_ticks = [
    // months of the year are zero-based.
    {
      v: Date.UTC(1999, 11, 31, 14, 0, 0),
      label: '14:00'
    }, {
      v: Date.UTC(1999, 11, 31, 16, 0, 0),
      label: '16:00'
    }, {
      v: Date.UTC(1999, 11, 31, 18, 0, 0),
      label: '18:00'
    }, {
      v: Date.UTC(1999, 11, 31, 20, 0, 0),
      label: '20:00'
    }, {
      v: Date.UTC(1999, 11, 31, 22, 0, 0),
      label: '22:00'
    }, {
      v: Date.UTC(2000, 0, 1, 0, 0, 0),
      label: '01 Jan'
    }, {
      v: Date.UTC(2000, 0, 1, 2, 0, 0),
      label: '02:00'
    }, {
      v: Date.UTC(2000, 0, 1, 4, 0, 0),
      label: '04:00'
    }, {
      v: Date.UTC(2000, 0, 1, 6, 0, 0),
      label: '06:00'
    }, {
      v: Date.UTC(2000, 0, 1, 8, 0, 0),
      label: '08:00'
    }, {
      v: Date.UTC(2000, 0, 1, 10, 0, 0),
      label: '10:00'
    }, {
      v: Date.UTC(2000, 0, 1, 12, 0, 0),
      label: '12:00'
    }];
    assert.deepEqual(expected_ticks, ticks);
  });
  it('testAllDateTickers', function () {
    var opts = {
      labelsUTC: true,
      pixelsPerLabel: 60
    };
    var options = createOptionsViewForAxis('x', opts);

    // For granularities finer than MONTHLY, the first tick returned tick
    // could lie outside [start_time, end_time] range in the original code.
    // In these tests, those spurious ticks are removed to test new behavior.

    var ticker = function ticker() {
      var ticks = DygraphTickers.dateTicker.apply(null, arguments);
      changeNbspToSpace(ticks);
      return ticks;
    };
    assert.deepEqual([{
      "v": -1577923200000,
      "label": "1920"
    }, {
      "v": -1262304000000,
      "label": "1930"
    }, {
      "v": -946771200000,
      "label": "1940"
    }, {
      "v": -631152000000,
      "label": "1950"
    }, {
      "v": -315619200000,
      "label": "1960"
    }, {
      "v": 0,
      "label": "1970"
    }, {
      "v": 315532800000,
      "label": "1980"
    }, {
      "v": 631152000000,
      "label": "1990"
    }, {
      "v": 946684800000,
      "label": "2000"
    }], ticker(-1797552000000, 1255561200000, 800, options));
    assert.deepEqual([{
      "v": -5364662400000,
      "label": "1800"
    }, {
      "v": -2208988800000,
      "label": "1900"
    }], ticker(-6122044800000, 189302400000, 480, options));
    assert.deepEqual([{
      "v": 1041120000000,
      "label": "29 Dec"
    }, {
      "v": 1041724800000,
      "label": "05 Jan"
    }, {
      "v": 1042329600000,
      "label": "12 Jan"
    }, {
      "v": 1042934400000,
      "label": "19 Jan"
    }, {
      "v": 1043539200000,
      "label": "26 Jan"
    }, {
      "v": 1044144000000,
      "label": "02 Feb"
    }, {
      "v": 1044748800000,
      "label": "09 Feb"
    }, {
      "v": 1045353600000,
      "label": "16 Feb"
    }], ticker(1041120000000, 1045353600000, 640, options));
    assert.deepEqual([{
      "v": 1041379200000,
      "label": "Jan 2003"
    }, {
      "v": 1072915200000,
      "label": "Jan 2004"
    }, {
      "v": 1104537600000,
      "label": "Jan 2005"
    }, {
      "v": 1136073600000,
      "label": "Jan 2006"
    }, {
      "v": 1167609600000,
      "label": "Jan 2007"
    }, {
      "v": 1199145600000,
      "label": "Jan 2008"
    }, {
      "v": 1230768000000,
      "label": "Jan 2009"
    }, {
      "v": 1262304000000,
      "label": "Jan 2010"
    }, {
      "v": 1293840000000,
      "label": "Jan 2011"
    }], ticker(1041120000000, 1307833200000, 800, options));
    assert.deepEqual([{
      "v": 1159660800000,
      "label": "01 Oct"
    }, {
      "v": 1160265600000,
      "label": "08 Oct"
    }, {
      "v": 1160870400000,
      "label": "15 Oct"
    }, {
      "v": 1161475200000,
      "label": "22 Oct"
    }, {
      "v": 1162080000000,
      "label": "29 Oct"
    }], ticker(1159657200000, 1162252800000, 480, options));
    assert.deepEqual([{
      "v": 1159660800000,
      "label": "01 Oct"
    }, {
      "v": 1160265600000,
      "label": "08 Oct"
    }, {
      "v": 1160870400000,
      "label": "15 Oct"
    }, {
      "v": 1161475200000,
      "label": "22 Oct"
    }, {
      "v": 1162080000000,
      "label": "29 Oct"
    }], ticker(1159657200000, 1162252800000, 640, options));
    assert.deepEqual([{
      "v": 1159660800000,
      "label": "01 Oct"
    }, {
      "v": 1160265600000,
      "label": "08 Oct"
    }, {
      "v": 1160870400000,
      "label": "15 Oct"
    }, {
      "v": 1161475200000,
      "label": "22 Oct"
    }, {
      "v": 1162080000000,
      "label": "29 Oct"
    }, {
      "v": 1162684800000,
      "label": "05 Nov"
    }, {
      "v": 1163289600000,
      "label": "12 Nov"
    }, {
      "v": 1163894400000,
      "label": "19 Nov"
    }, {
      "v": 1164499200000,
      "label": "26 Nov"
    }], ticker(1159657200000, 1164758400000, 1150, options));
    assert.deepEqual([{
      "v": 1159660800000,
      "label": "Oct 2006"
    }, {
      "v": 1162339200000,
      "label": "Nov 2006"
    }], ticker(1159657200000, 1164758400000, 400, options));
    assert.deepEqual([{
      "v": 1159660800000,
      "label": "01 Oct"
    }, {
      "v": 1160265600000,
      "label": "08 Oct"
    }, {
      "v": 1160870400000,
      "label": "15 Oct"
    }, {
      "v": 1161475200000,
      "label": "22 Oct"
    }, {
      "v": 1162080000000,
      "label": "29 Oct"
    }, {
      "v": 1162684800000,
      "label": "05 Nov"
    }, {
      "v": 1163289600000,
      "label": "12 Nov"
    }, {
      "v": 1163894400000,
      "label": "19 Nov"
    }, {
      "v": 1164499200000,
      "label": "26 Nov"
    }], ticker(1159657200000, 1164758400000, 500, options));
    assert.deepEqual([{
      "v": 1159660800000,
      "label": "01 Oct"
    }, {
      "v": 1160265600000,
      "label": "08 Oct"
    }, {
      "v": 1160870400000,
      "label": "15 Oct"
    }, {
      "v": 1161475200000,
      "label": "22 Oct"
    }, {
      "v": 1162080000000,
      "label": "29 Oct"
    }, {
      "v": 1162684800000,
      "label": "05 Nov"
    }, {
      "v": 1163289600000,
      "label": "12 Nov"
    }, {
      "v": 1163894400000,
      "label": "19 Nov"
    }, {
      "v": 1164499200000,
      "label": "26 Nov"
    }], ticker(1159657200000, 1164758400000, 600, options));
    assert.deepEqual([{
      "v": 1160265600000,
      "label": "08 Oct"
    }, {
      "v": 1160870400000,
      "label": "15 Oct"
    }, {
      "v": 1161475200000,
      "label": "22 Oct"
    }, {
      "v": 1162080000000,
      "label": "29 Oct"
    }, {
      "v": 1162684800000,
      "label": "05 Nov"
    }, {
      "v": 1163289600000,
      "label": "12 Nov"
    }], ticker(1160243979962, 1163887694248, 600, options));
    assert.deepEqual([{
      "v": 1160611200000,
      "label": "12 Oct"
    }, {
      "v": 1160784000000,
      "label": "14 Oct"
    }, {
      "v": 1160956800000,
      "label": "16 Oct"
    }, {
      "v": 1161129600000,
      "label": "18 Oct"
    }], ticker(1160521200000, 1161298800000, 480, options));
    assert.deepEqual([{
      "v": 1161475200000,
      "label": "22 Oct"
    }, {
      "v": 1161561600000,
      "label": "23 Oct"
    }, {
      "v": 1161648000000,
      "label": "24 Oct"
    }, {
      "v": 1161734400000,
      "label": "25 Oct"
    }, {
      "v": 1161820800000,
      "label": "26 Oct"
    }, {
      "v": 1161907200000,
      "label": "27 Oct"
    }, {
      "v": 1161993600000,
      "label": "28 Oct"
    }], ticker(1161471164461, 1161994065957, 600, options));
    assert.deepEqual([{
      "v": 1161561600000,
      "label": "23 Oct"
    }, {
      "v": 1161583200000,
      "label": "06:00"
    }, {
      "v": 1161604800000,
      "label": "12:00"
    }, {
      "v": 1161626400000,
      "label": "18:00"
    }], ticker(1161557878860, 1161642991675, 600, options));
    assert.deepEqual([{
      "v": 1161756000000,
      "label": "06:00"
    }, {
      "v": 1161759600000,
      "label": "07:00"
    }, {
      "v": 1161763200000,
      "label": "08:00"
    }, {
      "v": 1161766800000,
      "label": "09:00"
    }, {
      "v": 1161770400000,
      "label": "10:00"
    }, {
      "v": 1161774000000,
      "label": "11:00"
    }, {
      "v": 1161777600000,
      "label": "12:00"
    }], ticker(1161752537840, 1161777663332, 600, options));
    assert.deepEqual([{
      "v": 1167609600000,
      "label": "01 Jan"
    }, {
      "v": 1167696000000,
      "label": "02 Jan"
    }, {
      "v": 1167782400000,
      "label": "03 Jan"
    }, {
      "v": 1167868800000,
      "label": "04 Jan"
    }, {
      "v": 1167955200000,
      "label": "05 Jan"
    }, {
      "v": 1168041600000,
      "label": "06 Jan"
    }, {
      "v": 1168128000000,
      "label": "07 Jan"
    }, {
      "v": 1168214400000,
      "label": "08 Jan"
    }, {
      "v": 1168300800000,
      "label": "09 Jan"
    }], ticker(1167609600000, 1168300800000, 480, options));
    assert.deepEqual([{
      "v": 1167609600000,
      "label": "Jan 2007"
    }], ticker(1167609600000, 1199059200000, 100, options));
    assert.deepEqual([{
      "v": 1167609600000,
      "label": "Jan 2007"
    }, {
      "v": 1175385600000,
      "label": "Apr 2007"
    }, {
      "v": 1183248000000,
      "label": "Jul 2007"
    }, {
      "v": 1191196800000,
      "label": "Oct 2007"
    }], ticker(1167609600000, 1199059200000, 300, options));
    assert.deepEqual([{
      "v": 1167609600000,
      "label": "Jan 2007"
    }, {
      "v": 1175385600000,
      "label": "Apr 2007"
    }, {
      "v": 1183248000000,
      "label": "Jul 2007"
    }, {
      "v": 1191196800000,
      "label": "Oct 2007"
    }], ticker(1167609600000, 1199059200000, 480, options));
    assert.deepEqual([{
      "v": 1167609600000,
      "label": "Jan 2007"
    }, {
      "v": 1175385600000,
      "label": "Apr 2007"
    }, {
      "v": 1183248000000,
      "label": "Jul 2007"
    }, {
      "v": 1191196800000,
      "label": "Oct 2007"
    }], ticker(1167609600000, 1199059200000, 600, options));
    assert.deepEqual([{
      "v": 1160611200000,
      "label": "12 Oct"
    }, {
      "v": 1160784000000,
      "label": "14 Oct"
    }, {
      "v": 1160956800000,
      "label": "16 Oct"
    }, {
      "v": 1161129600000,
      "label": "18 Oct"
    }], ticker(1160521200000, 1161298800000, 480, options));
    assert.deepEqual([{
      "v": 1167609600000,
      "label": "Jan 2007"
    }, {
      "v": 1170288000000,
      "label": "Feb 2007"
    }, {
      "v": 1172707200000,
      "label": "Mar 2007"
    }, {
      "v": 1175385600000,
      "label": "Apr 2007"
    }, {
      "v": 1177977600000,
      "label": "May 2007"
    }, {
      "v": 1180656000000,
      "label": "Jun 2007"
    }, {
      "v": 1183248000000,
      "label": "Jul 2007"
    }, {
      "v": 1185926400000,
      "label": "Aug 2007"
    }, {
      "v": 1188604800000,
      "label": "Sep 2007"
    }, {
      "v": 1191196800000,
      "label": "Oct 2007"
    }, {
      "v": 1193875200000,
      "label": "Nov 2007"
    }, {
      "v": 1196467200000,
      "label": "Dec 2007"
    }], ticker(1167609600000, 1199059200000, 800, options));
    assert.deepEqual([{
      "v": 1293840000000,
      "label": "Jan 2011"
    }, {
      "v": 1296518400000,
      "label": "Feb 2011"
    }, {
      "v": 1298937600000,
      "label": "Mar 2011"
    }, {
      "v": 1301616000000,
      "label": "Apr 2011"
    }, {
      "v": 1304208000000,
      "label": "May 2011"
    }, {
      "v": 1306886400000,
      "label": "Jun 2011"
    }, {
      "v": 1309478400000,
      "label": "Jul 2011"
    }, {
      "v": 1312156800000,
      "label": "Aug 2011"
    }], ticker(1293753600000, 1312844400000, 727, options));
    assert.deepEqual([{
      "v": 1201824000000,
      "label": "01 Feb"
    }, {
      "v": 1201910400000,
      "label": "02 Feb"
    }, {
      "v": 1201996800000,
      "label": "03 Feb"
    }, {
      "v": 1202083200000,
      "label": "04 Feb"
    }, {
      "v": 1202169600000,
      "label": "05 Feb"
    }, {
      "v": 1202256000000,
      "label": "06 Feb"
    }], ticker(1201824000000, 1202256000000, 700, options));
    assert.deepEqual([{
      "v": 1210118400000,
      "label": "07 May"
    }, {
      "v": 1210140000000,
      "label": "06:00"
    }, {
      "v": 1210161600000,
      "label": "12:00"
    }, {
      "v": 1210183200000,
      "label": "18:00"
    }, {
      "v": 1210204800000,
      "label": "08 May"
    }, {
      "v": 1210226400000,
      "label": "06:00"
    }, {
      "v": 1210248000000,
      "label": "12:00"
    }, {
      "v": 1210269600000,
      "label": "18:00"
    }, {
      "v": 1210291200000,
      "label": "09 May"
    }], ticker(1210114800000, 1210291200000, 480, options));
    assert.deepEqual([{
      "v": 1210118400000,
      "label": "07 May"
    }, {
      "v": 1210204800000,
      "label": "08 May"
    }, {
      "v": 1210291200000,
      "label": "09 May"
    }, {
      "v": 1210377600000,
      "label": "10 May"
    }, {
      "v": 1210464000000,
      "label": "11 May"
    }], ticker(1210114800000, 1210464000000, 480, options));
    assert.deepEqual([{
      "v": 1210118400000,
      "label": "07 May"
    }, {
      "v": 1210204800000,
      "label": "08 May"
    }, {
      "v": 1210291200000,
      "label": "09 May"
    }, {
      "v": 1210377600000,
      "label": "10 May"
    }, {
      "v": 1210464000000,
      "label": "11 May"
    }, {
      "v": 1210550400000,
      "label": "12 May"
    }], ticker(1210114800000, 1210550400000, 480, options));
    assert.deepEqual([{
      "v": 1214870400000,
      "label": "01 Jul"
    }, {
      "v": 1214872200000,
      "label": "00:30"
    }, {
      "v": 1214874000000,
      "label": "01:00"
    }, {
      "v": 1214875800000,
      "label": "01:30"
    }], ticker(1214870400000, 1214877599000, 600, options));
    assert.deepEqual([{
      "v": 1214870400000,
      "label": "Jul 2008"
    }, {
      "v": 1217548800000,
      "label": "Aug 2008"
    }, {
      "v": 1220227200000,
      "label": "Sep 2008"
    }], ticker(1214866800000, 1222747200000, 600, options));
    assert.deepEqual([{
      "v": 1215820800000,
      "label": "12 Jul"
    }, {
      "v": 1215842400000,
      "label": "06:00"
    }, {
      "v": 1215864000000,
      "label": "12:00"
    }, {
      "v": 1215885600000,
      "label": "18:00"
    }, {
      "v": 1215907200000,
      "label": "13 Jul"
    }, {
      "v": 1215928800000,
      "label": "06:00"
    }, {
      "v": 1215950400000,
      "label": "12:00"
    }, {
      "v": 1215972000000,
      "label": "18:00"
    }], ticker(1215817200000, 1215989940000, 600, options));
    assert.deepEqual([{
      "v": 1246752000000,
      "label": "05 Jul"
    }, {
      "v": 1247356800000,
      "label": "12 Jul"
    }, {
      "v": 1247961600000,
      "label": "19 Jul"
    }], ticker(1246402800000, 1248217200000, 600, options));
    assert.deepEqual([{
      "v": 1246752000000,
      "label": "05 Jul"
    }, {
      "v": 1247356800000,
      "label": "12 Jul"
    }, {
      "v": 1247961600000,
      "label": "19 Jul"
    }, {
      "v": 1248566400000,
      "label": "26 Jul"
    }, {
      "v": 1249171200000,
      "label": "02 Aug"
    }], ticker(1246402800000, 1249340400000, 600, options));
    assert.deepEqual([{
      "v": 1247356800000,
      "label": "12 Jul"
    }, {
      "v": 1247360400000,
      "label": "01:00"
    }, {
      "v": 1247364000000,
      "label": "02:00"
    }, {
      "v": 1247367600000,
      "label": "03:00"
    }, {
      "v": 1247371200000,
      "label": "04:00"
    }, {
      "v": 1247374800000,
      "label": "05:00"
    }, {
      "v": 1247378400000,
      "label": "06:00"
    }], ticker(1247356800000, 1247378400000, 600, options));
    assert.deepEqual([{
      "v": 1247356800000,
      "label": "12 Jul"
    }, {
      "v": 1247360400000,
      "label": "01:00"
    }, {
      "v": 1247364000000,
      "label": "02:00"
    }, {
      "v": 1247367600000,
      "label": "03:00"
    }, {
      "v": 1247371200000,
      "label": "04:00"
    }, {
      "v": 1247374800000,
      "label": "05:00"
    }, {
      "v": 1247378400000,
      "label": "06:00"
    }], ticker(1247356800000, 1247378400000, 600, options));
    assert.deepEqual([{
      "v": 1254268800000,
      "label": "30 Sep"
    }, {
      "v": 1254355200000,
      "label": "01 Oct"
    }, {
      "v": 1254441600000,
      "label": "02 Oct"
    }, {
      "v": 1254528000000,
      "label": "03 Oct"
    }, {
      "v": 1254614400000,
      "label": "04 Oct"
    }, {
      "v": 1254700800000,
      "label": "05 Oct"
    }, {
      "v": 1254787200000,
      "label": "06 Oct"
    }, {
      "v": 1254873600000,
      "label": "07 Oct"
    }, {
      "v": 1254960000000,
      "label": "08 Oct"
    }, {
      "v": 1255046400000,
      "label": "09 Oct"
    }, {
      "v": 1255132800000,
      "label": "10 Oct"
    }], ticker(1254222000000, 1255172400000, 900, options));
    assert.deepEqual([{
      "v": 1254441600000,
      "label": "02 Oct"
    }, {
      "v": 1254528000000,
      "label": "03 Oct"
    }, {
      "v": 1254614400000,
      "label": "04 Oct"
    }, {
      "v": 1254700800000,
      "label": "05 Oct"
    }, {
      "v": 1254787200000,
      "label": "06 Oct"
    }, {
      "v": 1254873600000,
      "label": "07 Oct"
    }, {
      "v": 1254960000000,
      "label": "08 Oct"
    }], ticker(1254394800000, 1254999600000, 900, options));
    assert.deepEqual([{
      "v": 1259625600000,
      "label": "01 Dec"
    }, {
      "v": 1259712000000,
      "label": "02 Dec"
    }, {
      "v": 1259798400000,
      "label": "03 Dec"
    }, {
      "v": 1259884800000,
      "label": "04 Dec"
    }, {
      "v": 1259971200000,
      "label": "05 Dec"
    }, {
      "v": 1260057600000,
      "label": "06 Dec"
    }, {
      "v": 1260144000000,
      "label": "07 Dec"
    }], ticker(1259625600000, 1260144000000, 480, options));
    assert.deepEqual([{
      "v": 1259625600000,
      "label": "01 Dec"
    }, {
      "v": 1259712000000,
      "label": "02 Dec"
    }, {
      "v": 1259798400000,
      "label": "03 Dec"
    }, {
      "v": 1259884800000,
      "label": "04 Dec"
    }, {
      "v": 1259971200000,
      "label": "05 Dec"
    }, {
      "v": 1260057600000,
      "label": "06 Dec"
    }, {
      "v": 1260144000000,
      "label": "07 Dec"
    }], ticker(1259625600000, 1260144000000, 600, options));
    assert.deepEqual([{
      "v": 1260057600000,
      "label": "06 Dec"
    }, {
      "v": 1260662400000,
      "label": "13 Dec"
    }, {
      "v": 1261267200000,
      "label": "20 Dec"
    }, {
      "v": 1261872000000,
      "label": "27 Dec"
    }, {
      "v": 1262476800000,
      "label": "03 Jan"
    }, {
      "v": 1263081600000,
      "label": "10 Jan"
    }, {
      "v": 1263686400000,
      "label": "17 Jan"
    }, {
      "v": 1264291200000,
      "label": "24 Jan"
    }], ticker(1260057600000, 1264291200000, 640, options));
    assert.deepEqual([{
      "v": 1262304000000,
      "label": "Jan 2010"
    }, {
      "v": 1264982400000,
      "label": "Feb 2010"
    }, {
      "v": 1267401600000,
      "label": "Mar 2010"
    }, {
      "v": 1270080000000,
      "label": "Apr 2010"
    }], ticker(1262304000000, 1270857600000, 640, options));
    assert.deepEqual([{
      "v": 1288915200000,
      "label": "05 Nov"
    }, {
      "v": 1288936800000,
      "label": "06:00"
    }, {
      "v": 1288958400000,
      "label": "12:00"
    }, {
      "v": 1288980000000,
      "label": "18:00"
    }, {
      "v": 1289001600000,
      "label": "06 Nov"
    }, {
      "v": 1289023200000,
      "label": "06:00"
    }, {
      "v": 1289044800000,
      "label": "12:00"
    }, {
      "v": 1289066400000,
      "label": "18:00"
    }, {
      "v": 1289088000000,
      "label": "07 Nov"
    }, {
      "v": 1289109600000,
      "label": "06:00"
    }, {
      "v": 1289131200000,
      "label": "12:00"
    }, {
      "v": 1289152800000,
      "label": "18:00"
    }, {
      "v": 1289174400000,
      "label": "08 Nov"
    }, {
      "v": 1289196000000,
      "label": "06:00"
    }, {
      "v": 1289217600000,
      "label": "12:00"
    }, {
      "v": 1289239200000,
      "label": "18:00"
    }, {
      "v": 1289260800000,
      "label": "09 Nov"
    }], ticker(1288911600000, 1289260800000, 1024, options));
    assert.deepEqual([{
      "v": 1291161600000,
      "label": "01 Dec"
    }, {
      "v": 1291248000000,
      "label": "02 Dec"
    }, {
      "v": 1291334400000,
      "label": "03 Dec"
    }, {
      "v": 1291420800000,
      "label": "04 Dec"
    }, {
      "v": 1291507200000,
      "label": "05 Dec"
    }, {
      "v": 1291593600000,
      "label": "06 Dec"
    }, {
      "v": 1291680000000,
      "label": "07 Dec"
    }, {
      "v": 1291766400000,
      "label": "08 Dec"
    }, {
      "v": 1291852800000,
      "label": "09 Dec"
    }], ticker(1291161600000, 1291852800000, 600, options));
    assert.deepEqual([{
      "v": 1294358400000,
      "label": "07 Jan"
    }, {
      "v": 1294444800000,
      "label": "08 Jan"
    }, {
      "v": 1294531200000,
      "label": "09 Jan"
    }, {
      "v": 1294617600000,
      "label": "10 Jan"
    }, {
      "v": 1294704000000,
      "label": "11 Jan"
    }, {
      "v": 1294790400000,
      "label": "12 Jan"
    }, {
      "v": 1294876800000,
      "label": "13 Jan"
    }, {
      "v": 1294963200000,
      "label": "14 Jan"
    }], ticker(1294358400000, 1294963200000, 480, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }], ticker(1307908000112, 1307908050165, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }], ticker(1307908000112, 1307908051166, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }], ticker(1307908000112, 1307908052167, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }], ticker(1307908000112, 1307908053167, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }], ticker(1307908000112, 1307908054168, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }], ticker(1307908000112, 1307908055169, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }], ticker(1307908000112, 1307908056169, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }], ticker(1307908000112, 1307908057170, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }], ticker(1307908000112, 1307908058171, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }], ticker(1307908000112, 1307908059172, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }], ticker(1307908000112, 1307908060172, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }], ticker(1307908000112, 1307908061174, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }], ticker(1307908000112, 1307908062176, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }], ticker(1307908000112, 1307908063177, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }], ticker(1307908000112, 1307908064178, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908065000,
      "label": "19:47:45"
    }], ticker(1307908000112, 1307908065178, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908065000,
      "label": "19:47:45"
    }], ticker(1307908000112, 1307908066178, 800, options));
    assert.deepEqual([{
      "v": 1307908005000,
      "label": "19:46:45"
    }, {
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908015000,
      "label": "19:46:55"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908025000,
      "label": "19:47:05"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908035000,
      "label": "19:47:15"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908045000,
      "label": "19:47:25"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908055000,
      "label": "19:47:35"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908065000,
      "label": "19:47:45"
    }], ticker(1307908000112, 1307908067179, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }], ticker(1307908000112, 1307908068179, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }], ticker(1307908000112, 1307908069179, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908070180, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908071180, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908072181, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908073181, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908074182, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908075182, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908076183, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908077183, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908078184, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }], ticker(1307908000112, 1307908079185, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908080186, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908081187, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908082188, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908083188, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908084189, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908085190, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908086191, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908087192, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908088192, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }], ticker(1307908000112, 1307908089193, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908090194, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908091194, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908092196, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908093196, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908094197, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908095197, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908096198, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908097199, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908098200, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }], ticker(1307908000112, 1307908099200, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908100201, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908101201, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908102202, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908103203, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908104204, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908105205, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908106205, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908107206, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908108209, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }], ticker(1307908000112, 1307908109209, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908110209, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908111210, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908112211, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908113211, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908114212, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908115213, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908116214, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908117214, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908118215, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908119215, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908120217, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908121218, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908122219, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908123219, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908124220, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908125221, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908126222, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908127222, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908128223, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }], ticker(1307908000112, 1307908129223, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }, {
      "v": 1307908130000,
      "label": "19:48:50"
    }], ticker(1307908000112, 1307908130224, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }, {
      "v": 1307908130000,
      "label": "19:48:50"
    }], ticker(1307908000112, 1307908131225, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }, {
      "v": 1307908130000,
      "label": "19:48:50"
    }], ticker(1307908000112, 1307908132226, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }, {
      "v": 1307908130000,
      "label": "19:48:50"
    }], ticker(1307908000112, 1307908133227, 800, options));
    assert.deepEqual([{
      "v": 1307908010000,
      "label": "19:46:50"
    }, {
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908030000,
      "label": "19:47:10"
    }, {
      "v": 1307908040000,
      "label": "19:47:20"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908060000,
      "label": "19:47:40"
    }, {
      "v": 1307908070000,
      "label": "19:47:50"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908090000,
      "label": "19:48:10"
    }, {
      "v": 1307908100000,
      "label": "19:48:20"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908120000,
      "label": "19:48:40"
    }, {
      "v": 1307908130000,
      "label": "19:48:50"
    }], ticker(1307908000112, 1307908134227, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908135227, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908136228, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908137230, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908138231, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }], ticker(1307908000112, 1307908139232, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908140233, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908141233, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908142234, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908143240, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908144240, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908145240, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908146241, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908147241, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908148242, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908149243, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908150243, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908151244, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908152245, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908153245, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908154246, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908155247, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908156247, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908157248, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908158249, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908159250, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908160251, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908161252, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908162252, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908163253, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908164254, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908165254, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908166255, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908167256, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908168256, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }], ticker(1307908000112, 1307908169257, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }, {
      "v": 1307908170000,
      "label": "19:49:30"
    }], ticker(1307908000112, 1307908170258, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }, {
      "v": 1307908170000,
      "label": "19:49:30"
    }], ticker(1307908000112, 1307908171258, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }, {
      "v": 1307908170000,
      "label": "19:49:30"
    }], ticker(1307908000112, 1307908172259, 800, options));
    assert.deepEqual([{
      "v": 1307908020000,
      "label": "19:47"
    }, {
      "v": 1307908050000,
      "label": "19:47:30"
    }, {
      "v": 1307908080000,
      "label": "19:48"
    }, {
      "v": 1307908110000,
      "label": "19:48:30"
    }, {
      "v": 1307908140000,
      "label": "19:49"
    }, {
      "v": 1307908170000,
      "label": "19:49:30"
    }], ticker(1307908000112, 1307908173260, 800, options));
    assert.deepEqual([{
      "v": 978307200000,
      "label": "Jan 2001"
    }, {
      "v": 986083200000,
      "label": "Apr 2001"
    }, {
      "v": 993945600000,
      "label": "Jul 2001"
    }, {
      "v": 1001894400000,
      "label": "Oct 2001"
    }], ticker(978307200000, 1001894400000, 400, options));
    assert.deepEqual([{
      "v": 1307908000110,
      "label": "40.110"
    }, {
      "v": 1307908000111,
      "label": "40.111"
    }, {
      "v": 1307908000112,
      "label": "40.112"
    }, {
      "v": 1307908000113,
      "label": "40.113"
    }], ticker(1307908000110, 1307908000113, 200, options));
    assert.deepEqual([{
      "v": 1307908000110,
      "label": "40.110"
    }, {
      "v": 1307908000112,
      "label": "40.112"
    }, {
      "v": 1307908000114,
      "label": "40.114"
    }, {
      "v": 1307908000116,
      "label": "40.116"
    }], ticker(1307908000110, 1307908000116, 200, options));
    assert.deepEqual([{
      "v": 1307908000110,
      "label": "40.110"
    }, {
      "v": 1307908000115,
      "label": "40.115"
    }, {
      "v": 1307908000120,
      "label": "40.120"
    }, {
      "v": 1307908000125,
      "label": "40.125"
    }], ticker(1307908000110, 1307908000125, 200, options));
    assert.deepEqual([{
      "v": 1307908000110,
      "label": "40.110"
    }, {
      "v": 1307908000120,
      "label": "40.120"
    }, {
      "v": 1307908000130,
      "label": "40.130"
    }, {
      "v": 1307908000140,
      "label": "40.140"
    }], ticker(1307908000110, 1307908000140, 200, options));
    assert.deepEqual([{
      "v": 1307908000100,
      "label": "40.100"
    }, {
      "v": 1307908000150,
      "label": "40.150"
    }, {
      "v": 1307908000200,
      "label": "40.200"
    }, {
      "v": 1307908000250,
      "label": "40.250"
    }], ticker(1307908000100, 1307908000250, 200, options));
    assert.deepEqual([{
      "v": 1307908000100,
      "label": "40.100"
    }, {
      "v": 1307908000150,
      "label": "40.150"
    }, {
      "v": 1307908000200,
      "label": "40.200"
    }, {
      "v": 1307908000250,
      "label": "40.250"
    }], ticker(1307908000090, 1307908000260, 200, options));
    assert.deepEqual([{
      "v": 1307908000100,
      "label": "40.100"
    }, {
      "v": 1307908000200,
      "label": "40.200"
    }, {
      "v": 1307908000300,
      "label": "40.300"
    }, {
      "v": 1307908000400,
      "label": "40.400"
    }], ticker(1307908000100, 1307908000400, 200, options));
    assert.deepEqual([{
      "v": 1307908000100,
      "label": "40.100"
    }, {
      "v": 1307908000200,
      "label": "40.200"
    }, {
      "v": 1307908000300,
      "label": "40.300"
    }, {
      "v": 1307908000400,
      "label": "40.400"
    }], ticker(1307908000100, 1307908000410, 200, options));
    assert.deepEqual([{
      "v": 1307908000000,
      "label": "40.000"
    }, {
      "v": 1307908000500,
      "label": "40.500"
    }, {
      "v": 1307908001000,
      "label": "41.000"
    }, {
      "v": 1307908001500,
      "label": "41.500"
    }], ticker(1307908000000, 1307908001500, 200, options));
  });
});

},{"../../src/dygraph-default-attrs":"dygraphs/src/dygraph-default-attrs.js","../../src/dygraph-tickers":"dygraphs/src/dygraph-tickers.js"}],160:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for the option "drawGapEdgePoints"
 */

describe("draw-gap-edge-points", function () {
  cleanupAfterEach();
  it("shouldn't draw any points by default", function () {
    var called = false;
    var g = new _dygraph["default"](document.getElementById("graph"), [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]], {
      labels: ['a', 'b'],
      drawGapEdgePoints: true,
      drawPointCallback: function drawPointCallback() {
        called = true;
      }
    });
    assert.isFalse(called);
  });
  it("shouldn't draw any points by default (no axes)", function () {
    var called = false;
    var g = new _dygraph["default"](document.getElementById("graph"), [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]], {
      labels: ['a', 'b'],
      drawGapEdgePoints: true,
      drawPointCallback: function drawPointCallback() {
        called = true;
      },
      axes: {
        x: {
          drawAxis: false
        },
        y: {
          drawAxis: false
        }
      }
    });
    assert.isFalse(called);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],161:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _dygraphOptions = _interopRequireDefault(require("../../src/dygraph-options"));
var _dygraphOptionsReference = _interopRequireDefault(require("../../src/dygraph-options-reference"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for DygraphOptions.
 */

describe("dygraph-options-tests", function () {
  cleanupAfterEach();
  var graph;
  beforeEach(function () {
    graph = document.getElementById("graph");
  });

  /*
   * Pathalogical test to ensure getSeriesNames works
   */
  it('testGetSeriesNames', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y,Y2,Y3\n" + "0,-1,0,0";

    // Kind of annoying that you need a DOM to test the object.
    var g = new _dygraph["default"](graph, data, opts);

    // We don't need to get at g's attributes_ object just
    // to test DygraphOptions.
    var o = new _dygraphOptions["default"](g);
    assert.deepEqual(["Y", "Y2", "Y3"], o.seriesNames());
  });

  /*
   * Ensures that even if logscale is set globally, it doesn't impact the
   * x axis.
   */
  it('testGetLogscaleForX', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y,Y2,Y3\n" + "1,-1,2,3";

    // Kind of annoying that you need a DOM to test the object.
    var g = new _dygraph["default"](graph, data, opts);
    assert.isFalse(!!g.getOptionForAxis('logscale', 'x'));
    assert.isFalse(!!g.getOptionForAxis('logscale', 'y'));
    g.updateOptions({
      logscale: true
    });
    assert.isFalse(!!g.getOptionForAxis('logscale', 'x'));
    assert.isTrue(!!g.getOptionForAxis('logscale', 'y'));
  });

  // Helper to gather all warnings emitted by Dygraph constructor.
  // Removes everything after the first open parenthesis in each warning.
  // Returns them in a (possibly empty) list.
  var getWarnings = function getWarnings(div, data, opts) {
    var warnings = [];
    var oldWarn = console.warn;
    console.warn = function (message) {
      warnings.push(message.replace(/ \(.*/, ''));
    };
    try {
      new _dygraph["default"](graph, data, opts);
    } catch (e) {}
    console.warn = oldWarn;
    return warnings;
  };
  it('testLogWarningForNonexistentOption', function () {
    if (!_dygraphOptionsReference["default"]) {
      return; // this test won't pass in non-debug mode.
    }

    var data = "X,Y,Y2,Y3\n" + "1,-1,2,3";
    var expectWarning = function expectWarning(opts, badOptionName) {
      _dygraphOptions["default"].resetWarnings_();
      var warnings = getWarnings(graph, data, opts);
      assert.deepEqual(['Unknown option ' + badOptionName], warnings);
    };
    var expectNoWarning = function expectNoWarning(opts) {
      _dygraphOptions["default"].resetWarnings_();
      var warnings = getWarnings(graph, data, opts);
      assert.deepEqual([], warnings);
    };
    expectNoWarning({});
    expectWarning({
      nonExistentOption: true
    }, 'nonExistentOption');
    expectWarning({
      series: {
        Y: {
          nonExistentOption: true
        }
      }
    }, 'nonExistentOption');
    // expectWarning({Y: {nonExistentOption: true}});
    expectWarning({
      axes: {
        y: {
          anotherNonExistentOption: true
        }
      }
    }, 'anotherNonExistentOption');
    expectWarning({
      highlightSeriesOpts: {
        anotherNonExistentOption: true
      }
    }, 'anotherNonExistentOption');
    expectNoWarning({
      highlightSeriesOpts: {
        strokeWidth: 20
      }
    });
    expectNoWarning({
      strokeWidth: 20
    });
  });
  it('testOnlyLogsEachWarningOnce', function () {
    if (!_dygraphOptionsReference["default"]) {
      return; // this test won't pass in non-debug mode.
    }

    var data = "X,Y,Y2,Y3\n" + "1,-1,2,3";
    var warnings1 = getWarnings(graph, data, {
      nonExistent: true
    });
    var warnings2 = getWarnings(graph, data, {
      nonExistent: true
    });
    assert.deepEqual(['Unknown option nonExistent'], warnings1);
    assert.deepEqual([], warnings2);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-options":"dygraphs/src/dygraph-options.js","../../src/dygraph-options-reference":"dygraphs/src/dygraph-options-reference.js"}],162:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Util = _interopRequireDefault(require("./Util"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview FILL THIS IN
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("error-bars", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);
  it('testErrorBarsDrawn', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      customBars: true,
      errorBars: true,
      labels: ['X', 'Y']
    };
    var data = [[1, [10, 10, 100]], [2, [15, 20, 110]], [3, [10, 30, 100]], [4, [15, 40, 110]], [5, [10, 120, 100]], [6, [15, 50, 110]], [7, [10, 70, 100]], [8, [15, 90, 110]], [9, [10, 50, 100]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {}; // TODO(danvk): fill in

    for (var i = 0; i < data.length - 1; i++) {
      // bottom line
      var xy1 = g.toDomCoords(data[i][0], data[i][1][0]);
      var xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][1][0]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // top line
      xy1 = g.toDomCoords(data[i][0], data[i][1][2]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][1][2]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // middle line
      xy1 = g.toDomCoords(data[i][0], data[i][1][1]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][1][1]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
    }
    g.updateOptions({
      logscale: true
    });
    for (var i = 0; i < data.length - 1; i++) {
      // bottom line
      var xy1 = g.toDomCoords(data[i][0], data[i][1][0]);
      var xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][1][0]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // top line
      xy1 = g.toDomCoords(data[i][0], data[i][1][2]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][1][2]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // middle line
      xy1 = g.toDomCoords(data[i][0], data[i][1][1]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][1][1]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
    }
    g.destroy(); // Restore balanced saves and restores.
    _CanvasAssertions["default"].assertBalancedSaveRestore(htx);
  });
  it('testErrorBarsCorrectColors', function () {
    // Two constant series with constant error.
    var data = [[0, [100, 50], [200, 50]], [1, [100, 50], [200, 50]]];
    var opts = {
      errorBars: true,
      sigma: 1.0,
      fillAlpha: 0.15,
      colors: ['#00ff00', '#0000ff'],
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      width: 400,
      height: 300,
      valueRange: [0, 300],
      labels: ['X', 'Y1', 'Y2']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    // y-pixels (0=top, 299=bottom)
    //   0- 48: empty (white)
    //  49- 98: Y2 error bar
    //  99:     Y2 center line
    // 100-148: Y2 error bar
    // 149-198: Y1 error bar
    // 199:     Y1 center line
    // 200-248: Y1 error bar
    // 249-299: empty (white)
    // TODO(danvk): test the edges of these regions.

    assert.deepEqual([0, 0, 255, 38], _Util["default"].samplePixel(g.hidden_, 200, 75));
    assert.deepEqual([0, 0, 255, 38], _Util["default"].samplePixel(g.hidden_, 200, 125));
    assert.deepEqual([0, 255, 0, 38], _Util["default"].samplePixel(g.hidden_, 200, 175));
    assert.deepEqual([0, 255, 0, 38], _Util["default"].samplePixel(g.hidden_, 200, 225));
  });

  // Regression test for https://github.com/danvk/dygraphs/issues/517
  // This verifies that the error bars have alpha=fillAlpha, even if the series
  // color has its own alpha value.
  it('testErrorBarsForAlphaSeriesCorrectColors', function () {
    var data = [[0, [100, 50]], [2, [100, 50]]];
    var opts = {
      errorBars: true,
      sigma: 1.0,
      fillAlpha: 0.15,
      strokeWidth: 10,
      colors: ['rgba(0, 255, 0, 0.5)'],
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      width: 400,
      height: 300,
      valueRange: [0, 300],
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    // y-pixels (0=top, 299=bottom)
    //   0-148: empty (white)
    // 149-198: Y error bar
    // 199:     Y center line
    // 200-248: Y error bar
    // 249-299: empty (white)

    //  38 = 255 * 0.15 (fillAlpha)
    // 146 = 255 * (0.15 * 0.5 + 1 * 0.5) (fillAlpha from error bar + alpha from series line)
    assert.deepEqual([0, 255, 0, 38], _Util["default"].samplePixel(g.hidden_, 1, 175));
    assert.deepEqual([0, 255, 0, 146], _Util["default"].samplePixel(g.hidden_, 200, 199));
    assert.deepEqual([0, 255, 0, 38], _Util["default"].samplePixel(g.hidden_, 1, 225));
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=392
  it('testRollingAveragePreservesNaNs', function () {
    var graph = document.getElementById("graph");
    var data = [[1, [null, null], [3, 1]], [2, [2, 1], [null, null]], [3, [null, null], [5, 1]], [4, [4, 0.5], [null, null]], [5, [null, null], [7, 1]], [6, [NaN, NaN], [null, null]], [8, [8, 1], [null, null]], [10, [10, 1], [null, null]]];
    var g = new _dygraph["default"](graph, data, {
      labels: ['x', 'A', 'B'],
      connectSeparatedPoints: true,
      drawPoints: true,
      errorBars: true
    });
    var in_series = g.dataHandler_.extractSeries(data, 1, g.attributes_);
    assert.equal(null, in_series[4][1]);
    assert.equal(null, in_series[4][2][0]);
    assert.equal(null, in_series[4][2][1]);
    assert(isNaN(in_series[5][1]));
    assert(isNaN(in_series[5][2][0]));
    assert(isNaN(in_series[5][2][1]));
    var out_series = g.dataHandler_.rollingAverage(in_series, 1, g.attributes_, 1);
    assert(isNaN(out_series[5][1]));
    assert(isNaN(out_series[5][2][0]));
    assert(isNaN(out_series[5][2][1]));
    assert.equal(null, out_series[4][1]);
    assert.equal(null, out_series[4][2][0]);
    assert.equal(null, out_series[4][2][1]);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147,"./Util":148}],163:[function(require,module,exports){
"use strict";

var _dygraphCanvas = _interopRequireDefault(require("../../src/dygraph-canvas"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for fastCanvasProxy, which drops superfluous segments.
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

describe("fast-canvas-proxy", function () {
  var fakeCanvasContext = {
    moveTo: function moveTo() {},
    lineTo: function lineTo() {},
    beginPath: function beginPath() {},
    closePath: function closePath() {},
    fill: function fill() {},
    stroke: function stroke() {}
  };
  function extractMoveToAndLineToCalls(proxy) {
    var calls = proxy.calls__;
    var out = [];
    for (var i = 0; i < calls.length; i++) {
      var c = calls[i];
      if (c.name == 'moveTo' || c.name == 'lineTo') {
        out.push([c.name, c.args[0], c.args[1]]);
      }
    }
    return out;
  }
  it('testExtraMoveTosElided', function () {
    var htx = new _Proxy["default"](fakeCanvasContext);
    var fastProxy = _dygraphCanvas["default"]._fastCanvasProxy(htx);
    fastProxy.moveTo(1, 1);
    fastProxy.lineTo(2, 1);
    fastProxy.moveTo(2, 1);
    fastProxy.lineTo(3, 1);
    fastProxy.moveTo(3, 1);
    fastProxy.stroke();
    assert.deepEqual([['moveTo', 1, 1], ['lineTo', 2, 1], ['lineTo', 3, 1]], extractMoveToAndLineToCalls(htx));
  });
  it('testConsecutiveMoveTosElided', function () {
    var htx = new _Proxy["default"](fakeCanvasContext);
    var fastProxy = _dygraphCanvas["default"]._fastCanvasProxy(htx);
    fastProxy.moveTo(1, 1);
    fastProxy.lineTo(2, 1);
    fastProxy.moveTo(3, 1);
    fastProxy.moveTo(3.1, 2);
    fastProxy.moveTo(3.2, 3);
    fastProxy.stroke();
    assert.deepEqual([['moveTo', 1, 1], ['lineTo', 2, 1], ['moveTo', 3.2, 3]], extractMoveToAndLineToCalls(htx));
  });
  it('testSuperfluousSegmentsElided', function () {
    var htx = new _Proxy["default"](fakeCanvasContext);
    var fastProxy = _dygraphCanvas["default"]._fastCanvasProxy(htx);
    fastProxy.moveTo(0.6, 1);
    fastProxy.lineTo(0.7, 2);
    fastProxy.lineTo(0.8, 3);
    fastProxy.lineTo(0.9, 4);
    fastProxy.lineTo(1.0, 5); // max for Math.round(x) == 1
    fastProxy.lineTo(1.1, 3);
    fastProxy.lineTo(1.2, 0); // min for Math.round(x) == 1
    fastProxy.lineTo(1.3, 1);
    fastProxy.lineTo(1.4, 2);
    fastProxy.moveTo(1.4, 2);
    fastProxy.lineTo(1.5, 2); // rounding up to 2
    fastProxy.moveTo(1.5, 2);
    fastProxy.lineTo(1.6, 3);
    fastProxy.moveTo(1.6, 3);
    fastProxy.lineTo(1.7, 30); // max for Math.round(x) == 2
    fastProxy.moveTo(1.7, 30);
    fastProxy.lineTo(1.8, -30); // min for Math.round(x) == 2
    fastProxy.moveTo(1.8, -30);
    fastProxy.lineTo(1.9, 0);
    fastProxy.moveTo(3, 0); // dodge the "don't touch the last pixel" rule.
    fastProxy.stroke();
    assert.deepEqual([['moveTo', 0.6, 1], ['lineTo', 1.0, 5], ['lineTo', 1.2, 0], ['lineTo', 1.7, 30], ['lineTo', 1.8, -30], ['moveTo', 3, 0]], extractMoveToAndLineToCalls(htx));
  });

  // For a more visual version of this test, see
  // https://gist.github.com/danvk/e98dbb24253c9b153696
  // The drawing commands in the following two tests are taken from there.
  it('should handle gaps on the left', function () {
    var htx = new _Proxy["default"](fakeCanvasContext);
    var fastProxy = _dygraphCanvas["default"]._fastCanvasProxy(htx);
    fastProxy.moveTo(0, 320);
    fastProxy.lineTo(0, 320);
    fastProxy.lineTo(53.21, 187);
    fastProxy.lineTo(53.23, 29);
    fastProxy.lineTo(53.41, 320);
    fastProxy.lineTo(54.15, 320);
    fastProxy.lineTo(475, 320);
    fastProxy.lineTo(475, 320);
    fastProxy.fill();
    assert.deepEqual([['moveTo', 0, 320], ['lineTo', 0, 320], ['lineTo', 53.21, 187], ['lineTo', 53.23, 29], ['lineTo', 53.41, 320], ['lineTo', 54.15, 320], ['lineTo', 475, 320], ['lineTo', 475, 320]], extractMoveToAndLineToCalls(htx));
  });
  it('should handle gaps on the right', function () {
    var htx = new _Proxy["default"](fakeCanvasContext);
    var fastProxy = _dygraphCanvas["default"]._fastCanvasProxy(htx);
    fastProxy.moveTo(240.2, 320);
    fastProxy.lineTo(240.2, 320);
    fastProxy.lineTo(240.2, 174);
    fastProxy.lineTo(240.7, 145);
    fastProxy.lineTo(240.8, 320);
    fastProxy.lineTo(241.3, 29);
    fastProxy.lineTo(241.4, 320);
    fastProxy.lineTo(715.9, 320);
    fastProxy.lineTo(715.9, 320);
    fastProxy.fill();
    assert.deepEqual([['moveTo', 240.2, 320], ['lineTo', 240.2, 320], ['lineTo', 240.2, 174], ['lineTo', 240.7, 145], ['lineTo', 240.8, 320], ['lineTo', 241.3, 29], ['lineTo', 241.4, 320], ['lineTo', 715.9, 320], ['lineTo', 715.9, 320]], extractMoveToAndLineToCalls(htx));
  });
});

},{"../../src/dygraph-canvas":"dygraphs/src/dygraph-canvas.js","./Proxy":147}],164:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test if you give null values to dygraph with stepPlot
 * and fillGraph options enabled
 *
 * @author benoitboivin.pro@gmail.com (Benoit Boivin)
 */

describe("fill-step-plot", function () {
  cleanupAfterEach();
  var origFunc = utils.getContext;
  beforeEach(function () {
    utils.getContext = function (canvas) {
      return new _Proxy["default"](origFunc(canvas));
    };
  });
  afterEach(function () {
    utils.getContext = origFunc;
  });
  it('testFillStepPlotNullValues', function () {
    var opts = {
      labels: ["x", "y"],
      width: 480,
      height: 320,
      fillGraph: true,
      stepPlot: true
    };
    var data = [[1, 3], [2, 0], [3, 8], [4, null], [5, 9], [6, 8], [7, 6], [8, 3]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var x1 = data[3][0];
    var y1 = data[2][1];
    var x2 = data[3][0];
    var y2 = 0;
    var xy1 = g.toDomCoords(x1, y1);
    var xy2 = g.toDomCoords(x2, y2);

    // Check if a line is drawn between the previous y and the bottom of the chart
    _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, {});
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147}],165:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for data formats.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

describe("formats", function () {
  cleanupAfterEach();
  var dataString = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
  var dataArray = [[0, -1], [1, 0], [2, 1], [3, 0]];
  var BASE_OPTS = {
    labels: ['X', 'Y']
  };
  it('testCsv', function () {
    var data = dataString;
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {});
    assertData(g);
  });
  it('testArray', function () {
    var data = dataArray;
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, BASE_OPTS);
    assertData(g);
  });
  it('testFunctionReturnsCsv', function () {
    var data = function data() {
      return dataString;
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {});
    assertData(g);
  });
  it('testFunctionDefinesArray', function () {
    var array = dataArray;
    var data = function data() {
      return array;
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, BASE_OPTS);
    assertData(g);
  });
  it('testXValueParser', function () {
    var data = "X,Y\n" + "d,-1\n" + "e,0\n" + "f,1\n" + "g,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {
      xValueParser: function xValueParser(str) {
        assert.equal(1, str.length);
        return str.charCodeAt(0) - "a".charCodeAt(0);
      }
    });
    assert.equal(3, g.getValue(0, 0));
    assert.equal(4, g.getValue(1, 0));
    assert.equal(5, g.getValue(2, 0));
    assert.equal(6, g.getValue(3, 0));
  });
  it('should throw on strings in native format', function () {
    assert["throws"](function () {
      new _dygraph["default"]('graph', [['1', '10'], ['2', '20']]);
    }, /expected number or date/i);
    assert["throws"](function () {
      new _dygraph["default"]('graph', [[new Date(), '10'], [new Date(), '20']]);
    }, /expected number or array/i);
  });
  var assertData = function assertData(g) {
    var expected = dataArray;
    assert.equal(4, g.numRows());
    assert.equal(2, g.numColumns());
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 2; j++) {
        assert.equal(expected[i][j], g.getValue(i, j));
      }
    }
  };
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js"}],166:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Util = _interopRequireDefault(require("./Util"));
var _PixelSampler = _interopRequireDefault(require("./PixelSampler"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for the per-axis grid options, including the new
 *               option "gridLinePattern".
 *
 * @author david.eberlein@ch.sauter-bc.com (Fr. Sauter AG)
 */

describe("grid-per-axis", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);
  it('testIndependentGrids', function () {
    var opts = {
      width: 480,
      height: 320,
      errorBars: false,
      labels: ["X", "Left", "Right"],
      series: {
        Left: {
          axis: "y"
        },
        Right: {
          axis: "y2"
        }
      },
      axes: {
        y2: {
          drawGrid: true,
          independentTicks: true
        }
      }
    };
    var data = [[1, 0, 0], [2, 12, 88], [3, 88, 122], [4, 63, 273], [5, 110, 333]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;

    // The expected gridlines
    var yGridlines = [0, 20, 40, 60, 80, 100, 120];
    var y2Gridlines = [0, 50, 100, 150, 200, 250, 300, 350];
    var gridlines = [yGridlines, y2Gridlines];
    function halfUp(x) {
      return Math.round(x) + 0.5;
    }
    function halfDown(y) {
      return Math.round(y) - 0.5;
    }
    var attrs = {},
      x,
      y;
    x = halfUp(g.plotter_.area.x);
    // Step through y(0) and y2(1) axis
    for (var axis = 0; axis < 2; axis++) {
      // Step through all gridlines of the axis
      for (var i = 0; i < gridlines[axis].length; i++) {
        // Check the labels:
        var labels = _Util["default"].getYLabels(axis + 1);
        assert.equal(gridlines[axis][i], labels[i], "Expected label not found.");

        // Check that the grid was drawn.
        y = halfDown(g.toDomYCoord(gridlines[axis][i], axis));
        var p1 = [x, y];
        var p2 = [x + g.plotter_.area.w, y];
        _CanvasAssertions["default"].assertLineDrawn(htx, p1, p2, attrs);
      }
    }
  });
  it('testPerAxisGridColors', function () {
    var opts = {
      width: 480,
      height: 320,
      errorBars: false,
      labels: ["X", "Left", "Right"],
      series: {
        Left: {
          axis: "y"
        },
        Right: {
          axis: "y2"
        }
      },
      axes: {
        y: {
          gridLineColor: "#0000ff",
          gridLineWidth: 2
        },
        y2: {
          drawGrid: true,
          independentTicks: true,
          gridLineColor: "#ff0000",
          gridLineWidth: 2
        }
      }
    };
    var data = [[1, 0, 0], [2, 12, 88], [3, 88, 122], [4, 63, 273], [5, 110, 333]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;

    // The expected gridlines
    var yGridlines = [20, 40, 60, 80, 100, 120];
    var y2Gridlines = [50, 100, 150, 200, 250, 300, 350];
    var gridlines = [yGridlines, y2Gridlines];
    var gridColors = [[0, 0, 255, 255], [255, 0, 0, 255]];
    function halfUp(x) {
      return Math.round(x) + 1;
    }
    function halfDown(y) {
      return Math.round(y) - 1;
    }
    var x, y;
    x = halfUp(g.plotter_.area.x);
    var sampler = new _PixelSampler["default"](g);
    // Step through y(0) and y2(1) axis
    for (var axis = 0; axis < 2; axis++) {
      // Step through all gridlines of the axis
      for (var i = 0; i < gridlines[axis].length; i++) {
        y = halfDown(g.toDomYCoord(gridlines[axis][i], axis));
        // Check the grid colors.
        assert.deepEqual(gridColors[axis], sampler.colorAtPixel(x, y), "Unexpected grid color found at pixel: x: " + x + "y: " + y);
      }
    }
  });
  it('testPerAxisGridWidth', function () {
    var opts = {
      width: 480,
      height: 320,
      errorBars: false,
      gridLineColor: "#ff0000",
      labels: ["X", "Left", "Right"],
      series: {
        Left: {
          axis: "y"
        },
        Right: {
          axis: "y2"
        }
      },
      axes: {
        x: {
          gridLineWidth: 4
        },
        y: {
          gridLineWidth: 2
        },
        y2: {
          drawGrid: true,
          independentTicks: true,
          gridLineWidth: 1
        }
      }
    };
    var data = [[1, 0, 0], [2, 12, 88], [3, 88, 122], [4, 63, 273], [5, 110, 333]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;

    // The expected gridlines
    var yGridlines = [20, 40, 60, 80];
    var y2Gridlines = [50, 100, 150, 200, 250, 350];
    var gridlines = [yGridlines, y2Gridlines];
    var xGridlines = [2, 3, 4];
    var gridColor = [255, 0, 0];
    var emptyColor = [0, 0, 0];
    function halfUp(x) {
      return Math.round(x) + 1;
    }
    function halfDown(y) {
      return Math.round(y) - 1;
    }
    var x, y;
    x = halfUp(g.plotter_.area.x + 10);
    var sampler = new _PixelSampler["default"](g);
    // Step through y(0) and y2(1) axis
    for (var axis = 0; axis < 2; axis++) {
      // Step through all gridlines of the axis
      for (var i = 0; i < gridlines[axis].length; i++) {
        y = halfDown(g.toDomYCoord(gridlines[axis][i], axis));
        // Ignore the alpha value

        // FIXME(pholden): this test fails with a context pixel ratio of 2.
        var drawnPixeldown2 = sampler.rgbAtPixel(x, y - 2);
        var drawnPixeldown1 = sampler.rgbAtPixel(x, y - 1);
        var drawnPixel = sampler.rgbAtPixel(x, y);
        var drawnPixelup1 = sampler.rgbAtPixel(x, y + 1);
        var drawnPixelup2 = sampler.rgbAtPixel(x, y + 2);
        // Check the grid width.
        switch (axis) {
          case 0:
            // y with 2 pixels width
            assert.deepEqual(emptyColor, drawnPixeldown2, "Unexpected y-grid color found at pixel: x: " + x + "y: " + y);
            assert.deepEqual(gridColor, drawnPixeldown1, "Unexpected y-grid color found at pixel: x: " + x + "y: " + y);
            assert.deepEqual(gridColor, drawnPixel, "Unexpected y-grid color found at pixel: x: " + x + "y: " + y);
            assert.deepEqual(gridColor, drawnPixelup1, "Unexpected y-grid color found at pixel: x: " + x + "y: " + y);
            assert.deepEqual(emptyColor, drawnPixelup2, "Unexpected y-grid color found at pixel: x: " + x + "y: " + y);
            break;
          case 1:
            // y2 with 1 pixel width
            assert.deepEqual(emptyColor, drawnPixeldown1, "Unexpected y2-grid color found at pixel: x: " + x + "y: " + y);
            assert.deepEqual(gridColor, drawnPixel, "Unexpected y2-grid color found at pixel: x: " + x + "y: " + y);
            assert.deepEqual(emptyColor, drawnPixelup1, "Unexpected y2-grid color found at pixel: x: " + x + "y: " + y);
            break;
        }
      }
    }

    // Check the x axis grid
    y = halfDown(g.plotter_.area.y) + 10;
    for (var i = 0; i < xGridlines.length; i++) {
      x = halfUp(g.toDomXCoord(xGridlines[i]));
      assert.deepEqual(emptyColor, sampler.rgbAtPixel(x - 4, y), "Unexpected x-grid color found at pixel: x: " + x + "y: " + y);
      assert.deepEqual(gridColor, sampler.rgbAtPixel(x - 3, y), "Unexpected x-grid color found at pixel: x: " + x + "y: " + y);
      assert.deepEqual(gridColor, sampler.rgbAtPixel(x - 2, y), "Unexpected x-grid color found at pixel: x: " + x + "y: " + y);
      assert.deepEqual(gridColor, sampler.rgbAtPixel(x - 1, y), "Unexpected x-grid color found at pixel: x: " + x + "y: " + y);
      assert.deepEqual(gridColor, sampler.rgbAtPixel(x, y), "Unexpected x-grid color found at pixel: x: " + x + "y: " + y);
      assert.deepEqual(gridColor, sampler.rgbAtPixel(x + 1, y), "Unexpected x-grid color found at pixel: x: " + x + "y: " + y);
      assert.deepEqual(emptyColor, sampler.rgbAtPixel(x + 2, y), "Unexpected x-grid color found at pixel: x: " + x + "y: " + y);
    }
  });

  // PhantomJS 1.9.x does not support setLineDash
  // When Travis-CI updates to Phantom2, this can be re-enabled.
  // See https://github.com/ariya/phantomjs/issues/12948
  if (!navigator.userAgent.match(/PhantomJS\/1.9/)) {
    it('testGridLinePattern', function () {
      var opts = {
        width: 480,
        height: 320,
        errorBars: false,
        labels: ["X", "Left", "Right"],
        colors: ["rgba(0,0,0,0)", "rgba(0,0,0,0)"],
        series: {
          Left: {
            axis: "y"
          },
          Right: {
            axis: "y2"
          }
        },
        axes: {
          x: {
            drawGrid: false,
            drawAxis: false
          },
          y: {
            drawAxis: false,
            gridLineColor: "#0000ff",
            gridLinePattern: [10, 10]
          }
        }
      };
      var data = [[1, 0, 0], [2, 12, 88], [3, 88, 122], [4, 63, 273], [5, 110, 333]];
      var graph = document.getElementById("graph");
      var g = new _dygraph["default"](graph, data, opts);
      var htx = g.hidden_ctx_;

      // The expected gridlines
      var yGridlines = [0, 20, 40, 60, 80, 100, 120];
      function halfUp(x) {
        return Math.round(x) + 1;
      }
      function halfDown(y) {
        return Math.round(y) - 1;
      }
      var x, y;
      var sampler = new _PixelSampler["default"](g);
      // Step through all gridlines of the axis
      for (var i = 0; i < yGridlines.length; i++) {
        y = halfDown(g.toDomYCoord(yGridlines[i], 0));
        // Step through the pixels of the line and test the pattern.
        for (x = halfUp(g.plotter_.area.x); x < g.plotter_.area.w; x++) {
          // avoid checking the edge pixels since they differ depending on the OS.
          var pixelpos = x % 10;
          if (pixelpos < 1 || pixelpos > 8) continue;

          // XXX: check what this looks like at master

          // Ignore alpha
          var drawnPixel = sampler.rgbAtPixel(x, y);
          var pattern = Math.floor(x / 10) % 2;
          switch (pattern) {
            case 0:
              // fill
              assert.deepEqual([0, 0, 255], drawnPixel, "Unexpected filled grid-pattern color found at pixel: x: " + x + " y: " + y);
              break;
            case 1:
              // no fill
              assert.deepEqual([0, 0, 0], drawnPixel, "Unexpected empty grid-pattern color found at pixel: x: " + x + " y: " + y);
              break;
          }
        }
      }
    });
  }
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./PixelSampler":146,"./Proxy":147,"./Util":148}],167:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Unit tests for GViz data table support.
 */

describe('gviz', function () {
  cleanupAfterEach();

  // This is a fake version of the gviz DataTable API, which can only be
  // sourced using the google js loader.
  //
  // Their example of the "data" structure is:
  //   cols: [{id: 'task', label: 'Task', type: 'string'},
  //          {id: 'hours', label: 'Hours per Day', type: 'number'}],
  //   rows: [{c:[{v: 'Work'}, {v: 11}]},
  //          {c:[{v: 'Eat'}, {v: 2}]},
  //          {c:[{v: 'Commute'}, {v: 2}]},
  //          {c:[{v: 'Watch TV'}, {v:2}]},
  //          {c:[{v: 'Sleep'}, {v:7, f:'7.000'}]}
  //         ]
  //
  // https://developers.google.com/chart/interactive/docs/reference#DataTable
  var FakeDataTable = function FakeDataTable(data) {
    this.data = data;
  };
  FakeDataTable.prototype.getNumberOfColumns = function () {
    return this.data.cols.length;
  };
  FakeDataTable.prototype.getNumberOfRows = function () {
    return this.data.rows.length;
  };
  FakeDataTable.prototype.getColumnType = function (idx) {
    return this.data.cols[idx].type;
  };
  FakeDataTable.prototype.getColumnLabel = function (idx) {
    return this.data.cols[idx].label;
  };
  FakeDataTable.prototype.getValue = function (row, col) {
    return this.data.rows[row].c[col].v;
  };
  FakeDataTable.prototype.getColumnRange = function (col) {
    throw 'Not Implemented';
  };

  // This mirrors http://dygraphs.com/tests/gviz.html
  var numericData = new FakeDataTable({
    cols: [{
      id: "",
      label: "X",
      type: "number"
    }, {
      id: "",
      label: "A",
      type: "number"
    }, {
      id: "",
      label: "B",
      type: "number"
    }],
    rows: [{
      c: [{
        v: 0
      }, {
        v: 1
      }, {
        v: 7
      }]
    }, {
      c: [{
        v: 1
      }, {
        v: 2
      }, {
        v: 4
      }]
    }, {
      c: [{
        v: 2
      }, {
        v: 3
      }, {
        v: 3
      }]
    }, {
      c: [{
        v: 3
      }, {
        v: 4
      }, {
        v: 0
      }]
    }]
  });
  it('should parse simple data tables', function () {
    var g = new _dygraph["default"]('graph', numericData);
    assert.equal(4, g.numRows());
    assert.equal(3, g.numColumns());
    assert.equal(0, g.getValue(0, 0));
    assert.equal(1, g.getValue(0, 1));
    assert.equal(7, g.getValue(0, 2));
    assert.equal(3, g.getValue(3, 0));
    assert.equal(4, g.getValue(3, 1));
    assert.equal(0, g.getValue(3, 2));
    assert.deepEqual(['X', 'A', 'B'], g.getLabels());
  });
  it('should parse tables with annotations', function () {
    // Data from https://developers.google.com/chart/interactive/docs/gallery/annotatedtimeline
    var data = new FakeDataTable({
      cols: [{
        label: "Date",
        type: "date"
      }, {
        label: "Sold Pencils",
        type: "number"
      }, {
        label: "title1",
        type: "string"
      }, {
        label: "text1",
        type: "string"
      }, {
        label: "Sold Pens",
        type: "number"
      }, {
        label: "title2",
        type: "string"
      }, {
        label: "text2",
        type: "string"
      }],
      rows: [{
        c: [{
          v: new Date(2008, 1, 1)
        }, {
          v: 30000
        }, {
          v: null
        }, {
          v: null
        }, {
          v: 40645
        }, {
          v: null
        }, {
          v: null
        }]
      }, {
        c: [{
          v: new Date(2008, 1, 2)
        }, {
          v: 14045
        }, {
          v: null
        }, {
          v: null
        }, {
          v: 20374
        }, {
          v: null
        }, {
          v: null
        }]
      }, {
        c: [{
          v: new Date(2008, 1, 3)
        }, {
          v: 55022
        }, {
          v: null
        }, {
          v: null
        }, {
          v: 50766
        }, {
          v: null
        }, {
          v: null
        }]
      }, {
        c: [{
          v: new Date(2008, 1, 4)
        }, {
          v: 75284
        }, {
          v: null
        }, {
          v: null
        }, {
          v: 14334
        }, {
          v: "Out of Stock"
        }, {
          v: "Ran out of stock"
        }]
      }, {
        c: [{
          v: new Date(2008, 1, 5)
        }, {
          v: 41476
        }, {
          v: "Bought Pens"
        }, {
          v: "Bought 200k pens"
        }, {
          v: 66467
        }, {
          v: null
        }, {
          v: null
        }]
      }, {
        c: [{
          v: new Date(2008, 1, 6)
        }, {
          v: 33322
        }, {
          v: null
        }, {
          v: null
        }, {
          v: 39463
        }, {
          v: null
        }, {
          v: null
        }]
      }]
    });
    var g = new _dygraph["default"]('graph', data, {
      displayAnnotations: true
    });
    var annEls = document.getElementsByClassName('dygraphDefaultAnnotation');
    assert.equal(2, annEls.length);
    var annotations = g.annotations();
    assert.equal(2, annotations.length);
    var a0 = annotations[0];
    assert.deepEqual({
      text: 'Out of Stock\nRan out of stock',
      series: 'Sold Pens',
      xval: new Date(2008, 1, 4).getTime(),
      shortText: 'A'
    }, annotations[0]);
  });
  it('should parse tables with dates', function () {
    // This mirrors http://dygraphs.com/tests/gviz.html
    var data = new FakeDataTable({
      cols: [{
        id: "",
        label: "Date",
        type: "datetime"
      }, {
        id: "",
        label: "Column A",
        type: "number"
      }, {
        id: "",
        label: "Column B",
        type: "number"
      }],
      rows: [{
        c: [{
          v: new Date(2009, 6, 1)
        }, {
          v: 1
        }, {
          v: 7
        }]
      }, {
        c: [{
          v: new Date(2009, 6, 8)
        }, {
          v: 2
        }, {
          v: 4
        }]
      }, {
        c: [{
          v: new Date(2009, 6, 15)
        }, {
          v: 3
        }, {
          v: 3
        }]
      }, {
        c: [{
          v: new Date(2009, 6, 22)
        }, {
          v: 4
        }, {
          v: 0
        }]
      }]
    });
    var g = new _dygraph["default"]('graph', data);
    assert.equal(4, g.numRows());
    assert.equal(3, g.numColumns());
    assert.equal(new Date(2009, 6, 1).getTime(), g.getValue(0, 0));
    assert.equal(1, g.getValue(0, 1));
    assert.equal(7, g.getValue(0, 2));
    assert.deepEqual(['Date', 'Column A', 'Column B'], g.getLabels());
  });

  // it('should parse tables with error bars', function() {
  // });

  it('should implement the gviz API', function () {
    var g = new _dygraph["default"].GVizChart(document.getElementById('graph'));
    g.draw(numericData);
    g.setSelection([{
      row: 0
    }]);
    assert.equal('0: A: 1 B: 7', _Util["default"].getLegend());
    assert.deepEqual([{
      row: 0,
      column: 1
    }, {
      row: 0,
      column: 2
    }], g.getSelection());
    g.setSelection([]);
    assert.deepEqual([], g.getSelection());
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./Util":148}],168:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for window.devicePixelRatio > 1.
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

describe("hidpi", function () {
  cleanupAfterEach();
  var savePixelRatio;
  beforeEach(function () {
    savePixelRatio = window.devicePixelRatio;
    window.devicePixelRatio = 2;
  });
  afterEach(function () {
    window.devicePixelRatio = savePixelRatio;
  });
  it('testDoesntCreateScrollbars', function () {
    var sw = document.body.scrollWidth;
    var cw = document.body.clientWidth;
    var graph = document.getElementById("graph");
    graph.style.width = "70%"; // more than half.
    graph.style.height = "200px";
    var opts = {};
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var g = new _dygraph["default"](graph, data, opts);

    // Adding the graph shouldn't cause the width of the page to change.
    // (essentially, we're checking that we don't end up with a scrollbar)
    // See https://stackoverflow.com/a/2146905/2171120
    assert.equal(cw, document.body.clientWidth);
    assert.equal(sw, document.body.scrollWidth);
  });
  it('should be influenced by options.pixelRatio', function () {
    var graph = document.getElementById("graph");

    // make sure devicePixelRatio is still setup to not 1.
    assert(devicePixelRatio > 1.5, 'devicePixelRatio is not much greater than 1.');
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";

    // first try a default one
    var g1 = new _dygraph["default"](graph, data, {});
    var area1 = g1.getArea();
    var g2 = new _dygraph["default"](graph, data, {
      pixelRatio: 1
    });
    var area2 = g2.getArea();
    var g3 = new _dygraph["default"](graph, data, {
      pixelRatio: 3
    });
    var area3 = g3.getArea();
    assert.deepEqual(area1, area2, 'areas 1 and 2 are not the same');
    assert.deepEqual(area2, area3, 'areas 2 and 3 are not the same');
    assert.notEqual(g1.canvas_.width, g2.canvas_.width, 'Expected, for devicePixelRatio != 1, ' + 'that setting options.pixelRatio would change the canvas width');
    assert.equal(g2.canvas_.width * 3, g3.canvas_.width, 'Expected that pixelRatio of 3 vs 1 would triple the canvas width.');
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js"}],169:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Util = _interopRequireDefault(require("./Util"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for the highlightSeriesBackgroundAlpha and
 * highlightSeriesBackgroundColor options.
 * @author sergeyslepian@gmail.com
 */

describe("highlight-series-background", function () {
  cleanupAfterEach();
  var origRepeatAndCleanup;
  beforeEach(function () {
    // A "fast" version of repeatAndCleanup
    origRepeatAndCleanup = utils.repeatAndCleanup;
    // utils.repeatAndCleanup = function(repeatFn, maxFrames, framePeriodInMillis, cleanupFn) {
    //   repeatFn(0);
    //   if (maxFrames > 1) repeatFn(maxFrames - 1);
    //   cleanupFn();
    // };
  });

  afterEach(function () {
    utils.repeatAndCleanup = origRepeatAndCleanup;
  });
  function setupGraph(highlightSeriesBackgroundAlpha, highlightSeriesBackgroundColor) {
    var opts = {
      width: 480,
      height: 320,
      labels: ['x', 'y'],
      legend: 'always',
      highlightSeriesOpts: {
        strokeWidth: 1,
        strokeBorderWidth: 1,
        highlightCircleSize: 1
      }
    };
    if (highlightSeriesBackgroundAlpha) utils.update(opts, {
      highlightSeriesBackgroundAlpha: highlightSeriesBackgroundAlpha
    });
    if (highlightSeriesBackgroundColor) utils.update(opts, {
      highlightSeriesBackgroundColor: highlightSeriesBackgroundColor
    });
    var data = [];
    for (var j = 0; j < 10; j++) {
      data.push([j, 0]);
    }
    return new _dygraph["default"]('graph', data, opts);
  }
  it('testDefaultHighlight', function (done) {
    var graph = setupGraph();
    assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [0, 0, 0, 0]);
    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    window.setTimeout(function () {
      assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [255, 255, 255, 127]);
      done();
    }, 500);
  });
  it('testNoHighlight', function (done) {
    var graph = setupGraph(1);
    assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [0, 0, 0, 0]);
    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    window.setTimeout(function () {
      assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [0, 0, 0, 0]);
      done();
    }, 500);
  });
  it('testCustomHighlightColor', function (done) {
    var graph = setupGraph(null, 'rgb(0,255,255)');
    assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [0, 0, 0, 0]);
    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    window.setTimeout(function () {
      assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [0, 255, 255, 127]);
      done();
    }, 500);
  });
  it('testCustomHighlightAlpha', function (done) {
    var graph = setupGraph(0.3);
    assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [0, 0, 0, 0]);
    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    window.setTimeout(function () {
      assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [255, 255, 255, 179]);
      done();
    }, 500);
  });
  it('testCustomHighlightColorAndAlpha', function (done) {
    var graph = setupGraph(0.7, 'rgb(255,0,0)');
    assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [0, 0, 0, 0]);
    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    window.setTimeout(function () {
      assert.deepEqual(_Util["default"].samplePixel(graph.canvas_, 100, 100), [255, 0, 0, 76]);
      done();
    }, 500);
  });
  it('testGetSelectionZeroCanvasY', function () {
    var graph = document.getElementById("graph");
    var calls = [];
    function callback(g, seriesName, canvasContext, cx, cy, color, pointSize, idx) {
      calls.push(arguments);
    }
    ;
    var g = new _dygraph["default"](document.getElementById("graph"), "X,Y\n" + "1,5\n" + "1,10\n" + "1,12\n", {
      drawHighlightPointCallback: callback,
      axes: {
        y: {
          valueRange: [0, 10]
        }
      }
    });
    g.setSelection(1);
    var args = calls[0];
    assert.equal(args[4], 0);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./Util":148}],170:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _dygraphInteractionModel = _interopRequireDefault(require("../../src/dygraph-interaction-model"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
describe("interaction-model", function () {
  cleanupAfterEach();
  var data1 = "X,Y\n" + "20,-1\n" + "21,0\n" + "22,1\n" + "23,0\n";
  var data2 = "X,Y\n" + "1,10\n" + "2,20\n" + "3,30\n" + "4,40\n" + "5,120\n" + "6,50\n" + "7,70\n" + "8,90\n" + "9,50\n";
  function getXLabels() {
    var x_labels = document.getElementsByClassName("dygraph-axis-label-x");
    var ary = [];
    for (var i = 0; i < x_labels.length; i++) {
      ary.push(x_labels[i].innerHTML);
    }
    return ary;
  }

  /*
  it('testPan', function() {
    var originalXRange = g.xAxisRange();
    var originalYRange = g.yAxisRange(0);
  
    DygraphOps.dispatchMouseDown(g, xRange[0], yRange[0]);
    DygraphOps.dispatchMouseMove(g, xRange[1], yRange[0]); // this is really necessary.
    DygraphOps.dispatchMouseUp(g, xRange[1], yRange[0]);
  
    assert.closeTo(xRange, g.xAxisRange(), 0.2);
    // assert.closeTo(originalYRange, g.yAxisRange(0), 0.2); // Not true, it's something in the middle.
  
    var midX = (xRange[1] - xRange[0]) / 2;
    DygraphOps.dispatchMouseDown(g, midX, yRange[0]);
    DygraphOps.dispatchMouseMove(g, midX, yRange[1]); // this is really necessary.
    DygraphOps.dispatchMouseUp(g, midX, yRange[1]);
  
    assert.closeTo(xRange, g.xAxisRange(), 0.2);
    assert.closeTo(yRange, g.yAxisRange(0), 0.2);
  });
  */

  /**
   * This tests that when changing the interaction model so pan is used instead
   * of zoom as the default behavior, a standard click method is still called.
   */
  it('testClickCallbackIsCalled', function () {
    var clicked;
    var clickCallback = function clickCallback(event, x) {
      clicked = x;
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data1, {
      width: 100,
      height: 100,
      clickCallback: clickCallback
    });
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 10);
    assert.equal(20, clicked);
  });

  /**
   * This tests that when changing the interaction model so pan is used instead
   * of zoom as the default behavior, a standard click method is still called.
   */
  it('testClickCallbackIsCalledOnCustomPan', function () {
    var clicked;
    var clickCallback = function clickCallback(event, x) {
      clicked = x;
    };
    function customDown(event, g, context) {
      context.initializeMouseDown(event, g, context);
      _dygraphInteractionModel["default"].startPan(event, g, context);
    }
    function customMove(event, g, context) {
      _dygraphInteractionModel["default"].movePan(event, g, context);
    }
    function customUp(event, g, context) {
      _dygraphInteractionModel["default"].endPan(event, g, context);
    }
    var opts = {
      width: 100,
      height: 100,
      clickCallback: clickCallback,
      interactionModel: {
        'mousedown': customDown,
        'mousemove': customMove,
        'mouseup': customUp
      }
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data1, opts);
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 10);
    assert.equal(20, clicked);
  });
  var clickAt = function clickAt(g, x, y) {
    _DygraphOps["default"].dispatchMouseDown(g, x, y);
    _DygraphOps["default"].dispatchMouseMove(g, x, y);
    _DygraphOps["default"].dispatchMouseUp(g, x, y);
  };

  /**
   * This tests that clickCallback is still called with the nonInteractiveModel.
   */
  it('testClickCallbackIsCalledWithNonInteractiveModel', function () {
    var clicked;

    // TODO(danvk): also test pointClickCallback here.
    var clickCallback = function clickCallback(event, x) {
      clicked = x;
    };
    var opts = {
      width: 100,
      height: 100,
      clickCallback: clickCallback,
      interactionModel: _dygraphInteractionModel["default"].nonInteractiveModel_
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data1, opts);
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 10);
    assert.equal(20, clicked);
  });

  /**
   * A sanity test to ensure pointClickCallback is called.
   */
  it('testPointClickCallback', function () {
    var clicked = null;
    var g = new _dygraph["default"]('graph', data2, {
      pointClickCallback: function pointClickCallback(event, point) {
        clicked = point;
      }
    });
    clickAt(g, 4, 40);
    assert.isNotNull(clicked);
    assert.equal(4, clicked.xval);
    assert.equal(40, clicked.yval);
  });

  /**
   * A sanity test to ensure pointClickCallback is not called when out of range.
   */
  it('testNoPointClickCallbackWhenOffPoint', function () {
    var clicked;
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {
      pointClickCallback: function pointClickCallback(event, point) {
        clicked = point;
      }
    });
    clickAt(g, 5, 40);
    assert.isUndefined(clicked);
  });

  /**
   * Ensures pointClickCallback circle size is taken into account.
   */
  it('testPointClickCallback_circleSize', function () {
    // TODO(konigsberg): Implement.
  });

  /**
   * Ensures that pointClickCallback is called prior to clickCallback
   */
  it('testPointClickCallbackCalledPriorToClickCallback', function () {
    var counter = 0;
    var pointClicked;
    var clicked;
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {
      pointClickCallback: function pointClickCallback(event, point) {
        counter++;
        pointClicked = counter;
      },
      clickCallback: function clickCallback(event, point) {
        counter++;
        clicked = counter;
      }
    });
    clickAt(g, 4, 40);
    assert.equal(1, pointClicked);
    assert.equal(2, clicked);
  });

  /**
   * Ensures that when there's no pointClickCallback, clicking on a point still calls
   * clickCallback
   */
  it('testClickCallback_clickOnPoint', function () {
    var clicked;
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {
      clickCallback: function clickCallback(event, point) {
        clicked = 1;
      }
    });
    clickAt(g, 4, 40);
    assert.equal(1, clicked);
  });
  it('testIsZoomed_none', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});
    assert.isFalse(g.isZoomed());
    assert.isFalse(g.isZoomed("x"));
    assert.isFalse(g.isZoomed("y"));
  });
  it('testIsZoomed_x', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 130, 100);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 130, 100);
    assert.isTrue(g.isZoomed());
    assert.isTrue(g.isZoomed("x"));
    assert.isFalse(g.isZoomed("y"));
  });
  it('testIsZoomed_y', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 10, 30);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 30);
    assert.isTrue(g.isZoomed());
    assert.isFalse(g.isZoomed("x"));
    assert.isTrue(g.isZoomed("y"));
  });
  it('testIsZoomed_both', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});

    // Zoom x axis
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 130, 100);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 130, 100);

    // Now zoom y axis
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 100, 130);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 100, 130);
    assert.isTrue(g.isZoomed());
    assert.isTrue(g.isZoomed("x"));
    assert.isTrue(g.isZoomed("y"));
  });
  it('testIsZoomed_updateOptions_none', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});
    g.updateOptions({});
    assert.isFalse(g.isZoomed());
    assert.isFalse(g.isZoomed("x"));
    assert.isFalse(g.isZoomed("y"));
  });
  it('testIsZoomed_updateOptions_x', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});
    g.updateOptions({
      dateWindow: [-.5, .3]
    });
    assert.isTrue(g.isZoomed());
    assert.isTrue(g.isZoomed("x"));
    assert.isFalse(g.isZoomed("y"));
  });
  it('testIsZoomed_updateOptions_y', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});
    g.updateOptions({
      valueRange: [1, 10]
    });
    assert.isTrue(g.isZoomed());
    assert.isFalse(g.isZoomed("x"));
    assert.isTrue(g.isZoomed("y"));
  });
  it('testIsZoomed_updateOptions_both', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {});
    g.updateOptions({
      dateWindow: [-1, 1],
      valueRange: [1, 10]
    });
    assert.isTrue(g.isZoomed());
    assert.isTrue(g.isZoomed("x"));
    assert.isTrue(g.isZoomed("y"));
  });
  it('testCorrectAxisValueRangeAfterUnzoom', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {
      valueRange: [1, 50],
      dateWindow: [1, 9],
      animatedZooms: false
    });

    // Zoom x axis
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 130, 100);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 130, 100);

    // Zoom y axis
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 100, 130);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 100, 130);
    var currentYAxisRange = g.yAxisRange();
    var currentXAxisRange = g.xAxisRange();

    //check that the range for the axis has changed
    assert.notEqual(1, currentXAxisRange[0]);
    assert.notEqual(10, currentXAxisRange[1]);
    assert.notEqual(1, currentYAxisRange[0]);
    assert.notEqual(50, currentYAxisRange[1]);

    // unzoom by doubleclick.  This is really the order in which a browser
    // generates events, and we depend on it.
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 10);
    _DygraphOps["default"].dispatchDoubleClick(g, null);

    // check if the range for both axis was reset to show the full data.
    assert.deepEqual(g.yAxisExtremes()[0], g.yAxisRange());
    assert.deepEqual(g.xAxisExtremes(), g.xAxisRange());
  });

  /**
   * Ensures pointClickCallback is called when some points along the y-axis don't
   * exist.
   */
  it('testPointClickCallback_missingData', function () {
    // There's a B-value at 2, but no A-value.
    var data = "X,A,B\n" + "1,,100\n" + "2,,110\n" + "3,140,120\n" + "4,130,110\n" + "";
    var clicked;
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      pointClickCallback: function pointClickCallback(event, point) {
        clicked = point;
      }
    });
    clickAt(g, 2, 110);
    assert.equal(2, clicked.xval);
    assert.equal(110, clicked.yval);
  });
  describe('animated zooms', function () {
    var oldDuration;
    before(function () {
      oldDuration = _dygraph["default"].ANIMATION_DURATION;
      _dygraph["default"].ANIMATION_DURATION = 100; // speed up the animation for testing
    });

    after(function () {
      _dygraph["default"].ANIMATION_DURATION = oldDuration;
    });
    it('should support animated zooms', function (done) {
      var data = "X,A,B\n" + "1,120,100\n" + "2,110,110\n" + "3,140,120\n" + "4,130,110\n";
      var ranges = [];
      var g = new _dygraph["default"]('graph', data, {
        animatedZooms: true
      });

      // updating the dateWindow does not result in an animation.
      assert.deepEqual([1, 4], g.xAxisRange());
      g.updateOptions({
        dateWindow: [2, 4]
      });
      assert.deepEqual([2, 4], g.xAxisRange());
      g.updateOptions({
        // zoomCallback is called once when the animation is complete.
        zoomCallback: function zoomCallback(xMin, xMax) {
          assert.equal(1, xMin);
          assert.equal(4, xMax);
          assert.deepEqual([1, 4], g.xAxisRange());
          done();
        }
      }, false);

      // Zoom out -- resetZoom() _does_ produce an animation.
      g.resetZoom();
      assert.notDeepEqual([2, 4], g.xAxisRange()); // first frame is synchronous
      assert.notDeepEqual([1, 4], g.xAxisRange());

      // at this point control flow goes up to zoomCallback
    });
  });

  //bulk copied from "testCorrectAxisValueRangeAfterUnzoom"
  //tests if the xRangePad is taken into account after unzoom.
  it('testCorrectAxisPaddingAfterUnzoom', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), data2, {
      valueRange: [1, 50],
      dateWindow: [1, 9],
      xRangePad: 10,
      animatedZooms: false
    });
    var xExtremes = g.xAxisExtremes();
    var _g$yAxisExtremes = g.yAxisExtremes(),
      _g$yAxisExtremes2 = _slicedToArray(_g$yAxisExtremes, 1),
      yExtremes = _g$yAxisExtremes2[0];

    // Zoom x axis
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 130, 100);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 130, 100);

    // Zoom y axis
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100);
    _DygraphOps["default"].dispatchMouseMove_Point(g, 100, 130);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 100, 130);

    //check that the range for the axis has changed
    assert.notDeepEqual([1, 10], g.xAxisRange());
    assert.notDeepEqual([1, 50], g.yAxisRange());

    // unzoom by doubleclick.  This is really the order in which a browser
    // generates events, and we depend on it.
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseDown_Point(g, 10, 10);
    _DygraphOps["default"].dispatchMouseUp_Point(g, 10, 10);
    _DygraphOps["default"].dispatchDoubleClick(g, null);

    // check if range for x-axis was reset to original value.
    assert.deepEqual(xExtremes, g.xAxisRange());
    assert.deepEqual(yExtremes, g.yAxisRange());
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-interaction-model":"dygraphs/src/dygraph-interaction-model.js","./DygraphOps":145}],171:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Util = _interopRequireDefault(require("./Util"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright (c) 2012 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @fileoverview Test cases for drawing lines with missing points.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

var ZERO_TO_FIFTY = [[10, 0], [20, 50]];
describe("missing-points", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);
  it('testSeparatedPointsDontDraw', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[1, 10, 11], [2, 11, null], [3, 12, 13]], {
      colors: ['red', 'blue'],
      labels: ['X', 'Y1', 'Y2']
    });
    var htx = g.hidden_ctx_;
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    assert.equal(0, _CanvasAssertions["default"].numLinesDrawn(htx, '#0000ff'));
  });
  it('testSeparatedPointsDontDraw_expanded', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[0, 10], [1, 11], [2, null], [3, 13], [4, 14]], {
      colors: ['blue'],
      labels: ['X', 'Y']
    });
    var htx = g.hidden_ctx_;
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#0000ff'));
    _CanvasAssertions["default"].assertLineDrawn(htx, [56, 275], [161, 212], {
      strokeStyle: '#0000ff'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, [370, 87], [475, 25], {
      strokeStyle: '#0000ff'
    });
  });
  it('testSeparatedPointsDontDraw_expanded_connected', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[0, 10], [1, 11], [2, null], [3, 13], [4, 14]], {
      colors: ['blue'],
      connectSeparatedPoints: true,
      labels: ['X', 'Y']
    });
    var htx = g.hidden_ctx_;
    var num_lines = 0;
    assert.equal(3, _CanvasAssertions["default"].numLinesDrawn(htx, '#0000ff'));
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [[56, 275], [161, 212], [370, 87], [475, 25]], {
      strokeStyle: '#0000ff'
    });
  });

  /**
   * At the time of writing this test, the blue series is only points, and not lines.
   */
  it('testConnectSeparatedPoints', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), [[1, null, 3], [2, 2, null], [3, null, 7], [4, 5, null], [5, null, 5], [6, 3, null]], {
      connectSeparatedPoints: true,
      drawPoints: true,
      colors: ['red', 'blue'],
      labels: ['X', 'Y1', 'Y2']
    });
    var htx = g.hidden_ctx_;
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#0000ff'));
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [[56, 225], [223, 25], [391, 125]], {
      strokeStyle: '#0000ff'
    });
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [[140, 275], [307, 125], [475, 225]], {
      strokeStyle: '#ff0000'
    });
  });

  /**
   * At the time of writing this test, the blue series is only points, and not lines.
   */
  it('testConnectSeparatedPointsWithNan', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "x,A,B  \n" + "1,,3   \n" + "2,2,   \n" + "3,,5   \n" + "4,4,   \n" + "5,,7   \n" + "6,NaN, \n" + "8,8,   \n" + "10,10, \n", {
      connectSeparatedPoints: true,
      drawPoints: true,
      colors: ['red', 'blue']
    });
    var htx = g.hidden_ctx_;

    // Red has two disconnected line segments
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    _CanvasAssertions["default"].assertLineDrawn(htx, [102, 275], [195, 212], {
      strokeStyle: '#ff0000'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, [381, 87], [475, 25], {
      strokeStyle: '#ff0000'
    });

    // Blue's lines are consecutive, however.
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#0000ff'));
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [[56, 244], [149, 181], [242, 118]], {
      strokeStyle: '#0000ff'
    });
  });

  /* These lines contain awesome powa!
    var lines = CanvasAssertions.getLinesDrawn(htx, {strokeStyle: "#0000ff"});
    for (var idx = 0; idx < lines.length; idx++) {
      var line = lines[idx];
      console.log(line[0].args, line[1].args, line[0].properties.strokeStyle);
    }
  */

  it('testErrorBarsWithMissingPoints', function () {
    var data = [[1, [2, 1]], [2, [3, 1]], [3, null], [4, [5, 1]], [5, [4, 1]], [6, [null, null]]];
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      errorBars: true,
      colors: ['red'],
      labels: ['X', 'Y']
    });
    var htx = g.hidden_ctx_;
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    var p0 = g.toDomCoords(data[0][0], data[0][1][0]);
    var p1 = g.toDomCoords(data[1][0], data[1][1][0]);
    var p2 = g.toDomCoords(data[3][0], data[3][1][0]);
    var p3 = g.toDomCoords(data[4][0], data[4][1][0]);
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [p0, p1], {
      strokeStyle: '#ff0000'
    });
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [p2, p3], {
      strokeStyle: '#ff0000'
    });
  });
  it('testErrorBarsWithMissingPointsConnected', function () {
    var data = [[1, [null, 1]], [2, [2, 1]], [3, null], [4, [5, 1]], [5, [null, null]], [6, [3, 1]]];
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      connectSeparatedPoints: true,
      drawPoints: true,
      errorBars: true,
      colors: ['red'],
      labels: ['X', 'Y']
    });
    var htx = g.hidden_ctx_;
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    var p1 = g.toDomCoords(data[1][0], data[1][1][0]);
    var p2 = g.toDomCoords(data[3][0], data[3][1][0]);
    var p3 = g.toDomCoords(data[5][0], data[5][1][0]);
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [p1, p2, p3], {
      strokeStyle: '#ff0000'
    });
  });
  it('testCustomBarsWithMissingPoints', function () {
    var data = [[1, [1, 2, 3]], [2, [2, 3, 4]], [3, null], [4, [4, 5, 6]], [5, [3, 4, 5]], [6, [null, null, null]], [7, [2, 3, 4]], [8, [1, 2, 3]], [9, NaN], [10, [2, 3, 4]], [11, [3, 4, 5]], [12, [NaN, NaN, NaN]]];
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      customBars: true,
      colors: ['red'],
      labels: ['X', 'Y']
    });
    var htx = g.hidden_ctx_;
    assert.equal(4, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    var p0 = g.toDomCoords(data[0][0], data[0][1][1]);
    var p1 = g.toDomCoords(data[1][0], data[1][1][1]);
    _CanvasAssertions["default"].assertLineDrawn(htx, p0, p1, {
      strokeStyle: '#ff0000'
    });
    p0 = g.toDomCoords(data[3][0], data[3][1][1]);
    p1 = g.toDomCoords(data[4][0], data[4][1][1]);
    _CanvasAssertions["default"].assertLineDrawn(htx, p0, p1, {
      strokeStyle: '#ff0000'
    });
    p0 = g.toDomCoords(data[6][0], data[6][1][1]);
    p1 = g.toDomCoords(data[7][0], data[7][1][1]);
    _CanvasAssertions["default"].assertLineDrawn(htx, p0, p1, {
      strokeStyle: '#ff0000'
    });
    ;
    p0 = g.toDomCoords(data[9][0], data[9][1][1]);
    p1 = g.toDomCoords(data[10][0], data[10][1][1]);
    _CanvasAssertions["default"].assertLineDrawn(htx, p0, p1, {
      strokeStyle: '#ff0000'
    });
  });
  it('testCustomBarsWithMissingPointsConnected', function () {
    var data = [[1, [1, null, 1]], [2, [1, 2, 3]], [3, null], [4, [4, 5, 6]], [5, [null, null, null]], [6, [2, 3, 4]]];
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      connectSeparatedPoints: true,
      drawPoints: true,
      customBars: true,
      colors: ['red'],
      labels: ['X', 'Y']
    });
    var htx = g.hidden_ctx_;
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    var p1 = g.toDomCoords(data[1][0], data[1][1][1]);
    var p2 = g.toDomCoords(data[3][0], data[3][1][1]);
    var p3 = g.toDomCoords(data[5][0], data[5][1][1]);
    _CanvasAssertions["default"].assertConsecutiveLinesDrawn(htx, [p1, p2, p3], {
      strokeStyle: '#ff0000'
    });
  });
  it('testLeftBoundaryWithMisingPoints', function () {
    var data = [[1, null, 3], [2, 1, null], [3, 0, 5], [4, 2, 1], [5, 4, null], [6, 3, 2]];
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      connectSeparatedPoints: true,
      drawPoints: true,
      colors: ['red', 'blue'],
      labels: ['X', 'Y1', 'Y2']
    });
    g.updateOptions({
      dateWindow: [2.5, 4.5]
    });
    assert.equal(1, g.getLeftBoundary_(0));
    assert.equal(0, g.getLeftBoundary_(1));
    var domX = g.toDomXCoord(1.9);
    var closestRow = g.findClosestRow(domX);
    assert.equal(1, closestRow);
    g.setSelection(closestRow);
    assert.equal(1, g.selPoints_.length);
    assert.equal(1, g.selPoints_[0].yval);
    g.setSelection(3);
    assert.equal(2, g.selPoints_.length);
    assert.equal(g.selPoints_[0].xval, g.selPoints_[1].xval);
    assert.equal(2, g.selPoints_[0].yval);
    assert.equal(1, g.selPoints_[1].yval);
  });

  // Regression test for issue #411
  it('testEmptySeries', function () {
    var graphDiv = document.getElementById("graph");
    var g = new _dygraph["default"](graphDiv, "Time,Empty Series,Series 1,Series 2\n" + "1381134460,,0,100\n" + "1381134461,,1,99\n" + "1381134462,,2,98\n" + "1381134463,,3,97\n" + "1381134464,,4,96\n" + "1381134465,,5,95\n" + "1381134466,,6,94\n" + "1381134467,,7,93\n" + "1381134468,,8,92\n" + "1381134469,,9,91\n", {
      visibility: [true, false, true],
      dateWindow: [1381134465, 1381134467]
    });
    g.setSelection(6);
    assert.equal("1381134466: Series 2: 94", _Util["default"].getLegend(graphDiv));
  });

  // Regression test for issue #485
  it('testMissingFill', function () {
    var graphDiv = document.getElementById("graph");
    var N = null;
    var g = new _dygraph["default"](graphDiv, [[1, [8, 10, 12]], [2, [3, 5, 7]], [3, N], [4, [9, N, 2]],
    // Note: nulls in arrays are not technically valid.
    [5, [N, 2, N]],
    // see dygraphs.com/data.html.
    [6, [2, 3, 6]]], {
      customBars: true,
      connectSeparatedPoints: false,
      labels: ["X", "Series1"]
    });

    // Make sure there are no 'NaN' line segments.
    var htx = g.hidden_ctx_;
    for (var i = 0; i < htx.calls__.length; i++) {
      var call = htx.calls__[i];
      if ((call.name == 'moveTo' || call.name == 'lineTo') && call.args) {
        for (var j = 0; j < call.args.length; j++) {
          assert.isFalse(isNaN(call.args[j]));
        }
      }
    }
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147,"./Util":148}],172:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for how axis labels are chosen and formatted.
 *
 * @author dan@dygraphs.com (Dan Vanderkam)
 */

describe("multi-csv", function () {
  cleanupAfterEach();
  function getXLabels() {
    var x_labels = document.getElementsByClassName("dygraph-axis-label-x");
    var ary = [];
    for (var i = 0; i < x_labels.length; i++) {
      ary.push(x_labels[i].innerHTML);
    }
    return ary;
  }
  it('testOneCSV', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(['0', '1', '2'], getXLabels());
  });
  it('testTwoCSV', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(['0', '1', '2'], getXLabels());
    g.updateOptions({
      file: data
    });
    assert.deepEqual(['0', '1', '2'], getXLabels());
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js"}],173:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Util = _interopRequireDefault(require("./Util"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests involving multiple y-axes.
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

describe("multiple-axes-tests", function () {
  cleanupAfterEach();
  var getData = function getData() {
    var data = [];
    for (var i = 1; i <= 100; i++) {
      var m = "01",
        d = i;
      if (d > 31) {
        m = "02";
        d -= 31;
      }
      if (m == "02" && d > 28) {
        m = "03";
        d -= 28;
      }
      if (m == "03" && d > 31) {
        m = "04";
        d -= 31;
      }
      if (d < 10) d = "0" + d;
      // two series, one with range 1-100, one with range 1-2M
      data.push([new Date("2010/" + m + "/" + d), i, 100 - i, 1e6 * (1 + i * (100 - i) / (50 * 50)), 1e6 * (2 - i * (100 - i) / (50 * 50))]);
    }
    return data;
  };
  it('testBasicMultipleAxes', function () {
    var data = getData();
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      width: 640,
      height: 350,
      series: {
        'Y3': {
          axis: 'y2'
        },
        'Y4': {
          axis: 'y2'
        }
      },
      axes: {
        y2: {
          // set axis-related properties here
          labelsKMB: true
        }
      }
    });
    assert.deepEqual(["0", "20", "40", "60", "80", "100"], _Util["default"].getYLabels("1"));
    assert.deepEqual(["900k", "1.12M", "1.34M", "1.55M", "1.77M", "1.99M"], _Util["default"].getYLabels("2"));
  });
  it('testTwoAxisVisibility', function () {
    var data = [];
    data.push([0, 0, 0]);
    data.push([1, 2, 2000]);
    data.push([2, 4, 1000]);
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['X', 'bar', 'zot'],
      series: {
        zot: {
          axis: 'y2'
        }
      },
      axes: {
        y2: {
          labelsKMB: true
        }
      }
    });
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y").length > 0);
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y2").length > 0);
    g.setVisibility(0, false);
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y").length > 0);
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y2").length > 0);
    g.setVisibility(0, true);
    g.setVisibility(1, false);
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y").length > 0);
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y2").length > 0);
  });

  // verifies that all four chart labels (title, x-, y-, y2-axis label) can be
  // used simultaneously.
  it('testMultiChartLabels', function () {
    var data = getData();
    var el = document.getElementById("graph");
    el.style.border = '1px solid black';
    el.style.marginLeft = '200px';
    el.style.marginTop = '200px';
    var g = new _dygraph["default"](el, data, {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      width: 640,
      height: 350,
      series: {
        'Y3': {
          axis: 'y2'
        },
        'Y4': {
          axis: 'y2'
        }
      },
      xlabel: 'x-axis',
      ylabel: 'y-axis',
      y2label: 'y2-axis',
      title: 'Chart title'
    });
    assert.deepEqual(["Chart title", "x-axis", "y-axis", "y2-axis"], _Util["default"].getClassTexts("dygraph-label"));
    assert.deepEqual(["Chart title"], _Util["default"].getClassTexts("dygraph-title"));
    assert.deepEqual(["x-axis"], _Util["default"].getClassTexts("dygraph-xlabel"));
    assert.deepEqual(["y-axis"], _Util["default"].getClassTexts("dygraph-ylabel"));
    assert.deepEqual(["y2-axis"], _Util["default"].getClassTexts("dygraph-y2label"));

    // TODO(danvk): check relative positioning here: title on top, y left of y2.
  });

  // Test option to draw Y2 axis, but not Y1
  it('testOnlyDrawingSecondAxis', function () {
    var data = getData();
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      drawPoints: true,
      pointSize: 3,
      series: {
        'Y4': {
          axis: 'y2'
        }
      },
      axes: {
        y: {
          drawAxis: false
        },
        y2: {
          drawAxis: true
        }
      }
    });
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y1").length == 0);
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y2").length > 0);
  });

  // Test default(?) Y-axis drawing: Y1 drawn, Y2 not drawn
  it('testNotDrawingSecondAxis', function () {
    var data = getData();
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      drawPoints: true,
      pointSize: 3,
      series: {
        'Y4': {
          axis: 'y2'
        }
      },
      axes: {
        y: {
          drawAxis: true
        },
        y2: {
          drawAxis: false
        }
      }
    });
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y1").length > 0);
    assert.isTrue(document.getElementsByClassName("dygraph-axis-label-y2").length == 0);
  });

  // Check that a chart w/o a secondary y-axis will not get a y2label, even if one
  // is specified.
  it('testNoY2LabelWithoutSecondaryAxis', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), getData(), {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      width: 640,
      height: 350,
      xlabel: 'x-axis',
      ylabel: 'y-axis',
      y2label: 'y2-axis',
      title: 'Chart title'
    });
    assert.deepEqual(["Chart title", "x-axis", "y-axis"], _Util["default"].getClassTexts("dygraph-label"));
    assert.deepEqual(["Chart title"], _Util["default"].getClassTexts("dygraph-title"));
    assert.deepEqual(["x-axis"], _Util["default"].getClassTexts("dygraph-xlabel"));
    assert.deepEqual(["y-axis"], _Util["default"].getClassTexts("dygraph-ylabel"));
    assert.deepEqual([], _Util["default"].getClassTexts("dygraph-y2label"));
  });
  it('testValueRangePerAxisOptions', function () {
    var data = getData();
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      series: {
        'Y3': {
          axis: 'y2'
        },
        'Y4': {
          axis: 'y2'
        }
      },
      axes: {
        y: {
          axisLabelWidth: 60,
          valueRange: [40, 70]
        },
        y2: {
          // set axis-related properties here
          labelsKMB: true
        }
      },
      ylabel: 'Primary y-axis',
      y2label: 'Secondary y-axis'
    });
    assert.deepEqual(["40", "45", "50", "55", "60", "65"], _Util["default"].getYLabels("1"));
    assert.deepEqual(["900k", "1.1M", "1.3M", "1.5M", "1.7M", "1.9M"], _Util["default"].getYLabels("2"));
    g.updateOptions({
      axes: {
        y: {
          valueRange: [40, 80]
        },
        y2: {
          valueRange: [1e6, 1.2e6]
        }
      }
    });
    assert.deepEqual(["40", "45", "50", "55", "60", "65", "70", "75"], _Util["default"].getYLabels("1"));
    assert.deepEqual(["1M", "1.02M", "1.05M", "1.08M", "1.1M", "1.13M", "1.15M", "1.18M"], _Util["default"].getYLabels("2"));
  });
  it('testDrawPointCallback', function () {
    var data = getData();
    var results = {
      y: {},
      y2: {}
    };
    var firstCallback = function firstCallback(g, seriesName, ctx, canvasx, canvasy, color, radius) {
      results.y[seriesName] = 1;
      utils.Circles.DEFAULT(g, seriesName, ctx, canvasx, canvasy, color, radius);
    };
    var secondCallback = function secondCallback(g, seriesName, ctx, canvasx, canvasy, color, radius) {
      results.y2[seriesName] = 1;
      utils.Circles.DEFAULT(g, seriesName, ctx, canvasx, canvasy, color, radius);
    };
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      drawPoints: true,
      pointSize: 3,
      series: {
        'Y3': {
          axis: 'y2'
        },
        'Y4': {
          axis: 'y2'
        }
      },
      axes: {
        y2: {
          drawPointCallback: secondCallback
        }
      },
      drawPointCallback: firstCallback
    });
    assert.equal(1, results.y["Y1"]);
    assert.equal(1, results.y["Y2"]);
    assert.equal(1, results.y2["Y3"]);
    assert.equal(1, results.y2["Y4"]);
  });

  // Test for http://code.google.com/p/dygraphs/issues/detail?id=436
  it('testRemovingSecondAxis', function () {
    var data = getData();
    var results = {
      y: {},
      y2: {}
    };
    var g = new _dygraph["default"](document.getElementById("graph"), data, {
      labels: ['Date', 'Y1', 'Y2', 'Y3', 'Y4'],
      drawPoints: true,
      pointSize: 3,
      series: {
        'Y4': {
          axis: 'y2'
        }
      }
    });
    g.updateOptions({
      series: {
        Y4: {
          axis: 'y'
        }
      }
    });
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./Util":148}],174:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests that we don'show specify hours, minutes or seconds
 * in your dates if you don't specify them. This can get mixed up becaues of
 * time zones.
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("no-hours", function () {
  cleanupAfterEach();
  it('testNoHours', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "Date,Y\n" + "2012/03/13,-1\n" + "2012/03/14,0\n" + "2012/03/15,1\n" + "2012/03/16,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setSelection(0);
    assert.equal("2012/03/13: Y: -1", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("2012/03/14: Y: 0", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2012/03/15: Y: 1", _Util["default"].getLegend());
    g.setSelection(3);
    assert.equal("2012/03/16: Y: 0", _Util["default"].getLegend());
  });
  it('testNoHoursDashed', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "Date,Y\n" + "2012-03-13,-1\n" + "2012-03-14,0\n" + "2012-03-15,1\n" + "2012-03-16,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setSelection(0);
    assert.equal("2012/03/13: Y: -1", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("2012/03/14: Y: 0", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2012/03/15: Y: 1", _Util["default"].getLegend());
    g.setSelection(3);
    assert.equal("2012/03/16: Y: 0", _Util["default"].getLegend());
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./Util":148}],175:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var DygraphTickers = _interopRequireWildcard(require("../../src/dygraph-tickers"));
var _dygraphDefaultAttrs = _interopRequireDefault(require("../../src/dygraph-default-attrs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for the numeric tick-generating functions.
 * These were generated by adding logging code to the old ticker functions. The
 * tests serve to track existing behavior should it change in the future.
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

describe("numeric-ticker-tests", function () {
  cleanupAfterEach();
  var createOptionsViewForAxis = function createOptionsViewForAxis(axis, dict) {
    return function (x) {
      if (dict && dict.hasOwnProperty(x)) {
        return dict[x];
      }
      if (_dygraphDefaultAttrs["default"].axes[axis].hasOwnProperty(x)) {
        return _dygraphDefaultAttrs["default"].axes[axis][x];
      }
      if (_dygraphDefaultAttrs["default"].hasOwnProperty(x)) {
        return _dygraphDefaultAttrs["default"][x];
      }
      if (x == 'axisLabelFormatter') return null;
      throw "mysterious " + axis + "-axis option: " + x;
    };
  };
  it('testBasicNumericTicker', function () {
    var opts = {
      "logscale": null,
      "labelsKMG2": false,
      "labelsKMB": false
    };
    var options = createOptionsViewForAxis('y', opts);
    var ticks = DygraphTickers.numericTicks(-0.4, 4.4, 320, options);
    var expected_ticks = [{
      "v": -0.5,
      "label": "-0.5"
    }, {
      "v": 0,
      "label": "0"
    }, {
      "v": 0.5,
      "label": "0.5"
    }, {
      "v": 1,
      "label": "1"
    }, {
      "v": 1.5,
      "label": "1.5"
    }, {
      "v": 2,
      "label": "2"
    }, {
      "v": 2.5,
      "label": "2.5"
    }, {
      "v": 3,
      "label": "3"
    }, {
      "v": 3.5,
      "label": "3.5"
    }, {
      "v": 4,
      "label": "4"
    }, {
      "v": 4.5,
      "label": "4.5"
    }];
    assert.deepEqual(expected_ticks, ticks);
    ticks = DygraphTickers.numericTicks(1, 84, 540, options);
    var expected_ticks = [{
      "v": 0,
      "label": "0"
    }, {
      "v": 5,
      "label": "5"
    }, {
      "v": 10,
      "label": "10"
    }, {
      "v": 15,
      "label": "15"
    }, {
      "v": 20,
      "label": "20"
    }, {
      "v": 25,
      "label": "25"
    }, {
      "v": 30,
      "label": "30"
    }, {
      "v": 35,
      "label": "35"
    }, {
      "v": 40,
      "label": "40"
    }, {
      "v": 45,
      "label": "45"
    }, {
      "v": 50,
      "label": "50"
    }, {
      "v": 55,
      "label": "55"
    }, {
      "v": 60,
      "label": "60"
    }, {
      "v": 65,
      "label": "65"
    }, {
      "v": 70,
      "label": "70"
    }, {
      "v": 75,
      "label": "75"
    }, {
      "v": 80,
      "label": "80"
    }, {
      "v": 85,
      "label": "85"
    }];
    assert.deepEqual(expected_ticks, ticks);
  });

  /*
  it('testAllNumericTickers', function() {
    assert.deepEqual([{"v":-0.5,"label":"-0.5"},{"v":0,"label":"0"},{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"}], Dygraph.numericTicks(-0.4, 4.4, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-1.5,"label":"-1.5"},{"v":-1,"label":"-1"},{"v":-0.5,"label":"-0.5"},{"v":0,"label":"0"},{"v":0.5,"label":"0.5"},{"v":1,"label":"1"}], Dygraph.numericTicks(-1.4157430939856124, 1.4157430939856124, 400, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-10,"label":"-10"},{"v":-8,"label":"-8"},{"v":-6,"label":"-6"},{"v":-4,"label":"-4"},{"v":-2,"label":"-2"},{"v":0,"label":"0"},{"v":2,"label":"2"},{"v":4,"label":"4"},{"v":6,"label":"6"},{"v":8,"label":"8"}], Dygraph.numericTicks(-10, 9.98046875, 400, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-200,"label":"-200"},{"v":0,"label":"0"},{"v":200,"label":"200"},{"v":400,"label":"400"},{"v":600,"label":"600"},{"v":800,"label":"800"},{"v":-17999000,"label":"1000"}], Dygraph.numericTicks(-101.10000000000001, 1100.1, 300, createOptionsViewForAxis('y',{"logscale":false,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-20,"label":"-20"},{"v":-10,"label":"-10"},{"v":0,"label":"0"},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"}], Dygraph.numericTicks(-11.687459005175139, 42.287459005175144, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-15,"label":"-15"},{"v":-10,"label":"-10"},{"v":-5,"label":"-5"},{"v":0,"label":"0"},{"v":5,"label":"5"},{"v":10,"label":"10"}], Dygraph.numericTicks(-12, 12, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-15,"label":"-15"},{"v":-10,"label":"-10"},{"v":-5,"label":"-5"},{"v":0,"label":"0"},{"v":5,"label":"5"},{"v":10,"label":"10"}], Dygraph.numericTicks(-13.19792086872138, 13.197062407353386, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-220,"label":"-220"},{"v":-200,"label":"-200"},{"v":-180,"label":"-180"},{"v":-160,"label":"-160"},{"v":-140,"label":"-140"},{"v":-120,"label":"-120"}], Dygraph.numericTicks(-220, -100, 200, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-40,"label":"-40"},{"v":-20,"label":"-20"},{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"},{"v":120,"label":"120"}], Dygraph.numericTicks(-32.8, 132.8, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-40,"label":"-40"},{"v":-30,"label":"-30"},{"v":-20,"label":"-20"},{"v":-10,"label":"-10"},{"v":0,"label":"0"},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"}], Dygraph.numericTicks(-34.309, 89.279, 400, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-60,"label":"-60"},{"v":-40,"label":"-40"},{"v":-20,"label":"-20"},{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"}], Dygraph.numericTicks(-60, 60, 200, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":-60,"label":"-60"},{"v":-40,"label":"-40"},{"v":-20,"label":"-20"},{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"}], Dygraph.numericTicks(-60, 60, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.0001,"label":"1.00e-4"},{"v":0.0002,"label":"2.00e-4"},{"v":-17999999,"label":"3.00e-4"},{"v":0.0004,"label":"4.00e-4"},{"v":0.0005,"label":"5.00e-4"}], Dygraph.numericTicks(0, 0.00055, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":0},{"v":0.0001,"label":0.0001},{"v":0.0002,"label":0.0002},{"v":-17999999,"label":0.0003},{"v":0.0004,"label":0.0004},{"v":0.0005,"label":0.0005}], Dygraph.numericTicks(0, 0.00055, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.2,"label":"0.2"},{"v":0.4,"label":"0.4"},{"v":-17999999,"label":"0.6"},{"v":0.8,"label":"0.8"}], Dygraph.numericTicks(0, 1, 200, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.2,"label":"0.2"},{"v":0.4,"label":"0.4"},{"v":-17999999,"label":"0.6"},{"v":0.8,"label":"0.8"}], Dygraph.numericTicks(0, 1, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.1,"label":"0.1"},{"v":0.2,"label":"0.2"},{"v":-17999999,"label":"0.3"},{"v":0.4,"label":"0.4"},{"v":0.5,"label":"0.5"},{"v":-17999999,"label":"0.6"},{"v":-17999999,"label":"0.7"},{"v":0.8,"label":"0.8"},{"v":0.9,"label":"0.9"},{"v":1,"label":"1"},{"v":1.1,"label":"1.1"},{"v":-17999998,"label":"1.2"}], Dygraph.numericTicks(0, 1.2, 400, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(0, 100, 400, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"}], Dygraph.numericTicks(0, 104.53192180924043, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"}], Dygraph.numericTicks(0, 109.9856877755916, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":2,"label":"2"},{"v":4,"label":"4"},{"v":6,"label":"6"},{"v":8,"label":"8"},{"v":10,"label":"10"}], Dygraph.numericTicks(0, 11, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"}], Dygraph.numericTicks(0, 110, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"}], Dygraph.numericTicks(0, 110, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"},{"v":100,"label":"100"}], Dygraph.numericTicks(0, 110, 350, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":200,"label":"200"},{"v":400,"label":"400"},{"v":600,"label":"600"},{"v":800,"label":"800"},{"v":-17999000,"label":"1000"}], Dygraph.numericTicks(0, 1100, 300, createOptionsViewForAxis('y',{"logscale":false,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":-17000000,"label":"1M"},{"v":-16000000,"label":"2M"},{"v":-15000000,"label":"3M"},{"v":-14000000,"label":"4M"},{"v":-13000000,"label":"5M"},{"v":-12000000,"label":"6M"},{"v":-11000000,"label":"7M"},{"v":-10000000,"label":"8M"},{"v":-9000000,"label":"9M"},{"v":-8000000,"label":"10M"}], Dygraph.numericTicks(0, 11000000, 480, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"}], Dygraph.numericTicks(0, 119, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"},{"v":120,"label":"120"}], Dygraph.numericTicks(0, 130.9, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"},{"v":120,"label":"120"}], Dygraph.numericTicks(0, 131, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":-17998000,"label":"2000"},{"v":-17996000,"label":"4000"},{"v":-17994000,"label":"6000"},{"v":-17992000,"label":"8000"},{"v":-17990000,"label":"10000"},{"v":-17988000,"label":"12000"},{"v":-17986000,"label":"14000"},{"v":-17984000,"label":"16000"}], Dygraph.numericTicks(0, 16977.4, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"}], Dygraph.numericTicks(0, 2, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.2,"label":"0.2"},{"v":0.4,"label":"0.4"},{"v":-17999999,"label":"0.6"},{"v":0.8,"label":"0.8"},{"v":1,"label":"1"},{"v":-17999998,"label":"1.2"},{"v":-17999998,"label":"1.4"},{"v":1.6,"label":"1.6"},{"v":1.8,"label":"1.8"}], Dygraph.numericTicks(0, 2, 400, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"}], Dygraph.numericTicks(0, 2.2, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":-17800000,"label":"200K"},{"v":-17600000,"label":"400K"},{"v":-17400000,"label":"600K"},{"v":-17200000,"label":"800K"},{"v":-17000000,"label":"1M"},{"v":-16800000,"label":"1.2M"},{"v":-16600000,"label":"1.4M"},{"v":-16400000,"label":"1.6M"},{"v":-16200000,"label":"1.8M"},{"v":-16000000,"label":"2M"}], Dygraph.numericTicks(0, 2200000, 350, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":50,"label":"50"},{"v":100,"label":"100"},{"v":150,"label":"150"},{"v":200,"label":"200"}], Dygraph.numericTicks(0, 249, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":500,"label":"500"},{"v":-17999000,"label":"1000"},{"v":1500,"label":"1500"},{"v":-17998000,"label":"2000"},{"v":2500,"label":"2500"}], Dygraph.numericTicks(0, 2747.9970998900817, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":200,"label":"200"},{"v":400,"label":"400"},{"v":600,"label":"600"},{"v":800,"label":"800"},{"v":-17999000,"label":"1K"},{"v":1200,"label":"1.2K"},{"v":1400,"label":"1.4K"},{"v":1600,"label":"1.6K"},{"v":1800,"label":"1.8K"},{"v":-17998000,"label":"2K"},{"v":2200,"label":"2.2K"},{"v":2400,"label":"2.4K"},{"v":2600,"label":"2.6K"}], Dygraph.numericTicks(0, 2747.9970998900817, 480, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":5,"label":"5"},{"v":10,"label":"10"},{"v":15,"label":"15"},{"v":20,"label":"20"},{"v":25,"label":"25"},{"v":30,"label":"30"}], Dygraph.numericTicks(0, 32.698942321287205, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":-17500000,"label":"500000"},{"v":-17000000,"label":"1.00e+6"},{"v":-16500000,"label":"1.50e+6"},{"v":-16000000,"label":"2.00e+6"},{"v":-15500000,"label":"2.50e+6"},{"v":-15000000,"label":"3.00e+6"}], Dygraph.numericTicks(0, 3263100.6418021005, 480, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":5,"label":"5"},{"v":10,"label":"10"},{"v":15,"label":"15"},{"v":20,"label":"20"},{"v":25,"label":"25"},{"v":30,"label":"30"}], Dygraph.numericTicks(0, 33.16213467701236, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"}], Dygraph.numericTicks(0, 4, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"}], Dygraph.numericTicks(0, 4.4, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":5,"label":"5"},{"v":10,"label":"10"},{"v":15,"label":"15"},{"v":20,"label":"20"},{"v":25,"label":"25"},{"v":30,"label":"30"},{"v":35,"label":"35"},{"v":40,"label":"40"}], Dygraph.numericTicks(0, 42, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":8,"label":"8"},{"v":16,"label":"16"},{"v":24,"label":"24"},{"v":32,"label":"32"},{"v":40,"label":"40"}], Dygraph.numericTicks(0, 42, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":true,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":0},{"v":8,"label":8},{"v":16,"label":16},{"v":24,"label":24},{"v":32,"label":32},{"v":40,"label":40}], Dygraph.numericTicks(0, 42, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":true,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":999982000000,"label":"1T"},{"v":1999982000000,"label":"2T"},{"v":2999982000000,"label":"3T"},{"v":3999982000000,"label":"4T"}], Dygraph.numericTicks(0, 4837851162214.3, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":549755813888,"label":"512G"},{"v":1099511627776,"label":"1T"},{"v":1649267441664,"label":"1.5T"},{"v":2199023255552,"label":"2T"},{"v":2748779069440,"label":"2.5T"},{"v":3298534883328,"label":"3T"},{"v":3848290697216,"label":"3.5T"},{"v":4398046511104,"label":"4T"}], Dygraph.numericTicks(0, 4837851162214.3, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":true,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":0},{"v":549755813888,"label":"512G"},{"v":1099511627776,"label":"1T"},{"v":1649267441664,"label":"1.5T"},{"v":2199023255552,"label":"2T"},{"v":2748779069440,"label":"2.5T"},{"v":3298534883328,"label":"3T"},{"v":3848290697216,"label":"3.5T"},{"v":4398046511104,"label":"4T"}], Dygraph.numericTicks(0, 4837851162214.3, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":true,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":-17999000,"label":"1000"},{"v":-17998000,"label":"2000"},{"v":-17997000,"label":"3000"},{"v":-17996000,"label":"4000"},{"v":-17995000,"label":"5000"}], Dygraph.numericTicks(0, 5451.6, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":100,"label":"100"},{"v":200,"label":"200"},{"v":300,"label":"300"},{"v":400,"label":"400"},{"v":500,"label":"500"}], Dygraph.numericTicks(0, 550, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"}], Dygraph.numericTicks(0, 64.9, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":100,"label":"100"},{"v":200,"label":"200"},{"v":300,"label":"300"},{"v":400,"label":"400"},{"v":500,"label":"500"},{"v":600,"label":"600"}], Dygraph.numericTicks(0, 667.9, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":"6"},{"v":7,"label":"7"}], Dygraph.numericTicks(0, 7.7, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":"6"},{"v":7,"label":"7"}], Dygraph.numericTicks(0, 7.9347329768293005, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"}], Dygraph.numericTicks(0, 72.6, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"}], Dygraph.numericTicks(0, 99, 200, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"}], Dygraph.numericTicks(0, 99, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(0, 99, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":200,"label":"200"},{"v":400,"label":"400"},{"v":600,"label":"600"},{"v":800,"label":"800"}], Dygraph.numericTicks(0, 999, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0.000001,"label":"1.00e-6"},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":"1.00e-5"},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":0.0001,"label":"1.00e-4"},{"v":0.0002,"label":""},{"v":-17999999,"label":""},{"v":0.0004,"label":""},{"v":0.0005,"label":""},{"v":-17999999,"label":""},{"v":0.0007,"label":""},{"v":0.0008,"label":""},{"v":-17999999,"label":""},{"v":0.001,"label":"1.00e-3"},{"v":0.002,"label":""},{"v":0.003,"label":""},{"v":0.004,"label":""},{"v":0.005,"label":""},{"v":0.006,"label":""},{"v":0.007,"label":""},{"v":0.008,"label":""},{"v":-17999999,"label":""},{"v":0.01,"label":"0.01"},{"v":0.02,"label":""},{"v":0.03,"label":""},{"v":0.04,"label":""},{"v":0.05,"label":""},{"v":0.06,"label":""},{"v":0.07,"label":""},{"v":0.08,"label":""},{"v":0.09,"label":""},{"v":0.1,"label":"0.1"},{"v":0.2,"label":""},{"v":-17999999,"label":""},{"v":0.4,"label":""},{"v":0.5,"label":""},{"v":-17999999,"label":""},{"v":-17999999,"label":""},{"v":0.8,"label":""},{"v":0.9,"label":""},{"v":1,"label":"1"},{"v":2,"label":""},{"v":3,"label":""},{"v":4,"label":""},{"v":5,"label":""},{"v":6,"label":""},{"v":7,"label":""},{"v":8,"label":""},{"v":9,"label":""},{"v":10,"label":"10"},{"v":20,"label":""},{"v":30,"label":""},{"v":40,"label":""},{"v":50,"label":""},{"v":60,"label":""},{"v":70,"label":""},{"v":80,"label":""},{"v":90,"label":""},{"v":100,"label":"100"},{"v":200,"label":""},{"v":300,"label":""},{"v":400,"label":""},{"v":500,"label":""},{"v":600,"label":""},{"v":700,"label":""},{"v":800,"label":""},{"v":900,"label":""},{"v":-17999000,"label":"1000"}], Dygraph.numericTicks(0.000001, 1099.9999999, 300, createOptionsViewForAxis('y',{"logscale":true,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"}], Dygraph.numericTicks(0.6, 5.4, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"},{"v":4.5,"label":"4.5"}], Dygraph.numericTicks(0.6373123361267239, 4.824406504982038, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"},{"v":4.5,"label":"4.5"}], Dygraph.numericTicks(0.6373123361267239, 4.824406504982038, 353, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0.6000000000000001,"label":"0.6"},{"v":0.8,"label":"0.8"},{"v":1,"label":"1"},{"v":-17999998,"label":"1.2"},{"v":-17999998,"label":"1.4"},{"v":1.6,"label":"1.6"},{"v":-17999998,"label":"1.8"},{"v":2,"label":"2"},{"v":2.2,"label":"2.2"},{"v":-17999997,"label":"2.4"},{"v":2.6,"label":"2.6"},{"v":-17999997,"label":"2.8"},{"v":-17999997,"label":"3"},{"v":3.2,"label":"3.2"},{"v":-17999996,"label":"3.4"},{"v":3.6,"label":"3.6"},{"v":-17999996,"label":"3.8"},{"v":4,"label":"4"},{"v":4.2,"label":"4.2"},{"v":4.4,"label":"4.4"},{"v":4.6,"label":"4.6"},{"v":-17999995,"label":"4.8"}], Dygraph.numericTicks(0.6373123361267239, 4.824406504982038, 743, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"},{"v":4.5,"label":"4.5"}], Dygraph.numericTicks(0.6386658954698001, 4.8095173522082, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0.5,"label":"0.5"},{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"}], Dygraph.numericTicks(0.7101014279158788, 4.023726495301334, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":20,"label":"20"},{"v":40,"label":"40"},{"v":60,"label":"60"},{"v":80,"label":"80"},{"v":100,"label":"100"}], Dygraph.numericTicks(1, 109, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"}], Dygraph.numericTicks(1, 3, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"}], Dygraph.numericTicks(1, 4, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"}], Dygraph.numericTicks(1, 4, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"},{"v":4.5,"label":"4.5"}], Dygraph.numericTicks(1, 5, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":1},{"v":1.5,"label":1.5},{"v":2,"label":2},{"v":2.5,"label":2.5},{"v":3,"label":3},{"v":3.5,"label":3.5},{"v":4,"label":4},{"v":4.5,"label":4.5}], Dygraph.numericTicks(1, 5, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"}], Dygraph.numericTicks(1, 6, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":"6"}], Dygraph.numericTicks(1, 7, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":"6"},{"v":7,"label":"7"},{"v":8,"label":"8"}], Dygraph.numericTicks(1, 9, 300, createOptionsViewForAxis('y',{"logscale":false,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":""},{"v":7,"label":"7"},{"v":8,"label":""},{"v":9,"label":"9"}], Dygraph.numericTicks(1, 9, 300, createOptionsViewForAxis('y',{"logscale":true,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":"6"},{"v":7,"label":"7"},{"v":8,"label":"8"}], Dygraph.numericTicks(1, 9, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":2,"label":"2"},{"v":4,"label":"4"},{"v":6,"label":"6"},{"v":8,"label":"8"},{"v":10,"label":"10"}], Dygraph.numericTicks(1.2, 10.8, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":1.5,"label":"1.5"},{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"},{"v":4.5,"label":"4.5"}], Dygraph.numericTicks(1.2872947778969237, 4.765317192093838, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":1,"label":"1"},{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":"6"},{"v":7,"label":"7"}], Dygraph.numericTicks(1.5, 7.5, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":5,"label":"5"},{"v":10,"label":"10"},{"v":15,"label":"15"},{"v":20,"label":"20"},{"v":25,"label":"25"}], Dygraph.numericTicks(1.7999999999999998, 28.2, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":10,"label":"10"},{"v":10.1,"label":"10.1"},{"v":10.2,"label":"10.2"},{"v":10.3,"label":"10.3"},{"v":10.4,"label":"10.4"},{"v":10.5,"label":"10.5"},{"v":10.6,"label":"10.6"},{"v":10.7,"label":"10.7"},{"v":10.8,"label":"10.8"},{"v":10.9,"label":"10.9"}], Dygraph.numericTicks(10, 11, 480, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":100,"label":"100"},{"v":120,"label":"120"},{"v":140,"label":"140"},{"v":160,"label":"160"},{"v":180,"label":"180"}], Dygraph.numericTicks(100, 200, 200, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":10000,"label":"10000"},{"v":-17988000,"label":"12000"},{"v":-17986000,"label":"14000"},{"v":-17984000,"label":"16000"},{"v":-17982000,"label":"18000"},{"v":-17980000,"label":"20000"},{"v":-17978000,"label":"22000"},{"v":-17976000,"label":"24000"},{"v":-17974000,"label":"26000"},{"v":-17972000,"label":"28000"},{"v":-17970000,"label":"30000"},{"v":-17968000,"label":"32000"},{"v":-17966000,"label":"34000"},{"v":-17964000,"label":"36000"}], Dygraph.numericTicks(10122.8, 36789.2, 480, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":11000,"label":"11000"},{"v":11200,"label":"11200"},{"v":11400,"label":"11400"},{"v":11600,"label":"11600"},{"v":11800,"label":"11800"},{"v":-17988000,"label":"12000"},{"v":12200,"label":"12200"},{"v":12400,"label":"12400"},{"v":12600,"label":"12600"},{"v":12800,"label":"12800"},{"v":-17987000,"label":"13000"},{"v":13200,"label":"13200"},{"v":13400,"label":"13400"}], Dygraph.numericTicks(11110.5, 13579.5, 480, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":162000,"label":"162000"},{"v":-17836000,"label":"164000"},{"v":-17834000,"label":"166000"},{"v":-17832000,"label":"168000"},{"v":-17830000,"label":"170000"},{"v":-17828000,"label":"172000"},{"v":-17826000,"label":"174000"},{"v":-17824000,"label":"176000"},{"v":-17822000,"label":"178000"}], Dygraph.numericTicks(163038.4, 179137.6, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":2,"label":"2"},{"v":2.5,"label":"2.5"},{"v":3,"label":"3"},{"v":3.5,"label":"3.5"}], Dygraph.numericTicks(2, 4, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":2,"label":"2"},{"v":3,"label":"3"},{"v":4,"label":"4"},{"v":5,"label":"5"},{"v":6,"label":"6"},{"v":7,"label":"7"}], Dygraph.numericTicks(2.6, 7.4, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(21.7, 97.3, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(21.7, 97.3, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(24, 96, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"}], Dygraph.numericTicks(26.185714285714287, 90.81428571428572, 20, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(26.185714285714287, 90.81428571428572, 200, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false,pixelsPerLabel:20})));
    assert.deepEqual([{"v":25,"label":"25"},{"v":30,"label":"30"},{"v":35,"label":"35"},{"v":40,"label":"40"},{"v":45,"label":"45"},{"v":50,"label":"50"},{"v":55,"label":"55"},{"v":60,"label":"60"},{"v":65,"label":"65"},{"v":70,"label":"70"},{"v":75,"label":"75"},{"v":80,"label":"80"},{"v":85,"label":"85"},{"v":90,"label":"90"}], Dygraph.numericTicks(26.185714285714287, 90.81428571428572, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false,pixelsPerLabel:20})));
    assert.deepEqual([{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(26.185714285714287, 90.81428571428572, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":20,"label":"20"},{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"}], Dygraph.numericTicks(28.33333333333333, 88.33333333333334, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":3,"label":"3"},{"v":3.5,"label":"3.5"},{"v":4,"label":"4"},{"v":4.5,"label":"4.5"}], Dygraph.numericTicks(3, 5, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":3000,"label":"3K"},{"v":2500,"label":"2.5K"},{"v":-17998000,"label":"2K"},{"v":1500,"label":"1.5K"},{"v":-17999000,"label":"1K"},{"v":500,"label":"500"}], Dygraph.numericTicks(3000, 0, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"}], Dygraph.numericTicks(33.11333333333334, 83.75333333333333, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":30,"label":"30"},{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"}], Dygraph.numericTicks(36.921241050119335, 88.32696897374701, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":50,"label":""},{"v":60,"label":"60"},{"v":70,"label":""},{"v":80,"label":""},{"v":90,"label":""},{"v":100,"label":"100"},{"v":200,"label":""},{"v":300,"label":"300"},{"v":400,"label":""},{"v":500,"label":""},{"v":600,"label":"600"},{"v":700,"label":""},{"v":800,"label":""},{"v":900,"label":""},{"v":-17999000,"label":"1000"},{"v":-17998000,"label":""},{"v":-17997000,"label":"3000"},{"v":-17996000,"label":""},{"v":-17995000,"label":""},{"v":-17994000,"label":"6000"},{"v":-17993000,"label":""},{"v":-17992000,"label":""},{"v":-17991000,"label":""},{"v":-17990000,"label":"10000"}], Dygraph.numericTicks(41.220000000000084, 15576.828000000018, 400, createOptionsViewForAxis('y',{"logscale":true,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":40,"label":"40"},{"v":50,"label":"50"},{"v":60,"label":"60"},{"v":70,"label":"70"},{"v":80,"label":"80"},{"v":90,"label":"90"}], Dygraph.numericTicks(44.5, 98.5, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":5,"label":"5"},{"v":6,"label":""},{"v":7,"label":""},{"v":8,"label":""},{"v":9,"label":""},{"v":10,"label":"10"},{"v":20,"label":"20"},{"v":30,"label":""},{"v":40,"label":""},{"v":50,"label":"50"},{"v":60,"label":""},{"v":70,"label":""},{"v":80,"label":""},{"v":90,"label":""},{"v":100,"label":"100"},{"v":200,"label":"200"},{"v":300,"label":""},{"v":400,"label":""},{"v":500,"label":"500"},{"v":600,"label":""},{"v":700,"label":""},{"v":800,"label":""},{"v":900,"label":""},{"v":-17999000,"label":"1000"}], Dygraph.numericTicks(5, 1099.5, 300, createOptionsViewForAxis('y',{"logscale":true,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":50,"label":"50"},{"v":55,"label":"55"},{"v":60,"label":"60"},{"v":65,"label":"65"},{"v":70,"label":"70"},{"v":75,"label":"75"},{"v":80,"label":"80"}], Dygraph.numericTicks(52.5, 82.5, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":68,"label":"68"},{"v":70,"label":"70"},{"v":72,"label":"72"},{"v":74,"label":"74"},{"v":76,"label":"76"},{"v":78,"label":"78"},{"v":80,"label":"80"}], Dygraph.numericTicks(69, 81, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":0,"label":"0"},{"v":-17980000,"label":"20K"},{"v":-17960000,"label":"40K"},{"v":-17940000,"label":"60K"},{"v":-17920000,"label":"80K"}], Dygraph.numericTicks(7921.099999999999, 81407.9, 240, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":8,"label":"8"},{"v":10,"label":"10"},{"v":12,"label":"12"},{"v":14,"label":"14"},{"v":16,"label":"16"},{"v":18,"label":"18"},{"v":20,"label":"20"}], Dygraph.numericTicks(9, 21, 300, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":8,"label":"8"},{"v":10,"label":"10"},{"v":12,"label":"12"},{"v":14,"label":"14"},{"v":16,"label":"16"},{"v":18,"label":"18"},{"v":20,"label":"20"}], Dygraph.numericTicks(9, 21, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":9,"label":"9"},{"v":10,"label":"10"},{"v":11,"label":"11"},{"v":12,"label":"12"},{"v":13,"label":"13"},{"v":14,"label":"14"},{"v":15,"label":"15"},{"v":16,"label":"16"},{"v":17,"label":"17"},{"v":18,"label":"18"}], Dygraph.numericTicks(9.2, 18.8, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":80,"label":"80"},{"v":100,"label":"100"},{"v":120,"label":"120"},{"v":140,"label":"140"},{"v":160,"label":"160"},{"v":180,"label":"180"},{"v":200,"label":"200"}], Dygraph.numericTicks(90, 210, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":true})));
    assert.deepEqual([{"v":95,"label":"95"},{"v":96,"label":"96"},{"v":97,"label":"97"},{"v":98,"label":"98"},{"v":99,"label":"99"},{"v":100,"label":"100"},{"v":101,"label":"101"},{"v":102,"label":"102"},{"v":103,"label":"103"},{"v":104,"label":"104"}], Dygraph.numericTicks(95.71121718377088, 104.23150357995226, 320, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
    assert.deepEqual([{"v":950,"label":"950"},{"v":-17999000,"label":"1000"},{"v":1050,"label":"1050"},{"v":1100,"label":"1100"},{"v":1150,"label":"1150"},{"v":1200,"label":"1200"}], Dygraph.numericTicks(980.1, 1218.9, 200, createOptionsViewForAxis('y',{"logscale":null,"labelsKMG2":false,"labelsKMB":false})));
  });
  */
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-default-attrs":"dygraphs/src/dygraph-default-attrs.js","../../src/dygraph-tickers":"dygraphs/src/dygraph-tickers.js"}],176:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests the way that dygraphs parses data.
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("parser", function () {
  cleanupAfterEach();
  it('testDetectLineDelimiter', function () {
    var data = "X,Y\r" + "0,-1\r" + "1,0\r" + "2,1\r" + "3,0\r";
    assert.equal("\r", utils.detectLineDelimiter(data));
    data = "X,Y\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    assert.equal("\n", utils.detectLineDelimiter(data));
    data = "X,Y\n\r" + "0,-1\n\r" + "1,0\n\r" + "2,1\n\r" + "3,0\n\r";
    assert.equal("\n\r", utils.detectLineDelimiter(data));
  });
  it('testParseDosNewlines', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\r" + "0,-1\r" + "1,0\r" + "2,1\r" + "3,0\r";
    var g = new _dygraph["default"]('graph', data, opts);
    assert.equal(0, g.getValue(0, 0));
    assert.equal(-1, g.getValue(0, 1));
    assert.equal(1, g.getValue(1, 0));
    assert.equal(0, g.getValue(1, 1));
    assert.deepEqual(['X', 'Y'], g.getLabels());
  });
  it('should parse tab-delimited data', function () {
    var data = "X\tY\n" + "0\t-1\n" + "1\t0\n" + "2\t1\n" + "3\t0\n";
    var g = new _dygraph["default"]('graph', data);
    assert.equal(0, g.getValue(0, 0));
    assert.equal(-1, g.getValue(0, 1));
    assert.equal(1, g.getValue(1, 0));
    assert.equal(0, g.getValue(1, 1));
    assert.deepEqual(['X', 'Y'], g.getLabels());
  });
  it('should parse fractions', function () {
    var data = "X,Y\n" + "0,1/4\n" + "1,2/4\n" + "2,3/4\n" + "3,4/4\n";
    var g = new _dygraph["default"]('graph', data, {
      fractions: true
    });
    assert.equal(0, g.getValue(0, 0));
    assert.deepEqual([1, 4], g.getValue(0, 1));
    assert.equal(1, g.getValue(1, 0));
    assert.deepEqual([2, 4], g.getValue(1, 1));
    assert.deepEqual(['X', 'Y'], g.getLabels());
  });
  it('should parse error bars', function () {
    var data = "X,Y\n" + "0,1,4\n" + "1,2,4\n" + "2,3,4\n" + "3,4,4\n";
    var g = new _dygraph["default"]('graph', data, {
      errorBars: true
    });
    assert.equal(0, g.getValue(0, 0));
    assert.deepEqual([1, 4], g.getValue(0, 1));
    assert.equal(1, g.getValue(1, 0));
    assert.deepEqual([2, 4], g.getValue(1, 1));
    assert.deepEqual(['X', 'Y'], g.getLabels());
  });
  it('should parse custom bars', function () {
    var data = "X,Y1,Y2\n" + "1,10;20;30,20;5;25\n" + "2,10;25;35,20;10;25\n";
    var g = new _dygraph["default"]('graph', data, {
      customBars: true
    });
    assert.equal(1, g.getValue(0, 0));
    assert.deepEqual([10, 20, 30], g.getValue(0, 1));
    assert.deepEqual([20, 5, 25], g.getValue(0, 2));
    assert.equal(2, g.getValue(1, 0));
    assert.deepEqual([10, 25, 35], g.getValue(1, 1));
    assert.deepEqual([20, 10, 25], g.getValue(1, 2));
    assert.deepEqual(['X', 'Y1', 'Y2'], g.getLabels());
  });

  /*
  it('should warn on unsorted input', function() {
  });
  
  it('should warn on different length columns', function() {
  });
  
  it('should detect double-labeled data', function() {
  });
  */
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],177:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests zero and one-point charts.
 * These don't have to render nicely, they just have to not crash.
 *
 * @author dan@dygraphs.com (Dan Vanderkam)
 */

describe("pathological-cases", function () {
  cleanupAfterEach();
  var restoreConsole;
  var logs = {};
  beforeEach(function () {
    restoreConsole = _Util["default"].captureConsole(logs);
  });
  afterEach(function () {
    restoreConsole();
  });
  var graph = document.getElementById("graph");
  it('testZeroPoint', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\n";
    var g = new _dygraph["default"](graph, data, opts);
  });
  it('testOnePoint', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,Y\n" + "1,2\n";
    var g = new _dygraph["default"](graph, data, opts);
  });
  it('testCombinations', function () {
    var dataSets = {
      nil: null,
      issue597: [],
      empty: [[]],
      onePoint: [[10, 2]],
      nanPoint: [[10, NaN]],
      nanPoints: [[10, NaN], [20, NaN]],
      multiNan1: [[10, NaN, 2], [20, 3, NaN]],
      multiNan2: [[10, NaN, 2], [20, NaN, 4]],
      multiNan3: [[10, NaN, NaN], [20, 3, 4], [30, NaN, NaN]],
      atZero: [[0, 0]],
      atZero2: [[0, 0, 0]],
      negative: [[-10, -1]],
      acrossZero: [[-10, 1], [10, 2]],
      normal: [[0, 1, 9], [10, 3, 5], [20, 2, 7], [30, 4, 3]]
    };
    var baseOpts = {
      lines: {},
      stacked: {
        stackedGraph: true
      }
    };
    var variantOpts = {
      none: {},
      padded: {
        includeZero: true,
        drawAxesAtZero: true,
        xRangePad: 2,
        yRangePad: 4
      }
    };
    for (var baseName in baseOpts) {
      var base = baseOpts[baseName];
      for (var variantName in variantOpts) {
        var variant = variantOpts[variantName];
        var opts = {
          width: 300,
          height: 150,
          pointSize: 10
        };
        for (var key in base) {
          if (base.hasOwnProperty(key)) opts[key] = base[key];
        }
        for (var key in variant) {
          if (variant.hasOwnProperty(key)) opts[key] = variant[key];
        }
        var h = document.createElement('h3');
        h.appendChild(document.createTextNode(baseName + ' ' + variantName));
        graph.appendChild(h);
        for (var dataName in dataSets) {
          var data = dataSets[dataName];
          var box = document.createElement('fieldset');
          box.style.display = 'inline-block';
          var legend = document.createElement('legend');
          legend.appendChild(document.createTextNode(dataName));
          box.appendChild(legend);
          var gdiv = document.createElement('div');
          gdiv.style.display = 'inline-block';
          box.appendChild(gdiv);
          graph.appendChild(box);
          var cols = data && data[0] ? data[0].length : dataName == 'issue597' ? 1 : 0;
          opts.labels = ['X', 'A', 'B', 'C'].slice(0, cols);
          var g = new _dygraph["default"](gdiv, data, opts);
          if (dataName == 'empty') {
            assert.deepEqual(logs, {
              log: [],
              warn: [],
              error: ["Data set cannot contain an empty row"]
            });
            logs.error = []; // reset
          } else if (dataName == 'nil') {
            assert.deepEqual(logs, {
              log: [],
              warn: [],
              error: ["Unknown data format: null"]
            });
            logs.error = []; // reset
          } else {
            assert.deepEqual(logs, {
              log: [],
              warn: [],
              error: []
            });
          }
        }
      }
    }
  });
  it('testNullLegend', function () {
    var opts = {
      width: 480,
      height: 320,
      labelsDiv: null
    };
    var data = "X,Y\n" + "1,2\n";
    var g = new _dygraph["default"](graph, data, opts);
  });
  it('testDivAsString', function () {
    var data = "X,Y\n" + "1,2\n";
    var g = new _dygraph["default"]('graph', data, {});
  });
  it('testConstantSeriesNegative', function () {
    var data = "X,Y\n" + "1,-1\n" + "2,-1\n";
    var g = new _dygraph["default"]('graph', data, {});
    // This check could be loosened to
    // g.yAxisRange()[0] < g.yAxisRange()[1] if it breaks in the future.
    assert.deepEqual([-1.1, -0.9], g.yAxisRange());
  });
  it('testConstantSeriesNegativeIncludeZero', function () {
    var data = "X,Y\n" + "1,-1\n" + "2,-1\n";
    var g = new _dygraph["default"]('graph', data, {
      includeZero: true
    });
    // This check could be loosened to
    // g.yAxisRange()[0] < g.yAxisRange()[1] if it breaks in the future.
    assert.deepEqual([-1.1, 0], g.yAxisRange());
  });
  it('should throw with non-existent divs', function () {
    var data = "X,Y\n" + "1,-1\n" + "2,1\n";
    assert["throws"](function () {
      new _dygraph["default"](null, data);
    }, /non-existent div/);
    assert["throws"](function () {
      new _dygraph["default"]('non-existent-div-id', data);
    }, /non-existent div/);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./Util":148}],178:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Util = _interopRequireDefault(require("./Util"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for per-axis options.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

describe("per-axis", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);
  var xAxisLineColor = "#00ffff";
  var yAxisLineColor = "#ffff00";
  var g, graph;
  beforeEach(function () {
    var opts = {
      axes: {
        x: {
          drawAxis: false,
          drawGrid: false,
          gridLineColor: xAxisLineColor
        },
        y: {
          drawAxis: false,
          drawGrid: false,
          gridLineColor: yAxisLineColor
        }
      },
      colors: ['#ff0000', '#0000ff']
    };
    var data = "X,Y,Z\n" + "1,1,0\n" + "8,0,1\n";
    graph = document.getElementById('graph');
    g = new _dygraph["default"](graph, data, opts);
  });
  it('testDrawXAxis', function () {
    g.updateOptions({
      axes: {
        x: {
          drawAxis: true
        }
      }
    });
    assert.isTrue(graph.getElementsByClassName('dygraph-axis-label-x').length > 0);
    assert.isTrue(graph.getElementsByClassName('dygraph-axis-label-y').length == 0);
  });
  it('testDrawYAxis', function () {
    g.updateOptions({
      axes: {
        y: {
          drawAxis: true
        }
      }
    });
    assert.isTrue(graph.getElementsByClassName('dygraph-axis-label-x').length == 0);
    assert.isTrue(graph.getElementsByClassName('dygraph-axis-label-y').length > 0);
  });
  it('testDrawXGrid', function () {
    g.updateOptions({
      axes: {
        x: {
          drawGrid: true
        }
      }
    });
    var htx = g.hidden_ctx_;
    assert.isTrue(_CanvasAssertions["default"].numLinesDrawn(htx, xAxisLineColor) > 0);
    assert.isTrue(_CanvasAssertions["default"].numLinesDrawn(htx, yAxisLineColor) == 0);
  });
  it('testDrawYGrid', function () {
    g.updateOptions({
      axes: {
        y: {
          drawGrid: true
        }
      }
    });
    var htx = g.hidden_ctx_;
    assert.isTrue(_CanvasAssertions["default"].numLinesDrawn(htx, xAxisLineColor) == 0);
    assert.isTrue(_CanvasAssertions["default"].numLinesDrawn(htx, yAxisLineColor) > 0);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147,"./Util":148}],179:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _PixelSampler = _interopRequireDefault(require("./PixelSampler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for per-series options.
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("per-series", function () {
  cleanupAfterEach();
  it('testPerSeriesFill', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      series: {
        Y: {
          fillGraph: true
        }
      },
      colors: ['#FF0000', '#0000FF'],
      fillAlpha: 0.15
    };
    var data = "X,Y,Z\n" + "1,0,0\n" + "2,0,1\n" + "3,0,1\n" + "4,0,0\n" + "5,0,0\n" + "6,1,0\n" + "7,1,0\n" + "8,0,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var sampler = new _PixelSampler["default"](g);

    // Inside of the "Z" bump -- no fill.
    assert.deepEqual([0, 0, 0, 0], sampler.colorAtCoordinate(2.5, 0.5));

    // Inside of the "Y" bump -- filled in.
    assert.deepEqual([255, 0, 0, 38], sampler.colorAtCoordinate(6.5, 0.5));
  });
  it('testPerSeriesAlpha', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      series: {
        Y: {
          fillGraph: true,
          fillAlpha: 0.25
        },
        Z: {
          fillGraph: true,
          fillAlpha: 0.75
        }
      },
      colors: ['#FF0000', '#0000FF']
    };
    var data = "X,Y,Z\n" + "1,0,0\n" + "2,0,1\n" + "3,0,1\n" + "4,0,0\n" + "5,0,0\n" + "6,1,0\n" + "7,1,0\n" + "8,0,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var sampler = new _PixelSampler["default"](g);

    // Inside of the "Y" bump -- 5% alpha.
    assert.deepEqual([255, 0, 0, 63], sampler.colorAtCoordinate(6.5, 0.5));

    // Inside of the "Z" bump -- 95% alpha.
    assert.deepEqual([0, 0, 255, 191], sampler.colorAtCoordinate(2.5, 0.5));
  });
  it('testNewStyleSeries', function () {
    var opts = {
      pointSize: 5,
      series: {
        Y: {
          pointSize: 4
        }
      }
    };
    var graph = document.getElementById("graph");
    var data = "X,Y,Z\n1,0,0\n";
    var g = new _dygraph["default"](graph, data, opts);
    assert.equal(5, g.getOption("pointSize"));
    assert.equal(4, g.getOption("pointSize", "Y"));
    assert.equal(5, g.getOption("pointSize", "Z"));
  });

  // TODO(konigsberg): move to multiple_axes.js
  it('testAxisInNewSeries', function () {
    var opts = {
      series: {
        D: {
          axis: 'y2'
        },
        C: {
          axis: 1
        },
        B: {
          axis: 0
        },
        E: {
          axis: 'y'
        }
      }
    };
    var graph = document.getElementById("graph");
    var data = "X,A,B,C,D,E\n0,1,2,3,4,5\n";
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(["A", "B", "E"], g.attributes_.seriesForAxis(0));
    assert.deepEqual(["C", "D"], g.attributes_.seriesForAxis(1));
  });

  // TODO(konigsberg): move to multiple_axes.js
  it('testAxisInNewSeries_withAxes', function () {
    var opts = {
      series: {
        D: {
          axis: 'y2'
        },
        C: {
          axis: 1
        },
        B: {
          axis: 0
        },
        E: {
          axis: 'y'
        }
      },
      axes: {
        y: {
          pointSize: 7
        },
        y2: {
          pointSize: 6
        }
      }
    };
    var graph = document.getElementById("graph");
    var data = "X,A,B,C,D,E\n0,1,2,3,4,5\n";
    var g = new _dygraph["default"](graph, data, opts);
    assert.deepEqual(["A", "B", "E"], g.attributes_.seriesForAxis(0));
    assert.deepEqual(["C", "D"], g.attributes_.seriesForAxis(1));
    assert.equal(1.5, g.getOption("pointSize"));
    assert.equal(7, g.getOption("pointSize", "A"));
    assert.equal(7, g.getOption("pointSize", "B"));
    assert.equal(6, g.getOption("pointSize", "C"));
    assert.equal(6, g.getOption("pointSize", "D"));
    assert.equal(7, g.getOption("pointSize", "E"));
  });

  // TODO(konigsberg): move to multiple_axes.js
  it('testOldAxisSpecInNewSeriesThrows', function () {
    var opts = {
      series: {
        D: {
          axis: {}
        }
      }
    };
    var graph = document.getElementById("graph");
    var data = "X,A,B,C,D,E\n0,1,2,3,4,5\n";
    var threw = false;
    try {
      new _dygraph["default"](graph, data, opts);
    } catch (e) {
      threw = true;
    }
    assert.isTrue(threw);
  });
  it('testColorOption', function () {
    var graph = document.getElementById("graph");
    var data = "X,A,B,C\n0,1,2,3\n";
    var g = new _dygraph["default"](graph, data, {});
    assert.deepEqual(['rgb(64,128,0)', 'rgb(64,0,128)', 'rgb(0,128,128)'], g.getColors());
    g.updateOptions({
      series: {
        B: {
          color: 'purple'
        }
      }
    });
    assert.deepEqual(['rgb(64,128,0)', 'purple', 'rgb(0,128,128)'], g.getColors());
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./PixelSampler":146}],180:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for the plugins option.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

describe("plugins", function () {
  cleanupAfterEach();
  var data;
  beforeEach(function () {
    data = "X,Y1,Y2\n" + "0,1,2\n" + "1,2,1\n" + "2,1,2\n" + "3,2,1\n";
  });
  it('testWillDrawChart', function () {
    var draw = 0;
    var plugin = function () {
      var p = function p() {};
      p.prototype.activate = function (g) {
        return {
          willDrawChart: this.willDrawChart
        };
      };
      p.prototype.willDrawChart = function (e) {
        draw++;
      };
      return p;
    }();
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {
      plugins: [plugin]
    });
    assert.equal(1, draw);
  });
  it('testPassingInstance', function () {
    // You can also pass an instance of a plugin instead of a Plugin class.
    var draw = 0;
    var p = {
      activate: function activate(g) {
        return {
          willDrawChart: this.willDrawChart
        };
      },
      willDrawChart: function willDrawChart(g) {
        draw++;
      }
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {
      plugins: [p]
    });
    assert.equal(1, draw);
  });
  it('testPreventDefault', function () {
    var data1 = "X,Y\n" + "20,-1\n" + "21,0\n" + "22,1\n" + "23,0\n";
    var events = [];
    var p = {
      pointClickPreventDefault: false,
      clickPreventDefault: false,
      activate: function activate(g) {
        return {
          pointClick: this.pointClick,
          click: this.click
        };
      },
      pointClick: function pointClick(e) {
        events.push(['plugin.pointClick', e.point.xval, e.point.yval]);
        if (this.pointClickPreventDefault) {
          e.preventDefault();
        }
      },
      click: function click(e) {
        events.push(['plugin.click', e.xval]);
        if (this.clickPreventDefault) {
          e.preventDefault();
        }
      }
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data1, {
      plugins: [p],
      clickCallback: function clickCallback(e, x) {
        events.push(['clickCallback', x]);
      },
      pointClickCallback: function pointClickCallback(e, pt) {
        events.push(['pointClickCallback', pt.xval, pt.yval]);
      }
    });

    // Click the point at x=20
    function clickOnPoint() {
      var x = 58,
        y = 275;
      _DygraphOps["default"].dispatchMouseDown_Point(g, x, y);
      _DygraphOps["default"].dispatchMouseMove_Point(g, x, y);
      _DygraphOps["default"].dispatchMouseUp_Point(g, x, y);
    }
    p.pointClickPreventDefault = false;
    p.clickPreventDefault = false;
    clickOnPoint();
    assert.deepEqual([['plugin.pointClick', 20, -1], ['pointClickCallback', 20, -1], ['plugin.click', 20], ['clickCallback', 20]], events);
    events = [];
    p.pointClickPreventDefault = true;
    p.clickPreventDefault = false;
    clickOnPoint();
    assert.deepEqual([['plugin.pointClick', 20, -1]], events);
    events = [];
    p.pointClickPreventDefault = false;
    p.clickPreventDefault = true;
    clickOnPoint();
    assert.deepEqual([['plugin.pointClick', 20, -1], ['pointClickCallback', 20, -1], ['plugin.click', 20]], events);
  });
  it('testEventSequence', function () {
    var events = [];
    var eventLogger = function eventLogger(name) {
      return function (e) {
        events.push(name);
      };
    };
    var p = {
      activate: function activate(g) {
        return {
          clearChart: eventLogger('clearChart'),
          predraw: eventLogger('predraw'),
          willDrawChart: eventLogger('willDrawChart'),
          didDrawChart: eventLogger('didDrawChart'),
          dataWillUpdate: eventLogger('dataWillUpdate'),
          dataDidUpdate: eventLogger('dataDidUpdate')
        };
      }
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {
      plugins: [p]
    });

    // Initial draw sequence
    assert.deepEqual(["dataDidUpdate",
    // should dataWillUpdate be called here, too?
    "predraw", "clearChart", "willDrawChart", "didDrawChart"], events);

    // An options change triggers a redraw, but doesn't change the data.
    events = [];
    g.updateOptions({
      series: {
        Y1: {
          color: 'blue'
        }
      }
    });
    assert.deepEqual(["predraw", "clearChart", "willDrawChart", "didDrawChart"], events);

    // A pan shouldn't cause a new "predraw"
    events = [];
    _DygraphOps["default"].dispatchMouseDown_Point(g, 100, 100, {
      shiftKey: true
    });
    _DygraphOps["default"].dispatchMouseMove_Point(g, 200, 100, {
      shiftKey: true
    });
    _DygraphOps["default"].dispatchMouseUp_Point(g, 200, 100, {
      shiftKey: true
    });
    assert.deepEqual(["clearChart", "willDrawChart", "didDrawChart"], events);

    // New data triggers the full sequence.
    events = [];
    g.updateOptions({
      file: data + '\n4,1,2'
    });
    assert.deepEqual(["dataWillUpdate", "dataDidUpdate", "predraw", "clearChart", "willDrawChart", "didDrawChart"], events);
  });
  it('testDestroyCalledInOrder', function () {
    var destructions = [];
    var makePlugin = function makePlugin(name) {
      return {
        activate: function activate(g) {
          return {};
        },
        destroy: function destroy() {
          destructions.push(name);
        }
      };
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {
      plugins: [makePlugin('p'), makePlugin('q')]
    });
    assert.deepEqual([], destructions);
    g.destroy();
    assert.deepEqual(['q', 'p'], destructions);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./DygraphOps":145}],181:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _legend = _interopRequireDefault(require("../../src/plugins/legend"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe("plugins-legend", function () {
  var graph;
  cleanupAfterEach();
  beforeEach(function () {
    var testDiv = document.getElementById('graph');
    testDiv.innerHTML = "<div id='inner-graph'></div><div id='label'></div>";
    graph = document.getElementById('inner-graph');
  });
  it('testLegendEscape', function () {
    var opts = {
      width: 480,
      height: 320
    };
    var data = "X,<script>alert('XSS')</script>\n" + "0,-1\n" + "1,0\n" + "2,1\n" + "3,0\n";
    var g = new _dygraph["default"](graph, data, opts);
    var legendPlugin = new _legend["default"]();
    legendPlugin.activate(g);
    var e = {
      selectedX: 'selectedX',
      selectedPoints: [{
        canvasy: 100,
        name: "<script>alert('XSS')</script>",
        yval: 10
      }],
      dygraph: g
    };
    legendPlugin.select(e);
    var legendSpan = legendPlugin.legend_div_.querySelector("span b span");
    assert.equal(legendSpan.innerHTML, "&lt;script&gt;alert('XSS')&lt;/script&gt;");
  });
  it('should let labelsDiv be a string', function () {
    var labelsDiv = document.getElementById('label');
    var g = new _dygraph["default"](graph, 'X,Y\n1,2\n', {
      labelsDiv: 'label'
    });
    null;
    g.setSelection(0);
    assert.equal('1: Y: 2', _Util["default"].nbspToSpace(labelsDiv.textContent));
  });
  it('should let labelsDiv be an Element', function () {
    var labelsDiv = document.getElementById('label');
    var g = new _dygraph["default"](graph, 'X,Y\n1,2\n', {
      labelsDiv: labelsDiv
    });
    assert.isNull(labelsDiv.getAttribute('class')); // dygraph-legend not added.
    g.setSelection(0);
    assert.equal('1: Y: 2', _Util["default"].nbspToSpace(labelsDiv.textContent));
  });
  it('should render dashed patterns', function () {
    var g = new _dygraph["default"](graph, 'X,Y\n1,2\n', {
      strokePattern: [5, 5],
      color: 'red',
      legend: 'always'
    });

    // The legend has a dashed line and a label.
    var legendEl = document.querySelector('.dygraph-legend > span');
    assert.equal(' Y', legendEl.textContent);
    var dashEl = document.querySelector('.dygraph-legend > span > div');
    assert.equal(window.getComputedStyle(dashEl)['border-bottom-color'], 'rgb(255, 0, 0)');
  });
  it('should use a legendFormatter', function () {
    var calls = [];
    var g = new _dygraph["default"](graph, 'X,Y\n1,2\n', {
      color: 'red',
      legend: 'always',
      legendFormatter: function legendFormatter(data) {
        calls.push(data);
        // Note: can't check against `g` because it's not defined yet.
        assert(this.toString().indexOf('Dygraph') >= 0);
        return '';
      }
    });
    assert(calls.length == 1); // legend for no selected points
    g.setSelection(0);
    assert(calls.length == 2); // legend with selected points
    g.clearSelection();
    assert(calls.length == 3);
    assert.equal(calls[0].x, undefined);
    assert.equal(calls[1].x, 1);
    assert.equal(calls[1].xHTML, '1');
    assert.equal(calls[2].x, undefined);
    assert.equal(calls[0].series.length, 1);
    assert.equal(calls[1].series.length, 1);
    assert.equal(calls[2].series.length, 1);
    assert.equal(calls[0].series[0].y, undefined);
    assert.equal(calls[1].series[0].label, 'Y');
    assert.equal(calls[1].series[0].labelHTML, 'Y');
    assert.equal(calls[1].series[0].y, 2);
    assert.equal(calls[1].series[0].yHTML, '2');
    assert.equal(calls[1].series[0].isVisible, true);
    assert.equal(calls[2].series[0].y, undefined);
  });
  it('should use a legendFormatter which returns a DocumentFragment', function () {
    var calls = [];
    var labelsDiv = document.getElementById('label');
    var g = new _dygraph["default"](graph, 'X,Y\n1,2\n', {
      color: 'red',
      legend: 'always',
      labelsDiv: labelsDiv,
      legendFormatter: function legendFormatter(data) {
        var fragment = document.createDocumentFragment();
        var e = document.createElement('div');
        e.innerText = 'Text Label';
        fragment.appendChild(e);
        calls.push(data);
        return fragment;
      }
    });
    assert(calls.length == 1); // legend for no selected points

    //check that labelsDiv has fragment children attached
    assert.equal(labelsDiv.children.length, 1);
    assert.equal(labelsDiv.children[0].nodeName, 'DIV');
    assert.equal(labelsDiv.children[0].innerText, 'Text Label');
  });
  it('should work with highlight series', function () {
    var calls = [];
    var g = new _dygraph["default"](graph, 'X,y1,y2\n1,2,3\n', {
      highlightSeriesOpts: {
        strokeWidth: 3
      }
    });
    g.setSelection(false, 'y2');
    assert.equal(_Util["default"].getLegend(graph), '');
  });
  it('should include point drawn where canvas-y is 0', function () {
    var graph = document.getElementById("graph");
    var calls = [];
    function callback(data) {
      calls.push(data);
    }
    ;
    var g = new _dygraph["default"](document.getElementById("graph"), "X,Y\n" + "1,5\n" + "1,10\n" + "1,12\n", {
      legendFormatter: callback,
      axes: {
        y: {
          valueRange: [0, 10]
        }
      }
    });
    g.setSelection(1);
    var data = calls[1];
    assert.isTrue(data.series[0].isVisible);
    assert.notEqual(data.series[0].yHTML, '');
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/plugins/legend":"dygraphs/src/plugins/legend.js","./Util":148}],182:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _rangeSelector = _interopRequireDefault(require("../../src/plugins/range-selector"));
var _Util = _interopRequireDefault(require("./Util"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Regression tests for range selector.
 * @author paul.eric.felix@gmail.com (Paul Felix)
 * @license MIT
 */

describe("range-selector", function () {
  cleanupAfterEach();
  var restoreConsole;
  var logs = {};
  beforeEach(function () {
    restoreConsole = _Util["default"].captureConsole(logs);
  });
  afterEach(function () {
    restoreConsole();
  });
  it('testRangeSelector', function () {
    var opts = {
      width: 480,
      height: 320,
      showRangeSelector: true,
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
  });
  it('testRangeSelectorWithErrorBars', function () {
    var opts = {
      width: 480,
      height: 320,
      errorBars: true,
      showRangeSelector: true,
      labels: ['X', 'Y']
    };
    var data = [[1, [10, 10]], [2, [15, 10]], [3, [10, 10]], [4, [15, 10]], [5, [10, 10]], [6, [15, 20]], [7, [10, 20]], [8, [15, 20]], [9, [10, 20]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
  });
  it('testRangeSelectorWithCustomBars', function () {
    var opts = {
      width: 480,
      height: 320,
      customBars: true,
      showRangeSelector: true,
      labels: ['X', 'Y']
    };
    var data = [[1, [10, 10, 100]], [2, [15, 20, 110]], [3, [10, 30, 100]], [4, [15, 40, 110]], [5, [10, 120, 100]], [6, [15, 50, 110]], [7, [10, 70, 100]], [8, [15, 90, 110]], [9, [10, 50, 100]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
  });
  it('testRangeSelectorWithLogScale', function () {
    var opts = {
      width: 480,
      height: 320,
      logscale: true,
      showRangeSelector: true,
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
  });
  it('testRangeSelectorOptions', function () {
    var opts = {
      width: 480,
      height: 320,
      showRangeSelector: true,
      rangeSelectorHeight: 30,
      rangeSelectorPlotFillColor: 'lightyellow',
      rangeSelectorPlotFillGradientColor: 'rgba(200, 200, 42, 10)',
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
  });
  it('testAdditionalRangeSelectorOptions', function () {
    var opts = {
      width: 480,
      height: 320,
      showRangeSelector: true,
      rangeSelectorHeight: 30,
      rangeSelectorBackgroundStrokeColor: 'blue',
      rangeSelectorBackgroundLineWidth: 3,
      rangeSelectorPlotLineWidth: 0.5,
      rangeSelectorForegroundStrokeColor: 'red',
      rangeSelectorForegroundLineWidth: 2,
      rangeSelectorAlpha: 0.8,
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
  });
  it('testRangeSelectorEnablingAfterCreation', function () {
    var opts = {
      width: 480,
      height: 320,
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var initialChartHeight = g.getArea().h;
    g.updateOptions({
      showRangeSelector: true
    });
    assertGraphExistence(g, graph);
    assert(g.getArea().h < initialChartHeight); // range selector shown

    g.updateOptions({
      showRangeSelector: false
    });
    assert.equal(g.getArea().h, initialChartHeight); // range selector hidden
  });

  // The animatedZooms option does not work with the range selector. Make sure it gets turned off.
  it('testRangeSelectorWithAnimatedZoomsOption', function () {
    var opts = {
      width: 480,
      height: 320,
      showRangeSelector: true,
      animatedZooms: true,
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
    assert.isFalse(g.getOption('animatedZooms'));
    assert.deepEqual(logs, {
      log: [],
      error: [],
      warn: ["Animated zooms and range selector are not compatible; disabling animatedZooms."]
    });
  });
  it('testRangeSelectorWithAnimatedZoomsOption2', function () {
    var opts = {
      width: 480,
      height: 320,
      animatedZooms: true,
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.updateOptions({
      showRangeSelector: true
    });
    assertGraphExistence(g, graph);
    assert.isFalse(g.getOption('animatedZooms'));
    assert.deepEqual(logs, {
      log: [],
      error: [],
      warn: ["Animated zooms and range selector are not compatible; disabling animatedZooms."]
    });
  });
  it('testRangeSelectorInteraction', function () {
    var opts = {
      width: 480,
      height: 320,
      showRangeSelector: true,
      labels: ['X', 'Y']
    };
    var data = [[1, 10], [2, 15], [3, 10], [4, 15], [5, 10], [6, 15], [7, 10], [8, 15], [9, 10]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assertGraphExistence(g, graph);
    var zoomhandles = graph.getElementsByClassName('dygraph-rangesel-zoomhandle');

    // Move left zoomhandle in
    var xRange = g.xAxisRange().slice();
    var mouseDownEvent = _DygraphOps["default"].createEvent({
      type: 'dragstart',
      detail: 1,
      clientX: 0,
      clientY: 0
    });
    zoomhandles[0].dispatchEvent(mouseDownEvent);
    var mouseMoveEvent = _DygraphOps["default"].createEvent({
      type: 'mousemove',
      clientX: 20,
      clientY: 20
    });
    zoomhandles[0].dispatchEvent(mouseMoveEvent);
    var mouseUpEvent = _DygraphOps["default"].createEvent({
      type: 'mouseup',
      detail: 1,
      clientX: 20,
      clientY: 20
    });
    zoomhandles[0].dispatchEvent(mouseUpEvent);
    var newXRange = g.xAxisRange().slice();
    assert(newXRange[0] > xRange[0], 'left zoomhandle should have moved: ' + newXRange[0] + '>' + xRange[0]);
    assert.equal(xRange[1], newXRange[1], 'right zoomhandle should not have moved');

    // Move right zoomhandle in
    xRange = newXRange;
    mouseDownEvent = _DygraphOps["default"].createEvent({
      type: 'dragstart',
      detail: 1,
      clientX: 100,
      clientY: 100
    });
    zoomhandles[1].dispatchEvent(mouseDownEvent);
    mouseMoveEvent = _DygraphOps["default"].createEvent({
      type: 'mousemove',
      clientX: 80,
      clientY: 80
    });
    zoomhandles[1].dispatchEvent(mouseMoveEvent);
    mouseUpEvent = _DygraphOps["default"].createEvent({
      type: 'mouseup',
      detail: 1,
      clientX: 80,
      clientY: 80
    });
    zoomhandles[1].dispatchEvent(mouseUpEvent);
    var newXRange = g.xAxisRange().slice();
    assert(newXRange[1] < xRange[1], 'right zoomhandle should have moved: ' + newXRange[1] + '<' + xRange[1]);
    assert.equal(xRange[0], newXRange[0], 'left zoomhandle should not have moved');

    // Pan left
    xRange = newXRange;
    var fgcanvas = graph.getElementsByClassName('dygraph-rangesel-fgcanvas')[0];
    var x = parseInt(zoomhandles[0].style.left) + 20;
    var y = parseInt(zoomhandles[0].style.top);
    mouseDownEvent = _DygraphOps["default"].createEvent({
      type: 'mousedown',
      detail: 1,
      clientX: x,
      clientY: y
    });
    fgcanvas.dispatchEvent(mouseDownEvent);
    x -= 10;
    mouseMoveEvent = _DygraphOps["default"].createEvent({
      type: 'mousemove',
      clientX: x,
      clientY: y
    });
    fgcanvas.dispatchEvent(mouseMoveEvent);
    mouseUpEvent = _DygraphOps["default"].createEvent({
      type: 'mouseup',
      detail: 1,
      clientX: x,
      clientY: y
    });
    fgcanvas.dispatchEvent(mouseUpEvent);
    var newXRange = g.xAxisRange().slice();
    assert(newXRange[0] < xRange[0], newXRange[0] + '<' + xRange[0]);
    assert(newXRange[1] < xRange[1], newXRange[1] + '<' + xRange[1]);
  });
  it('testRangeSelectorPositionIfXAxisNotDrawn', function () {
    var opts = {
      width: 480,
      height: 100,
      xAxisHeight: 30,
      axes: {
        x: {
          drawAxis: false
        }
      },
      showRangeSelector: true,
      rangeSelectorHeight: 30,
      labels: ['X', 'Y']
    };
    var data = [[0, 1], [10, 1]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    //assert, that the range selector is at top position 70 since the 30px of the
    // xAxis shouldn't be reserved since it isn't drawn.
    assertGraphExistence(g, graph);
    var bgcanvas = graph.getElementsByClassName('dygraph-rangesel-bgcanvas')[0];
    assert.equal("70px", bgcanvas.style.top, "Range selector is not at the expected position.");
    var fgcanvas = graph.getElementsByClassName('dygraph-rangesel-fgcanvas')[0];
    assert.equal("70px", fgcanvas.style.top, "Range selector is not at the expected position.");
  });
  it('testMiniPlotDrawn', function () {
    // Install Proxy to track canvas calls.
    var origFunc = utils.getContext;
    var miniHtx;
    utils.getContext = function (canvas) {
      if (canvas.className != 'dygraph-rangesel-bgcanvas') {
        return origFunc(canvas);
      }
      miniHtx = new _Proxy["default"](origFunc(canvas));
      return miniHtx;
    };
    var opts = {
      width: 480,
      height: 100,
      xAxisHeight: 30,
      axes: {
        x: {
          drawAxis: false
        }
      },
      showRangeSelector: true,
      rangeSelectorHeight: 30,
      rangeSelectorPlotStrokeColor: '#ff0000',
      labels: ['X', 'Y']
    };
    var data = [[0, 1], [5, 4], [10, 8]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    // TODO(danvk): more precise tests.
    assert.isNotNull(miniHtx);
    assert.isTrue(0 < _CanvasAssertions["default"].numLinesDrawn(miniHtx, '#ff0000'));
    utils.getContext = origFunc;
  });

  // Tests data computation for the mini plot with a single series.
  it('testSingleCombinedSeries', function () {
    var opts = {
      showRangeSelector: true,
      labels: ['X', 'Y1']
    };
    var data = [[0, 1], [5, 4], [10, 8]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rangeSelector = g.getPluginInstance_(_rangeSelector["default"]);
    assert.isNotNull(rangeSelector);
    var combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 1 - 7 * 0.25,
      // 25% padding
      yMax: 8 + 7 * 0.25,
      data: [[0, 1], [5, 4], [10, 8]]
    }, combinedSeries);
  });

  // Tests that multiple series are averaged for the miniplot.
  it('testCombinedSeries', function () {
    var opts = {
      showRangeSelector: true,
      labels: ['X', 'Y1', 'Y2']
    };
    var data = [[0, 1, 3],
    // average = 2
    [5, 4, 6],
    // average = 5
    [10, 7, 9] // average = 8
    ];

    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rangeSelector = g.getPluginInstance_(_rangeSelector["default"]);
    assert.isNotNull(rangeSelector);
    var combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 2 - 6 * 0.25,
      // 25% padding on combined series range.
      yMax: 8 + 6 * 0.25,
      data: [[0, 2], [5, 5], [10, 8]]
    }, combinedSeries);
  });

  // Tests selection of a specific series to average for the mini plot.
  it('testSelectedCombinedSeries', function () {
    var opts = {
      showRangeSelector: true,
      labels: ['X', 'Y1', 'Y2', 'Y3', 'Y4'],
      series: {
        'Y1': {
          showInRangeSelector: true
        },
        'Y3': {
          showInRangeSelector: true
        }
      }
    };
    var data = [[0, 5, 8, 13, 21],
    // average (first and third) = 9
    [5, 1, 3, 7, 14],
    // average (first and third) = 4
    [10, 0, 19, 10, 6] // average (first and third) = 5
    ];

    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rangeSelector = g.getPluginInstance_(_rangeSelector["default"]);
    assert.isNotNull(rangeSelector);
    var combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 4 - 5 * 0.25,
      // 25% padding on combined series range.
      yMax: 9 + 5 * 0.25,
      data: [[0, 9], [5, 4], [10, 5]]
    }, combinedSeries);
  });

  // Tests data computation for the mini plot with a single error bar series.
  it('testSingleCombinedSeriesCustomBars', function () {
    var opts = {
      customBars: true,
      showRangeSelector: true,
      labels: ['X', 'Y1']
    };
    var data = [[0, [0, 1, 2]],
    // [low, value, high]
    [5, [1, 4, 5]], [10, [7, 8, 9]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rangeSelector = g.getPluginInstance_(_rangeSelector["default"]);
    assert.isNotNull(rangeSelector);
    var combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 1 - 7 * 0.25,
      // 25% padding
      yMax: 8 + 7 * 0.25,
      data: [[0, 1], [5, 4], [10, 8]]
    }, combinedSeries);
  });
  it('testSingleCombinedSeriesErrorBars', function () {
    var opts = {
      errorBars: true,
      showRangeSelector: true,
      labels: ['X', 'Y1']
    };
    var data = [[0, [1, 1]],
    // [value, standard deviation]
    [5, [4, 2]], [10, [8, 1]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rangeSelector = g.getPluginInstance_(_rangeSelector["default"]);
    assert.isNotNull(rangeSelector);
    var combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 1 - 7 * 0.25,
      // 25% padding
      yMax: 8 + 7 * 0.25,
      data: [[0, 1], [5, 4], [10, 8]]
    }, combinedSeries);
  });

  // Tests data computation for the mini plot with two custom bar series.
  it('testTwoCombinedSeriesCustomBars', function () {
    var opts = {
      customBars: true,
      showRangeSelector: true,
      labels: ['X', 'Y1', 'Y2']
    };
    var data = [[0, [0, 1, 2], [4, 5, 6]],
    // [low, value, high], avg_val = 3
    [5, [1, 4, 5], [5, 8, 9]],
    // avg_val = 6
    [10, [7, 8, 9], [11, 12, 13]] // avg_val = 10
    ];

    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rangeSelector = g.getPluginInstance_(_rangeSelector["default"]);
    assert.isNotNull(rangeSelector);
    var combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 3 - 7 * 0.25,
      // 25% padding
      yMax: 10 + 7 * 0.25,
      data: [[0, 3], [5, 6], [10, 10]]
    }, combinedSeries);
  });
  it('testHiddenSeriesExcludedFromMiniplot', function () {
    var opts = {
      showRangeSelector: true,
      labels: ['X', 'Y1', 'Y2'],
      visibility: [true, false]
    };
    var data = [[0, 1, 3],
    // average = 2
    [5, 4, 6],
    // average = 5
    [10, 7, 9] // average = 8
    ];

    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rangeSelector = g.getPluginInstance_(_rangeSelector["default"]);
    assert.isNotNull(rangeSelector);

    // Invisible series (e.g. Y2) are not included in the combined series.
    var combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 1 - 6 * 0.25,
      // 25% padding on single series range.
      yMax: 7 + 6 * 0.25,
      data: [[0, 1], [5, 4], [10, 7]]
    }, combinedSeries);

    // If Y2 is explicitly marked to be included in the range selector,
    // then it will be (even if it's not visible). Since we've started being
    // explicit about marking series for inclusion, this means that Y1 is no
    // longer included.
    g.updateOptions({
      series: {
        Y2: {
          showInRangeSelector: true
        }
      }
    });
    combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 3 - 6 * 0.25,
      // 25% padding on combined series range.
      yMax: 9 + 6 * 0.25,
      data: [[0, 3], [5, 6], [10, 9]]
    }, combinedSeries);

    // If we explicitly mark Y1, too, then it also gets included.
    g.updateOptions({
      series: {
        Y1: {
          showInRangeSelector: true
        },
        Y2: {
          showInRangeSelector: true
        }
      }
    });
    combinedSeries = rangeSelector.computeCombinedSeriesAndLimits_();
    assert.deepEqual({
      yMin: 2 - 6 * 0.25,
      // 25% padding on combined series range.
      yMax: 8 + 6 * 0.25,
      data: [[0, 2], [5, 5], [10, 8]]
    }, combinedSeries);
  });
  var assertGraphExistence = function assertGraphExistence(g, graph) {
    assert.isNotNull(g);
    var zoomhandles = graph.getElementsByClassName('dygraph-rangesel-zoomhandle');
    assert.equal(2, zoomhandles.length);
    var bgcanvas = graph.getElementsByClassName('dygraph-rangesel-bgcanvas');
    assert.equal(1, bgcanvas.length);
    var fgcanvas = graph.getElementsByClassName('dygraph-rangesel-fgcanvas');
    assert.equal(1, fgcanvas.length);
  };
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","../../src/plugins/range-selector":"dygraphs/src/plugins/range-selector.js","./CanvasAssertions":144,"./DygraphOps":145,"./Proxy":147,"./Util":148}],183:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
var _custom_asserts = require("./custom_asserts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright (c) 2011 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @fileoverview Test valueRange and dateWindow changes.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

var ZERO_TO_FIFTY = [[10, 0], [20, 50]];
var ZERO_TO_FIFTY_STEPS = function () {
  var a = [];
  var x = 10;
  var y = 0;
  var step = 0;
  for (step = 0; step <= 50; step++) {
    a.push([x + step * .2, y + step]);
  }
  return a;
}();
var FIVE_TO_ONE_THOUSAND = [[1, 10], [2, 20], [3, 30], [4, 40], [5, 50], [6, 60], [7, 70], [8, 80], [9, 90], [10, 1000]];
describe("range-tests", function () {
  cleanupAfterEach();
  var createGraph = function createGraph(opts, data, expectRangeX, expectRangeY) {
    if (data === undefined) data = ZERO_TO_FIFTY_STEPS;
    if (expectRangeX === undefined) expectRangeX = [10, 20];
    if (expectRangeY === undefined) expectRangeY = [0, 55];
    if (!opts) opts = {};
    opts['labels'] = ['X', 'Y'];
    var g = new _dygraph["default"]('graph', data, opts);
    (0, _custom_asserts.assertDeepCloseTo)(expectRangeX, g.xAxisRange(), 0.01);
    (0, _custom_asserts.assertDeepCloseTo)(expectRangeY, g.yAxisRange(0), 0.01);
    return g;
  };

  /**
   * Test that changes to valueRange and dateWindow are reflected
   * appropriately.
   */
  it('testRangeSetOperations', function () {
    var g = createGraph({
      valueRange: [0, 55]
    });
    g.updateOptions({
      dateWindow: [12, 18]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([0, 55], g.yAxisRange(0));
    g.updateOptions({
      valueRange: [10, 40]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 40], g.yAxisRange(0));
    g.updateOptions({
      valueRange: [10, NaN]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 44.2], g.yAxisRange(0));
    g.updateOptions({
      valueRange: [10, 40]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 40], g.yAxisRange(0));
    g.updateOptions({
      valueRange: [10, null]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 44.2], g.yAxisRange(0));
    g.updateOptions({
      valueRange: [10, 40]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 40], g.yAxisRange(0));
    g.updateOptions({
      valueRange: [10, undefined]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 44.2], g.yAxisRange(0));
    g.updateOptions({
      valueRange: [10, 40]
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 40], g.yAxisRange(0));
    g.updateOptions({});
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([10, 40], g.yAxisRange(0));
    g.updateOptions({
      valueRange: null,
      axes: {
        y: {
          valueRange: [15, 20]
        }
      }
    });
    assert.deepEqual([12, 18], g.xAxisRange());
    assert.deepEqual([15, 20], g.yAxisRange(0));
    g.updateOptions({
      dateWindow: null,
      valueRange: null,
      axes: null
    });
    assert.deepEqual([10, 20], g.xAxisRange());
    assert.deepEqual([0, 55], g.yAxisRange(0));
  });

  /**
   * Verify that when zoomed in by mouse operations, an empty call to
   * updateOptions doesn't change the displayed ranges.
   */
  var zoom = function zoom(g, xRange, yRange) {
    var originalXRange = g.xAxisRange();
    var originalYRange = g.yAxisRange(0);
    _DygraphOps["default"].dispatchMouseDown(g, xRange[0], yRange[0]);
    _DygraphOps["default"].dispatchMouseMove(g, xRange[1], yRange[0]); // this is really necessary.
    _DygraphOps["default"].dispatchMouseUp(g, xRange[1], yRange[0]);
    (0, _custom_asserts.assertDeepCloseTo)(xRange, g.xAxisRange(), 0.2);
    // assert.closeTo(originalYRange, g.yAxisRange(0), 0.2); // Not true, it's something in the middle.

    var midX = (xRange[1] - xRange[0]) / 2;
    _DygraphOps["default"].dispatchMouseDown(g, midX, yRange[0]);
    _DygraphOps["default"].dispatchMouseMove(g, midX, yRange[1]); // this is really necessary.
    _DygraphOps["default"].dispatchMouseUp(g, midX, yRange[1]);
    (0, _custom_asserts.assertDeepCloseTo)(xRange, g.xAxisRange(), 0.2);
    (0, _custom_asserts.assertDeepCloseTo)(yRange, g.yAxisRange(0), 0.2);
  };

  /**
   * Verify that when zoomed in by mouse operations, an empty call to
   * updateOptions doesn't change the displayed ranges.
   */
  it('testEmptyUpdateOptions_doesntUnzoom', function () {
    var g = createGraph();
    zoom(g, [11, 18], [35, 40]);
    (0, _custom_asserts.assertDeepCloseTo)([11, 18], g.xAxisRange(), 0.1);
    (0, _custom_asserts.assertDeepCloseTo)([35, 40], g.yAxisRange(0), 0.2);
    g.updateOptions({});
    (0, _custom_asserts.assertDeepCloseTo)([11, 18], g.xAxisRange(), 0.1);
    (0, _custom_asserts.assertDeepCloseTo)([35, 40], g.yAxisRange(0), 0.2);
  });

  /**
   * Verify that when zoomed in by mouse operations, a call to
   * updateOptions({ dateWindow : null, valueRange : null }) fully
   * unzooms.
   */
  it('testRestoreOriginalRanges_viaUpdateOptions', function () {
    var g = createGraph();
    zoom(g, [11, 18], [35, 40]);
    g.updateOptions({
      dateWindow: null,
      valueRange: null
    });
    assert.deepEqual([0, 55], g.yAxisRange(0));
    assert.deepEqual([10, 20], g.xAxisRange());
  });

  /**
   * Verify that log scale axis range is properly specified.
   */
  it('testLogScaleExcludesZero', function () {
    var g = new _dygraph["default"]("graph", FIVE_TO_ONE_THOUSAND, {
      logscale: true,
      labels: ['X', 'Y']
    });
    assert.deepEqual([10, 1099], g.yAxisRange(0));
    g.updateOptions({
      logscale: false
    });
    assert.deepEqual([0, 1099], g.yAxisRange(0));
  });

  /**
   * Verify that includeZero range is properly specified.
   */
  it('testIncludeZeroIncludesZero', function () {
    var g = new _dygraph["default"]("graph", [[0, 500], [500, 1000]], {
      includeZero: true,
      labels: ['X', 'Y']
    });
    assert.deepEqual([0, 1100], g.yAxisRange(0));
    g.updateOptions({
      includeZero: false
    });
    assert.deepEqual([450, 1050], g.yAxisRange(0));
  });

  /**
   * Verify that includeZero range is properly specified per axis.
   */
  it('testIncludeZeroPerAxis', function () {
    var g = new _dygraph["default"]("graph", 'X,A,B\n' + '0,50,50\n' + '50,110,110\n', {
      drawPoints: true,
      pointSize: 5,
      series: {
        A: {
          axis: 'y',
          pointSize: 10
        },
        B: {
          axis: 'y2'
        }
      },
      axes: {
        'y2': {
          includeZero: true
        }
      }
    });
    assert.deepEqual([44, 116], g.yAxisRange(0));
    assert.deepEqual([0, 121], g.yAxisRange(1));
    g.updateOptions({
      axes: {
        'y2': {
          includeZero: false
        }
      }
    });
    assert.deepEqual([44, 116], g.yAxisRange(1));
  });

  /**
   * Verify that very large Y ranges don't break things.
   */
  it('testHugeRange', function () {
    var g = new _dygraph["default"]("graph", [[0, -1e120], [1, 1e230]], {
      includeZero: true,
      labels: ['X', 'Y']
    });
    assert.closeTo(1, -1e229 / g.yAxisRange(0)[0], 0.001);
    assert.closeTo(1, 1.1e230 / g.yAxisRange(0)[1], 0.001);
  });

  /**
   * Verify ranges with user-specified padding, implicit avoidMinZero.
   */
  it('testPaddingAuto', function () {
    var g = createGraph({
      xRangePad: 42,
      yRangePad: 30
    }, ZERO_TO_FIFTY_STEPS, [9, 21], [-5, 55]);
  });

  /**
   * Verify auto range with drawAxesAtZero.
   */
  it('testPaddingAutoAxisAtZero', function () {
    var g = createGraph({
      drawAxesAtZero: true
    }, ZERO_TO_FIFTY_STEPS, [10, 20], [0, 55]);
  });

  /**
   * Verify user-specified range with padding and drawAxesAtZero options.
   * Try explicit range matching the auto range, should have identical results.
   */
  it('testPaddingRange1', function () {
    var g = createGraph({
      valueRange: [0, 50],
      xRangePad: 42,
      yRangePad: 30,
      drawAxesAtZero: true
    }, ZERO_TO_FIFTY_STEPS, [9, 21], [-5, 55]);
  });

  /**
   * Verify user-specified range with padding and drawAxesAtZero options.
   * User-supplied range differs from the auto range.
   */
  it('testPaddingRange2', function () {
    var g = createGraph({
      valueRange: [10, 60],
      xRangePad: 42,
      yRangePad: 30,
      drawAxesAtZero: true
    }, ZERO_TO_FIFTY_STEPS, [9, 21], [5, 65]);
  });

  /**
   * Verify drawAxesAtZero and includeZero.
   */
  it('testPaddingYAtZero', function () {
    var g = createGraph({
      includeZero: true,
      xRangePad: 42,
      yRangePad: 30,
      drawAxesAtZero: true
    }, [[-10, 10], [10, 20], [30, 50]], [-14, 34], [-5, 55]);
  });

  /**
   * Verify logscale, compat mode.
   */
  it('testLogscaleCompat', function () {
    var g = createGraph({
      logscale: true
    }, [[-10, 10], [10, 10], [30, 1000]], [-10, 30], [10, 1099]);
  });

  /**
   * Verify logscale, new mode.
   */
  it('testLogscalePad', function () {
    var g = createGraph({
      logscale: true,
      yRangePad: 30
    }, [[-10, 10], [10, 10], [30, 1000]], [-10, 30], [5.623, 1778.279]);
  });

  /**
   * Verify scrolling all-zero region, new-style.
   */
  it('testZeroScroll2', function () {
    var g = new _dygraph["default"](document.getElementById("graph"), "X,Y\n" + "1,0\n" + "8,0\n" + "9,0.1\n", {
      animatedZooms: true,
      drawAxesAtZero: true,
      xRangePad: 4,
      yRangePad: 4
    });
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./DygraphOps":145,"./custom_asserts":154}],184:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for resizing.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

describe("resize", function () {
  cleanupAfterEach();
  var data = "X,Y\n" + "1,100\n" + "2,200\n" + "3,300\n" + "4,400\n" + "5,300\n" + "6,100\n";
  it('testResizeMaintainsMouseOperations', function () {
    var graph = document.getElementById('graph');
    graph.setAttribute('style', 'width: 640px; height: 480px;');
    var callbackCount = 0;
    var callback = function callback() {
      callbackCount++;
    };

    // Strum the mouse along the y-coordinate y, from 0 to x2. These are DOM values.
    var strum = function strum(g, y, x2) {
      _DygraphOps["default"].dispatchMouseDown_Point(g, 0, y);
      for (var x = 0; x < x2; x++) {
        _DygraphOps["default"].dispatchMouseMove_Point(g, x, y);
      }
      _DygraphOps["default"].dispatchMouseUp_Point(g, x2 - 1, y);
    };
    var g = new _dygraph["default"](graph, data, {
      highlightCallback: callback
    });
    strum(g, 300, 640);
    assert.equal(6, callbackCount);
    graph.style.width = "500px";
    g.resize();
    callbackCount = 0;
    strum(g, 300, 500);
    assert.equal(6, callbackCount);
  });

  /**
   * Tests that a graph created in a not-displayed div works as expected
   * if the graph options include height and width. Resize not needed.
   */
  it('testHiddenDivWithSizedGraph', function () {
    var div = document.getElementById("graph");
    div.style.display = 'none';
    var g = new _dygraph["default"](div, data, {
      width: 400,
      height: 300
    });
    div.style.display = '';
    var area = g.getArea();
    assert.isTrue(area.w > 0);
    assert.isTrue(area.h > 0);
  });

  /**
   * Tests that a graph created in a not-displayed div with
   * CSS-specified size but no graph height or width options works as
   * expected. The user needs to call resize() on it after displaying
   * it.
   */
  it('testHiddenDivWithResize', function () {
    var div = document.getElementById("graph");
    div.style.display = 'none';
    div.style.width = '400px';
    div.style.height = '300px';

    // Setting strokeWidth 3 removes any ambiguitiy from the pixel sampling
    // request, below.
    var g = new _dygraph["default"](div, data, {
      strokeWidth: 3
    });
    div.style.display = '';
    g.resize();
    var area = g.getArea();
    assert.isTrue(area.w > 0);
    assert.isTrue(area.h > 0);

    // Regression test: check that graph remains visible after no-op resize.
    g.resize();
    var x = Math.floor(g.toDomXCoord(2));
    var y = Math.floor(g.toDomYCoord(200));
    assert.deepEqual([0, 128, 128, 255], _Util["default"].samplePixel(g.hidden_, x, y), "Unexpected grid color found at pixel: x: " + x + " y: " + y);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./DygraphOps":145,"./Util":148}],185:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for rolling averages.
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("rolling-average", function () {
  cleanupAfterEach();
  it('testRollingAverage', function () {
    var opts = {
      width: 480,
      height: 320,
      rollPeriod: 1,
      showRoller: true
    };
    var data = "X,Y\n" + "0,0\n" + "1,1\n" + "2,2\n" + "3,3\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setSelection(0);
    assert.equal("0: Y: 0", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("1: Y: 1", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2: Y: 2", _Util["default"].getLegend());
    g.setSelection(3);
    assert.equal("3: Y: 3", _Util["default"].getLegend());
    assert.equal(1, g.rollPeriod());
    g.updateOptions({
      rollPeriod: 2
    });
    g.setSelection(0);
    assert.equal("0: Y: 0", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("1: Y: 0.5", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2: Y: 1.5", _Util["default"].getLegend());
    g.setSelection(3);
    assert.equal("3: Y: 2.5", _Util["default"].getLegend());
    assert.equal(2, g.rollPeriod());
    g.updateOptions({
      rollPeriod: 3
    });
    g.setSelection(0);
    assert.equal("0: Y: 0", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("1: Y: 0.5", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2: Y: 1", _Util["default"].getLegend());
    g.setSelection(3);
    assert.equal("3: Y: 2", _Util["default"].getLegend());
    assert.equal(3, g.rollPeriod());
    g.updateOptions({
      rollPeriod: 4
    });
    g.setSelection(0);
    assert.equal("0: Y: 0", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("1: Y: 0.5", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2: Y: 1", _Util["default"].getLegend());
    g.setSelection(3);
    assert.equal("3: Y: 1.5", _Util["default"].getLegend());
    assert.equal(4, g.rollPeriod());
  });
  it('testRollBoxDoesntDisapper', function () {
    var opts = {
      showRoller: true
    };
    var data = "X,Y\n" + "0,0\n" + "1,1\n" + "2,2\n" + "3,3\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var roll_box = graph.getElementsByTagName("input");
    assert.equal(1, roll_box.length);
    assert.equal("1", roll_box[0].value);
    graph.style.width = "500px";
    g.resize();
    assert.equal(1, roll_box.length);
    assert.equal("1", roll_box[0].value);
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=426
  it('testRollShortFractions', function () {
    var opts = {
      customBars: true,
      labels: ['x', 'A', 'B']
    };
    var data1 = [[1, 10, [1, 20]]];
    var data2 = [[1, 10, [1, 20]], [2, 20, [1, 30]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data2, opts);
    var rolled1 = g.dataHandler_.rollingAverage(data1, 1, g, 1);
    var rolled2 = g.dataHandler_.rollingAverage(data2, 1, g, 1);
    assert.deepEqual(rolled1[0], rolled2[0]);
  });
  it('testRollCustomBars', function () {
    var opts = {
      customBars: true,
      rollPeriod: 2,
      labels: ['x', 'A']
    };
    var data = [[1, [1, 10, 20]], [2, [1, 20, 30]], [3, [1, 30, 40]], [4, [1, 40, 50]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rolled = getRolledData(g, data, 1, 2);
    assert.deepEqual([1, 10, [1, 20]], rolled[0]);
    assert.deepEqual([2, 15, [1, 25]], rolled[1]);
    assert.deepEqual([3, 25, [1, 35]], rolled[2]);
    assert.deepEqual([4, 35, [1, 45]], rolled[3]);
  });
  it('testRollErrorBars', function () {
    var opts = {
      errorBars: true,
      rollPeriod: 2,
      labels: ['x', 'A']
    };
    var data = [[1, [10, 1]], [2, [20, 1]], [3, [30, 1]], [4, [40, 1]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rolled = getRolledData(g, data, 1, 2);
    assert.deepEqual([1, 10, [8, 12]], rolled[0]);

    // variance = sqrt( pow(error) * rollPeriod)
    var variance = Math.sqrt(2);
    for (var i = 1; i < data.length; i++) {
      var value = data[i][1][0] - 5;
      assert.equal(value, rolled[i][1], "unexpected rolled average");
      assert.equal(value - variance, rolled[i][2][0], "unexpected rolled min");
      assert.equal(value + variance, rolled[i][2][1], "unexpected rolled max");
    }
  });
  it('testRollFractions', function () {
    var opts = {
      fractions: true,
      rollPeriod: 2,
      labels: ['x', 'A']
    };
    var data = [[1, [1, 10]], [2, [2, 10]], [3, [3, 10]], [4, [4, 10]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rolled = getRolledData(g, data, 1, 2);
    assert.deepEqual([1, 10], rolled[0]);
    assert.deepEqual([2, 15], rolled[1]);
    assert.deepEqual([3, 25], rolled[2]);
    assert.deepEqual([4, 35], rolled[3]);
  });
  it('testRollFractionsBars', function () {
    var opts = {
      fractions: true,
      errorBars: true,
      wilsonInterval: false,
      rollPeriod: 2,
      labels: ['x', 'A']
    };
    var data = [[1, [1, 10]], [2, [2, 10]], [3, [3, 10]], [4, [4, 10]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rolled = getRolledData(g, data, 1, 2);

    // precalculated rounded values expected
    var values = [10, 15, 25, 35];
    var lows = [-9, -1, 6, 14];
    var highs = [29, 31, 44, 56];
    for (var i = 0; i < data.length; i++) {
      assert.equal(values[i], Math.round(rolled[i][1]), "unexpected rolled average");
      assert.equal(lows[i], Math.round(rolled[i][2][0]), "unexpected rolled min");
      assert.equal(highs[i], Math.round(rolled[i][2][1]), "unexpected rolled max");
    }
  });
  it('testRollFractionsBarsWilson', function () {
    var opts = {
      fractions: true,
      errorBars: true,
      wilsonInterval: true,
      rollPeriod: 2,
      labels: ['x', 'A']
    };
    var data = [[1, [1, 10]], [2, [2, 10]], [3, [3, 10]], [4, [4, 10]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var rolled = getRolledData(g, data, 1, 2);

    //precalculated rounded values expected
    var values = [10, 15, 25, 35];
    var lows = [2, 5, 11, 18];
    var highs = [41, 37, 47, 57];
    for (var i = 0; i < data.length; i++) {
      assert.equal(values[i], Math.round(rolled[i][1]), "unexpected rolled average");
      assert.equal(lows[i], Math.round(rolled[i][2][0]), "unexpected rolled min");
      assert.equal(highs[i], Math.round(rolled[i][2][1]), "unexpected rolled max");
    }
  });
  var getRolledData = function getRolledData(g, data, seriesIdx, rollPeriod) {
    var options = g.attributes_;
    return g.dataHandler_.rollingAverage(g.dataHandler_.extractSeries(data, seriesIdx, options), rollPeriod, options, seriesIdx);
  };
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./Util":148}],186:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright (c) 2011 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @fileoverview Test cases that ensure Dygraphs works at all.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

describe("dygraphs-sanity", function () {
  var DEAD_SIMPLE_DATA = 'X,Y\n10,2100';
  var ZERO_TO_FIFTY = 'X,Y\n10,0\n20,50';
  cleanupAfterEach();

  /**
   * The sanity test of sanity tests.
   */
  it('testTrue', function () {
    assert.isTrue(true);
  });

  /**
   * Sanity test that ensures the graph element exists.
   */
  it('testGraphExists', function () {
    var graph = document.getElementById("graph");
    assert.isNotNull(graph);
  });

  // TODO(konigsberg): Move the following tests to a new package that
  // tests all kinds of toDomCoords, toDataCoords, toPercent, et cetera.

  /**
   * A sanity test of sorts, by ensuring the dygraph is created, and
   * isn't just some piece of junk object.
   */
  it('testToString', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, DEAD_SIMPLE_DATA, {});
    assert.isNotNull(g);
    assert.equal("[Dygraph graph]", g.toString());
  });

  /**
   * Test that when no valueRange is specified, the y axis range is
   * adjusted by 10% on top.
   */
  it('testYAxisRange_default', function () {
    var graph = document.getElementById("graph");
    assert.equal(0, graph.style.length);
    var g = new _dygraph["default"](graph, ZERO_TO_FIFTY, {});
    assert.deepEqual([0, 55], g.yAxisRange(0));
  });

  /**
   * Test that valueRange matches the y-axis range specifically.
   */
  it('testYAxisRange_custom', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, ZERO_TO_FIFTY, {
      valueRange: [0, 50]
    });
    assert.deepEqual([0, 50], g.yAxisRange(0));
    g.updateOptions({
      valueRange: null,
      axes: {
        y: {
          valueRange: [10, 40]
        }
      }
    });
    assert.deepEqual([10, 40], g.yAxisRange(0));
  });

  /**
   * Test that valueRange matches the y-axis range specifically.
   *
   * This is based on the assumption that 20 pixels are dedicated to the
   * axis label and tick marks.
   * TODO(konigsberg): change axis.y.axisLabelWidth to 0 (or 20) and try again.
   */
  it('testToDomYCoord', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, ZERO_TO_FIFTY, {
      height: 70,
      valueRange: [0, 50]
    });
    assert.equal(50, g.toDomYCoord(0));
    assert.equal(0, g.toDomYCoord(50));
    for (var x = 0; x <= 50; x++) {
      assert.closeTo(50 - x, g.toDomYCoord(x), 0.00001);
    }
    g.updateOptions({
      valueRange: null,
      axes: {
        y: {
          valueRange: [0, 50]
        }
      }
    });
    assert.equal(50, g.toDomYCoord(0));
    assert.equal(0, g.toDomYCoord(50));
    for (var x = 0; x <= 50; x++) {
      assert.closeTo(50 - x, g.toDomYCoord(x), 0.00001);
    }
  });

  /**
   * Test that the two-argument form of the constructor (no options) works.
   */
  it('testTwoArgumentConstructor', function () {
    var graph = document.getElementById("graph");
    new _dygraph["default"](graph, ZERO_TO_FIFTY);
  });

  // Here is the first of a series of tests that just ensure the graph is drawn
  // without exception.
  //TODO(konigsberg): Move to its own test case.
  it('testFillStack1', function () {
    var graph = document.getElementById("graph");
    new _dygraph["default"](graph, ZERO_TO_FIFTY, {
      stackedGraph: true
    });
  });
  it('testFillStack2', function () {
    var graph = document.getElementById("graph");
    new _dygraph["default"](graph, ZERO_TO_FIFTY, {
      stackedGraph: true,
      fillGraph: true
    });
  });
  it('testFillStack3', function () {
    var graph = document.getElementById("graph");
    new _dygraph["default"](graph, ZERO_TO_FIFTY, {
      fillGraph: true
    });
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js"}],187:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _custom_asserts = require("./custom_asserts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests input data which uses scientific notation.
 * This is a regression test for
 * http://code.google.com/p/dygraphs/issues/detail?id=186
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("scientific-notation", function () {
  cleanupAfterEach();
  function getXValues(g) {
    var xs = [];
    for (var i = 0; i < g.numRows(); i++) {
      xs.push(g.getValue(i, 0));
    }
    return xs;
  }
  it('testScientificInput', function () {
    var data = "X,Y\n" + "1.0e1,-1\n" + "2.0e1,0\n" + "3.0e1,1\n" + "4.0e1,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {});
    (0, _custom_asserts.assertDeepCloseTo)([10, 20, 30, 40], getXValues(g), 1e-6);
  });
  it('testScientificInputPlus', function () {
    var data = "X,Y\n" + "1.0e+1,-1\n" + "2.0e+1,0\n" + "3.0e+1,1\n" + "4.0e+1,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {});
    (0, _custom_asserts.assertDeepCloseTo)([10, 20, 30, 40], getXValues(g), 1e-6);
  });
  it('testScientificInputMinus', function () {
    var data = "X,Y\n" + "1.0e-1,-1\n" + "2.0e-1,0\n" + "3.0e-1,1\n" + "4.0e-1,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {});
    (0, _custom_asserts.assertDeepCloseTo)([0.1, 0.2, 0.3, 0.4], getXValues(g), 1e-6);
  });
  it('testScientificInputMinusCap', function () {
    var data = "X,Y\n" + "1.0E-1,-1\n" + "2.0E-1,0\n" + "3.0E-1,1\n" + "4.0E-1,0\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, {});
    (0, _custom_asserts.assertDeepCloseTo)([0.1, 0.2, 0.3, 0.4], getXValues(g), 1e-6);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./custom_asserts":154}],188:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for a graph contained in a scrolling div
 *
 * @author konigsberg@google.com (Robert Konigsbrg)
 */

describe("scrolling-div", function () {
  var point, g;
  beforeEach(function () {
    var LOREM_IPSUM = "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" + "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" + "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" + "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" + "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n" + "non proident, sunt in culpa qui officia deserunt mollit anim id est\n" + "laborum.</p>";
    var testDiv = document.getElementById('graph');
    testDiv.innerHTML = "<div id='scroller' style='overflow: scroll; height: 450px; width: 800px;'>" + "<div id='graph-inner'></div>" + "<div style='height:100px; background-color:green;'>" + LOREM_IPSUM + " </div>" + "<div style='height:100px; background-color:red;'>" + LOREM_IPSUM + "</div>" + "</div>";

    // The old test runner had an 8px margin on the body
    // The Mocha test runner does not. We set it on the test div to keep the
    // coordinates the same.
    testDiv.style.margin = '8px';
    var data = [[10, 1], [20, 3], [30, 2], [40, 4], [50, 3], [60, 5], [70, 4], [80, 6]];
    var graph = document.getElementById("graph-inner");
    point = null;
    g = new _dygraph["default"](graph, data, {
      labels: ['a', 'b'],
      drawPoints: true,
      highlightCircleSize: 6,
      pointClickCallback: function pointClickCallback(evt, p) {
        point = p;
      }
    });
  });

  // This is usually something like 15, but for OS X Lion and its auto-hiding
  // scrollbars, it's 0. This is a large enough difference that we need to
  // consider it when synthesizing clicks.
  // Adapted from http://davidwalsh.name/detect-scrollbar-width
  var detectScrollbarWidth = function detectScrollbarWidth() {
    // Create the measurement node
    var scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);

    // Get the scrollbar width
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Delete the DIV
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  /**
   * This tests that when the nested div is unscrolled, things work normally.
   */
  it('testUnscrolledDiv', function () {
    document.getElementById('scroller').scrollTop = 0;
    var clickOn4_40 = {
      clientX: 244,
      clientY: 131,
      screenX: 416,
      screenY: 320
    };
    _DygraphOps["default"].dispatchCanvasEvent(g, _DygraphOps["default"].createEvent(clickOn4_40, {
      type: 'mousemove'
    }));
    _DygraphOps["default"].dispatchCanvasEvent(g, _DygraphOps["default"].createEvent(clickOn4_40, {
      type: 'mousedown'
    }));
    _DygraphOps["default"].dispatchCanvasEvent(g, _DygraphOps["default"].createEvent(clickOn4_40, {
      type: 'mouseup'
    }));
    assert.equal(40, point.xval);
    assert.equal(4, point.yval);
  });

  /**
   * This tests that when the nested div is scrolled, things work normally.
   */
  it('testScrolledDiv', function () {
    document.getElementById('scroller').scrollTop = 117;
    var clickOn4_40 = {
      clientX: 244,
      clientY: 30 - detectScrollbarWidth(),
      screenX: 416,
      screenY: 160
    };
    _DygraphOps["default"].dispatchCanvasEvent(g, _DygraphOps["default"].createEvent(clickOn4_40, {
      type: 'mousemove'
    }));
    _DygraphOps["default"].dispatchCanvasEvent(g, _DygraphOps["default"].createEvent(clickOn4_40, {
      type: 'mousedown'
    }));
    _DygraphOps["default"].dispatchCanvasEvent(g, _DygraphOps["default"].createEvent(clickOn4_40, {
      type: 'mouseup'
    }));
    assert.equal(40, point.xval);
    assert.equal(4, point.yval);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./DygraphOps":145}],189:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _default = _interopRequireDefault(require("../../src/datahandler/default"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Regression test based on an optimization w/
 * unforeseen consequences.
 * @author danvk@google.com (Dan Vanderkam)
 * @license MIT
 */

describe("selection", function () {
  cleanupAfterEach();
  it('testSetGetSelection', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, "X,Y\n" + "1,1\n" + "50,50\n" + "100,100\n");
    g.setSelection(0);
    assert.equal(0, g.getSelection());
    g.setSelection(1);
    assert.equal(1, g.getSelection());
    g.setSelection(2);
    assert.equal(2, g.getSelection());
  });
  it('testSetGetSelectionDense', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, "X,Y\n" + "1,1\n" + "50,50\n" + "50.0001,50.0001\n" + "100,100\n");
    g.setSelection(0);
    assert.equal(0, g.getSelection());
    g.setSelection(1);
    assert.equal(1, g.getSelection());
    g.setSelection(2);
    assert.equal(2, g.getSelection());
    g.setSelection(3);
    assert.equal(3, g.getSelection());
  });
  it('testSetGetSelectionMissingPoints', function () {
    var dataHandler = function dataHandler() {};
    dataHandler.prototype = new _default["default"]();
    dataHandler.prototype.seriesToPoints = function (series, setName, boundaryIdStart) {
      var val = null;
      if (setName == 'A') {
        val = 1;
      } else if (setName == 'B') {
        val = 2;
      } else if (setName == 'C') {
        val = 3;
      }
      return [{
        x: NaN,
        y: NaN,
        xval: val,
        yval: val,
        name: setName,
        idx: val - 1
      }];
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, "X,A,B,C\n" + "1,1,,\n" + "2,,2,\n" + "3,,,3\n", {
      dataHandler: dataHandler
    });
    g.setSelection(0);
    assert.equal(0, g.getSelection());
    g.setSelection(1);
    assert.equal(1, g.getSelection());
    g.setSelection(2);
    assert.equal(2, g.getSelection());
  });
});

},{"../../src/datahandler/default":"dygraphs/src/datahandler/default.js","../../src/dygraph":"dygraphs/src/dygraph.js"}],190:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
var _PixelSampler = _interopRequireDefault(require("./PixelSampler"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright (c) 2011 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @fileoverview Test cases for drawing simple lines.
 *
 * @author konigsberg@google.com (Robert Konigsberg)
 */

describe("simple-drawing", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);
  var ZERO_TO_FIFTY = 'X,Y\n10,0\n20,50';
  it('testDrawSimpleRangePlusOne', function () {
    var opts = {
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      valueRange: [0, 51]
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, ZERO_TO_FIFTY, opts);
    var htx = g.hidden_ctx_;
    _CanvasAssertions["default"].assertLineDrawn(htx, [0, 320], [475, 6.2745], {
      strokeStyle: "#008080",
      lineWidth: 1
    });
    g.destroy(); // to balance context saves and destroys.
    _CanvasAssertions["default"].assertBalancedSaveRestore(htx);
  });

  // See http://code.google.com/p/dygraphs/issues/detail?id=185
  it('testDrawSimpleRangeZeroToFifty', function () {
    var opts = {
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      valueRange: [0, 50]
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, ZERO_TO_FIFTY, opts);
    var htx = g.hidden_ctx_;
    var lines = _CanvasAssertions["default"].getLinesDrawn(htx, {
      strokeStyle: "#008080",
      lineWidth: 1
    });
    assert.equal(1, lines.length);
    g.destroy(); // to balance context saves and destroys.
    _CanvasAssertions["default"].assertBalancedSaveRestore(htx);
  });
  it('testDrawWithAxis', function () {
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, ZERO_TO_FIFTY);
    var htx = g.hidden_ctx_;
    g.destroy(); // to balance context saves and destroys.
    _CanvasAssertions["default"].assertBalancedSaveRestore(htx);
  });

  /**
   * Tests that it is drawing dashes, and it remember the dash history between
   * points.
   */
  it('testDrawSimpleDash', function () {
    var opts = {
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      series: {
        'Y1': {
          strokePattern: [25, 7, 7, 7]
        }
      },
      colors: ['#ff0000'],
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    // Set the dims so we pass if default changes.
    graph.style.width = '480px';
    graph.style.height = '320px';
    var g = new _dygraph["default"](graph, [[1, 4], [2, 5], [3, 3], [4, 7], [5, 9]], opts);
    var htx = g.hidden_ctx_;

    // TODO(danvk): figure out a good way to restore this test.
    // assert.equal(29, CanvasAssertions.numLinesDrawn(htx, "#ff0000"));
    g.destroy(); // to balance context saves and destroys.
    _CanvasAssertions["default"].assertBalancedSaveRestore(htx);
  });

  /**
   * Tests that thick lines are drawn continuously.
   * Regression test for http://code.google.com/p/dygraphs/issues/detail?id=328
   */
  it('testDrawThickLine', function () {
    var opts = {
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      strokeWidth: 15,
      colors: ['#ff0000'],
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    // Set the dims so we pass if default changes.
    graph.style.width = '480px';
    graph.style.height = '320px';
    var g = new _dygraph["default"](graph, [[1, 2], [2, 5], [3, 2], [4, 7], [5, 0]], opts);
    var htx = g.hidden_ctx_;

    // There's a big gap in the line at (2, 5)
    // If the bug is fixed, then there should be some red going up from here.
    var xy = g.toDomCoords(2, 5);
    var x = Math.round(xy[0]),
      y = Math.round(xy[1]);
    var sampler = new _PixelSampler["default"](g);
    assert.deepEqual([255, 0, 0, 255], sampler.colorAtPixel(x, y));
    assert.deepEqual([255, 0, 0, 255], sampler.colorAtPixel(x, y - 1));
    assert.deepEqual([255, 0, 0, 255], sampler.colorAtPixel(x, y - 2));

    // TODO(danvk): figure out a good way to restore this test.
    // assert.equal(29, CanvasAssertions.numLinesDrawn(htx, "#ff0000"));
    g.destroy(); // to balance context saves and destroys.
    _CanvasAssertions["default"].assertBalancedSaveRestore(htx);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./PixelSampler":146,"./Proxy":147}],191:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
require("../../src/extras/smooth-plotter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for the smooth (bezier curve) plotter.
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

// defines Dygraph.smoothPlotter

describe("smooth-plotter", function () {
  var smoothPlotter = _dygraph["default"].smoothPlotter;
  var getControlPoints = smoothPlotter._getControlPoints;
  beforeEach(function () {});
  afterEach(function () {});
  it('testNoSmoothing', function () {
    var lastPt = {
        x: 10,
        y: 0
      },
      pt = {
        x: 11,
        y: 1
      },
      nextPt = {
        x: 12,
        y: 0
      },
      alpha = 0;
    assert.deepEqual([11, 1, 11, 1], getControlPoints(lastPt, pt, nextPt, alpha));
  });
  it('testHalfSmoothing', function () {
    var lastPt = {
        x: 10,
        y: 0
      },
      pt = {
        x: 11,
        y: 1
      },
      nextPt = {
        x: 12,
        y: 0
      },
      alpha = 0.5;
    assert.deepEqual([10.5, 1, 11.5, 1], getControlPoints(lastPt, pt, nextPt, alpha));
  });
  it('testExtrema', function () {
    var lastPt = {
        x: 10,
        y: 0
      },
      pt = {
        x: 11,
        y: 1
      },
      nextPt = {
        x: 12,
        y: 1
      },
      alpha = 0.5;
    assert.deepEqual([10.5, 0.75, 11.5, 1.25], getControlPoints(lastPt, pt, nextPt, alpha, true));
    assert.deepEqual([10.5, 1, 11.5, 1], getControlPoints(lastPt, pt, nextPt, alpha, false));
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/extras/smooth-plotter":"dygraphs/src/extras/smooth-plotter.js"}],192:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _Util = _interopRequireDefault(require("./Util"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests using the "stackedGraph" option.
 *
 * @author dan@dygraphs.com (Dan Vanderkam)
 */

describe("stacked", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);
  it('testCorrectColors', function () {
    var opts = {
      width: 400,
      height: 300,
      stackedGraph: true,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      valueRange: [0, 3],
      colors: ['#00ff00', '#0000ff'],
      fillAlpha: 0.15
    };
    var data = "X,Y1,Y2\n" + "0,1,1\n" + "1,1,1\n" + "2,1,1\n" + "3,1,1\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);

    // y pixels 299-201 = y2 = transparent blue
    // y pixel 200 = y2 line (blue)
    // y pixels 199-101 = y1 = transparent green
    // y pixel 100 = y1 line (green)
    // y pixels 0-99 = nothing (white)

    // 38 = round(0.15 * 255)
    assert.deepEqual([0, 0, 255, 38], _Util["default"].samplePixel(g.hidden_, 200, 250));
    assert.deepEqual([0, 255, 0, 38], _Util["default"].samplePixel(g.hidden_, 200, 150));
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=358
  it('testSelectionValues', function () {
    var opts = {
      stackedGraph: true
    };
    var data = "X,Y1,Y2\n" + "0,1,1\n" + "1,1,1\n" + "2,1,1\n" + "3,1,1\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setSelection(0);
    assert.equal("0: Y1: 1 Y2: 1", _Util["default"].getLegend());

    // Verify that the behavior is correct with highlightSeriesOpts as well.
    g.updateOptions({
      highlightSeriesOpts: {
        strokeWidth: 10
      }
    });
    g.setSelection(0);
    assert.equal("0: Y1: 1 Y2: 1", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("1: Y1: 1 Y2: 1", _Util["default"].getLegend());
    g.setSelection(0, 'Y2');
    assert.equal("0: Y1: 1 Y2: 1", _Util["default"].getLegend());
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=176
  it('testDuplicatedXValue', function () {
    var opts = {
      stackedGraph: true,
      fillAlpha: 0.15,
      colors: ['#00ff00'],
      width: 400,
      height: 300
    };
    var data = "X,Y1\n" + "0,1\n" + "1,1\n" + "2,1\n" + "2,1\n" +
    // duplicate x-value!
    "3,1\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    assert(g.yAxisRange()[1] < 2);
    assert.deepEqual([0, 255, 0, 38], _Util["default"].samplePixel(g.hidden_, 200, 250));
    assert.deepEqual([0, 255, 0, 38], _Util["default"].samplePixel(g.hidden_, 317, 250));
  });

  // Validates regression when null values in stacked graphs show up
  // incorrectly in the legend.
  it('testNullValues', function () {
    var opts = {
      stackedGraph: true,
      stepPlot: true
    };
    var data = "X,Y1,Y2,Y3\n" + "0,-5,-1,1\n" + "1,1,,1\n" + "2,1,2,3\n" + "3,3,,4\n" + "4,3,2,3\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setSelection(0);
    assert.equal("0: Y1: -5 Y2: -1 Y3: 1", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("1: Y1: 1 Y3: 1", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2: Y1: 1 Y2: 2 Y3: 3", _Util["default"].getLegend());
    g.setSelection(3);
    assert.equal("3: Y1: 3 Y3: 4", _Util["default"].getLegend());
    g.setSelection(4);
    assert.equal("4: Y1: 3 Y2: 2 Y3: 3", _Util["default"].getLegend());
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=438
  it('testMissingValueAtZero', function () {
    var opts = {
      stackedGraph: true
    };
    var data = "X,Y1,Y2\n" + "0,,1\n" + "1,1,2\n" + "2,,3\n";
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setSelection(0);
    assert.equal("0: Y2: 1", _Util["default"].getLegend());
    g.setSelection(1);
    assert.equal("1: Y1: 1 Y2: 2", _Util["default"].getLegend());
    g.setSelection(2);
    assert.equal("2: Y2: 3", _Util["default"].getLegend());
  });
  it('testInterpolation', function () {
    var opts = {
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      stackedGraph: true,
      labels: ['X', 'Y1', 'Y2', 'Y3', 'Y4']
    };

    // The last series is all-NaN, it ought to be treated as all zero
    // for stacking purposes.
    var N = NaN;
    var data = [[100, 1, 2, N, N], [101, 1, 2, 2, N], [102, 1, N, N, N], [103, 1, 2, 4, N], [104, N, N, N, N], [105, 1, 2, N, N], [106, 1, 2, 7, N], [107, 1, 2, 8, N], [108, 1, 2, 9, N], [109, 1, N, N, N]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Check that lines are drawn at the expected positions, using
    // interpolated values for missing data.
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(100, 4), g.toDomCoords(101, 4), {
      strokeStyle: '#00ff00'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(102, 6), g.toDomCoords(103, 7), {
      strokeStyle: '#ff0000'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(107, 8), g.toDomCoords(108, 9), {
      strokeStyle: '#0000ff'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(108, 12), g.toDomCoords(109, 12), {
      strokeStyle: '#ff0000'
    });

    // Check that the expected number of line segments gets drawn
    // for each series. Gaps don't get a line.
    assert.equal(7, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    assert.equal(4, _CanvasAssertions["default"].numLinesDrawn(htx, '#00ff00'));
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#0000ff'));

    // Check that the selection returns the original (non-stacked)
    // values and skips gaps.
    g.setSelection(1);
    assert.equal("101: Y1: 1 Y2: 2 Y3: 2", _Util["default"].getLegend());
    g.setSelection(8);
    assert.equal("108: Y1: 1 Y2: 2 Y3: 9", _Util["default"].getLegend());
    g.setSelection(9);
    assert.equal("109: Y1: 1", _Util["default"].getLegend());
  });
  it('testInterpolationOptions', function () {
    var opts = {
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      stackedGraph: true,
      labels: ['X', 'Y1', 'Y2', 'Y3']
    };
    var data = [[100, 1, NaN, 3], [101, 1, 2, 3], [102, 1, NaN, 3], [103, 1, 2, 3], [104, 1, NaN, 3]];
    var choices = ['all', 'inside', 'none'];
    var stackedY = [[6, 6, 6, 6, 6], [4, 6, 6, 6, 4], [4, 6, 4, 6, 4]];
    for (var i = 0; i < choices.length; ++i) {
      var graph = document.getElementById("graph");
      opts['stackedGraphNaNFill'] = choices[i];
      var g = new _dygraph["default"](graph, data, opts);
      var htx = g.hidden_ctx_;
      var attrs = {};

      // Check top lines get drawn at the expected positions.
      for (var j = 0; j < stackedY[i].length - 1; ++j) {
        _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(100 + j, stackedY[i][j]), g.toDomCoords(101 + j, stackedY[i][j + 1]), {
          strokeStyle: '#ff0000'
        });
      }
    }
  });
  it('testMultiAxisInterpolation', function () {
    // Setting 2 axes to test that each axis stacks separately
    var opts = {
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      stackedGraph: true,
      series: {
        'Y1': {
          axis: 'y'
        },
        'Y2': {
          axis: 'y'
        },
        'Y3': {
          axis: 'y2'
        },
        'Y4': {
          axis: 'y2'
        }
      },
      labels: ['X', 'Y1', 'Y2', 'Y3', 'Y4']
    };

    // The last series is all-NaN, it ought to be treated as all zero
    // for stacking purposes.
    var N = NaN;
    var data = [[100, 1, 2, N, N], [101, 1, 2, 2, N], [102, 1, N, N, N], [103, 1, 2, 4, N], [104, N, N, N, N], [105, 1, 2, N, N], [106, 1, 2, 7, N], [107, 1, 2, 8, N], [108, 1, 2, 9, N], [109, 1, N, N, N]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Check that lines are drawn at the expected positions, using
    // interpolated values for missing data.
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(100, 2), g.toDomCoords(101, 2), {
      strokeStyle: '#00ff00'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(102, 3), g.toDomCoords(103, 3), {
      strokeStyle: '#ff0000'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(107, 2.71), g.toDomCoords(108, 3), {
      strokeStyle: '#0000ff'
    });
    _CanvasAssertions["default"].assertLineDrawn(htx, g.toDomCoords(108, 3), g.toDomCoords(109, 3), {
      strokeStyle: '#ff0000'
    });

    // Check that the expected number of line segments gets drawn
    // for each series. Gaps don't get a line.
    assert.equal(7, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
    assert.equal(4, _CanvasAssertions["default"].numLinesDrawn(htx, '#00ff00'));
    assert.equal(2, _CanvasAssertions["default"].numLinesDrawn(htx, '#0000ff'));

    // Check that the selection returns the original (non-stacked)
    // values and skips gaps.
    g.setSelection(1);
    assert.equal("101: Y1: 1 Y2: 2 Y3: 2", _Util["default"].getLegend());
    g.setSelection(8);
    assert.equal("108: Y1: 1 Y2: 2 Y3: 9", _Util["default"].getLegend());
    g.setSelection(9);
    assert.equal("109: Y1: 1", _Util["default"].getLegend());
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147,"./Util":148}],193:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for the option "stepPlot" especially for the scenario where the option is not set for the whole graph but for single series.
 *
 * TODO(danvk): delete this test once dpxdt screenshot tests are part of the
 *     main dygraphs repo. The tests have extremely specific expectations about
 *     how drawing is performed. It's more realistic to test the resulting
 *     pixels.
 *
 * @author julian.eichstaedt@ch.sauter-bc.com (Fr. Sauter AG)
 */

describe("step-plot-per-series", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);
  it('testMixedModeStepAndLineFilled', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      errorBars: false,
      labels: ["X", "Idle", "Used"],
      series: {
        Idle: {
          stepPlot: false
        },
        Used: {
          stepPlot: true
        }
      },
      fillGraph: true,
      stackedGraph: false,
      includeZero: true
    };
    var data = [[1, 70, 30], [2, 12, 88], [3, 88, 12], [4, 63, 37], [5, 35, 65]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};
    for (var i = 0; i < data.length - 1; i++) {
      var x1 = data[i][0];
      var x2 = data[i + 1][0];
      var y1 = data[i][1];
      var y2 = data[i + 1][1];

      // First series (line)
      var xy1 = g.toDomCoords(x1, y1);
      var xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      y1 = data[i][2];
      y2 = data[i + 1][2];

      // Seconds series (step)
      // Horizontal line
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y1);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // Vertical line
      xy1 = g.toDomCoords(x2, y1);
      xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
    }
  });
  it('testMixedModeStepAndLineStackedAndFilled', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      errorBars: false,
      labels: ["X", "Idle", "Used", "NotUsed", "Active"],
      series: {
        Idle: {
          stepPlot: false
        },
        Used: {
          stepPlot: true
        },
        NotUsed: {
          stepPlot: false
        },
        Active: {
          stepPlot: true
        }
      },
      fillGraph: true,
      stackedGraph: true,
      includeZero: true
    };
    var data = [[1, 60, 30, 5, 5], [2, 12, 73, 5, 10], [3, 38, 12, 30, 20], [4, 50, 17, 23, 10], [5, 35, 25, 35, 5]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};
    for (var i = 0; i < data.length - 1; i++) {
      var x1 = data[i][0];
      var x2 = data[i + 1][0];
      var y1base = 0;
      var y2base = 0;
      var y1 = data[i][4];
      var y2 = data[i + 1][4];

      // Fourth series (step)
      // Test lines
      // Horizontal line
      var xy1 = g.toDomCoords(x1, y1);
      var xy2 = g.toDomCoords(x2, y1);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // Vertical line
      xy1 = g.toDomCoords(x2, y1);
      xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Test edges of areas (also drawn by dygraphs as lines)
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y1);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x2, y2base);
      // CanvasAssertions.assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x1, y1base);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // The last edge can not be tested via assertLineDrawn since it wasn't drawn as a line but via clossePath.
      // But a rectangle is completely tested with three of its four edges.

      y1base = y1;
      y2base = y1;
      y1 += data[i][3];
      y2 += data[i + 1][3];

      // Third series (line)
      // Test lines
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Test edges of areas (also drawn by dygraphs as lines)
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x2, y2base);
      // CanvasAssertions.assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x1, y1base);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // The last edge can not be tested via assertLineDrawn since it wasn't drawn as a line but via clossePath.
      // But a rectangle is completely tested with three of its four edges.

      y1base = y1;
      y2base = y2;
      y1 += data[i][2];
      y2 += data[i + 1][2];

      // Second series (step)
      // Test lines
      // Horizontal line
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y1);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // Vertical line
      xy1 = g.toDomCoords(x2, y1);
      xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Test edges of areas (also drawn by dygraphs as lines)
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y1);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x2, y2base);
      // CanvasAssertions.assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x1, y1base);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // The last edge can not be tested via assertLineDrawn since it wasn't drawn as a line but via clossePath.
      // But a rectangle is completely tested with three of its four edges.

      y1base = y1;
      y2base = y1;
      y1 += data[i][1];
      y2 += data[i + 1][1];

      // First series (line)
      // Test lines
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Test edges of areas (also drawn by dygraphs as lines)
      xy1 = g.toDomCoords(x1, y1);
      xy2 = g.toDomCoords(x2, y2);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x2, y2base);
      // CanvasAssertions.assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x1, y1base);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // The last edge can not be tested via assertLineDrawn since it wasn't drawn as a line but via clossePath.
      // But a rectangle is completely tested with three of its four edges.
    }
  });

  it('testMixedModeStepAndLineErrorBars', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      errorBars: true,
      sigma: 1,
      labels: ["X", "Data1", "Data2"],
      series: {
        Data1: {
          stepPlot: true
        },
        Data2: {
          stepPlot: false
        }
      }
    };
    var data = [[1, [75, 2], [50, 3]], [2, [70, 5], [90, 4]], [3, [80, 7], [112, 5]], [4, [55, 3], [100, 2]], [5, [69, 4], [85, 6]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Test first series (step)
    for (var i = 0; i < data.length - 1; i++) {
      var x1 = data[i][0];
      var x2 = data[i + 1][0];
      var y1_middle = data[i][1][0];
      var y2_middle = data[i + 1][1][0];
      var y1_top = y1_middle + data[i][1][1];
      var y2_top = y2_middle + data[i + 1][1][1];
      var y1_bottom = y1_middle - data[i][1][1];
      var y2_bottom = y2_middle - data[i + 1][1][1];
      // Bottom line
      var xy1 = g.toDomCoords(x1, y1_bottom);
      var xy2 = g.toDomCoords(x2, y1_bottom);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Top line
      xy1 = g.toDomCoords(x1, y1_top);
      xy2 = g.toDomCoords(x2, y1_top);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Middle line
      xy1 = g.toDomCoords(x1, y1_middle);
      xy2 = g.toDomCoords(x2, y1_middle);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Test edges of error bar areas(also drawn by dygraphs as lines)
      xy1 = g.toDomCoords(x1, y1_top);
      xy2 = g.toDomCoords(x2, y1_top);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x2, y1_bottom);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x1, y1_bottom);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // The last edge can not be tested via assertLineDrawn since it wasn't drawn as a line but via clossePath.
      // But a rectangle is completely tested with three of its four edges.
    }

    // Test second series (line)
    for (var i = 0; i < data.length - 1; i++) {
      // bottom line
      var xy1 = g.toDomCoords(data[i][0], data[i][2][0] - data[i][2][1]);
      var xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][2][0] - data[i + 1][2][1]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // top line
      xy1 = g.toDomCoords(data[i][0], data[i][2][0] + data[i][2][1]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][2][0] + data[i + 1][2][1]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // middle line
      xy1 = g.toDomCoords(data[i][0], data[i][2][0]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][2][0]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
    }
  });
  it('testMixedModeStepAndLineCustomBars', function () {
    var opts = {
      width: 480,
      height: 320,
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      customBars: true,
      labels: ["X", "Data1", "Data2"],
      series: {
        Data1: {
          stepPlot: true
        },
        Data2: {
          stepPlot: false
        }
      }
    };
    var data = [[1, [73, 75, 78], [50, 55, 70]], [2, [65, 70, 75], [83, 91, 99]], [3, [75, 85, 90], [98, 107, 117]], [4, [55, 58, 61], [93, 102, 105]], [5, [69, 73, 85], [80, 85, 87]]];
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    var htx = g.hidden_ctx_;
    var attrs = {};

    // Test first series (step)
    for (var i = 0; i < data.length - 1; i++) {
      var x1 = data[i][0];
      var x2 = data[i + 1][0];
      var y1_middle = data[i][1][1];
      var y2_middle = data[i + 1][1][1];
      var y1_top = data[i][1][2];
      var y2_top = data[i + 1][1][2];
      var y1_bottom = data[i][1][0];
      var y2_bottom = data[i + 1][1][0];

      // Bottom line
      var xy1 = g.toDomCoords(x1, y1_bottom);
      var xy2 = g.toDomCoords(x2, y1_bottom);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Top line
      xy1 = g.toDomCoords(x1, y1_top);
      xy2 = g.toDomCoords(x2, y1_top);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Middle line
      xy1 = g.toDomCoords(x1, y1_middle);
      xy2 = g.toDomCoords(x2, y1_middle);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Test edges of custom bar areas(also drawn by dygraphs as lines)
      xy1 = g.toDomCoords(x1, y1_top);
      xy2 = g.toDomCoords(x2, y1_top);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x2, y1_bottom);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      xy1 = xy2;
      xy2 = g.toDomCoords(x1, y1_bottom);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
      // The last edge can not be tested via assertLineDrawn since it wasn't drawn as a line but via clossePath.
      // But a rectangle is completely tested with three of its four edges.
    }

    // Test second series (line)
    for (var i = 0; i < data.length - 1; i++) {
      // Bottom line
      var xy1 = g.toDomCoords(data[i][0], data[i][2][0]);
      var xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][2][0]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Top line
      xy1 = g.toDomCoords(data[i][0], data[i][2][2]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][2][2]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);

      // Middle line
      xy1 = g.toDomCoords(data[i][0], data[i][2][1]);
      xy2 = g.toDomCoords(data[i + 1][0], data[i + 1][2][1]);
      _CanvasAssertions["default"].assertLineDrawn(htx, xy1, xy2, attrs);
    }
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147}],194:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
require("../../src/extras/synchronizer");
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests synchronizer.
 *
 * @author nyx@nyx.cz (Marek Janda)
 */

// Sets Dygraph.synchronize

describe("synchronize", function () {
  var gs;
  var originalCallbackCalled;
  var data = "X,a,b,c\n" + "10,-1,1,2\n" + "11,0,3,1\n" + "12,1,4,2\n" + "13,0,2,3\n";
  var h_row, h_pts;
  var graph = document.getElementById('graph');
  beforeEach(function () {
    graph.innerHTML = "<div id='graph1'></div><div id='graph2'></div>";
    originalCallbackCalled = false;
    h_row = 0, h_pts = [];
    gs = [];
    var highlightCallback = function highlightCallback(e, x, pts, row) {
      originalCallbackCalled = true;
      h_row = row;
      h_pts = pts;
      assert.equal(gs[0], this);
    };
    gs.push(new _dygraph["default"](document.getElementById("graph1"), data, {
      width: 100,
      height: 100,
      visibility: [false, true, true],
      highlightCallback: highlightCallback
    }));
    gs.push(new _dygraph["default"](document.getElementById("graph2"), data, {
      width: 100,
      height: 100,
      visibility: [false, true, true]
    }));
  });
  afterEach(function () {});

  /**
   * This tests if original highlightCallback is called when synchronizer is attached
   */
  it('testOriginalHighlightCallbackStillWorks', function () {
    var sync = _dygraph["default"].synchronize(gs);
    _DygraphOps["default"].dispatchMouseMove(gs[1], 5, 5);
    // check that chart2 doesn't trigger highlightCallback on chart1
    assert.equal(originalCallbackCalled, false);
    _DygraphOps["default"].dispatchMouseMove(gs[0], 13, 10);
    // check that original highlightCallback was called
    assert.equal(originalCallbackCalled, true);
    sync.detach();
  });

  /**
   * This tests if selection is propagated correctly between charts
   */
  it('testChartsAreSynchronized', function () {
    _DygraphOps["default"].dispatchMouseMove(gs[0], 13, 10);
    assert.notEqual(gs[0].getSelection(), gs[1].getSelection());
    _DygraphOps["default"].dispatchMouseMove(gs[0], 0, 0);
    var sync = _dygraph["default"].synchronize(gs);
    _DygraphOps["default"].dispatchMouseMove(gs[0], 13, 10);

    //check correct row is highlighted on second chart
    assert.equal(3, h_row);
    //check there are only two points (because first series is hidden)
    assert.equal(2, h_pts.length);
    //check that selection on both charts is the same
    assert.equal(gs[0].getSelection(), gs[1].getSelection());
    sync.detach();
  });

  /**
   * This tests if detach works
   */
  it('testSynchronizerDetach', function () {
    var sync = _dygraph["default"].synchronize(gs);
    _DygraphOps["default"].dispatchMouseMove(gs[1], 10, 10);
    sync.detach();
    originalCallbackCalled = false;
    _DygraphOps["default"].dispatchMouseMove(gs[1], 0, 0);

    //check that chart2 doesn't have highlightCallback
    assert.equal(originalCallbackCalled, false);
    _DygraphOps["default"].dispatchMouseMove(gs[0], 13, 10);

    //check that original callback was re-attached
    assert.equal(originalCallbackCalled, true);

    //check that selection isn't synchronized anymore
    assert.equal(gs[0].getSelection(), 3);
    assert.equal(gs[1].getSelection(), 0);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/extras/synchronizer":"dygraphs/src/extras/synchronizer.js","./DygraphOps":145}],195:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _Proxy = _interopRequireDefault(require("./Proxy"));
var _CanvasAssertions = _interopRequireDefault(require("./CanvasAssertions"));
var _custom_asserts = require("./custom_asserts");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test cases for toDomCoords/toDataCoords
 *
 * @author danvk@google.com (Dan Vanderkam)
 */

describe("to-dom-coords", function () {
  cleanupAfterEach();
  useProxyCanvas(utils, _Proxy["default"]);

  // Checks that toDomCoords and toDataCoords are inverses of one another.
  var checkForInverses = function checkForInverses(g) {
    var x_range = g.xAxisRange();
    var y_range = g.yAxisRange();
    for (var i = 0; i <= 10; i++) {
      var x = x_range[0] + i / 10.0 * (x_range[1] - x_range[0]);
      for (var j = 0; j <= 10; j++) {
        var y = y_range[0] + j / 10.0 * (y_range[1] - y_range[0]);
        assert.equal(x, g.toDataXCoord(g.toDomXCoord(x)));
        assert.equal(y, g.toDataYCoord(g.toDomYCoord(y)));
      }
    }
  };
  it('testPlainChart', function () {
    var opts = {
      axes: {
        x: {
          drawAxis: false,
          drawGrid: false
        },
        y: {
          drawAxis: false,
          drawGrid: false
        }
      },
      rightGap: 0,
      valueRange: [0, 100],
      dateWindow: [0, 100],
      width: 400,
      height: 400,
      colors: ['#ff0000'],
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[0, 0], [100, 100]], opts);
    assert.deepEqual([0, 100], g.toDataCoords(0, 0));
    assert.deepEqual([0, 0], g.toDataCoords(0, 400));
    assert.deepEqual([100, 100], g.toDataCoords(400, 0));
    assert.deepEqual([100, 0], g.toDataCoords(400, 400));
    checkForInverses(g);

    // TODO(konigsberg): This doesn't really belong here. Move to its own test.
    var htx = g.hidden_ctx_;
    assert.equal(1, _CanvasAssertions["default"].numLinesDrawn(htx, '#ff0000'));
  });
  it('testChartWithAxes', function () {
    var opts = {
      axes: {
        x: {
          drawGrid: false,
          drawAxis: true
        },
        y: {
          drawGrid: false,
          drawAxis: true,
          axisLabelWidth: 100
        }
      },
      xAxisHeight: 50,
      axisTickSize: 0,
      rightGap: 0,
      valueRange: [0, 100],
      dateWindow: [0, 100],
      width: 500,
      height: 450,
      colors: ['#ff0000'],
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[0, 0], [100, 100]], opts);
    assert.deepEqual([0, 100], g.toDataCoords(100, 0));
    assert.deepEqual([0, 0], g.toDataCoords(100, 400));
    assert.deepEqual([100, 100], g.toDataCoords(500, 0));
    assert.deepEqual([100, 0], g.toDataCoords(500, 400));
    checkForInverses(g);
  });
  it('testChartWithAxesAndLabels', function () {
    var opts = {
      axes: {
        x: {
          drawGrid: false,
          drawAxis: true
        },
        y: {
          drawGrid: false,
          drawAxis: true,
          axisLabelWidth: 100
        }
      },
      xAxisHeight: 50,
      axisTickSize: 0,
      rightGap: 0,
      valueRange: [0, 100],
      dateWindow: [0, 100],
      width: 500,
      height: 500,
      colors: ['#ff0000'],
      ylabel: 'This is the y-axis',
      xlabel: 'This is the x-axis',
      xLabelHeight: 25,
      title: 'This is the title of the chart',
      titleHeight: 25,
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[0, 0], [100, 100]], opts);
    assert.deepEqual([0, 100], g.toDataCoords(100, 25));
    assert.deepEqual([0, 0], g.toDataCoords(100, 425));
    assert.deepEqual([100, 100], g.toDataCoords(500, 25));
    assert.deepEqual([100, 0], g.toDataCoords(500, 425));
    checkForInverses(g);
  });
  it('testYAxisLabelWidth', function () {
    var opts = {
      axes: {
        y: {
          axisLabelWidth: 100
        }
      },
      axisTickSize: 0,
      rightGap: 0,
      valueRange: [0, 100],
      dateWindow: [0, 100],
      width: 500,
      height: 500,
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[0, 0], [100, 100]], opts);
    assert.deepEqual([100, 0], g.toDomCoords(0, 100));
    assert.deepEqual([500, 486], g.toDomCoords(100, 0));
    g.updateOptions({
      axes: {
        y: {
          axisLabelWidth: 50
        }
      }
    });
    assert.deepEqual([50, 0], g.toDomCoords(0, 100));
    assert.deepEqual([500, 486], g.toDomCoords(100, 0));
  });
  it('testAxisTickSize', function () {
    var opts = {
      axes: {
        y: {
          axisLabelWidth: 100
        }
      },
      axisTickSize: 0,
      rightGap: 0,
      valueRange: [0, 100],
      dateWindow: [0, 100],
      width: 500,
      height: 500,
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[0, 0], [100, 100]], opts);
    assert.deepEqual([100, 0], g.toDomCoords(0, 100));
    assert.deepEqual([500, 486], g.toDomCoords(100, 0));
    g.updateOptions({
      axisTickSize: 50
    });
    assert.deepEqual([200, 0], g.toDomCoords(0, 100));
    assert.deepEqual([500, 386], g.toDomCoords(100, 0));
  });
  it('testChartLogarithmic_YAxis', function () {
    var opts = {
      rightGap: 0,
      valueRange: [1, 4],
      dateWindow: [0, 10],
      width: 400,
      height: 400,
      colors: ['#ff0000'],
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false
        },
        y: {
          drawGrid: false,
          drawAxis: false,
          logscale: true
        }
      },
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[1, 1], [4, 4]], opts);
    var epsilon = 1e-8;
    (0, _custom_asserts.assertDeepCloseTo)([0, 4], g.toDataCoords(0, 0), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([0, 1], g.toDataCoords(0, 400), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([10, 4], g.toDataCoords(400, 0), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([10, 1], g.toDataCoords(400, 400), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([10, 2], g.toDataCoords(400, 200), epsilon);
    assert.deepEqual([0, 0], g.toDomCoords(0, 4));
    assert.deepEqual([0, 400], g.toDomCoords(0, 1));
    assert.deepEqual([400, 0], g.toDomCoords(10, 4));
    assert.deepEqual([400, 400], g.toDomCoords(10, 1));
    assert.deepEqual([400, 200], g.toDomCoords(10, 2));

    // Verify that the margins are adjusted appropriately for yRangePad.
    g.updateOptions({
      yRangePad: 40
    });
    (0, _custom_asserts.assertDeepCloseTo)([0, 4], g.toDataCoords(0, 40), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([0, 1], g.toDataCoords(0, 360), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([10, 4], g.toDataCoords(400, 40), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([10, 1], g.toDataCoords(400, 360), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([10, 2], g.toDataCoords(400, 200), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([0, 40], g.toDomCoords(0, 4), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([0, 360], g.toDomCoords(0, 1), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([400, 40], g.toDomCoords(10, 4), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([400, 360], g.toDomCoords(10, 1), epsilon);
    (0, _custom_asserts.assertDeepCloseTo)([400, 200], g.toDomCoords(10, 2), epsilon);
  });
  it('testChartLogarithmic_XAxis', function () {
    var opts = {
      rightGap: 0,
      valueRange: [1, 1000],
      dateWindow: [1, 1000],
      width: 400,
      height: 400,
      colors: ['#ff0000'],
      axes: {
        x: {
          drawGrid: false,
          drawAxis: false,
          logscale: true
        },
        y: {
          drawGrid: false,
          drawAxis: false
        }
      },
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, [[1, 1], [10, 10], [100, 100], [1000, 1000]], opts);
    var epsilon = 1e-8;
    assert.closeTo(1, g.toDataXCoord(0), epsilon);
    assert.closeTo(5.623413251903489, g.toDataXCoord(100), epsilon);
    assert.closeTo(31.62277660168378, g.toDataXCoord(200), epsilon);
    assert.closeTo(177.8279410038921, g.toDataXCoord(300), epsilon);
    assert.closeTo(1000, g.toDataXCoord(400), epsilon);
    assert.closeTo(0, g.toDomXCoord(1), epsilon);
    assert.closeTo(3.6036036036036037, g.toDomXCoord(10), epsilon);
    assert.closeTo(39.63963963963964, g.toDomXCoord(100), epsilon);
    assert.closeTo(400, g.toDomXCoord(1000), epsilon);
    assert.closeTo(0, g.toPercentXCoord(1), epsilon);
    assert.closeTo(0.3333333333, g.toPercentXCoord(10), epsilon);
    assert.closeTo(0.6666666666, g.toPercentXCoord(100), epsilon);
    assert.closeTo(1, g.toPercentXCoord(1000), epsilon);

    // Now zoom in and ensure that the methods return reasonable values.
    g.updateOptions({
      dateWindow: [10, 100]
    });
    assert.closeTo(10, g.toDataXCoord(0), epsilon);
    assert.closeTo(17.78279410038923, g.toDataXCoord(100), epsilon);
    assert.closeTo(31.62277660168379, g.toDataXCoord(200), epsilon);
    assert.closeTo(56.23413251903491, g.toDataXCoord(300), epsilon);
    assert.closeTo(100, g.toDataXCoord(400), epsilon);
    assert.closeTo(-40, g.toDomXCoord(1), epsilon);
    assert.closeTo(0, g.toDomXCoord(10), epsilon);
    assert.closeTo(400, g.toDomXCoord(100), epsilon);
    assert.closeTo(4400, g.toDomXCoord(1000), epsilon);
    assert.closeTo(-1, g.toPercentXCoord(1), epsilon);
    assert.closeTo(0, g.toPercentXCoord(10), epsilon);
    assert.closeTo(1, g.toPercentXCoord(100), epsilon);
    assert.closeTo(2, g.toPercentXCoord(1000), epsilon);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js","./CanvasAssertions":144,"./Proxy":147,"./custom_asserts":154}],196:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _dygraphTickers = require("../../src/dygraph-tickers");
var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
var _dygraphDefaultAttrs = _interopRequireDefault(require("../../src/dygraph-default-attrs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Test to check that years < 100 get the correct ticks.
 *
 * @author gmadrid@gmail.com (George Madrid)
 */

describe("two-digit-years", function () {
  it('testTwoDigitYears', function () {
    // A date with a one digit year: '9 AD'.
    var start = new Date(9, 2, 3);
    // A date with a two digit year: '11 AD'.
    var end = new Date(11, 3, 5);

    // Javascript will automatically add 1900 to our years if they are < 100.
    // Use setFullYear() to get the actual years we desire.
    start.setFullYear(9);
    end.setFullYear(11);
    var ticks = (0, _dygraphTickers.getDateAxis)(start, end, _dygraphTickers.Granularity.QUARTERLY, function (x) {
      return _dygraphDefaultAttrs["default"].axes['x'][x];
    });

    // This breaks in Firefox & Safari:
    // assert.deepEqual([{"v":-61875345600000,"label":"Apr 9"},{"v":-61867483200000,"label":"Jul 9"},{"v":-61859534400000,"label":"Oct 9"},{"v":-61851582000000,"label":"Jan 10"},{"v":-61843809600000,"label":"Apr 10"},{"v":-61835947200000,"label":"Jul 10"},{"v":-61827998400000,"label":"Oct 10"},{"v":-61820046000000,"label":"Jan 11"},{"v":-61812273600000,"label":"Apr 11"}], ticks);
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","../../src/dygraph-default-attrs":"dygraphs/src/dygraph-default-attrs.js","../../src/dygraph-tickers":"dygraphs/src/dygraph-tickers.js","../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],197:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Tests for the updateOptions function.
 * @author antrob@google.com (Anthony Robledo)
 * @license MIT
 */

describe("update-options", function () {
  cleanupAfterEach();
  var opts = {
    width: 480,
    height: 320
  };
  var data = "X,Y1,Y2\n" + "2011-01-01,2,3\n" + "2011-02-02,5,3\n" + "2011-03-03,6,1\n" + "2011-04-04,9,5\n" + "2011-05-05,8,3\n";

  /*
   * Tweaks the dygraph so it sets g._testDrawCalled to true when internal method
   * drawGraph_ is called. Call unWrapDrawGraph when done with this.
   */
  var wrapDrawGraph = function wrapDrawGraph(g) {
    g._testDrawCalled = false;
    g._oldDrawGraph = g.drawGraph_;
    g.drawGraph_ = function () {
      g._testDrawCalled = true;
      g._oldDrawGraph.call(g);
    };
  };

  /*
   * See wrapDrawGraph
   */
  var unwrapDrawGraph = function unwrapDrawGraph(g) {
    g.drawGraph_ = g._oldDrawGraph;
  };
  it('testStrokeAll', function () {
    var graphDiv = document.getElementById("graph");
    var graph = new _dygraph["default"](graphDiv, data, opts);
    var updatedOptions = {};
    updatedOptions['strokeWidth'] = 3;

    // These options will allow us to jump to renderGraph_()
    // drawGraph_() will be skipped.
    wrapDrawGraph(graph);
    graph.updateOptions(updatedOptions);
    unwrapDrawGraph(graph);
    assert.isFalse(graph._testDrawCalled);
  });
  it('testStrokeSingleSeries', function () {
    var graphDiv = document.getElementById("graph");
    var graph = new _dygraph["default"](graphDiv, data, opts);
    var updatedOptions = {};
    var optionsForY1 = {};
    optionsForY1['strokeWidth'] = 3;
    updatedOptions['series'] = {
      'Y1': optionsForY1
    };

    // These options will allow us to jump to renderGraph_()
    // drawGraph_() will be skipped.
    wrapDrawGraph(graph);
    graph.updateOptions(updatedOptions);
    unwrapDrawGraph(graph);
    assert.isFalse(graph._testDrawCalled);
  });
  it('testSingleSeriesRequiresNewPoints', function () {
    var graphDiv = document.getElementById("graph");
    var graph = new _dygraph["default"](graphDiv, data, opts);
    var updatedOptions = {
      series: {
        Y1: {
          strokeWidth: 2
        },
        Y2: {
          stepPlot: true
        }
      }
    };

    // These options will not allow us to jump to renderGraph_()
    // drawGraph_() must be called
    wrapDrawGraph(graph);
    graph.updateOptions(updatedOptions);
    unwrapDrawGraph(graph);
    assert.isTrue(graph._testDrawCalled);
  });
  it('testWidthChangeNeedsNewPoints', function () {
    var graphDiv = document.getElementById("graph");
    var graph = new _dygraph["default"](graphDiv, data, opts);
    var updatedOptions = {};

    // This will require new points.
    updatedOptions['width'] = 600;

    // These options will not allow us to jump to renderGraph_()
    // drawGraph_() must be called
    wrapDrawGraph(graph);
    graph.updateOptions(updatedOptions);
    unwrapDrawGraph(graph);
    assert.isTrue(graph._testDrawCalled);
  });

  // Test https://github.com/danvk/dygraphs/issues/87
  it('testUpdateLabelsDivDoesntInfiniteLoop', function () {
    var graphDiv = document.getElementById("graph");
    var labelsDiv = document.getElementById("labels");
    var graph = new _dygraph["default"](graphDiv, data, opts);
    graph.updateOptions({
      labelsDiv: labelsDiv
    });
  });

  // Test https://github.com/danvk/dygraphs/issues/247
  it('testUpdateColors', function () {
    var graphDiv = document.getElementById("graph");
    var graph = new _dygraph["default"](graphDiv, data, opts);
    var defaultColors = ["rgb(0,128,0)", "rgb(0,0,128)"];
    assert.deepEqual(["rgb(0,128,0)", "rgb(0,0,128)"], graph.getColors());
    var colors1 = ["#aaa", "#bbb"];
    graph.updateOptions({
      colors: colors1
    });
    assert.deepEqual(colors1, graph.getColors());

    // extra colors are ignored until you add additional data series.
    var colors2 = ["#ddd", "#eee", "#fff"];
    graph.updateOptions({
      colors: colors2
    });
    assert.deepEqual(["#ddd", "#eee"], graph.getColors());
    graph.updateOptions({
      file: "X,Y1,Y2,Y3\n" + "2011-01-01,2,3,4\n" + "2011-02-02,5,3,2\n"
    });
    assert.deepEqual(colors2, graph.getColors());
    graph.updateOptions({
      colors: null,
      file: data
    });
    assert.deepEqual(defaultColors, graph.getColors());
  });

  // Regression test for http://code.google.com/p/dygraphs/issues/detail?id=249
  // Verifies that setting 'legend: always' via update immediately shows the
  // legend.
  it('testUpdateLegendAlways', function () {
    var graphDiv = document.getElementById("graph");
    var graph = new _dygraph["default"](graphDiv, data, opts);
    var legend = document.getElementsByClassName("dygraph-legend");
    assert.equal(1, legend.length);
    legend = legend[0];
    assert.equal("", legend.innerHTML);
    graph.updateOptions({
      legend: 'always'
    });
    legend = document.getElementsByClassName("dygraph-legend");
    assert.equal(1, legend.length);
    legend = legend[0];
    assert.notEqual(-1, legend.textContent.indexOf("Y1"));
    assert.notEqual(-1, legend.textContent.indexOf("Y2"));
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js"}],198:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _DygraphOps = _interopRequireDefault(require("./DygraphOps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Regression test for a bug involving data update while panning.
 *
 * See https://stackoverflow.com/q/9528173/2171120
 *
 * @author dan@dygraphs.com (Dan Vanderkam)
 */

describe("update-while-panning", function () {
  cleanupAfterEach();

  // This tests the following sequence:
  // 1. Begin dragging a chart (x-panning)
  // 2. Do a data update (updateOptions({file: ...}))
  // 3. Verify that the y-axis is still well-defined.
  it('testUpdateWhilePanning', function () {
    var sinewave = function sinewave(start, limit, step) {
      var data = [];
      for (var x = start; x < limit; x += step) {
        data.push([x, Math.sin(x)]);
      }
      return data;
    };
    var opts = {
      width: 480,
      height: 320,
      valueRange: [-2, 2],
      labels: ['X', 'Y']
    };
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, sinewave(0, 6, 0.1), opts);
    assert.deepEqual([-2, 2], g.yAxisRange());

    // Start a pan, but don't finish it yet.
    _DygraphOps["default"].dispatchMouseDown_Point(g, 200, 100, {
      shiftKey: true
    });
    _DygraphOps["default"].dispatchMouseMove_Point(g, 100, 100, {
      shiftKey: true
    });
    assert.deepEqual([-2, 2], g.yAxisRange());

    // Now do a data update. y-axis should remain the same.
    g.updateOptions({
      file: sinewave(0, 7, 0.1)
    });
    assert.deepEqual([-2, 2], g.yAxisRange());

    // Keep the pan going.
    _DygraphOps["default"].dispatchMouseMove_Point(g, 50, 100, {
      shiftKey: true
    });
    assert.deepEqual([-2, 2], g.yAxisRange());

    // Now finish the pan.
    _DygraphOps["default"].dispatchMouseUp_Point(g, 100, 100, {
      shiftKey: true
    });
    assert.deepEqual([-2, 2], g.yAxisRange());
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./DygraphOps":145}],199:[function(require,module,exports){
"use strict";

var utils = _interopRequireWildcard(require("../../src/dygraph-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @fileoverview Tests for stand-alone functions in dygraph-utils.js
 *
 * @author danvdk@gmail.com (Dan Vanderkam)
 */

describe("utils-tests", function () {
  it('testUpdate', function () {
    var a = {
      a: 1,
      b: [1, 2, 3],
      c: {
        x: 1,
        y: 2
      },
      d: {
        f: 10,
        g: 20
      }
    };
    assert.equal(1, a['a']);
    assert.deepEqual([1, 2, 3], a['b']);
    assert.deepEqual({
      x: 1,
      y: 2
    }, a['c']);
    assert.deepEqual({
      f: 10,
      g: 20
    }, a['d']);
    utils.update(a, {
      c: {
        x: 2
      }
    });
    assert.deepEqual({
      x: 2
    }, a['c']);
    utils.update(a, {
      d: null
    });
    assert.equal(null, a['d']);
    utils.update(a, {
      a: 10,
      b: [1, 2]
    });
    assert.equal(10, a['a']);
    assert.deepEqual([1, 2], a['b']);
    assert.deepEqual({
      x: 2
    }, a['c']);
    assert.equal(null, a['d']);
  });
  it('testUpdateDeep', function () {
    var a = {
      a: 1,
      b: [1, 2, 3],
      c: {
        x: 1,
        y: 2
      },
      d: {
        f: 10,
        g: 20
      }
    };
    assert.equal(1, a['a']);
    assert.deepEqual([1, 2, 3], a['b']);
    assert.deepEqual({
      x: 1,
      y: 2
    }, a['c']);
    assert.deepEqual({
      f: 10,
      g: 20
    }, a['d']);
    utils.updateDeep(a, {
      c: {
        x: 2
      }
    });
    assert.deepEqual({
      x: 2,
      y: 2
    }, a['c']);
    utils.updateDeep(a, {
      d: null
    });
    assert.equal(null, a['d']);
    utils.updateDeep(a, {
      a: 10,
      b: [1, 2]
    });
    assert.equal(10, a['a']);
    assert.deepEqual([1, 2], a['b']);
    assert.deepEqual({
      x: 2,
      y: 2
    }, a['c']);
    assert.equal(null, a['d']);
  });
  it('testUpdateDeepDecoupled', function () {
    var a = {
      a: 1,
      b: [1, 2, 3],
      c: {
        x: "original",
        y: 2
      }
    };
    var b = {};
    utils.updateDeep(b, a);
    b.a = 2;
    assert.equal(1, a.a);
    b.b[0] = 2;
    assert.equal(1, a.b[0]);
    b.c.x = "new value";
    assert.equal("original", a.c.x);
  });
  it('testIterator_nopredicate', function () {
    var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var iter = utils.createIterator(array, 1, 4);
    assert.isTrue(iter.hasNext);
    assert.equal('b', iter.peek);
    assert.equal('b', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('c', iter.peek);
    assert.equal('c', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('d', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('e', iter.next());
    assert.isFalse(iter.hasNext);
  });
  it('testIterator_predicate', function () {
    var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var iter = utils.createIterator(array, 1, 4, function (array, idx) {
      return array[idx] !== 'd';
    });
    assert.isTrue(iter.hasNext);
    assert.equal('b', iter.peek);
    assert.equal('b', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('c', iter.peek);
    assert.equal('c', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('e', iter.next());
    assert.isFalse(iter.hasNext);
  });
  it('testIterator_empty', function () {
    var array = [];
    var iter = utils.createIterator([], 0, 0);
    assert.isFalse(iter.hasNext);
  });
  it('testIterator_outOfRange', function () {
    var array = ['a', 'b', 'c'];
    var iter = utils.createIterator(array, 1, 4, function (array, idx) {
      return array[idx] !== 'd';
    });
    assert.isTrue(iter.hasNext);
    assert.equal('b', iter.peek);
    assert.equal('b', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('c', iter.peek);
    assert.equal('c', iter.next());
    assert.isFalse(iter.hasNext);
  });

  // Makes sure full array is tested, and that the predicate isn't called
  // with invalid boundaries.
  it('testIterator_whole_array', function () {
    var array = ['a', 'b', 'c'];
    var iter = utils.createIterator(array, 0, array.length, function (array, idx) {
      if (idx < 0 || idx >= array.length) {
        throw "err";
      } else {
        return true;
      }
    });
    assert.isTrue(iter.hasNext);
    assert.equal('a', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('b', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('c', iter.next());
    assert.isFalse(iter.hasNext);
    assert.isNull(iter.next());
  });
  it('testIterator_no_args', function () {
    var array = ['a', 'b', 'c'];
    var iter = utils.createIterator(array);
    assert.isTrue(iter.hasNext);
    assert.equal('a', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('b', iter.next());
    assert.isTrue(iter.hasNext);
    assert.equal('c', iter.next());
    assert.isFalse(iter.hasNext);
    assert.isNull(iter.next());
  });
  it('testToRGB', function () {
    assert.deepEqual({
      r: 255,
      g: 200,
      b: 150
    }, utils.toRGB_('rgb(255,200,150)'));
    assert.deepEqual({
      r: 255,
      g: 200,
      b: 150
    }, utils.toRGB_('#FFC896'));
    assert.deepEqual({
      r: 255,
      g: 0,
      b: 0
    }, utils.toRGB_('red'));
    assert.deepEqual({
      r: 255,
      g: 200,
      b: 150,
      a: 0.6
    }, utils.toRGB_('rgba(255, 200, 150, 0.6)'));
  });
  it('testIsPixelChangingOptionList', function () {
    var isPx = utils.isPixelChangingOptionList;
    assert.isTrue(isPx([], {
      axes: {
        y: {
          digitsAfterDecimal: 3
        }
      }
    }));
    assert.isFalse(isPx([], {
      axes: {
        y: {
          axisLineColor: 'blue'
        }
      }
    }));
  });

  /*
  it('testDateSet', function() {
    var base = new Date(1383455100000);
    var d = new Date(base);
  
    // A one hour shift -- this is surprising behavior!
    d.setMilliseconds(10);
    assert.equal(3600010, d.getTime() - base.getTime());
  
    // setDateSameTZ compensates for this surprise.
    d = new Date(base);
    Dygraph.setDateSameTZ(d, {ms: 10});
    assert.equal(10, d.getTime() - base.getTime());
  });
  */
});

},{"../../src/dygraph-utils":"dygraphs/src/dygraph-utils.js"}],200:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _Util = _interopRequireDefault(require("./Util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests for the setVisibility function.
 * @author sergeyslepian@gmail.com
 */

describe("visibility", function () {
  cleanupAfterEach();

  /**
   * Does a bunch of the shared busywork of setting up a graph and changing its visibility.
   * @param {boolean} startingVisibility The starting visibility of all series on the graph
   * @param {*[]} setVisibilityArgs An array of arguments to be passed directly to setVisibility()
   * @returns {string} The output of Util.getLegend() called after the visibility is set
   */
  var getVisibleSeries = function getVisibleSeries(startingVisibility, setVisibilityArgs) {
    var opts = {
      width: 480,
      height: 320,
      labels: ['x', 'A', 'B', 'C', 'D', 'E'],
      legend: 'always',
      visibility: []
    };

    // set the starting visibility
    var numSeries = opts.labels.length - 1;
    for (var i = 0; i < numSeries; i++) {
      opts.visibility[i] = startingVisibility;
    }
    var data = [];
    for (var j = 0; j < 10; j++) {
      data.push([j, 1, 2, 3, 4, 5]);
    }
    var graph = document.getElementById("graph");
    var g = new _dygraph["default"](graph, data, opts);
    g.setVisibility.apply(g, setVisibilityArgs);
    return _Util["default"].getLegend();
  };
  it('testDefaultCases', function () {
    assert.equal(' A  B  C  D  E', getVisibleSeries(true, [[], true]));
    assert.equal('', getVisibleSeries(false, [[], true]));
  });
  it('testSingleSeriesHide', function () {
    assert.equal(' A  C  D  E', getVisibleSeries(true, [1, false]));
  });
  it('testSingleSeriesShow', function () {
    assert.equal(' E', getVisibleSeries(false, [4, true]));
  });
  it('testMultiSeriesHide', function () {
    assert.equal(' A  E', getVisibleSeries(true, [[1, 2, 3], false]));
  });
  it('testMultiSeriesShow', function () {
    assert.equal(' B  D', getVisibleSeries(false, [[1, 3], true]));
  });
  it('testObjectSeriesShowAndHide', function () {
    assert.equal(' B  D', getVisibleSeries(false, [{
      1: true,
      2: false,
      3: true
    }, null]));
  });
  it('testBooleanArraySeriesShowAndHide', function () {
    assert.equal(' B  D', getVisibleSeries(false, [[false, true, false, true], null]));
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./Util":148}],201:[function(require,module,exports){
"use strict";

var _dygraph = _interopRequireDefault(require("../../src/dygraph"));
var _Util = _interopRequireDefault(require("./Util"));
require("core-js/es/promise");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @fileoverview Tests involving issuing XHRs for data.
 *
 * Note that these tests must be run with an HTTP server.
 * XHRs can't be issued from file:/// URLs.
 * This can be done with
 *
 *     npm install http-server
 *     http-server -p 8081
 *     open http://localhost:8081/auto_tests/runner.html
 *
 */

function dygraphPromise(div, data, opts) {
  return new Promise(function (resolve, reject) {
    var g = new _dygraph["default"](div, data, opts);
    g.ready(function () {
      return resolve(g);
    });
  });
}
describe("xhr", function () {
  it('should issue XHRs for CSV data', function () {
    return dygraphPromise('graph', 'data/sample.csv').then(function (g) {
      assert.isNotNull(g);
      assert.equal(g.numRows(), 4);
      assert.equal(g.numColumns(), 3);
    });
  });
  it('should warn on out-of-order CSV data', function () {
    var calls = {};
    var restore = _Util["default"].captureConsole(calls);
    return dygraphPromise('graph', 'data/out-of-order.csv').then(function (g) {
      restore();
      assert.isNotNull(g);
      assert.equal(g.numRows(), 4);
      assert.equal(g.numColumns(), 3);
      assert.equal(calls.warn.length, 1);
      assert(/out of order/.exec(calls.warn[0]));
    }, function (e) {
      restore();
      return Promise.reject(e);
    });
  });
  it('should warn on out-of-order CSV data with dates', function () {
    var calls = {};
    var restore = _Util["default"].captureConsole(calls);
    return dygraphPromise('graph', 'data/out-of-order-dates.csv').then(function (g) {
      restore();
      assert.isNotNull(g);
      assert.equal(g.numRows(), 8);
      assert.equal(g.numColumns(), 5);
      assert.equal(calls.warn.length, 1);
      assert(/out of order/.exec(calls.warn[0]));
    }, function (e) {
      restore();
      return Promise.reject(e);
    });
  });
});

},{"../../src/dygraph":"dygraphs/src/dygraph.js","./Util":148,"core-js/es/promise":1}]},{},[144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201])