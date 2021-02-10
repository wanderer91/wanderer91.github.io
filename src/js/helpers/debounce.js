let timeout;

export default function (callback, pause = 4) {
    if (!callback) {
        return;
    }

    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(callback, pause);
}
