const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
		like: false
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
		like: false
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
		like: false
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
		like: false
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
		like: false
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
		like: false
	}
];

const popup = document.querySelector('.popup');
let formContainer = popup.querySelector('.popup__container');
const editForm = popup.querySelector('#edit-form');
let nameInput = editForm.querySelector('#name-input');
let jobInput = editForm.querySelector('#job-input');
const addForm = popup.querySelector('#add-form');
let placeInput = addForm.querySelector('#place-input');
let linkInput = addForm.querySelector('#link-input');
let cardTitle = document.querySelector('.elements__title');
let closeButton = popup.querySelector('.popup__close-button');
const profile = document.querySelector('.profile');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let elementsList = document.querySelector('.elements__list');
let popupImgContainer = popup.querySelector('.popup__img-container');

//Обработка лайков
const changingLikes = evt => {
	const target = evt.target;

	target.classList.toggle('elements__group_active');
}

//Изменение данных о лайках в массиве
const changingArrayLikes = evt => {
	const likeArr = elementsList.querySelectorAll('.elements__group');

	likeArr.forEach((item, index) => {
		if (item.classList.contains('elements__group_active')) {
			initialCards[index].like = true;
		} else {
			initialCards[index].like = false;
		}
	});
}

//Удаление карточек из массива
const removingCardsFromArray = evt => {
	const target = evt.target;
	const listButton = elementsList.querySelectorAll('.elements__delete-card');
	
	listButton.forEach((item, index) => {
		if (target === item) {
			initialCards.splice(index, 1);
		}
	});
}

//Удаление карточек со страницы
const removingCardsFromPage = evt => {
	const target = evt.target;
		
	const elementsItem = target.closest('.elements__item');
	elementsItem.remove();
}

//Открытие картинки (попапа)
const openImage = evt => {
	popup.classList.add('popup_opened', 'popup_substrate_opened');
	popupImgContainer.classList.add('popup__img-container_opened');
}

//Заполнение попапа с картинкой
const fillingImageContainer = evt => {
	const target = evt.target;
	const popupImage = popupImgContainer.querySelector('.popup__card-img');
	const popupTitle = popupImgContainer.querySelector('.popup__title-img');

	const card = target.closest('.elements__item');

	popupImage.src = target.src;
	popupImage.setAttribute('alt', target.getAttribute('alt'));
	popupTitle.textContent = card.querySelector('.elements__title').textContent;

	openImage();
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

	cardImg.addEventListener('click', fillingImageContainer);
	deleteCardButton.addEventListener('click', removingCardsFromArray);
	deleteCardButton.addEventListener('click', removingCardsFromPage);
	likeCardButton.addEventListener('click', changingLikes);
	likeCardButton.addEventListener('click', changingArrayLikes);

	return card;
}

//Добавление всех карточек из массива
const addingCards = arr => {
	arr.forEach(item => {
		elementsList.append(createCard(item.name, item.link));
	});
}

addingCards(initialCards);

//Добавление карточки пользователем
const pushCard = arr => {
	const name = placeInput.value;
	const link = linkInput.value;
	const like = false;

	arr.unshift({ name, link, like });
	elementsList.prepend(createCard(name, link));
}

//Открытие popup
const openForm = evt => {
	const target = evt.target;
	const elementsImg = elementsList.querySelector('.elements__img');

	switch (target) {
		case editButton:
			popup.classList.add('popup_opened');
			nameInput.value = title.textContent;
			jobInput.value = subtitle.textContent;
			editForm.classList.add('popup__container_opened');
			break;

		case addButton:
			popup.classList.add('popup_opened');
			addForm.classList.add('popup__container_opened');
			break;
	}
}

//Закрытие popup
const closeForm = () => {
	popup.classList.remove('popup_opened');

	if (editForm.classList.contains('popup__container_opened')) {
		editForm.classList.remove('popup__container_opened');
	} else if (addForm.classList.contains('popup__container_opened')) {
		addForm.classList.remove('popup__container_opened');
	} else if (popupImgContainer.classList.contains('popup__img-container_opened')) {
		popupImgContainer.classList.remove('popup__img-container_opened');
		popup.classList.remove('popup_substrate_opened');
	}
}

//Отправка формы и закрытие popup
const formSubmitHandler = evt => {
	evt.preventDefault();
	const target = evt.target;

	switch (target) {
		case editForm:
			title.textContent = nameInput.value;
			subtitle.textContent = jobInput.value;
			break;

		case addForm:
			pushCard(initialCards);
			placeInput.value = '';
			linkInput.value = '';
			break;
	}
	closeForm();
}

profile.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
popup.addEventListener('submit', formSubmitHandler);