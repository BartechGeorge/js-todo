const form = document.querySelector(".task-form");
const taskList = document.querySelector(".tasks-collection");
const clearButton = document.querySelector(".clear-button");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const deadLine = document.querySelector("#deadline");
const checkbox = document.querySelector("#important");
// Load all event

loadEvents();

// Load all event listener

function loadEvents() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // submit form
  form.addEventListener("submit", addForm);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear Task Event
  clearButton.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTask);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");
    const para = document.createElement("p");
    li.className = "list-element";
    // Text Node
    li.appendChild(document.createTextNode(task[0]));
    para.appendChild(document.createTextNode(task[1]));
    li.appendChild(para);
    // Add Icon
    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = feather.icons.trash.toSvg();
    li.appendChild(link);

    // checkbox settings
    // if (checkbox.checked) {
    //   li.classList.add("important");
    //   link.classList.add("important");
    // }
    // Append li to ul
    taskList.appendChild(li);
  });
}

function addForm(e) {
  // create li element
  const li = document.createElement("li");
  const para = document.createElement("p");
  li.className = "list-element";
  // Text Node
  li.appendChild(document.createTextNode(taskInput.value));
  para.appendChild(document.createTextNode(deadLine.value));
  li.appendChild(para);
  // Add Icon
  const link = document.createElement("a");
  link.className = "delete-item";
  link.innerHTML = feather.icons.trash.toSvg();
  li.appendChild(link);

  // checkbox settings
  if (checkbox.checked) {
    li.classList.add("important");
    link.classList.add("important");
  }
  // Append li to ul
  taskList.appendChild(li);

  // const storeDate = taskInput.value + deadLine.value;

  // Store
  storeTask([taskInput.value, deadLine.value]);

  // clear input
  taskInput.value = "";

  e.preventDefault();
}

function storeTask(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLS(e.target.parentElement.parentElement);
  }
}
function removeTaskFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear all tasks
function clearTasks() {
  if (confirm("Delete All Item?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  clearAllFromLS();
}

// Clear Task form local storage

function clearAllFromLS() {
  localStorage.clear();
}

// Filter Tasks
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".list-element").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
