export default class Footer {
    element = null

    constructor(selector = '') {
        this.element = document.querySelector(selector);

        if (!this.element) {
            return;
        }

        this.element.querySelector('.footer__year').textContent = new Date().getFullYear();
    }
}