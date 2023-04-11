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

/***/ "./dom.js":
/*!****************!*\
  !*** ./dom.js ***!
  \****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const getUsers = (__webpack_require__(/*! ./users */ \"./users.js\").getUsers);\n\nconst addUserToDOM = (user) => {\n  const ul_element = document.getElementById(\"users\")\n  const node = document.createElement(\"li\")\n  const text = document.createTextNode(user)\n  ul_element.appendChild(node)\n  node.appendChild(text)\n}\n\ndocument.getElementById(\"submit\").addEventListener(\"click\", () => {\n  const input_box = document.getElementById(\"input\")\n  addUserToDOM(input_box.value)\n  input_box.value = \"\"\n})\n\nconst u = getUsers()\nu.map(x => addUserToDOM(x))\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://fourth/./dom.js?");

/***/ }),

/***/ "./users.js":
/*!******************!*\
  !*** ./users.js ***!
  \******************/
/***/ ((module) => {

eval("\nconst users = ['ann', 'bob', 'connie']\n\nconst getUsers = () => {\n    return users\n}\n\nmodule.exports = {\n    getUsers: getUsers\n}\n\n\n\n\n\n//# sourceURL=webpack://fourth/./users.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./dom.js");
/******/ 	
/******/ })()
;