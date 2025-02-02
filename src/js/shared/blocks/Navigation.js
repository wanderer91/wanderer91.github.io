export default class Navigation {
    element = null

    constructor(selector = '') {
        this.element = document.querySelector(selector);

        this.navbarCollapse();
        this.attachEvents();
    }

    attachEvents() {
        window.addEventListener("scroll", this.navbarCollapse);
    }

    navbarCollapse() {
        if (!this.element) {
            return;
        }

        this.element.classList[window.scrollY > 100 ? "add" : "remove"]("navbar-shrink");
    }
}
