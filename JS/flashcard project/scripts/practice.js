import { flashcardList } from './flashcard.js';
import { themeToggleLogic } from './utils.js';
let carouselIndex = 0;
let flashcards;

themeToggleLogic();
generateHTML();
if (flashcardList.length > -1){ showCarousel(0); }


function generateHTML(){
  let carouselHTML = ``;
  flashcardList.forEach(flashcard => {
    carouselHTML += `
    <div class="flashcard-container js-flashcard-container"
         data-id="${flashcard.id}">
      <div class="left-button js-left-button">&#8592;</div>
      <div class="flashcard-text js-flashcard-text">${flashcard.term}</div>
      <div class="right-button js-right-button">&#8594;</div>
    </div>`
  });

  document.querySelector('.js-carousel').innerHTML = carouselHTML;
}

function showCarousel(carouselIndex){
  flashcards = document.getElementsByClassName('js-flashcard-container');

  if(flashcards) { return; }

  for (let i = 0; i < flashcards.length; i++){
    let flashcard = flashcards[i];
    flashcard.style.display = 'none';
  }
  
  flashcards[carouselIndex].style.display = 'flex';
  
  
}

function changeCarouselIndex(n){
  if (carouselIndex+n < 0) { carouselIndex = flashcards.length - 1; }
  else if (carouselIndex+n >= flashcards.length) { carouselIndex = 0; }
  else { carouselIndex+=n }
  showCarousel(carouselIndex);
}

document.addEventListener('click', (event) => {
  if (event.target.closest('.js-left-button')) { changeCarouselIndex(-1); }
  if (event.target.closest('.js-right-button')) { changeCarouselIndex(1); }
});