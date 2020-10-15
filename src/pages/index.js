//import './index.css';
import Api from './../components/Api.js';
import Card from './../components/Card.js';
import FormValidator from './../components/FormValidator.js';
import Section from './../components/Section.js';
import PopupWithImage from './../components/PopupWithImage.js';
import PopupWithForm from './../components/PopupWithForm.js';
import PopupWithConfirm from './../components/PopupWithConfirm.js';
import UserInfo from './../components/UserInfo.js';
import {
  validationObject,
  containerSelector,
  openEditFormButton,
	openCardFormButton,
	openUpdateFormButton,
	profileAvatarSelector,
  profileTitleSelector,
	profileSubtitleSelector,
  nameFieldSelector,
	jobFieldSelector
} from './../utils/constants.js';

let myId = null;

//Экземпляр попапа с картинкой
const imagePopup = new PopupWithImage('.popup_type_image');

const requestToggleLikeCard = (id, methodHTTP) => {
	api.likeCard(id, methodHTTP)
		.then(resData => console.log(resData))
		.catch(err => console.log(err))
}

/**
 * Функция создания объекта карточки
 *
 * @param  {string} name
 * @param  {string} link
 * @return {Card}
 */
const createCard = (data, confirmPopupObject) => {
  const card = new Card(
    {
			data,
      handleCardClick: (name, link) => {
        imagePopup.setEventListeners();
				imagePopup.open(name, link);
      },
			handleLikeClick: () => {
				if (card.getLikeButtonState()) {
					card.removeLike();
					card.setLikeButtonState(false);
					requestToggleLikeCard(data._id, 'DELETE');
				} else {
					card.addLike();
					card.setLikeButtonState(true);
					requestToggleLikeCard(data._id, 'PUT');
				}
			},
			handleDeleteIconClick: (cardElement) => {
				confirmPopupObject.setRemoveItemId(data._id);
				confirmPopupObject.setRemoveItemMarkup(cardElement);
				confirmPopupObject.setEventListeners();
				confirmPopupObject.open();
			}
    },
    '#template-card'
  );
  return card;
};

/**
 * Заполнение инпутов при загрузке страницы
 * 
 * @public
 */
const setFormFields = () => {
  const info = userInfo.getUserInfo();

  document.querySelector(nameFieldSelector).value = info.name;
  document.querySelector(jobFieldSelector).value = info.about;
};

/**
 * Функция проверки принадлежности карточки пользователю
 * 
 * @param  {Object} cardElement - разметка карточки
 * @param  {Object} ownerId - значение поля id создателя карточки
 * 
 * @return {Object} - возвращает туже разметку карточки, но возможность удаления дооступна только для своих карточек
 */
const checkOwnerCard = (cardElement, ownerId) => {
	if (ownerId !== myId) {
		cardElement.querySelector('.elements__delete-card').remove();
	}
	return cardElement;
}

//Создание экземпляра информации о пользователе
const userInfo = new UserInfo({
	profileAvatarSelector,
	profileTitleSelector,
	profileSubtitleSelector,
});
	
//Создание экземпляра формы удаления карточки
const deleteCardPopup = new PopupWithConfirm('.popup_type_confirm', {
	handleSubmitForm: (cardId) => {
		api.deleteCard(cardId)
			.catch(err => console.log(err));
		deleteCardPopup.close()
	}
});

//Создание экземпляра формы редактирования профиля
const editInfoPopup = new PopupWithForm('.popup_type_profile', {
	handleSubmitForm: (data) => {
		api.editProfile(data)
			.then(data => {
				userInfo.setUserInfo(data);
				editInfoPopup.close();
				setFormFields();
			})
			.catch(err => console.log(err))
		editInfoPopup.close();
	},
});

//Создание экземпляра формы редактирования аватара
const updateAvatarPopup = new PopupWithForm('.popup_type_update-avatar', {
	handleSubmitForm: (data) => {
		api.updateUserAvatar(data.link)
			.then(data => {
				document.querySelector(profileAvatarSelector).src = data.avatar;
			})
			.catch(err => console.log(err));
		updateAvatarPopup.close();
	}
});

//Экземпляр Api для осуществления запросов к серверу
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-16', {
	authorization: 'f1f27dcb-4c71-4cd5-a34d-2e8f5fd4811e',
	'Content-Type': 'application/json'
});

api.getProfileInfo()
	.then(data => {
		userInfo.setUserInfo(data);
		myId = userInfo.getUserInfo().id;
	})
	.catch(err => console.log(err))

api.getInitialCards()
	.then(data => {
		const renderCards = new Section(
			{
				items: data,
				renderer: (data) => {
					const card = createCard(data, deleteCardPopup);
					card.setCountLike(data.likes.length);
					const cardElement = card.getView();

					data.likes.forEach(item => {
						if (item._id === myId) {
							card.setLikeButtonState(true);
							card.toggleLikeButtonState(cardElement);
						}
					})
					renderCards.addItem(checkOwnerCard(cardElement, data.owner._id), true);
				},
			},
			containerSelector
		);
		renderCards.renderItems();

		//Создание экземпляра формы добавления карточки
		const addCardPopup = new PopupWithForm('.popup_type_add-card', {
			handleSubmitForm: ({ place: name, link }) => {
				api.addCard({ name, link })
					.then(data => {
						renderCards.addItem(createCard(data, deleteCardPopup).getView(), false);
					})
					.catch(err => err);
				addCardPopup.close();
			},
		});

		setFormFields();

		openCardFormButton.addEventListener('click', () => {
			addCardPopup.setEventListeners();
			addCardPopup.open();
		});
		openUpdateFormButton.addEventListener('click', () => {
			updateAvatarPopup.setEventListeners();
			updateAvatarPopup.open();
		});

		//Открытие формы редактирования
		openEditFormButton.addEventListener('click', () => {
			setFormFields();
			editInfoPopup.setEventListeners();
  		editInfoPopup.open();
		});
	})
	.then(() => {
		//Валидация форм
		const formList = document.querySelectorAll(validationObject.formSelector);
		formList.forEach((formElement) => {
			const formValid = new FormValidator(formElement, validationObject);
			formValid.enableValidation();
		});
	})
	.catch(err => console.log(err))
