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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/blocks/scrollbar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/scrollbar.js":
/*!************************************!*\
  !*** ./src/js/blocks/scrollbar.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_scrollbar_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/scrollbar.scss */ "./src/scss/blocks/scrollbar.scss");
/* harmony import */ var _scss_blocks_scrollbar_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_blocks_scrollbar_scss__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Scrollbar = /*#__PURE__*/function () {
  function Scrollbar() {
    _classCallCheck(this, Scrollbar);

    /**
     * @see https://learn.javascript.ru/mousewheel
     * @type {string}
     */
    this.event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'MozMousePixelScroll';
    this.data = {
      _scrollTop: 0,
      scrollDir: 1
    };
    this.isDesktop = window.innerWidth > 1100;
    this.initData();
    this.data.scrollTop = window.scrollY;

    if (!this.isDesktop) {
      this.attachTouchEvents();
      return;
    }

    this.calcScrollHeight();
    this.attachEvents();
    this.initScrollBar();
  }

  _createClass(Scrollbar, [{
    key: "calcScrollHeight",
    value: function calcScrollHeight() {
      this.data.scrollHeight = document.body.scrollHeight - window.innerHeight;
    }
  }, {
    key: "initData",
    value: function initData() {
      Object.defineProperty(this.data, 'scrollTop', {
        enumerable: true,
        get: function get() {
          return this._scrollTop;
        },
        set: function set(value) {
          if (value < 0) {
            value = 0;
          } else if (value > this.scrollHeight) {
            value = this.scrollHeight;
          }

          this.scrollDir = Math.sign(value - this._scrollTop);
          this._scrollTop = value;
          window.scrollTo({
            top: this._scrollTop
          });
        }
      });
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var _this = this;

      this.options = [];
      Scrollbar.defaultOptions.forEach(function (option) {
        _this.options[option.name] = _this.el.dataset[option.name] || option["default"];
      });
    }
  }, {
    key: "initScrollBar",
    value: function initScrollBar() {
      this.el = document.querySelector('.scrollbar');

      if (!this.el) {
        return;
      }

      this.getOptions();
      this.slider = this.el.querySelector('.scrollbar__slider');
      this.progress = this.slider.querySelector('.scrollbar__fulfil-progress');
      this.setOptions();
      this.attachScrollbarEvents();
    }
  }, {
    key: "setOptions",
    value: function setOptions() {
      this.el.style.backgroundColor = this.options['lineColor'];
      this.el.style.setProperty('--width', "".concat(this.options['width'], "px"));
      this.slider.style.backgroundColor = this.options['sliderColor'];
      this.progress.style.backgroundColor = this.options['indicatorColor'];
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      var _this2 = this;

      document.addEventListener(this.event, function (event) {
        _this2.handleWheelEvent(event);
      });
    }
  }, {
    key: "attachScrollbarEvents",
    value: function attachScrollbarEvents() {
      var _this3 = this;

      window.addEventListener('scroll', function () {
        _this3.calcScrollHeight();

        _this3.calcSliderPosition();
      });
      window.addEventListener('resize', function () {
        _this3.calcScrollHeight();

        _this3.calcSliderPosition();
      });
      this.el.addEventListener('click', function (event) {
        if (event.target.closest('.scrollbar__slider') || _this3.clickedTarget) {
          return;
        }

        _this3.data.scrollTop = event.offsetY / event.target.offsetHeight * _this3.data.scrollHeight;
      });
      this.slider.addEventListener('mousedown', function (event) {
        _this3.sliderDragStart(event);
      });
      document.addEventListener('mousemove', function (event) {
        _this3.sliderDragMove(event);
      });
      document.addEventListener('mouseup', function (event) {
        _this3.sliderDragEnd(event);
      });
    }
  }, {
    key: "attachTouchEvents",
    value: function attachTouchEvents() {
      var _this4 = this;

      document.addEventListener('touchstart', function (event) {
        _this4.touch = true;
        _this4.touchY = event.changedTouches[0].pageY;
        _this4.prevScrollY = _this4.data.scrollTop;
      });
      document.addEventListener('touchmove', function (event) {
        if (!_this4.touch) {
          return;
        }

        var scrollDiff = event.changedTouches[0].pageY - _this4.touchY;
        _this4.data.scrollTop = _this4.prevScrollY - scrollDiff;
      });
      document.addEventListener('touchend', function (event) {
        _this4.touch = false;

        _this4.scrollDecay();
      });
    }
  }, {
    key: "scrollDecay",
    value: function scrollDecay() {
      var _this5 = this;

      var scrollDiff = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      var diff = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
      var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      if (diff < 0) {
        return;
      }

      this.data.scrollTop += this.data.scrollDir * diff;

      if (time > 0) {
        setTimeout(function () {
          _this5.scrollDecay(scrollDiff - 10, time - 20, diff - step, ++step);
        }, 50);
      }
    }
  }, {
    key: "sliderDragStart",
    value: function sliderDragStart(event) {
      this.clickedTarget = event.target.closest('.scrollbar__slider');
      this.sliderClicked = true;
    }
  }, {
    key: "sliderDragMove",
    value: function sliderDragMove(event) {
      if (!this.sliderClicked) {
        return;
      }

      this.data.scrollTop = event.clientY / this.el.offsetHeight * this.data.scrollHeight;
    }
  }, {
    key: "sliderDragEnd",
    value: function sliderDragEnd(event) {
      if (this.clickedTarget) {
        this.sliderClicked = false;
        this.clickedTarget = null;
      }
    }
  }, {
    key: "handleWheelEvent",
    value: function handleWheelEvent(event) {
      this.data.scrollTop += event.deltaY / this.options['slowParam'];
      this.scrollDecay();
    }
  }, {
    key: "calcSliderPosition",
    value: function calcSliderPosition() {
      var scrollRatio = window.scrollY / this.data.scrollHeight;
      var sliderTop = (this.el.offsetHeight - this.slider.offsetHeight) * scrollRatio;
      var progressHeight = this.slider.offsetHeight * scrollRatio;
      this.slider.style.top = "".concat(sliderTop, "px");
      this.progress.style.height = "".concat(progressHeight, "px");
    }
  }]);

  return Scrollbar;
}();

_defineProperty(Scrollbar, "defaultOptions", [{
  name: 'indicatorColor',
  "default": 'transparent'
}, {
  name: 'lineColor',
  "default": 'transparent'
}, {
  name: 'sliderColor',
  "default": '#000000'
}, {
  name: 'slowParam',
  "default": 1
}, {
  name: 'width',
  "default": 10
}, {
  name: 'decay',
  "default": 10
}]);

document.addEventListener('DOMContentLoaded', function () {
  new Scrollbar();
});

/***/ }),

/***/ "./src/scss/blocks/scrollbar.scss":
/*!****************************************!*\
  !*** ./src/scss/blocks/scrollbar.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=scrollbar.js.map