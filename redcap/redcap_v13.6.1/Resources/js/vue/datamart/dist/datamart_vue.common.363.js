((typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] = (typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] || []).push([[363],{

/***/ 7363:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ CreateRevision; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/CreateRevision.vue?vue&type=template&id=447b6394&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"create-revision-page"},[_c('section',{staticClass:"main"},[_c('RevisionManagerView',{attrs:{"hidden_groups":_vm.revision_hidden_groups},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('MappingHelperButton',{staticClass:"ml-auto"})]},proxy:true}])})],1),_c('section',{staticClass:"footer"},[_c('b-button',{attrs:{"variant":"secondary"},on:{"click":_vm.goBack}},[_c('span',[_c('font-awesome-icon',{attrs:{"icon":['fas', 'arrow-left'],"fixed-width":""}}),_c('span',{attrs:{"ss":"ms-2"}},[_vm._v("Back")])],1)]),_c('ResetButton'),_c('SubmitButton',{on:{"dismissed":_vm.onDismissed}})],1)])}
var staticRenderFns = []


// EXTERNAL MODULE: ./src/views/RevisionManagerView.vue + 19 modules
var RevisionManagerView = __webpack_require__(2825);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ResetButton.vue?vue&type=template&id=4ff224aa&scoped=true&
var ResetButtonvue_type_template_id_4ff224aa_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-button',{attrs:{"variant":"info","disabled":!_vm.isDirty},on:{"click":_vm.onClick}},[_c('span',[_c('font-awesome-icon',{attrs:{"icon":['fas', 'undo'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Reset")])],1)])}
var ResetButtonvue_type_template_id_4ff224aa_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ResetButton.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ResetButtonvue_type_script_lang_js_ = ({
  name: 'ResetButton',
  computed: {
    isDirty: function isDirty() {
      return this.$store.getters['revision/isDirty'];
    }
  },
  methods: {
    onClick: function onClick() {
      // use this check instead of :disabled to improve performances

      /* if(!this.isDirty) {
        alert('change at something before submitting')
        return 
      } */
      this.$store.dispatch('revision/reset');
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/ResetButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_ResetButtonvue_type_script_lang_js_ = (ResetButtonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/buttons/ResetButton.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  buttons_ResetButtonvue_type_script_lang_js_,
  ResetButtonvue_type_template_id_4ff224aa_scoped_true_render,
  ResetButtonvue_type_template_id_4ff224aa_scoped_true_staticRenderFns,
  false,
  null,
  "4ff224aa",
  null
  
)

/* harmony default export */ var ResetButton = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/SubmitButton.vue?vue&type=template&id=d572e2bc&scoped=true&
var SubmitButtonvue_type_template_id_d572e2bc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-button',{attrs:{"variant":"success","disabled":_vm.loading || !_vm.isValid || !_vm.isDirty},on:{"click":_vm.onClick}},[_c('span',[(_vm.loading)?_c('font-awesome-icon',{attrs:{"icon":['fas', 'spinner'],"spin":""}}):_c('font-awesome-icon',{attrs:{"icon":['fas', 'file-export'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Submit")])],1)])}
var SubmitButtonvue_type_template_id_d572e2bc_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(9103);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/SubmitButton.vue?vue&type=script&lang=js&



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
/* harmony default export */ var SubmitButtonvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      loading: false
    };
  },
  computed: {
    isDirty: function isDirty() {
      return this.$store.getters['revision/isDirty'];
    },
    isValid: function isValid() {
      var errors = this.$store.state.validator.errors;
      return Object.keys(errors).length == 0;
    }
  },
  methods: {
    onClick: function onClick() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var isValid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.$store.dispatch('revision/validate');

              case 3:
                isValid = _context.sent;

                if (isValid) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                // close the modal
                // this.$store.dispatch('modal/setOpen', false)
                _this.loading = true;
                _context.next = 9;
                return _this.$store.dispatch('revision/submit', _this.$API);

              case 9:
                _this.$bvToast.toast("Your revision has been submitted", {
                  title: 'Success',
                  autoHideDelay: 5000,
                  variant: 'success',
                  appendToast: true
                });

                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

                _this.$bvToast.toast("Error submitting your revision", {
                  title: 'Error',
                  autoHideDelay: 5000,
                  variant: 'danger',
                  appendToast: true
                });

              case 16:
                _context.prev = 16;
                _this.loading = false;
                return _context.finish(16);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12, 16, 19]]);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/SubmitButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_SubmitButtonvue_type_script_lang_js_ = (SubmitButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/buttons/SubmitButton.vue





/* normalize component */
;
var SubmitButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_SubmitButtonvue_type_script_lang_js_,
  SubmitButtonvue_type_template_id_d572e2bc_scoped_true_render,
  SubmitButtonvue_type_template_id_d572e2bc_scoped_true_staticRenderFns,
  false,
  null,
  "d572e2bc",
  null
  
)

/* harmony default export */ var SubmitButton = (SubmitButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/MappingHelperButton.vue?vue&type=template&id=2638eef4&scoped=true&
var MappingHelperButtonvue_type_template_id_2638eef4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-button',{attrs:{"variant":"info"},on:{"click":_vm.onClick}},[_c('span',[_c('font-awesome-icon',{attrs:{"icon":['fas', 'code-branch'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Use the Mapping Helper")])],1)])}
var MappingHelperButtonvue_type_template_id_2638eef4_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/MappingHelperButton.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
/* harmony default export */ var MappingHelperButtonvue_type_script_lang_js_ = ({
  name: 'mapping-helper-button',
  data: function data() {
    return {};
  },
  computed: {
    mapping_helper_url: function mapping_helper_url() {
      var mapping_helper_url = this.$store.state.settings.settings.mapping_helper_url;
      return mapping_helper_url;
    }
  },
  methods: {
    onClick: function onClick() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // location.href = this.mapping_helper_url
                window.open(_this.mapping_helper_url, '_self');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/MappingHelperButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_MappingHelperButtonvue_type_script_lang_js_ = (MappingHelperButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/buttons/MappingHelperButton.vue





/* normalize component */
;
var MappingHelperButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_MappingHelperButtonvue_type_script_lang_js_,
  MappingHelperButtonvue_type_template_id_2638eef4_scoped_true_render,
  MappingHelperButtonvue_type_template_id_2638eef4_scoped_true_staticRenderFns,
  false,
  null,
  "2638eef4",
  null
  
)

/* harmony default export */ var MappingHelperButton = (MappingHelperButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/CreateRevision.vue?vue&type=script&lang=js&
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
//
//
//




/* harmony default export */ var CreateRevisionvue_type_script_lang_js_ = ({
  name: 'CreateRevisionView',
  data: function data() {
    return {
      revision_hidden_groups: [RevisionManagerView/* settings_groups.MRNS */.q.MRNS] // nothing hidden!

    };
  },
  components: {
    RevisionManagerView: RevisionManagerView/* default */.Z,
    ResetButton: ResetButton,
    SubmitButton: SubmitButton,
    MappingHelperButton: MappingHelperButton
  },
  methods: {
    goBack: function goBack() {
      this.$router.push({
        name: 'home'
      });
    },
    onDismissed: function onDismissed() {
      this.goBack();
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/CreateRevision.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_CreateRevisionvue_type_script_lang_js_ = (CreateRevisionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/CreateRevision.vue?vue&type=style&index=0&id=447b6394&scoped=true&lang=css&
var CreateRevisionvue_type_style_index_0_id_447b6394_scoped_true_lang_css_ = __webpack_require__(2297);
;// CONCATENATED MODULE: ./src/pages/CreateRevision.vue?vue&type=style&index=0&id=447b6394&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/pages/CreateRevision.vue



;


/* normalize component */

var CreateRevision_component = (0,componentNormalizer/* default */.Z)(
  pages_CreateRevisionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "447b6394",
  null
  
)

/* harmony default export */ var CreateRevision = (CreateRevision_component.exports);

/***/ }),

/***/ 2542:
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
___CSS_LOADER_EXPORT___.push([module.id, ".footer[data-v-447b6394]{margin-top:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.footer *+*[data-v-447b6394]{margin-left:10px}@media only screen and (max-width:768px){.footer[data-v-447b6394]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.footer *+*[data-v-447b6394]{margin-left:0;margin-top:10px}}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2297:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2542);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("60478b9e", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);