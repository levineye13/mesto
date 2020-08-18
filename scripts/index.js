const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
	}
];

const profilePopup = document.querySelector('.popup_profile');
const addCardPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');
const editForm = profilePopup.querySelector('#edit-form');
const addForm = addCardPopup.querySelector('#add-form');
const nameInput = profilePopup.querySelector('#name-input');
const jobInput = profilePopup.querySelector('#job-input');
const placeInput = addCardPopup.querySelector('#place-input');
const linkInput = addCardPopup.querySelector('#link-input');
const cardTitle = document.querySelector('.elements__title');
const closeButtonProfile = profilePopup.querySelector('.popup__close-button');
const closeButtonAddCard = addCardPopup.querySelector('.popup__close-button');
const closeButtonImage = imagePopup.querySelector('.popup__close-button');
const profile = document.querySelector('.profile');
const title = profile.querySelector('.profile__title');
const subtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const elementsList = document.querySelector('.elements__list');
const popupImgContainer = imagePopup.querySelector('.popup__img-container');
const popupImage = popupImgContainer.querySelector('.popup__card-img');
const popupTitle = popupImgContainer.querySelector('.popup__title-img');

//Обработка лайков
const changeLike = evt => {
	const target = evt.target;

	target.classList.toggle('elements__group_active');
}

//Удаление карточек со страницы
const removeCard = evt => {
	const target = evt.target;

	const elementsItem = target.closest('.elements__item');
	elementsItem.remove();
}

//Заполнение попапа с картинкой
const fillImageContainer = evt => {
	const target = evt.target;
	const card = target.closest('.elements__item');

	popupImage.src = target.src;
	popupImage.setAttribute('alt', target.getAttribute('alt'));
	popupTitle.textContent = card.querySelector('.elements__title').textContent;

	openImagePopup();
}

//Создание карточки
const createCard = (name, link) => {
	const templateCard = document.querySelector('#template-card').content;
	const card = templateCard.cloneNode(true);

	const cardImg = card.querySelector('.elements__img');
	const deleteCardButton = card.querySelector('.elements__delete-card');
	const likeCardButton = card.querySelector('.elements__group');

	cardImg.src = link;
	cardImg.setAttribute('alt', name);
	card.querySelector('.elements__title').textContent = name;
	cardImg.addEventListener('click', fillImageContainer);
	deleteCardButton.addEventListener('click', removeCard);
	likeCardButton.addEventListener('click', changeLike);

	return card;
}

//Добавление всех карточек из массива
const addCardToPage = arr => {
	arr.forEach(item => {
		elementsList.append(createCard(item.name, item.link));
	});
}

addCardToPage(initialCards);

//Добавление карточки пользователем
const pushCard = () => {
	const name = placeInput.value;
	const link = linkInput.value;

	elementsList.prepend(createCard(name, link));
}

//Открытие попапа
const openPopup = popupElement => {
	popupElement.classList.add('popup_opened');
}

//Закрытие попапа
const closePopup = popupElement => {
	popupElement.classList.remove('popup_opened');
}

//Открытие попапа редактирования профиля
const openProfilePopup = () => {
	nameInput.value = title.textContent;
	jobInput.value = subtitle.textContent;
	openPopup(profilePopup);
}

const openAddCardPopup = () => {
	openPopup(addCardPopup);
}

const openImagePopup = () => {
	openPopup(imagePopup);
}

const closeProfilePopup = () => {
	closePopup(profilePopup);
}

const closeAddCardPopup = () => {
	closePopup(addCardPopup);
}

const closeImagePopup = () => {
	closePopup(imagePopup);
}

const editFormSubmitHandler = evt => {
	evt.preventDefault();

	title.textContent = nameInput.value;
	subtitle.textContent = jobInput.value;

	closeProfilePopup();
}

const addFormSubmitHandler = evt => {
	evt.preventDefault();

	pushCard();
	placeInput.value = '';
	linkInput.value = '';

	closeAddCardPopup();
}

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddCardPopup);
closeButtonProfile.addEventListener('click', closeProfilePopup);
closeButtonAddCard.addEventListener('click', closeAddCardPopup);
closeButtonImage.addEventListener('click', closeImagePopup);
editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);