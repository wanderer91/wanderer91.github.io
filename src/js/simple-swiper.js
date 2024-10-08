import Swiper from 'js-simple-swiper';
import CodeBlock from './shared/blocks/CodeBlock.js';
import "../scss/demo/simple-swiper.scss";

document.addEventListener('DOMContentLoaded', () => {
    new Swiper('#swiper');
    new CodeBlock('code');
});