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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/blocks/waves.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/waves.js":
/*!********************************!*\
  !*** ./src/js/blocks/waves.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_waves_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/waves.scss */ "./src/scss/blocks/waves.scss");
/* harmony import */ var _scss_blocks_waves_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_blocks_waves_scss__WEBPACK_IMPORTED_MODULE_0__);


function factorial(n) {
  if (n > 1) {
    return n * factorial(n - 1);
  }

  return 1;
}

function combination(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function bezierFunc(t, points) {
  var point = [0, 0];
  points.forEach(function (p, i, arr) {
    point[0] += combination(arr.length - 1, i) * Math.pow(1 - t, arr.length - 1 - i) * Math.pow(t, i) * p[0];
    point[1] += combination(arr.length - 1, i) * Math.pow(1 - t, arr.length - 1 - i) * Math.pow(t, i) * p[1];
  });
  return point;
}

function generateBezierPoints(waveWidth, waveHeight) {
  return [[0, 0.9 * waveHeight], [0.25 * waveWidth, 0.8 * waveHeight], [0.25 * waveWidth, 0], [0.5 * waveWidth, 0], [0.75 * waveWidth, 0], [0.75 * waveWidth, 0.8 * waveHeight], [waveWidth, 0.9 * waveHeight]];
}

var waveWrapper = document.querySelector('.waves');
var waveWidth = waveWrapper.offsetWidth;
var waveHeight = waveWrapper.offsetHeight;
var waves = waveWrapper.querySelectorAll('.waves__item');

for (var j = 0; j < waves.length; j++) {
  var clipPath = ['0% 100%'];
  var t = 0;
  var bezierPoints = generateBezierPoints(waveWidth, waveHeight);

  do {
    var point = bezierFunc(t, bezierPoints);
    clipPath.push("".concat(point[0] / waveWidth * 100, "% ").concat(point[1] / waveHeight * 100, "%"));
    t += 0.01;
  } while (t <= 1.04);

  clipPath.push('100% 100%');
  clipPath = clipPath.join(',');
  waveWrapper.innerHTML += "<style>.waves__item:nth-child(".concat(j + 1, ") {") + "clip-path: polygon(".concat(clipPath, ");") + "-webkit-clip-path: polygon(".concat(clipPath, ");") + '} </style>';
}

/***/ }),

/***/ "./src/scss/blocks/waves.scss":
/*!************************************!*\
  !*** ./src/scss/blocks/waves.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=waves.js.map