((typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] || []).push([[100],{

/***/ 8100:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ObservationsForm; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/R4/ObservationsForm.vue?vue&type=template&id=3e9aac81&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "observations-options"
  }, [_c('b-form-group', {
    attrs: {
      "label": "Category",
      "label-for": "category-input",
      "label-cols": "2"
    }
  }, [_c('b-form-select', {
    attrs: {
      "id": "category-input",
      "options": _vm.categories
    },
    model: {
      value: _vm.category,
      callback: function callback($$v) {
        _vm.category = $$v;
      },
      expression: "category"
    }
  })], 1)], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vuelidate/lib/validators/index.js
var validators = __webpack_require__(379);
// EXTERNAL MODULE: ./src/components/endpoints/forms/BaseResourceForm.vue + 3 modules
var BaseResourceForm = __webpack_require__(3579);
// EXTERNAL MODULE: ./src/variables.js
var variables = __webpack_require__(8643);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/R4/ObservationsForm.vue?vue&type=script&lang=js&



var categories = [{
  value: null,
  text: 'Please select an option',
  disabled: true
}, {
  value: 'laboratory',
  text: 'Laboratory'
}, {
  value: 'vital-signs',
  text: 'Vital Signs'
}, {
  value: 'social-history',
  text: 'Social History'
}, {
  value: 'core-characteristics',
  text: 'Core Characteristics'
}];
/* harmony default export */ var ObservationsFormvue_type_script_lang_js_ = ({
  extends: BaseResourceForm/* default */.Z,
  data: function data() {
    return {
      fhir_category: null,
      //base URL for the FHIR resource
      options: {},
      category: '',
      categories: categories
    };
  },
  methods: {
    setFhirCategory: function setFhirCategory(category) {
      switch (category) {
        case 'laboratory':
          this.fhir_category = variables/* fhir_categories.LABORATORY */.yr.LABORATORY;
          break;
        case 'vital-signs':
          this.fhir_category = variables/* fhir_categories.VITAL_SIGNS */.yr.VITAL_SIGNS;
          break;
        case 'social-history':
          this.fhir_category = variables/* fhir_categories.SOCIAL_HISTORY */.yr.SOCIAL_HISTORY;
          break;
        case 'core-characteristics':
          this.fhir_category = variables/* fhir_categories.CORE_CHARACTERISTICS */.yr.CORE_CHARACTERISTICS;
          break;
        default:
          this.fhir_category = null;
          break;
      }
    }
  },
  validations: function validations() {
    return {
      category: {
        required: validators/* required */.C1
      }
    };
  },
  watch: {
    category: {
      immediate: true,
      /**
       * update the FHIR category and the category option
       * whenever the category selection changes
       */
      handler: function handler() {
        var category = this.category;
        this.options.category = category;
        this.setFhirCategory(category);
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/endpoints/forms/R4/ObservationsForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var R4_ObservationsFormvue_type_script_lang_js_ = (ObservationsFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/R4/ObservationsForm.vue?vue&type=style&index=0&id=3e9aac81&prod&scoped=true&lang=css&
var ObservationsFormvue_type_style_index_0_id_3e9aac81_prod_scoped_true_lang_css_ = __webpack_require__(325);
;// CONCATENATED MODULE: ./src/components/endpoints/forms/R4/ObservationsForm.vue?vue&type=style&index=0&id=3e9aac81&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/forms/R4/ObservationsForm.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  R4_ObservationsFormvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3e9aac81",
  null
  
)

/* harmony default export */ var ObservationsForm = (component.exports);

/***/ }),

/***/ 8472:
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
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 325:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8472);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("107601a0", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);