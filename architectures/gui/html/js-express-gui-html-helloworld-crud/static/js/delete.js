const form = document.querySelector('form');
const deleteLink = document.querySelector('#delete-link');

deleteLink.addEventListener('click', (e) => {
    e.preventDefault();
    if( confirm( "Are you sure you want to delete this message?" ) ){
        form.submit();
    }
});