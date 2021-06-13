const input = document.querySelector("input"),
  div = document.querySelector(".none"),
  userName = document.querySelector(".name"),
  NAME_LS = "name",
  task = document.querySelector(".task"),
  addTask = document.querySelector(".addTask"),
  TASK_LS = "task",
  h1Clock = document.querySelector("h1"),
  weather = document.querySelector(".weather"),
  COORDS_LS = "coords",
  API_KEY = "736471300de8bc24ee8009bd5077fd4c",
  weatherIcon = document.querySelector(".weatherIcon"),
  images = ["1.png", "2.png", "3.png", "4.png"],
  chosenImage = images[Math.floor(Math.random() * images.length)],
  bgImage = document.createElement("img"),
  divImage = document.querySelector("#bg");

let toDos = [];

function paintImage() {
  bgImage.src = `src/${chosenImage}`;
  bgImage.classList.add("bgImage");
  divImage.appendChild(bgImage);
}

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  h1Clock.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function doneFn(text) {
  const id = text[0].id;
  const taskLi = document.getElementById(id);
  taskLi.classList.add("done");
  text[0].classCheck = 1;
  saveToDos();
}

function doneToDo(event) {
  const btn = event.target;
  const clickLi = btn.parentNode;
  const clickToDo = toDos.filter(function (toDo) {
    return toDo.id === parseInt(clickLi.id);
  });
  doneFn(clickToDo);
}

function deleteToDo(event) {
  const btn = event.target;
  const removeLi = btn.parentNode;
  addTask.removeChild(removeLi);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(removeLi.id);
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
  const newId = toDos.length + 1;
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

function handleName() {
  input.classList.add("none");
  div.classList.remove("none");
  userName.innerHTML = input.value;
  localStorage.setItem(NAME_LS, input.value);
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

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const weathers = json.weather[0];
      weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
      weather.innerHTML = `${temp}&#176;C ${weathers.main}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Not allowed");
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (loadedCoords === null) {
    askCoords();
  } else {
    const parseCoordes = JSON.parse(loadedCoords);
    getWeather(parseCoordes.latitude, parseCoordes.longitude);
  }
}

function init() {
  paintImage();
  loadCoords();
  setInterval(getTime, 1000);
  loadToDos();
  const currentValue = localStorage.getItem(NAME_LS);
  if (currentValue !== null) {
    input.classList.add("none");
    div.classList.remove("none");
    userName.innerHTML = currentValue;
  }
}

init();
