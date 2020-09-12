const preloadedContent = document.querySelectorAll('[data-preloader]');

function launchPreloader(preloaded) {

    const progressBar = preloaded.querySelector('.preloader__progressbar');
    const progressBarLine = progressBar.querySelector('.preloader__progressbar-line');
    const progressBarWidth = progressBar.offsetWidth;

    const growthTimeStep = 50;
    const growthUpTime = 4000;
    const stepsCount = Math.round(growthUpTime / growthTimeStep);
    const growthWidthStep = Math.round(progressBarWidth / stepsCount);

    let counter = 0;

    function increaseProgressLine() {

        counter ++;

        progressBarLine.style.width = `${counter * growthWidthStep}px`;

        if (counter < stepsCount) {
            setTimeout(increaseProgressLine, growthTimeStep);
        } else {
            progressBar.classList.add('expanded');
            preloaded.querySelector('.preloader__content').classList.add('visible');
        }
    }

    setTimeout(increaseProgressLine, 0);

}

preloadedContent.forEach((preloaded) => {

    preloaded.innerHTML = `<div class="preloader" style="height: ${preloaded.offsetHeight}px;">` +
        `<div class="preloader__progressbar">` +
        `<div class="preloader__progressbar-line"></div>` +
        `</div>` +
        `<div class="preloader__content">${preloaded.innerHTML}</div>` +
        `</div>`;

    launchPreloader(preloaded);

});
