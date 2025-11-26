const mainNav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

export default function burgerMenu() {
  if (!mainNav || !navToggle) {
    return;
  }

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('main-nav--opened');
    mainNav.classList.toggle('main-nav--closed');
  });
};