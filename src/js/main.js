import '../styles/styles.scss'

import { ResponsiveRem } from './modules/responsiveRem';
import burgerMenu from './modules/burger-menu';
import { servicesSlider } from './modules/services-slider';
import { reviewsSlider } from './modules/reviews-slider';
import { handleReviewTabs } from './modules/review-tabs';
import { initScrollToTop } from './modules/scroll-to-top';


document.addEventListener('DOMContentLoaded', function() {
        const responsiveRem = new ResponsiveRem({
        designWidth: 1920,
        minWidth: 320,
        maxWidth: 2560,
        baseFontSize: 16,
        minFontSize: 14,
        maxFontSize: 24
    });
    
    // Экспортируем для доступа из других модулей (опционально)
    window.responsiveRem = responsiveRem;

    burgerMenu();
    servicesSlider();
    reviewsSlider();
    initScrollToTop();

    // Вызывать только на десктопе
    if (window.innerWidth >= 1440) {
        handleReviewTabs();
    }

});
