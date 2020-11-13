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
            el.style = `transform: skewY(${deg}deg);`
        });
    };

    lastScrollY = interp(lastScrollY, window.scrollY, 0.1);
    lastScrollY = Math.floor(lastScrollY * 100) / 100;

    const diff = window.scrollY - lastScrollY;
    const deg = -diff / window.innerHeight * 4;

    skewSubFunction(deg);

};

const skewByScroll = () => {

    let viewPortElements = [];

    skewedElements.forEach((skewedEl) => {

        const boundingRect = skewedEl.getBoundingClientRect();

        if ((boundingRect.top > 0 && boundingRect.top < window.innerHeight) ||
            (boundingRect.bottom > 0 && boundingRect.bottom < window.innerHeight)) {

            viewPortElements.push(skewedEl);
        }

    });

    skewElements(viewPortElements);

    raf(skewByScroll);

};

document.addEventListener('DOMContentLoaded', () => {

    initScrollSkews();

});
