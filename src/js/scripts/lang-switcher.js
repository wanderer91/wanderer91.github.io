const langSwitcher = document.querySelector('.lang-switcher');

langSwitcher.addEventListener('click', (event) => {

    const target = event.target.closest('.lang-switcher__link');

    if (!target) {
        return;
    }

    event.preventDefault();

    const lang = target.dataset.lang;

    document.cookie = `lang=${lang}`;

    window.location.reload();

});