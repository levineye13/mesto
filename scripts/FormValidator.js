class FormValidator {
  constructor(validationObject, formElement) {
    this._formSelector = validationObject.formSelector;
    this._inputSelector = validationObject.inputSelector;
    this._submitButtonSelector = validationObject.submitButtonSelector;
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorClass = validationObject.inputErrorClass;
    this._errorClass = validationObject.errorClass;
    this._formElement = formElement;
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
    errorElement.textContent = "";
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
      buttonElement.setAttribute("disabled", "");
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //Обработчики событий
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._handleToggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._handleCheckInputValidity(inputElement);
        this._handleToggleButtonState(inputList, buttonElement);
      });
    });
  }

  //Публичный метод включения валидации
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

export { FormValidator };
