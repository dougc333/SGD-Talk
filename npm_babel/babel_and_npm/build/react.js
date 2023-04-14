"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = A;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function A() {
  return "hello";
}

_reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(A, null), document.getElementsById("root"));