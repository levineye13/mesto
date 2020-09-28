import './index.css';
import Card from './../components/Card.js';
import FormValidator from './../components/FormValidator.js';
import Section from './../components/Section.js';
import PopupWithImage from './../components/PopupWithImage.js';
import PopupWithForm from './../components/PopupWithForm.js';
import UserInfo from './../components/UserInfo.js';
import {
  initialCards,
  validationObject,
  containerSelector,
  openEditFormButton,
  openCardFormButton,
  profileTitleSelector,
  profileSubtitleSelector,
  nameFieldSelector,
  jobFieldSelector,
} from './../utils/constants.js';

//Экземпляр попапа с картинкой
const imagePopup = new PopupWithImage('.popup_type_image');

/**
 * Функция создания объекта карточки
 *
 * @param  {string} name
 * @param  {string} link
 * @return {Card}
 */
const createCard = (name, link) => {
  const card = new Card(
    {
      name,
      link,
      handleCardClick: (name, link) => {
        imagePopup.setEventListeners();
        imagePopup.open(name, link);
      },
    },
    '#template-card'
  );

  return card;
};

//Создание экземпляра класса Section, вставляющего разметку
const renderCards = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      renderCards.addItem(createCard(name, link).getView(), true);
    },
  },
  containerSelector
);

renderCards.renderItems();

//Создание экземпляра формы добавления карточки
const addCardPopup = new PopupWithForm('.popup_type_add-card', {
  handleSubmitForm: ({ place: name, link }) => {
    renderCards.addItem(createCard(name, link).getView(), false);
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();

//Создание экземпляра информации о пользователе
const userInfo = new UserInfo({
  profileTitleSelector,
  profileSubtitleSelector,
});

//!Заполнение инпутов при загрузке страницы, иначе кнопка была бы disable даже при заполненных полях,
//!так как они заполняются только при открытии попапа
const setFormFields = () => {
  const { name, info } = userInfo.getUserInfo();

  document.querySelector(nameFieldSelector).value = name;
  document.querySelector(jobFieldSelector).value = info;
};

setFormFields();

//Создание экземпляра формы редактирования профиля
const editInfoPopup = new PopupWithForm('.popup_type_profile', {
  handleSubmitForm: ({ name, occupation }) => {
    userInfo.setUserInfo({ name, info: occupation });
    editInfoPopup.close();
    setFormFields();
  },
});
editInfoPopup.setEventListeners();

//Открытие формы редактирования
openEditFormButton.addEventListener('click', () => {
  setFormFields();
  editInfoPopup.open();
});

//открытие формы добавления карточек
openCardFormButton.addEventListener('click', () => addCardPopup.open());

//Валидация форм
const formList = document.querySelectorAll(validationObject.formSelector);
formList.forEach((formElement) => {
  const formValid = new FormValidator(formElement, validationObject);
  formValid.enableValidation();
});
