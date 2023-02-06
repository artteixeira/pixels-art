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
  for (let i = 1; i < color.length; i += 1) {
    color[i].style.backgroundColor = localStorageColors[i - 1];
  }
};

function setColor() {
  const color = document.querySelectorAll('.color');
  color[0].style.backgroundColor = 'black';
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

createPalette();
randomizeColorButton();

window.onload = loadStorage;
