function createPalette() {
  const colorPalette = document.getElementById('color-palette');
  for (let i = 0; i < 4; i += 1) {
    const colorButton = document.createElement('button');
    colorButton.classList.add('color');
    colorPalette.appendChild(colorButton);
  }
}

function randomizeColor() {
  return `rgb(
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)})`;
}

const SaveStorage = (localStorageColors) => {
  const color = document.querySelectorAll('.color');
  color[0].style.backgroundColor = 'black';
  color[0].classList.add('selected');
  for (let i = 1; i < color.length; i += 1) {
    color[i].style.backgroundColor = localStorageColors[i - 1];
  }
};

function setColor() {
  const color = document.querySelectorAll('.color');
  color[0].style.backgroundColor = 'black';
  color[0].classList.add('selected');
  const colors = [];
  for (let i = 1; i < color.length; i += 1) {
    const random = randomizeColor();
    color[i].style.backgroundColor = random;
    colors.push(random);
  }
  localStorage.setItem('colorPalette', JSON.stringify(colors));
}

function loadStorage() {
  const localStorageColors = JSON.parse(localStorage.getItem('colorPalette'));
  if (localStorageColors !== null) {
    SaveStorage(localStorageColors);
  } else {
    setColor();
  }
}

const randomizeColorButton = () => {
  const randomColorButton = document.createElement('button');
  randomColorButton.setAttribute('id', 'button-random-color');
  randomColorButton.innerText = 'Cores aleatórias';
  randomColorButton.addEventListener('click', setColor);
  const colorPalette = document.getElementById('color-palette');
  colorPalette.appendChild(randomColorButton);
};

const addPixelToBoard = (n) => {
  const board = document.getElementById('pixel-board');
  for (let i = 1; i <= n; i += 1) {
    const pai = document.createElement('div');
    board.appendChild(pai);
    for (let j = 1; j <= n; j += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pai.appendChild(pixel);
    }
  }
};

const CreateSelect = (event) => {
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');
  event.target.classList.add('selected');
};

const addSelected = () => {
  const color = document.querySelectorAll('.color');
  for (let i = 0; i < color.length; i += 1) {
    color[i].addEventListener('click', CreateSelect);
  }
};

createPalette();
randomizeColorButton();
addSelected();
addPixelToBoard(5);

window.onload = loadStorage;
