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

let wavesStyle = '';
let count, counter, isMobile, waveWrapperWidth;

function generateWaveStyles({id, waveWidth, waveHeight, rotateDir, animationDuration}) {

    return `.waves__item#${id} {` +
        `width: ${waveHeight}px;` +
        `height: ${0.9 * waveWidth}px;` +
        `z-index: ${count - counter};` +
        `right: ${-waveWrapperWidth / count + waveWrapperWidth / count * counter}px;` +
        `bottom: ${(isMobile ? -0.75 : -0.85) * waveHeight}px;` +
        `border-radius: ${generateBorderRadiuses(waveWidth)};` +
        `transform: rotate(0deg);` +
        `animation-name: wave_${id};` +
        `animation-duration: ${animationDuration};` +
        `animation-timing-function: linear;` +
        `animation-iteration-count: infinite;` +
        `} @keyframes wave_${id} {` +
        `0% {transform: rotate(0deg)}` +
        `50% {transform: rotate(${rotateDir * 180}deg)}` +
        `100% {transform: rotate(${rotateDir * 360}deg)}}`;

}

function initWaves(wrapper) {

    const wavePercWidth = parseInt(wrapper.dataset.wavePercWidth);
    const animationDuration = wrapper.dataset.animationDuration;

    count = counter = 0;
    isMobile = window.innerWidth <= 980;

    waveWrapperWidth = wrapper.offsetWidth;

    wrapper.innerHTML = '';

    const wavesData = [
        {perspective: 'front', count: wrapper.dataset.frontWavesCount},
        {perspective: 'back', count: wrapper.dataset.backWavesCount}
    ];

    wavesData.forEach(function (data) {

        const countData = JSON.parse(data.count);

        if (countData.constructor.name === 'Object') {

            for (let bp in countData) {

                if (window.innerWidth >= parseFloat(bp)) {
                    data.count = parseInt(countData[bp]);
                    count += parseInt(countData[bp]);
                } else {
                    break;
                }

            }

        } else {
            data.count = parseInt(countData);
            count += parseInt(countData);
        }

    });

    wavesData.forEach(function (data, i) {

        for (let j = 0; j < data.count; j++) {

            const wave = document.createElement('div');
            const rotateDir = Math.random() < 0.5 ? -1 : 1;
            const id = `${data.perspective}${i + 1}-wave${j + 1}`;

            wave.className = `waves__item waves__item_${data.perspective}`;
            wave.setAttribute('id', id);
            wrapper.appendChild(wave);

            const waveWidth = waveWrapperWidth * wavePercWidth / 100;
            const waveHeight = 0.9 * waveWidth;

            wavesStyle += generateWaveStyles({
                id,
                waveWidth,
                waveHeight,
                rotateDir,
                animationDuration
            });

            counter ++;

        }

    });

    wrapper.innerHTML += `<style>${wavesStyle}</style>`;

}

const waveWrapper = document.querySelectorAll('.waves');

waveWrapper.forEach(function (wrapper) {

    initWaves(wrapper);

    window.addEventListener('resize', function () {
        initWaves(wrapper)
    });

});
