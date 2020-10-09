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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/blocks/liquid-text.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/liquid-text.js":
/*!**************************************!*\
  !*** ./src/js/blocks/liquid-text.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', function () {
  var blotterScript = document.createElement('script');
  blotterScript.src = 'vendor/js/blotter.min.js';
  blotterScript.addEventListener('load', drawLiquidText);
  document.body.appendChild(blotterScript);
  var liquidTextSelector = '.liquid-text';
  var liquidTextContentSelector = '.liquid-text__content';
  var elem = document.querySelector(liquidTextSelector);
  var textEl = elem.querySelector(liquidTextContentSelector);
  var angle = 0,
      mousePos = {},
      pointRotatingTimeout = null,
      mouseMoving = false;

  var elemPointRotating = function elemPointRotating() {
    if (angle >= 360) {
      angle = 360 - angle;
    }

    angle += 0.1;
    mousePos.x = window.innerWidth / 2 * (1 + Math.sin(angle * Math.PI / 180));
    mousePos.y = window.innerHeight / 2 * (1 + Math.cos(angle * Math.PI / 180));
    pointRotatingTimeout = setTimeout(elemPointRotating);
  };

  function drawLiquidText() {
    try {
      Blotter.LiquidDistortMaterial = function () {
        Blotter.Material.apply(this, arguments);
      };

      Blotter.LiquidDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

      Blotter._extendWithGettersSetters(Blotter.LiquidDistortMaterial.prototype, function () {
        function _mainImageSrc() {
          return [Blotter.Assets.Shaders.Noise3D, "void mainImage( out vec4 mainImage, in vec2 fragCoord )", "{", "    // Setup ========================================================================", "    vec2 uv = fragCoord.xy / uResolution.xy;", "    float z = uSeed + uGlobalTime * uSpeed;", "    uv += snoise(vec3(uv, z)) * uVolatility;", "    mainImage = textTexture(uv);", "}"].join("\n");
        }

        return {
          constructor: Blotter.LiquidDistortMaterial,
          init: function init() {
            this.mainImage = _mainImageSrc();
            this.uniforms = {
              uSpeed: {
                type: "1f",
                value: 1.0
              },
              uVolatility: {
                type: "1f",
                value: 0.15
              },
              uSeed: {
                type: "1f",
                value: 0.1
              }
            };
          }
        };
      }());

      var body = document.body;
      var docEl = document.documentElement;
      var MathUtils = {
        lineEq: function lineEq(y2, y1, x2, x1, currentVal) {
          // y = mx + b
          var m = (y2 - y1) / (x2 - x1),
              b = y1 - m * x1;
          return m * currentVal + b;
        },
        lerp: function lerp(a, b, n) {
          return (1 - n) * a + n * b;
        },
        distance: function distance(x1, x2, y1, y2) {
          var a = x1 - x2;
          var b = y1 - y2;
          return Math.hypot(a, b);
        }
      };
      var winsize;

      var calcWinsize = function calcWinsize() {
        return winsize = {
          width: window.innerWidth,
          height: window.innerHeight
        };
      };

      calcWinsize();
      window.addEventListener("resize", calcWinsize);

      var getMousePos = function getMousePos(ev) {
        var posx = 0;
        var posy = 0;
        if (!ev) ev = window.event;

        if (ev.pageX || ev.pageY) {
          posx = ev.pageX;
          posy = ev.pageY;
        } else if (ev.clientX || ev.clientY) {
          posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
          posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }

        return {
          x: posx,
          y: posy
        };
      };

      mousePos = {
        x: winsize.width / 2,
        y: winsize.height / 2
      };

      var moveHandler = function moveHandler(ev) {
        mousePos = getMousePos(ev);
        clearTimeout(pointRotatingTimeout);
        pointRotatingTimeout = setTimeout(elemPointRotating, 0);
      };

      window.addEventListener("mousemove", moveHandler);
      window.addEventListener("touchmove", moveHandler);

      var createBlotterText = function createBlotterText() {
        var text = new Blotter.Text(textEl.innerHTML, {
          family: "sans-serif",
          weight: 700,
          size: elem.dataset.fontSize,
          paddingLeft: 100,
          paddingRight: 100,
          paddingTop: 100,
          paddingBottom: 100,
          fill: elem.dataset.fillColor
        });
        elem.removeChild(textEl);
        var material = new Blotter.LiquidDistortMaterial();
        material.uniforms.uSpeed.value = 1;
        material.uniforms.uVolatility.value = 0;
        material.uniforms.uSeed.value = 0.1;
        var blotter = new Blotter(material, {
          texts: text
        });
        var scope = blotter.forText(text);
        scope.appendTo(elem);
        var lastMousePosition = {
          x: winsize.width / 2,
          y: winsize.height / 2
        };
        var volatility = 0;

        var render = function render() {
          var docScrolls = {
            left: body.scrollLeft + docEl.scrollLeft,
            top: body.scrollTop + docEl.scrollTop
          };
          var relmousepos = {
            x: mousePos.x - docScrolls.left,
            y: mousePos.y - docScrolls.top
          };
          var mouseDistance = MathUtils.distance(lastMousePosition.x, relmousepos.x, lastMousePosition.y, relmousepos.y);
          volatility = MathUtils.lerp(volatility, Math.min(MathUtils.lineEq(0.9, 0, 100, 0, mouseDistance), 0.9), 0.05);
          material.uniforms.uVolatility.value = volatility;
          lastMousePosition = {
            x: relmousepos.x,
            y: relmousepos.y
          };
          requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
      };

      pointRotatingTimeout = setTimeout(elemPointRotating, 0);
      createBlotterText();
    } catch (e) {
      alert(e.message);
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=liquid-text.js.map