export default class Card {
	constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._data = data;
		this._likeCount = 0;
		this._isLiked = false;
    this._handleCardClick = handleCardClick;
		this._handleLikeClick = handleLikeClick;
		this._handleDeleteIconClick = handleDeleteIconClick;
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
	toggleLikeButtonState(cardElement) {
			cardElement.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
	}

	setLikeButtonState(state) {
		this._isLiked = state;
	}

	getLikeButtonState() {
		return this._isLiked;
	}
	
	setCountLike(countLike) {
		this._likeCount = countLike;
	}

	addLike() {
		this._cardElement.querySelector(
      '.elements__like-count'
		).textContent = ++this._likeCount;
	}

	removeLike() {
		this._cardElement.querySelector(
      '.elements__like-count'
		).textContent = --this._likeCount;
	}

  /**
   * Удаление карточек со страницы
   *
   * @param  {object} cardElement - разметка карточки
   * @private
   */
  // _handleRemoveCard(cardElement) {
  //   cardElement.remove();
  //   cardElement = null;
  // }

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
        this._handleDeleteIconClick(cardElement);
      });
    cardElement
      .querySelector('.elements__like-button')
      .addEventListener('click', (evt) => {
				evt.stopPropagation();
				this.toggleLikeButtonState(cardElement);
				this._handleLikeClick();
      });
    cardElement.addEventListener('click', () =>
      this._handleCardClick(this._data.name, this._data.link)
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
    this._imgElement.src = this._data.link;
    this._imgElement.setAttribute('alt', this._data.name);
    this._cardElement.querySelector(
      '.elements__title'
    ).textContent = this._data.name;
    this._cardElement.querySelector(
      '.elements__like-count'
		).textContent = this._likeCount;
		
    return this._cardElement;
  }
}
