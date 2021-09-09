/* eslint-disable no-param-reassign */
import api from '../Api/Api';

export default class Subscribe {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this.element = element;

    this.onSubscribe = this.onSubscribe.bind(this);

    this.element.addEventListener('submit', this.onSubscribe);
  }

  async onSubscribe(e) {
    e.preventDefault();

    const data = {};

    this.element.elements.forEach((elem) => {
      if (!elem.name) return;

      data[elem.name] = elem.value;
    });

    console.log(data);
    console.log(await api.subscriptions.add(data));
  }
}
