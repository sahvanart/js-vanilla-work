// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const alert = document.querySelector(".alert");
const clearBtn = document.querySelector(".clear-btn");


// edit option variables
let editElement;
let editFlag = false;
let editID = "";

// Event Listeners

window.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", actionCheck);
filterOption.addEventListener("input", filterTodo);
clearBtn.addEventListener("click", clearItems);


// Functions

function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  const inputValue = todoInput.value;
  const id = new Date().getTime().toString();

  if (inputValue && !editFlag) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    let idAttribute = document.createAttribute("data-id");
    idAttribute.value = id;

    const newTodo = document.createElement("li");
    newTodo.setAttributeNode(idAttribute);
    newTodo.innerText = inputValue;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Rename button
    const renameButton = document.createElement("button");
    renameButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    renameButton.classList.add("rename-btn");
    todoDiv.appendChild(renameButton);
    // Delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // adding todo item to the list
    todoList.appendChild(todoDiv);

    addToLocalStorage(id, inputValue);
    displayAlert("Todo successfully added", "success");
    setBackToDefault();
  } else if (inputValue && editFlag) {
    editElement.innerHTML = inputValue;
    displayAlert("Todo value changed", "success");
    editLocalStorage(editID, inputValue);
    setBackToDefault();
  } else {
    displayAlert("Please enter a todo", "danger");
  }  
}

function actionCheck(e) {
  const item = e.target;
  
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todoID = e.target.parentElement.firstElementChild.dataset.id;
    removeFromLocalStorage(todoID);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    setBackToDefault();
  }

  // check todo 
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  // edit todo
  if (item.classList[0] === "rename-btn") {
    const todo = item.parentElement;
    editElement = e.target.parentElement.firstElementChild;
    todoInput.value = editElement.innerHTML;
    editFlag = true;
    editID = editElement.dataset.id;
    todoButton.innerHTML = '<i class="fas fa-edit"></i>';
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// clear items
function clearItems() {
  const todoItems = document.querySelectorAll(".todo");
  if (todoItems.length > 0) {
    todoItems.forEach(function (item) {
      todoList.removeChild(item);
    });
  }
  setBackToDefault();
  localStorage.removeItem("list");
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function setBackToDefault() {
  todoInput.value = "";
  editFlag = false;
  editID = "";
  todoButton.innerHTML = '<i class="fas fa-plus"></i>';
}

function getTodos() {
  let todos;
  if (localStorage.getItem("list") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("list"));
  }

  todos.forEach(function (todo) {

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const renameButton = document.createElement("button");
    renameButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    renameButton.classList.add("rename-btn");
    todoDiv.appendChild(renameButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function addToLocalStorage(id, value) {
  const todoItems = { id, value };
  let items = getLocalStorage();
  items.push(todoItems);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}