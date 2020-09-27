export default class FormValidator {
  constructor(validationObject, formElement) {
    ({
      formSelector: this._fromSelector,
      inputSelector: this._inputSelector,
      submitButtonSelector: this._submitButtonSelector,
      inactiveButtonClass: this._inactiveButtonClass,
      inputErrorClass: this._inputErrorClass,
      errorClass: this._errorClass,
    } = validationObject),
      (this._formElement = formElement);
  }

  //Показать ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Скрыть ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Проверка всех инпутов формы на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Проверка инпута на валидность
  _handleCheckInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Переключатель состояния кнопки
  _handleToggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', '');
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //Обработчики событий
  _setEventListeners(inputList, buttonElement) {
    this._handleToggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleCheckInputValidity(inputElement);
        this._handleToggleButtonState(inputList, buttonElement);
      });
    });
  }

  //Публичный метод включения валидации
  enableValidation() {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //!Необходимо заблокировать кнопку здесь, тк после срабатывания события submit и очистки полей кнопка остается доступной,
      //!тк событие input не видит этих изменений
      this._handleToggleButtonState(inputList, buttonElement);
    });

    this._setEventListeners(inputList, buttonElement);
  }
}
