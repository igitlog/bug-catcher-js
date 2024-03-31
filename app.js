const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const screens = document.querySelectorAll('.screen');
let time = 0;
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let score = 0;
const colors = ['AliceBlue', 'Aquamarine', 'CadetBlue', 'BlueViolet', 'Coral'];
let message = '';

const s1 = document.createElement('a');
s1.href = 'https://images.unsplash.com/photo-1526773357673-2d4e8116d497?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zZWN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

const s10 = document.createElement('a');
s10.href = 'https://images.unsplash.com/photo-1516434593931-42aaf04e6ef2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fGluc2VjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

const s2 = document.createElement('a');
s2.href = 'https://images.unsplash.com/photo-1619532474053-e9de8d7d4046?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

const s3 = document.createElement('a');
s3.href = 'https://images.unsplash.com/photo-1563467806606-6364ca2bca19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

const s4 = document.createElement('a');
s4.href = 'https://images.unsplash.com/photo-1530936645058-0759135246db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

const s5 = document.createElement('a');
s5.href = 'https://images.unsplash.com/photo-1532119487593-1f9cfc7a7a9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
const s6 = document.createElement('a');
s6.href = 'https://images.unsplash.com/photo-1467744431200-ec24296954a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxfHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
const s7 = document.createElement('a');
s7.href = 'https://images.unsplash.com/photo-1522325636832-5dbc1440f793?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQzfHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
const s8 = document.createElement('a');
s8.href = 'https://images.unsplash.com/photo-1596646581539-0679fc2a3f3c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
const s9 = document.createElement('a');
s9.href = 'https://images.unsplash.com/photo-1595527963271-c8c874fb9e33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjI3fHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

const bugs = [s1.href,s2.href ,s3.href ,s4.href ,s5.href,s6.href,s7.href,s8.href,s9.href,s10.href];
console.log(bugs);
function getRandomBugs() {
  const index = Math.floor(Math.random() * bugs.length);
  return bugs[index];
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function endMessage() {
  if (score <= 15) {
    message = 'Маловато...';
      } else if (score < 25) {
    message = 'Хмм, неплохо!';
  } else if(score <= 35) {
    message = 'Bug-и начинают трястись услышав твоё имя...';
  } else if(score <= 50) {
    message = 'Да вы "Ё@fysQ Волшебник!"';
  } else if(score > 70) {
    message = '"Bug-и"?! Отныне, Я и есть Bug!';
  }
  
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  endMessage();
  timeEl.parentElement.remove();
 
  board.innerHTML = `<h1>Bug-ов поймано: ${score}</h1><h2>${message}</h2><button class="btn" onclick='window.location.reload(true)'>Попробовать ещё раз!</button>`;
  
}

function getRandomNumber(min,max) {
  return Math.round(Math.random() * (max-min) + min);
}

function createRandomC() {
  const c = document.createElement('div');
  const size = getRandomNumber(50,100);
  const {height, width} = board.getBoundingClientRect();
  console.log(board.getBoundingClientRect());
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  c.classList.add('circle');
  c.style.width = `${size}px`;
  c.style.height = `${size}px`;
  c.style.top = `${y}px`;
  c.style.left = `${x}px`;
  c.style.backgroundImage = `url('${getRandomBugs()}')`;
  c.style.backgroundSize = '200px';
  c.style.backgroundRepeat = 'no-repeat';
  c.style.backgroundPosition = 'center';

  board.append(c);
}

function decreaseTime() {
  if (time === 0) {
      finishGame();
      time = 600;
  } else {
  let current = --time;
  if (current < 10) {
    current = `0${current}`;
  }
  setTime(current);
}}

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomC();
  setTime(time);
}

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomC();
  }
});

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
if (event.target.classList.contains('time-btn')) {
  time = parseInt(event.target.getAttribute('data-time'));
  screens[1].classList.add('up');
  startGame();
}
});