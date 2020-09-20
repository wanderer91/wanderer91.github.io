import "../../scss/blocks/mouse-images.scss";

document.addEventListener('DOMContentLoaded', function () {

    const mouseImages = document.querySelector('.mouse-images');
    const boundingRect = mouseImages.getBoundingClientRect();
    const images = Array.from(mouseImages.children);
    const indexes = [...images.keys()].sort(() => Math.random() - 0.5);

    let overlayWidth, visibleIndex;

    function changeImage (event) {

        const x = (event.type === 'touchmove' ? event.targetTouches[0].clientX : event.clientX) - boundingRect.left;
        let index = Math.floor(x / overlayWidth);

        index = index > images.length - 1 ? images.length - 1 : (index < 0 ? 0 : index);

        images[visibleIndex].style = null;
        images[indexes[index]].style.display = 'block';
        visibleIndex = indexes[index];
    }

    function init() {
        overlayWidth = mouseImages.offsetWidth / images.length;
        visibleIndex = indexes[0];
        images[visibleIndex].style.display = 'block';
    }

    init();
    window.addEventListener('resize', init);

    mouseImages.addEventListener('mousemove',changeImage);
    mouseImages.addEventListener('touchmove',changeImage);


});
