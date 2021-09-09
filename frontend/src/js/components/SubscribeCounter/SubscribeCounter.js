/* eslint-disable no-param-reassign */
export default class SubscribeCounter {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this.element = element;
    this.counter = this.element.querySelector('.subscribe-counter__counter');

    this.onSubscribeData = this.onSubscribeData.bind(this);

    this.sse = new EventSource('http://localhost:7070/sse');

    this.sse.addEventListener('message', this.onSubscribeData);
  }

  async onSubscribeData(e) {
    console.log(e);
    const { data } = e;

    const eventData = JSON.parse(data);

    this.counter.textContent = eventData.count;

    console.log(eventData.item);
  }
}
