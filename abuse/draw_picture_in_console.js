// TODO(elhacker): Paste the picture array contents bellow in the console.
const pic = [];
for (let y = 0; y < pic.length; y++) {
  for (let x = 0; x < pic[0].length; x++) {
    let colorId = pic[y][x];
    drawPixel(x, y, colorPalette[colorId]);
    setPixel(x, y, colorId);
  }
}
