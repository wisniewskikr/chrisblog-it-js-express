const menuTexts = document.querySelector('#menu-texts');
const menuLinks = document.querySelector('#menu-links');
const messages = document.querySelectorAll('input[name="messages"]');
const viewLink = document.querySelector('#view-link');
const updateLink = document.querySelector('#update-link');
const deleteLink = document.querySelector('#delete-link');

messages.forEach((elem) => {
    elem.addEventListener("change", function(event) {
        menuTexts.style.display = 'none'
        menuLinks.style.display = 'block'
        viewLink.href = '/view?id=' + event.target.value
        updateLink.href = '/update?id=' + event.target.value
        deleteLink.href = '/delete?id=' + event.target.value
    });
  });