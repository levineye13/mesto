export default class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._name = document.querySelector(profileTitleSelector);
    this._info = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    return {
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
  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
