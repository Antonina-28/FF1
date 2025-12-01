export class FormValidator {
  constructor(form, config = {}) {
    this.form = form;
    this.wasSubmitted = false;
    this.config = {
      inputSelector: '.popup__input',
      checkboxSelector: '.popup__checkbox',
      groupSelector: '.popup__group',
      errorClass: 'popup__error',
      inputErrorClass: 'popup__input--error',
      inputSuccessClass: 'popup__input--success',
      groupErrorClass: 'popup__group--error',
      successClass: 'popup__success',
      ...config
    };
    if (this.form) {
      this.init();
    } else {
      console.error('Form element not provided');
  }
}

  init() {
    this.setupValidation();
    this.setupPhoneMask();
    this.setupSubmitHandler();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll(this.config.inputSelector);
    
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.validateField(e.target);
      });

      input.addEventListener('blur', (e) => {
        this.validateField(e.target);
      });
    });

    // Валидация чекбокса
    const checkbox = this.form.querySelector(this.config.checkboxSelector);
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        this.validateCheckbox(checkbox);
      });
    }
  }

  setupPhoneMask() {
    const phoneInput = this.form.querySelector('input[type="tel"]');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
      this.formatPhoneNumber(e.target);
    });

    phoneInput.addEventListener('keydown', (e) => {
      if (!/[\dBackspaceArrowLeftArrowRightDeleteTab]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('8')) {
        value = '7' + value.substring(1);
    } else if (value.startsWith('7')) {
        value = value; 
    } else if (value) {
        value = '7' + value;
    }

    let formattedValue = '+7';
    
    if (value.length > 1) {
      formattedValue += ' (' + value.substring(1, 4);
    }
    if (value.length >= 5) {
      formattedValue += ') ' + value.substring(4, 7);
    }
    if (value.length >= 8) {
      formattedValue += '-' + value.substring(7, 9);
    }
    if (value.length >= 10) {
      formattedValue += '-' + value.substring(9, 11);
    }

    input.value = formattedValue;
  }

  validateField(field) {
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    switch (type) {
      case 'text':
        isValid = this.validateName(field.value);
        errorMessage = 'Имя может содержать только буквы';
        break;

      case 'tel':
        isValid = this.validatePhone(field.value);
        errorMessage = 'Введите корректный номер телефона';
        break;

      case 'email':
        isValid = this.validateEmail(field.value);
        errorMessage = 'Введите корректный email адрес';
        break;
    }

    this.setFieldState(field, isValid, errorMessage);
    return isValid;
  }

  validateCheckbox(checkbox) {
    const isValid = checkbox.checked;
    this.setCheckboxState(checkbox, isValid);
    return isValid;
  }

  validateName(value) {
    if (value.trim() === '') return false;
    return /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(value);
  }

  validatePhone(value) {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.length === 11 && cleanValue.startsWith('7');
  }

  validateEmail(value) {
    if (value.trim() === '') return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  setFieldState(field, isValid, message) {
    field.classList.toggle(this.config.inputErrorClass, !isValid);
    field.classList.toggle(this.config.inputSuccessClass, isValid && field.value.trim() !== '');
    
    // Создаем или обновляем сообщение об ошибке
    let errorElement = field.parentNode.querySelector(`.${this.config.errorClass}`);
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = this.config.errorClass;
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = isValid ? '' : message;
  }

  setCheckboxState(checkbox, isValid) {
    const checkboxGroup = checkbox.closest(this.config.groupSelector);
    if (checkboxGroup) {
      checkboxGroup.classList.toggle(this.config.groupErrorClass, !isValid);
    
      // Создаем или обновляем сообщение об ошибке для чекбокса
      let errorElement = checkboxGroup.querySelector(`.${this.config.errorClass}`);
      if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = this.config.errorClass;
        checkboxGroup.appendChild(errorElement); // Добавляем в конец группы
      }
    
      errorElement.textContent = isValid ? '' : 'Необходимо согласиться с политикой конфиденциальности';
    }
  }

  setupSubmitHandler() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        this.submitForm();
      }
    });
  }

  validateForm() {
    const inputs = this.form.querySelectorAll(this.config.inputSelector);
    const checkbox = this.form.querySelector(this.config.checkboxSelector);
    
    let isFormValid = true;

    // Валидируем все поля
    inputs.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    // Валидируем чекбокс
    if (checkbox && !this.validateCheckbox(checkbox)) {
      isFormValid = false;
    }

    return isFormValid;
  }

  clearForm(force = false) {
    if (!this.form) return;
    
    // Если форма не отправлена и force = false, спрашиваем подтверждение
    if (!force && this.hasUserInput() && !this.wasSubmitted) {
      const shouldClear = confirm('Вы уверены, что хотите очистить форму? Введенные данные будут потеряны.');
      if (!shouldClear) return;
    }

    this.form.reset();
    this.clearValidationStates();
    this.wasSubmitted = false;
  }

  hasUserInput() {
    const inputs = this.form.querySelectorAll(this.config.inputSelector);
    for (let input of inputs) {
      if (input.value.trim() !== '') return true;
    }
    return false;
  }

  clearValidationStates() {
    // Очищаем стили ошибок/успеха
    this.form.querySelectorAll(this.config.inputSelector).forEach(input => {
      input.classList.remove(this.config.inputErrorClass, this.config.inputSuccessClass);
    });
  
    // Очищаем сообщения об ошибках (не удаляем элементы)
    this.form.querySelectorAll(`.${this.config.errorClass}`).forEach(error => {
      error.textContent = '';
    });
  
    // Очищаем стили чекбокса
    const checkboxGroup = this.form.querySelector(this.config.groupSelector);
    if (checkboxGroup) {
      checkboxGroup.classList.remove(this.config.groupErrorClass);
    }
  }

  submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    console.log('Форма отправлена:', data);
    
    // Здесь AJAX запрос
    // fetch('/api/contact', { 
    //   method: 'POST', 
    //   body: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    
    this.wasSubmitted = true; // Устанавливаем флаг перед очисткой
    this.showSuccessMessage();
    this.clearForm();
  }

  showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = this.config.successClass;
    successMessage.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
    successMessage.style.cssText = `
      background: #00c851;
      color: white;
      padding: 15px;
      border-radius: 5px;
      margin-top: 15px;
      text-align: center;
    `;

        // Вставляем перед формой
    this.form.parentNode.insertBefore(successMessage, this.form);
    
    // Убираем сообщение через 3 секунды
    setTimeout(() => {
      successMessage.remove();
    }, 3000);

    this.form.reset();
    this.clearValidationStates();
  }

  clearValidationStates() {
    // Очищаем стили валидации
    this.form.querySelectorAll('.popup__input').forEach(input => {
      input.classList.remove('popup__input--error', 'popup__input--success');
    });
    
    this.form.querySelectorAll('.popup__error').forEach(error => {
      error.remove();
    });
    
    const checkboxGroup = this.form.querySelector('.popup__group');
    if (checkboxGroup) {
      checkboxGroup.classList.remove('popup__group--error');
    }
  }
}