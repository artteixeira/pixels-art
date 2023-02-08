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
addPixelToBoard(5);
addSelected();
loadStorage();

const cleanPixel = () => {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
};

const clearButton = () => {
  const mid = document.querySelector('#mid');
  const clearBtn = document.createElement('button');
  clearBtn.setAttribute('id', 'clear-board');
  clearBtn.innerText = 'Limpar';
  mid.appendChild(clearBtn);
  clearBtn.addEventListener('click', cleanPixel);
};

clearButton();

const html = document.querySelector('#pixel-board');

const fillPixel = () => {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].addEventListener('click', (event) => {
      const selected = document.querySelector('.selected').style.backgroundColor;
      const oClick = event.target;
      oClick.style.backgroundColor = selected;
      if (oClick.style.backgroundColor !== 'white') {
        localStorage.setItem('pixelBoard', (html.innerHTML));
      }
    });
  }
};

const loadBoard = () => {
  const savedBoard = localStorage.getItem('pixelBoard');

  if (savedBoard !== null) html.innerHTML = savedBoard;
  fillPixel();
};

fillPixel();
loadBoard();

const CreateButtonsBoardSize = () => {
  const mid = document.querySelector('#mid');
  const inputCreate = document.createElement('input');
  inputCreate.setAttribute('id', 'board-size');
  inputCreate.setAttribute('min', '1');
  inputCreate.setAttribute('type', 'number');
  mid.appendChild(inputCreate);
  const buttonCreate = document.createElement('button');
  buttonCreate.setAttribute('id', 'generate-board');
  buttonCreate.innerText = 'VQV';
  mid.appendChild(buttonCreate);
};

CreateButtonsBoardSize();

const removeDiv = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const BoardSize = () => {
  const button = document.querySelector('#generate-board');
  button.addEventListener('click', () => {
    const input = document.querySelector('#board-size');
    if (input.value === '') {
      alert('Board inválido!');
      removeDiv();
      addPixelToBoard(5);
      return fillPixel();
    }
    if (input.value < 5) input.value = 5;
    if (input.value > 50) input.value = 50;
    removeDiv();
    addPixelToBoard(input.value);
    localStorage.removeItem('pixelBoard');
    fillPixel();
    localStorage.setItem('boardSize', input.value);
  });
};

BoardSize();

const test = () => {
  const saved = localStorage.getItem('boardSize');
  if (saved !== null) addPixelToBoard(saved);
};

test();
