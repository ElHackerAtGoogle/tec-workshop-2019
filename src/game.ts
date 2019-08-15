function pickPixel(event) {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const x = event.layerX;
  const y = event.layerY;
  console.log('picking Pixel x:' + x + ' y:' + y);
  const pixel = ctx.getImageData(x, y, 1, 1);
  pixel.data[0] = 255; // red
  pixel.data[1] = 0; // green
  pixel.data[2] = 0; // blue
  pixel.data[3] = 255; // alpha
  console.log(pixel.data);
  ctx.putImageData(pixel, x, y);
}

window.onload = () => {
  console.log('Ready to play');
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('click', pickPixel);
}
