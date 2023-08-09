((typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] || []).push([[211],{

/***/ 7211:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ AccessTokens; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/AccessTokens.vue?vue&type=template&id=8f78689a&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('AccessTokensTable'), _vm.standalone_launch_url ? _c('div', [_c('b-button', {
    attrs: {
      "href": _vm.standalone_launch_url,
      "variant": "primary",
      "size": "sm"
    }
  }, [_vm._v("Standalone launch")])], 1) : _vm._e()], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/AccessTokens/AccessTokensTable.vue?vue&type=template&id=51910242&scoped=true&
var AccessTokensTablevue_type_template_id_51910242_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-table', {
    staticClass: "access-tokens-table",
    attrs: {
      "striped": "",
      "bordered": "",
      "hover": "",
      "small": "",
      "fields": _vm.fields,
      "items": _vm.tokens
    },
    scopedSlots: _vm._u([{
      key: "cell(index)",
      fn: function fn(data) {
        return [_c('div', [_c('span', [_vm._v(_vm._s(data.index + 1))])])];
      }
    }, {
      key: "cell(access_token)",
      fn: function fn(data) {
        return [_c('div', {
          staticClass: "d-flex"
        }, [_c('b-button', {
          attrs: {
            "size": "sm"
          },
          on: {
            "click": function click($event) {
              return _vm.copyToClipboard(data.value, "".concat(data.field.label, " copied"));
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'copy']
          }
        })], 1), _c('span', {
          staticClass: "ms-2 cell-info"
        }, [_vm._v(_vm._s(data.value))])], 1)];
      }
    }, {
      key: "cell(refresh_token)",
      fn: function fn(data) {
        return [_c('div', {
          staticClass: "d-flex"
        }, [_c('b-button', {
          attrs: {
            "size": "sm"
          },
          on: {
            "click": function click($event) {
              return _vm.copyToClipboard(data.value, "".concat(data.field.label, " copied"));
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'copy']
          }
        })], 1), _c('span', {
          staticClass: "ms-2 cell-info"
        }, [_vm._v(_vm._s(data.value))])], 1)];
      }
    }, {
      key: "cell()",
      fn: function fn(data) {
        return [_c('span', {
          staticClass: "cell-info",
          attrs: {
            "title": data.value
          }
        }, [_vm._v(_vm._s(data.value))])];
      }
    }])
  })], 1);
};
var AccessTokensTablevue_type_template_id_51910242_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(5813);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3933);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(4819);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/AccessTokens/AccessTokensTable.vue?vue&type=script&lang=js&






/* harmony default export */ var AccessTokensTablevue_type_script_lang_js_ = ({
  computed: {
    tokens: function tokens() {
      return this.$store.state.user.tokens;
    },
    fields: function fields() {
      // extract all keys
      var keys = this.tokens.reduce(function (accumulator, token) {
        var keys = Object.keys(token);
        return [].concat((0,toConsumableArray/* default */.Z)(accumulator), keys);
      }, []);
      // keys.splice(0, 0, 'index')
      return keys;
    }
  },
  methods: {
    copyToClipboard: function copyToClipboard(text, message) {
      var _this = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/(0,regeneratorRuntime/* default */.Z)().mark(function _callee() {
        var result;
        return (0,regeneratorRuntime/* default */.Z)().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                message = message || 'text copied';
                _context.next = 3;
                return navigator.clipboard.writeText(text);
              case 3:
                result = _context.sent;
                _this.$bvToast.toast(message, {
                  title: 'Success',
                  toaster: 'b-toaster-top-right',
                  solid: false,
                  //translucent
                  autoHideDelay: 1500
                  // variant: 'light',
                });
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/AccessTokens/AccessTokensTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var AccessTokens_AccessTokensTablevue_type_script_lang_js_ = (AccessTokensTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/AccessTokens/AccessTokensTable.vue?vue&type=style&index=0&id=51910242&prod&scoped=true&lang=css&
var AccessTokensTablevue_type_style_index_0_id_51910242_prod_scoped_true_lang_css_ = __webpack_require__(9339);
;// CONCATENATED MODULE: ./src/components/AccessTokens/AccessTokensTable.vue?vue&type=style&index=0&id=51910242&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/AccessTokens/AccessTokensTable.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  AccessTokens_AccessTokensTablevue_type_script_lang_js_,
  AccessTokensTablevue_type_template_id_51910242_scoped_true_render,
  AccessTokensTablevue_type_template_id_51910242_scoped_true_staticRenderFns,
  false,
  null,
  "51910242",
  null
  
)

/* harmony default export */ var AccessTokensTable = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/AccessTokens.vue?vue&type=script&lang=js&

/* harmony default export */ var AccessTokensvue_type_script_lang_js_ = ({
  components: {
    AccessTokensTable: AccessTokensTable
  },
  computed: {
    standalone_launch_url: function standalone_launch_url() {
      return this.$store.state.app_settings.standalone_launch_url;
    },
    lang: function lang() {
      var lang = this.$store.state.app_settings.lang;
      return lang;
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/AccessTokens.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_AccessTokensvue_type_script_lang_js_ = (AccessTokensvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/pages/AccessTokens.vue





/* normalize component */
;
var AccessTokens_component = (0,componentNormalizer/* default */.Z)(
  pages_AccessTokensvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "8f78689a",
  null
  
)

/* harmony default export */ var AccessTokens = (AccessTokens_component.exports);

/***/ }),

/***/ 5596:
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
___CSS_LOADER_EXPORT___.push([module.id, ".access-tokens-table[data-v-51910242]{max-width:100%}.access-tokens-table[data-v-51910242] td .cell-info{overflow-x:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;max-width:100px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2222:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

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

/***/ 9339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5596);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("2e20911e", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4819:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

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