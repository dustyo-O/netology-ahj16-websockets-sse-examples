// TODO: write code here

import Subscribe from './components/Subscribe/Subscribe';
import SubscribeCounter from './components/SubscribeCounter/SubscribeCounter';

const subscribeForm = new Subscribe('.subscribe');
const subscribeCounter = new SubscribeCounter('.subscribe-counter');

const ws = new WebSocket('ws://localhost:7070/ws');

ws.addEventListener('open', (e) => {
  console.log(e);

  console.log('open');

  ws.send('hello world');
});

ws.addEventListener('close', (e) => {
  console.log(e);

  console.log('close');
});

ws.addEventListener('error', (e) => {
  console.log(e);

  console.log('error');
});

const chat = document.querySelector('.chat');
const chatMessage = document.querySelector('.chat__message');
const chatContent = document.querySelector('.chat__content');

chat.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = chatMessage.value;
  ws.send(message);

  chatMessage.value = '';
});

ws.addEventListener('message', (e) => {
  const { data } = e;

  const message = JSON.parse(data);

  if (message.chat) {
    chatContent.textContent = message.chat.join('\n');
  }

  if (message.message) {
    chatContent.textContent += `\n${message.message}`;
  }
  console.log('message');
});
