const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');

const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');

const taskInput = document.querySelector('#task');



loadAllEventListeners();

function loadAllEventListeners(){
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // console.log(tasks);
  tasks.forEach(function(task){
    //create and append the items
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task))

  //Create and Append the delete icon
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //Append the li to the ul
  taskList.appendChild(li);
  })

}


function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }

  //create and append the items
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value))

  //Create and Append the delete icon
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //Append the li to the ul
  taskList.appendChild(li);

//Store in Local Storage

storeTaskInLocalStorage(taskInput.value);


  //set the input to clear value
  taskInput.value = '';

  //prevent reload or submit
  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove Task

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    // if(confirm('Are you sure to delete?')){
    // e.target.parentElement.parentElement.remove();
    // }
    e.target.parentElement.parentElement.remove();


    //Remove task from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem){
  // console.log(taskItem);
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))

}

//Clear Tasks

function clearTasks(){
  //first method of clearing the childs
  taskList.innerHTML = '';

  //second and faster method of clearing the childs

  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }


  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
  localStorage.clear();
}

//Filter tasks

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }
  })
}