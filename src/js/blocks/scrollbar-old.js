import "../../scss/blocks/scrollbar.scss";

import {wheelEvent} from '../helpers/events';
import getOptions from '../helpers/options';

class Scrollbar {

    static defaultOptions = [
        {name: 'indicatorColor', default: 'transparent'},
        {name: 'lineColor', default: 'transparent'},
        {name: 'sliderColor', default: '#000000'},
        {name: 'slowParam', default: 1},
        {name: 'width', default: 10},
        {name: 'decay', default: 10},
    ];

    static eventHandlers = {
        desktop: [],
        touch: []
    };

    constructor() {

        this.data = {_scrollTop: 0, _isDesktop: true, scrollDir: 1, event: wheelEvent()};
        this.initData();

        this.options = getOptions(this.el, Scrollbar.defaultOptions);

        this.data.scrollTop = window.scrollY;
        this.data.isDesktop = window.innerWidth > 1100;
        this.attachedHandlers = [];

        this.calcScrollHeight();

        this.initScrollBar();
    }

    calcScrollHeight() {
        this.data.scrollHeight = document.body.scrollHeight - window.innerHeight;
    }

    initData() {

        Object.defineProperty(this.data, 'scrollTop', {
            enumerable: true,
            get: function () {
                return this._scrollTop;
            },
            set: function (value) {
                value = value < 0 ? 0 : (value > this.scrollHeight ? this.scrollHeight : value);

                this.scrollDir = Math.sign(value - this._scrollTop);
                this._scrollTop = value;
                window.scrollTo({
                    top: this._scrollTop,
                });
            }
        });

        Object.defineProperty(this.data, 'isDesktop', {
            enumerable: true,
            get: function () {
                return this._isDesktop;
            },
            set: function (value) {
                this.eventStack = `${value ? 'desktop' : 'touch'}`;
                this._isDesktop = value;
            }
        });

        window.addEventListener('resize', () => {
            this.data.isDesktop = window.innerWidth > 1100;
        });

    }

    initScrollBar() {
        document.head.innerHTML += '<style>.body-ov-hidden{overflow: hidden !important;}</style>';
        document.body.classList.add('body-ov-hidden');

        /*this.el = document.querySelector('.scrollbar');

        if (!this.el) {
            return;
        }

        this.slider = this.el.querySelector('.scrollbar__slider');
        this.progress = this.slider.querySelector('.scrollbar__fulfil-progress');

        this.setScrollBarOptions();

        this.attachScrollbarEvents();*/
    }

    initSlider() {
        this.calcScrollHeight();
        this.calcSliderPosition();
    }

    setScrollBarOptions() {
        this.el.style.backgroundColor = this.options['lineColor'];
        this.el.style.setProperty('--width', `${this.options['width']}px`);
        document.body.style.marginRight = `${this.options['width']}px`;

        this.slider.style.backgroundColor = this.options['sliderColor'];

        this.progress.style.backgroundColor = this.options['indicatorColor'];
    }

    attachEvents() {
        this.mouseWheel = false;

        document.addEventListener(this.event, (event) => {
            this.handleWheelEvent(event);
            this.mouseWheel = true;
        });
    }

    attachScrollbarEvents() {

        window.addEventListener('scroll', () => {
            this.initSlider();
        });

        window.addEventListener('resize', this.initSlider.bind(this));

        this.el.addEventListener('click', (event) => {
            if (event.target.closest('.scrollbar__slider') || this.clickedTarget) {
                return;
            }

            this.data.scrollTop = event.offsetY / event.target.offsetHeight * this.data.scrollHeight;
        });

        this.slider.addEventListener('mousedown', (event) => {
            /**
             * 2 - right button
             */
            if ([2].includes(event.button)) {
                return;
            }
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
            this.prevScrollY = this.data.scrollTop; //направление тача
        });

        document.addEventListener('touchmove', (event) => {
            if (!this.touch) {
                return;
            }

            const scrollDiff = event.changedTouches[0].pageY - this.touchY;
            this.data.scrollTop = this.prevScrollY + scrollDiff;
        });

        document.addEventListener('touchend', (event) => {
            this.touch = false;
            this.scrollDecay();
        })
    }

    scrollDecay(time = 1000, diff = 30, step = 0) {

        const timeStep = 100;

        if (diff < 0) {
            this.mouseWheel = false;
            return;
        }

        this.data.scrollTop += this.data.scrollDir * diff / this.options['slowParam'];

        if (time > 0) {
            setTimeout(() => {
                this.scrollDecay(time - timeStep, diff - step, ++step);
            }, timeStep);
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
