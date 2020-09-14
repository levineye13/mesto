class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  //Вернуть шаблон
  _getTemplate() {
    return document.querySelector(this._cardSelector).content;
  }

  //Лайк карточки
  _handleChangeLike(evt) {
    evt.target.classList.toggle("elements__group_active");
  }

  //Удаление карточек со страницы
  _handleRemoveCard(evt) {
    const cardElement = evt.target.closest(".elements__item");
    cardElement.remove();
  }

  //Обработчики
  _setEventListeners(cardElement) {
    cardElement
      .querySelector(".elements__delete-card")
      .addEventListener("click", (evt) => this._handleRemoveCard(evt));
    cardElement
      .querySelector(".elements__group")
      .addEventListener("click", (evt) => this._handleChangeLike(evt));
  }

  //Создание карточки
  generateCard() {
    this._cardElement = this._getTemplate().cloneNode(true);

    this._setEventListeners(this._cardElement);

    this._imgElement = this._cardElement.querySelector(".elements__img");
    this._imgElement.src = this._link;
    this._imgElement.setAttribute("alt", this._text);
    this._cardElement.querySelector(
      ".elements__title"
    ).textContent = this._text;

    return this._cardElement;
  }
}

export { Card };
