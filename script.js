// select the necessary todo app element
let taskInput = document.querySelector(".new-task");
let addTask = document.querySelector(".add-task");
let taskContainer = document.querySelector(".list-container");
let errorMessage = document.querySelector(".error-message");
let taskCounterValue = document.querySelector(".counter-value");
let taskCount = 0;

// a function to count how many tasks have been created in this todo app
let displayTaskCount = (taskCount) => {
  taskCounterValue.innerText = taskCount;
};
// function to create tasks
let createTask = () => {
  // create <ul></ul> element & added its classList("task-items")
  let ulElement = document.createElement("ul");
  ulElement.classList.add("task-items");
  if (taskInput.value === "") {
    // if taskInput empty dsiplay error message
    errorMessage.classList.add("show-error");

    setTimeout(() => {
      errorMessage.classList.remove("show-error");
    }, 2000);
  } else {
    ulElement.innerHTML = `<li class="task-item">
                                <div class="task-list">
                                    <input type="checkbox" onclick="completeTask(this)"/>
                                    <p>${taskInput.value.trim()}</p>
                                </div>
                                <div class="task-controls">
                                    <i class="fa-regular fa-pen-to-square" onclick="editTask(this)"></i>
                                    <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
                                </div>
                            </li>`;
    taskCount += 2 - 1; // count task
    displayTaskCount(taskCount);
  }
  taskInput.value = "";
  taskContainer.appendChild(ulElement);
  saveTask();
};
// complete task function
let completeTask = (element) => {
  let taskList = element.parentNode;
  let pElement = taskList.querySelector("p");
  pElement.classList.toggle("complete-task");
  saveTask();
};
// edit task function
let editTask = (element) => {
  let taskControls = element.parentNode;
  let taskList = taskControls.parentNode;
  let pElement = taskList.querySelector("p");
  taskInput.value = pElement.innerText;
  taskCount -= 1;
  displayTaskCount(taskCount);
  taskList.remove();
  saveTask();
};
// delete task function
let deleteTask = (element) => {
  let taskControls = element.parentNode;
  let taskList = taskControls.parentNode;
  if (taskCount > 0) {
    taskCount = 0;
  } else {
    taskCount -= 1;
    displayTaskCount(taskCount);
  }
  taskList.remove();
  saveTask();
};
// a function to store tasks in local storage
let saveTask = () => {
  localStorage.setItem("all-task", taskContainer.innerHTML);
};
// function to show tasks stored in local storage
let showTask = () => {
  taskContainer.innerHTML = localStorage.getItem("all-task");
};
showTask();
// eventlistener
addTask.addEventListener("click", createTask);
