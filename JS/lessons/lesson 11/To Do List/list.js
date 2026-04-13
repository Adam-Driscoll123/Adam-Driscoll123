const toDoList = [''];



function renderList(){
  let toDoListHTML = '';
  for(let i = 0; i < toDoList.length; i++){
    const task = toDoList[i];
    const html = `<p>${task}</p>`;
    toDoListHTML+=html;
  
}
  document.querySelector('.js-list-output')
    .innerHTML = toDoListHTML;

}



function addTask(){
  const inputElement = document.querySelector('.js-name-input2');
  const name = inputElement.value;
  toDoList.push(name);
  inputElement.value = '';
  renderList();
}




