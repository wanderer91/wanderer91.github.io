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


function generateBorderRadiuses(waveWidth) {
  var radiuses = ["".concat((Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100, "%"), "".concat((Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100, "%"), "".concat((Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100, "%"), "".concat((Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100, "%")];
  return radiuses.join(' ');
}

var wavesStyle = '';
var count, counter, isMobile, waveWrapperWidth;

function generateWaveStyles(_ref) {
  var id = _ref.id,
      waveWidth = _ref.waveWidth,
      waveHeight = _ref.waveHeight,
      rotateDir = _ref.rotateDir,
      animationDuration = _ref.animationDuration;
  return ".waves__item#".concat(id, " {") + "width: ".concat(waveHeight, "px;") + "height: ".concat(0.9 * waveWidth, "px;") + "z-index: ".concat(count - counter, ";") + "right: ".concat(-waveWrapperWidth / count + waveWrapperWidth / count * counter, "px;") + "bottom: ".concat((isMobile ? -0.75 : -0.85) * waveHeight, "px;") + "border-radius: ".concat(generateBorderRadiuses(waveWidth), ";") + "transform: rotate(0deg);" + "animation-name: wave_".concat(id, ";") + "animation-duration: ".concat(animationDuration, ";") + "animation-timing-function: linear;" + "animation-iteration-count: infinite;" + "} @keyframes wave_".concat(id, " {") + "0% {transform: rotate(0deg)}" + "50% {transform: rotate(".concat(rotateDir * 180, "deg)}") + "100% {transform: rotate(".concat(rotateDir * 360, "deg)}}");
}

function initWaves(wrapper) {
  var wavePercWidth = parseInt(wrapper.dataset.wavePercWidth);
  var animationDuration = wrapper.dataset.animationDuration;
  count = counter = 0;
  isMobile = window.innerWidth <= 980;
  waveWrapperWidth = wrapper.offsetWidth;
  wrapper.innerHTML = '';
  var wavesData = [{
    perspective: 'front',
    count: wrapper.dataset.frontWavesCount
  }, {
    perspective: 'back',
    count: wrapper.dataset.backWavesCount
  }];
  wavesData.forEach(function (data) {
    var countData = JSON.parse(data.count);

    if (countData.constructor.name === 'Object') {
      for (var bp in countData) {
        if (window.innerWidth >= parseFloat(bp)) {
          data.count = parseInt(countData[bp]);
          count += parseInt(countData[bp]);
        } else {
          break;
        }
      }
    } else {
      data.count = parseInt(countData);
      count += parseInt(countData);
    }
  });
  wavesData.forEach(function (data, i) {
    for (var j = 0; j < data.count; j++) {
      var wave = document.createElement('div');
      var rotateDir = Math.random() < 0.5 ? -1 : 1;
      var id = "".concat(data.perspective).concat(i + 1, "-wave").concat(j + 1);
      wave.className = "waves__item waves__item_".concat(data.perspective);
      wave.setAttribute('id', id);
      wrapper.appendChild(wave);
      var waveWidth = waveWrapperWidth * wavePercWidth / 100;
      var waveHeight = 0.9 * waveWidth;
      wavesStyle += generateWaveStyles({
        id: id,
        waveWidth: waveWidth,
        waveHeight: waveHeight,
        rotateDir: rotateDir,
        animationDuration: animationDuration
      });
      counter++;
    }
  });
  wrapper.innerHTML += "<style>".concat(wavesStyle, "</style>");
}

var waveWrapper = document.querySelectorAll('.waves');
waveWrapper.forEach(function (wrapper) {
  initWaves(wrapper);
  window.addEventListener('resize', function () {
    initWaves(wrapper);
  });
});

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