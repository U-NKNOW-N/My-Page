const input = document.querySelector("input"),
  div = document.querySelector(".none"),
  userName = document.querySelector(".name"),
  NAME_LS = "name";

function handleName() {
  input.classList.add("none");
  div.classList.remove("none");
  userName.innerHTML = input.value;
  localStorage.setItem(NAME_LS, input.value);
}

function init() {
  const currentValue = localStorage.getItem(NAME_LS);
  if (currentValue !== null) {
    input.classList.add("none");
    div.classList.remove("none");
    userName.innerHTML = currentValue;
  }
}

init();
