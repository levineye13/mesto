export default class Api {
	constructor(baseUrl, headers) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	/**
	 * Метод обработки ответа сервера
	 * 
	 * @param  {Object} responce - объект ответа сервера
	 */
	_checkResponceStatus(responce) {
		if (responce.ok) {
			return responce.json();
		}
		return Promise.reject(`Ошибка: ${responce.status} - ${responce.statusText}`);
	}

	/**
	 * Метод получения информации о пользователе с сервера
	 * 
	 * @return {Object}
	 */
	getProfileInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: this._headers
		})
			.then(responce => this._checkResponceStatus(responce))
	}

	/**
	 * Метод получения карточек с сервера
	 * 
	 * @return {Object}
	 */
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: this._headers
		})
			.then(responce => this._checkResponceStatus(responce))
	}

	getInitialData() {
		return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
	}

	editProfile(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
			.then(responce => this._checkResponceStatus(responce))
	}

	addCard({ name, link }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name,
				link
			})
		})
			.then(responce => this._checkResponceStatus(responce))
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then(responce => this._checkResponceStatus(responce))
	}

	likeCard(cardId, methodHTTP) {
			return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
				method: methodHTTP,
				headers: this._headers
			})
				.then(responce => this._checkResponceStatus(responce))
	}

	updateUserAvatar(avatarLink) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatarLink
			})
		})
			.then(responce => this._checkResponceStatus(responce))
	}
}