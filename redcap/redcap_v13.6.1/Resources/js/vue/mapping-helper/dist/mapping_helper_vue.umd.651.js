((typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmapping_helper_vue"] || []).push([[651],{

/***/ 1974:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ Payload_Node; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Payload/Node.vue?vue&type=template&id=6adeaa6d&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "node"
  }, [_vm.isArray(_vm.payload) ? _c('span', {
    staticClass: "parenthesis open",
    domProps: {
      "textContent": _vm._s("[")
    }
  }) : _vm._e(), _vm.isObject(_vm.payload) ? _c('span', {
    staticClass: "parenthesis open",
    domProps: {
      "textContent": _vm._s("{")
    }
  }) : _vm._e(), _c('span', {
    staticClass: "expander text-muted",
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.onClick.apply(null, arguments);
      }
    }
  }, [_vm.open ? _c('font-awesome-icon', {
    attrs: {
      "icon": ['fas', 'chevron-circle-down']
    }
  }) : _c('font-awesome-icon', {
    attrs: {
      "icon": ['fas', 'chevron-circle-right']
    }
  })], 1), _vm.open ? _vm._l(_vm.payload, function (value, key) {
    return _c('span', {
      key: key,
      staticClass: "child d-block ms-2"
    }, [!_vm.isArray(_vm.payload) ? _c('span', {
      staticClass: "me-2 font-weight-bold"
    }, [_vm._v("\"" + _vm._s(key) + "\":")]) : _vm._e(), _vm.isLeaf(value) ? _c('span', {
      class: _vm.getClass(value),
      domProps: {
        "textContent": _vm._s(_vm.print(value))
      }
    }) : _c('Node', {
      attrs: {
        "payload": value
      }
    }), !_vm.isLast(key) ? _c('span', [_vm._v(",")]) : _vm._e()], 1);
  }) : _vm._e(), _vm.isArray(_vm.payload) ? _c('span', {
    staticClass: "parenthesis closed",
    domProps: {
      "textContent": _vm._s("]")
    }
  }) : _vm._e(), _vm.isObject(_vm.payload) ? _c('span', {
    staticClass: "parenthesis closed",
    domProps: {
      "textContent": _vm._s("}")
    }
  }) : _vm._e()], 2);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(4819);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(2302);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Payload/Node.vue?vue&type=script&lang=js&




/* harmony default export */ var Nodevue_type_script_lang_js_ = ({
  name: 'Node',
  data: function data() {
    return {
      open: true
    };
  },
  components: {
    Node: Node
  },
  props: {
    payload: {
      type: [Object, Array],
      default: function _default() {
        return {};
      }
    }
  },
  methods: {
    isLeaf: function isLeaf(item) {
      return !(this.isObject(item) || this.isArray(item));
    },
    isObject: function isObject(item) {
      return (0,esm_typeof/* default */.Z)(item) === 'object' && !Array.isArray(item);
    },
    isArray: function isArray(item) {
      return Array.isArray(item);
    },
    isLast: function isLast(key) {
      if (this.isObject(this.payload)) {
        var keys = Object.keys(this.payload);
        return keys.slice(-1)[0] === key;
      } else if (this.isArray(this.payload)) {
        return key === (0,toConsumableArray/* default */.Z)(this.payload).length - 1;
      }
      return false;
    },
    print: function print(value) {
      if (typeof value === 'string') return "\"".concat(value, "\"");else return value;
    },
    getClass: function getClass(value) {
      var type = (0,esm_typeof/* default */.Z)(value);
      return type;
    },
    onClick: function onClick() {
      this.open = !this.open;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Payload/Node.vue?vue&type=script&lang=js&
 /* harmony default export */ var Payload_Nodevue_type_script_lang_js_ = (Nodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Payload/Node.vue?vue&type=style&index=0&id=6adeaa6d&prod&scoped=true&lang=css&
var Nodevue_type_style_index_0_id_6adeaa6d_prod_scoped_true_lang_css_ = __webpack_require__(2196);
;// CONCATENATED MODULE: ./src/components/Payload/Node.vue?vue&type=style&index=0&id=6adeaa6d&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/Payload/Node.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  Payload_Nodevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6adeaa6d",
  null
  
)

/* harmony default export */ var Payload_Node = (component.exports);

/***/ }),

/***/ 8651:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ObservationsTable; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules
var objectSpread2 = __webpack_require__(5926);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(3210);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ObservationsTable.vue?vue&type=template&id=13ffc694&scoped=true&


var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "table-wrapper"
  }, [_c('b-table', _vm._b({
    attrs: {
      "fields": _vm.fields
    },
    scopedSlots: _vm._u([{
      key: "head(select)",
      fn: function fn(data) {
        return [_c('div', {
          staticClass: "d-flex"
        }, [_c('b-form-checkbox', {
          attrs: {
            "indeterminate": _vm.indeterminate
          },
          on: {
            "change": _vm.toggleAll
          },
          model: {
            value: _vm.allSelected,
            callback: function callback($$v) {
              _vm.allSelected = $$v;
            },
            expression: "allSelected"
          }
        }, [_c('span', [_vm._v(_vm._s(data.label))])])], 1), _c('b-button', {
          staticClass: "w-100 text-nowrap",
          attrs: {
            "size": "sm",
            "variant": "outline-secondary",
            "disabled": !(_vm.allSelected || _vm.indeterminate)
          },
          on: {
            "click": _vm.showExportPreview
          }
        }, [_c('font-awesome-icon', {
          staticClass: "icon",
          attrs: {
            "icon": ['fas', 'file-download'],
            "fixed-width": ""
          }
        }), _c('span', [_vm._v("export")])], 1)];
      }
    }, {
      key: "cell(select)",
      fn: function fn(data) {
        return [_vm.isLoincCode(data.item) ? _c('div', {
          staticClass: "select-wrapper"
        }, [!_vm.isMapped(data.item['coding_code']) ? _c('b-form-checkbox', {
          attrs: {
            "disabled": !data.item['coding_code'],
            "value": data.item['coding_code'],
            "switch": "",
            "size": "lg"
          },
          model: {
            value: _vm.selected_codes,
            callback: function callback($$v) {
              _vm.selected_codes = $$v;
            },
            expression: "selected_codes"
          }
        }) : _vm._e()], 1) : _vm._e()];
      }
    }, {
      key: "cell(coding_display)",
      fn: function fn(data) {
        return [_c('span', {
          domProps: {
            "innerHTML": _vm._s(_vm.$attrs.markText(data.value))
          }
        }), data.item['coding_text'] != data.value ? [_c('span', {
          staticClass: "font-italic small d-block"
        }, [_vm._v("(" + _vm._s(data.item['coding_text']) + ")")])] : _vm._e()];
      }
    }, {
      key: "cell(coding_code)",
      fn: function fn(data) {
        return [_c('span', {
          domProps: {
            "innerHTML": _vm._s(_vm.$attrs.markText(data.value))
          }
        }), _vm.isLoincCode(data.item) ? _c('div', {
          staticClass: "small"
        }, [!_vm.isMapped(data.value) ? _c('b-badge', {
          attrs: {
            "variant": "warning"
          }
        }, [_vm._v("not mapped")]) : _c('b-badge', {
          attrs: {
            "variant": "info"
          }
        }, [_vm._v("mapped")])], 1) : _vm._e()];
      }
    }, {
      key: "cell()",
      fn: function fn(data) {
        return [_vm.isObject(data.value) ? _c('div', [_c('Node', {
          attrs: {
            "payload": data.value
          }
        })], 1) : _c('div', [_c('span', {
          domProps: {
            "innerHTML": _vm._s(_vm.$attrs.markText(data.value))
          }
        })])];
      }
    }])
  }, 'b-table', (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, _vm.$attrs), _vm.$props), false)), _c('b-alert', {
    attrs: {
      "show": true
    }
  }, [_vm._v(" Please note that results with multiple coding systems are split in separated rows. ")]), _c('b-modal', {
    ref: "export-modal",
    attrs: {
      "title": "Export codes"
    },
    scopedSlots: _vm._u([{
      key: "modal-footer",
      fn: function fn(_ref) {
        var cancel = _ref.cancel;
        return [_c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "secondary"
          },
          on: {
            "click": function click($event) {
              return cancel();
            }
          }
        }, [_vm._v(" Cancel ")]), _c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "success",
            "disabled": !_vm.exportFileName
          },
          on: {
            "click": function click($event) {
              return _vm.onExportClicked();
            }
          }
        }, [_c('font-awesome-icon', {
          attrs: {
            "icon": ['fas', 'file-export'],
            "fixed-width": ""
          }
        }), _c('span', {
          staticClass: "ms-2"
        }, [_vm._v("Export")])], 1)];
      }
    }])
  }, [_c('div', [_c('p', {
    staticClass: "mb-2"
  }, [_vm._v("Do you want to export the current selection?")]), _c('b-table', {
    staticClass: "mb-2",
    attrs: {
      "small": "",
      "items": _vm.exportItems,
      "striped": "",
      "bordered": "",
      "sticky-header": "100"
    },
    scopedSlots: _vm._u([{
      key: "cell(code)",
      fn: function fn(data) {
        return [_c('b', {
          staticClass: "text-nowrap"
        }, [_vm._v(_vm._s(data.value))])];
      }
    }])
  }), _c('b-input', {
    attrs: {
      "placeholder": "enter a name for this selection..."
    },
    model: {
      value: _vm.exportFileName,
      callback: function callback($$v) {
        _vm.exportFileName = typeof $$v === 'string' ? $$v.trim() : $$v;
      },
      expression: "exportFileName"
    }
  })], 1)])], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./src/components/endpoints/tables/ObservationsTable.vue?vue&type=template&id=13ffc694&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8878);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(4819);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(2757);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(2302);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(9601);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__(4723);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(1249);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(9720);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./src/components/Payload/Node.vue + 4 modules
var Node = __webpack_require__(1974);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__(285);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.js
var web_url_search_params = __webpack_require__(1637);
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment_moment = __webpack_require__(381);
// EXTERNAL MODULE: ./src/variables.js
var variables = __webpack_require__(8643);
;// CONCATENATED MODULE: ./src/libraries/Utils.js








var downloadBlob = function downloadBlob(text, filename) {
  var url = window.URL.createObjectURL(new Blob([text]));
  var link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
var downloadDataURI = function downloadDataURI(text) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'export.txt';
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
var formatDate = function formatDate(date) {
  if (!date) return '';
  var date_string = moment(date).format(date_format); // date_format defined in variables
  return date_string;
};

// EXTERNAL MODULE: ./src/components/endpoints/tables/ResourceTable.vue + 5 modules
var ResourceTable = __webpack_require__(6003);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ObservationsTable.vue?vue&type=script&lang=js&



















/**
 * helper function that flattens an object.
 * specifically, this is being used to flattedn the coding
 * systems of each observation
 */
var flatten = function flatten(obj) {
  var flattened = {};
  Object.keys(obj).forEach(function (key) {
    if ((0,esm_typeof/* default */.Z)(obj[key]) === 'object' && obj[key] !== null) {
      Object.assign(flattened, flatten(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });
  return flattened;
};
/* harmony default export */ var ObservationsTablevue_type_script_lang_js_ = ({
  extends: ResourceTable["default"],
  components: {
    Node: Node/* default */.Z
  },
  data: function data() {
    return {
      exportFileName: 'codes.txt',
      allSelected: false,
      indeterminate: false,
      selected_codes: [],
      custom_fields: [{
        key: 'select',
        sortable: false
      }, {
        key: 'coding_display',
        sortable: true
      },
      // {key: 'coding_text', sortable: true,},
      {
        key: 'coding_code',
        sortable: true
      }, {
        key: 'value',
        sortable: true
      }, {
        key: 'valueUnit',
        sortable: true
      }, {
        key: 'timestamp',
        sortable: true
      }, {
        key: 'coding_system',
        sortable: true
      }
      // {key: 'loinc', sortable: true,},
      // {key: 'loinc-codes', sortable: true,},
      // {key: 'valueQuantity', sortable: true,},
      // {key: 'valueBoolean', sortable: true,},
      // {key: 'valueCodeableConcept', sortable: true,},
      // {key: 'valueDateTime', sortable: true,},
      // {key: 'valueInteger', sortable: true,},
      // {key: 'valuePeriod', sortable: true,},
      // {key: 'valueRange', sortable: true,},
      // {key: 'valueRatio', sortable: true,},
      // {key: 'valueSampledData', sortable: true,},
      // {key: 'valueString', sortable: true,},
      // {key: 'valueTime', sortable: true,},
      /* {
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
      } */]
    };
  },

  methods: {
    isObject: function isObject(value) {
      return (0,esm_typeof/* default */.Z)(value) == 'object';
    },
    isNonArrayObject: function isNonArrayObject(value) {
      if (Array.isArray(value)) return false;
      return this.isObject(value);
    },
    shouldDisplayCell: function shouldDisplayCell(value) {
      if (Array.isArray(value) && value.length < 1) return false;
      return true;
    },
    isLoincCode: function isLoincCode(data) {
      var system = data.coding_system;
      if (!system) return;
      return system.match(/loinc/i);
    },
    isMapped: function isMapped(code) {
      return this.cdpMappingNames.indexOf(code) > 0;
    },
    toggleAll: function toggleAll(checked) {
      this.selected_codes = checked ? Object.keys(this.selectable).slice() : [];
    },
    showExportPreview: function showExportPreview() {
      var modal = this.$refs['export-modal'];
      if (modal) modal.show();
    },
    onExportClicked: function onExportClicked() {
      var text = '';
      var _iterator = (0,createForOfIteratorHelper/* default */.Z)(this.exportItems),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
            code = _step$value.code,
            label = _step$value.label;
          text += "".concat(code, ", ").concat(label, "\n");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      downloadBlob(text, this.exportFileName);
      var modal = this.$refs['export-modal'];
      if (modal) modal.hide();
    }
  },
  computed: {
    /**
     * transform the observation so that the code is flat
     * instead of being a nested object like this {coding: {code,system,display}, text}
     */
    itemsProxy: function itemsProxy() {
      var items = (0,toConsumableArray/* default */.Z)(this.items); // ilst of items coming from $attrs, specifically from ResourceTableWrapper
      var flatCodeItems = items.map(function (item) {
        var _item$code = item.code,
          code = _item$code === void 0 ? {} : _item$code;
        for (var _i = 0, _Object$entries = Object.entries(flatten(code)); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
          item["coding_".concat(key)] = value;
        }
        return item;
      });
      return flatCodeItems;
    },
    allChecked: {
      get: function get() {
        return this.selected_codes.length == Object.keys(this.selectable).length;
      },
      set: function set(value) {
        console.log('allChecked', value);
      }
    },
    intermediateChecked: {
      get: function get() {
        if (this.selected_codes.length == 0) return false;
        if (this.selected_codes.length == Object.keys(this.selectable).length) return false;
        return true;
      },
      set: function set(value) {
        console.log('intermediate', value);
      }
    },
    /**
     * list of LOINC codes that can be selected (along with label)
     */
    selectable: function selectable() {
      var _this = this;
      var codes = {};
      this.itemsProxy.forEach(function (item) {
        if (!_this.isLoincCode(item)) return;
        var code = item.coding_code,
          display = item.coding_display;
        if (!code || Object.keys(codes).indexOf(code) >= 0) return;
        var mapping = _this.cdpMappingNames;
        if (mapping.indexOf(code) >= 0) return;
        codes[code] = display;
      });
      return codes;
    },
    /**
     * used to display the selected codes in the export table
     */
    exportItems: function exportItems() {
      var items = [];
      var selected_codes = (0,toConsumableArray/* default */.Z)(this.selected_codes);
      for (var _i2 = 0, _Object$entries2 = Object.entries(this.selectable); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = (0,slicedToArray/* default */.Z)(_Object$entries2[_i2], 2),
          code = _Object$entries2$_i[0],
          label = _Object$entries2$_i[1];
        var entry = {
          code: code,
          label: label
        };
        if (selected_codes.indexOf(code) >= 0 && items.indexOf(entry) < 0) items.push(entry);
      }
      return items;
    },
    fields: function fields() {
      return this.custom_fields;
    },
    cdpMappingNames: function cdpMappingNames() {
      var names = this.$store.getters['project/mappingSourceNames'];
      return names;
    }
  },
  watch: {
    items: {
      immediate: true,
      /**
       * reset the selected codes when the items are updated
       */
      handler: function handler() {
        this.selected_codes = [];
      }
    },
    selected_codes: function selected_codes(newValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === Object.keys(this.selectable).length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ObservationsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var tables_ObservationsTablevue_type_script_lang_js_ = (ObservationsTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ObservationsTable.vue?vue&type=style&index=0&id=13ffc694&prod&scoped=true&lang=css&
var ObservationsTablevue_type_style_index_0_id_13ffc694_prod_scoped_true_lang_css_ = __webpack_require__(7023);
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ObservationsTable.vue?vue&type=style&index=0&id=13ffc694&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ObservationsTable.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  tables_ObservationsTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "13ffc694",
  null
  
)

/* harmony default export */ var ObservationsTable = (component.exports);

/***/ }),

/***/ 6003:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ResourceTable; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules
var objectSpread2 = __webpack_require__(5926);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ResourceTable.vue?vue&type=template&id=cabf33a4&scoped=true&

var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-table', _vm._b({
    staticClass: "my-2",
    attrs: {
      "fields": _vm.fields
    },
    scopedSlots: _vm._u([{
      key: "cell()",
      fn: function fn(data) {
        return [_c('span', {
          domProps: {
            "innerHTML": _vm._s(_vm.$attrs.markText(data.value))
          }
        })];
      }
    }])
  }, 'b-table', (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, _vm.$attrs), _vm.$props), false))], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue?vue&type=template&id=cabf33a4&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(4819);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ResourceTable.vue?vue&type=script&lang=js&





/* harmony default export */ var ResourceTablevue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  computed: {
    fields: function fields() {
      var fields = this.setFields(this.items);
      return fields;
    }
  },
  methods: {
    /**
     * build a list of fields based on the
     * keys of the items.
     * set the `sortable` property for all
     */
    setFields: function setFields(items) {
      var duplicateChecker = []; //store keys here to check for duplicates
      var fields = (0,toConsumableArray/* default */.Z)(items).reduce(function (accumulator, item) {
        Object.keys(item).forEach(function (key) {
          if (duplicateChecker.indexOf(key) < 0) {
            var field = {
              key: key,
              sortable: true
            };
            accumulator.push(field);
            duplicateChecker.push(key);
          }
        });
        return accumulator;
      }, []);
      return fields;
    }
  },
  props: {
    stacked: {
      type: Boolean,
      defaults: false
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var tables_ResourceTablevue_type_script_lang_js_ = (ResourceTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/endpoints/tables/ResourceTable.vue?vue&type=style&index=0&id=cabf33a4&prod&scoped=true&lang=css&
var ResourceTablevue_type_style_index_0_id_cabf33a4_prod_scoped_true_lang_css_ = __webpack_require__(2460);
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue?vue&type=style&index=0&id=cabf33a4&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/endpoints/tables/ResourceTable.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  tables_ResourceTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "cabf33a4",
  null
  
)

/* harmony default export */ var ResourceTable = (component.exports);

/***/ }),

/***/ 88:
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
___CSS_LOADER_EXPORT___.push([module.id, ".expander[data-v-6adeaa6d]{cursor:pointer}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1372:
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
___CSS_LOADER_EXPORT___.push([module.id, ".table-wrapper[data-v-13ffc694] .select-wrapper{text-align:center;margin:50% auto}.table-wrapper[data-v-13ffc694] .b-table-stacked .select-wrapper{text-align:left;margin:auto}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7582:
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
___CSS_LOADER_EXPORT___.push([module.id, ".icon[data-v-cabf33a4]{-webkit-transition-delay:0s;transition-delay:0s;-webkit-transition-duration:.1s;transition-duration:.1s;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transform:rotate(0);transform:rotate(0)}.stacked .icon[data-v-cabf33a4]{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2196:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("a51df1e8", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 7023:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1372);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("1f91868a", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 2460:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7582);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("25c0d488", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);