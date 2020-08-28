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
const cardTitle = document.querySelector(".elements__title");
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

//Обработка лайков
const changeLike = (evt) => {
  const target = evt.target;

  target.classList.toggle("elements__group_active");
};

//Удаление карточек со страницы
const removeCard = (evt) => {
  const target = evt.target;

  const elementsItem = target.closest(".elements__item");
  elementsItem.remove();
};

//Заполнение попапа с картинкой
const fillImageContainer = (evt) => {
  const target = evt.target;
  const card = target.closest(".elements__item");

  popupImage.src = target.src;
  popupImage.setAttribute("alt", target.getAttribute("alt"));
  popupTitle.textContent = card.querySelector(".elements__title").textContent;

  openPopup(imagePopup);
};

//Создание карточки
const createCard = (name, link) => {
  const templateCard = document.querySelector("#template-card").content;
  const card = templateCard.cloneNode(true);

  const cardImg = card.querySelector(".elements__img");
  const deleteCardButton = card.querySelector(".elements__delete-card");
  const likeCardButton = card.querySelector(".elements__group");

  cardImg.src = link;
  cardImg.setAttribute("alt", name);
  card.querySelector(".elements__title").textContent = name;
  cardImg.addEventListener("click", fillImageContainer);
  deleteCardButton.addEventListener("click", removeCard);
  likeCardButton.addEventListener("click", changeLike);

  return card;
};

//Добавление всех карточек из массива
const addCardsToPage = (cards) => {
  cards.forEach((item) => {
    elementsList.append(createCard(item.name, item.link));
  });
};

addCardsToPage(initialCards);

//Добавление карточки пользователем
const pushCard = () => {
  elementsList.prepend(createCard(placeInput.value, linkInput.value));
};

//Открытие попапа
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
};

//Закрытие попапа
const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
};

//Заполнение инпутов при загрузке страницы, иначе кнопка была бы disable даже при заполненных полях,
//так как они заполнялись только при открытии попапа
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

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();

  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closePopup(profilePopup);
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();

  pushCard();
  placeInput.value = "";
  linkInput.value = "";

  closePopup(addCardPopup);
};

const closePopupClickScreen = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

const closePopupClickKey = (evt) => {
  if (evt.key === "Escape") {
    popupList.forEach((popupElement) => {
      if (popupElement.classList.contains("popup_opened")) {
        closePopup(popupElement);
      }
    });
	}
};

page.addEventListener("click", (evt) => closePopupClickScreen(evt));
document.addEventListener("keydown", (evt) => closePopupClickKey(evt));
editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", () => openPopup(addCardPopup));
closeButtonProfile.addEventListener("click", () => closePopup(profilePopup));
closeButtonAddCard.addEventListener("click", () => closePopup(addCardPopup));
closeButtonImage.addEventListener("click", () => closePopup(imagePopup));
editForm.addEventListener("submit", editFormSubmitHandler);
addForm.addEventListener("submit", addFormSubmitHandler);
