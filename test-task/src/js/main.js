import { Collapse } from 'bootstrap';

import Swiper from 'swiper';
import {Autoplay} from 'swiper/modules';
import Navbar from './blocks/navbar.js';
import Appointment from './blocks/appointment.js';

import 'swiper/css';
import 'swiper/css/autoplay';
import "../scss/main.scss";

document.addEventListener( 'DOMContentLoaded', ( e ) => {
    new Navbar( '.navbar' );
    new Appointment( '.js-appointment' );

    const swiper = new Swiper( '.swiper', {
        modules: [Autoplay],
        loop: true,
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
    } );
} );