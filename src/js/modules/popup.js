import { FormValidator } from './form-validator.js';
export class Popup {
  constructor(templateId) {
    this.templateId = templateId;
    this.popup = null;
    this.isInitialized = false;
    this.formValidator = null;
  }

  init() {
    if (this.isInitialized) return;

    const template = document.getElementById(this.templateId);
    if (!template) {
      console.error(`Template #${this.templateId} not found`);
      return;
    }

    this.popup = template.content.cloneNode(true).firstElementChild;
    document.body.appendChild(this.popup);
    this.setupEvents();

    const form = this.popup.querySelector('.popup__form');
    if (form) {
      this.formValidator = new FormValidator(form);
    }

    this.isInitialized = true;
  }

  setupEvents() {
    const closeBtn = this.popup.querySelector('.popup__close');
    const overlay = this.popup.querySelector('.popup__overlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (overlay) {
      overlay.addEventListener('click', () => this.close());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    this.popup.querySelector('.popup__content').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  open() {
    if (!this.isInitialized) this.init();
    
    this.popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      this.popup.classList.add('popup--active');
    }, 10);
  }

  close() {
    this.popup.classList.remove('popup--active');
    
    setTimeout(() => {
      this.popup.style.display = 'none';
      document.body.style.overflow = '';

      if (this.formValidator) {
        this.formValidator.clearForm();
      }
    }, 300);

  }

  clearForm() {
    if (this.formValidator) {
      this.formValidator.clearForm();
    }
  }

  isOpen() {
    return this.popup?.style.display === 'block';
  }

  destroy() {
    if (this.popup && this.popup.parentNode) {
      this.clearForm();
      this.popup.parentNode.removeChild(this.popup);
      this.isInitialized = false;
    }
  }
}