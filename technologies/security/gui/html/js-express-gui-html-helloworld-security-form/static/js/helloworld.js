const createLink = document.querySelector('#create-link');
const form = document.querySelector('form');

createLink.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
});