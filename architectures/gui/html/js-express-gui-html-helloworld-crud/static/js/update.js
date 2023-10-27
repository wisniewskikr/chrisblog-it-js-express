const form = document.querySelector('form');
const updateLink = document.querySelector('#update-link');

updateLink.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
});