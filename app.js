require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(PORT, function () {
  console.log(`Listening to request on port: ${PORT}`);
});
