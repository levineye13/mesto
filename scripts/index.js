import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const page = document.querySelector(".page");
const popupList = Array.from(page.querySelectorAll(".popup"));
const profilePopup = page.querySelector(".popup_type_profile");
const addCardPopup = page.querySelector(".popup_type_add-card");
const imagePopup = page.querySelector(".popup_type_image");
const editForm = profilePopup.querySelector("#edit-form");
const addForm = addCardPopup.querySelector("#add-form");
const nameInput = profilePopup.querySelector("#name-input");
const jobInput = profilePopup.querySelector("#job-input");
const placeInput = addCardPopup.querySelector("#place-input");
const linkInput = addCardPopup.querySelector("#link-input");
const closeButtonProfile = profilePopup.querySelector(".popup__close-button");
const closeButtonAddCard = addCardPopup.querySelector(".popup__close-button");
const closeButtonImage = imagePopup.querySelector(".popup__close-button");
const profile = document.querySelector(".profile");
const title = profile.querySelector(".profile__title");
const subtitle = profile.querySelector(".profile__subtitle");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const elementsList = document.querySelector(".elements__list");
const popupImgContainer = imagePopup.querySelector(".popup__img-container");
const popupImage = popupImgContainer.querySelector(".popup__card-img");
const popupTitle = popupImgContainer.querySelector(".popup__title-img");
const saveButtonAddCard = addCardPopup.querySelector(".popup__save-button");

const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Обработчик закрытия попапа кликом по экрану
const closePopupClickScreen = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

//Обработчик закрытия попапа кликом по Esc
const closePopupClickKey = (evt) => {
  if (evt.key === "Escape") {
    popupList.forEach((popupElement) => {
      if (popupElement.classList.contains("popup_opened")) {
        closePopup(popupElement);
      }
    });
  }
};

//Открытие попапа
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupClickKey);
  page.addEventListener("click", closePopupClickScreen);
};

//Закрытие попапа
const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupClickKey);
  page.removeEventListener("click", closePopupClickScreen);
};

//Заполнение попапа с картинкой
const fillImageContainer = (evt) => {
  if (evt.target.classList.contains("elements__img")) {
    const card = evt.target.closest(".elements__item");

    popupImage.src = evt.target.src;
    popupImage.setAttribute("alt", evt.target.getAttribute("alt"));
    popupTitle.textContent = card.querySelector(".elements__title").textContent;

    openPopup(imagePopup);
  }
};

//Заполнение инпутов при загрузке страницы, иначе кнопка была бы disable даже при заполненных полях,
//так как они заполняются только при открытии попапа
const loadValueProfilePopup = () => {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
};

loadValueProfilePopup();

//Открытие попапа редактирования профиля
const openProfilePopup = () => {
  loadValueProfilePopup();
  openPopup(profilePopup);
};

//Форма редактирования
const editFormSubmitHandler = (evt) => {
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closePopup(profilePopup);
};

const pushCard = (data) => {
  const cardElement = new Card(data, "#template-card");
  elementsList.prepend(cardElement.generateCard());
};

//Создание экземпляров карточек и добавление на страницу
initialCards.forEach((currentCard) => {
  pushCard(currentCard);
});

//Валидация форм
const formList = document.querySelectorAll(validationObject.formSelector);
formList.forEach((formElement) => {
  const formValid = new FormValidator(validationObject, formElement);
  formValid.enableValidation();
});

const addFormSubmitHandler = () => {
  pushCard({
    name: placeInput.value,
    link: linkInput.value,
  });

  placeInput.value = "";
  linkInput.value = "";
  //Необходимо заблокировать кнопку здесь, тк после срабатывания события submit и очистки полей кнопка остается доступной,
  //тк событие input не видит этих изменений
  saveButtonAddCard.setAttribute("disabled", "");
  saveButtonAddCard.classList.add("button_inactive");

  closePopup(addCardPopup);
};

editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", () => openPopup(addCardPopup));
elementsList.addEventListener("click", (evt) => fillImageContainer(evt));
closeButtonProfile.addEventListener("click", () => closePopup(profilePopup));
closeButtonAddCard.addEventListener("click", () => closePopup(addCardPopup));
closeButtonImage.addEventListener("click", () => closePopup(imagePopup));
editForm.addEventListener("submit", editFormSubmitHandler);
addForm.addEventListener("submit", addFormSubmitHandler);
