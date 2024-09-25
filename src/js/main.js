import "../scss/main.scss";
import $ from 'jquery';
import {Collapse} from 'bootstrap';

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

    // Modal popup$(function () {
    // $('.portfolio-item').magnificPopup({
    //     type: 'inline',
    //     preloader: false,
    //     focus: '#username',
    //     modal: true
    // });
    // $(document).on('click', '.portfolio-modal-dismiss', function (e) {
    //     e.preventDefault();
    //     $.magnificPopup.close();
    // });

    $('.project__images').each(function (galleryIndex) {
        $(this).find('.project__images-item').each(function () {
            var imageSrc = $(this).data('src');
            var $fancyboxLink = $('<a data-fancybox="gallery' + galleryIndex + '" href="' + imageSrc + '"></a>');

            $('<img src="' + imageSrc + '" class="' + $(this).data('classes') + '" alt="" loading="lazy"/>').appendTo($fancyboxLink);
            $fancyboxLink.appendTo($(this));
        });
    });
});