export function createElement(tag, classes, parent) {

    const el = document.createElement(tag);

    if (classes.constructor.name === 'String') {
        classes = classes.split(/\s+/);
    }

    el.classList.add(...classes);

    if (parent) {
        parent.appendChild(el);
    }

    return el;

};
