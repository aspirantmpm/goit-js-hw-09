const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const COLOR_CHANGER_DELAY = 1000;
let intervalId = null;

startBtnRef.addEventListener('click', onStart);
stopBtnRef.addEventListener('click', onStop);

attributeInit();

function onStart() {
  this.setAttribute('disabled', '');
  stopBtnRef.removeAttribute('disabled');
  pageColorChanger();

  intervalId = setInterval(pageColorChanger, COLOR_CHANGER_DELAY);
}

function onStop() {
  this.setAttribute('disabled', '');
  startBtnRef.removeAttribute('disabled');

  clearInterval(intervalId);
}

function pageColorChanger() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function attributeInit() {
  stopBtnRef.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

