window.console.log('window');
//Subscribe
function subscribe(){
  const buttonElement = document.querySelector('.js-subscribe-button');
  if (buttonElement.innerText === 'Subscribe'){
    buttonElement.innerHTML = 'Subscribed';
    buttonElement.classList.add('is-subscribed');
  }
  else {
    buttonElement.innerHTML = 'Subscribe';
    buttonElement.classList.remove('is-subscribed');
  }
}

function calculateTotal(){
  const inputElement = document.querySelector('.js-cost-input');
  let cost = Number(inputElement.value);
  result = document.querySelector('.js-total-cost');
  result.classList.remove('error');
  
  if (cost<0){
    result.classList.add('error');
    result.innerHTML = "Error: cost cannot be less than $0";
  }
  else if (cost<40){
    cost+=10;
    let rounded = cost.toFixed(2);
    document.querySelector('.js-total-cost').innerHTML = `$${rounded}`;
  }
  
  
}

function isKeyEnter(event){
  if (event.key === 'Enter'){
    calculateTotal();
  }
}