const toDoList = [
  {name: 'make dinner', dueDate: '2022-12-22'},
  {name: 'wash dishes', dueDate: '2022-12-22'}
];
renderList();


function renderList(){
  let toDoListHTML = '';
  
  for(let i = 0; i < toDoList.length; i++){
    const taskObject = toDoList[i];
    const { name, dueDate } = taskObject;
    const html = 
     `<div>${name}</div>
      <div>${dueDate}</div>
      <button 
        onclick="
          toDoList.splice(${i}, 1);
          renderList();"
        class="delete-button"
        >Delete</button>`;
      
    toDoListHTML+=html;
  }
  document.querySelector('.js-to-do-list')
    .innerHTML = toDoListHTML;
}



function addTask(){
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');
  const name = inputElement.value;
  const dueDate = dateInputElement.value;

  toDoList.push({name, dueDate});
  inputElement.value = '';
  renderList();
}




