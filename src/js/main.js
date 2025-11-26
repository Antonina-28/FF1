import '../styles/styles.scss'

import burgerMenu from './modules/burger-menu';
import { servicesSlider } from './modules/services-slider';
import { reviewsSlider } from './modules/reviews-slider';
import { handleReviewTabs } from './modules/review-tabs';
import { initScrollToTop } from './modules/scroll-to-top';
import { initPopup } from './modules/init-popup.js';


document.addEventListener('DOMContentLoaded', function() {
    const popup = initPopup();

    window.app = window.app || {};
    window.app.popup = popup;
    
    burgerMenu();
    servicesSlider();
    reviewsSlider();
    initScrollToTop();

    // Вызывать только на десктопе
    if (window.innerWidth >= 1440) {
        handleReviewTabs();
    }

});
