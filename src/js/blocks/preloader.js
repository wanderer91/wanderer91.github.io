import "../../scss/blocks/preloader.scss";

document.addEventListener('DOMContentLoaded', function () {
    let preloader, progress = 0, timeout, canvas, context;
    let lightningStopped = false;

    document.body.style.overflow = 'hidden';

    window.onload = () => {

        clearTimeout(timeout);

        setTimeout(() => {
            document.body.style.overflow = 'auto';
            lightningStopped = true;
        }, 2000);

        progress = 100;
        preloader.querySelector('.preloader__digits').innerText = `${progress}%`;
        preloader.classList.add('hidden');

    };

    preloader = document.querySelector('.preloader');

    const fontSize = preloader.dataset.fontSize;
    const fontFamily = preloader.dataset.fontFamily;
    const backgroundColor = preloader.dataset.backgroundColor;
    const digits = preloader.querySelector('.preloader__digits');

    preloader.style = `font-size: ${fontSize}px; font-family: ${fontFamily}; background-color: #${backgroundColor}`;

    //digits.style.backgroundColor = `#${backgroundColor}`;

    function launchCounter() {
        progress += 1;
        digits.innerText = `${progress}%`;

        if (progress < 100) {
            timeout = setTimeout(launchCounter, 50);
        }

    }

    function generateLightning() {
        const sides = ['left', 'top', 'right', 'bottom'];
        const randomSide = Math.floor(Math.random() * sides.length);

        for (let i = 0; i < Math.round(Math.random() * 3); i++) {
            const startPoint = sides[randomSide] === 'left' ? [10, Math.random() * canvas.offsetHeight]
                : (sides[randomSide] === 'top' ? [Math.random() * canvas.offsetWidth, 10]
                    : (sides[randomSide] === 'right' ? [canvas.offsetWidth - 10, Math.random() * canvas.offsetHeight]
                        : [Math.random() * canvas.offsetWidth, canvas.offsetHeight - 10]));

            const canvasMiddlePoint = [canvas.offsetWidth / 2, canvas.offsetHeight / 2];
            const digitsMiddlePoint = [digits.offsetWidth / 2, digits.offsetHeight / 2];
            const endPoint = sides[randomSide] === 'left' ? [
                    canvasMiddlePoint[0] - digitsMiddlePoint[0] - Math.random() * 30,
                    canvasMiddlePoint[1] + digitsMiddlePoint[1] * (2 * Math.random() - 1)
                ]
                : (sides[randomSide] === 'top' ? [
                        canvasMiddlePoint[0] + digitsMiddlePoint[0] * (2 * Math.random() - 1),
                        canvasMiddlePoint[1] - digitsMiddlePoint[1] - Math.random() * 20
                    ]
                    : (sides[randomSide] === 'right' ? [
                            canvasMiddlePoint[0] + digitsMiddlePoint[0] + Math.random() * 30,
                            canvasMiddlePoint[1] + digitsMiddlePoint[1] * (2 * Math.random() - 1)
                        ]
                        : [
                            canvasMiddlePoint[0] + digitsMiddlePoint[0] * (2 * Math.random() - 1),
                            canvasMiddlePoint[1] + digitsMiddlePoint[1] + Math.random() * 20
                        ]));

            const diffX = endPoint[0] - startPoint[0];
            const diffY = endPoint[1] - startPoint[1];
            const stepsCount = Math.random() * 50 + 20;

            const xInc = diffX / stepsCount;
            const yInc = diffY / stepsCount;

            context.lineWidth = 3;
            context.beginPath();
            context.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;

            let pointsStack = [startPoint];
            let stepsCounter = 0;

            do {

                const prevPoint = pointsStack[pointsStack.length - 1];

                context.moveTo(...prevPoint);

                const nextPoint = [
                    prevPoint[0] + xInc + (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 20),
                    prevPoint[1] + yInc + (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 10)
                ];

                context.lineTo(...nextPoint);

                stepsCounter++;

                pointsStack.push(nextPoint);

            } while (stepsCounter < stepsCount);

            context.moveTo(...pointsStack[pointsStack.length - 1]);
            context.lineTo(...endPoint);

            context.stroke();
            context.closePath();
        }

    }

    function initCanvas() {
        canvas = preloader.querySelector('.preloader__canvas');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        context = canvas.getContext('2d');
        context.fillStyle = 'rgb(0, 0, 0)';
        context.lineCap = 'round';
    }

    function launchLightningLoop() {
        context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

        generateLightning();

        if (!lightningStopped) {
            setTimeout(launchLightningLoop, 50 + Math.random() * 150);
        }
    }

    launchCounter();
    initCanvas();
    launchLightningLoop();

    /*const preloadedContent = document.querySelectorAll('[data-preloader]');

    function launchPreloader(preloaded) {

        const progressBar = preloaded.querySelector('.preloader__progressbar');
        const progressBarLine = progressBar.querySelector('.preloader__progressbar-line');
        const progressBarWidth = progressBar.offsetWidth;

        const growthTimeStep = 50;
        const growthUpTime = 4000;
        const stepsCount = Math.round(growthUpTime / growthTimeStep);
        const growthWidthStep = Math.round(progressBarWidth / stepsCount);

        let counter = 0;

        function increaseProgressLine() {

            counter ++;

            progressBarLine.style.width = `${counter * growthWidthStep}px`;

            if (counter < stepsCount) {
                setTimeout(increaseProgressLine, growthTimeStep);
            } else {
                progressBar.classList.add('expanded');
                preloaded.querySelector('.preloader__content').classList.add('visible');
            }
        }

        setTimeout(increaseProgressLine, 0);

    }

    preloadedContent.forEach((preloaded) => {

        preloaded.innerHTML = `<div class="preloader" style="height: ${preloaded.offsetHeight}px;">` +
            `<div class="preloader__progressbar">` +
            `<div class="preloader__progressbar-line"></div>` +
            `</div>` +
            `<div class="preloader__content">${preloaded.innerHTML}</div>` +
            `</div>`;

        launchPreloader(preloaded);

    });*/


});
