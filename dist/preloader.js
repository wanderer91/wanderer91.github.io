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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/blocks/preloader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/preloader.js":
/*!************************************!*\
  !*** ./src/js/blocks/preloader.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_preloader_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/preloader.scss */ "./src/scss/blocks/preloader.scss");
/* harmony import */ var _scss_blocks_preloader_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_blocks_preloader_scss__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


document.addEventListener('DOMContentLoaded', function () {
  var isMobile = window.innerWidth <= 980;
  var preloaderSelector = ".preloader_".concat(isMobile ? 'mobile' : 'desktop');
  var digitsSelector = '.preloader__digits';
  var preloader,
      digits,
      progress = 0,
      progressBar,
      timeout,
      canvas,
      context,
      canvasWidth,
      canvasHeight;
  var lightningStopped = false;

  window.onload = function () {
    clearTimeout(timeout);
    setTimeout(function () {
      document.body.style.overflow = 'auto';
      lightningStopped = true;
    }, 2000);
    progress = 100;
    digits.innerText = "".concat(progress, "%");

    if (progressBar) {
      progressBar.style.width = "".concat(progress, "%");
    }

    preloader.classList.add('hidden');
  };

  function initCommonPreloader() {
    document.body.style.overflow = 'hidden';
    preloader = document.querySelector(preloaderSelector);
    digits = preloader.querySelector(digitsSelector);
    preloader.style = "font-size: ".concat(preloader.dataset.fontSize, "px;") + "font-family: ".concat(preloader.dataset.fontFamily, ";") + "background-color: #".concat(preloader.dataset.backgroundColor);
    digits.style = "color: #".concat(preloader.dataset.digitsColor);
  }

  function initDesktopPreloader() {
    canvas = preloader.querySelector('.preloader__canvas');

    function launchCounter() {
      progress += 1;
      digits.innerText = "".concat(progress, "%");

      if (progress < 100) {
        timeout = setTimeout(launchCounter, 50);
      }
    }

    initCanvas();
    launchLightningLoop();
    launchCounter();
  }

  function initMobilePreloader() {
    progressBar = preloader.querySelector('.preloader__progressbar');
    progressBar.style.backgroundColor = "#".concat(preloader.dataset.progressColor);

    function launchCounter() {
      progress += 1;
      var progressText = "".concat(progress, "%");
      digits.innerText = progressText;
      digits.setAttribute('data-progress', progressText);
      progressBar.style.width = progressText;

      if (progress < 100) {
        timeout = setTimeout(launchCounter, 50);
      }
    }

    launchCounter();
  }

  var Lightning = /*#__PURE__*/function () {
    function Lightning(start, end, side) {
      _classCallCheck(this, Lightning);

      this.start = start;
      this.end = end;
      this.side = side;
      this.points = [];
      this.offsetValue = Math.random() * 30 - 50;
    }

    _createClass(Lightning, [{
      key: "generate",
      value: function generate() {
        var diffX = this.end[0] - this.start[0];
        var diffY = this.end[1] - this.start[1];
        var isVerticalSide = Lightning.verticalSides().indexOf(this.side) >= 0;
        var stepsCount = Math.ceil(Math.random() * (isVerticalSide ? canvasHeight : canvasWidth) / 50) + 10;
        var xInc = diffX / stepsCount;
        var yInc = diffY / stepsCount;
        this.points.push(this.start);
        var stepsCounter = 0;

        do {
          var nextPoint = void 0,
              prevPoint = this.points[this.points.length - 1];

          if (isVerticalSide) {
            nextPoint = [prevPoint[0] + xInc * (Math.random() * 0.3 + 0.7), prevPoint[1] + yInc + (Math.random() < 0.5 ? -1 : 1) * Math.random() * this.offsetValue];
          } else {
            nextPoint = [prevPoint[0] + xInc + (Math.random() < 0.5 ? -1 : 1) * Math.random() * this.offsetValue, prevPoint[1] + yInc * (Math.random() * 0.3 + 0.7)];
          }

          this.points.push(nextPoint);
          stepsCounter++;
        } while (stepsCounter < stepsCount);

        this.points.push(this.end);
        return this;
      }
    }, {
      key: "draw",
      value: function draw(ctx) {
        ctx.lineWidth = Math.ceil(Math.random() * 3) + 1;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, ".concat(Math.random() * 0.9 + 0.1, ")");
        ctx.shadowColor = "rgba(255, 255, 255, ".concat(Math.random() * 0.9 + 0.1, ")");
        ctx.shadowBlur = Math.round(Math.random() * 20 + 5);

        for (var i = 0; i < this.points.length - 1; i++) {
          ctx.moveTo.apply(ctx, _toConsumableArray(this.points[i]));
          ctx.lineTo.apply(ctx, _toConsumableArray(this.points[i + 1]));
        }

        ctx.stroke();
        ctx.closePath();
      }
    }], [{
      key: "sides",
      value: function sides() {
        return ['left', 'top', 'right', 'bottom'];
      }
    }, {
      key: "verticalSides",
      value: function verticalSides() {
        return [this.sides()[0], this.sides()[2]];
      }
    }]);

    return Lightning;
  }();

  function generateLightnings() {
    var randomSide = Math.floor(Math.random() * Lightning.sides().length);
    var sideName = Lightning.sides()[randomSide];

    for (var i = 0; i < Math.round(Math.random() * 3); i++) {
      var startPoint = sideName === 'left' ? [10, Math.random() * canvasHeight] : sideName === 'top' ? [Math.random() * canvasWidth, 10] : sideName === 'right' ? [canvasWidth - 10, Math.random() * canvasHeight] : [Math.random() * canvasWidth, canvasHeight - 10];
      var endPoint = sideName === 'left' ? [canvasWidth / 2 - Math.random() * 30, canvasHeight / 2 + digits.offsetHeight / 2 * (2 * Math.random() - 1)] : sideName === 'top' ? [canvasWidth / 2 + digits.offsetWidth / 2 * (2 * Math.random() - 1), canvasHeight / 2 - Math.random() * 20] : sideName === 'right' ? [canvasWidth / 2 + Math.random() * 30, canvasHeight / 2 + digits.offsetHeight / 2 * (2 * Math.random() - 1)] : [canvasWidth / 2 + digits.offsetWidth / 2 * (2 * Math.random() - 1), canvasHeight / 2 + Math.random() * 20];
      var lightning = new Lightning(startPoint, endPoint, sideName).generate();
      lightning.draw(context);
    }
  }

  function initCanvas() {
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d');
    context.fillStyle = 'rgb(0, 0, 0)';
    context.lineCap = 'round';
  }

  function launchLightningLoop() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    generateLightnings();

    if (!lightningStopped) {
      setTimeout(launchLightningLoop, 50 + Math.random() * 150);
    }
  }

  function init() {
    initCommonPreloader();
    isMobile ? initMobilePreloader() : initDesktopPreloader();
  }

  init();
  window.addEventListener('resize', function () {
    init();
  });
});

/***/ }),

/***/ "./src/scss/blocks/preloader.scss":
/*!****************************************!*\
  !*** ./src/scss/blocks/preloader.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=preloader.js.map