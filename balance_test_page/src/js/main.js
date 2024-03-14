import "../scss/main.scss";
import bootstrap from 'bootstrap';

$(function () {
    const $body = $('body');

    $('.navbar-toggler').on('click', (e) => {
        const isSideMenuCollapsed = $body.hasClass('menu-collapsed');
    
        $body[`${isSideMenuCollapsed ? 'remove' : 'add'}Class`]('menu-collapsed');
    });

    const checkViewport = () => {
        $body[`${$(window).width() < 992 ? 'add' : 'remove'}Class`]('menu-collapsed');
    };

    checkViewport();
    $(window).on('resize', checkViewport);
});