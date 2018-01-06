document.body.style.backgroundColor = '#e8eaf6'

// add UI components
const form = document.querySelector ('#task-form');
const taskList = document.querySelector ('.collection');
const clearBtn = document.querySelector ('.clear-task');
const filter = document.querySelector ('#filter');
const taskInput = document.querySelector ('#task');

// loading EventListeners
loadEventListeners();

// load all EventListeners
function loadEventListeners () {

  // Get Tasks from Local Storage when DOMContentl is loaded
  document.addEventListener('DOMContentLoaded', getTasks)

  // Add Task to TaskList and LocalStorage
  form.addEventListener('submit', addTask);

  // Remove Task from TaskList and LocalStorage
  taskList.addEventListener('click', removeTask);

  // Remove all Tasks from TaskList and LocalStorage
  clearBtn.addEventListener('click', clearTasks);

  // Filter Tasks by Input Task
  filter.addEventListener('keyup', filterTask);
}

// // Get Tasks from Local Storage
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
 
// Add Task to TaskList and LocalStorage
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
  
  // Store Task in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear Task Input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task in Local Storage
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

// Remove Task from Task list
function removeTask(e) {
  if ( e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')){ 
      e.target.parentElement.parentElement.remove()
      
     // Remove Task from Local Storage
      removeFromLocalStorage(e.target.parentElement.parentElement)
    };
  };
}

// Remove Task from Local Storage
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

// Remove all Tasks from Task List
function clearTasks() {
  if (confirm('You sure? All tasks will be deleted')){
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  };

  // Remove all Tasks from Local Storage
  localStorage.clear()
}
}

// Filter Tasks 
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