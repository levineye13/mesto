let closeButton = document.querySelector('.popup__close-button');

function closeForm() {
	let popup = document.querySelector('.popup');
	popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closeForm);