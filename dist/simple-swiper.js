(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function s(t){return void 0===t&&(t={}),JSON.parse(JSON.stringify(t))}function i(t,e){void 0===t&&(t={}),void 0===e&&(e={});var s=Object.keys(t);s.length&&s.forEach((function(s){var n=s;"object"==typeof t[n]?(void 0===e[n]&&(e[n]={}),i(t[n],e[n])):e[n]=t[n]}))}t.d(e,{A:()=>n});const n=function(){function t(t,e){void 0===t&&(t=""),void 0===e&&(e={}),this.options={},this.defaultOptions={nav:{arrows:!0,dots:!0},margin:20,stagePadding:30,items:1,swiping:!1,maxSwipingVertAngle:45,theme:"default",breakpoints:{768:{swiping:!0}}},this.userOptions={},this.state={currentItem:0,el:null,stage:null,inner:null,swiperWidth:0,itemWidth:0,initialized:!1,items:[],swiping:{startX:null,startY:null}},this.selector="",this.swipingHandlers={},t&&(this.selector=t,this.userOptions=e,this.initSwipingHandlers(),this.init())}return t.prototype.initSwipingHandlers=function(){this.swipingHandlers.mousedown=this.swipeStart.bind(this),this.swipingHandlers.touchstart=this.swipeStart.bind(this),this.swipingHandlers.mousemove=this.swipeDrag.bind(this),this.swipingHandlers.touchmove=this.swipeDrag.bind(this),this.swipingHandlers.mouseout=this.swipeEnd.bind(this),this.swipingHandlers.mouseup=this.swipeEnd.bind(this),this.swipingHandlers.touchend=this.swipeEnd.bind(this),this.swipingHandlers.touchcancel=this.swipeEnd.bind(this)},t.prototype.getBreakPointOptions=function(){if(!this.options.breakpoints)return null;for(var t=Object.keys(this.options.breakpoints),e=null,i=0;i<t.length;i++){var n=+t[i];if(window.innerWidth>=n)break;e=s(this.options.breakpoints[n])}return e},t.prototype.applyOptions=function(){this.options=s(this.defaultOptions),i(this.userOptions,this.options);var t=this.getBreakPointOptions();t&&i(t,this.options)},t.prototype.attachEvents=function(){var t=this,e=null;window.addEventListener("resize",(function(){e&&clearTimeout(e),e=setTimeout((function(){t.init()}),300)})),this.state.el.addEventListener("click",(function(e){var s=e.target.closest(".s-swiper__dot");s&&(t.state.currentItem=parseInt(s.getAttribute("data-index")),t.translateStage())})),this.state.el.addEventListener("click",(function(e){var s=e.target.closest(".s-swiper__arrow");s&&!s.classList.contains("disabled")&&(s.classList.contains("prev")&&0===t.state.currentItem||s.classList.contains("next")&&t.state.currentItem===t.state.items.length-1||(t.state.currentItem+=s.classList.contains("prev")?-1:1,t.translateStage()))}))},t.prototype.getEvent=function(t){return(null==t?void 0:t.changedTouches)?t.changedTouches[0]:t},t.prototype.isSwipingAngleBig=function(t){var e,s,i,n;return e=[{x:this.state.swiping.startX,y:this.state.swiping.startY},{x:t.clientX,y:this.state.swiping.startY}],s=[{x:this.state.swiping.startX,y:this.state.swiping.startY},{x:t.clientX,y:t.clientY}],i=Math.sqrt(Math.pow(e[1].x-e[0].x,2)+Math.pow(e[1].y-e[0].y,2)),n=Math.sqrt(Math.pow(s[1].x-s[0].x,2)+Math.pow(s[1].y-s[0].y,2)),180*Math.acos(i/n)/Math.PI>this.options.maxSwipingVertAngle},t.prototype.isSwiping=function(){return!!this.state.swiping.startX},t.prototype.swipeStart=function(t){var e=this.getEvent(t);!e.target.closest(".s-swiper__item")||void 0!==e.button&&0!==e.button||(console.log(e),t.preventDefault(),this.state.swiping.startX=e.clientX,this.state.swiping.startY=e.clientY)},t.prototype.swipeDrag=function(t){if(this.isSwiping()){var e=this.getEvent(t);if(e.target.closest(".s-swiper__item")&&!this.isSwipingAngleBig(e)){t.preventDefault();var s=e.clientX-this.state.swiping.startX,i=this.calculateTranslate()-s;this.state.stage.style.transform="translateX(".concat(i>0?"-".concat(i):-i,"px)")}}},t.prototype.swipeEnd=function(t){if(this.isSwiping()){var e=this.getEvent(t);if(e.target.closest(".s-swiper__item")&&!this.isSwipingAngleBig(e)){t.preventDefault();var s=Math.sign(e.clientX-this.state.swiping.startX),i=this.state.currentItem<this.state.items.length-1&&s<0||this.state.currentItem>0&&s>0;this.state.currentItem+=i?-s:0,this.translateStage(),this.state.swiping={startX:null,startY:null}}}},t.prototype.detachSwipingEvents=function(){var t=this;Object.keys(this.swipingHandlers).forEach((function(e){t.state.inner.removeEventListener(e,t.swipingHandlers[e])}))},t.prototype.attachSwipingEvents=function(){var t=this;this.detachSwipingEvents(),this.options.swiping&&Object.keys(this.swipingHandlers).forEach((function(e){t.state.inner.addEventListener(e,t.swipingHandlers[e])}))},t.prototype.calculateTranslate=function(){return(this.state.itemWidth+this.options.margin)*this.state.currentItem},t.prototype.translateStage=function(){this.state.stage.style.transform="translateX(-".concat(this.calculateTranslate(),"px)"),this.changeActiveDot(),this.checkArrowAccess()},t.prototype.checkArrowAccess=function(){var t=this.state.el.querySelector(".s-swiper__arrow.prev"),e=this.state.el.querySelector(".s-swiper__arrow.next");t.classList[0===this.state.currentItem?"add":"remove"]("disabled"),e.classList[this.state.currentItem===this.state.items.length-1?"add":"remove"]("disabled")},t.prototype.changeActiveDot=function(){var t=this.state.el.querySelector(".s-swiper__dot.active");if(t){var e=this.state.el.querySelectorAll(".s-swiper__dot");t.classList.remove("active"),e[this.state.currentItem].classList.add("active")}},t.prototype.setStyles=function(){this.state.stage=this.state.el.querySelector(".s-swiper__stage"),this.state.inner.style.marginLeft="".concat(this.options.stagePadding,"px"),this.state.inner.style.marginRight="".concat(this.options.stagePadding,"px");var t=getComputedStyle(this.state.el);this.state.swiperWidth=parseFloat(t.getPropertyValue("width")),this.state.itemWidth=this.state.swiperWidth-2*this.options.stagePadding,this.state.el.style.setProperty("--stage-padding","".concat(this.options.stagePadding,"px"));var e=this.state.el.querySelector(".s-swiper__dots");e&&(this.state.el.style.paddingBottom="".concat(e.scrollHeight,"px"),this.state.el.style.setProperty("--dots-height","".concat(e.scrollHeight,"px")));for(var s=0;s<this.state.items.length;s++)this.state.items[s].style.width="".concat(this.state.itemWidth,"px"),this.state.items[s].style.marginRight="".concat(this.options.margin,"px");this.state.stage.style.width="".concat((this.state.itemWidth+this.options.margin)*this.state.items.length,"px"),this.state.stage.style.transform="translateX(-".concat(this.calculateTranslate(),"px)")},t.prototype.resetStyles=function(){this.state.el.removeAttribute("style"),this.state.stage.removeAttribute("style"),this.state.inner.removeAttribute("style");for(var t=0;t<this.state.items.length;t++)this.state.items[t].removeAttribute("style")},t.prototype.initNavigation=function(){this.options.nav.dots&&function(t,e){void 0===e&&(e=0);var s=document.createElement("div");s.classList.add("s-swiper__dots"),t.appendChild(s);for(var i=0;i<e;i++){var n=document.createElement("span");n.classList.add("s-swiper__dot"),0===i&&n.classList.add("active"),n.setAttribute("data-index","".concat(i)),s.appendChild(n)}}(this.state.el,this.state.items.length),this.options.nav.arrows&&function(t){var e=document.createElement("div");e.classList.add("s-swiper__arrows"),t.appendChild(e);var s=document.createElement("span");s.classList.add("s-swiper__arrow","prev","disabled"),e.appendChild(s);var i=document.createElement("span");i.classList.add("s-swiper__arrow","next"),e.appendChild(i)}(this.state.el)},t.prototype.initState=function(){this.state.el=document.querySelector(this.selector),this.state.el.classList.add("s-swiper",this.options.theme),function(t){var e=document.createElement("div");e.classList.add("s-swiper__inner");var s=document.createElement("div");for(s.classList.add("s-swiper__stage"),e.appendChild(s);t.children.length;){var i=document.createElement("div");i.classList.add("s-swiper__item"),i.appendChild(t.children[0]),s.appendChild(i)}t.appendChild(e)}(this.state.el),this.state.inner=this.state.el.querySelector(".s-swiper__inner"),this.state.items=this.state.el.querySelectorAll(".s-swiper__item")},t.prototype.init=function(){this.applyOptions(),this.state.initialized?this.resetStyles():(this.initState(),this.initNavigation(),this.attachEvents(),this.state.initialized=!0),this.setStyles(),this.attachSwipingEvents()},t}();var a=e.A;class r{elements=null;constructor(t="code"){this.elements=document.querySelectorAll(t),this.init()}init(){this.elements.forEach((t=>{if(t.classList.add("code-block"),"false"===t.dataset.copy)return void t.classList.add("code-block--transparent");t.classList.add("d-block","pe-4"),t.innerHTML=`<span class="d-block overflow-x-auto pb-2 ps-2 pt-2"><span class="code-block__text text-nowrap">${t.innerHTML}</span></span>`;const e=document.createElement("span");e.classList.add("code-block__copy-btn"),e.setAttribute("title","Copy"),e.innerHTML='<i class="fa fa-copy"></i>',t.appendChild(e),e.addEventListener("click",(async t=>{const e=t.target,s=e.closest(".code-block").querySelector(".code-block__text").innerHTML.split(/\n|\r|\r\n/).filter((t=>!!t.trim())),i=s.map((t=>t.trim().replace(/<br\s*\/?>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&nbsp;/g," "))).join("\n");await navigator.clipboard.writeText(i),e.classList.remove("fa-copy"),e.classList.add("fa-check")}))}))}}document.addEventListener("DOMContentLoaded",(()=>{new a("#swiper"),new r}))})();