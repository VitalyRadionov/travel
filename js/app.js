let burgerMenu = document.getElementsByClassName('burger-menu')[0];
let burgerMenuContainer = document.getElementsByClassName('burgr-menu-container')[0];
let fading = document.getElementsByClassName('fading')[0];

let burgerMenuClose = document.getElementsByClassName('window-close-line__wrapper')[0];

burgerMenu.addEventListener('click', addClassActive);
burgerMenuContainer.addEventListener('click', removeClassActive);
fading.addEventListener('click', removeClassActive);

function addClassActive(params) {
  burgerMenuContainer.classList.add('active');
  fading.classList.add('active');
  console.log(this);
}

function removeClassActive(e) {
  if (e.target.className == 'window-close-line__wrapper' || e.target.tagName == 'A' || e.target.className == 'fading active') {
    burgerMenuContainer.classList.remove('active');
    fading.classList.remove('active');
    console.log(this);
  }
}