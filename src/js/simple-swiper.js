import $ from "jquery";
import Swiper from 'js-simple-swiper';
import CodeBlock from './shared/blocks/CodeBlock.js';
import "../scss/demo/simple-swiper.scss";
import ScrollToTop from './shared/blocks/ScrollToTop.js';
import ScrollTriggerLink from "./shared/blocks/ScrollTriggerLink.js";

window.$ = $;

document.addEventListener('DOMContentLoaded', () => {
    ScrollTriggerLink.attachEvents();
    new Swiper('#swiper');
    new CodeBlock();
    new ScrollToTop();
});