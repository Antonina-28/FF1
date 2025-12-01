import '../styles/styles.scss'

import burgerMenu from './modules/burger-menu';
import { servicesSlider } from './modules/services-slider';
import { reviewsSlider } from './modules/reviews-slider';
import { handleReviewTabs } from './modules/review-tabs';
import { initScrollToTop } from './modules/scroll-to-top';
import { initPopup } from './modules/init-popup.js';
import { FormValidator } from './modules/form-validator.js';


document.addEventListener('DOMContentLoaded', function() {
    const popup = initPopup();

    window.app = window.app || {};
    window.app.popup = popup;
    
    burgerMenu();
    servicesSlider();
    reviewsSlider();
    initScrollToTop();

    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        new FormValidator(contactForm, {
            inputSelector: '.form-contact__input',
            checkboxSelector: '.form-contact__checkbox',
            groupSelector: '.form-contact__group',
            errorClass: 'form-contact__error',
            inputErrorClass: 'form-contact__input--error',
            inputSuccessClass: 'form-contact__input--success',
            groupErrorClass: 'form-contact__group--error',
            successClass: 'form-contact__success'
        });
    }

    // Вызывать только на десктопе
    if (window.innerWidth >= 1440) {
        handleReviewTabs();
    }

});
