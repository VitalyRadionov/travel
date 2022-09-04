// burger-menu variables
let burgerMenu = document.getElementsByClassName('burger-menu')[0];
let burgerMenuContainer = document.getElementsByClassName('burgr-menu-container')[0];
let fading = document.getElementsByClassName('fading')[0];
let burgerMenuClose = document.getElementsByClassName('window-close-line__wrapper')[0];

// slider variables
let slider = document.getElementsByClassName('slider-container')[0];

let sliderItem = slider.getElementsByTagName('figure');

let sliderItemActive = slider.getElementsByClassName('slider__item-style active')[0];
let sliderItemPrevious = slider.getElementsByClassName('previous')[0];
let sliderItemNext = slider.getElementsByClassName('next')[0];

// slider-dots variables
let sliderDots = [...document.getElementsByClassName('slider-dots__item')];

sliderItemNext.addEventListener('click', addItem);
sliderItemPrevious.addEventListener('click', addItem);

// slider
function moveSlidies(move, index) {
  let right = 0;

  if (move == 'left') {
    right = (sliderItem[index].offsetLeft - sliderItem[index - 1].offsetLeft);
  } else if (move == 'right') {
    right = (sliderItem[index].offsetLeft - sliderItem[index + 1].offsetLeft);
  }
  console.log(move);

  let slideTumbling = [
    { transform: `translateX(${0}px)` },
    { transform: `translateX(${right}px)` }
  ];

  let slideTiming = {
    duration: 1000,
    easing: 'ease-in-out',
    iterations: 1,
    direction: 'alternate',
  };

  slider.animate(
    slideTumbling,
    slideTiming
  ).onfinish = () => {
    if (move == 'left') {

      slider.insertAdjacentElement('afterbegin', creatItem('previous', index));
      sliderItem[index + 1].remove();
      getElementSlider();
      sliderItemPrevious.addEventListener('click', addItem);
      sliderItemNext.addEventListener('click', addItem);

    } else if (move == 'right') {

      slider.insertAdjacentElement('beforeend', creatItem('next', index));
      sliderItem[index - 1].remove();
      getElementSlider();
      sliderItemNext.addEventListener('click', addItem);
      sliderItemPrevious.addEventListener('click', addItem);
    }
  };
}

function addItem(event) {
  sliderItemNext.removeEventListener('click', addItem);
  sliderItemPrevious.removeEventListener('click', addItem);

  if (this.classList.contains('next')) {
    let index = 1;
    moveSlidies('right', index);
  }

  if (this.classList.contains('previous')) {
    let index = sliderItem.length - 1;
    moveSlidies('left', index);
  }
}

function getElementSlider(params) {
  sliderItemNext = slider.getElementsByClassName('next')[0];
  sliderItemActive = slider.getElementsByClassName('slider__item-style active')[0];
  sliderItemPrevious = slider.getElementsByClassName('previous')[0];
}

function creatItem(classItem, index) {

  let figure = document.createElement('figure');

  if (classItem == 'next') {
    sliderItemPrevious.classList.remove('previous');
    sliderItemNext.classList.remove('next');
    sliderItemNext.classList.add('active');
    sliderItemActive.classList.remove('active');
    sliderItemActive.classList.add('previous');
    sliderItem[sliderItem.length - 1].classList.add('next');
    sliderDotsToggle();
  }

  if (classItem == 'previous') {
    index = 1;
    sliderItemPrevious.classList.remove('previous');
    sliderItemPrevious.classList.add('active');
    sliderItemActive.classList.remove('active');
    sliderItemActive.classList.add('next');
    sliderItemNext.classList.remove('next');
    sliderItem[0].classList.add('previous');
    sliderDotsToggle('previous');
  }

  figure.classList.add('slider__item-style');
  figure.innerHTML = `
  ${sliderItem[index + 1].innerHTML}`;

  return figure;
}

function sliderDotsToggle(rout) {

  rout ? sliderDots.reverse() : [];

  sliderDots.find((element, index, array) => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
      index = index + 1 == array.length ? 0 : index + 1;
      array[index].classList.add('active');
      return true;
    };
  });

  rout ? sliderDots.reverse() : [];
}

// burger-menu
burgerMenu.addEventListener('click', addClassActive);
burgerMenuContainer.addEventListener('click', removeClassActive);
fading.addEventListener('click', removeClassActive);

function addClassActive(params) {
  burgerMenuContainer.classList.add('active');
  fading.classList.add('active');
}

function removeClassActive(e) {
  if (e.target.className == 'window-close-line__wrapper' || e.target.tagName == 'A' || e.target.className == 'fading active') {
    burgerMenuContainer.classList.remove('active');
    fading.classList.remove('active');
  }
}