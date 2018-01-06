
const form = document.querySelector ('#task-form');
const taskList = document.querySelector ('.collection');
const clearBtn = document.querySelector ('.clear-task');
const filter = document.querySelector ('#filter');
const taskInput = document.querySelector ('#task');

loadEventListeners();

function loadEventListeners () {
  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTask);
}

function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){

    const li = document.createElement('li');
    li.className = 'collection-item grey lighten-4';
    li.appendChild(document.createTextNode(task));
  
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove black-text"></i>';
    li.appendChild(link);
  
    taskList.appendChild(li);
  })
  
}
 
function addTask(e){
  if (taskInput.value === '') {
    alert('Add Task');
    return
  }

  const li = document.createElement('li');
  li.className = 'collection-item grey lighten-4';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove black-text"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
  if ( e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')){ 
      e.target.parentElement.parentElement.remove()

      removeFromLocalStorage(e.target.parentElement.parentElement)
    };
  };
}

function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if ( taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks() {
  if (confirm('You sure? All tasks will be deleted')){
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  };

  localStorage.clear()
}
}

function filterTask(e){
  const text = e.target.value.toLowerCase();
  
  val = document.querySelectorAll('.collection-item').forEach
    (function(task) {
      const item = task.firstChild.textContent

      if (item.toLowerCase().indexOf(text) !== -1) {
        task.style.display = 'block'
      } else {
        task.style.display = 'none'
      }
    })

}