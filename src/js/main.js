import "../scss/main.scss";
import $ from "jquery";
import axios from "axios";
import Projects from "./index/blocks/Projects.js";
import Tools from "./index/blocks/Tools.js";
import Demo from "./index/blocks/Demo.js";
import ScrollToTop from "./shared/blocks/ScrollToTop.js";
import ScrollTriggerLink from "./shared/blocks/ScrollTriggerLink.js";
import Navigation from "./shared/blocks/Navigation.js";
import Modal from "./shared/blocks/Modal.js";
import Footer from "./shared/blocks/Footer.js";

window.$ = $;
window.axios = axios;

document.addEventListener("DOMContentLoaded", () => {
    new Navigation("#mainNav");
    ScrollTriggerLink.attachEvents();
    new Projects(".portfolio__row");
    new Tools(".skills .section__content");
    new Demo(".demo .section__content");
    new ScrollToTop();
    new Footer(".footer");
    Modal.attachEvents();
});
