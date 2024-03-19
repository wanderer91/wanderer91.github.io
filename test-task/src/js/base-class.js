export default class BaseClass {
    /**
     * @var {NodeList|HTMLElement[]}
     */
    elements = []
    /**
     * @var {String}
     */
    selector = ''

    constructor(selector = '') {
        this.selector = selector;
        this.elements = document.querySelectorAll(selector);
        this.attachEvents();
    }

    attachEvents() {

    }
}