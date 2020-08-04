let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('#name-input');
let jobInput = popup.querySelector('#job-input');
let closeButton = popup.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');

//Открытие popup
function openForm() {
	nameInput.value = title.textContent;
	jobInput.value = subtitle.textContent;
	popup.classList.add('popup_opened');
}

//Закрытие popup
function closeForm() {
	popup.classList.remove('popup_opened');
}

//Отправка формы и закрытие popup
function formSubmitHandler(evt) {
	evt.preventDefault();

	title.textContent = nameInput.value;
	subtitle.textContent = jobInput.value;
	closeForm();
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
formElement.addEventListener('submit', formSubmitHandler);