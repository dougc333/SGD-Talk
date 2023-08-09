"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] || []).push([[51],{

/***/ 3579:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ BaseResourceForm; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/BaseResourceForm.vue?vue&type=template&id=0f9297b0&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._t("aside")], 2);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./src/variables.js
var variables = __webpack_require__(8643);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/BaseResourceForm.vue?vue&type=script&lang=js&

/* harmony default export */ var BaseResourceFormvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      fhir_category: null,
      //base URL for the FHIR resource
      options: {}
      /* fields: [
        {
          key: 'last_name',
          sortable: true
        },
        {
          key: 'first_name',
          sortable: false
        },
        {
          key: 'age',
          label: 'Person age',
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: 'danger'
        }
      ], */
    };
  },

  methods: {
    getParams: function getParams() {
      var fhir_category = this.fhir_category;
      var options = this.options;
      return {
        fhir_category: fhir_category,
        options: options
      };
    },
    isValid: function isValid() {}
  },
  watch: {
    $v: {
      immediate: true,
      handler: function handler(value) {
        this.$emit('validation_changed', value);
      }
    }
  },
  validations: function validations() {
    return {};
  }
});
;// CONCATENATED MODULE: ./src/components/endpoints/forms/BaseResourceForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var forms_BaseResourceFormvue_type_script_lang_js_ = (BaseResourceFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/forms/BaseResourceForm.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  forms_BaseResourceFormvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BaseResourceForm = (component.exports);

/***/ }),

/***/ 6051:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ AllergyIntoleranceForm; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/DSTU2/AllergyIntoleranceForm.vue?vue&type=template&id=4d9dd9ec&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div');
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(4819);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(9600);
// EXTERNAL MODULE: ./src/components/endpoints/forms/BaseResourceForm.vue + 3 modules
var BaseResourceForm = __webpack_require__(3579);
// EXTERNAL MODULE: ./src/variables.js
var variables = __webpack_require__(8643);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/DSTU2/AllergyIntoleranceForm.vue?vue&type=script&lang=js&





var status_options = [{
  text: 'active',
  value: 'active'
}, {
  text: 'inactive',
  value: 'inactive'
}, {
  text: 'resolved',
  value: 'resolved'
}];
/* harmony default export */ var AllergyIntoleranceFormvue_type_script_lang_js_ = ({
  extends: BaseResourceForm/* default */.Z,
  data: function data() {
    return {
      fhir_category: variables/* fhir_categories.ALLERGY_INTOLERANCE */.yr.ALLERGY_INTOLERANCE,
      //base URL for the FHIR resource
      options: {},
      selected: [],
      // Must be an array reference!
      status_options: [].concat(status_options)
    };
  },
  watch: {
    selected: {
      immediate: true,
      /**
       * update the status whenever the
       * status_options are changed
       */
      handler: function handler() {
        var selected = (0,toConsumableArray/* default */.Z)(this.selected);
        if (selected.length < 1) {
          delete this.options['clinical-status'];
        } else {
          this.options['clinical-status'] = selected.join(',');
        }
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/endpoints/forms/DSTU2/AllergyIntoleranceForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var DSTU2_AllergyIntoleranceFormvue_type_script_lang_js_ = (AllergyIntoleranceFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/forms/DSTU2/AllergyIntoleranceForm.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  DSTU2_AllergyIntoleranceFormvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AllergyIntoleranceForm = (component.exports);

/***/ }),

/***/ 2222:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var isArray = __webpack_require__(3157);
var isObject = __webpack_require__(111);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var doesNotExceedSafeInteger = __webpack_require__(7207);
var createProperty = __webpack_require__(6135);
var arraySpeciesCreate = __webpack_require__(5417);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 9600:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(2109);
var uncurryThis = __webpack_require__(1702);
var IndexedObject = __webpack_require__(8361);
var toIndexedObject = __webpack_require__(5656);
var arrayMethodIsStrict = __webpack_require__(2133);

var nativeJoin = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 4819:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ _toConsumableArray; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(6698);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,arrayLikeToArray/* default */.Z)(arr);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(2526);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(1817);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(2165);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(1038);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js








function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(3641);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(1703);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || (0,unsupportedIterableToArray/* default */.Z)(arr) || _nonIterableSpread();
}

/***/ })

}]);