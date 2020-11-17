import "../../scss/blocks/scrollbar.scss";

class Scrollbar {

    static defaultOptions = [
        { name: 'indicatorColor', default: 'transparent' },
        { name: 'lineColor', default: 'transparent' },
        { name: 'sliderColor', default: '#000000' },
        { name: 'slowParam', default: 1 },
        { name: 'width', default: 10 },
        { name: 'decay', default: 10 },
    ];

    constructor() {

        this.el = document.querySelector('.scrollbar');

        /**
         * @see https://learn.javascript.ru/mousewheel
         * @type {string}
         */
        this.event = 'onwheel' in document ? 'wheel' : ('onmousewheel' in document ? 'mousewheel' : 'MozMousePixelScroll');
        this.data = {_scrollTop: 0, scrollDir: 1};
        this.isDesktop = window.innerWidth > 1100;

        this.initData();
        this.getOptions();
        this.data.scrollTop = window.scrollY;

        if (!this.isDesktop) {
            this.attachTouchEvents();
            return;
        }

        this.calcScrollHeight();
        this.attachEvents();

        this.initScrollBar();
    }

    calcScrollHeight() {
        this.data.scrollHeight = document.body.scrollHeight - window.innerHeight;
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
                } else if (value > this.scrollHeight) {
                    value = this.scrollHeight;
                }
                this.scrollDir = Math.sign(value - this._scrollTop);
                this._scrollTop = value;
                window.scrollTo({
                    top: this._scrollTop,
                });
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

        if (!this.el) {
            return;
        }

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
            this.calcScrollHeight();
            this.calcSliderPosition();
        });

        window.addEventListener('resize', () => {
            this.calcScrollHeight();
            this.calcSliderPosition();
        });

        this.el.addEventListener('click', (event) => {
            if (event.target.closest('.scrollbar__slider') || this.clickedTarget) {
                return;
            }

            this.data.scrollTop = event.offsetY / event.target.offsetHeight * this.data.scrollHeight;
        });

        this.slider.addEventListener('mousedown', (event) => {
            this.sliderDragStart(event);
        });

        document.addEventListener('mousemove', (event) => {
            this.sliderDragMove(event);
        });

        document.addEventListener('mouseup', (event) => {
            this.sliderDragEnd(event)
        });

    }

    attachTouchEvents() {
        document.addEventListener('touchstart', (event) => {
            this.touch = true;
            this.touchY = event.changedTouches[0].pageY;
            this.prevScrollY = this.data.scrollTop;
        });

        document.addEventListener('touchmove', (event) => {
            if (!this.touch) {
                return;
            }

            const scrollDiff = event.changedTouches[0].pageY - this.touchY;
            this.data.scrollTop = this.prevScrollY - scrollDiff;
        });

        document.addEventListener('touchend', (event) => {
            this.touch = false;
            this.scrollDecay();
        })
    }

    scrollDecay(time = 1000, diff = 20, step = 0) {

        if (diff < 0) {
            return;
        }

        this.data.scrollTop += this.data.scrollDir * diff / this.options['slowParam'];

        if (time > 0) {
            setTimeout(() => {
               this.scrollDecay(time - 100, diff - step, ++step);
            }, 100);
        }
    }

    sliderDragStart(event) {
        this.clickedTarget = event.target.closest('.scrollbar__slider');
        this.sliderClicked = true;
    }

    sliderDragMove(event) {
        if (!this.sliderClicked) {
            return;
        }

        this.data.scrollTop = event.clientY / this.el.offsetHeight * this.data.scrollHeight;
    }

    sliderDragEnd(event) {
        if (this.clickedTarget) {
            this.sliderClicked = false;
            this.clickedTarget = null;
        }
    }

    handleWheelEvent(event) {
        this.data.scrollTop += event.deltaY / this.options['slowParam'];
        this.scrollDecay();
    }

    calcSliderPosition() {
        const scrollRatio = window.scrollY / this.data.scrollHeight;

        const sliderTop = (this.el.offsetHeight - this.slider.offsetHeight) * scrollRatio;
        const progressHeight = this.slider.offsetHeight * scrollRatio;

        this.slider.style.top = `${sliderTop}px`;
        this.progress.style.height = `${progressHeight}px`;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    (new Scrollbar());
});
