((typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] = (typeof self !== 'undefined' ? self : this)["webpackChunkdatamart"] || []).push([[679],{

/***/ 1679:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ RevisionDetail; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionDetail.vue?vue&type=template&id=2ed78e38&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.revision)?_c('section',{staticClass:"card detail"},[_c('div',{staticClass:"card-header"},[_c('header',[_c('RevisionMetadata',{attrs:{"revision":_vm.revision}}),_c('RevisionImportExport',{staticClass:"revision-import-export"}),_vm._t("header")],2)]),_c('div',{staticClass:"card-body"},[_c('main',[_c('section',[_c('h5',{staticClass:"card-title"},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'calendar-week'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Range of time from which to pull data")])],1),_c('DateRangeInfo',{attrs:{"min":_vm.revision.dateMin,"max":_vm.revision.dateMax}})],1),_c('section',[_c('h5',{staticClass:"card-title"},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'tasks'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Fields in EHR for which to pull data")])],1),_c('MappedFhirResourcesPanel')],1),(_vm.showMrns)?_c('section',{staticClass:"revisions"},[_c('h5',{staticClass:"card-title"},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'clipboard-list'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Medical record numbers of patients in EHR for which to create records on revision approval")])],1),_c('MRNList',{attrs:{"list":_vm.revision.mrns}})],1):_vm._e()]),_c('footer',[_vm._t("footer")],2)])]):_vm._e()}
var staticRenderFns = []


// EXTERNAL MODULE: ./src/libraries/utils.js
var utils = __webpack_require__(7380);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionImportExport.vue?vue&type=template&id=0a8aec96&scoped=true&
var RevisionImportExportvue_type_template_id_0a8aec96_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrapper"},[_c('b-dropdown',{staticClass:"m-0",attrs:{"variant":"outline","right":"","no-caret":true},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('font-awesome-icon',{attrs:{"icon":['fas', 'cog'],"fixed-width":""}})]},proxy:true}])},[_c('b-dropdown-item',[_c('ExportRevisionButton',{staticClass:"export"})],1),_c('b-dropdown-item',[_c('ImportRevisionButton',{staticClass:"import",on:{"import":_vm.onImport}})],1)],1)],1)}
var RevisionImportExportvue_type_template_id_0a8aec96_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./src/components/buttons/ImportRevisionButton.vue + 3 modules
var ImportRevisionButton = __webpack_require__(2611);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ExportRevisionButton.vue?vue&type=template&id=a3058a1e&scoped=true&
var ExportRevisionButtonvue_type_template_id_a3058a1e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-button',{attrs:{"variant":"outline"},on:{"click":_vm.showRevisionExportModal}},[_c('span',[_c('font-awesome-icon',{attrs:{"icon":['fas', 'file-export'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Export Revision")])],1)]),_c('b-modal',{ref:"modal-export",attrs:{"id":"modal-export","title":"Export settings","size":"md","no-stacking":""},scopedSlots:_vm._u([{key:"modal-footer",fn:function(ref){
var ok = ref.ok;
return [_c('div',{staticClass:"ml-auto"},[_c('b-button',{attrs:{"variant":"primary","size":"sm","disabled":!_vm.valid},on:{"click":_vm.exportSettings}},[_vm._v("Export")]),_c('b-button',{staticClass:"ms-2",attrs:{"variant":"secondary","size":"sm"},on:{"click":ok}},[_vm._v("Cancel")])],1)]}}])},[_c('RevisionExportSettings',{ref:"export-settings",attrs:{"revision":_vm.revision},scopedSlots:_vm._u([{key:"default",fn:function(slotData){return [_c('div',{attrs:{"slot-valid":_vm.valid=slotData.valid}})]}}])})],1)],1)}
var ExportRevisionButtonvue_type_template_id_a3058a1e_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(9103);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionExportSettings.vue?vue&type=template&id=75fce768&scoped=true&
var RevisionExportSettingsvue_type_template_id_75fce768_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"card group columns-settings"},[_c('h6',{staticClass:"card-header"},[_vm._v("Columns")]),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"line"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.dates),expression:"dates"}],attrs:{"type":"checkbox","name":"dates","value":"true","id":"export_dates"},domProps:{"checked":Array.isArray(_vm.dates)?_vm._i(_vm.dates,"true")>-1:(_vm.dates)},on:{"change":function($event){var $$a=_vm.dates,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v="true",$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.dates=$$a.concat([$$v]))}else{$$i>-1&&(_vm.dates=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.dates=$$c}}}}),_c('label',{attrs:{"for":"export_dates"}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'calendar-week'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Date range")])],1)]),_c('div',{staticClass:"line"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fields),expression:"fields"}],attrs:{"type":"checkbox","name":"fields","value":"true","id":"export_fields"},domProps:{"checked":Array.isArray(_vm.fields)?_vm._i(_vm.fields,"true")>-1:(_vm.fields)},on:{"change":function($event){var $$a=_vm.fields,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v="true",$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.fields=$$a.concat([$$v]))}else{$$i>-1&&(_vm.fields=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.fields=$$c}}}}),_c('label',{attrs:{"for":"export_fields"}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'tasks'],"fixed-width":""}}),_c('span',{staticClass:"ms-2"},[_vm._v("Fields")])],1)])])]),_c('div',{staticClass:"card group format-settings"},[_c('h6',{staticClass:"card-header"},[_vm._v("Format:")]),_c('div',{staticClass:"card-body"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_format),expression:"selected_format"}],attrs:{"name":"format","id":"export_format"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected_format=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{"value":"","disabled":""}},[_vm._v("choose a format")]),_vm._l((_vm.formats),function(format,index){return _c('option',{key:index,domProps:{"value":format,"textContent":_vm._s(format)}})})],2),(_vm.selected_format==='csv')?_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.csv_delimiter),expression:"csv_delimiter"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.csv_delimiter=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{"value":","}},[_vm._v(", (comma)")]),_c('option',{attrs:{"value":"tab"}},[_vm._v("\\t (tab)")]),_c('option',{attrs:{"value":";"}},[_vm._v("; (semi-colon)")]),_c('option',{attrs:{"value":"|"}},[_vm._v("| (pipe)")]),_c('option',{attrs:{"value":"^"}},[_vm._v("^ (caret)")])]):_vm._e()])]),_vm._t("default",null,{"valid":_vm.valid})],2)}
var RevisionExportSettingsvue_type_template_id_75fce768_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionExportSettings.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
 * helper function to get the fields to export
 */
var getFields = function getFields(_ref) {
  var fields = _ref.fields,
      dates = _ref.dates;
  var keys = [];
  if (fields) keys.push('fields');
  if (dates) keys.push('dateMin', 'dateMax');
  return keys;
};

/* harmony default export */ var RevisionExportSettingsvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      fields: false,
      dates: false,
      formats: ['csv', 'json'],
      selected_format: 'csv',
      csv_delimiter: ','
    };
  },
  props: {
    revision: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    valid: function valid() {
      return (this.fields || this.dates) === true;
    },
    settings: function settings() {
      var settings = function (_ref2) {
        var fields = _ref2.fields,
            dates = _ref2.dates,
            format = _ref2.selected_format;
        return {
          fields: fields,
          dates: dates,
          format: format
        };
      }(this.$data);

      if (settings.format === 'csv') {
        settings.csv_delimiter = this.csv_delimiter;
        if (settings.csv_delimiter == 'tab') settings.csv_delimiter = '\t';
      }

      return settings;
    }
  },
  watch: {
    settings: function settings() {
      this.$emit('update', this.settings);
    }
  },
  methods: {
    validate: function validate() {
      return (this.fields || this.dates) === true;
    },
    exportRevision: function exportRevision() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$settings, format, _this$settings$csv_de, csv_delimiter, revision_id, fields, exportURL, anchor, fileName;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$settings = _this.settings, format = _this$settings.format, _this$settings$csv_de = _this$settings.csv_delimiter, csv_delimiter = _this$settings$csv_de === void 0 ? ',' : _this$settings$csv_de;
                revision_id = _this.revision.getID();
                fields = getFields(_this.settings);
                exportURL = _this.$API.getExportURL({
                  revision_id: revision_id,
                  fields: fields,
                  format: format,
                  csv_delimiter: csv_delimiter
                });
                anchor = document.createElement('a');
                fileName = "datamart_revision_".concat(revision_id, ".").concat(format);
                anchor.setAttribute("download", fileName);
                anchor.setAttribute("target", '_SELF');
                anchor.setAttribute("href", exportURL);
                anchor.innerText = 'download'; // temporarily add the anchor to the DOM, click and remove it

                document.body.appendChild(anchor); // required for firefox

                anchor.click();
                anchor.remove();

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RevisionExportSettings.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RevisionExportSettingsvue_type_script_lang_js_ = (RevisionExportSettingsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionExportSettings.vue?vue&type=style&index=0&id=75fce768&scoped=true&lang=css&
var RevisionExportSettingsvue_type_style_index_0_id_75fce768_scoped_true_lang_css_ = __webpack_require__(6499);
;// CONCATENATED MODULE: ./src/components/RevisionExportSettings.vue?vue&type=style&index=0&id=75fce768&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/RevisionExportSettings.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_RevisionExportSettingsvue_type_script_lang_js_,
  RevisionExportSettingsvue_type_template_id_75fce768_scoped_true_render,
  RevisionExportSettingsvue_type_template_id_75fce768_scoped_true_staticRenderFns,
  false,
  null,
  "75fce768",
  null
  
)

/* harmony default export */ var RevisionExportSettings = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/buttons/ExportRevisionButton.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ExportRevisionButtonvue_type_script_lang_js_ = ({
  components: {
    RevisionExportSettings: RevisionExportSettings
  },
  data: function data() {
    return {
      valid: false
    };
  },
  computed: {
    revision: function revision() {
      return this.$store.getters['revisions/selected'];
    }
  },
  methods: {
    /**
     * export the active revision as a JSON file
     */
    showRevisionExportModal: function showRevisionExportModal() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var modal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                modal = _this.$refs['modal-export'];
                if (modal) modal.show();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    exportSettings: function exportSettings() {
      var component = this.$refs['export-settings'];
      if (!component) return;
      component.exportRevision();
      var modal = this.$refs['modal-export'];
      if (modal) modal.hide();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/buttons/ExportRevisionButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_ExportRevisionButtonvue_type_script_lang_js_ = (ExportRevisionButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/buttons/ExportRevisionButton.vue





/* normalize component */
;
var ExportRevisionButton_component = (0,componentNormalizer/* default */.Z)(
  buttons_ExportRevisionButtonvue_type_script_lang_js_,
  ExportRevisionButtonvue_type_template_id_a3058a1e_scoped_true_render,
  ExportRevisionButtonvue_type_template_id_a3058a1e_scoped_true_staticRenderFns,
  false,
  null,
  "a3058a1e",
  null
  
)

/* harmony default export */ var ExportRevisionButton = (ExportRevisionButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionImportExport.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var RevisionImportExportvue_type_script_lang_js_ = ({
  name: 'RevisionImportExport',
  components: {
    ImportRevisionButton: ImportRevisionButton/* default */.Z,
    ExportRevisionButton: ExportRevisionButton
  },
  methods: {
    onImport: function onImport(data) {
      if (data) {
        this.$router.push({
          name: 'create-revision'
        });
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RevisionImportExport.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RevisionImportExportvue_type_script_lang_js_ = (RevisionImportExportvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionImportExport.vue?vue&type=style&index=0&lang=css&
var RevisionImportExportvue_type_style_index_0_lang_css_ = __webpack_require__(8194);
;// CONCATENATED MODULE: ./src/components/RevisionImportExport.vue?vue&type=style&index=0&lang=css&

;// CONCATENATED MODULE: ./src/components/RevisionImportExport.vue



;


/* normalize component */

var RevisionImportExport_component = (0,componentNormalizer/* default */.Z)(
  components_RevisionImportExportvue_type_script_lang_js_,
  RevisionImportExportvue_type_template_id_0a8aec96_scoped_true_render,
  RevisionImportExportvue_type_template_id_0a8aec96_scoped_true_staticRenderFns,
  false,
  null,
  "0a8aec96",
  null
  
)

/* harmony default export */ var RevisionImportExport = (RevisionImportExport_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionMetadata.vue?vue&type=template&id=0f9d4450&scoped=true&
var RevisionMetadatavue_type_template_id_0f9d4450_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('section',{staticClass:"title"},[_c('span',{staticClass:"revision-title"},[_vm._v("Revision")]),_c('span',[_vm._v(" created by "),_c('span',[_c('a',{attrs:{"href":("mailto:" + (_vm.user.user_email))}},[_vm._v(_vm._s(((_vm.user.user_firstname) + " " + (_vm.user.user_lastname))))])])]),_c('span',{staticClass:"revision-creation-date info",attrs:{"title":_vm.date(_vm.revision.metadata.date)}},[_vm._v(" "+_vm._s(_vm.created_at_readable))])]),_c('section',{staticClass:"details"},[_c('RevisionMetadataIcons',{attrs:{"revision":_vm.revision}}),(_vm.revision.metadata.executed_at)?_c('span',{staticClass:"last-execution"},[_vm._v("| Last execution time: "),_c('span',{staticClass:"info",attrs:{"title":_vm.date(_vm.revision.metadata.executed_at)}},[_vm._v(_vm._s(_vm.executed_at_readable))])]):_c('span',{staticClass:"last-execution"},[_vm._v("| never executed")])],1)])}
var RevisionMetadatavue_type_template_id_0f9d4450_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./src/components/RevisionMetadataIcons.vue + 4 modules
var RevisionMetadataIcons = __webpack_require__(5079);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionMetadata.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

 // refresh interval for the human readable dates

var refreshInterval = 1000; // store the clear setInterval ID

var clearIntervalID = false;
/* harmony default export */ var RevisionMetadatavue_type_script_lang_js_ = ({
  name: 'RevisionMetadata',
  data: function data() {
    return {
      created_at_readable: '',
      executed_at_readable: ''
    };
  },
  components: {
    RevisionMetadataIcons: RevisionMetadataIcons/* default */.Z
  },
  props: {
    revision: {
      type: Object,
      default: null
    }
  },
  created: function created() {
    var _this = this;

    this.setHumanReadableDates();
    /**
     * update human readable dates once every minute
     */

    clearIntervalID = setInterval(function () {
      _this.setHumanReadableDates();
    }, refreshInterval);
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(clearIntervalID);
  },
  computed: {
    user: function user() {
      return this.revision.metadata.creator;
    }
  },
  watch: {
    revision: function revision() {
      // reset dates when the revision is changed
      this.setHumanReadableDates();
    }
  },
  methods: {
    setHumanReadableDates: function setHumanReadableDates() {
      var revision = this.revision;
      this.created_at_readable = (0,utils/* humanReadableDate */.tV)(revision.metadata.date);
      this.executed_at_readable = (0,utils/* humanReadableDate */.tV)(revision.metadata.executed_at);
    },
    date: function date(_date) {
      return (0,utils/* formatDate */.p6)(_date, 'MM-DD-YYYY hh:mm:ss');
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RevisionMetadata.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RevisionMetadatavue_type_script_lang_js_ = (RevisionMetadatavue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionMetadata.vue?vue&type=style&index=0&id=0f9d4450&scoped=true&lang=css&
var RevisionMetadatavue_type_style_index_0_id_0f9d4450_scoped_true_lang_css_ = __webpack_require__(9202);
;// CONCATENATED MODULE: ./src/components/RevisionMetadata.vue?vue&type=style&index=0&id=0f9d4450&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/RevisionMetadata.vue



;


/* normalize component */

var RevisionMetadata_component = (0,componentNormalizer/* default */.Z)(
  components_RevisionMetadatavue_type_script_lang_js_,
  RevisionMetadatavue_type_template_id_0f9d4450_scoped_true_render,
  RevisionMetadatavue_type_template_id_0f9d4450_scoped_true_staticRenderFns,
  false,
  null,
  "0f9d4450",
  null
  
)

/* harmony default export */ var RevisionMetadata = (RevisionMetadata_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DateRangeInfo.vue?vue&type=template&id=66a0bf6a&scoped=true&
var DateRangeInfovue_type_template_id_66a0bf6a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('section',{staticClass:"date-range"},[(_vm.dateMin)?_c('span',{staticClass:"date-wrapper"},[_c('span',{staticClass:"label"},[_vm._v("From")]),_c('span',{staticClass:"date"},[_vm._v(_vm._s(_vm.dateMin))])]):_vm._e(),(_vm.dateMax)?_c('span',{staticClass:"date-wrapper"},[_c('span',{staticClass:"label"},[_vm._v(" to")]),_c('span',{staticClass:"date"},[_vm._v(_vm._s(_vm.dateMax))])]):_vm._e(),(!_vm.dateMin && !_vm.dateMax)?_c('span',[_vm._v("no date range specified (get all available data)")]):_vm._e()])])}
var DateRangeInfovue_type_template_id_66a0bf6a_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(3210);
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(381);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DateRangeInfo.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//

var user_date_format = 'MM-DD-YYYY';
/* harmony default export */ var DateRangeInfovue_type_script_lang_js_ = ({
  name: 'DateRangeInfo',
  props: {
    min: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: ''
    }
  },
  computed: {
    dateMin: function dateMin() {
      return this.getFormattedDate(this.min);
    },
    dateMax: function dateMax() {
      return this.getFormattedDate(this.max);
    }
  },
  methods: {
    getFormattedDate: function getFormattedDate(date) {
      if (date.trim() == '') return date;
      return moment_default()(date).format(user_date_format);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/DateRangeInfo.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DateRangeInfovue_type_script_lang_js_ = (DateRangeInfovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DateRangeInfo.vue?vue&type=style&index=0&id=66a0bf6a&scoped=true&lang=css&
var DateRangeInfovue_type_style_index_0_id_66a0bf6a_scoped_true_lang_css_ = __webpack_require__(7823);
;// CONCATENATED MODULE: ./src/components/DateRangeInfo.vue?vue&type=style&index=0&id=66a0bf6a&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/DateRangeInfo.vue



;


/* normalize component */

var DateRangeInfo_component = (0,componentNormalizer/* default */.Z)(
  components_DateRangeInfovue_type_script_lang_js_,
  DateRangeInfovue_type_template_id_66a0bf6a_scoped_true_render,
  DateRangeInfovue_type_template_id_66a0bf6a_scoped_true_staticRenderFns,
  false,
  null,
  "66a0bf6a",
  null
  
)

/* harmony default export */ var DateRangeInfo = (DateRangeInfo_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MRNList.vue?vue&type=template&id=11551bb5&scoped=true&
var MRNListvue_type_template_id_11551bb5_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('span',[_c('b',[_vm._v("Total MRNs:")]),_vm._v(" "+_vm._s(_vm.list.length))]),(_vm.list.length<20)?_c('ul',_vm._l((_vm.list),function(mrn,index){return _c('li',{key:index},[_vm._v(_vm._s(mrn))])}),0):_c('Details',{scopedSlots:_vm._u([{key:"summary",fn:function(){return [_vm._v("Show MRN list...")]},proxy:true}])},[_c('ul',_vm._l((_vm.list),function(mrn,index){return _c('li',{key:index},[_vm._v(_vm._s(mrn))])}),0)])],1)}
var MRNListvue_type_template_id_11551bb5_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/common/Details.vue?vue&type=template&id=465a7bfa&scoped=true&
var Detailsvue_type_template_id_465a7bfa_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"detail-container",class:{open:_vm.open}},[_c('div',{staticClass:"summary",on:{"click":_vm.onClick}},[_vm._t("summary")],2),_c('transition',{attrs:{"duration":{ enter: _vm.animationEnterDuration, leave: _vm.animationLeaveDuration },"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.open),expression:"open"}],staticClass:"detail"},[_vm._t("default")],2)])],1)}
var Detailsvue_type_template_id_465a7bfa_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/common/Details.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Detailsvue_type_script_lang_js_ = ({
  name: 'Details',
  data: function data() {
    return {
      open: false
    };
  },
  props: {
    animated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    animationEnterDuration: function animationEnterDuration() {
      return this.animated ? 150 : 0;
    },
    animationLeaveDuration: function animationLeaveDuration() {
      return this.animated ? 300 : 0;
    }
  },
  methods: {
    onClick: function onClick() {
      this.open = !this.open;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/common/Details.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_Detailsvue_type_script_lang_js_ = (Detailsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/common/Details.vue?vue&type=style&index=0&id=465a7bfa&scoped=true&lang=css&
var Detailsvue_type_style_index_0_id_465a7bfa_scoped_true_lang_css_ = __webpack_require__(2217);
;// CONCATENATED MODULE: ./src/components/common/Details.vue?vue&type=style&index=0&id=465a7bfa&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/common/Details.vue



;


/* normalize component */

var Details_component = (0,componentNormalizer/* default */.Z)(
  common_Detailsvue_type_script_lang_js_,
  Detailsvue_type_template_id_465a7bfa_scoped_true_render,
  Detailsvue_type_template_id_465a7bfa_scoped_true_staticRenderFns,
  false,
  null,
  "465a7bfa",
  null
  
)

/* harmony default export */ var Details = (Details_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MRNList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var MRNListvue_type_script_lang_js_ = ({
  name: 'MRNList',
  components: {
    Details: Details
  },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MRNList.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MRNListvue_type_script_lang_js_ = (MRNListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MRNList.vue?vue&type=style&index=0&id=11551bb5&scoped=true&lang=css&
var MRNListvue_type_style_index_0_id_11551bb5_scoped_true_lang_css_ = __webpack_require__(9458);
;// CONCATENATED MODULE: ./src/components/MRNList.vue?vue&type=style&index=0&id=11551bb5&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MRNList.vue



;


/* normalize component */

var MRNList_component = (0,componentNormalizer/* default */.Z)(
  components_MRNListvue_type_script_lang_js_,
  MRNListvue_type_template_id_11551bb5_scoped_true_render,
  MRNListvue_type_template_id_11551bb5_scoped_true_staticRenderFns,
  false,
  null,
  "11551bb5",
  null
  
)

/* harmony default export */ var MRNList = (MRNList_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/Panel.vue?vue&type=template&id=0360e192&scoped=true&
var Panelvue_type_template_id_0360e192_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-card',{attrs:{"header-tag":"header","header-bg-variant":"info","header-text-variant":"white","no-body":""},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('h4',{staticClass:"mb-0 font-weight-bold"},[_vm._v("Source Fields List")])]},proxy:true}])},[_c('div',{staticClass:"p-2",attrs:{"id":"selected-list"}},[_c('FieldCategory',{attrs:{"container":_vm.container}})],1)])}
var Panelvue_type_template_id_0360e192_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/FieldCategory.vue?vue&type=template&id=3b9a2fd3&scoped=true&
var FieldCategoryvue_type_template_id_3b9a2fd3_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field-category m-0 p-0"},[(_vm.container.id!=='')?_c('header',{staticClass:"d-flex",on:{"click":_vm.toggle}},[_c('section',{staticClass:"d-inline me-2"},[(_vm.collapsed)?_c('font-awesome-icon',{attrs:{"icon":['fas', 'chevron-circle-right'],"fixed-width":""}}):_c('font-awesome-icon',{attrs:{"icon":['fas', 'chevron-circle-down'],"fixed-width":""}})],1),_c('section',[_c('span',{staticClass:"font-weight-bold"},[_vm._v(_vm._s(_vm.container.id))]),(_vm.container.id)?_c('span',{staticClass:"d-block small font-italic text-muted"},[_c('span',[_vm._v(_vm._s(_vm.total)+" field"+_vm._s(_vm.total===1 ? '' : 's'))]),(_vm.totalDisabled>0)?_c('span',[_vm._v(" ("+_vm._s(_vm.totalDisabled)+" field"+_vm._s(_vm.totalDisabled===1 ? '' : 's')+" disabled)")]):_vm._e()]):_vm._e()])]):_vm._e(),(!_vm.collapsed || _vm.container.id==='')?_c('div',{staticClass:"children",class:{'ms-5': _vm.container.id!==''}},[_vm._l((_vm.container.children),function(child,key){return [_c('section',{key:key},[(_vm.isFhirField(child))?[_c('FieldNode',{staticClass:"py-1",attrs:{"data":child}})]:[_c('FieldCategory',{staticClass:"py-1",attrs:{"container":child}})]],2)]})],2):_vm._e()])}
var FieldCategoryvue_type_template_id_3b9a2fd3_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(7327);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./src/libraries/metadata/index.js + 7 modules
var metadata = __webpack_require__(1645);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/FieldNode.vue?vue&type=template&id=0c507c59&scoped=true&
var FieldNodevue_type_template_id_0c507c59_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-0 p-0 font-italic field-node"},[_c('span',{class:{'disabled-option': _vm.data.disabled}},[_c('span',[_vm._v(_vm._s(_vm.data.field))]),_c('span',{staticClass:"ms-2"},[_vm._v("("+_vm._s(_vm.data.label)+")")])]),(_vm.data.disabled)?_c('span',{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{"hover":true}}],staticClass:"ms-2 text-danger",attrs:{"title":("" + (_vm.data.disabled_reason))}},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'exclamation-circle'],"fixed-width":""}})],1):_vm._e()])}
var FieldNodevue_type_template_id_0c507c59_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/FieldNode.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FieldNodevue_type_script_lang_js_ = ({
  props: {
    data: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappedFhirResources/FieldNode.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappedFhirResources_FieldNodevue_type_script_lang_js_ = (FieldNodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/FieldNode.vue?vue&type=style&index=0&id=0c507c59&scoped=true&lang=css&
var FieldNodevue_type_style_index_0_id_0c507c59_scoped_true_lang_css_ = __webpack_require__(1492);
;// CONCATENATED MODULE: ./src/components/MappedFhirResources/FieldNode.vue?vue&type=style&index=0&id=0c507c59&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MappedFhirResources/FieldNode.vue



;


/* normalize component */

var FieldNode_component = (0,componentNormalizer/* default */.Z)(
  MappedFhirResources_FieldNodevue_type_script_lang_js_,
  FieldNodevue_type_template_id_0c507c59_scoped_true_render,
  FieldNodevue_type_template_id_0c507c59_scoped_true_staticRenderFns,
  false,
  null,
  "0c507c59",
  null
  
)

/* harmony default export */ var FieldNode = (FieldNode_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/FieldCategory.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var FieldCategoryvue_type_script_lang_js_ = ({
  name: 'FieldCategory',
  data: function data() {
    return {
      collapsed: true
    };
  },
  components: {
    FieldNode: FieldNode
  },
  props: {
    container: {
      type: metadata/* MetadataContainer */.Q,
      default: null
    }
  },
  computed: {
    total: function total() {
      var fields = this.container.getFields(true);
      return fields.length;
    },
    totalDisabled: function totalDisabled() {
      var fields = this.container.getFields(true);
      return fields.filter(function (_ref) {
        var disabled = _ref.disabled;
        return disabled;
      }).length;
    }
  },
  methods: {
    isFhirField: function isFhirField(item) {
      return item instanceof metadata/* FhirField */.O;
    },
    toggle: function toggle() {
      this.collapsed = !this.collapsed;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappedFhirResources/FieldCategory.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappedFhirResources_FieldCategoryvue_type_script_lang_js_ = (FieldCategoryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/FieldCategory.vue?vue&type=style&index=0&id=3b9a2fd3&scoped=true&lang=css&
var FieldCategoryvue_type_style_index_0_id_3b9a2fd3_scoped_true_lang_css_ = __webpack_require__(6284);
;// CONCATENATED MODULE: ./src/components/MappedFhirResources/FieldCategory.vue?vue&type=style&index=0&id=3b9a2fd3&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MappedFhirResources/FieldCategory.vue



;


/* normalize component */

var FieldCategory_component = (0,componentNormalizer/* default */.Z)(
  MappedFhirResources_FieldCategoryvue_type_script_lang_js_,
  FieldCategoryvue_type_template_id_3b9a2fd3_scoped_true_render,
  FieldCategoryvue_type_template_id_3b9a2fd3_scoped_true_staticRenderFns,
  false,
  null,
  "3b9a2fd3",
  null
  
)

/* harmony default export */ var FieldCategory = (FieldCategory_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/Panel.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Panelvue_type_script_lang_js_ = ({
  components: {
    FieldCategory: FieldCategory
  },
  computed: {
    container: function container() {
      var selectedRevision = this.$store.getters['revisions/selected'];
      var container = this.$store.getters['revisions/metadata'](selectedRevision);
      return container;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappedFhirResources/Panel.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappedFhirResources_Panelvue_type_script_lang_js_ = (Panelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappedFhirResources/Panel.vue?vue&type=style&index=0&id=0360e192&scoped=true&lang=css&
var Panelvue_type_style_index_0_id_0360e192_scoped_true_lang_css_ = __webpack_require__(2907);
;// CONCATENATED MODULE: ./src/components/MappedFhirResources/Panel.vue?vue&type=style&index=0&id=0360e192&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MappedFhirResources/Panel.vue



;


/* normalize component */

var Panel_component = (0,componentNormalizer/* default */.Z)(
  MappedFhirResources_Panelvue_type_script_lang_js_,
  Panelvue_type_template_id_0360e192_scoped_true_render,
  Panelvue_type_template_id_0360e192_scoped_true_staticRenderFns,
  false,
  null,
  "0360e192",
  null
  
)

/* harmony default export */ var Panel = (Panel_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionDetail.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var RevisionDetailvue_type_script_lang_js_ = ({
  name: 'RevisionDetail',
  components: {
    RevisionImportExport: RevisionImportExport,
    RevisionMetadata: RevisionMetadata,
    DateRangeInfo: DateRangeInfo,
    MRNList: MRNList,
    MappedFhirResourcesPanel: Panel
  },
  props: {
    revision: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    creationDate: function creationDate() {
      return (0,utils/* formatDate */.p6)(this.revision.metadata.date, 'MM-DD-YYYY hh:mm:ss');
    },
    readableCreationDate: function readableCreationDate() {
      return (0,utils/* humanReadableDate */.tV)(this.revision.metadata.date);
    },
    user: function user() {
      return this.revision.metadata.creator;
    },

    /**
     * show MRN list only if revision is not approved and MRNs are available in this revision
     */
    showMrns: function showMrns() {
      try {
        var mrns = this.revision.getTotaltMrns(); // return (!approved && mrns.length>0 )

        return mrns > 0;
      } catch (error) {
        return false;
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RevisionDetail.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RevisionDetailvue_type_script_lang_js_ = (RevisionDetailvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionDetail.vue?vue&type=style&index=0&id=2ed78e38&scoped=true&lang=css&
var RevisionDetailvue_type_style_index_0_id_2ed78e38_scoped_true_lang_css_ = __webpack_require__(9816);
;// CONCATENATED MODULE: ./src/components/RevisionDetail.vue?vue&type=style&index=0&id=2ed78e38&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/RevisionDetail.vue



;


/* normalize component */

var RevisionDetail_component = (0,componentNormalizer/* default */.Z)(
  components_RevisionDetailvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2ed78e38",
  null
  
)

/* harmony default export */ var RevisionDetail = (RevisionDetail_component.exports);

/***/ }),

/***/ 5079:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ RevisionMetadataIcons; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3f4dd975-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionMetadataIcons.vue?vue&type=template&id=50ed4581&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.revision.isApproved())?_c('font-awesome-icon',{staticClass:"info status-approved",attrs:{"title":"approved","icon":['fas', 'check-circle'],"fixed-width":""}}):_c('font-awesome-icon',{staticClass:"info status-not-approved",attrs:{"title":"not approved","icon":['fas', 'ban'],"fixed-width":""}}),(_vm.revision.isExpired())?_c('font-awesome-icon',{staticClass:"info status-date-due",attrs:{"title":"date range is due","icon":['fas', 'calendar'],"fixed-width":""}}):_c('font-awesome-icon',{staticClass:"info status-date-valid ",attrs:{"title":"date range is valid","icon":['fas', 'calendar-check'],"fixed-width":""}}),_c('font-awesome-icon',{staticClass:"info",attrs:{"title":("ID " + (_vm.revision.getID())),"icon":['fas', 'hashtag'],"fixed-width":""}})],1)}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionMetadataIcons.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var RevisionMetadataIconsvue_type_script_lang_js_ = ({
  name: 'RevisionMetadataIcons',
  props: {
    revision: {
      type: Object,
      default: null
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RevisionMetadataIcons.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RevisionMetadataIconsvue_type_script_lang_js_ = (RevisionMetadataIconsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RevisionMetadataIcons.vue?vue&type=style&index=0&id=50ed4581&scoped=true&lang=css&
var RevisionMetadataIconsvue_type_style_index_0_id_50ed4581_scoped_true_lang_css_ = __webpack_require__(3884);
;// CONCATENATED MODULE: ./src/components/RevisionMetadataIcons.vue?vue&type=style&index=0&id=50ed4581&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/RevisionMetadataIcons.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_RevisionMetadataIconsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "50ed4581",
  null
  
)

/* harmony default export */ var RevisionMetadataIcons = (component.exports);

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

/***/ 1640:
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
___CSS_LOADER_EXPORT___.push([module.id, ".date[data-v-66a0bf6a]{font-style:italic}.date+i[class^=fa][data-v-66a0bf6a]{margin-left:3px}.label[data-v-66a0bf6a]{font-weight:700;margin-right:3px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3113:
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
___CSS_LOADER_EXPORT___.push([module.id, "ul[data-v-11551bb5]{list-style:none;max-height:100px;overflow:auto;border:1px solid rgba(0,0,0,.125);border-radius:3px;padding:5px;margin:0}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2641:
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
___CSS_LOADER_EXPORT___.push([module.id, "header[data-v-3b9a2fd3]{cursor:pointer}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9681:
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
___CSS_LOADER_EXPORT___.push([module.id, ".field-node>.disabled-option[data-v-0c507c59]{text-decoration:line-through}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1822:
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
___CSS_LOADER_EXPORT___.push([module.id, "#selected-list[data-v-0360e192]{min-height:300px;max-height:500px;overflow-y:scroll}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8594:
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
___CSS_LOADER_EXPORT___.push([module.id, "header[data-v-2ed78e38]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}header a[data-v-2ed78e38]{font-size:inherit}header .subtitle[data-v-2ed78e38]{font-style:italic;font-size:.8rem}main section+section[data-v-2ed78e38]{margin-top:30px}main h5[data-v-2ed78e38]{color:#030399}section.revisions[data-v-2ed78e38]{display:none}@media only screen and (max-width:768px){header[data-v-2ed78e38]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}header>*+*[data-v-2ed78e38]{margin-top:15px}.revision-import-export[data-v-2ed78e38]{-ms-flex-item-align:start;align-self:flex-start}}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9943:
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
___CSS_LOADER_EXPORT___.push([module.id, ".columns-settings[data-v-75fce768]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.group+.group[data-v-75fce768]{margin-top:20px}.line[data-v-75fce768]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.line>*[data-v-75fce768]{margin:auto 0}.line>*+*[data-v-75fce768]{margin-left:10px}.line.vertical[data-v-75fce768]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}input[type=checkbox][data-v-75fce768],label[data-v-75fce768]{cursor:pointer}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2076:
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
___CSS_LOADER_EXPORT___.push([module.id, ".import-export.dropdown-container>button{background-color:transparent;border:none;color:#000}.import-export.dropdown-container>button>i{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transform:rotate(0deg);transform:rotate(0deg)}.import-export.dropdown-container>button:focus>i{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.export>button,.import>button{font-size:1rem;padding:0}.export>button,.export>button:hover,.import>button,.import>button:hover{background-color:transparent;border-color:transparent}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1733:
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
___CSS_LOADER_EXPORT___.push([module.id, "main[data-v-0f9d4450]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}main .title[data-v-0f9d4450]{font-size:1.2em;font-weight:700}main .details[data-v-0f9d4450]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}main .details>*+*[data-v-0f9d4450]{margin-left:3px}main .last-execution[data-v-0f9d4450]{font-style:italic}main .title a[data-v-0f9d4450]{font-size:inherit}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2802:
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
___CSS_LOADER_EXPORT___.push([module.id, ".info[data-v-50ed4581]{cursor:help}.status-approved[data-v-50ed4581]{color:#28a745}.status-not-approved[data-v-50ed4581]{color:#dc3545}.status-date-due[data-v-50ed4581],.status-date-valid[data-v-50ed4581]{color:#000}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4816:
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
___CSS_LOADER_EXPORT___.push([module.id, ".summary[data-v-465a7bfa]{cursor:pointer}.summary[data-v-465a7bfa]:before{font-weight:700;content:\"+\";float:left;height:20px;width:20px}.detail-container.open>.summary[data-v-465a7bfa]:before{content:\"-\"}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7823:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1640);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("4debb290", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9458:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3113);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("4c3d31c4", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 6284:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2641);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("6d890078", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 1492:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9681);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("8d5d6b30", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 2907:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1822);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("a83e6018", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9816:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8594);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("75325ee6", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 6499:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9943);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("0798f15d", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 8194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2076);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("762cd2dd", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9202:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1733);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("6423beaa", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 3884:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2802);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("906813c0", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 2217:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4816);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("c676cfec", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);