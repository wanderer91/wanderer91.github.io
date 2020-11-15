import "../../scss/blocks/scrollbar.scss";

class Scrollbar {

    static defaultOptions = [
        { name: 'indicatorColor', default: 'transparent' },
        { name: 'lineColor', default: 'transparent' },
        { name: 'sliderColor', default: '#000000' },
        { name: 'slowParam', default: 1 },
        { name: 'width', default: 10 },
    ];

    constructor() {

        document.body.style.overflow = 'hidden';

        /**
         * @see https://learn.javascript.ru/mousewheel
         * @type {string}
         */
        this.event = 'onwheel' in document ? 'wheel' : ('onmousewheel' in document ? 'mousewheel' : 'MozMousePixelScroll');
        this.data = {_scrollTop: 0};

        this.initData();
        this.attachEvents();

        this.initScrollBar();

        this.data.scrollTop = window.scrollY;
    }

    initData() {

        Object.defineProperty(this.data, 'scrollTop', {
            enumerable: true,
            get: function() {
                return this._scrollTop;
            },
            set: function(value) {
                if (value < 0) {
                    value = 0;
                } else if (value > document.body.scrollHeight - window.innerHeight) {
                    value = document.body.scrollHeight - window.innerHeight;
                }
                this._scrollTop = value;
                window.scrollTo(0, this._scrollTop);
            }
        });

    }

    getOptions() {

        this.options = [];

        Scrollbar.defaultOptions.forEach((option) => {
            this.options[option.name] = this.el.dataset[option.name] || option.default;
        });

    }

    initScrollBar() {
        this.el = document.querySelector('.scrollbar');

        if (!this.el) {
            return;
        }

        this.getOptions();

        this.slider = this.el.querySelector('.scrollbar__slider');
        this.progress = this.slider.querySelector('.scrollbar__fulfil-progress');

        this.setOptions();

        this.attachScrollbarEvents();
    }

    setOptions() {
        this.el.style.backgroundColor = this.options['lineColor'];
        this.el.style.setProperty('--width', `${this.options['width']}px`);

        this.slider.style.backgroundColor = this.options['sliderColor'];

        this.progress.style.backgroundColor = this.options['indicatorColor'];
    }

    attachEvents() {
        document.addEventListener(this.event, (event) => {
            this.handleWheelEvent(event);
        });
    }

    attachScrollbarEvents() {

        window.addEventListener('scroll', () => {
            this.calcSliderPosition();
        });

        window.addEventListener('resize', () => {
            this.calcSliderPosition();
        });

        this.el.addEventListener('click', (event) => {
            if (event.target.closest('.scrollbar__slider') || this.clickedTarget) {
                return;
            }

            this.data.scrollTop = event.offsetY / event.target.offsetHeight * document.body.scrollHeight;
        });

        this.slider.addEventListener('mousedown', (event) => {
            event.stopImmediatePropagation();

            this.clickedTarget = event.target.closest('.scrollbar__slider');
            this.targetOffsetY = event.offsetY;
            this.sliderClicked = true;
        });

        document.addEventListener('mousemove', (event) => {
            if (!this.sliderClicked) {
                return;
            }

            this.data.scrollTop = event.clientY / this.el.offsetHeight * document.body.scrollHeight;
        });

        document.addEventListener('mouseup', (event) => {
            if (this.clickedTarget) {
                event.stopImmediatePropagation();

                this.sliderClicked = false;
                this.targetOffsetY = 0;
                this.clickedTarget = null;
            }
        });

    }

    handleWheelEvent(event) {
        this.data.scrollTop += event.deltaY / this.options['slowParam'];
    }

    calcSliderPosition() {
        const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);

        const sliderTop = (this.el.offsetHeight - this.slider.offsetHeight) * scrollRatio;
        const progressHeight = this.slider.offsetHeight * scrollRatio;

        this.slider.style.top = `${sliderTop}px`;
        this.progress.style.height = `${progressHeight}px`;
    }

}

(new Scrollbar());
