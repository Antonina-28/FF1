const mainNav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const navButton = document.querySelector('.main-nav__btn');
const socialList = document.querySelector('.social-list');

export default function burgerMenu() {
  navToggle.addEventListener('click', () => {
    if (mainNav.classList.contains('main-nav--closed')) {
      mainNav.classList.remove('main-nav--closed');
      mainNav.classList.add('main-nav--opened');
      navButton.style.display = 'block';
      socialList.style.display = 'flex';
    } else {
      mainNav.classList.add('main-nav--closed');
      mainNav.classList.remove('main-nav--opened');
      navButton.style.display = 'none';
      socialList.style.display = 'none';
    }
  });
};