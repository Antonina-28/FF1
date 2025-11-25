import 'swiper/css';
import 'swiper/css/navigation';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const options = {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  slidesPerGroup: 1,

  modules: [Navigation],

  navigation: {
        prevEl: '.reviews__nav-button--prev',
        nextEl: '.reviews__nav-button--next',
    },

  breakpoints: {
    320: {
      initialSlide: 1,
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
    1440: {
        slidesPerView: 1,
        spaceBetween: 30,
        enabled: false,
        loop: false,
    },
  },
};

export function reviewsSlider() {
  const screenWidth = window.innerWidth;
    if (screenWidth < 1440) {
      new Swiper('#swiper-reviews', options);
    }
}
