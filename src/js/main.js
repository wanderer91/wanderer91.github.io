import "../scss/main.scss";
import $ from 'jquery';
import axios from "axios";
import {Collapse, Modal} from 'bootstrap';
import Projects from "./index/blocks/Projects.js";
import Tools from "./index/blocks/Tools.js";
import Demo from "./index/blocks/Demo.js";

window.$ = $;
window.axios = axios;

$(function () {
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate(
                  {
                     scrollTop: (target.offset().top - 70)
                  },
                  300
               );
               return false;
            }
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        $('.scroll-to-top')[`fade${$(this).scrollTop() > 100 ? 'In' : 'Out'}`]();
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').on('click', function () {
         const navbarResponsive = new Collapse(
            '#navbarResponsive',
            {
               toggle: false,
            }
         );
         navbarResponsive.hide();
    });

    // Collapse Navbar
    var navbarCollapse = function () {
         const $mainNav = $("#mainNav");
         $mainNav[`${$mainNav.offset().top > 100 ? 'add' : 'remove'}Class`]('navbar-shrink');
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).on('scroll', navbarCollapse);

    (new Projects('.portfolio__row'));
    (new Tools('.skills .section__content'));
    (new Demo('.demo .section__content'));

    $(document).on('click', '[data-dismiss="modal"]', (e) => {
        e.preventDefault();

        const $modalEl = $(e.target).closest('.modal');

        if (!$modalEl.length) {
            return;
        }

        $modalEl.data('modal').hide();
    });
});