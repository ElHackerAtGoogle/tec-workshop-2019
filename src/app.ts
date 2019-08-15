import express from 'express';
import path from 'path';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
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
