((typeof self !== 'undefined' ? self : this)["webpackChunkfhir_data_tool"] = (typeof self !== 'undefined' ? self : this)["webpackChunkfhir_data_tool"] || []).push([[732],{

/***/ 8732:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ResourceTable; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules
var objectSpread2 = __webpack_require__(1849);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ResourceTable.vue?vue&type=template&id=cabf33a4&scoped=true&

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-table', _vm._b({
    staticClass: "my-2",
    attrs: {
      "fields": _vm.fields
    },
    scopedSlots: _vm._u([{
      key: "cell()",
      fn: function fn(data) {
        return [_c('span', {
          domProps: {
            "innerHTML": _vm._s(_vm.$attrs.markText(data.value))
          }
        })];
      }
    }])
  }, 'b-table', (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, _vm.$attrs), _vm.$props), false))], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue?vue&type=template&id=cabf33a4&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(9225);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ResourceTable.vue?vue&type=script&lang=js&





/* harmony default export */ var ResourceTablevue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  computed: {
    fields: function fields() {
      var fields = this.setFields(this.items);
      return fields;
    }
  },
  methods: {
    /**
     * build a list of fields based on the
     * keys of the items.
     * set the `sortable` property for all
     */
    setFields: function setFields(items) {
      var duplicateChecker = []; //store keys here to check for duplicates
      var fields = (0,toConsumableArray/* default */.Z)(items).reduce(function (accumulator, item) {
        Object.keys(item).forEach(function (key) {
          if (duplicateChecker.indexOf(key) < 0) {
            var field = {
              key: key,
              sortable: true
            };
            accumulator.push(field);
            duplicateChecker.push(key);
          }
        });
        return accumulator;
      }, []);
      return fields;
    }
  },
  props: {
    stacked: {
      type: Boolean,
      defaults: false
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var tables_ResourceTablevue_type_script_lang_js_ = (ResourceTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ResourceTable.vue?vue&type=style&index=0&id=cabf33a4&prod&scoped=true&lang=css&
var ResourceTablevue_type_style_index_0_id_cabf33a4_prod_scoped_true_lang_css_ = __webpack_require__(1978);
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue?vue&type=style&index=0&id=cabf33a4&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  tables_ResourceTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "cabf33a4",
  null
  
)

/* harmony default export */ var ResourceTable = (component.exports);

/***/ }),

/***/ 4908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3481);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2400);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_vue_cli_service_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".icon[data-v-cabf33a4]{-webkit-transition-delay:0s;transition-delay:0s;-webkit-transition-duration:.1s;transition-duration:.1s;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transform:rotate(0);transform:rotate(0)}.stacked .icon[data-v-cabf33a4]{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1978:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4908);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("46d62986", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9225:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ _toConsumableArray; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(9914);
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
var unsupportedIterableToArray = __webpack_require__(6726);
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