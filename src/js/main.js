import '../styles/styles.scss'

import burgerMenu from './modules/burger-menu';
import { servicesSlider } from './modules/services-slider';
import { reviewsSlider } from './modules/reviews-slider';
import { handleReviewTabs } from './modules/review-tabs';
import { initScrollToTop } from './modules/scroll-to-top';


document.addEventListener('DOMContentLoaded', function() {
    burgerMenu();
    servicesSlider();
    reviewsSlider();
    initScrollToTop();

    // Вызывать только на десктопе
    if (window.innerWidth >= 1440) {
        handleReviewTabs();
    }

});
