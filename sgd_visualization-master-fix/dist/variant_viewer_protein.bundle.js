/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./variant_viewer_protein.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./variant_viewer_protein.js":
/*!***********************************!*\
  !*** ./variant_viewer_protein.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar VariantViewer = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'sgd_visualization'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).VariantViewer;\n\nvar vv = new VariantViewer({\n  el: document.getElementById(\"target\"),\n  config: {\n    name: \"FAA1\",\n    strand: \"+\",\n    chromStart: 909343,\n    chromEnd: 911445,\n    isProteinMode: true,\n    proteinLength: 701,\n    isRelative: true,\n    variantDataProtein: [{\n      snpType: \"\",\n      start: 175,\n      variant_type: \"SNP\",\n      score: 1,\n      end: 176\n    }, {\n      snpType: \"\",\n      start: 227,\n      variant_type: \"SNP\",\n      score: 2,\n      end: 228\n    }, {\n      snpType: \"\",\n      start: 496,\n      variant_type: \"SNP\",\n      score: 1,\n      end: 497\n    }],\n    alignedProteinSequences: [{\n      id: 1,\n      name: \"S288C\",\n      href: \"http://yeastgenome.org/strain/S288C/overview\",\n      sequence: \"MVAQYTVPVGKAANEHETAPRRNYQCREKPLVRPPNTKCSTVYEFVLECFQKNKNSNAMGWRDVKEIHEESKSVMKKVDGKETSVEKKWMYYELSHYHYNSFDQLTDIMHEIGRGLVKIGLKPNDDDKLHLYAATSHKWMKMFLGAQSQGIPVVTAYDTLGEKGLIHSLVQTGSKAIFTDNSLLPSLIKPVQAAQDVKYIIHFDSISSEDRRQSGKIYQSAHDAINRIKEVRPDIKTFSFDDILKLGKESCNEIDVHPPGKDDLCCIMYTSGSTGEPKGVVLKHSNVVAGVGGASLNVLKFVGNTDRVICFLPLAHIFELVFELLSFYWGACIGYATVKTLTSSSVRNCQGDLQEFKPTIMVGVAAVWETVRKGILNQIDNLPFLTKKIFWTAYNTKLNMQRLHIPGGGALGNLVFKKIRTATGGQLRYLLNGGSPISRDAQEFITNLICPMLIGYGLTETCASTTILDPANFELGVAGDLTGCVTVKLVDVEELGYFAKNNQGEVWITGANVTPEYYKNEEETSQALTSDGWFKTGDIGEWEANGHLKIIDRKKNLVKTMNGEYIALEKLESVYRSNEYVANICVYADQSKTKPVGIIVPNHAPLTKLAKKLGIMEQKDSSINIENYLEDAKLIKAVYSDLLKTGKDQGLVGIELLAGIVFFDGEWTPQNGFVTSAQKLKRKDILNAVKDKVDAVYSSS*\"\n    }, {\n      id: 3,\n      name: \"FL100\",\n      href: \"http://yeastgenome.org/strain/FL100/overview\",\n      sequence: \"MVAQYTVPVGKAANEHETAPRRNYQCREKPLVRPPNTKCSTVYEFVLECFQKNKNSNAMGWRDVKEIHEESKSVMKKVDGKETSVEKKWMYYELSHYHYNSFDQLTDIMHEIGRGLVKIGLKPNDDDKLHLYAATSHKWMKMFLGAQSQGIPVVTAYDTLGEKGLIHSLVQTGSRAIFTDNSLLPSLIKPVQAAQDVKYIIHFDSISSEDRRQSGKIYQSAHDAINRIKEVRPDIKTFSFDDILKLGKESCNEIDVHPPGKDDLCCIMYTSGSTGEPKGVVLKHSNVVAGVGGASLNVLKFVGNTDRVICFLPLAHIFELVFELLSFYWGACIGYATVKTLTSSSVRNCQGDLQEFKPTIMVGVAAVWETVRKGILNQIDNLPFLTKKIFWTAYNTKLNMQRLHIPGGGALGNLVFKKIRTATGGQLRYLLNGGSPISRDAQEFITNLICPMLIGYGLTETCASTTILDPANFELGVAGDLTGCVTVKLVDVEELGYFAKNNQGEVWITGANVTPEYYKNEEETSQALTSDGWFKTGDIGEWEANGHLKIIDRKKNLVKTMNGEYIALEKLESVYRSNEYVANICVYADQSKTKPVGIIVPNHAPLTKLAKKLGIMEQKDSSINIENYLEDAKLIKAVYSDLLKTGKDQGLVGIELLAGIVFFDGEWTPQNGFVTSAQKLKRKDILNAVKDKVDAVYSSS*\"\n    }, {\n      id: 6,\n      name: \"SK1\",\n      href: \"http://yeastgenome.org/strain/SK1/overview\",\n      sequence: \"MVAQYTVPVGKAANEHETAPRRNYQCREKPLVRPPNTKCSTVYEFVLECFQKNKNSNAMGWRDVKEIHEESKSVMKKVDGKETSVEKKWMYYELSHYHYNSFDQLTDIMHEIGRGLVKIGLKPNDDDKLHLYAATSHKWMKMFLGAQSQGIPVVTAYDTLGEKGLIHSLVQTGSKAIFTDNSLLPSLIKPVQAAQDVKYIIHFDSISSEDRRQSGKIYQSAHDAINKIKEVRPDIKTFSFDDILKLGKESCNEIDVHPPGKDDLCCIMYTSGSTGEPKGVVLKHSNVVAGVGGASLNVLKFVGNTDRVICFLPLAHIFELVFELLSFYWGACIGYATVKTLTSSSVRNCQGDLQEFKPTIMVGVAAVWETVRKGILNQIDNLPFLTKKIFWTAYNTKLNMQRLHIPGGGALGNLVFKKIRTATGGQLRYLLNGGSPISRDAQEFITNLICPMLIGYGLTETCASTTILDPANFELGVAGDLTGCVTVKLVDVEELGYFAKNNQGEVWITGANVTPEYYKNEEETSQALTSDGWFKTGDIGEWEANGHLKIIDRKKNLVKTMNGEYIALEKLESVYRSNEYVANICVYADQSKTKPVGIIVPNHAPLTKLAKKLGIMEQKDSSINIENYLEDAKLIKAVYSDLLKTGKDQGLVGIELLAGIVFFDGEWTPQNGFVTSAQKLKRKDILNAVKDKVDAVYSSS*\"\n    }],\n    domains: [{\n      name: \"G3DSA:2.30.38.10\",\n      id: null,\n      start: 40,\n      end: 63,\n      sourceName: \"Gene3D\",\n      sourceId: 112\n    }, {\n      name: \"G3DSA:2.30.38.10\",\n      id: null,\n      start: 479,\n      end: 554,\n      sourceName: \"Gene3D\",\n      sourceId: 112\n    }, {\n      name: \"G3DSA:2.30.38.10\",\n      id: null,\n      start: 98,\n      end: 196,\n      sourceName: \"Gene3D\",\n      sourceId: 112\n    }, {\n      name: \"G3DSA:2.30.38.10\",\n      id: null,\n      start: 240,\n      end: 273,\n      sourceName: \"Gene3D\",\n      sourceId: 112\n    }, {\n      name: \"G3DSA:2.30.38.10\",\n      id: null,\n      start: 274,\n      end: 373,\n      sourceName: \"Gene4D\",\n      sourceId: 114\n    }, {\n      name: \"G3DSA:2.30.38.10\",\n      id: null,\n      start: 416,\n      end: 470,\n      sourceName: \"Gene3D\",\n      sourceId: 112\n    }]\n  }\n});\n\n//# sourceURL=webpack:///./variant_viewer_protein.js?");

/***/ })

/******/ });