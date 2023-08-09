"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] || []).push([[389],{

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

/***/ 389:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ DemographicsForm; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/DSTU2/DemographicsForm.vue?vue&type=template&id=43fd967c&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div');
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/endpoints/forms/BaseResourceForm.vue + 3 modules
var BaseResourceForm = __webpack_require__(3579);
// EXTERNAL MODULE: ./src/variables.js
var variables = __webpack_require__(8643);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/forms/DSTU2/DemographicsForm.vue?vue&type=script&lang=js&


/* harmony default export */ var DemographicsFormvue_type_script_lang_js_ = ({
  extends: BaseResourceForm/* default */.Z,
  data: function data() {
    return {
      fhir_category: variables/* fhir_categories.DEMOGRAPHICS */.yr.DEMOGRAPHICS //base URL for the FHIR resource
    };
  }
});
;// CONCATENATED MODULE: ./src/components/endpoints/forms/DSTU2/DemographicsForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var DSTU2_DemographicsFormvue_type_script_lang_js_ = (DemographicsFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/forms/DSTU2/DemographicsForm.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  DSTU2_DemographicsFormvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DemographicsForm = (component.exports);

/***/ })

}]);