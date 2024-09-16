const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const screens = document.querySelectorAll('.screen');
let time = 0;
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let score = 0;
const colors = ['AliceBlue', 'Aquamarine', 'CadetBlue', 'BlueViolet', 'Coral'];
let message = '';

const bugs = [
  'https://images.unsplash.com/photo-1526773357673-2d4e8116d497?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zZWN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1516434593931-42aaf04e6ef2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fGluc2VjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1619532474053-e9de8d7d4046?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1563467806606-6364ca2bca19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1530936645058-0759135246db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1532119487593-1f9cfc7a7a9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fGJ1Z3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1467744431200-ec24296954a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxfHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1522325636832-5dbc1440f793?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQzfHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1596646581539-0679fc2a3f3c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1595527963271-c8c874fb9e33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjI3fHxidWd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
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
  timeEl.textContent = `00:${value < 10 ? '0' + value : value}`;
}

function finishGame() {
  endMessage();
  timeEl.parentElement.remove();
  board.innerHTML = `<h1>Bug-ов поймано: ${score}</h1><h2>${message}</h2><button class="btn" onclick='window.location.reload(true)'>Попробовать ещё раз!</button>`;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

let difficulty = 1;

function setDifficulty(level) {
  difficulty = level;
  maxMissedBugs = 5 + (level - 1) * 3;
}

let missedBugs = 0;
let maxMissedBugs = 5;
let glitchIntensity = 0;
let gameStarted = false;

function addGlitchEffect() {
  glitchIntensity += 1 / maxMissedBugs;
  updateGlitchEffects();
}

function updateGlitchEffects() {
  board.style.filter = `hue-rotate(${glitchIntensity * 360}deg) blur(${glitchIntensity * 2}px)`;
  board.style.transform = `skew(${glitchIntensity * 10}deg, ${glitchIntensity * 5}deg)`;
  
  const timeEl = document.querySelector('#time');
  timeEl.style.fontStretch = `${100 + glitchIntensity * 100}%`;
  timeEl.style.letterSpacing = `${glitchIntensity * 10}px`;
  
  document.body.style.backgroundColor = `hsl(${200 + glitchIntensity * 100}, 50%, ${50 - glitchIntensity * 20}%)`;
}

function createRandomC() {
  const c = document.createElement('div');
  const size = getRandomNumber(50, 100);
  const {height, width} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  c.classList.add('circle');
  c.style.width = `${size}px`;
  c.style.height = `${size}px`;
  c.style.top = `${y}px`;
  c.style.left = `${x}px`;
  
  if (difficulty === 3) {
    const bugIndex = Math.floor(glitchIntensity * bugs.length);
    c.style.backgroundImage = `url('${bugs[bugIndex]}')`;
  } else {
    c.style.backgroundImage = `url('${getRandomItem(bugs)}')`;
  }
  
  c.style.backgroundSize = 'cover';
  c.style.backgroundRepeat = 'no-repeat';
  c.style.backgroundPosition = 'center';
  board.append(c);
  
  c.style.transition = 'all 0.3s ease-out';
  c.style.filter = `brightness(${1 + glitchIntensity}) blur(${glitchIntensity * 2}px)`;
  c.style.transform = `rotate(${glitchIntensity * 360}deg) scale(${1 + glitchIntensity * 0.5})`;

  if (difficulty === 3) {
    c.style.animation = `wobble ${1 - glitchIntensity * 0.5}s infinite alternate`;
  }

  const disappearTime = 2000 / difficulty;
  setTimeout(() => {
    if (c.parentNode === board) {
      c.remove();
      missedBugs++;
      addGlitchEffect();
      if (missedBugs >= maxMissedBugs) {
        gameOver();
      } else {
        createRandomC();
      }
    }
  }, disappearTime);
}

function gameOver() {
  stopTimer();
  board.innerHTML = '<h1>Игра сломалась!</h1><button class="btn" onclick="resetGame()">Начать заново</button>';
  board.style.animation = 'finalGlitch 1s infinite';
  document.body.style.animation = 'backgroundGlitch 0.5s infinite';
  
  for (let i = 0; i < 20; i++) {
    createChaosC();
  }
}

function createChaosC() {
  const c = document.createElement('div');
  const size = getRandomNumber(30, 70);
  c.classList.add('circle', 'chaos');
  c.style.width = `${size}px`;
  c.style.height = `${size}px`;
  c.style.backgroundImage = `url('${getRandomItem(bugs)}')`;
  c.style.backgroundSize = 'cover';
  c.style.backgroundRepeat = 'no-repeat';
  c.style.backgroundPosition = 'center';
  document.body.appendChild(c);

  animateChaosC(c);
}

function animateChaosC(c) {
  const duration = Math.random() * 2 + 1;
  const tx = Math.random() * window.innerWidth;
  const ty = Math.random() * window.innerHeight;
  const rotation = Math.random() * 720 - 360;

  c.style.transition = `all ${duration}s ease-out`;
  c.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotation}deg) scale(0)`;

  setTimeout(() => {
    c.remove();
  }, duration * 1000);
}

let timerInterval;

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  timerInterval = setInterval(decreaseTime, 1000);
  createRandomC();
  setTime(time);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetGame() {
  stopTimer();
  missedBugs = 0;
  glitchIntensity = 0;
  gameStarted = false;
  score = 0;
  time = 0;
  board.innerHTML = '';
  board.style.filter = '';
  board.style.transform = '';
  board.style.animation = '';
  document.body.style.backgroundColor = '';
  document.body.style.animation = '';
  const timeEl = document.querySelector('#time');
  if (timeEl) {
    timeEl.style.fontStretch = '';
    timeEl.style.letterSpacing = '';
    timeEl.textContent = '00:00';
  }
  
  // Удаляем все хаотичные жуки
  document.querySelectorAll('.circle.chaos').forEach(el => el.remove());
  
  // Сбрасываем все экраны
  screens.forEach((screen, index) => {
    screen.style.transform = `translateY(${index * 100}%)`;
  });
}

function showScreen(index) {
  screens.forEach((screen, i) => {
    screen.style.transform = `translateY(${(i - index) * 100}%)`;
  });
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function finishGame() {
  stopTimer();
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>
    <button class="btn" onclick="resetGame()">Начать заново</button>`;
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
  showScreen(1);
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    setDifficulty(parseInt(event.target.getAttribute('data-difficulty')));
    showScreen(2);
    startGame();
  }
});

function createBackgroundBug(screen) {
  const c = document.createElement('div');
  const size = getRandomNumber(30, 60);
  const {height, width} = screen.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  c.classList.add('background-bug');
  c.style.width = `${size}px`;
  c.style.height = `${size}px`;
  c.style.top = `${y}px`;
  c.style.left = `${x}px`;
  c.style.backgroundImage = `url('${getRandomItem(bugs)}')`;
  c.style.backgroundSize = 'cover';
  c.style.backgroundRepeat = 'no-repeat';
  c.style.backgroundPosition = 'center';
  screen.appendChild(c);

  c.addEventListener('mouseover', () => {
    runAway(c, screen);
  });

  animateBackgroundBug(c, screen);
}

function runAway(bug, screen) {
  const {height, width} = screen.getBoundingClientRect();
  const bugRect = bug.getBoundingClientRect();
  
  let newX, newY;
  
  // Определяем направление "убегания"
  if (bugRect.left < width / 2) {
    newX = -bugRect.width;
  } else {
    newX = width;
  }
  
  if (bugRect.top < height / 2) {
    newY = -bugRect.height;
  } else {
    newY = height;
  }

  bug.style.transition = 'all 0.5s ease-out';
  bug.style.transform = `translate(${newX}px, ${newY}px)`;

  setTimeout(() => {
    bug.remove();
    createBackgroundBug(screen);
  }, 500);
}

function animateBackgroundBug(bug, screen) {
  const {height, width} = screen.getBoundingClientRect();
  const moveX = getRandomNumber(-100, 100);
  const moveY = getRandomNumber(-100, 100);
  const duration = getRandomNumber(5, 10);

  bug.style.transition = `transform ${duration}s linear`;
  bug.style.transform = `translate(${moveX}px, ${moveY}px)`;

  setTimeout(() => {
    bug.remove();
    createBackgroundBug(screen);
  }, duration * 1000);
}

function addBackgroundBugs() {
  const startScreen = screens[0];
  const difficultyScreen = screens[1];

  for (let i = 0; i < 5; i++) {
    createBackgroundBug(startScreen);
    createBackgroundBug(difficultyScreen);
  }
}

// Вызываем resetGame при загрузке страницы
window.addEventListener('load', () => {
  resetGame();
  addBackgroundBugs();
});