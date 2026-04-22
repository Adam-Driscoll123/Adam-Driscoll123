

const toDoList = JSON.parse(localStorage.getItem('list')) || [];
renderList();

document.querySelector('.js-add-button').addEventListener('click', () => { addTask(); });



function renderList(){
  let toDoListHTML = '';
  toDoList.forEach((toDoObject, index) => {
    const { name, dueDate } = toDoObject;
    const html = 
     `<div>${name}</div>
      <div>${dueDate}</div>
      <button 
      
        class="delete-button js-delete-button"
        >Delete</button>`;
      
    toDoListHTML+=html;
  });
  document.querySelector('.js-to-do-list').innerHTML = toDoListHTML;
  localStorage.setItem('list', JSON.stringify(toDoList));
  
  document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      toDoList.splice(index, 1);
      renderList();
    });
  })

  
  
}

function addTask(){
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');
  const name = inputElement.value;
  const dueDate = dateInputElement.value;
  if (!name){ return; }
  

  toDoList.push({name, dueDate});
  inputElement.value = '';
  renderList();
}




