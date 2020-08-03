let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let popupInput = popup.querySelectorAll('.popup__input');
let closeButton = popup.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');

//Открытие popup
function openForm() {
	popupInput[0].value = title.textContent;
	popupInput[1].value = subtitle.textContent;
	popup.classList.add('popup_opened');
}

//Закрытие popup
function closeForm(evt) {
	evt.preventDefault(); //отмена отправки формы, иначе текст заголовка изменяется при закрытии
	popup.classList.remove('popup_opened');
}

//Отправка формы и закрытие popup
function formSubmitHandler(evt) {
	evt.preventDefault();

	title.textContent = popupInput[0].value;
	subtitle.textContent = popupInput[1].value;
	closeForm(evt);
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
formElement.addEventListener('submit', formSubmitHandler);