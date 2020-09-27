export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    document.addEventListener('click', (evt) =>
      this._handleScreenClickClose(evt)
    );
    document.addEventListener('click', (evt) => this._handleButtonClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleScreenClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  _handleButtonClose(evt) {
    if (evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }
}
