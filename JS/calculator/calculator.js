let calculation = JSON.parse(localStorage.getItem("calculation")) || "";
const displayElement = document.querySelector('.js-calculation');
displayCalculation();
  
function updateCalculation(character){
  calculation+=character;
  localStorage.setItem("calculation", JSON.stringify(calculation));
  displayCalculation();
  return calculation;
}

function clearCalculation(){
  localStorage.removeItem("calculation");
  calculation = "";
  displayElement.innerHTML = "";

}

function displayCalculation(){
  displayElement.innerHTML = calculation;
}

function evaluateCalculation(){
  let result = parseFloat(eval(calculation).toFixed(10));
  displayElement.innerHTML = result;
}
