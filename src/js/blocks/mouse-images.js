import "../../scss/blocks/mouse-images.scss";

document.addEventListener('DOMContentLoaded', function () {

    const mouseImages = document.querySelector('.mouse-images');
    const boundingRect = mouseImages.getBoundingClientRect();
    const images = Array.from(mouseImages.children);
    const overlayWidth = mouseImages.offsetWidth / images.length;

    let visibleIndex = 0;

    images[visibleIndex].style.display = 'block';

    mouseImages.addEventListener('mousemove', function (event) {

        const x = event.clientX - boundingRect.left;
        const imageIndex = Math.floor(x / overlayWidth);

        images[visibleIndex].style = null;
        images[imageIndex].style.display = 'block';
        visibleIndex = imageIndex;

    });


});
