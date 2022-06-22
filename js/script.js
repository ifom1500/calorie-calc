import { Counter } from './modules/counter.js';

const counterElements = document.querySelectorAll('.counter');
console.log('counterElements', counterElements);

counterElements.forEach((element) => {
  const counter = new Counter(element);
  counter.init();
})