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
const wavePercWidth = parseInt(waveWrapper.dataset.wavePercWidth);
const waveWrapperWidth = waveWrapper.offsetWidth;
const waveWrapperHeight = waveWrapper.offsetHeight;
const frontWavesCount = parseInt(waveWrapper.dataset.frontWavesCount);
const backWavesCount = parseInt(waveWrapper.dataset.backWavesCount);
const animationDuration = waveWrapper.dataset.animationDuration;

let wavesStyle = '';

[
    {perspective: 'front', count: frontWavesCount, rotateDir: 1, minPercRight: 0},
    {perspective: 'back', count: backWavesCount, rotateDir: -1, minPercRight: -30}
].forEach(function (data, i) {

    for (let j = 0; j < data.count; j++) {

        const wave = document.createElement('div');
        wave.className = `waves__item waves__item_${data.perspective}`;
        wave.setAttribute('id', `perspective${i + 1}-wave${j + 1}`);
        waveWrapper.appendChild(wave);

        const waveWidth = waveWrapperWidth * wavePercWidth / 100;
        const waveHeight = 0.9 * waveWidth;

        const radiuses = generateBorderRadiuses(waveWidth);
        const widthDiff = Math.abs(waveWrapperWidth - waveWidth);

        const translateY = Math.random() * waveWrapperHeight / 2 + waveWrapperHeight / 2;

        wavesStyle += `.waves__item#perspective${i + 1}-wave${j + 1} {` +
            `width: ${waveHeight}px;` +
            `height: ${0.9 * waveWidth}px;` +
            `right: ${Math.random() * widthDiff / 5 + waveWrapperWidth * data.minPercRight / 100}px;` +
            `border-radius: ${radiuses};` +
            `transform: translate(0, ${translateY}px) rotate(0deg);` +
            `animation-name: wave${i + 1}-${j + 1};` +
            `animation-duration: ${animationDuration};` +
            `animation-timing-function: linear;` +
            `animation-iteration-count: infinite;` +
            `}`;

        wavesStyle += `@keyframes wave${i + 1}-${j + 1} {` +
            `0% {transform: translate(0, ${translateY}px) rotate(0deg)}` +
            `50% {transform: translate(0, ${translateY - Math.random() * 0.5 * waveWrapperHeight}px) rotate(${data.rotateDir * 180}deg)}` +
            `100% {transform: translate(0, ${translateY}px) rotate(${data.rotateDir * 360}deg)}}`
    }

});

waveWrapper.innerHTML += `<style>${wavesStyle}</style>`;
