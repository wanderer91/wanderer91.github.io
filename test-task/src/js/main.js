import { Collapse } from 'bootstrap';

import Swiper from 'swiper';
import Navbar from './blocks/navbar.js';
import Appointment from './blocks/appointment.js';

import 'swiper/css';
import "../scss/main.scss";

document.addEventListener('DOMContentLoaded', (e) => {
    new Navbar('.navbar');
    new Appointment('.js-appointment');
});