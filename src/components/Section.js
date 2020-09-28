export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, isArray) {
    if (isArray) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }
}
