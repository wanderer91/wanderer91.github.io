import "../../scss/blocks/svg-preloader.scss";

let preloader, preloaderSvg, preloaderStyle, animationTimeout;
const preloaderSelector = '.svg-preloader';

const retrieveOptions = (preloader) => {

    const options = [
        {name: 'backgroundColor', default: '#242424'},
        {name: 'svgWidth', default: '260px'},
        {name: 'colorsCount', default: 10},
        {name: 'animationTime', default: 300}
    ];

    let optionValues = {};

    options.forEach((option) => {

        optionValues[option.name] = preloader.dataset[option.name] || option.default;

    });

    return optionValues;

};

const appendPreloader = () => {
    document.body.innerHTML += '<div class="svg-preloader" data-background-color="#242424" data-svg-width="260" data-colors-count="20">\n' +
        '    <div class="svg-preloader__content">\n' +
        '        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.65 25.89" class="svg-preloader__svg">\n' +
        '            <defs><style> .svg-path { fill: #17f060; } </style> </defs>\n' +
        '            <title>Ресурс 4</title>\n' +
        '            <g id="Слой_2" data-name="Слой 2">\n' +
        '                <g id="Слой_1-2" data-name="Слой 1">\n' +
        '                    <path class="svg-path" d="M9,.34H0V18.39l11.69,0c-.29-3.57-.57-7.14-.86-10.7l-1,0C9.51,5.24,9.24,2.79,9,.34ZM3.05,6H6.93L7.08,7.7h-4Zm5,6.85h-5V11.21h5Z" transform="translate(0 -0.25)"/>\n' +
        '                    <path class="svg-path" d="M19.43,2.65V.37H12.25v18h7.18V15.79l-2.53.62Q16.78,10,16.67,3.55Z" transform="translate(0 -0.25)"/>\n' +
        '                    <path class="svg-path" d="M29.4.35v18H26.87v-.1c0-5.13,0-10.25,0-15.39L22.64,5.06c0,4.42.07,8.82.1,13.24v.1H20.22V3.06c.9-.9,1.8-1.82,2.71-2.71Z" transform="translate(0 -0.25)"/>\n' +
        '                    <path d="M36.6.31a.1.1,0,0,1,0,0H33a.1.1,0,0,1,0,0c-.93.91-1.83,1.83-2.75,2.75h0V15.48h0c.92.92,1.82,1.84,2.75,2.75a.1.1,0,0,1,0,.05h3.59a.1.1,0,0,1,0-.05c.93-.91,1.84-1.84,2.76-2.76V3.07C38.44,2.15,37.53,1.22,36.6.31Zm.23,12.48H32.7V8.26l4.13-2.32Z" transform="translate(0 -0.25)"/>\n' +
        '                    <path class="svg-path" d="M36.6.31a.1.1,0,0,1,0,0H33a.1.1,0,0,1,0,0c-.93.91-1.83,1.83-2.75,2.75V15.49c.92.92,1.82,1.84,2.75,2.75a.1.1,0,0,1,0,.05h3.59a.1.1,0,0,1,0-.05c.93-.91,1.84-1.84,2.76-2.76V3.07C38.44,2.15,37.53,1.22,36.6.31Zm.23,10.26-4.13.08V8.26l4.13-2.32Z" transform="translate(0 -0.25)"/>\n' +
        '                    <path class="svg-path" d="M40.14.25v18h2.7V10.34l5.27.61L50,.25Zm7.12,9H42.84V7.87l4.42,0Z" transform="translate(0 -0.25)"/>\n' +
        '                    <rect class="svg-path" x="54.45" y="18.04" width="2.52" height="0.8"/>\n' +
        '                    <path class="svg-path" d="M59.74.26H52.45c-.57.44-1.13.89-1.71,1.31V3.28h3.71v15H57v-15l4,0Z" transform="translate(0 -0.25)"/>\n' +
        '                    <g>\n' +
        '                        <path class="svg-path" d="M70.65,15.48v2.81H61.47v-5.5h6.89l2.29,2.29Z" transform="translate(0 -0.25)"/>\n' +
        '                        <path class="svg-path" d="M70.65,5.21v.73H64V7.61H61.47V.25H65.7Z" transform="translate(0 -0.25)"/>\n' +
        '                        <path class="svg-path" d="M67.45,8.15l-.66,2.65L64,11.12v1.67H61.47V7.61H64Z" transform="translate(0 -0.25)"/>\n' +
        '                    </g>\n' +
        '                    <path class="svg-path" d="M0,19.81v5.1H7.74v1.23h4.37V24.9h7.73v-5.1ZM7.74,23H4.37V21.8H7.74Zm7.74,0H12.1V21.79h3.37Z" transform="translate(0 -0.25)"/>\n' +
        '                    <polygon class="svg-path" points="36.35 21.51 36.35 19.52 20.48 19.53 20.48 25.87 36.35 25.85 36.35 23.92 24.78 23.93 24.78 23.34 34.17 23.33 34.17 22.1 24.78 22.11 24.78 21.53 36.35 21.51"/>\n' +
        '                    <polygon class="svg-path" points="52.9 21.49 52.9 19.49 37.03 19.51 37.04 25.85 52.91 25.83 52.91 23.9 41.4 23.91 41.4 21.5 52.9 21.49"/>\n' +
        '                    <polygon class="svg-path" points="53.45 19.49 53.45 21.49 59.87 21.48 59.87 25.82 64.23 25.82 64.23 21.48 70.64 21.47 70.64 19.47 53.45 19.49"/>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </svg>\n' +
        '    </div>\n' +
        '</div>';
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

    appendPreloader();

    preloader = document.querySelector(preloaderSelector);
    preloaderSvg = preloader.querySelector(`${preloaderSelector}__svg`);

    const {backgroundColor, svgWidth, colorsCount} = retrieveOptions(preloader);

    preloader.style = `background-color: ${backgroundColor}; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`;
    preloaderSvg.style= `width: ${svgWidth}px;`;

    preloaderStyle = document.createElement('style');
    preloaderStyle.id = preloaderSelector.substring(1);
    document.head.appendChild(preloaderStyle);

    launchColorAnimation(generateRandomColors(colorsCount));

});

window.addEventListener('load', () => {

    setTimeout(() => {

        preloaderSvg.style = `width: ${parseFloat(getComputedStyle(preloaderSvg).width) * 0.4}px;`;

        setTimeout(() => {
            clearTimeout(animationTimeout);

            preloader.classList.add('hidden');
        }, 300);
    }, 1000);

});
