(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function s(t,e){void 0===t&&(t={}),void 0===e&&(e={});var i=Object.keys(t);i.length&&i.forEach((function(i){var a=i;"object"==typeof t[a]?(void 0===e[a]&&(e[a]={}),s(t[a],e[a])):e[a]=t[a]}))}t.d(e,{A:()=>i});const i=function(){function t(t,e){void 0===t&&(t=""),this.options={nav:{arrows:!0,dots:!0},margin:20,stagePadding:30,items:1,swiping:!0,maxSwipingVertAngle:45,theme:"default",breakpoints:{768:{swiping:!0}}},this.state={currentItem:0,el:null,stage:null,inner:null,swiperWidth:0,itemWidth:0,initialized:!1,items:[],swiping:{startX:null,startY:null}},this.selector="",t&&(this.selector=t,this.applyOptions(e),this.init())}return t.prototype.applyOptions=function(t){void 0===t&&(t={}),s(t,this.options)},t.prototype.attachEvents=function(){var t=this,e=null;window.addEventListener("resize",(function(){e&&clearTimeout(e),e=setTimeout((function(){t.init()}),300)})),this.state.el.addEventListener("click",(function(e){var s=e.target.closest(".s-swiper__dot");s&&(t.state.currentItem=parseInt(s.getAttribute("data-index")),t.translateStage())})),this.state.el.addEventListener("click",(function(e){var s=e.target.closest(".s-swiper__arrow");s&&!s.classList.contains("disabled")&&(s.classList.contains("prev")&&0===t.state.currentItem||s.classList.contains("next")&&t.state.currentItem===t.state.items.length-1||(t.state.currentItem+=s.classList.contains("prev")?-1:1,t.translateStage()))}))},t.prototype.getEvent=function(t){return(null==t?void 0:t.changedTouches)?t.changedTouches[0]:t},t.prototype.isSwipingAngleBig=function(t){var e,s,i,a;return e=[{x:this.state.swiping.startX,y:this.state.swiping.startY},{x:t.clientX,y:this.state.swiping.startY}],s=[{x:this.state.swiping.startX,y:this.state.swiping.startY},{x:t.clientX,y:t.clientY}],i=Math.sqrt(Math.pow(e[1].x-e[0].x,2)+Math.pow(e[1].y-e[0].y,2)),a=Math.sqrt(Math.pow(s[1].x-s[0].x,2)+Math.pow(s[1].y-s[0].y,2)),180*Math.acos(i/a)/Math.PI>this.options.maxSwipingVertAngle},t.prototype.isSwiping=function(){return!!this.state.swiping.startX},t.prototype.swipeStart=function(t){},t.prototype.swipeDrag=function(t){},t.prototype.swipeEnd=function(t){},t.prototype.attachSwipingEvents=function(){},t.prototype.calculateTranslate=function(){return(this.state.itemWidth+this.options.margin)*this.state.currentItem},t.prototype.translateStage=function(){this.state.stage.style.transform="translateX(-".concat(this.calculateTranslate(),"px)"),this.changeActiveDot(),this.checkArrowAccess()},t.prototype.checkArrowAccess=function(){var t=this.state.el.querySelector(".s-swiper__arrow.prev"),e=this.state.el.querySelector(".s-swiper__arrow.next");t.classList[0===this.state.currentItem?"add":"remove"]("disabled"),e.classList[this.state.currentItem===this.state.items.length-1?"add":"remove"]("disabled")},t.prototype.changeActiveDot=function(){var t=this.state.el.querySelector(".s-swiper__dot.active");if(t){var e=this.state.el.querySelectorAll(".s-swiper__dot");t.classList.remove("active"),e[this.state.currentItem].classList.add("active")}},t.prototype.setStyles=function(){this.state.stage=this.state.el.querySelector(".s-swiper__stage"),this.state.inner.style.marginLeft="".concat(this.options.stagePadding,"px"),this.state.inner.style.marginRight="".concat(this.options.stagePadding,"px");var t=getComputedStyle(this.state.el);this.state.swiperWidth=parseFloat(t.getPropertyValue("width")),this.state.itemWidth=this.state.swiperWidth-2*this.options.stagePadding,this.state.el.style.setProperty("--stage-padding","".concat(this.options.stagePadding,"px"));var e=this.state.el.querySelector(".s-swiper__dots");e&&(this.state.el.style.paddingBottom="".concat(e.scrollHeight,"px"),this.state.el.style.setProperty("--dots-height","".concat(e.scrollHeight,"px")));for(var s=0;s<this.state.items.length;s++)this.state.items[s].style.width="".concat(this.state.itemWidth,"px"),this.state.items[s].style.marginRight="".concat(this.options.margin,"px");this.state.stage.style.width="".concat((this.state.itemWidth+this.options.margin)*this.state.items.length,"px"),this.state.stage.style.transform="translateX(-".concat(this.calculateTranslate(),"px)")},t.prototype.resetStyles=function(){this.state.el.removeAttribute("style"),this.state.stage.removeAttribute("style"),this.state.inner.removeAttribute("style");for(var t=0;t<this.state.items.length;t++)this.state.items[t].removeAttribute("style")},t.prototype.initNavigation=function(){this.options.nav.dots&&function(t,e){void 0===e&&(e=0);var s=document.createElement("div");s.classList.add("s-swiper__dots"),t.appendChild(s);for(var i=0;i<e;i++){var a=document.createElement("span");a.classList.add("s-swiper__dot"),0===i&&a.classList.add("active"),a.setAttribute("data-index","".concat(i)),s.appendChild(a)}}(this.state.el,this.state.items.length),this.options.nav.arrows&&function(t){var e=document.createElement("div");e.classList.add("s-swiper__arrows"),t.appendChild(e);var s=document.createElement("span");s.classList.add("s-swiper__arrow","prev","disabled"),e.appendChild(s);var i=document.createElement("span");i.classList.add("s-swiper__arrow","next"),e.appendChild(i)}(this.state.el)},t.prototype.initState=function(){this.state.el=document.querySelector(this.selector),this.state.el.classList.add("s-swiper",this.options.theme),function(t){var e=document.createElement("div");e.classList.add("s-swiper__inner");var s=document.createElement("div");for(s.classList.add("s-swiper__stage"),e.appendChild(s);t.children.length;){var i=document.createElement("div");i.classList.add("s-swiper__item"),i.appendChild(t.children[0]),s.appendChild(i)}t.appendChild(e)}(this.state.el),this.state.inner=this.state.el.querySelector(".s-swiper__inner"),this.state.items=this.state.el.querySelectorAll(".s-swiper__item")},t.prototype.init=function(){this.state.initialized?this.resetStyles():(this.initState(),this.initNavigation(),this.attachEvents(),this.state.initialized=!0),this.setStyles()},t}();var a=e.A;document.addEventListener("DOMContentLoaded",(()=>{new a("#swiper")}))})();