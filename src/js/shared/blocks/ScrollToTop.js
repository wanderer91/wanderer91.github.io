import '../../../scss/shared/scroll-to-top.scss';
import { renderScrollToTopButton } from "../../index/views/scroll-to-top.js";

export default class ScrollToTop {
    element = null;

    constructor() {
        this.init();
    }

    init() {
        const scrollToTopBtn = document.createElement('div');
        scrollToTopBtn.innerHTML = renderScrollToTopButton();
        
        document.body.appendChild(scrollToTopBtn);
        this.element = scrollToTopBtn;

        this.attachEvents();
    }

    attachEvents() {
        window.addEventListener('scroll', () => {
            $(this.element.firstElementChild)[`fade${window.scrollY > 100 ? "In" : "Out"}`]();
        });
    }
}
