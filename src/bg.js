const images = ["1.png", "2.png", "3.png", "4.png"],
  chosenImage = images[Math.floor(Math.random() * images.length)],
  bgImage = document.createElement("img"),
  divImage = document.querySelector("#bg");

function paintImage() {
  bgImage.src = `src/${chosenImage}`;
  bgImage.classList.add("bgImage");
  divImage.appendChild(bgImage);
}

function init() {
  paintImage();
}

init();
