import BaseClass from "../base-class.js";
import { Modal } from 'bootstrap';

export default class Appointment extends BaseClass {
    /**
     * @var {HTMLElement}
     */
    modal = null
    /**
     * @var {String}
     */
    modalId = 'appointment-modal'

    constructor(selector = '') {
        super(selector);
        this.modal = document.getElementById( this.modalId );
    }

    attachEvents() {
        super.attachEvents();

        document.body.addEventListener( 'click', ( e ) => {
            const link = e.target.closest( this.selector );

            if ( !link ) {
                return;
            }

            const modal = new Modal( this.modal );
            modal.show();
        } );

        document.addEventListener('hidden.bs.modal', (e) => {
            if (e.target.id !== this.modalId) {
                return;
            }

            e.target.querySelector('.form').reset();
        });
    }
}