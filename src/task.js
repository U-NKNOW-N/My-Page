const task = document.querySelector(".task"),
  addTask = document.querySelector(".addTask"),
  TASK_LS = "task";

let toDos = [];

function doneFn(text) {
  const id = text[0].id;
  const taskLi = document.getElementById(id);
  taskLi.classList.add("done");
  text[0].classCheck = 1;
  saveToDos();
}

function doneToDo(event) {
  const btn = event.target;
  const clickLi = btn.parentNode.id;
  const clickToDo = toDos.filter(function (toDo) {
    return toDo.id === clickLi;
  });
  doneFn(clickToDo);
}

function deleteToDo(event) {
  const btn = event.target;
  const removeLi = btn.parentNode.id;
  constremoveId = document.getElementById(removeLi);
  addTask.removeChild(constremoveId);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== removeLi;
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TASK_LS, JSON.stringify(toDos));
}

function paintToDo(text, check) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const donekBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = text;
  const classCheck = check;

  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  donekBtn.innerHTML = "✔";
  donekBtn.addEventListener("click", doneToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(donekBtn);
  li.id = newId;
  addTask.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
    classCheck: classCheck,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleTask() {
  const currentValue = task.value;
  paintToDo(currentValue);
  task.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TASK_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.classCheck);
      if (toDo.classCheck == 1) {
        const taskLi = document.getElementById(toDo.id);
        taskLi.classList.add("done");
      }
    });
  }
}

function init() {
  loadToDos();
}

init();
