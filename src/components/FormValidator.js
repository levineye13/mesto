export default class FormValidator {
  constructor(formElement, validationObject) {
    this._formElement = formElement;
    this._validationObject = validationObject;
  }

  //Показать ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationObject.errorClass);
  }

  //Скрыть ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._validationObject.inputErrorClass);
    errorElement.classList.remove(this._validationObject.errorClass);
    errorElement.textContent = '';
  }

  /**
   * Проверка всех инпутов формы на валидность
   *
   * @private
   * @param  {Array} inputList - список полей ввода
   * @return {boolean} true - невалидный инпут
   */
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

  /**
   * Переключатель состояния кнопки
   *
   * @private
   * @param  {Array} inputList - список полей ввода
   * @param  {object} buttonElement - кнопка сабмита
   */
  _handleToggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', '');
      buttonElement.classList.add(this._validationObject.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(
        this._validationObject.inactiveButtonClass
      );
    }
  }

  /**
   * Обработчики событий
   *
   * @private
   * @param  {Array} inputList - список полей ввода
   * @param  {object} buttonElement - кнопка сабмита
   */
  _setEventListeners(inputList, buttonElement) {
    this._handleToggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleCheckInputValidity(inputElement);
        this._handleToggleButtonState(inputList, buttonElement);
      });
    });
  }

  /**
   * Публичный метод включения валидации
   *
   * @public
   * @this {object}
   */
  enableValidation() {
    const buttonElement = this._formElement.querySelector(
      this._validationObject.submitButtonSelector
    );

    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationObject.inputSelector)
    );

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //!Необходимо заблокировать кнопку здесь, тк после срабатывания события submit и очистки полей кнопка остается доступной, тк событие input не видит этих изменений
      this._handleToggleButtonState(inputList, buttonElement);
    });

    this._setEventListeners(inputList, buttonElement);
  }
}
