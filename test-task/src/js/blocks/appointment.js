import BaseClass from "../base-class.js";
import Modal from 'bootstrap';

export default class Appointment extends BaseClass {
    attachEvents() {
        super.attachEvents();

        document.body.addEventListener('click', (e) => {
            const link = e.target.closest(this.selector);

            if (!link) {
                return;
            }
        });
    }
}