const COORDS_LS = "coords",
  weather = document.querySelector(".weather"),
  API_KEY = "736471300de8bc24ee8009bd5077fd4c",
  weatherIcon = document.querySelector(".weatherIcon");

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
  loadCoords();
}

init();
