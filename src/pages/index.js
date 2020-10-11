//import './index.css';
import Api from './../components/Api.js';
import Card from './../components/Card.js';
import FormValidator from './../components/FormValidator.js';
import Section from './../components/Section.js';
import PopupWithImage from './../components/PopupWithImage.js';
import PopupWithForm from './../components/PopupWithForm.js';
import UserInfo from './../components/UserInfo.js';
import {
  validationObject,
  containerSelector,
  openEditFormButton,
	openCardFormButton,
	profileAvatar,
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
      //handleLikeClick: (card) => {
      //card._setEventListeners(card);
      //},
    },
    '#template-card'
  );
  return card;
};

/**
 * Функция проверки принадлежности карточки пользователю
 * 
 * @param  {Object} cardElement - разметка карточки
 * @param  {Object} ownerId - значение поля id создателя карточки
 * 
 * @return {Object} - возвращает туже разметку карточки, но возможность удаления дооступна только для своих карочек
 */
const checkOwnerCard = (cardElement, ownerId) => {
	if (ownerId !== 'a18ad6c4ea5951823f091de3') {
		cardElement.querySelector('.elements__delete-card').classList.add('elements__delete-card_inactive');
	}
	return cardElement;
}

//Создание экземпляра информации о пользователе
const userInfo = new UserInfo({
	//profileAvatar,
	profileTitleSelector,
	profileSubtitleSelector,
	});

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-16', {
	authorization: 'f1f27dcb-4c71-4cd5-a34d-2e8f5fd4811e',
	'Content-Type': 'application/json'
});

api.getProfileInfo()
	.then(data => {
		userInfo.setUserInfo(data);
	})

api.getInitialCards()
	.then(data => {
		const renderCards = new Section(
			{
				items: data,
				renderer: (data) => {
					const card = createCard(data.name, data.link).getView();
					renderCards.addItem(checkOwnerCard(card, data.owner._id), true);
				},
			},
			containerSelector
		);
		renderCards.renderItems();
	}
)

//Создание экземпляра формы добавления карточки
const addCardPopup = new PopupWithForm('.popup_type_add-card', {
	handleSubmitForm: ({ place: name, link }) => {
		api.addCard({ name, link })
			.then(data => {
				renderCards.addItem(createCard(data.name, data.link).getView(), false);
    		addCardPopup.close();
			})
  },
});
addCardPopup.setEventListeners();

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
	handleSubmitForm: (data) => {
		api.editProfile(data)
			.then(data => {
				userInfo.setUserInfo(data);
				editInfoPopup.close();
				setFormFields();
			})
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
