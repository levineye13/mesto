import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__card-img');
    this._cardTitle = this._popup.querySelector('.popup__title-img');
  }

  open(name, link) {
    this._cardTitle.textContent = name;
    this._cardImage.src = link;
    this._cardImage.setAttribute('alt', name);
    super.open();
  }
}
