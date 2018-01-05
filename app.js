
const form = document.querySelector ('#task-form');
const taskList = document.querySelector ('.collection');
const clearBtn = document.querySelector ('.clear-task');
const filter = document.querySelector ('#filter');
const taskInput = document.querySelector ('#task');

loadEventListeners();

function loadEventListeners () {
  form.addEventListener('submit', addTask);
}
 
function addTask(e){
  if (taskInput.value === '') {
    alert('Add Task');
  }

  const li = document.createElement('li');
  li.className = 'collection-item grey lighten-4';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove black-text"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  taskInput.value = '';

  console.log(li)
  e.preventDefault();
}