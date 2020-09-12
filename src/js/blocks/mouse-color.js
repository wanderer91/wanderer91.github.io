document.addEventListener('DOMContentLoaded', function () {

    const mouseColor = document.querySelector('.mouse-color');
    const boundingRect = mouseColor.getBoundingClientRect();

    const blockMiddleX = mouseColor.offsetWidth / 2;
    const blockMiddleY = mouseColor.offsetHeight / 2;

    // параметры уравнения прямой, проходящей через середину блока параллельно оси Y
    const middleA = -blockMiddleY;
    const middleB = 0;

    mouseColor.addEventListener('mousemove', function (event) {
        let mouseXOnBlock = event.clientX - boundingRect.left,
            mouseYOnBlock = event.clientY - boundingRect.top,
            r, g, b;

        const A = mouseYOnBlock - blockMiddleY;
        const B = blockMiddleX - mouseXOnBlock;
        const phiRadians = Math.acos((A * middleA + B * middleB) / (Math.sqrt(A ** 2 + B ** 2) * Math.sqrt(middleA ** 2 + middleB ** 2)));

        // -180 <= phi <= 180
        const phi = phiRadians * 180 / Math.PI * (mouseXOnBlock < blockMiddleX ? -1 : 1);
        const absPhi = Math.abs(phi);

        r = 255 * (180 - absPhi) / 180;
        g = 255 * (absPhi > 45 ? Math.abs(absPhi - 45) / 135 : 0);
        b = 255 * (phi < 0 ? absPhi : 0) / 180;

        mouseColor.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
    });

});
