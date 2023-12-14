const nameEl = document.querySelector('#name');
const messageTextEl = document.querySelector('#message-text');
const createLink = document.querySelector('#create-link');
const backLink = document.querySelector('#back-link');

createLink.addEventListener('click', (e) => {
    e.preventDefault();
    const name = nameEl.value
    const message = `Hello World ${name}!`
    messageTextEl.innerHTML = message
    createLink.style.display = 'none'
    backLink.style.display = 'block'
});

backLink.addEventListener('click', (e) => {
    e.preventDefault();
    nameEl.value = ""
    messageTextEl.innerHTML = null
    createLink.style.display = 'block'
    backLink.style.display = 'none'
});