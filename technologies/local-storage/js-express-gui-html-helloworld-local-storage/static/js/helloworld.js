window.localStorage.setItem("messageItem", `Hello World!`);
const message = window.localStorage.getItem("messageItem");

const messageEl = document.querySelector('#message');
messageEl.innerHTML = message