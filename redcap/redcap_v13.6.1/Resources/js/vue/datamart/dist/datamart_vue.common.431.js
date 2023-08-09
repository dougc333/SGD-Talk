"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] = (typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] || []).push([[431],{

/***/ 9535:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ FormSettings; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FormSettings.vue?vue&type=template&id=5a74f15b&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.settings)?_c('div',[_c('section',{staticClass:"metadata"},[_c('input',{attrs:{"type":"hidden","name":"datamart[request_id]"},domProps:{"value":_vm.settings.request_id}}),_c('input',{attrs:{"type":"hidden","name":"datamart[user_id]"},domProps:{"value":_vm.settings.user_id}})]),_c('section',{staticClass:"daterange"},[_c('input',{attrs:{"type":"hidden","name":"datamart[daterange][min]"},domProps:{"value":_vm.settings.dateMin}}),_c('input',{attrs:{"type":"hidden","name":"datamart[daterange][max]"},domProps:{"value":_vm.settings.dateMax}})]),_c('section',{staticClass:"mrns"},_vm._l((_vm.settings.mrns),function(field,key){return _c('input',{key:key,attrs:{"type":"hidden","name":"datamart[mrns][]"},domProps:{"value":field}})}),0),_c('section',{staticClass:"fields"},_vm._l((_vm.settings.fields),function(field,key){return _c('input',{key:key,attrs:{"type":"hidden","name":"datamart[fields][]"},domProps:{"value":field}})}),0)]):_vm._e()}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FormSettings.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * these hidden input fields are used by the
 * createModule and the reviewModule in
 * the ToDoList page
 */
/* harmony default export */ var FormSettingsvue_type_script_lang_js_ = ({
  name: 'FormSettings',
  computed: {
    settings: function settings() {
      var settings = this.$store.getters['settings'];
      return settings;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/FormSettings.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FormSettingsvue_type_script_lang_js_ = (FormSettingsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/FormSettings.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  components_FormSettingsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "5a74f15b",
  null
  
)

/* harmony default export */ var FormSettings = (component.exports);

/***/ }),

/***/ 6431:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ReviewProject; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/ReviewProject.vue?vue&type=template&id=20d1a338&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"review-revision-page"},[(_vm.revision)?_c('main',[_c('RevisionDetail',{attrs:{"revision":_vm.revision},scopedSlots:_vm._u([{key:"footer",fn:function(){return undefined},proxy:true}],null,false,1163335532)})],1):_vm._e(),_c('FormSettings')],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./src/components/RevisionDetail.vue + 53 modules
var RevisionDetail = __webpack_require__(1679);
// EXTERNAL MODULE: ./src/components/FormSettings.vue + 3 modules
var FormSettings = __webpack_require__(9535);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/ReviewProject.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/**
 * this component will expose in a form the settings of the revision
 */


/* harmony default export */ var ReviewProjectvue_type_script_lang_js_ = ({
  name: 'ReviewModule',
  components: {
    RevisionDetail: RevisionDetail/* default */.Z,
    FormSettings: FormSettings/* default */.Z
  },
  computed: {
    revision: function revision() {
      return this.$store.getters['revisions/selected'];
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/ReviewProject.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_ReviewProjectvue_type_script_lang_js_ = (ReviewProjectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/pages/ReviewProject.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  pages_ReviewProjectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "20d1a338",
  null
  
)

/* harmony default export */ var ReviewProject = (component.exports);

/***/ })

}]);