/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./increment.js":
/*!**********************!*\
  !*** ./increment.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const add = __webpack_require__(/*! ./math */ \"./math.js\").add;\nexports.increment = function(val) {\n    return add(val, 1);\n};\n\n//# sourceURL=webpack://my-webpack-project/./increment.js?");

/***/ }),

/***/ "./math.js":
/*!*****************!*\
  !*** ./math.js ***!
  \*****************/
/***/ ((__unused_webpack_module, exports) => {

eval("exports.add = function() {\n    var sum = 0, i = 0, args = arguments, l = args.length;\n    while (i < l) {\n        sum += args[i++];\n    }\n    return sum;\n};\n\n//# sourceURL=webpack://my-webpack-project/./math.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!***************!*\
  !*** ./ex.js ***!
  \***************/
eval("const inc = __webpack_require__(/*! ./increment */ \"./increment.js\").increment;\nconst a = 1;\ninc(a); // 2\n\n//# sourceURL=webpack://my-webpack-project/./ex.js?");
})();

/******/ })()
;