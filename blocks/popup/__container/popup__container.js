let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');

function formSubmitHandler (evt) {
	evt.preventDefault();

	let nameInput = formElement.querySelector('.popup__name-field');
	let jobInput = formElement.querySelector('.popup__occupation-field');
	let title = document.querySelector('.profile__title');
	let subtitle = document.querySelector('.profile__subtitle');

	title.textContent = nameInput.value;
	subtitle.textContent = jobInput.value;
	popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);