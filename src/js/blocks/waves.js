import "../../scss/blocks/waves.scss";

function factorial(n) {
    if (n > 1) {
        return n * factorial(n - 1);
    }
    return 1;
}

function combination(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function bezierFunc(t, points) {

    let point = [0, 0];

    points.forEach(function (p, i, arr) {

        point[0] += combination(arr.length - 1, i) * Math.pow(1 - t, arr.length - 1 - i) * Math.pow(t, i) * p[0];
        point[1] += combination(arr.length - 1, i) * Math.pow(1 - t, arr.length - 1 - i) * Math.pow(t, i) * p[1];

    });

    return point;

}

function generateBezierPoints(waveWidth, waveHeight) {
    return [
        [0, 0.9 * waveHeight],
        [0.25 * waveWidth, 0.8 * waveHeight],
        [0.25 * waveWidth, 0],
        [0.5 * waveWidth, 0],
        [0.75 * waveWidth, 0],
        [0.75 * waveWidth, 0.8 * waveHeight],
        [waveWidth, 0.9 * waveHeight]
    ];
}

const waveWrapper = document.querySelector('.waves');
const waveWidth = waveWrapper.offsetWidth;
const waveHeight = waveWrapper.offsetHeight;

const waves = waveWrapper.querySelectorAll('.waves__item');

for (let j = 0; j < waves.length; j++) {

    let clipPath = ['0% 100%'];

    let t = 0;

    const bezierPoints = generateBezierPoints(waveWidth, waveHeight);

    do {

        const point = bezierFunc(t, bezierPoints);

        clipPath.push(`${point[0] / waveWidth * 100}% ${point[1] / waveHeight * 100}%`);

        t += 0.01;

    } while (t <= 1.04);

    clipPath.push('100% 100%');

    clipPath = clipPath.join(',');

    waveWrapper.innerHTML += `<style>.waves__item:nth-child(${j + 1}) {` +
        `clip-path: polygon(${clipPath});` +
        `-webkit-clip-path: polygon(${clipPath});` +
        '} </style>';
}
