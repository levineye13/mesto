import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { link, name }) {
    super(popupSelector);
    this._src = link;
    this._text = name;
  }

  open() {
    this._popup.querySelector('.popup__card-img').src = this._src;
    this._popup.querySelector('.popup__title-img').textContent = this._text;
    super.open();
  }
}
