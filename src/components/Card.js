export default class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._like = 0;
    this._handleCardClick = handleCardClick;
    //this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
  }

  /**
   * Вернуть шаблон карточки
   *
   * @return {object} Возвращает шаблон разметки
   * @private
   */
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true)
      .children[0];
  }

  /**
   * Лайк карточки
   *
   * @param  {object} cardElement - разметка карточки
   * @private
   */
  _handleLikeClick(cardElement) {
    cardElement
      .querySelector('.elements__like-button')
      .classList.toggle('elements__like-button_active');
    cardElement.querySelector('.elements__like-count').textContent = ++this
      ._like;
  }

  /**
   * Удаление карточек со страницы
   *
   * @param  {object} cardElement - разметка карточки
   * @private
   */
  _handleRemoveCard(cardElement) {
    cardElement.remove();
    cardElement = null;
  }

  /**
   * Обработчики событий
   *
   * @param  {object} cardElement - разметка карточки
   * @private
   */
  _setEventListeners(cardElement) {
    cardElement
      .querySelector('.elements__delete-card')
      .addEventListener('click', (evt) => {
        evt.stopPropagation();
        this._handleRemoveCard(cardElement);
      });
    cardElement
      .querySelector('.elements__like-button')
      .addEventListener('click', (evt) => {
        evt.stopPropagation();
        this._handleLikeClick(cardElement);
      });
    cardElement.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  /**
   * Создание карточки
   *
   * @public
   * @return {object} Возвращает заполненную разметку
   */
  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners(this._cardElement);

    this._imgElement = this._cardElement.querySelector('.elements__img');
    this._imgElement.src = this._link;
    this._imgElement.setAttribute('alt', this._name);
    this._cardElement.querySelector(
      '.elements__title'
    ).textContent = this._name;
    this._cardElement.querySelector(
      '.elements__like-count'
    ).textContent = this._like;

    return this._cardElement;
  }
}
