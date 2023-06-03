import { users } from "./database.js";
import { posts } from "./database.js";
import { suggestUsers } from "./database.js";

function createUserCard(array) {
  const userItem = document.createElement('div');
  const userImg = document.createElement('img');
  const userName = document.createElement('h2');
  const userProfession = document.createElement('p');

  userItem.classList = 'suggest-users__item flex-column';
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

function createArticle(array) {
  const post = document.createElement('article');
  const title = document.createElement('h1');
  const text = document.createElement('p');

  post.classList.add('posts-container__article', 'flex-column')
  title.classList.add('posts-container__title', 'title1');
  text.classList.add('posts-container__text', 'text2');

  post.dataset.articleId = array.id;
  title.innerText = array.title;
  text.innerText = array.text;

  post.append(title, text);

  return post;
}

function createButtons4Articles(array) {
  const buttonsSection = document.createElement('div');
  const button = document.createElement('button');
  const likeImg = document.createElement('img');
  const likesQuantity = document.createElement('p');

  buttonsSection.classList.add('posts-container__btn-container');
  button.classList.add('posts-container__btn', 'text2');
  likeImg.classList.add('posts-container__img');
  likesQuantity.classList.add('posts-container__likes', 'text3');
  button.dataset.buttonId = array.id;

  button.innerText = "Abrir Post";
  likeImg.src = '../src/assets/img/heart-like.svg';
  likeImg.alt = 'ícone de coração gostei.';
  likesQuantity.innerText = array.likes;
  
  likeImg.addEventListener('click', function (event) {
    likeImg.classList.toggle('liked');
    if (likeImg.classList.contains('liked')) {
      likesQuantity.innerText =  array.likes  + 1;
      likeImg.src = '../src/assets/img/heart-red.svg';
    } else {
      likesQuantity.innerText =  array.likes;
      likeImg.src = '../src/assets/img/heart-like.svg';
    }
  });


  buttonsSection.append(button, likeImg, likesQuantity);

  return buttonsSection;
}

function createPost(post) {
  const postController = document.createElement('div');
  postController.classList.add('posts-container__posts', 'flex-column');
  postController.dataset.postId = post.id;

  const userItem = createUserCard(post);
  const userPost = createArticle(post);
  const buttons = createButtons4Articles(post);

  postController.append(userItem, userPost, buttons);

  return postController;
}

function createFollowingButtons() {
  const followingButton = document.createElement('button');

  followingButton.innerText = 'Seguir';
  followingButton.classList = 'suggest-users__button';

  followingButton.addEventListener('click', function (event) {
    followingButton.classList.toggle('following');

    if (followingButton.classList.contains('following')) {
      followingButton.innerText = 'Seguindo';
    } else {
      followingButton.innerText = 'Seguir';
    }
  });

  return followingButton;
}

function createNewArticle(array) {
  const title = document.querySelector('.post-container__title');
  const text = document.querySelector('.post-container__text');
  const submitButton = document.querySelector('.post-container__btn');

  console.log(title, text);


  submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    let post = {
      id: posts.length + 1,
      title: title.value,
      text: text.value,
      user: array[0].user,
      stack: array[0].stack,
      img: array[0].img,
      likes: Math.floor(Math.random() * 96 + 5),
    }

    posts.push(post);
    renderPosts(posts);
    handlePostModal(posts);
  })
}

function renderMainUser(array) {
  const mainUser = document.querySelector('.main__info-user');
  const user = createUserCard(array[0]);
  mainUser.appendChild(user);
}

function renderSuggestUsers(array) {
  const usersList = document.querySelector('.suggest-users__container');
  usersList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const user = array[i];
    const userDiv = createUserCard(user);
    const followingButton = createFollowingButtons();

    userDiv.appendChild(followingButton);
    usersList.append(userDiv);
  }
}

function renderAsideSuggestUsers(array) {
  const usersList = document.querySelector('.aside .suggest-users__container');
  usersList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const user = array[i];
    const userDiv = createUserCard(user);
    const followingButton = createFollowingButtons();

    userDiv.appendChild(followingButton);
    usersList.append(userDiv);
  }
}

function renderPosts(array) {
  const postsList = document.querySelector('.posts-container');
  postsList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const post = array[i];

    const postController = createPost(post);
    postsList.appendChild(postController);
  }
}

function closeModal() {
  const closeButton = document.querySelector('.modal-close-btn');
  const modalController = document.querySelector('.posts__modal-controller');

  closeButton.addEventListener('click', function (event) {
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

function handlePostModal(array) {
  const modalController = document.querySelector('.posts__modal-controller');
  const modalContainer = document.querySelector('.posts__modal-container');

  const buttons = document.querySelectorAll('.posts-container__btn');
  let postFound = {};

  for (let i = 0; i < buttons.length; i++) {
    const clickButton = buttons[i];

    clickButton.addEventListener('click', function (event) {
      modalContainer.innerHTML = '';
      createModalCloseButton();
      closeModal();

      console.log(event.target.dataset.buttonId);

      for (let j = 0; j < array.length; j++) {
        if (posts[i].id == event.target.dataset.buttonId) {
          postFound = array[i];
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

createNewArticle(users);
renderMainUser(users);
renderSuggestUsers(suggestUsers);
renderAsideSuggestUsers(suggestUsers);
renderPosts(posts);
handlePostModal(posts);

