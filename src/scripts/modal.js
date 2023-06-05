import { posts } from "./database.js";
import { createUserCard } from "./render.js";
import { createArticle } from "./render.js";




function closeModal() {
  const closeButton = document.querySelector('.modal-close-btn');
  const modalController = document.querySelector('.posts__modal-controller');

  closeButton.addEventListener('click', function (event) {
    document.body.classList.remove('modal-open');
    modalController.close();
  })
}

function createModalCloseButton() {
  const modalContainer = document.querySelector('.posts__modal-container');
  const closeButton = document.createElement('button');

  closeButton.classList.add('modal-close-btn');
  closeButton.innerText = 'X';

  modalContainer.appendChild(closeButton);
}

export function handlePostModal(array) {
  const modalController = document.querySelector('.posts__modal-controller');
  const modalContainer = document.querySelector('.posts__modal-container');

  const buttons = document.querySelectorAll('.posts-container__btn');
  let postFound = {};

  for (let i = 0; i < buttons.length; i++) {
    const clickButton = buttons[i];

    clickButton.addEventListener('click', function (event) {
      modalContainer.innerHTML = '';
      document.body.classList.add('modal-open')
      createModalCloseButton();
      closeModal();

      console.log(event.target.dataset.buttonId);

      for (let j = 0; j < array.length; j++) {
        if (posts[i].id == event.target.dataset.buttonId) {
          postFound = array[i];
        }
      }
      const postUser = createUserCard(postFound);
      const postArticle = createArticle(postFound);

      modalContainer.append(postUser, postArticle);
      modalController.showModal();
    })
  }
}
