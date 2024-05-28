let time = 0;
let i;
let loadingCount = 4;

window.addEventListener("load", function () {
  const bigImage = document.querySelector(".imageContainer");
  for (i = 0; i <= 4; i++) {
    bigImage.classList.toggle("active");
  }
});

function startTimer() {
  i = setTimeout(startTimer, 10);
  time += 0.5;
  if (time >= 100) {
    changeImages();
  }
  document.querySelector(".setTimer").style.width = time + "%";
}

function newTimer() {
  const clickButton = document.querySelector(".stopButton");
  if (clickButton.firstChild.nodeValue == "Stop") {
    clickButton.firstChild.nodeValue = "Play";
    clearTimeout(i);
  } else {
    clickButton.firstChild.nodeValue = "Stop";
    startTimer();
  }
}

var w = document.querySelector(".stopTimer");
w.addEventListener("click", newTimer, false);

function changeImages() {
  loadingCount = 4;
  time = 0;
  document.querySelector(".setTimer").style.width = time + "%";
  clearTimeout(i);
  const page = Math.floor(Math.random() * 100);
  fetch("https://picsum.photos/v2/list?page=" + page + "&limit=4")
    .then((response) => response.json())
    .then((data) => {
      document.querySelectorAll("img").forEach((image, i) => {
        image.src = data[i].download_url;
        image.classList.add("loading");
        image.nextElementSibling.textContent = data[i].author;
      });
    });
}

function loaded(event) {
  loadingCount -= 1;
  if (loadingCount === 0) {
    startTimer();
  }
  event.target.classList.remove("loading");
}

function zoomIm(event) {
  if (event.target.tagName === "IMG") {
    const parent = event.target.parentElement;
    parent.classList.toggle("active");

    if (event.target.classList.contains("imageContainer")) {
      event.target.classList.toogle("active");
    }
  }
}

function newImage() {
  changeImages();
  document.querySelector(".newImage").onclick = changeImages;

  document
    .querySelector(".containerContainer")
    .addEventListener("click", zoomIm);
  document.querySelectorAll("img").forEach((image) => {
    image.onload = loaded;
  });
}

window.addEventListener("DOMContentLoaded", newImage);
