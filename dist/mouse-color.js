!function(n){var o={};function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=5)}({5:function(t,e,n){"use strict";n.r(e);n(6);document.addEventListener("DOMContentLoaded",function(){var n,y=document.querySelectorAll(".mouse-color")||[],L=[],o=0;function O(t){for(var e={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15},n=[],o=0;o<6;o+=2){for(var r=t.substring(o,o+2),a=0,u=0;u<r.length;u++)a+=parseInt(e[r[u].toLowerCase()])*Math.pow(16,r.length-u-1);n.push(a)}return n}function P(n,o,r,a,u,t){var e,c=!(5<arguments.length&&void 0!==t)||t;(e=function(t,e){for(;t.parentNode;){if(t.parentNode.classList&&t.parentNode.classList.contains(e))return t.parentNode;t=t.parentNode}return!1}(o,"mouse-color"))&&(o=e),n&&(n="touchmove"===n.type?n.targetTouches[0]:n,a=a||n.clientX-L[r].rect.left,u=u||n.clientY-L[r].rect.top);var i,f,l,s,d=o.offsetWidth/2,g=o.offsetHeight/2,h=(l=(i={A:u-g,B:d-a}).A*(f={A:-g,B:0}).A+i.B*f.B,s=Math.sqrt(Math.pow(i.A,2)+Math.pow(i.B,2))*Math.sqrt(Math.pow(f.A,2)+Math.pow(f.B,2)),180*Math.acos(l/s)/Math.PI),p=function(t,e){for(var n=L[e].colors,o=0;o<n.length;o++)if(!(n[o].angle>t)){var r=o<n.length-1?o+1:0,a=o<n.length-1?n[o+1].angle:360;if(n[o].angle<=t&&t<=a)return[{angle:n[o].angle,rgb:O(n[o].value)},{angle:a,rgb:O(n[r].value)}]}}(h=a<d?360-h:h,r),b=Math.abs(h-p[0].angle)/Math.abs(p[1].angle-p[0].angle),v=p[0].rgb[0]+Math.round((p[1].rgb[0]-p[0].rgb[0])*b),M=p[0].rgb[1]+Math.round((p[1].rgb[1]-p[0].rgb[1])*b),m=p[0].rgb[2]+Math.round((p[1].rgb[2]-p[0].rgb[2])*b);o.style.backgroundColor="rgb(".concat(v,", ").concat(M,", ").concat(m,")"),c&&y.forEach(function(t,e){e!==r&&P(n,t,e,a*t.offsetWidth/o.offsetWidth,u*t.offsetHeight/o.offsetHeight,!1)})}function f(t,e){o=360<=(o+=5)?o-360:o,P(null,t,e,t.offsetWidth/2+t.offsetWidth/3*Math.sin(o*Math.PI/180),t.offsetHeight/2-t.offsetHeight/3*Math.cos(o*Math.PI/180)),n=setTimeout(function(){f(t,e)},50)}function l(){clearTimeout(n)}y.forEach(function(t,e){var n,o,r,a,u,c,i=t.dataset.colors;i&&(i=t.dataset.colors.trim().split(/\s*,\s*/)).length&&(n=parseInt(t.dataset.rotateDir),L[e]={colors:(r=n,a=360/(o=i).length,r<0&&(o=o.reverse()),o.map(function(t,e){return{value:t,angle:a*e}})),rect:t.getBoundingClientRect(),rotateDir:n},t.style.backgroundColor="#".concat(i[Math.floor(Math.random()*i.length)]),c=e,(u=t).addEventListener("mousemove",function(t){l(),P(t,t.target,c)}),u.addEventListener("touchmove",function(t){l(),P(t,t.target,c)}),u.addEventListener("mouseout",function(t){f(y[0],0)}),u.addEventListener("touchend",function(t){f(y[0],0)}))}),f(y[0],0)})},6:function(t,e,n){}});