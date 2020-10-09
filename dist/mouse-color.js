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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/blocks/mouse-color.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/mouse-color.js":
/*!**************************************!*\
  !*** ./src/js/blocks/mouse-color.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_blocks_mouse_color_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/blocks/mouse-color.scss */ "./src/scss/blocks/mouse-color.scss");
/* harmony import */ var _scss_blocks_mouse_color_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_blocks_mouse_color_scss__WEBPACK_IMPORTED_MODULE_0__);

document.addEventListener('DOMContentLoaded', function () {
  var colorBlocks = document.querySelectorAll('.mouse-color') || [];
  var colorBlocksData = [];
  var changeColorTimeout,
      angle = 0;

  function getParentbyClassName(elem, className) {
    while (elem.parentNode) {
      if (elem.parentNode.classList && elem.parentNode.classList.contains(className)) {
        return elem.parentNode;
      }

      elem = elem.parentNode;
    }

    return false;
  }

  function colorAllocation(colors, rotateDir) {
    var angle = 360 / colors.length;

    if (rotateDir < 0) {
      colors = colors.reverse();
    }

    return colors.map(function (color, i) {
      return {
        value: color,
        angle: angle * i
      };
    });
  }

  function hexToRgb(hex) {
    var alph = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
    };
    var rgb = [];

    for (var i = 0; i < 6; i += 2) {
      var hexNumber = hex.substring(i, i + 2);
      var dec = 0;

      for (var j = 0; j < hexNumber.length; j++) {
        dec += parseInt(alph[hexNumber[j].toLowerCase()]) * Math.pow(16, hexNumber.length - j - 1);
      }

      rgb.push(dec);
    }

    return rgb;
  }

  function betweenLinesAngle(line1, line2) {
    var num = line1.A * line2.A + line1.B * line2.B;
    var delim = Math.sqrt(Math.pow(line1.A, 2) + Math.pow(line1.B, 2)) * Math.sqrt(Math.pow(line2.A, 2) + Math.pow(line2.B, 2));
    var phiRadians = Math.acos(num / delim);
    return phiRadians * 180 / Math.PI;
  }

  function findColorRange(angle, blockIndex) {
    var blockColors = colorBlocksData[blockIndex].colors;

    for (var i = 0; i < blockColors.length; i++) {
      if (blockColors[i].angle > angle) {
        continue;
      }

      var nextAngleIndex = i < blockColors.length - 1 ? i + 1 : 0;
      var nextAngle = i < blockColors.length - 1 ? blockColors[i + 1].angle : 360;

      if (blockColors[i].angle <= angle && nextAngle >= angle) {
        return [{
          angle: blockColors[i].angle,
          rgb: hexToRgb(blockColors[i].value)
        }, {
          angle: nextAngle,
          rgb: hexToRgb(blockColors[nextAngleIndex].value)
        }];
      }
    }
  }

  function calcColor(event, block, index, mouseXOnBlock, mouseYOnBlock) {
    var triggerBlocks = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var parent;

    if (parent = getParentbyClassName(block, 'mouse-color')) {
      block = parent;
    }

    if (event) {
      event = event.type === 'touchmove' ? event.targetTouches[0] : event;

      if (!mouseXOnBlock) {
        mouseXOnBlock = event.clientX - colorBlocksData[index].rect.left;
      }

      if (!mouseYOnBlock) {
        mouseYOnBlock = event.clientY - colorBlocksData[index].rect.top;
      }
    }

    var blockMiddleX = block.offsetWidth / 2;
    var blockMiddleY = block.offsetHeight / 2;
    var angle = betweenLinesAngle({
      A: mouseYOnBlock - blockMiddleY,
      B: blockMiddleX - mouseXOnBlock
    }, {
      A: -blockMiddleY,
      B: 0
    });
    angle = mouseXOnBlock < blockMiddleX ? 360 - angle : angle;
    var colorRange = findColorRange(angle, index);
    var ratio = Math.abs(angle - colorRange[0].angle) / Math.abs(colorRange[1].angle - colorRange[0].angle);
    var r = colorRange[0].rgb[0] + Math.round((colorRange[1].rgb[0] - colorRange[0].rgb[0]) * ratio);
    var g = colorRange[0].rgb[1] + Math.round((colorRange[1].rgb[1] - colorRange[0].rgb[1]) * ratio);
    var b = colorRange[0].rgb[2] + Math.round((colorRange[1].rgb[2] - colorRange[0].rgb[2]) * ratio);
    block.style.backgroundColor = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");

    if (triggerBlocks) {
      colorBlocks.forEach(function (colorBlock, i) {
        if (i !== index) {
          calcColor(event, colorBlock, i, mouseXOnBlock * colorBlock.offsetWidth / block.offsetWidth, mouseYOnBlock * colorBlock.offsetHeight / block.offsetHeight, false);
        }
      });
    }
  }

  function attachColorBlockEvents(block, index) {
    block.addEventListener("mousemove", function (event) {
      stopChangeColor();
      calcColor(event, event.target, index);
    });
    block.addEventListener("touchmove", function (event) {
      stopChangeColor();
      calcColor(event, event.target, index);
    });
    block.addEventListener("mouseout", function (event) {
      launchChangeColor(colorBlocks[0], 0);
    });
    block.addEventListener("touchend", function (event) {
      launchChangeColor(colorBlocks[0], 0);
    });
  }

  function launchChangeColor(block, index) {
    angle += 5;
    angle = angle >= 360 ? angle - 360 : angle;
    calcColor(null, block, index, block.offsetWidth / 2 + block.offsetWidth / 3 * Math.sin(angle * Math.PI / 180), block.offsetHeight / 2 - block.offsetHeight / 3 * Math.cos(angle * Math.PI / 180));
    changeColorTimeout = setTimeout(function () {
      launchChangeColor(block, index);
    }, 50);
  }

  function stopChangeColor() {
    clearTimeout(changeColorTimeout);
  }

  function initColorBlocks() {
    colorBlocks.forEach(function (colorBlock, i) {
      var colors = colorBlock.dataset.colors;

      if (!colors) {
        return;
      }

      colors = colorBlock.dataset.colors.trim().split(/\s*,\s*/);

      if (!colors.length) {
        return;
      }

      var rotateDir = parseInt(colorBlock.dataset.rotateDir);
      colorBlocksData[i] = {
        colors: colorAllocation(colors, rotateDir),
        rect: colorBlock.getBoundingClientRect(),
        rotateDir: rotateDir
      };
      colorBlock.style.backgroundColor = "#".concat(colors[Math.floor(Math.random() * colors.length)]);
      attachColorBlockEvents(colorBlock, i);
    });
  } //initColorBlocks();
  //launchChangeColor(colorBlocks[0], 0);

});

/***/ }),

/***/ "./src/scss/blocks/mouse-color.scss":
/*!******************************************!*\
  !*** ./src/scss/blocks/mouse-color.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=mouse-color.js.map