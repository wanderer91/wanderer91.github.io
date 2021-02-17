import "../../scss/blocks/navbar.scss";

document.addEventListener('DOMContentLoaded', () => {

    const linksData = [
        {
            label: 'Главная',
            href: '#top'
        },
        {
            label: 'Кейсы',
            href: '#cases'
        },
        {
            label: 'Контакты',
            href: '#contacts'
        },
        {
            label: 'Лаборатория',
            href: '#lab'
        },
    ];

    let navbar, navbarNav;

    const createNavbar = () => {
        navbar = document.createElement('nav');
        navbar.classList.add('navbar');
        document.body.appendChild(navbar);

        navbar.innerHTML = '<div class="container"><div class="navbar__content">' +
            '<div class="navbar__logo"></div><ul class="navbar__nav"></ul>' +
            '</div></div>';

        window.addEventListener('translatePage', (event) => {
            if (event.detail.scrollTop > 70) {
                navbar.style.height = '60px';
            } else {
                navbar.style.height = '70px';
            }
        });

        createNavbarNav();
    };

    const createNavbarNav = () => {
        navbarNav = navbar.querySelector('.navbar__nav');

        linksData.forEach((data) => {
            const linksItem = document.createElement('li');
            const link = document.createElement('a');

            linksItem.classList.add('navbar__nav-item');
            link.href = data.href;
            link.textContent = data.label;
            link.classList.add('navbar__nav-link', 'link');

            link.addEventListener('mouseover', (event) => {
               event.target.closest('.link').classList.add('shaking-content');
            });

            link.addEventListener('mouseout', (event) => {
                event.target.closest('.link').classList.remove('shaking-content');
            });

            link.addEventListener('click', (event) => {
                event.preventDefault();

                const target = event.target.closest('.link');
                const id = target.href.match(/#(.*)$/)[1];
                const el = document.getElementById(id);

                if (!el) {
                    return;
                }

                window.dispatchEvent(
                    new CustomEvent('translatePageTriggered', {detail: {scrollTop: window._getScrollTop() + el.getBoundingClientRect().top}})
                )
            });

            linksItem.appendChild(link);
            navbarNav.appendChild(linksItem);
        });
    };

    createNavbar();
});
