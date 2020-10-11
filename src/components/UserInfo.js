export default class UserInfo {
	constructor({ profileAvatar, profileTitleSelector, profileSubtitleSelector }) {
		//this._avatar = document.querySelector(profileAvatar);
    this._name = document.querySelector(profileTitleSelector);
    this._info = document.querySelector(profileSubtitleSelector);
  }
  /**
	 * Метод получения объекта информации о пользователе
	 * 
	 * @return {Object}
   */
  getUserInfo() {
		return {
			//avatar: this._avatar.src,
      name: this._name.textContent,
      info: this._info.textContent,
    };
	}
	
  /**
   * Метод устанавливает информацию о пользователе из введенных в форму значений
   *
   * @param  {string} name - имя пользователя
   * @param  {string} info - дополнительная информация
   */
	setUserInfo(data) {
		//this._avatar.src = data.avatar;
    this._name.textContent = data.name;
    this._info.textContent = data.about;
  }
}
