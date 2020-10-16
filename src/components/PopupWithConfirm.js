import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
	constructor(popupSelector, { handleSubmitForm }) {
		super(popupSelector);
		this._handleSubmitForm = handleSubmitForm;
		this._form = this._popup.querySelector('.popup__form');
		this._itemId = null;
		this._item = null;
	}

	setRemoveItemId(itemId) {
		this._itemId = itemId;
	}

	setRemoveItemMarkup(item) {
		this._item = item;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleSubmitForm(this._itemId, this._item);
		})
	}
}