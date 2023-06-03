import { users } from "./database.js";
import { posts } from "./database.js";
import { suggestUsers } from "./database.js";


function renderSuggestUsers(users) {
  const usersList = document.querySelector('.suggest-users__container');
  usersList.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userLi = createUserCard(user);
    usersList.appendChild(userLi);
  }
}
renderSuggestUsers(suggestUsers);

function createUserCard(array) {
  const userItem = document.createElement('div');
  const userImg = document.createElement('img');
  const userName = document.createElement('h2');
  const userProfession = document.createElement('p');
  
  userItem.classList = 'suggest-users__item';
  userImg.classList = 'suggest-users__img';
  userName.classList = 'title2';
  userProfession.classList = 'text2';
  
  userImg.src = array.img;
  userImg.alt = `Foto de perfil de ${array.user}, ${array.stack} `
  userImg.dataset.userId = array.id;
  userImg.dataset.userId = array.id;
  
  userName.innerText = array.user;
  userProfession.innerText = array.stack;
  
  userItem.append(userImg, userName, userProfession);
  
  return userItem;
}


function renderPosts(posts) {
  const postsList = document.querySelector('.posts-container');
  postsList.innerHTML = "";
  
  for(let i = 0; i < posts.length; i++){
    const post = posts[i];

    const postController = document.createElement('div');
    postController.classList.add('posts-container__posts');
    postController.dataset.postId = post.id;

    const userItem = createUserCard(post);
    const userPost = createArticle(post);
    const buttons = createButtons4Articles(post);
    postController.append(userItem, userPost, buttons);
    postsList.appendChild(postController);
  }
}
renderPosts(posts);

function createArticle(posts) {
  const post = document.createElement('article');
  const title = document.createElement('h1');
  const text = document.createElement('p');

  post.classList.add('posts-container__article')
  title.classList.add('posts-container__title', 'title1');
  text.classList.add('posts-container__text', 'text2');
  
  post.dataset.articleId = posts.id;
  title.innerText = posts.title;
  text.innerText = posts.text;
  
  post.append(title, text);

  return post;
}


function createButtons4Articles(posts){
  const buttonsSection = document.createElement('div');
  const button = document.createElement('button');
  const likeImg = document.createElement('img');
  const likesQuantity = document.createElement('p');

  buttonsSection.classList.add('posts-container__btn-container');
  button.classList.add('posts-container__btn', 'text2');
  likeImg.classList.add('posts-container__img');
  likesQuantity.classList.add('posts-container__likes','text3');
  button.dataset.buttonId = posts.id;

  button.innerText = "Abrir Post";
  likeImg.src = '../src/assets/img/heart-like.svg';
  likeImg.alt = 'ícone de coração gostei.';
  likesQuantity.innerText = posts.likes;

  buttonsSection.append(button, likeImg, likesQuantity);

  return buttonsSection;
}


function closeModal(){
  const closeButton = document.querySelector('.modal-close-btn');
  const modalController = document.querySelector('.posts__modal-controller');

  closeButton.addEventListener('click', function(event) {
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
createModalCloseButton();

function handlePostModal(array){
  const modalController = document.querySelector('.posts__modal-controller');
  const modalContainer = document.querySelector('.posts__modal-container');

  const buttons = document.querySelectorAll('.posts-container__btn');
  let postFound = {};

  for(let i = 0; i < buttons.length; i++){
    const clickButton = buttons[i];

    clickButton.addEventListener('click', function(event) {
      modalContainer.innerHTML = '';
      createModalCloseButton();
      closeModal();

      console.log(event.target.dataset.buttonId);

      for(let j = 0; j < posts.length; j++) {
        if(posts[i].id == event.target.dataset.buttonId){
          postFound = posts[i];
        }
      }
      console.log(postFound)
      const postUser = createUserCard(postFound);
      const postArticle = createArticle(postFound);
      
      modalContainer.append(postUser, postArticle);
      modalController.showModal();
    })
  }
}
handlePostModal(posts)


