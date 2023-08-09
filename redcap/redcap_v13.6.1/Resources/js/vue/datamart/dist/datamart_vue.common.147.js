((typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] = (typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] || []).push([[147],{

/***/ 9535:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

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

/***/ 2611:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ ImportRevisionButton; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ImportRevisionButton.vue?vue&type=template&id=b0f81e30&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-button',{attrs:{"variant":"outline"},on:{"click":_vm.importRevision}},[_c('span',[_c('font-awesome-icon',{attrs:{"icon":['fas', 'file-import'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Import Revision")])],1)])],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(9103);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(9601);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(1038);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ImportRevisionButton.vue?vue&type=script&lang=js&







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
/* harmony default export */ var ImportRevisionButtonvue_type_script_lang_js_ = ({
  computed: {
    userCanImportRevision: function userCanImportRevision() {
      var user = this.$store.state.user.info;
      if (!user) return false;
      var userIsAdmin = user.super_user,
          can_create_revision = user.can_create_revision;

      if (userIsAdmin) {
        return true;
      } else {
        return can_create_revision;
      }
    }
  },
  methods: {
    /**
     * show a file dialog box
     */
    importRevision: function importRevision() {
      var _this = this;

      var normalizeData = function normalizeData(data) {
        var revision = Object.assign({}, data);
        if (!Array.isArray(revision.fields)) revision.fields = [];
        if (!Array.isArray(revision.mrns)) revision.mrns = [];
        return revision;
      }; // create a file inout element and append it to the DOM


      var fileUpload = document.createElement('input');
      fileUpload.setAttribute('type', 'file'); // fileUpload.setAttribute('multiple', true)

      fileUpload.style.display = 'none';
      document.body.appendChild(fileUpload);
      fileUpload.addEventListener('change', /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var formData, _yield$_this$$API$dis, data, revision;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = new FormData();
                Array.from(fileUpload.files).forEach(function (file) {
                  formData.append('files[]', file);
                });
                _context.next = 4;
                return _this.$API.dispatch('revisions/importRevision', formData);

              case 4:
                _yield$_this$$API$dis = _context.sent;
                data = _yield$_this$$API$dis.data;
                revision = normalizeData(data);
                _context.next = 9;
                return _this.$store.dispatch('revision/set', revision);

              case 9:
                _this.$emit('import', data);

                if (!data) {
                  _this.$bvModal.msgBoxOk('The file you are trying to import could not be processed', {
                    title: 'Import error',
                    size: 'md',
                    buttonSize: 'sm',
                    headerClass: 'font-weight-bold',
                    okVariant: 'secondary'
                  });
                }

                fileUpload.remove();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
      fileUpload.click();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/ImportRevisionButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_ImportRevisionButtonvue_type_script_lang_js_ = (ImportRevisionButtonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/buttons/ImportRevisionButton.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  buttons_ImportRevisionButtonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "b0f81e30",
  null
  
)

/* harmony default export */ var ImportRevisionButton = (component.exports);

/***/ }),

/***/ 9147:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ CreateProject; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/CreateProject.vue?vue&type=template&id=50ad69da&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"create-project-page"},[_c('div',{staticClass:"buttons"},[_c('ImportRevisionButton')],1),_c('RevisionManagerView',{attrs:{"hidden_groups":_vm.revision_hidden_groups}}),_c('FormSettings')],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./src/components/FormSettings.vue + 3 modules
var FormSettings = __webpack_require__(9535);
// EXTERNAL MODULE: ./src/views/RevisionManagerView.vue + 19 modules
var RevisionManagerView = __webpack_require__(2825);
// EXTERNAL MODULE: ./src/components/buttons/ImportRevisionButton.vue + 3 modules
var ImportRevisionButton = __webpack_require__(2611);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/CreateProject.vue?vue&type=script&lang=js&
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
 * this page is used when a DataMart project is created
 * and the first revision must be inserted
 */

/**
 * this component will expose in a form the settings of the revision
 */



/* harmony default export */ var CreateProjectvue_type_script_lang_js_ = ({
  name: 'CreateProjectPage',
  data: function data() {
    return {
      revision_hidden_groups: [] // nothing hidden!

    };
  },
  components: {
    RevisionManagerView: RevisionManagerView/* default */.Z,
    ImportRevisionButton: ImportRevisionButton/* default */.Z,
    FormSettings: FormSettings/* default */.Z
  }
});
;// CONCATENATED MODULE: ./src/pages/CreateProject.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_CreateProjectvue_type_script_lang_js_ = (CreateProjectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/CreateProject.vue?vue&type=style&index=0&id=50ad69da&scoped=true&lang=css&
var CreateProjectvue_type_style_index_0_id_50ad69da_scoped_true_lang_css_ = __webpack_require__(7701);
;// CONCATENATED MODULE: ./src/pages/CreateProject.vue?vue&type=style&index=0&id=50ad69da&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/pages/CreateProject.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  pages_CreateProjectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "50ad69da",
  null
  
)

/* harmony default export */ var CreateProject = (component.exports);

/***/ }),

/***/ 1558:
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
___CSS_LOADER_EXPORT___.push([module.id, ".buttons[data-v-50ad69da]{text-align:right;margin-bottom:10px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7701:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1558);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("ad0fcc94", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);