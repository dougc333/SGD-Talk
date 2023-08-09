((typeof self !== 'undefined' ? self : this)["webpackChunkdatamart_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkdatamart_vue"] || []).push([[141],{

/***/ 9141:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Home; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Home.vue?vue&type=template&id=04324e4a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page-wrapper"},[(!_vm.userCanUseDatamart)?_c('div',{staticClass:"text-center"},[_c('h3',[_vm._v("You are not allowed to use the Data Mart.")]),_c('h5',[_vm._v("Please contact your administrator.")])]):_c('transition',{attrs:{"name":"fade"}},[_c('router-view')],1)],1)}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Home.vue?vue&type=script&lang=js&
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
/* harmony default export */ var Homevue_type_script_lang_js_ = ({
  name: 'HomePage',
  components: {},
  methods: {},
  computed: {
    userCanUseDatamart: function userCanUseDatamart() {
      var user = this.$store.state.user.info;
      if (!user) return false;
      var _user$can_use_datamar = user.can_use_datamart,
          can_use_datamart = _user$can_use_datamar === void 0 ? false : _user$can_use_datamar;
      return can_use_datamart;
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/Home.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Homevue_type_script_lang_js_ = (Homevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Home.vue?vue&type=style&index=0&id=04324e4a&scoped=true&lang=css&
var Homevue_type_style_index_0_id_04324e4a_scoped_true_lang_css_ = __webpack_require__(5722);
;// CONCATENATED MODULE: ./src/pages/Home.vue?vue&type=style&index=0&id=04324e4a&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/pages/Home.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  pages_Homevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "04324e4a",
  null
  
)

/* harmony default export */ var Home = (component.exports);

/***/ }),

/***/ 5436:
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
___CSS_LOADER_EXPORT___.push([module.id, ".fade-enter-active[data-v-04324e4a],.fade-leave-active[data-v-04324e4a]{-webkit-transition:opacity .2s;transition:opacity .2s}.fade-enter-active[data-v-04324e4a]{-webkit-transition-delay:.2s;transition-delay:.2s}.fade-enter[data-v-04324e4a],.fade-leave-to[data-v-04324e4a]{opacity:0}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5722:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5436);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("5fce87c2", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);