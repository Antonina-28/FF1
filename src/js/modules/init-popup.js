import { Popup } from './popup.js';

export function initPopup() {
  const popup = new Popup('popup-template');
  
  const openButtons = document.querySelectorAll('[data-popup-open]');
  
  if (openButtons.length === 0) {
    console.warn('No popup open buttons found');
    return null;
  }
  
  openButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      popup.open();
    });
  });
  
  console.log('Popup initialized with', openButtons.length, 'buttons');
  
  return popup; // Возвращаем экземпляр для внешнего управления
}