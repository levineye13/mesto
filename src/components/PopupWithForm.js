import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValue() {
    this._inputList = this._popup
      .querySelector('.popup__form')
      .querySelectorAll('.popup__input');
    this._inputValues = {};

    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector('.popup__form')
      .addEventListener('submit', () =>
        this._handleSubmitForm(this._getInputValue())
      );
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
