export function initScrollToTop() {
  const scrollToTopBtn = document.querySelector('.footer__btn-up');
  
  if (!scrollToTopBtn) {
    console.warn('Кнопка .footer__btn-up не найдена');
    return;
  }

  const handleScroll = () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('footer__btn-up--visible');
    } else {
      scrollToTopBtn.classList.remove('footer__btn-up--visible');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', handleScroll);
  scrollToTopBtn.addEventListener('click', scrollToTop);

  handleScroll();
}