function createPalette() {
  const colorPalette = document.getElementById('color-palette');
  for (let i = 0; i < 4; i += 1) {
    const colorButton = document.createElement('button');
    colorButton.classList.add('color');
    colorPalette.appendChild(colorButton);
  }
}

createPalette();

function randomizeColor() {
  return `rgb(
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)})`;
}

console.log(randomizeColor());

function setColor() {
  const color = document.querySelectorAll('.color');
  color[0].style.backgroundColor = 'black';
  for (let i = 1; i < color.length; i += 1) {
    color[i].style.backgroundColor = randomizeColor();
  }
}

setColor();
