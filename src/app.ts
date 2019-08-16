import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

const pictureWidth = 1000;
const pictureHeight = 1000;
const pictureSize = pictureWidth * pictureHeight;
// TODO(elhacker): Optimize the storage to use 4 bits for each pixel.
const storedPicture = Array.from<number>({length: pictureSize}).fill(0);

app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});

// Request is expected to be:
// {
//    x: number,
//    y: number,
//    colorId: number,
// }
// TODO(elhacker): Add validation to not allow unsupported colors or
// coordinates.
app.post('/setPixel', (req, res) => {
  req.accepts('application/json');
  console.log(req.body)
  const pictureIndex = convert2Dto1DCoordinates(req.body.x, req.body.y);
  storedPicture[pictureIndex] = req.body.colorId;
  res.sendStatus(200); // OK
});

app.get('/getPicture', (req, res) => {
  res.json({'picture': storedPicture});
});

app.get('/dist/game.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/game.js'))
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${port}`);
});

// Assumes indexes start at 0.
function convert2Dto1DCoordinates(x: number, y: number) {
  return y * pictureWidth + x;
}
