"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkfhir_data_tool"] = (typeof self !== 'undefined' ? self : this)["webpackChunkfhir_data_tool"] || []).push([[171],{

/***/ 7171:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ DateRange; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DateRange.vue?vue&type=template&id=74dc344e&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-form-group', {
    attrs: {
      "label": "From",
      "label-for": "date-start-input",
      "label-cols": "2"
    }
  }, [_c('b-input-group', [_c('b-form-input', {
    attrs: {
      "id": "date-start-input",
      "state": !_vm.$v.from.$invalid,
      "value": _vm.from,
      "placeholder": "YYYY-MM-DD",
      "autocomplete": "off"
    },
    on: {
      "input": function input($event) {
        return _vm.$emit('update:from', $event);
      }
    }
  }), _c('b-input-group-append', [_c('b-form-datepicker', _vm._b({
    attrs: {
      "value": _vm.from,
      "max": _vm.to
    },
    on: {
      "input": function input($event) {
        return _vm.$emit('update:from', $event);
      }
    }
  }, 'b-form-datepicker', _vm.defaultAttributes, false))], 1)], 1)], 1), _c('b-form-group', {
    attrs: {
      "label": "To",
      "label-for": "date-end-input",
      "label-cols": "2"
    }
  }, [_c('b-input-group', [_c('b-form-input', {
    attrs: {
      "id": "date-end-input",
      "state": !_vm.$v.to.$invalid,
      "value": _vm.to,
      "placeholder": "YYYY-MM-DD",
      "autocomplete": "off"
    },
    on: {
      "input": function input($event) {
        return _vm.$emit('update:to', $event);
      }
    }
  }), _c('b-input-group-append', [_c('b-form-datepicker', _vm._b({
    attrs: {
      "value": _vm.to,
      "min": _vm.from
    },
    on: {
      "input": function input($event) {
        return _vm.$emit('update:to', $event);
      }
    }
  }, 'b-form-datepicker', _vm.defaultAttributes, false))], 1)], 1)], 1)], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(381);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DateRange.vue?vue&type=script&lang=js&

var isValidDate = function isValidDate(value) {
  if (value == '' || value == null) return true;
  var validformat = 'YYYY-MM-DD';
  return moment_default()(value, validformat).format(validformat) === value;
};
/* harmony default export */ var DateRangevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      defaultAttributes: {
        'show-decade-nav': true,
        'button-only': true,
        'right': true,
        'today-button': true,
        'reset-button': true,
        'close-button': true,
        'date-format-options': {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
      }
    };
  },
  props: {
    from: {
      type: [Date, String],
      default: null
    },
    to: {
      type: [Date, String],
      default: null
    }
  },
  validations: function validations() {
    return {
      from: {
        isValidDate: isValidDate
      },
      to: {
        isValidDate: isValidDate
      }
    };
  }
});
;// CONCATENATED MODULE: ./src/components/DateRange.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DateRangevue_type_script_lang_js_ = (DateRangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/DateRange.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  components_DateRangevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DateRange = (component.exports);

/***/ })

}]);