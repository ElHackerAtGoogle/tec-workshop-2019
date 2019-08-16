const colorPalette = [
    '#FFFFFF',
    '#E4E4E4',
    '#888888',
    '#222222',
    '#FFA7D1',
    '#E50000',
    '#E59500',
    '#A06A42',
    '#E5D900',
    '#94E044',
    '#02BE01',
    '#00D3DD',
    '#0083C7',
    '#0000EA',
    '#CF6EE4',
    '#820080'
];

let pickedPixel;
let pickedColor;

// Sets the predefined colors within the color pallete.
function loadColors() {
  const paletteCells = document.getElementsByClassName('color-cell');
  if (colorPalette.length !== paletteCells.length) {
    console.error('Palette Cells size must be the same as Colors size');
    return;
  }
  for (let i = 0; i < colorPalette.length; i++) {
    const cell = paletteCells[i] as HTMLElement;
    cell.style.backgroundColor = colorPalette[i];
  }
}

function pickPixel(event) {
  const palette = <HTMLElement>document.getElementById('palette');
  palette.classList.remove('hidden');
  const x = event.layerX;
  const y = event.layerY;
  pickedPixel = {x, y};
  console.log('picked Pixel: ' + pickedPixel.x + ', ' + pickedPixel.y);
}

function pickColor(event) {
  const palette = <HTMLElement>document.getElementById('palette');
  palette.classList.add('hidden');
  pickedColor = event.target.style.backgroundColor;
  console.log('picked color: ' + pickedColor);
  /**
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const pixel = ctx.getImageData(x, y, 1, 1);
  pixel.data[0] = 255; // red
  pixel.data[1] = 0; // green
  pixel.data[2] = 0; // blue
  pixel.data[3] = 255; // alpha
  console.log(pixel.data);
  ctx.putImageData(pixel, x, y);
  */
}

window.onload = () => {
  console.log('Ready to play');
  loadColors();
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('click', pickPixel);
  const paletteCells = document.getElementsByClassName('color-cell');
  for (let i = 0; i < paletteCells.length; i++) {
    const cell = paletteCells[i] as HTMLElement;
    cell.addEventListener('click', pickColor);
  }
}
