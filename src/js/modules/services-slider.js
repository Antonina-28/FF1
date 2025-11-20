import 'swiper/css';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

const options = {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  slidesPerGroup: 1,
  modules: [Pagination],
  pagination: {
        el: '.services__dots-wrapper',
        clickable: true,
        dynamicMainBullets: 4,
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
        slidesPerView: 4,
        spaceBetween: 30,
        enabled: false,
        loop: false,
        pagination: {
            el: '',
        }
    },
  },
};

export function servicesSlider() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 1440) {
    new Swiper('#swiper-services', options);
  }
}
