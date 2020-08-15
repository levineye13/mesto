const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

let popup = document.querySelector('.popup');
let formContainer = popup.querySelector('.popup__container');
let editForm = popup.querySelector('#edit-form');
let nameInput = editForm.querySelector('#name-input');
let jobInput = editForm.querySelector('#job-input');
let addForm = popup.querySelector('#add-form');
let placeInput = addForm.querySelector('#place-input');
let linkInput = addForm.querySelector('#link-input');
let cardTitle = document.querySelector('.elements__title');
let closeButton = popup.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let elementsList = document.querySelector('.elements__list');

//Создание карточки
const createCard = (name, link) => {
	const templateCard = document.querySelector('#template-card').content;
	const card = templateCard.cloneNode(true);

	card.querySelector('.elements__img').src = link;
	card.querySelector('.elements__img').setAttribute('alt', name);
	card.querySelector('.elements__title').textContent = name;

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
	const place = placeInput.value;
	const link = linkInput.value;

	arr.unshift({place, link});
	elementsList.prepend(createCard(place, link));
}

//Открытие popup
const openForm = evt => {
	const target = evt.target;

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