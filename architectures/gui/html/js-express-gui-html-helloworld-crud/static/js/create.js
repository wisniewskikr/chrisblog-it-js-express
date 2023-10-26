const form = document.querySelector('form');
const createLink = document.querySelector('#create-link');

createLink.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
});