import "../../scss/blocks/svg-preloader.scss";

let preloader, preloaderSvg, preloaderStyle, animationTimeout;
const preloaderSelector = '.svg-preloader';

const retrieveOptions = (preloader) => {

    const options = [
        {name: 'backgroundColor', default: '#242424'},
        {name: 'svgWidth', default: '260px'},
        {name: 'colorsCount', default: 10}
    ];

    let optionValues = {};

    options.forEach((option) => {

        optionValues[option.name] = preloader.dataset[option.name] || option.default;

    });

    return optionValues;

};

const generateRandomColors = (count) => {

    let colors = [];

    for (let i = 0; i < count; i++) {

        colors.push(`rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`)

    }

    return colors;

};

const launchColorAnimation = (colors) => {

    let index = -1;

    const animateColor = () => {

        index < colors.length - 1 ? index ++ : index = 0;

        preloaderStyle.textContent = `${preloaderSelector}__svg .svg-path { fill: ${colors[index]}; }`;

        animationTimeout = setTimeout(animateColor, 50);
    };

    animationTimeout = setTimeout(animateColor, 0);

};

document.addEventListener('DOMContentLoaded', () => {

    preloader = document.querySelector(preloaderSelector);
    preloaderSvg = preloader.querySelector(`${preloaderSelector}__svg`);

    const {backgroundColor, svgWidth, colorsCount} = retrieveOptions(preloader);

    preloader.style.backgroundColor = `${backgroundColor}`;
    preloaderSvg.style.width = `${svgWidth}`;

    preloaderStyle = document.createElement('style');
    preloaderStyle.id = preloaderSelector.substring(1);
    document.head.appendChild(preloaderStyle);

    launchColorAnimation(generateRandomColors(colorsCount));

    setTimeout(() => {
        preloader.classList.add('hidden');
        preloaderSvg.style.width = '0';

        setTimeout(() => {
            document.body.style.overflow = 'hidden';

            clearTimeout(animationTimeout);
        }, 800);
    }, 1000);

});
