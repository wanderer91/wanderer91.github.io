import "../../scss/blocks/preloader.scss";

document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.innerWidth <= 980;
    const preloaderSelector = `.preloader_${isMobile ? 'mobile' : 'desktop'}`;
    const digitsSelector = '.preloader__digits';

    let preloader, digits, progress = 0, progressBar, timeout, canvas, context, canvasWidth, canvasHeight;
    let lightningStopped = false;

    window.onload = () => {

        clearTimeout(timeout);

        setTimeout(() => {
            document.body.style.overflow = 'auto';
            lightningStopped = true;
        }, 2000);

        progress = 100;

        digits.innerText = `${progress}%`;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        preloader.classList.add('hidden');

    };

    function initCommonPreloader() {

        document.body.style.overflow = 'hidden';

        preloader = document.querySelector(preloaderSelector);
        digits = preloader.querySelector(digitsSelector);

        preloader.style = `font-size: ${preloader.dataset.fontSize}px;` +
            `font-family: ${preloader.dataset.fontFamily};` +
            `background-color: #${preloader.dataset.backgroundColor}`;

        digits.style = `color: #${preloader.dataset.digitsColor}`;
    }

    function initDesktopPreloader() {
        canvas = preloader.querySelector('.preloader__canvas');

        function launchCounter() {
            progress += 1;
            digits.innerText = `${progress}%`;

            if (progress < 100) {
                timeout = setTimeout(launchCounter, 50);
            }

        }

        initCanvas();
        launchLightningLoop();
        launchCounter();

    }

    function initMobilePreloader() {

        progressBar = preloader.querySelector('.preloader__progressbar');
        progressBar.style.backgroundColor = `#${preloader.dataset.progressColor}`;

        function launchCounter() {
            progress += 1;

            const progressText = `${progress}%`;

            digits.innerText = progressText;
            digits.setAttribute('data-progress', progressText);

            progressBar.style.width = progressText;

            if (progress < 100) {
                timeout = setTimeout(launchCounter, 50);
            }

        }

        launchCounter();

    }

    class Lightning {

        constructor(start, end, side) {

            this.start = start;
            this.end = end;
            this.side = side;
            this.points = [];

            this.offsetValue = Math.random() * 30 - 50;

        }

        static sides() {
            return ['left', 'top', 'right', 'bottom'];
        }

        static verticalSides() {
            return [this.sides()[0], this.sides()[2]];
        }

        generate() {

            const diffX = this.end[0] - this.start[0];
            const diffY = this.end[1] - this.start[1];
            const isVerticalSide = Lightning.verticalSides().indexOf(this.side) >= 0;
            const stepsCount = Math.ceil(Math.random() * (isVerticalSide ? canvasHeight : canvasWidth) / 50) + 10;

            const xInc = diffX / stepsCount;
            const yInc = diffY / stepsCount;

            this.points.push(this.start);
            let stepsCounter = 0;

            do {

                let nextPoint, prevPoint = this.points[this.points.length - 1];

                if (isVerticalSide) {

                    nextPoint = [
                        prevPoint[0] + xInc * (Math.random() * 0.3 + 0.7),
                        prevPoint[1] + yInc + (Math.random() < 0.5 ? -1 : 1) * Math.random() * this.offsetValue
                    ];

                } else {

                    nextPoint = [
                        prevPoint[0] + xInc + (Math.random() < 0.5 ? -1 : 1) * Math.random() * this.offsetValue,
                        prevPoint[1] + yInc * (Math.random() * 0.3 + 0.7),
                    ];

                }

                this.points.push(nextPoint);

                stepsCounter++;

            } while (stepsCounter < stepsCount);

            this.points.push(this.end);

            return this;

        }

        draw(ctx) {

            ctx.lineWidth = Math.ceil(Math.random() * 3) + 1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.9 + 0.1})`;

            for (let i = 0; i < this.points.length - 1; i++) {

                ctx.moveTo(...this.points[i]);
                ctx.lineTo(...this.points[i + 1]);

            }

            ctx.stroke();
            ctx.closePath();

        }

    }

    function generateLightnings() {
        const randomSide = Math.floor(Math.random() * Lightning.sides().length);
        const sideName = Lightning.sides()[randomSide];

        for (let i = 0; i < Math.round(Math.random() * 3); i++) {
            const startPoint = sideName === 'left' ? [10, Math.random() * canvasHeight]
                : (sideName === 'top' ? [Math.random() * canvasWidth, 10]
                    : (sideName === 'right' ? [canvasWidth - 10, Math.random() * canvasHeight]
                        : [Math.random() * canvasWidth, canvasHeight - 10]));

            const endPoint = sideName === 'left' ? [
                    canvasWidth / 2 - Math.random() * 30,
                    canvasHeight / 2 + digits.offsetHeight / 2 * (2 * Math.random() - 1)
                ]
                : (sideName === 'top' ? [
                        canvasWidth / 2 + digits.offsetWidth / 2 * (2 * Math.random() - 1),
                        canvasHeight / 2 - Math.random() * 20
                    ]
                    : (sideName === 'right' ? [
                            canvasWidth / 2 + Math.random() * 30,
                            canvasHeight / 2 + digits.offsetHeight / 2 * (2 * Math.random() - 1)
                        ]
                        : [
                            canvasWidth / 2 + digits.offsetWidth / 2 * (2 * Math.random() - 1),
                            canvasHeight / 2 + Math.random() * 20
                        ]));

            const lightning = (new Lightning(startPoint, endPoint, sideName)).generate();

            lightning.draw(context);

        }

    }

    function initCanvas() {
        canvasWidth = canvas.offsetWidth;
        canvasHeight = canvas.offsetHeight;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context = canvas.getContext('2d');
        context.fillStyle = 'rgb(0, 0, 0)';
        context.lineCap = 'round';
    }

    function launchLightningLoop() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        generateLightnings();

        if (!lightningStopped) {
            setTimeout(launchLightningLoop, 50 + Math.random() * 150);
        }
    }

    function init() {
        initCommonPreloader();
        isMobile ? initMobilePreloader() : initDesktopPreloader();
    }

    init();

    window.addEventListener('resize', function () {
        init();
    });

});
