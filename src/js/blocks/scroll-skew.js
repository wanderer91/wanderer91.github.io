let skewedElements;

const initScrollSkews = () => {

    skewedElements = document.querySelectorAll('.scroll-skew');

    if (!skewedElements.length) {
        return;
    }

    skewByScroll(skewedElements);
};

const skewElements = (elements, diff) => {

    const skewSubFunction = (deg) => {
        elements.forEach((el) => {
            el.style = `transform: skewY(${deg}deg);`
        });
    };

    skewSubFunction(diff / 70);

    new Promise((resolve) => {
        setTimeout(resolve, 250);
    }).then(() => {
        skewSubFunction(-diff / 70);

        return new Promise((resolve => {
            setTimeout(resolve, 250);
        }))
    }).then(() => {
        skewSubFunction(0);
    });

};

const skewByScroll = (skewedElements) => {

    let scrollTop = window.scrollY;

    window.addEventListener('scroll', () => {

        const scrollDiff = window.scrollY - scrollTop;
        let viewPortElements = [];

        scrollTop = window.scrollY;

        skewedElements.forEach((skewedEl) => {

            const boundingRect = skewedEl.getBoundingClientRect();

            if ((boundingRect.top > 0 && boundingRect.top < window.innerHeight) ||
                (boundingRect.bottom > 0 && boundingRect.bottom < window.innerHeight)) {

                viewPortElements.push(skewedEl);
            }

        });

        skewElements(viewPortElements, scrollDiff);

    });

};

document.addEventListener('DOMContentLoaded', () => {

    initScrollSkews();

});
