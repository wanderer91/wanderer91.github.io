import {wheelEvent} from '../helpers/events';

class Scrollbar {

    static eventHandlers = {
        desktop: [
            {
                event: wheelEvent(),
                target: document,
                handler: function (event) {
                    this.calcScrollHeight();
                    this.handleWheelEvent(event);
                    this.data.mouseWheel = true;
                }
            },
            {
                event: 'scroll',
                target: window,
                handler: function () {
                    if (this.data.mouseWheel) {
                        return;
                    }

                    this.data.scrollTop = window.scrollY;
                }
            }
        ],
        touch: [
            {
                event: 'touchstart',
                target: document,
                handler: function (event) {
                    this.calcScrollHeight();

                    this.data.touch = true;
                    this.data.touchY = event.changedTouches[0].pageY;
                }
            },
            {
                event: 'touchmove',
                target: document,
                handler: function (event) {
                    if (!this.data.touch) {
                        return;
                    }

                    const scrollDiff = event.changedTouches[0].pageY - this.data.touchY;

                    this.data.scrollTop = this.data._scrollTop - scrollDiff;
                    this.data.prevScrollY = this.data.scrollTop;
                    this.data.scrollDir = Math.sign(-scrollDiff);
                }
            },
            {
                event: 'touchend',
                target: document,
                handler: function () {
                    this.data.touch = false;
                    this.scrollDecay(2000, 50);
                }
            }
        ]
    };

    constructor() {

        this.data = {
            _scrollTop: 0,
            _isDesktop: true,
            scrollDir: 1,
            attachedHandlers: [],
            mouseWheel: false,
            touch: false,
            touchY: 0,
            prevScrollY: 0,
            scrollHeight: 0,
            currentEvents: '',
            slowParam: 5
        };

        this.initData();
        this.data.scrollTop = window.scrollY;

        this.launch();

    }

    calcScrollHeight() {
        this.data.scrollHeight = document.body.scrollHeight - window.innerHeight;
    }

    launch() {
        this.data.isDesktop = window.innerWidth > 1100;

        /****************************************************************************************/
        document.head.innerHTML += '<style>.' +
            'body-ov-hidden{overflow: hidden !important;}' +
            '</style>';
        document.body.classList.add('body-ov-hidden');
        /****************************************************************************************/
    }

    initData() {
        const _this = this;

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
                this._isDesktop = value;

                if (_this.data.currentEvents) {
                    _this.detachEvents();
                }

                _this.data.currentEvents = `${value ? 'desktop' : 'touch'}`;
                _this.attachEvents();

            }
        });

        let windowResizeTimeout;
        window.addEventListener('resize', () => {
            if (windowResizeTimeout) {
                clearTimeout(windowResizeTimeout);
            }

            windowResizeTimeout = setTimeout(() => {
                this.data.isDesktop = window.innerWidth > 1100;
            }, 50);
        });

    }

    detachEvents() {
        if (this.data.attachedHandlers.length) {
            this.data.attachedHandlers.forEach((data) => {
                data.target.removeEventListener(data.event, data.handler);
            });

            this.data.attachedHandlers.splice(0);
        }
    }

    attachEvents() {
        Scrollbar.eventHandlers[this.data.currentEvents].forEach((data) => {
            const handler = data.handler.bind(this);

            data.target.addEventListener(data.event, handler);
            this.data.attachedHandlers.push({
                ...data, handler
            });
        });
    }

    scrollDecay(time, diff = 30, step = 0) {

        const timeStep = 50;

        time = time || 1000;

        if (diff < 0 || time < 0) {
            this.data.mouseWheel = false;
            return;
        }

        this.data.scrollTop += this.data.scrollDir * diff / this.data.slowParam;

        setTimeout(() => {
            this.scrollDecay(time - timeStep, diff - step, ++step);
        }, timeStep);
    }

    handleWheelEvent(event) {
        this.data.scrollTop += event.deltaY / this.data.slowParam;

        const isTouchPad = Math.abs(event.wheelDeltaY) !== 120;

        if (!isTouchPad) {
            this.scrollDecay();
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    (new Scrollbar());
});
