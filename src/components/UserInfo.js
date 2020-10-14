export default class UserInfo {
	constructor({ profileAvatarSelector, profileTitleSelector, profileSubtitleSelector }) {
		this._avatar = document.querySelector(profileAvatarSelector);
    this._name = document.querySelector(profileTitleSelector);
    this._about = document.querySelector(profileSubtitleSelector);
  }
  /**
	 * Метод получения объекта информации о пользователе
	 * 
	 * @return {Object}
   */
  getUserInfo() {
		return {
			avatar: this._avatar.src,
      name: this._name.textContent,
      about: this._about.textContent,
    };
	}
	
  /**
   * Метод устанавливает информацию о пользователе из введенных в форму значений
   *
   * @param  {string} name - имя пользователя
   * @param  {string} info - дополнительная информация
   */
	setUserInfo(data) {
		this._avatar.src = data.avatar;
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}
