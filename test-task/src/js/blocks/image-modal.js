import BaseClass from "../base-class.js";
import { Modal } from "bootstrap";

export default class ImageModal extends BaseClass {
    attachEvents() {
        if (!this.elements[0]) {
            return;
        }

        super.attachEvents();

        document.addEventListener('click', (e) => {
            const img = e.target.closest('img');

            if (!img) {
                return;
            }

            if (img.dataset.popup === 'false') {
                return;
            }

            const modal = new Modal(this.elements[0]),
                modalImage = new Image(),
                src = !!img.dataset.ref ? document.querySelector(img.dataset.ref).src : img.src;
            
            modalImage.src = src;
            modalImage.addEventListener('load', () => {
                modal.show();
            });    
            this.elements[0].querySelector('.modal-body').appendChild(modalImage);
        });

        document.addEventListener('hidden.bs.modal', (e) => {
            if (e.target !== document.querySelector(this.selector)) {
                return;
            }

            e.target.querySelector('.modal-body').innerHTML = '';
        });
    }
}