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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/blocks/svg-preloader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/svg-preloader.js":
/*!****************************************!*\
  !*** ./src/js/blocks/svg-preloader.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_svg_preloader_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/svg-preloader.scss */ "./src/scss/blocks/svg-preloader.scss");
/* harmony import */ var _scss_blocks_svg_preloader_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_blocks_svg_preloader_scss__WEBPACK_IMPORTED_MODULE_0__);

var preloader, preloaderSvg, preloaderStyle, animationTimeout;
var preloaderSelector = '.svg-preloader';

var retrieveOptions = function retrieveOptions(preloader) {
  var options = [{
    name: 'backgroundColor',
    "default": '#242424'
  }, {
    name: 'svgWidth',
    "default": '260px'
  }, {
    name: 'colorsCount',
    "default": 10
  }, {
    name: 'animationTime',
    "default": 300
  }];
  var optionValues = {};
  options.forEach(function (option) {
    optionValues[option.name] = preloader.dataset[option.name] || option["default"];
  });
  return optionValues;
};

var generateRandomColors = function generateRandomColors(count) {
  var colors = [];

  for (var i = 0; i < count; i++) {
    colors.push("rgb(".concat(Math.round(Math.random() * 255), ", ").concat(Math.round(Math.random() * 255), ", ").concat(Math.round(Math.random() * 255), ")"));
  }

  return colors;
};

var launchColorAnimation = function launchColorAnimation(colors) {
  var index = -1;

  var animateColor = function animateColor() {
    index < colors.length - 1 ? index++ : index = 0;
    preloaderStyle.textContent = "".concat(preloaderSelector, "__svg .svg-path { fill: ").concat(colors[index], "; }");
    animationTimeout = setTimeout(animateColor, 50);
  };

  animationTimeout = setTimeout(animateColor, 0);
};

document.addEventListener('DOMContentLoaded', function () {
  preloader = document.querySelector(preloaderSelector);
  preloaderSvg = preloader.querySelector("".concat(preloaderSelector, "__svg"));

  var _retrieveOptions = retrieveOptions(preloader),
      backgroundColor = _retrieveOptions.backgroundColor,
      svgWidth = _retrieveOptions.svgWidth,
      colorsCount = _retrieveOptions.colorsCount;

  preloader.style = "background-color: ".concat(backgroundColor, ";");
  preloaderSvg.style = "width: ".concat(svgWidth, "px;");
  preloaderStyle = document.createElement('style');
  preloaderStyle.id = preloaderSelector.substring(1);
  document.head.appendChild(preloaderStyle);
  launchColorAnimation(generateRandomColors(colorsCount));
});
window.addEventListener('load', function () {
  setTimeout(function () {
    preloaderSvg.style = "width: ".concat(parseFloat(getComputedStyle(preloaderSvg).width) * 0.4, "px;");
    setTimeout(function () {
      clearTimeout(animationTimeout);
      preloader.classList.add('hidden');
    }, 300);
  }, 1000);
});

/***/ }),

/***/ "./src/scss/blocks/svg-preloader.scss":
/*!********************************************!*\
  !*** ./src/scss/blocks/svg-preloader.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=svg-preloader.js.map