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
let placeInput = editForm.querySelector('#place-input');
let linkInput = editForm.querySelector('#link-input');
let closeButton = popup.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');

const addingCards = () => {
	const templateCard = document.querySelector('#template-card').content;
	const cardsList = document.querySelector('.elements__list');

	initialCards.forEach(item => {
		const card = templateCard.cloneNode(true)
		card.querySelector('.elements__img').src = item.link;
		card.querySelector('.elements__img').setAttribute('alt', item.name);
		card.querySelector('.elements__title').textContent = item.name;
		cardsList.append(card);
	});
}

addingCards();

//Открытие popup
function openForm(evt) {
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
function closeForm() {
	popup.classList.remove('popup_opened');

	if (editForm.classList.contains('popup__container_opened')) {
		editForm.classList.remove('popup__container_opened');
	} else if (addForm.classList.contains('popup__container_opened')) {
		addForm.classList.remove('popup__container_opened');
	}
}

//Отправка формы и закрытие popup
function formSubmitHandler(evt) {
	evt.preventDefault();
	const target = evt.target;

	switch (target) {
		case editForm:
			title.textContent = nameInput.value;
			subtitle.textContent = jobInput.value;
			break;

		case addForm:

			break;
	}
	closeForm();
}

profile.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
popup.addEventListener('submit', formSubmitHandler);