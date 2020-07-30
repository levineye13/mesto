let editButton = document.querySelector('.profile__edit-button');

function openForm() {
	let popup = document.querySelector('.popup');
	let nameInput = popup.querySelector('.popup__name-field');
	let jobInput = popup.querySelector('.popup__occupation-field');
	let title = document.querySelector('.profile__title');
	let subtitle = document.querySelector('.profile__subtitle');

	nameInput.value = title.textContent;
	jobInput.value = subtitle.textContent;
	popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openForm);
