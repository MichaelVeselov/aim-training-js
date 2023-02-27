const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const remainingTime = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

function setTime(value) {
  value = value < 10 ? `0${value}` : value;
  remainingTime.innerHTML = `00:${value}`;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const colors = [
    '#E94B3C',
    '#944743',
    '#EC9787',
    '#00A591',
    '#BC70A4',
    '#BFD641',
    '#DC4C46',
    '#672E3B',
  ];
  const idx = Math.floor(Math.random() * colors.length);
  return colors[idx];
}

function createRandomCircle() {
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.background = color;
  board.append(circle);
}

function startGame() {
  setTime(time);

  const timerInterval = setInterval(decreaseTime, 1 * 1000);

  function decreaseTime() {
    if (time === 0) {
      clearInterval(timerInterval);
      finishGame();
    } else {
      let current = --time;
      setTime(current);
    }
  }

  createRandomCircle();
}

function finishGame() {
  remainingTime.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Score: <span class = "primary">${score}</span></h1>`;
  setTimeout(() => {
    screens[1].classList.remove('up');
    screens[0].classList.remove('up');
    board.innerHTML = '';
    remainingTime.parentNode.classList.remove('hide');
    score = 0;
  }, 2 * 1000);
}

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('time-btn')) {
    time = parseInt(target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});
