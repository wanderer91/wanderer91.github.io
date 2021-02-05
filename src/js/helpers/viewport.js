export default function (el) {
    const boundingRect = el.getBoundingClientRect();

    return boundingRect.bottom > 0 && (boundingRect.top > -el.offsetHeight && boundingRect.top < window.innerHeight);
}
