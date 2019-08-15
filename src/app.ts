import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Welcome to Tec Workshop 2019');
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${port}`);
});
