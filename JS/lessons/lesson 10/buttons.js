function checkIfToggled(input){
  const buttonElement = document.querySelector(input);

  turnOffButton();

  if (buttonElement.classList.contains('is-toggled')){
    buttonElement.classList.remove('is-toggled');
  }
  else{
    buttonElement.classList.add('is-toggled');
  }
}

function turnOffButton(){
  const previousButton = document.querySelector('.is-toggled');

  if (previousButton){
    previousButton.classList.remove('is-toggled');
  }
}