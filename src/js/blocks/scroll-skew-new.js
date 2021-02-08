import {interp} from '../helpers/math';

let skewedElements, lastScrollY = 0;

const raf = requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame;

const initScrollSkews = () => {

    skewedElements = document.querySelectorAll('.scroll-skew');

    if (!skewedElements.length) {
        return;
    }

    if (raf) {

        raf(skewByScroll);

    }
};

const skewElements = (elements) => {

    const skewSubFunction = (deg) => {

        elements.forEach((el) => {
            el.style.transform = `skewY(${deg}deg)`;
        });

    };

    lastScrollY = interp(lastScrollY, window.translatePageY, 0.1);

    const deg = (lastScrollY - window.translatePageY) / window.innerHeight * 10;

    if (Math.abs(deg) > 1e-3) { // 0.001
        skewSubFunction(deg);
    }

};

const skewByScroll = () => {

    skewElements(skewedElements);

    raf(skewByScroll);

};

document.addEventListener('DOMContentLoaded', () => {

    initScrollSkews();

    window.addEventListener('translatePage', (event) => {
        window.translatePageY = event.detail.scrollTop;
    })

});
