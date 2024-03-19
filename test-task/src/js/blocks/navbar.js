import BaseClass from "../base-class.js";

export default class Navbar extends BaseClass {
    navbarTop = 0

    constructor(selector = '') {
        super(selector);
        this.navbarTop = this.elements[0].offsetTop;
    }

    attachEvents() {
        super.attachEvents();

        if ( !this.elements[0] ) {
            return;
        }

        this.toggleFixed();
        window.addEventListener( 'scroll', this.toggleFixed.bind( this ) );
    }

    toggleFixed() {
        this.elements[0].classList[`${window.scrollY > this.navbarTop ? 'add' : 'remove'}`]( 'navbar-sticky' );
    }
}