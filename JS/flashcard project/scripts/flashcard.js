
export let flashcardList = JSON.parse(localStorage.getItem('flashcardList')) || [];

export function findMatchingFlashcard(flashcardId){
  let matchingFlashcard;
  
  flashcardList.forEach((flashcard) => {
    if (flashcard.id==flashcardId) { matchingFlashcard = flashcard; }
  });
  
  return matchingFlashcard;
}

export function editFlashcard(flashcardId, newTerm, newDefinition){
  flashcardList.forEach((flashcard) => {
    if (flashcard.id === flashcardId) { 
      flashcard.term = newTerm;
      flashcard.definition = newDefinition;
     }
  });
  saveToStorage();  
}

export function generateFlashcardId(){ return crypto.randomUUID(); }

export function saveToStorage(){
  localStorage.setItem('flashcardList', JSON.stringify(flashcardList));
}

export function addFlashcard(term, definition){
  let flashcard = {id: generateFlashcardId(), term: term, definition: definition}
  flashcardList.push(flashcard);
  return flashcard;
  
}

export function removeFlashcard(flashcardId){
  flashcardList = flashcardList.filter(flashcard => flashcard.id!==flashcardId);
  saveToStorage();
}








