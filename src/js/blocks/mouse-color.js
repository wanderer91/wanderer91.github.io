document.addEventListener('DOMContentLoaded', function () {

    const mouseColor = document.querySelector('.mouse-color');
    const boundingRect = mouseColor.getBoundingClientRect();

    mouseColor.addEventListener('mousemove', function (event) {
        let target = event.target,
            mouseXOnBlock = event.clientX - boundingRect.left,
            mouseYOnBlock = event.clientY - boundingRect.top,
            r = mouseXOnBlock / target.offsetWidth * 127 + mouseYOnBlock / target.offsetHeight * 128,
            g = 255 - mouseXOnBlock / target.offsetWidth * 127 - mouseYOnBlock / target.offsetHeight * 128,
            b = 255 - mouseXOnBlock / target.offsetWidth * 127 - mouseYOnBlock / target.offsetHeight * 128;

        mouseColor.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
    });

});
