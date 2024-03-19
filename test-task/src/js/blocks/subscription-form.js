import BaseClass from "../base-class.js";

export default class SubscriptionForm extends BaseClass {
    attachEvents() {
        if (!this.elements[0]) {
            return;
        }

        super.attachEvents();

        this.elements[0].addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailField = e.target.querySelector('[name="email"]'),
                email = emailField.value.trim();
            if (!email) {
                return;
            }

            const res = await fetch(`subscription.json?email=${email}`),
                data = res.json(),
                submitBtn = e.target.querySelector('.form__submit');    

            submitBtn.querySelector('.button__text').innerText = data.message;
            submitBtn.classList.add('button-thanks');    
        });
    }
}