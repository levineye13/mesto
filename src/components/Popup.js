export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) =>
      this._handleScreenClickClose(evt)
    );
    this._popup.addEventListener('click', (evt) =>
      this._handleButtonClose(evt)
    );
  }

  //Закрытие на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Закрытие по оверлею
  _handleScreenClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  //Закрытие по клику на кнопку
  _handleButtonClose(evt) {
    if (evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }
}
