/**
 * @see https://learn.javascript.ru/mousewheel
 * @type {string}
 */
export function wheelEvent() {
    return 'onwheel' in document ? 'wheel' : ('onmousewheel' in document ? 'mousewheel' : 'MozMousePixelScroll');
};
