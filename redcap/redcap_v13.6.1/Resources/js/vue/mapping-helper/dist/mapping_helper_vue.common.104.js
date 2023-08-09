"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkfhir_data_tool"] = (typeof self !== 'undefined' ? self : this)["webpackChunkfhir_data_tool"] || []).push([[104],{

/***/ 4104:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ObservationsForm; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/DSTU2/ObservationsForm.vue?vue&type=template&id=7b69b677&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-form-group', {
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
var BaseResourceForm = __webpack_require__(2502);
// EXTERNAL MODULE: ./src/variables.js
var variables = __webpack_require__(7297);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/DSTU2/ObservationsForm.vue?vue&type=script&lang=js&



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
;// CONCATENATED MODULE: ./src/components/endpoints/forms/DSTU2/ObservationsForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var DSTU2_ObservationsFormvue_type_script_lang_js_ = (ObservationsFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/forms/DSTU2/ObservationsForm.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  DSTU2_ObservationsFormvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ObservationsForm = (component.exports);

/***/ })

}]);