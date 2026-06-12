import {flashcardList, addFlashcard, saveToStorage, removeFlashcard, generateFlashcardId, findMatchingFlashcard, editFlashcard } from "./flashcard.js";
import { addThemeActionListener, checkSystemPreferences} from "./utils.js";
let currentlyEditing;
let selectedFlashcard;
let tempFlashcardList;
let allFlashcards;
let editHTML;

checkSystemPreferences();
addThemeActionListener();
generateFlashcardHTML();

document.addEventListener('click', (event) => {
  
  //Add flashcard button listener
  if (event.target.closest('.js-add-flashcard-button')){
    addBlankFlashcard();
    generateEditableFlashcards();
    
  }

  //Bin flashcard button listener
  if (event.target.closest('.js-bin-button')){
    selectedFlashcard = event.target.closest('.js-editing-flashcard-container');
    toggleOverlay();
  }

  //Delete flashcard button listener
  if (event.target.closest('#overlay__delete__button')){
    let flashcardId = selectedFlashcard.dataset.id;
    
    removeFlashcard(flashcardId);
    toggleOverlay();
    generateEditableFlashcards();
  }
  if (event.target.closest('#overlay__close__button')){
    toggleOverlay();
  }
  
  //Edit flashcard button listener
  if (event.target.closest('.js-edit-flashcard-button')) { 
    generateStaticHTML();
    displayFlashcardsFromStorage();
  }

  //Practice button event listener
  if (event.target.closest('.js-practice-button')){
    document.location.href = 'practice.html';
  }
  
  //Confirm edit button listener
  if (event.target.closest('.js-confirm-changes-button')){
    let allFlashcards = document.querySelectorAll('.js-editing-flashcard-container');

    allFlashcards.forEach(container => {
      let flashcardId = container.dataset.id;
      let newTerm = container.querySelector('.js-term-text-input').value; 
      let newDefinition = container.querySelector('.js-definition-text-input').value;    
      editFlashcard(flashcardId, newTerm, newDefinition);
    });
    generateFlashcardHTML();
  }
  
  //Flip flashcard listener
  else if (event.target.closest('.js-flashcard-container')){
    let flashcardContainer = event.target.closest(".js-flashcard-container");

    let flashcard = findMatchingFlashcard(flashcardContainer.dataset.id);
    
    let flashcardText = flashcardContainer.querySelector('.js-flashcard-text');

    if (!flashcardContainer.classList.contains('flipped')){
      flashcardContainer.classList.add('flipped');
      flashcardText.innerHTML = flashcard.definition;
    }
    else{ 
      flashcardContainer.classList.remove('flipped');
      flashcardText.innerHTML = flashcard.term;
    }
  }

});

function getAllContainers(){
  let allContainers = document.querySelectorAll('.js-editing-flashcard-container');

  allContainers.forEach(container => {
    let flashcard = findMatchingFlashcard(container.dataset.id);
    if (!flashcard) { return; }
    let termInput = container.querySelector('.js-term-text-input');
    let definitionInput = container.querySelector('.js-definition-text-input')

    console.log(termInput.value);
    
    flashcard.term = termInput.value;
    flashcard.definition = definitionInput.value;
  });
}

function addEventListeners(){
  
}

function generateFlashcardHTML(){
  let pageHTML = document.querySelector('.js-page-body');
  pageHTML.innerHTML = '';
  pageHTML.innerHTML = `
  <div class="flashcard__buttons__row">
    <button class="practice-button js-practice-button">Practice</button>
    <button class="edit-flashcard-button js-edit-flashcard-button">Add/Edit Flashcards</button>
  </div>
  <div class="flashcard-list js-flashcard-list"></div>`
  let flashcardHTML = '';

  flashcardList.forEach((flashcard, index) => {
    flashcardHTML+=`
    <div 
    class="flashcard-container js-flashcard-container"
    data-id="${flashcard.id}">
      <div class="flashcard-text js-flashcard-text">${flashcard.term}</div>

    </div>
      `;
    
  
  });
  document.querySelector('.js-flashcard-list').innerHTML = flashcardHTML;
}

function addBlankFlashcard(){
  let flashcard = addFlashcard('', '');
  document.querySelector('.js-flashcard-list').innerHTML+=`
  <div class="editing-flashcard-container js-editing-flashcard-container"
    data-id="${flashcard.id}">
      <div class="edit-row">Term
        <input class="term-text-input js-term-text-input" 
        value="">
      </div>
      <div class="edit-row">Definition
        <input class="definition-text-input js-definition-text-input" 
        value="">
      </div>
      <button class="bin-button js-bin-button">
        <img class="icon-image" src="images/bin-icon.png">
      </button>
    </div>
    `
}

function generateEditableFlashcards(){
  let html = '';
  
  getAllContainers();

  flashcardList.forEach(flashcard => {
    html+=createEditFlashcardHTML(flashcard);
    
  });

  let flashcardGrid = document.querySelector('.js-flashcard-list');
  flashcardGrid.innerHTML = html;

  let termInputs = document.querySelectorAll('.js-term-text-input')
  let definitionInputs = document.querySelectorAll('.js-definition-text-input')

  termInputs.forEach(input => {
    input.addEventListener('blur', generateEditableFlashcards);
  });
  definitionInputs.forEach(input => {
    input.addEventListener('blur', generateEditableFlashcards);
  });

}

function displayFlashcardsFromStorage(){
  let flashcardGrid = document.querySelector('.js-flashcard-list');
  let html = '';
  if (flashcardList){
    flashcardList.forEach(flashcard => {
      html += createEditFlashcardHTML(flashcard);
    });
  
    flashcardGrid.innerHTML = html;
  }
  addEventListeners();
}

function createEditFlashcardHTML(flashcard){
  let flashcardGrid = document.querySelector('.js-flashcard-list');
  let flashcardHTML = `
    <div class="editing-flashcard-container js-editing-flashcard-container"
    data-id="${flashcard.id}">
      <div class="edit-row">Term
        <input class="term-text-input js-term-text-input" 
        value="${flashcard.term}"
        onblur="">
      </div>
      <div class="edit-row">Definition
        <input class="definition-text-input js-definition-text-input" 
        value="${flashcard.definition}"
        onblur="">
      </div>
      <button class="bin-button js-bin-button">
        <img class="icon-image" src="images/bin-icon.png">
      </button>
    </div>

  `
  return flashcardHTML;

}

function toggleOverlay(){
  let overlay = document.getElementById('overlay');
  
  if (overlay.style.display === 'flex') { overlay.style.display = 'none' }
  else{
    overlay.style.display = 'flex';
  }
}

function generateStaticHTML(){
  let pageHTML = document.querySelector('.js-page-body');
  pageHTML.innerHTML = `
    <div> 
      <button class="confirm-changes-button js-confirm-changes-button">Confirm changes</button>
    </div>
    <div class="edit-layout">
      <div class="flashcard-list js-flashcard-list"></div>
      <div class="add-flashcard-button-row">
        <button class="add-flashcard-button js-add-flashcard-button">+ Add new flashcard</button>
      </div>
    </div>`
      
}