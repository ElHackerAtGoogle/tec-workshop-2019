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

// Converts a hex string into a rgb array.
// Assumes following hex format: #RRGGBB
function hexToRgb(hex: string): Array<number> {
  let rHex = hex.slice(1, 3);
  let gHex = hex.slice(3, 5);
  let bHex = hex.slice(5, 7);
  let r = parseInt(rHex, 16);
  let g = parseInt(gHex, 16);
  let b = parseInt(bHex, 16);
  return [r, g, b];
}

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
    cell.dataset.colorId = '' + i;
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
  let pickedColorId = event.target.dataset.colorId;
  drawPixel(pickedPixel.x, pickedPixel.y, colorPalette[pickedColorId]);
  setPixel(pickedPixel.x, pickedPixel.y, pickedColorId);
}

// Draws a pixel on canvas with the specified coordinates and hexadecimal color.
function drawPixel(x: number, y: number, hexColor: string) {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const pixel = ctx.getImageData(x, y, 1, 1);
  const color = hexToRgb(hexColor);
  pixel.data[0] = color[0]; // red
  pixel.data[1] = color[1]; // green
  pixel.data[2] = color[2]; // blue
  pixel.data[3] = 255; // alpha
  console.log(pixel.data);
  ctx.putImageData(pixel, x, y);
}

function setPixel(x: number, y: number, colorId: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/setPixel', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = () => {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished successfuly.
      console.log('Pixel is now stored');
    }
  }
  xhr.send(JSON.stringify({x, y, colorId}));
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
