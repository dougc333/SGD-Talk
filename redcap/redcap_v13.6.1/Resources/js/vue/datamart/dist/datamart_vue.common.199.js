((typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] = (typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] || []).push([[199],{

/***/ 8199:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ HomeView; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/views/HomeView.vue?vue&type=template&id=0a467a67&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page"},[_c('div',{staticClass:"projhdr mb-2"},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'shopping-cart'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Clinical Data Mart")])],1),_vm._m(0),(_vm.revision)?_c('div',{staticClass:"top-container card mb-4"},[_vm._m(1),_c('div',{staticClass:"card-body py-2 px-3"},[_c('section',{staticClass:"buttons"},[_c('RevisionSelect'),_c('b-button-group',[_c('RunRevisionButton',{attrs:{"id":"run-revision-button"}}),_c('SelectMrnButton',{staticClass:"ms-2",attrs:{"id":"select-mrn-button"}})],1)],1),_vm._l((_vm.warnings),function(warning,index){return _c('InfoPanel',{key:index,attrs:{"summary":warning.summary,"description":warning.description,"type":warning.type}})})],2)]):_vm._e(),(_vm.revision && _vm.user)?_c('div',{staticClass:"details-container"},[_c('RevisionDetail',{attrs:{"revision":_vm.revision},scopedSlots:_vm._u([{key:"header",fn:function(){return undefined},proxy:true},{key:"footer",fn:function(){return [_c('section',{staticClass:"buttons"},[(_vm.user.isAdmin() && _vm.totalRevisions > 1)?_c('DeleteRevisionButton'):_vm._e(),(_vm.revision.canBeUsedByUserForNewRevision(_vm.user))?_c('CreateRevisionButton'):_vm._e(),(_vm.user.canApproveRevision(_vm.revision))?_c('ApproveRevisionButton'):_vm._e()],1)]},proxy:true}],null,false,2526346462)})],1):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"mb-2"},[_vm._v(" Listed below is the current Data Mart configuration for this project. If you have appropriate privileges, you may run the \"Fetch clinical data\" button to retrieve data from the EHR. When fetching, any existing patients will have new data added to their record in the project. If you have permission to create new revisions of the current Data Mart configuration, you will see a \"Request a configuration change\" button at the bottom of the page. When submitted, all configuration revisions must be approved by a REDCap administrator before taking effect in the project."),_c('br'),_vm._v(" If a revision contains a list of Medical Record Numbers, those not yet in the project will be created as new records as soon as the revision is approved. ")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('span',{staticClass:"title"},[_vm._v("Revision")])])}]


;// CONCATENATED MODULE: ./src/views/HomeView.vue?vue&type=template&id=0a467a67&scoped=true&

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InfoPanel.vue?vue&type=template&id=578298d8&scoped=true&
var InfoPanelvue_type_template_id_578298d8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"alert",class:_vm._type,attrs:{"role":"warning"}},[_c('span',{staticClass:"title",domProps:{"innerHTML":_vm._s(_vm.summary)}}),_c('div',{domProps:{"innerHTML":_vm._s(_vm.description)}})])}
var InfoPanelvue_type_template_id_578298d8_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(3356);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.freeze.js
var es_object_freeze = __webpack_require__(3371);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InfoPanel.vue?vue&type=script&lang=js&


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
var TYPES = Object.freeze({
  primary: 'alert-primary',
  secondary: 'alert-secondary',
  success: 'alert-success',
  danger: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
  light: 'alert-light',
  dark: 'alert-dark'
});
/* harmony default export */ var InfoPanelvue_type_script_lang_js_ = ({
  name: 'InfoPanel',
  data: function data() {
    return {
      types: (0,objectSpread2/* default */.Z)({}, TYPES)
    };
  },
  props: {
    summary: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    _type: function _type() {
      var type = this.types[this.type];
      if (type) return type;
      return this.types.info; // default to info
    }
  }
});
;// CONCATENATED MODULE: ./src/components/InfoPanel.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_InfoPanelvue_type_script_lang_js_ = (InfoPanelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InfoPanel.vue?vue&type=style&index=0&id=578298d8&scoped=true&lang=css&
var InfoPanelvue_type_style_index_0_id_578298d8_scoped_true_lang_css_ = __webpack_require__(1483);
;// CONCATENATED MODULE: ./src/components/InfoPanel.vue?vue&type=style&index=0&id=578298d8&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/InfoPanel.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_InfoPanelvue_type_script_lang_js_,
  InfoPanelvue_type_template_id_578298d8_scoped_true_render,
  InfoPanelvue_type_template_id_578298d8_scoped_true_staticRenderFns,
  false,
  null,
  "578298d8",
  null
  
)

/* harmony default export */ var InfoPanel = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionSelect.vue?vue&type=template&id=e3a2b3dc&scoped=true&
var RevisionSelectvue_type_template_id_e3a2b3dc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-dropdown',{staticClass:"m-0",attrs:{"id":"revision-selector1","variant":"secondary","disabled":!_vm.userIsAdmin,"no-caret":!_vm.userIsAdmin},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [(_vm.selected && _vm.selected.index)?_c('span',[_vm._v("Revision "+_vm._s(_vm.selected.index))]):_vm._e()]},proxy:true}])},[(_vm.userIsAdmin)?_vm._l((_vm.revisions),function(revision,index){return _c('b-dropdown-item-button',{key:index,class:{selected: _vm.isCurrent(revision), approved: revision.isApproved()},on:{"click":function($event){return _vm.onSelect(revision)}}},[_c('section',{staticClass:"info"},[_c('span',{staticClass:"badge badge-info me-1"},[_vm._v(_vm._s(revision.index))]),_c('span',[_vm._v("Revision date: "+_vm._s(revision.metadata.date))])]),_c('RevisionMetadataIcons',{staticClass:"metadata-icons d-inline ms-1",attrs:{"revision":revision}})],1)}):_vm._e()],2)],1)}
var RevisionSelectvue_type_template_id_e3a2b3dc_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./src/components/RevisionMetadataIcons.vue + 4 modules
var RevisionMetadataIcons = __webpack_require__(5079);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionSelect.vue?vue&type=script&lang=js&
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

/* harmony default export */ var RevisionSelectvue_type_script_lang_js_ = ({
  name: 'RevisionList',
  components: {
    RevisionMetadataIcons: RevisionMetadataIcons/* default */.Z
  },
  computed: {
    revisions: function revisions() {
      return this.$store.state.revisions.list;
    },
    selected: function selected() {
      return this.$store.getters['revisions/selected'];
    },
    isCurrent: function isCurrent() {
      var _this = this;

      return function (revision) {
        if (_this.selected == null) return false;

        try {
          return _this.selected.metadata.id == revision.metadata.id;
        } catch (error) {
          return false;
        } // selected.metadata.id==revision.metadata.id

      };
    },
    buttonText: function buttonText() {
      if (!this.userIsAdmin || this.revisions.length == 1) {
        if (this.selected) return "Revision ".concat(this.selected.index);else return 'no revisions';
      } else {
        if (this.selected) return "Revision ".concat(this.selected.index);else return 'Select a revision';
      }
    },

    /**
     * check if current user is a Super user.
     * A super user can approve revisions
     */
    userIsAdmin: function userIsAdmin() {
      var user = this.$store.state.user.info;
      if (!user) return false;
      var _user$super_user = user.super_user,
          super_user = _user$super_user === void 0 ? false : _user$super_user;
      return super_user;
    }
  },
  methods: {
    onSelect: function onSelect(revision) {
      var revision_id = revision.metadata.id;
      this.$store.dispatch('revisions/setSelected', revision_id);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RevisionSelect.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RevisionSelectvue_type_script_lang_js_ = (RevisionSelectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionSelect.vue?vue&type=style&index=0&id=e3a2b3dc&scoped=true&lang=css&
var RevisionSelectvue_type_style_index_0_id_e3a2b3dc_scoped_true_lang_css_ = __webpack_require__(3040);
;// CONCATENATED MODULE: ./src/components/RevisionSelect.vue?vue&type=style&index=0&id=e3a2b3dc&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/RevisionSelect.vue



;


/* normalize component */

var RevisionSelect_component = (0,componentNormalizer/* default */.Z)(
  components_RevisionSelectvue_type_script_lang_js_,
  RevisionSelectvue_type_template_id_e3a2b3dc_scoped_true_render,
  RevisionSelectvue_type_template_id_e3a2b3dc_scoped_true_staticRenderFns,
  false,
  null,
  "e3a2b3dc",
  null
  
)

/* harmony default export */ var RevisionSelect = (RevisionSelect_component.exports);
// EXTERNAL MODULE: ./src/components/RevisionDetail.vue + 53 modules
var RevisionDetail = __webpack_require__(1679);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/RunRevisionButton.vue?vue&type=template&id=2531ca5a&scoped=true&
var RunRevisionButtonvue_type_template_id_2531ca5a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-dropdown',{staticClass:"m-0",attrs:{"size":"","right":"","variant":"success","disabled":_vm.disabled},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('font-awesome-icon',{attrs:{"icon":['fas', 'cloud-download-alt']}}),_c('span',{staticClass:"ms-1"},[_vm._v("Fetch all records "),_c('span',{staticClass:"badge badge-light"},[_vm._v(_vm._s(_vm.totalMrns))])])]},proxy:true}])},[_c('b-dropdown-text',{attrs:{"id":"fetch-form"}},[_c('b-form-checkbox',{staticClass:"small",model:{value:(_vm.background),callback:function ($$v) {_vm.background=$$v},expression:"background"}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'cog']}}),_vm._v(" Fetch in a background process")],1),_c('b-form-checkbox',{staticClass:"small",attrs:{"disabled":!_vm.background},model:{value:(_vm.send_feedback),callback:function ($$v) {_vm.send_feedback=$$v},expression:"send_feedback"}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'envelope']}}),_vm._v(" Send me a message when completed")],1),_c('div',{staticClass:"text-end mt-2"},[_c('b-button',{attrs:{"variant":"primary","size":"sm"},on:{"click":_vm.onClick}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'check-circle']}}),_c('span',[_vm._v(" Confirm")])],1)],1)],1)],1),_c('b-modal',{ref:"modal-fetch",attrs:{"id":"modal-fetch","title":"Fetching Data","size":"md","no-stacking":"","no-close-on-esc":"","no-close-on-backdrop":"","hide-header-close":""},scopedSlots:_vm._u([{key:"modal-footer",fn:function(ref){
var ok = ref.ok;
return [_c('div',{staticClass:"ml-auto"},[(_vm.loading)?_c('b-button',{attrs:{"variant":"secondary","size":"sm"},on:{"click":_vm.cancelFetch}},[_vm._v("Cancel")]):_c('b-button',{attrs:{"variant":"primary","size":"sm"},on:{"click":ok}},[_vm._v("Ok")])],1)]}}])},[_c('RevisionFetchProgress',{ref:"fetch-progress",attrs:{"progress_total":_vm.totalMrns,"progress_value":_vm.totalProcessed,"mrn":_vm.currentMrn,"mrnsData":_vm.results}})],1)],1)}
var RunRevisionButtonvue_type_template_id_2531ca5a_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(5340);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(9103);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8655);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(9720);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.to-json.js
var web_url_to_json = __webpack_require__(3753);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionFetchProgress.vue?vue&type=template&id=5988d0d9&scoped=true&
var RevisionFetchProgressvue_type_template_id_5988d0d9_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.is_processing)?_c('div',[_c('div',[_c('p',{staticClass:"time"},[_vm._v("Elapsed time: "),_c('span',{staticClass:"stopwatch"},[_vm._v(_vm._s(_vm.fixed_time)+" ("+_vm._s(_vm.readable_time)+")")])]),_c('ProgressBar',{ref:"progress_bar",staticClass:"mb-2",attrs:{"value":_vm.progress_value,"total":_vm.progress_total}}),_c('p',[_c('span',[_vm._v("Processing "),_c('strong',[_vm._v(_vm._s(_vm.mrn))]),_vm._v(" - "+_vm._s(_vm.progress_value+1)+"/"+_vm._s(_vm.progress_total)+" ")]),_c('font-awesome-icon',{attrs:{"icon":['fas', 'spinner'],"spin":"","fixed-width":""}})],1)],1)]):_c('div',[_c('p',{staticClass:"time"},[_vm._v("The request took "+_vm._s(_vm.readable_time)+" ("+_vm._s(_vm.fixed_time)+" seconds)")]),_c('div',[(_vm.overall_stats_count==0)?_c('p',[_vm._v("Data across all patients was already up to date.")]):_c('p',{staticClass:"text-center"},[_vm._v("Here is a summary of the data pulled across all patients:")])])]),_c('transition',{attrs:{"name":"fade"}},[_c('Stats',{attrs:{"stats":_vm.fhir_stats}})],1),_c('transition',{attrs:{"name":"fade"}},[_c('FhirErrors',{staticClass:"errors-container",attrs:{"errors":_vm.fhir_errors}})],1)],1)}
var RevisionFetchProgressvue_type_template_id_5988d0d9_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(6004);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(9653);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__(6977);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(9714);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(381);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(7010);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(1897);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4471);
;// CONCATENATED MODULE: ./src/libraries/Stopwatch.js




var Stopwatch = /*#__PURE__*/function () {
  /**
   * wheter the stopwatch is running
   */
  function Stopwatch() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    (0,classCallCheck/* default */.Z)(this, Stopwatch);

    (0,defineProperty/* default */.Z)(this, "time_start", 0);

    (0,defineProperty/* default */.Z)(this, "time_end", 0);

    (0,defineProperty/* default */.Z)(this, "is_running", false);

    if (start) this.start();
  }

  (0,createClass/* default */.Z)(Stopwatch, [{
    key: "start",
    value: function start() {
      if (this.is_running) return;
      this.time_start = performance.now();
      this.is_running = true;
    }
    /**
     * stop the time and return the total
     */

  }, {
    key: "stop",
    value: function stop() {
      if (!this.is_running) return this.total;
      this.time_end = performance.now();
      this.is_running = false;
      return this.total;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.start = 0;
      this.end = 0;
    }
    /**
     * total time in milliseconds
     */

  }, {
    key: "total",
    get: function get() {
      if (this.is_running && this.time_start > 0) {
        var total = performance.now() - this.time_start;
        return total;
      } else {
        return this.time_end - this.time_start;
      }
    }
  }]);

  return Stopwatch;
}();

/* harmony default export */ var libraries_Stopwatch = (Stopwatch);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ProgressBar.vue?vue&type=template&id=5d336fb9&
var ProgressBarvue_type_template_id_5d336fb9_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress"},[_c('div',{staticClass:"progress-bar",style:({width: (_vm.width + "%")}),attrs:{"role":"progressbar","aria-valuenow":_vm.width,"aria-valuemin":0,"aria-valuemax":_vm.total}})])}
var ProgressBarvue_type_template_id_5d336fb9_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ProgressBar.vue?vue&type=script&lang=js&

//
//
//
//
//
//
/* harmony default export */ var ProgressBarvue_type_script_lang_js_ = ({
  name: 'ProgressBar',
  props: {
    total: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'green'
    }
  },
  computed: {
    width: function width() {
      if (this.total <= 0) return 0;
      return 100 / this.total * this.value;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/ProgressBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ProgressBarvue_type_script_lang_js_ = (ProgressBarvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/ProgressBar.vue





/* normalize component */
;
var ProgressBar_component = (0,componentNormalizer/* default */.Z)(
  components_ProgressBarvue_type_script_lang_js_,
  ProgressBarvue_type_template_id_5d336fb9_render,
  ProgressBarvue_type_template_id_5d336fb9_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ProgressBar = (ProgressBar_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Stats.vue?vue&type=template&id=7975282c&scoped=true&
var Statsvue_type_template_id_7975282c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.total>0)?_c('div',{staticClass:"stats text-start"},[(_vm.stats)?_c('table',{staticClass:"table table-bordered table-hover table-striped table-sm"},[_vm._m(0),_c('transition-group',{attrs:{"name":"list","tag":"tbody"}},_vm._l((_vm.animated_stats),function(total,category){return _c('tr',{key:("row-" + category),class:("resource-" + category),attrs:{"scope":"col"}},[_c('th',{attrs:{"scope":"row"}},[_vm._v(_vm._s(category))]),_c('td',{staticClass:"text-end count"},[_vm._v(_vm._s(total))])])}),0)],1):_vm._e()]):_c('div')}
var Statsvue_type_template_id_7975282c_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-light"},[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Data category")]),_c('th',{staticClass:"text-end",attrs:{"scope":"col"}},[_vm._v("Total")])])])}]


;// CONCATENATED MODULE: ./src/components/Stats.vue?vue&type=template&id=7975282c&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(9601);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(2479);
// EXTERNAL MODULE: ./node_modules/animejs/lib/anime.es.js
var anime_es = __webpack_require__(6030);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Stats.vue?vue&type=script&lang=js&


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

/* harmony default export */ var Statsvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      animated_stats: {}
    };
  },
  props: {
    stats: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  watch: {
    /**
     * watch the total to trigger the animation
     * NOTE: cannot watch the stats because it is an object
     * and would need a deep watcher to trigger the update
     * 
     * @see https://stackoverflow.com/a/49586158
     */
    total: function total() {
      var _this = this;

      var _loop = function _loop(resource_type) {
        if (isNaN(_this.animated_stats[resource_type])) {
          _this.$set(_this.animated_stats, resource_type, 0);
        }

        var animated_stats = Object.assign({}, _this.animated_stats);
        var anime_config = {
          targets: animated_stats,
          round: 1,
          easing: 'linear',
          update: function update() {
            _this.$set(_this.animated_stats, resource_type, animated_stats[resource_type]);
          },
          begin: function begin() {
            var animated_counter = document.querySelector("tr.resource-".concat(resource_type, " .count"));
            if (animated_counter) animated_counter.classList.add('animated');
          },
          complete: function complete() {
            var animated_counter = document.querySelector("tr.resource-".concat(resource_type, " .count"));
            if (animated_counter) animated_counter.classList.remove('animated');
          }
        };
        var current_count = animated_stats[resource_type];
        var new_value = _this.stats[resource_type];
        if (current_count == new_value) return "continue"; // ignore if nothing changed

        anime_config[resource_type] = new_value;
        (0,anime_es/* default */.Z)(anime_config);
      };

      for (var resource_type in this.stats) {
        var _ret = _loop(resource_type);

        if (_ret === "continue") continue;
      }
    }
  },
  computed: {
    total: function total() {
      var total = 0;

      for (var _i = 0, _Object$values = Object.values(this.stats); _i < _Object$values.length; _i++) {
        var count = _Object$values[_i];
        total += count;
      }

      return total;
    }
  },
  methods: {}
});
;// CONCATENATED MODULE: ./src/components/Stats.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Statsvue_type_script_lang_js_ = (Statsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Stats.vue?vue&type=style&index=0&id=7975282c&scoped=true&lang=css&
var Statsvue_type_style_index_0_id_7975282c_scoped_true_lang_css_ = __webpack_require__(9474);
;// CONCATENATED MODULE: ./src/components/Stats.vue?vue&type=style&index=0&id=7975282c&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/Stats.vue



;


/* normalize component */

var Stats_component = (0,componentNormalizer/* default */.Z)(
  components_Statsvue_type_script_lang_js_,
  Statsvue_type_template_id_7975282c_scoped_true_render,
  Statsvue_type_template_id_7975282c_scoped_true_staticRenderFns,
  false,
  null,
  "7975282c",
  null
  
)

/* harmony default export */ var Stats = (Stats_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirErrors.vue?vue&type=template&id=ee0c55ca&scoped=true&
var FhirErrorsvue_type_template_id_ee0c55ca_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.has_errors)?_c('div',{staticClass:"errors"},[_c('p',[_vm._v("Warning - the following errors occurred:")]),_c('b-table',{staticClass:"my-2",attrs:{"id":"errors-table","items":_vm.errors,"fields":_vm.fields,"per-page":_vm.perPage,"current-page":_vm.currentPage,"small":"","bordered":"","striped":"","hover":""},scopedSlots:_vm._u([{key:"cell(error)",fn:function(data){return [_c('section',{},[_c('span',[_vm._v(_vm._s(data.value.message))]),(data.value.detail)?_c('p',[_vm._v(_vm._s(data.value.detail.message)+" "),_c('span',[_vm._v("("+_vm._s(_vm.error.detail.code)+")")])]):_vm._e()])]}}],null,false,2308726468)}),(_vm.has_errors)?_c('b-pagination',{staticClass:"ms-0",attrs:{"total-rows":_vm.total,"per-page":_vm.perPage,"aria-controls":"errors-table","size":"sm"},model:{value:(_vm.currentPage),callback:function ($$v) {_vm.currentPage=$$v},expression:"currentPage"}}):_vm._e()],1):_c('div')}
var FhirErrorsvue_type_template_id_ee0c55ca_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirErrors.vue?vue&type=script&lang=js&
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
//
//
//
//
/* harmony default export */ var FhirErrorsvue_type_script_lang_js_ = ({
  name: 'FhirErrors',
  data: function data() {
    return {
      currentPage: 1,
      perPage: 10,
      fields: ['mrn', 'error']
    };
  },
  props: {
    errors: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    has_errors: function has_errors() {
      return this.errors.length > 0;
    },
    total: function total() {
      return this.errors.length;
    }
  },
  methods: {}
});
;// CONCATENATED MODULE: ./src/components/FhirErrors.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FhirErrorsvue_type_script_lang_js_ = (FhirErrorsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/FhirErrors.vue





/* normalize component */
;
var FhirErrors_component = (0,componentNormalizer/* default */.Z)(
  components_FhirErrorsvue_type_script_lang_js_,
  FhirErrorsvue_type_template_id_ee0c55ca_scoped_true_render,
  FhirErrorsvue_type_template_id_ee0c55ca_scoped_true_staticRenderFns,
  false,
  null,
  "ee0c55ca",
  null
  
)

/* harmony default export */ var FhirErrors = (FhirErrors_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionFetchProgress.vue?vue&type=script&lang=js&









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





/* harmony default export */ var RevisionFetchProgressvue_type_script_lang_js_ = ({
  name: '',
  components: {
    ProgressBar: ProgressBar,
    Stats: Stats,
    FhirErrors: FhirErrors
  },
  data: function data() {
    return {
      stopwatch: new libraries_Stopwatch(false),
      // create a stopwatch and start it
      time: 0.0,
      stopwatch_interval: null,
      fhir_errors: [],
      fhir_stats: {},
      overall_stats_count: 0 // overall count of the stats

    };
  },
  destroyed: function destroyed() {
    // clear interval if set
    this.clearInterval();
  },
  mounted: function mounted() {
    this.fhir_errors = [];
    this.startWatch();
  },
  props: {
    progress_value: {
      type: Number,
      default: 0
    },
    progress_total: {
      type: Number,
      default: 0
    },

    /**
     * the currently processed MRN
     */
    mrn: {
      type: String,
      default: ''
    },
    mrnsData: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    is_processing: function is_processing() {
      return this.progress_value < this.progress_total;
    },
    fixed_time: function fixed_time() {
      var seconds = this.time / 1000;
      return seconds.toFixed(2);
    },
    readable_time: function readable_time() {
      return moment_default().duration(this.time, 'milliseconds').humanize();
    },
    has_errors: function has_errors() {
      return Object.keys(this.fhir_errors).length > 0;
    }
  },
  watch: {
    /**
     * stop the watch when the process is complete
     */
    progress_value: function progress_value(value) {
      if (value >= this.progress_total) this.stopWatch();
    },

    /**
     * watch incoming data and process
     * the contained stats and errors
     */
    mrnsData: {
      immediate: true,
      deep: true,
      handler: function handler(results) {
        if (results.length < 1) return;

        var entry = (0,toConsumableArray/* default */.Z)(results).pop();

        var mrn = entry.mrn,
            data = entry.data;
        if (!mrn) return;
        this.addResults(mrn, data);
      }
    }
  },
  methods: {
    startWatch: function startWatch() {
      var _this = this;

      this.stopwatch.start();
      this.stopwatch_interval = setInterval(function () {
        _this.time = _this.stopwatch.total;
      }, 10);
    },
    stopWatch: function stopWatch() {
      this.stopwatch.stop();
      clearInterval();
    },
    clearInterval: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      if (this.stopwatch_interval) clearInterval(this.stopwatch_interval);
    }),
    addResults: function addResults(mrn, data) {
      var _this2 = this;

      var _data$errors = data.errors,
          errors = _data$errors === void 0 ? [] : _data$errors,
          _data$metadata$stats = data.metadata.stats,
          stats = _data$metadata$stats === void 0 ? [] : _data$metadata$stats; // manage stats

      for (var _i = 0, _Object$entries = Object.entries(stats); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
            resource_type = _Object$entries$_i[0],
            count = _Object$entries$_i[1];

        this.overall_stats_count += count; // increment the overall count
        // make sure the property we are going to increase is a number

        var total = this.fhir_stats[resource_type] || 0;
        this.$set(this.fhir_stats, resource_type, count + total);
      } // manage errors


      errors.forEach(function (error) {
        _this2.fhir_errors.push({
          mrn: mrn,
          error: error
        });
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RevisionFetchProgress.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RevisionFetchProgressvue_type_script_lang_js_ = (RevisionFetchProgressvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionFetchProgress.vue?vue&type=style&index=0&id=5988d0d9&scoped=true&lang=css&
var RevisionFetchProgressvue_type_style_index_0_id_5988d0d9_scoped_true_lang_css_ = __webpack_require__(1231);
;// CONCATENATED MODULE: ./src/components/RevisionFetchProgress.vue?vue&type=style&index=0&id=5988d0d9&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/RevisionFetchProgress.vue



;


/* normalize component */

var RevisionFetchProgress_component = (0,componentNormalizer/* default */.Z)(
  components_RevisionFetchProgressvue_type_script_lang_js_,
  RevisionFetchProgressvue_type_template_id_5988d0d9_scoped_true_render,
  RevisionFetchProgressvue_type_template_id_5988d0d9_scoped_true_staticRenderFns,
  false,
  null,
  "5988d0d9",
  null
  
)

/* harmony default export */ var RevisionFetchProgress = (RevisionFetchProgress_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/RunRevisionButton.vue?vue&type=script&lang=js&










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

var initial_data = {
  promise: null,
  abort: false,
  send_feedback: false,
  // send feedback to user when process is completed
  background: false,
  // start process in the background
  totalProcessed: 0,
  results: [] // collect responses from fetched data

};
/* harmony default export */ var RunRevisionButtonvue_type_script_lang_js_ = ({
  components: {
    RevisionFetchProgress: RevisionFetchProgress
  },
  data: function data() {
    return (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, initial_data), {}, {
      loading: false,
      next_mrn: null,
      currentMrn: null,
      abort: false // stops the fetch execution

    });
  },
  computed: {
    title: function title() {
      var totalMrns = this.totalMrns;
      var cardinality = totalMrns === 1 ? '' : 's';
      if (totalMrns < 1) return 'Data can not be fetched';
      return "Fetch data for ".concat(totalMrns, " record").concat(cardinality);
    },
    revision: function revision() {
      return this.$store.getters['revisions/selected'];
    },
    totalMrns: function totalMrns() {
      return this.revision.getTotalFetchableMrns();
    },
    disabled: function disabled() {
      try {
        if (!this.revision) return true;
        var active = this.$store.getters['revisions/isActive'](this.revision);
        var user = this.$store.state.user.info;
        return !active || !user.hasValidToken() || this.totalMrns < 1;
      } catch (error) {
        return true;
      }
    }
  },
  methods: {
    showProgress: function showProgress() {
      var modal = this.$refs['modal-fetch'];
      return modal.show();
    },
    resetData: function resetData() {
      for (var _i = 0, _Object$entries = Object.entries(initial_data); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        this[key] = value;
      }
    },

    /**
     * helper function used for debug
     */
    wait: function wait(milliseconds) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, milliseconds);
      });
    },
    cancelFetch: function cancelFetch() {
      this.abort = true; // set the flag that stops the loop
      // the promise returned from runRevision is altered to include a cancel token

      var cancel = this.promise.cancel;
      if (cancel) cancel('operation canceled by user');
      this.$refs['modal-fetch'].hide();
    },
    onClick: function onClick() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var mrn, options, revision_id, response, data, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.background) {
                  _context.next = 18;
                  break;
                }

                _context.prev = 1;
                mrn = null;
                options = {
                  background: _this.background,
                  send_feedback: _this.send_feedback
                };
                revision_id = _this.revision.metadata.id;
                _context.next = 7;
                return _this.$API.dispatch('revisions/runRevision', revision_id, mrn, options);

              case 7:
                response = _context.sent;
                data = response.data;
                message = data.message;

                _this.$bvModal.msgBoxOk(message, {
                  title: 'Success',
                  size: 'md',
                  buttonSize: 'sm',
                  headerClass: 'font-weight-bold',
                  bodyClass: 'text-break',
                  okVariant: 'secondary'
                });

                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);

                _this.showErrorModal(_context.t0);

              case 16:
                _context.next = 19;
                break;

              case 18:
                _this.fetchData();

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }))();
    },
    fetchData: function fetchData() {
      var _this2 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var revision_id, mrn, options, response, _response$data, data, _data$metadata, metadata;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                _this2.resetData();

                _this2.loading = true;
                revision_id = _this2.revision.metadata.id;
                _this2.next_mrn = null; //reset

                _this2.showProgress(); // revision_fetch_progress.progress_total = this.totalMrns // set the total in the progress bar component


              case 6:
                if (!_this2.abort) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("break", 22);

              case 8:
                //break the loop on abort
                mrn = _this2.next_mrn;
                _this2.currentMrn = mrn;
                options = {
                  background: _this2.background,
                  send_feedback: _this2.send_feedback
                };
                _this2.promise = _this2.$API.dispatch('revisions/runRevision', revision_id, mrn, options);
                _context2.next = 14;
                return _this2.promise;

              case 14:
                response = _context2.sent;
                _response$data = response.data, data = _response$data === void 0 ? {} : _response$data;

                if (!((0,esm_typeof/* default */.Z)(data) !== 'object')) {
                  _context2.next = 18;
                  break;
                }

                throw new Error("Malformed data received: '".concat(String(data), "'"));

              case 18:
                _data$metadata = data.metadata, metadata = _data$metadata === void 0 ? {} : _data$metadata;
                _this2.next_mrn = metadata.next_mrn;
                /**
                 * if no MRN is provided we will get no stats,
                 * just the next MRN to process (if available).
                 * The loop will keep on until a next_mrn is provided
                 * by the backend
                 */

                if (mrn) {
                  _this2.results.push({
                    mrn: mrn,
                    data: data
                  });

                  _this2.totalProcessed++;
                }

              case 21:
                if (_this2.next_mrn && !_this2.abort) {
                  _context2.next = 6;
                  break;
                }

              case 22:
                _context2.next = 29;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

                _this2.cancelFetch();

                _this2.showErrorModal(_context2.t0);

              case 29:
                _context2.prev = 29;

                _this2.reloadRevisions();

                _this2.loading = false;
                return _context2.finish(29);

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 24, 29, 33]]);
      }))();
    },
    showErrorModal: function showErrorModal(error) {
      var _errorMessage;

      var defaultErrorMessage = 'Unexpected error';
      var errorMessage = defaultErrorMessage;

      if ('response' in error) {
        var data = error.response.data;
        if ('message' in data) errorMessage = data.message;
      } else if ('toJSON' in error) {
        var _error$toJSON = error.toJSON(),
            message = _error$toJSON.message;

        if (message) errorMessage = message;
      }

      errorMessage = (_errorMessage = errorMessage) !== null && _errorMessage !== void 0 ? _errorMessage : defaultErrorMessage;
      this.$bvModal.msgBoxOk(errorMessage, {
        title: 'Error',
        size: 'md',
        buttonSize: 'sm',
        headerClass: 'font-weight-bold',
        bodyClass: 'text-break',
        okVariant: 'secondary'
      });
    },

    /**
     * reload the revisions
     */
    reloadRevisions: function reloadRevisions() {
      var _this3 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var response, revisions;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _this3.$API.dispatch('revisions/getRevisions');

              case 3:
                response = _context3.sent;
                revisions = response.data;

                _this3.$store.dispatch('revisions/setList', revisions);

                _this3.$store.dispatch('revisions/selectMostRecentRevision');

                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);

                _this3.$bvModal.msgBoxOk('error reloading the revisions', {
                  title: 'Error',
                  size: 'md',
                  buttonSize: 'sm',
                  headerClass: 'font-weight-bold',
                  okVariant: 'secondary'
                });

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }))();
    },

    /**
     * display a prompt before the process is started
     */
    prompt: function prompt(callback) {
      var _this4 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var options, message, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = {
                  title: 'Please Confirm'
                };
                message = "You are about to start the adjudication process.\n      Please be aware that your existing data could be overwritten in the process according to your mapping 'preselect' configuration.";
                _context4.next = 4;
                return _this4.$bvModal.msgBoxConfirm(message, options);

              case 4:
                response = _context4.sent;
                if (response && typeof callback === 'function') callback();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/RunRevisionButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_RunRevisionButtonvue_type_script_lang_js_ = (RunRevisionButtonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/RunRevisionButton.vue?vue&type=style&index=0&id=2531ca5a&scoped=true&lang=css&
var RunRevisionButtonvue_type_style_index_0_id_2531ca5a_scoped_true_lang_css_ = __webpack_require__(5722);
;// CONCATENATED MODULE: ./src/components/buttons/RunRevisionButton.vue?vue&type=style&index=0&id=2531ca5a&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/buttons/RunRevisionButton.vue



;


/* normalize component */

var RunRevisionButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_RunRevisionButtonvue_type_script_lang_js_,
  RunRevisionButtonvue_type_template_id_2531ca5a_scoped_true_render,
  RunRevisionButtonvue_type_template_id_2531ca5a_scoped_true_staticRenderFns,
  false,
  null,
  "2531ca5a",
  null
  
)

/* harmony default export */ var RunRevisionButton = (RunRevisionButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/SelectMrnButton.vue?vue&type=template&id=237bc814&scoped=true&
var SelectMrnButtonvue_type_template_id_237bc814_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-button',{directives:[{name:"b-toggle",rawName:"v-b-toggle.sidebar-search",modifiers:{"sidebar-search":true}}],attrs:{"variant":"info"}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'search']}}),_c('span',{staticClass:"ms-1"},[_vm._v("Select and fetch records...")])],1),_c('b-sidebar',{attrs:{"id":"sidebar-search","title":"Search MRN","right":"","shadow":"","lazy":"","width":"500px"}},[_c('div',{staticClass:"px-3 py-2"},[_c('p',[_vm._v("Search a fetchable MRN available in the project and fetch its data individually")]),_c('SearchMrns')],1)])],1)}
var SelectMrnButtonvue_type_template_id_237bc814_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SearchMrns.vue?vue&type=template&id=72f7b1dd&scoped=true&
var SearchMrnsvue_type_template_id_72f7b1dd_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-form-group',{staticClass:"mb-2 ml-auto",attrs:{"label-for":"filter-input","label-cols-sm":"0","label-align-sm":"left","label-size":"sm"}},[_c('b-input-group',{attrs:{"size":"sm"}},[_c('b-form-input',{attrs:{"id":"filter-input","type":"search","placeholder":"Type to Search","debounce":"300"},model:{value:(_vm.queryProxy),callback:function ($$v) {_vm.queryProxy=$$v},expression:"queryProxy"}}),_c('b-input-group-append',[_c('b-button',{attrs:{"disabled":!_vm.queryProxy},on:{"click":_vm.resetQuery}},[_vm._v("Clear")])],1)],1)],1),_c('section',[(_vm.hasItems)?_c('section',{staticClass:"d-flex align-items-center"},[_c('b-pagination',{staticClass:"my-auto",attrs:{"total-rows":_vm.total,"per-page":_vm.perPage,"aria-controls":"my-table","size":"sm"},model:{value:(_vm.currentPage),callback:function ($$v) {_vm.currentPage=$$v},expression:"currentPage"}}),_c('b-dropdown',{staticClass:"ml-auto",attrs:{"text":"Results per page","size":"sm"},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('span',[_vm._v("Results per page: "+_vm._s(_vm.perPage))])]},proxy:true}],null,false,1561094034)},[_vm._l((_vm.resultsPerPageOptions),function(perPageOption,index){return [_c('b-dropdown-item',{key:("per-page-" + index + "-" + perPageOption),attrs:{"active":perPageOption==_vm.perPage},on:{"click":function($event){return _vm.setPerPage(perPageOption)}}},[_vm._v(_vm._s(perPageOption))])]})],2)],1):_vm._e(),_c('b-table',{staticClass:"my-2",attrs:{"id":"my-table","items":_vm.items,"fields":_vm.fields,"small":"","bordered":"","striped":"","hover":"","empty-text":"nothing to show","show-empty":true},scopedSlots:_vm._u([{key:"head(select)",fn:function(data){return [_c('div',{staticClass:"d-flex"},[_c('b-form-checkbox',{attrs:{"indeterminate":_vm.indeterminate,"disabled":_vm.total==0,"switch":""},on:{"change":_vm.toggleAll},model:{value:(_vm.allSelected),callback:function ($$v) {_vm.allSelected=$$v},expression:"allSelected"}},[_c('span',[_vm._v(_vm._s(data.label))])])],1)]}},{key:"cell(select)",fn:function(data){return [_c('div',{staticClass:"select-wrapper"},[_c('b-form-checkbox',{attrs:{"value":data.item['mrn'],"switch":"","size":"lg"},model:{value:(_vm.queue),callback:function ($$v) {_vm.queue=$$v},expression:"queue"}})],1)]}},{key:"cell(mrn)",fn:function(data){return [_c('section',{staticClass:"d-flex justify-content-between mrn"},[_c('span',[_vm._v(_vm._s(data.value))])])]}}])})],1),_c('section',{staticClass:"mt-2"},[_c('b-button',{attrs:{"size":"sm","variant":"danger","disabled":_vm.totalToFetch==0},on:{"click":_vm.clearQueue}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'trash'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("clear queue")])],1),_c('b-button',{staticClass:"ms-2",attrs:{"size":"sm","variant":"success","disabled":_vm.disabled},on:{"click":_vm.fetchQueue}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'cloud-download-alt'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("fetch data")])],1),_c('span',{staticClass:"ms-2 text-muted"},[_vm._v("Total MRNs: "),_c('b',[_vm._v(_vm._s(this.queue.length))])]),_c('div',{staticClass:"queue-container"},[_c('b-table',{staticClass:"my-2",attrs:{"id":"queue-table","fields":['mrn'],"items":_vm.queueItems,"small":"","bordered":"","striped":"","hover":"","empty-text":"nothing to show","show-empty":true},scopedSlots:_vm._u([{key:"cell(mrn)",fn:function(data){return [_c('section',{staticClass:"d-flex justify-content-between mrn"},[_c('span',[_vm._v(_vm._s(data.value))]),_c('b-button',{attrs:{"size":"sm","variant":"danger"},on:{"click":function($event){return _vm.removeFromQueue(data.value)}}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'trash'],"fixed-width":""}})],1)],1)]}}])})],1)],1),_c('b-modal',{ref:"modal-fetch",attrs:{"id":"modal-fetch","title":"Fetching Data","size":"md","no-stacking":"","no-close-on-esc":"","no-close-on-backdrop":"","hide-header-close":""},scopedSlots:_vm._u([{key:"modal-footer",fn:function(ref){
var ok = ref.ok;
return [_c('div',{staticClass:"ml-auto"},[(_vm.loading)?_c('b-button',{attrs:{"variant":"secondary","size":"sm"},on:{"click":_vm.cancelFetch}},[_vm._v("Cancel")]):_c('b-button',{attrs:{"variant":"primary","size":"sm"},on:{"click":ok}},[_vm._v("Ok")])],1)]}}])},[_c('RevisionFetchProgress',{ref:"fetch-progress",attrs:{"progress_total":_vm.totalToFetch,"progress_value":_vm.totalProcessed,"mrn":_vm.currentMrn,"mrnsData":_vm.results}})],1)],1)}
var SearchMrnsvue_type_template_id_72f7b1dd_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(8545);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(3210);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(1249);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(561);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SearchMrns.vue?vue&type=script&lang=js&











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
//
//

var resultsPerPageOptions = [10, 25, 50, 100];
/* harmony default export */ var SearchMrnsvue_type_script_lang_js_ = ({
  components: {
    RevisionFetchProgress: RevisionFetchProgress
  },
  data: function data() {
    return {
      currentMrn: '',
      searching: false,
      loading: false,
      minimumQueryLength: 1,
      query: '',
      perPage: resultsPerPageOptions[0],
      currentPage: 1,
      items: [],
      // items in the table
      total: 0,
      fields: ['mrn', 'select'],
      // headers of the table
      totalProcessed: 0,
      // processed (fetched) items
      results: [],
      // collect fetched data
      queue: [],
      maxQueueSize: 10,
      resultsPerPageOptions: resultsPerPageOptions
    };
  },
  computed: {
    queryProxy: {
      get: function get() {
        return this.query;
      },
      set: function set(value) {
        if (value == '') return this.resetQuery();
        this.query = value;
        this.submitQuery();
      }
    },
    allSelected: {
      get: function get() {
        var _this = this;

        if (this.items.length == 0) return false;
        var allSelected = this.items.every(function (item) {
          var mrn = item.mrn;
          return _this.queue.indexOf(mrn) >= 0;
        });
        return allSelected;
      },
      set: function set() {} // do nothing

    },
    indeterminate: {
      get: function get() {
        var _this2 = this;

        if (this.queue.length == 0) return false;
        if (this.items.every(function (_ref) {
          var mrn = _ref.mrn;
          return _this2.queue.indexOf(mrn) < 0;
        })) return false;
        if (this.allSelected) return false;
        return true;
      },
      set: function set() {} // do nothing

    },
    totalToFetch: function totalToFetch() {
      return this.queue.length;
    },
    hasItems: function hasItems() {
      return this.items.length > 0;
    },
    searchDisabled: function searchDisabled() {
      return this.searching || String(this.query).trim().length < this.minimumQueryLength;
    },
    revision: function revision() {
      return this.$store.getters['revisions/selected'];
    },
    disabled: function disabled() {
      try {
        if (!this.revision) return true;
        if (this.queue.length < 1) return true;
        var active = this.$store.getters['revisions/isActive'](this.revision);
        var user = this.$store.state.user.info;
        return !active || !user.hasValidToken();
      } catch (error) {
        return true;
      }
    },

    /**
     * transform the queue items to be table compatible
     */
    queueItems: function queueItems() {
      return this.queue.map(function (mrn) {
        return {
          mrn: mrn
        };
      });
    }
  },
  methods: {
    setPerPage: function setPerPage(perPageOption) {
      this.perPage = perPageOption;
    },
    notify: function notify(title, message) {
      this.$bvToast.toast(message, {
        title: 'Search results',
        autoHideDelay: 1000,
        appendToast: true
      });
    },
    searchMrns: function searchMrns() {
      var _this3 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, start, limit, response, _response$data, _response$data$list, list, _response$data$total, total;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = String(_this3.query);

                if (!(query.trim().length < _this3.minimumQueryLength)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _context.prev = 3;
                _this3.searching = true;
                start = (_this3.currentPage - 1) * _this3.perPage;
                limit = _this3.perPage;
                _context.next = 9;
                return _this3.$API.dispatch('revisions/searchMrns', {
                  query: query,
                  start: start,
                  limit: limit
                });

              case 9:
                response = _context.sent;
                _response$data = response.data;
                _response$data = _response$data === void 0 ? {} : _response$data;
                _response$data$list = _response$data.list, list = _response$data$list === void 0 ? [] : _response$data$list, _response$data$total = _response$data.total, total = _response$data$total === void 0 ? 0 : _response$data$total;
                _this3.total = total;
                _this3.items = (0,toConsumableArray/* default */.Z)(list);
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](3);
                console.log(_context.t0);

              case 20:
                _context.prev = 20;
                _this3.searching = false;
                return _context.finish(20);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 17, 20, 23]]);
      }))();
    },

    /**
     * this is to have a consistent query in
     * pagination if the user updates the text without
     * performing a new search
     */
    submitQuery: function submitQuery() {
      var _this4 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var notificationTitle;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this4.currentPage = 1;
                _context2.next = 3;
                return _this4.searchMrns();

              case 3:
                notificationTitle = 'Search results';
                if (_this4.total === 0) _this4.notify(notificationTitle, "No results for '".concat(_this4.query, "'"));else _this4.notify(notificationTitle, "".concat(_this4.total, " match").concat(_this4.total === 1 ? '' : 'es', " found"));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    resetQuery: function resetQuery() {
      this.total = 0;
      this.query = '';
      this.items = [];
    },
    fetchQueue: function fetchQueue() {
      var _this5 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _iterator, _step, mrn;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this5.results = [];
                _this5.loading = true;
                _this5.totalProcessed = 0;
                _iterator = (0,createForOfIteratorHelper/* default */.Z)(_this5.queue);
                _context3.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 12;
                  break;
                }

                mrn = _step.value;
                _context3.next = 10;
                return _this5.fetchMrn(mrn);

              case 10:
                _context3.next = 6;
                break;

              case 12:
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](4);

                _iterator.e(_context3.t0);

              case 17:
                _context3.prev = 17;

                _iterator.f();

                return _context3.finish(17);

              case 20:
                _this5.loading = false;
                _this5.currentMrn = '';

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 14, 17, 20]]);
      }))();
    },
    fetchMrn: function fetchMrn(mrn) {
      var _this6 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var modal, revision_id, response, _response$data2, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                modal = _this6.$refs['modal-fetch'];
                modal.show();
                _this6.currentMrn = mrn;
                revision_id = _this6.revision.metadata.id;
                _this6.promise = _this6.$API.dispatch('revisions/runRevision', revision_id, mrn);
                _context4.next = 8;
                return _this6.promise;

              case 8:
                response = _context4.sent;
                _response$data2 = response.data, data = _response$data2 === void 0 ? {} : _response$data2;

                if (!((0,esm_typeof/* default */.Z)(data) !== 'object')) {
                  _context4.next = 12;
                  break;
                }

                throw new Error("Malformed data received: '".concat(String(data), "'"));

              case 12:
                _this6.results.push({
                  mrn: mrn,
                  data: data
                });

                _this6.totalProcessed++;
                _context4.next = 21;
                break;

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);

                _this6.cancelFetch();

                _this6.showErrorModal(_context4.t0);

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 16]]);
      }))();
    },
    cancelFetch: function cancelFetch() {
      // the promise returned from fetchMrn is altered to include a cancel token
      var cancel = this.promise.cancel;
      if (cancel) cancel('operation canceled by user');
      this.$refs['modal-fetch'].hide();
    },
    showErrorModal: function showErrorModal(response) {
      var responseText = response.responseText,
          _response$message = response.message,
          message = _response$message === void 0 ? 'Error fetching data' : _response$message; // get the error message from REDCap

      var errorMessage = responseText || message;
      this.$bvModal.msgBoxOk(errorMessage, {
        title: 'Error',
        size: 'md',
        buttonSize: 'sm',
        headerClass: 'font-weight-bold',
        bodyClass: 'text-break',
        okVariant: 'secondary'
      });
    },
    addToQueue: function addToQueue(value) {
      if (this.queue.indexOf(value) >= 0) return;

      if (this.queue.length >= this.maxQueueSize) {
        this.notify('Max queue size reached', "A maximum of ".concat(this.maxQueueSize, " values can be selected."));
        return;
      }

      this.queue.push(value);
    },
    removeFromQueue: function removeFromQueue(value) {
      var index = this.queue.indexOf(value);
      if (index < 0) return;
      this.queue.splice(index, 1);
    },
    clearQueue: function clearQueue() {
      this.queue = [];
    },
    queueExists: function queueExists(value) {
      return this.queue.indexOf(value) >= 0;
    },
    toggleAll: function toggleAll(checked) {
      var _this7 = this;

      var items = (0,toConsumableArray/* default */.Z)(this.items);

      if (checked) {
        items.forEach(function (_ref2) {
          var mrn = _ref2.mrn;

          var index = _this7.queue.indexOf(mrn);

          if (index >= 0) return;

          _this7.queue.push(mrn);
        });
      } else {
        items.forEach(function (_ref3) {
          var mrn = _ref3.mrn;

          var index = _this7.queue.indexOf(mrn);

          if (index < 0) return;

          _this7.queue.splice(index, 1);
        });
      }
    }
  },
  watch: {
    /**
     * perform a new search when page is changed
     */
    currentPage: {
      immediate: true,
      handler: function handler() {
        this.searchMrns();
      }
    },
    perPage: {
      immediate: true,
      handler: function handler(current, previous) {
        if (current == previous) return;
        this.searchMrns();
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/SearchMrns.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SearchMrnsvue_type_script_lang_js_ = (SearchMrnsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SearchMrns.vue?vue&type=style&index=0&id=72f7b1dd&scoped=true&lang=css&
var SearchMrnsvue_type_style_index_0_id_72f7b1dd_scoped_true_lang_css_ = __webpack_require__(6560);
;// CONCATENATED MODULE: ./src/components/SearchMrns.vue?vue&type=style&index=0&id=72f7b1dd&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/SearchMrns.vue



;


/* normalize component */

var SearchMrns_component = (0,componentNormalizer/* default */.Z)(
  components_SearchMrnsvue_type_script_lang_js_,
  SearchMrnsvue_type_template_id_72f7b1dd_scoped_true_render,
  SearchMrnsvue_type_template_id_72f7b1dd_scoped_true_staticRenderFns,
  false,
  null,
  "72f7b1dd",
  null
  
)

/* harmony default export */ var SearchMrns = (SearchMrns_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/SelectMrnButton.vue?vue&type=script&lang=js&
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

/* harmony default export */ var SelectMrnButtonvue_type_script_lang_js_ = ({
  components: {
    SearchMrns: SearchMrns
  },
  data: function data() {
    return {};
  },
  computed: {},
  methods: {}
});
;// CONCATENATED MODULE: ./src/components/buttons/SelectMrnButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_SelectMrnButtonvue_type_script_lang_js_ = (SelectMrnButtonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/SelectMrnButton.vue?vue&type=style&index=0&id=237bc814&scoped=true&lang=css&
var SelectMrnButtonvue_type_style_index_0_id_237bc814_scoped_true_lang_css_ = __webpack_require__(9044);
;// CONCATENATED MODULE: ./src/components/buttons/SelectMrnButton.vue?vue&type=style&index=0&id=237bc814&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/buttons/SelectMrnButton.vue



;


/* normalize component */

var SelectMrnButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_SelectMrnButtonvue_type_script_lang_js_,
  SelectMrnButtonvue_type_template_id_237bc814_scoped_true_render,
  SelectMrnButtonvue_type_template_id_237bc814_scoped_true_staticRenderFns,
  false,
  null,
  "237bc814",
  null
  
)

/* harmony default export */ var SelectMrnButton = (SelectMrnButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ApproveRevisionButton.vue?vue&type=template&id=5eb0dd9c&scoped=true&
var ApproveRevisionButtonvue_type_template_id_5eb0dd9c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-button',{attrs:{"variant":"success","disabled":_vm.loading},on:{"click":_vm.onClick}},[_c('span',[(_vm.loading)?_c('font-awesome-icon',{attrs:{"icon":['fas', 'spinner'],"spin":""}}):_c('font-awesome-icon',{attrs:{"icon":['fas', 'check-circle'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Approve")])],1)])}
var ApproveRevisionButtonvue_type_template_id_5eb0dd9c_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ApproveRevisionButton.vue?vue&type=script&lang=js&


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
/* harmony default export */ var ApproveRevisionButtonvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      loading: false
    };
  },
  methods: {
    onClick: function onClick() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var revision_id, responseText, responseJson, errors;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                revision_id = _this.$store.getters['revisions/selected'].metadata.id;
                _this.loading = true;
                _context.next = 5;
                return _this.$store.dispatch('revisions/approve', {
                  revision_id: revision_id,
                  vm: _this
                });

              case 5:
                _this.$bvToast.toast("The revision has been approved", {
                  title: 'Success',
                  autoHideDelay: 5000,
                  variant: 'success',
                  appendToast: true
                });

                _context.next = 15;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                responseText = _context.t0.responseText; // get the error message from REDCap

                responseJson = JSON.parse(responseText);
                errors = responseJson.errors;
                console.log(errors);

                _this.$bvModal.msgBoxOk('Error approving the revision', {
                  title: 'Error',
                  size: 'md',
                  buttonSize: 'sm',
                  headerClass: 'font-weight-bold',
                  okVariant: 'secondary'
                });

              case 15:
                _context.prev = 15;
                _this.loading = false;
                return _context.finish(15);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8, 15, 18]]);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/ApproveRevisionButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_ApproveRevisionButtonvue_type_script_lang_js_ = (ApproveRevisionButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/buttons/ApproveRevisionButton.vue





/* normalize component */
;
var ApproveRevisionButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_ApproveRevisionButtonvue_type_script_lang_js_,
  ApproveRevisionButtonvue_type_template_id_5eb0dd9c_scoped_true_render,
  ApproveRevisionButtonvue_type_template_id_5eb0dd9c_scoped_true_staticRenderFns,
  false,
  null,
  "5eb0dd9c",
  null
  
)

/* harmony default export */ var ApproveRevisionButton = (ApproveRevisionButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/CreateRevisionButton.vue?vue&type=template&id=01417804&scoped=true&
var CreateRevisionButtonvue_type_template_id_01417804_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-button',{attrs:{"variant":"info"},on:{"click":_vm.onClick}},[_c('span',[_c('font-awesome-icon',{attrs:{"icon":['fas', 'file-export'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Request a configuration change")])],1)])}
var CreateRevisionButtonvue_type_template_id_01417804_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/CreateRevisionButton.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
/* harmony default export */ var CreateRevisionButtonvue_type_script_lang_js_ = ({
  name: 'CreateRevisionButton',
  methods: {
    onClick: function onClick() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // disable MRNs on revision manager
                _this.$store.dispatch('revision/setAllowedSettings', {
                  mrns: false
                }); // reset values to selected revision on view creation


                _this.$store.dispatch('revision/reset'); // change route


                _this.$router.push({
                  name: 'create-revision'
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/CreateRevisionButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_CreateRevisionButtonvue_type_script_lang_js_ = (CreateRevisionButtonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/CreateRevisionButton.vue?vue&type=style&index=0&id=01417804&scoped=true&lang=css&
var CreateRevisionButtonvue_type_style_index_0_id_01417804_scoped_true_lang_css_ = __webpack_require__(1518);
;// CONCATENATED MODULE: ./src/components/buttons/CreateRevisionButton.vue?vue&type=style&index=0&id=01417804&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/buttons/CreateRevisionButton.vue



;


/* normalize component */

var CreateRevisionButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_CreateRevisionButtonvue_type_script_lang_js_,
  CreateRevisionButtonvue_type_template_id_01417804_scoped_true_render,
  CreateRevisionButtonvue_type_template_id_01417804_scoped_true_staticRenderFns,
  false,
  null,
  "01417804",
  null
  
)

/* harmony default export */ var CreateRevisionButton = (CreateRevisionButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/DeleteRevisionButton.vue?vue&type=template&id=84e2bc20&scoped=true&
var DeleteRevisionButtonvue_type_template_id_84e2bc20_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-button',{attrs:{"variant":"danger","disabled":_vm.loading},on:{"click":_vm.onClick}},[_c('span',[(_vm.loading)?_c('font-awesome-icon',{attrs:{"icon":['fas', 'spinner'],"spin":""}}):_c('font-awesome-icon',{attrs:{"icon":['fas', 'trash-alt'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Delete revision")])],1)])}
var DeleteRevisionButtonvue_type_template_id_84e2bc20_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/DeleteRevisionButton.vue?vue&type=script&lang=js&


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
/* harmony default export */ var DeleteRevisionButtonvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      loading: false
    };
  },
  methods: {
    deleteRevision: function deleteRevision() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var revision, revision_id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                revision = _this.$store.getters['revisions/selected'];
                revision_id = revision.metadata.id;
                _context.prev = 2;
                _this.loading = true;
                _context.next = 6;
                return _this.$store.dispatch('revisions/delete', {
                  revision_id: revision_id,
                  vm: _this
                });

              case 6:
                _this.$bvToast.toast("Your revision has been deleted", {
                  title: 'Success',
                  autoHideDelay: 5000,
                  variant: 'success',
                  appendToast: true
                });

                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);

                _this.$bvModal.msgBoxOk('Error deleting your revision', {
                  title: 'Error',
                  size: 'md',
                  buttonSize: 'sm',
                  headerClass: 'font-weight-bold',
                  okVariant: 'secondary'
                });

              case 13:
                _context.prev = 13;
                _this.loading = false;
                return _context.finish(13);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 9, 13, 16]]);
      }))();
    },
    onClick: function onClick() {
      var _this2 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // check revision before submitting
                _this2.$bvModal.msgBoxConfirm('Please confirm that you want to delete this revision.', {
                  title: 'Are you sure?',
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'danger',
                  okTitle: 'Delete',
                  cancelTitle: 'Cancel',
                  footerClass: 'p-2',
                  hideHeaderClose: false,
                  centered: true
                }).then(function (value) {
                  if (value) _this2.deleteRevision();
                }).catch(function (error) {
                  console.log(error);
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/DeleteRevisionButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_DeleteRevisionButtonvue_type_script_lang_js_ = (DeleteRevisionButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/buttons/DeleteRevisionButton.vue





/* normalize component */
;
var DeleteRevisionButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_DeleteRevisionButtonvue_type_script_lang_js_,
  DeleteRevisionButtonvue_type_template_id_84e2bc20_scoped_true_render,
  DeleteRevisionButtonvue_type_template_id_84e2bc20_scoped_true_staticRenderFns,
  false,
  null,
  "84e2bc20",
  null
  
)

/* harmony default export */ var DeleteRevisionButton = (DeleteRevisionButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/views/HomeView.vue?vue&type=script&lang=js&
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








/* return 'no records in the project'
return 'you do not have a valid access token'
return 'thi is not the active revision' */

/* harmony default export */ var HomeViewvue_type_script_lang_js_ = ({
  name: 'HomeView',
  data: function data() {
    return {
      test: ''
    };
  },
  components: {
    RevisionSelect: RevisionSelect,
    RevisionDetail: RevisionDetail/* default */.Z,
    RunRevisionButton: RunRevisionButton,
    SelectMrnButton: SelectMrnButton,
    ApproveRevisionButton: ApproveRevisionButton,
    CreateRevisionButton: CreateRevisionButton,
    DeleteRevisionButton: DeleteRevisionButton,
    InfoPanel: InfoPanel
  },
  computed: {
    revision: function revision() {
      return this.$store.getters['revisions/selected'];
    },
    user: function user() {
      return this.$store.state.user.info;
    },
    totalRevisions: function totalRevisions() {
      return this.$store.getters['revisions/total'];
    },
    warnings: function warnings() {
      this.$store.dispatch('warnings/checkAll');
      return this.$store.state.warnings.list;
    }
  }
});
;// CONCATENATED MODULE: ./src/views/HomeView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_HomeViewvue_type_script_lang_js_ = (HomeViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/views/HomeView.vue?vue&type=style&index=0&id=0a467a67&scoped=true&lang=css&
var HomeViewvue_type_style_index_0_id_0a467a67_scoped_true_lang_css_ = __webpack_require__(347);
;// CONCATENATED MODULE: ./src/views/HomeView.vue?vue&type=style&index=0&id=0a467a67&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/views/HomeView.vue



;


/* normalize component */

var HomeView_component = (0,componentNormalizer/* default */.Z)(
  views_HomeViewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "0a467a67",
  null
  
)

/* harmony default export */ var HomeView = (HomeView_component.exports);

/***/ }),

/***/ 8563:
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
___CSS_LOADER_EXPORT___.push([module.id, ".title[data-v-578298d8]{display:block;font-weight:700}.alert[data-v-578298d8]{border:1px solid transparent!important}.alert-warning[role=warning][data-v-578298d8]{color:#856404;background-color:#fff3cd;border-color:#ffeeba!important;padding:10px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4819:
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
___CSS_LOADER_EXPORT___.push([module.id, ".stopwatch[data-v-5988d0d9]{font-variant-numeric:tabular-nums}.time[data-v-5988d0d9]{font-weight:300}.errors-container[data-v-5988d0d9]{max-height:200px;overflow-y:scroll}.fade-enter[data-v-5988d0d9],.fade-leave-active[data-v-5988d0d9]{opacity:0}.fade-enter-active[data-v-5988d0d9],.fade-leave-active[data-v-5988d0d9]{-webkit-transition:opacity .3s ease-out;transition:opacity .3s ease-out}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3713:
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
___CSS_LOADER_EXPORT___.push([module.id, "#revision-selector1[data-v-e3a2b3dc] .selected .dropdown-item{font-weight:700}#revision-selector1[data-v-e3a2b3dc] .dropdown-item{display:-webkit-box;display:-ms-flexbox;display:flex;white-space:nowrap;padding:5px 5px;color:inherit;text-decoration:none;font-size:13px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}#revision-selector1[data-v-e3a2b3dc] .dropdown-item:hover{background-color:#f8f9fa}#revision-selector1[data-v-e3a2b3dc] .dropdown-item.selected{font-weight:700}#revision-selector1[data-v-e3a2b3dc] .dropdown-item .info{margin-right:auto}#revision-selector1[data-v-e3a2b3dc] .dropdown-item .metadata-icons{margin-left:3px;padding-left:3px;border-left:1px solid #cacaca;display:inline-block;min-width:13px}@media only screen and (max-width:768px){nav.menu .submenu[data-v-e3a2b3dc]{width:100%}}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5205:
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
___CSS_LOADER_EXPORT___.push([module.id, ".queue-container[data-v-72f7b1dd]{max-height:400px;overflow-y:auto}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7093:
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
___CSS_LOADER_EXPORT___.push([module.id, ".stats[data-v-7975282c]{font-size:13px}thead th[data-v-7975282c]{font-weight:700}.count[data-v-7975282c]{font-weight:300;-webkit-transform-origin:right;transform-origin:right;-webkit-transition:font-weight .3s;transition:font-weight .3s}.count.animated[data-v-7975282c]{font-weight:700}.list-enter-active[data-v-7975282c],.list-leave-active[data-v-7975282c]{-webkit-transition:all 1s;transition:all 1s}.list-enter[data-v-7975282c],.list-leave-to[data-v-7975282c]{opacity:0}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5055:
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
___CSS_LOADER_EXPORT___.push([module.id, "section[data-v-01417804]{display:inline-block}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4171:
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
___CSS_LOADER_EXPORT___.push([module.id, "button[data-v-2531ca5a]{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.15s;transition-duration:.15s;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;opacity:1}#fetch-form[data-v-2531ca5a]{max-width:80vw}#fetch-form[data-v-2531ca5a] label{white-space:nowrap}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5080:
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
___CSS_LOADER_EXPORT___.push([module.id, "button[data-v-237bc814]{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.15s;transition-duration:.15s;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;opacity:1}#fetch-form[data-v-237bc814]{max-width:80vw}#fetch-form[data-v-237bc814] label{white-space:nowrap}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8673:
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
___CSS_LOADER_EXPORT___.push([module.id, ".top-container .card-header .title[data-v-0a467a67]{font-size:1.2em;font-weight:700}.top-container .buttons[data-v-0a467a67]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.top-container .buttons+*[data-v-0a467a67]{margin-top:20px}.details-container .buttons[data-v-0a467a67]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-top:10px}.details-container .buttons *+*[data-v-0a467a67]{margin-left:10px}.card section[data-v-0a467a67]:not(:first-child){margin-top:20px}.my_alert[data-v-0a467a67]{position:relative;padding:.375rem .75rem;border-radius:.25rem;border:1px solid transparent;font-size:.875rem;line-height:1.5;font-weight:400}@media only screen and (max-width:768px){.top-container .buttons[data-v-0a467a67]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-top:10px}.top-container .buttons *+*[data-v-0a467a67]{margin-left:0;margin-top:10px}.details-container .buttons[data-v-0a467a67]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-top:10px}.details-container .buttons *+*[data-v-0a467a67]{margin-left:0;margin-top:10px}}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1483:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8563);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("5728f4b1", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 1231:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4819);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("4958d8e7", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 3040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3713);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("990c8b46", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 6560:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5205);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("50d75289", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9474:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7093);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("3cf98b5b", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 1518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5055);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("591d9d81", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 5722:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4171);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("21c0ac66", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9044:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5080);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("cf7a3e3c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 347:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8673);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("132bb6b4", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);