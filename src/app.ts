import express from 'express';
import expressWs from 'express-ws';
import path from 'path';

// Install WebSocket support in the express app.
const wsInstance = expressWs(express());
const app = wsInstance.app;
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

app.ws('/', (ws, req) => {
  // Assumes every message passed is in JSON format.
  ws.on('message', (msg) => {
    const data = JSON.parse(msg as string);
    switch (data.method) {
      case 'setPixel':
        // Request message is expected to contain:
        // {
        //    x: number,
        //    y: number,
        //    colorId: number,
        // }
        // TODO(elhacker): Add validation to not allow unsupported colors or
        // coordinates.
        const pictureIndex = convert2Dto1DCoordinates(data.x, data.y);
        storedPicture[pictureIndex] = data.colorId;
        // Broadcast to other clients that a pixel has changed.
        wsInstance.getWss().clients.forEach((client) => {
          if (client != ws) {
            client.send(JSON.stringify({
              method: 'drawPixel',
              x: data.x,
              y: data.y,
              colorId: data.colorId
            }));
          }
        });
        break;
      default:
        console.log('Method not supported');
    }
    console.log(data);
  });
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
