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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/blocks/menu.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/menu.js":
/*!*******************************!*\
  !*** ./src/js/blocks/menu.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_menu_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/menu.scss */ "./src/scss/blocks/menu.scss");
/* harmony import */ var _scss_blocks_menu_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_blocks_menu_scss__WEBPACK_IMPORTED_MODULE_0__);

document.addEventListener('DOMContentLoaded', function () {
  var waitMenu = document.querySelector('.t461'),
      timer;
  var menuHeight = waitMenu.offsetHeight;
  var isTopOfPage;

  var refresh = function refresh() {
    waitMenu.classList.remove('slideDwn');
  };

  window.addEventListener('scroll', function () {
    isTopOfPage = (window.scrollY || window.pageYOffset) <= 5;
    waitMenu.classList.add('slideDwn');

    if (timer) {
      clearTimeout(timer);
    }

    if (!isTopOfPage) {
      timer = setTimeout(refresh, 600);
      waitMenu.classList.add('t461_cyan');
    } else {
      waitMenu.classList.remove('t461_cyan');
    }
  });
  window.addEventListener('mousemove', function (event) {
    isTopOfPage = (window.scrollY || window.pageYOffset) <= 5;

    if (event.clientY <= menuHeight) {
      waitMenu.classList.add('slideDwn');
    } else if (!isTopOfPage) {
      waitMenu.classList.remove('slideDwn');
    }
  });
  waitMenu.classList.add('slideDwn');
  $('div[data-record-type="257"]').hover(function () {
    waitMenu.addClass('slideDwn'); //Обнуляем таймер

    clearTimeout(timer);
  }, function () {
    timer = setTimeout(refresh, 600);
  });
});

/***/ }),

/***/ "./src/scss/blocks/menu.scss":
/*!***********************************!*\
  !*** ./src/scss/blocks/menu.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=menu.js.map