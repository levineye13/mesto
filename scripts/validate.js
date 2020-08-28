//Показать ошибку для невалидного поля
const showInputError = (
  validationObject,
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObject.errorClass);
};

//Скрыть ошибку для валидного поля
const hideInputError = (validationObject, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.classList.remove(validationObject.errorClass);
  errorElement.textContent = "";
};

//Проверка поля на валидность
const checkInputValidity = (validationObject, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      validationObject,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationObject, formElement, inputElement);
  }
};

//Проверка всех полей в форме на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Переключение состояния кнопки
const toggleButtonState = (validationObject, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
  }
};

//Добавление слушателя для полей ввода
const setEventListener = (validationObject, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationObject.submitButtonSelector
  );

  toggleButtonState(validationObject, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(validationObject, formElement, inputElement);
      toggleButtonState(validationObject, inputList, buttonElement);
    });
  });
};

//Включение валидации
const enableValidation = (validationObject) => {
  const formList = Array.from(
    document.querySelectorAll(validationObject.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListener(validationObject, formElement);
  });
};

//Вызов функции включения валидации
enableValidation({
	formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
