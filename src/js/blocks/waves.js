import "../../scss/blocks/waves.scss";

function generateBorderRadiuses(waveWidth) {

    const radiuses = [
        `${(Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100}%`,
        `${(Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100}%`,
        `${(Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100}%`,
        `${(Math.random() * 0.4 * waveWidth + 0.6 * waveWidth) / waveWidth * 100}%`,
    ];

    return radiuses.join(' ');

}

const waveWrapper = document.querySelector('.waves');
waveWrapper.parentNode.style.padding = '0 !important;';

const wavePercWidth = parseInt(waveWrapper.dataset.wavePercWidth);
const waveWrapperWidth = waveWrapper.offsetWidth;
const waveWrapperHeight = waveWrapper.offsetHeight;
const frontWavesCount = parseInt(waveWrapper.dataset.frontWavesCount);
const backWavesCount = parseInt(waveWrapper.dataset.backWavesCount);
const animationDuration = waveWrapper.dataset.animationDuration;

let wavesStyle = '';
let count = frontWavesCount + backWavesCount;
let counter = 0;

[
    {perspective: 'front', count: frontWavesCount},
    {perspective: 'back', count: backWavesCount}
].forEach(function (data, i) {

    for (let j = 0; j < data.count; j++) {

        const wave = document.createElement('div');
        const rotateDir = Math.random() < 0.5 ? -1 : 1;
        wave.className = `waves__item waves__item_${data.perspective}`;
        wave.setAttribute('id', `perspective${i + 1}-wave${j + 1}`);
        waveWrapper.appendChild(wave);

        const waveWidth = waveWrapperWidth * wavePercWidth / 100;
        const waveHeight = 0.9 * waveWidth;

        wavesStyle += `.waves__item#perspective${i + 1}-wave${j + 1} {` +
            `width: ${waveHeight}px;` +
            `height: ${0.9 * waveWidth}px;` +
            `z-index: ${count - counter};` +
            `right: ${-waveWidth / 3 + waveWidth / 3 * counter}px;` +
            `bottom: ${-0.85 * waveHeight}px;` +
            `border-radius: ${generateBorderRadiuses(waveWidth)};` +
            `transform: rotate(0deg);` +
            `animation-name: wave${i + 1}-${j + 1};` +
            `animation-duration: ${animationDuration};` +
            `animation-timing-function: linear;` +
            `animation-iteration-count: infinite;` +
            `}`;

        wavesStyle += `@keyframes wave${i + 1}-${j + 1} {` +
            `0% {transform: rotate(0deg)}` +
            `50% {transform: rotate(${rotateDir * 180}deg)}` +
            `100% {transform: rotate(${rotateDir * 360}deg)}}`;

        counter ++;
    }

});

waveWrapper.innerHTML += `<style>${wavesStyle}</style>`;
