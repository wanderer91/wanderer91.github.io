import "../../scss/blocks/mouse-images.scss";

document.addEventListener('DOMContentLoaded', function () {

    const mouseImages = document.querySelector('.mouse-images');
    const boundingRect = mouseImages.getBoundingClientRect();
    const images = Array.from(mouseImages.children);
    const indexes = [...images.keys()].sort(() => Math.random() - 0.5);

    const overlayWidth = mouseImages.offsetWidth / images.length;

    let visibleIndex = indexes[0];

    images[visibleIndex].style.display = 'block';

    function changeImage (event) {

        const x = (event.type === 'touchmove' ? event.targetTouches[0].clientX : event.clientX) - boundingRect.left;
        const index = Math.floor(x / overlayWidth);

        images[visibleIndex].style = null;
        images[indexes[index]].style.display = 'block';
        visibleIndex = indexes[index];
    }

    mouseImages.addEventListener('mousemove',changeImage);
    mouseImages.addEventListener('touchmove',changeImage);


});
