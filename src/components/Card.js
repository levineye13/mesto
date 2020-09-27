export default class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  //Вернуть шаблон
  _getTemplate() {
    return document.querySelector(this._cardSelector).content;
  }

  //Лайк карточки
  _handleChangeLike(evt) {
    evt.target.classList.toggle('elements__group_active');
  }

  //Удаление карточек со страницы
  _handleRemoveCard(evt) {
    const cardElement = evt.target.closest('.elements__item');
    cardElement.remove();
  }

  //Обработчики
  _setEventListeners(cardElement) {
    cardElement
      .querySelector('.elements__delete-card')
      .addEventListener('click', (evt) => {
        evt.stopPropagation();
        this._handleRemoveCard(evt);
      });
    cardElement
      .querySelector('.elements__group')
      .addEventListener('click', (evt) => {
        evt.stopPropagation();
        this._handleChangeLike(evt);
      });
    cardElement.addEventListener('click', () => this._handleCardClick());
  }

  //Создание карточки
  generateCard() {
    this._cardElement = this._getTemplate().cloneNode(true).children[0];
    this._setEventListeners(this._cardElement);

    this._imgElement = this._cardElement.querySelector('.elements__img');
    this._imgElement.src = this._link;
    this._imgElement.setAttribute('alt', this._name);
    this._cardElement.querySelector(
      '.elements__title'
    ).textContent = this._name;

    return this._cardElement;
  }
}
