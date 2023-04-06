require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dataSource = require('./models/appDataSource');
const { globalErrorHandler } = require('./utils/error');
<<<<<<< HEAD
const router = require('./routes/index');
=======
const router = require('./routes');
>>>>>>> main

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
<<<<<<< HEAD
=======
app.use(router);
>>>>>>> main
app.use(globalErrorHandler);
app.use(router);

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(PORT, async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((error) => {
      console.error('Error during Data Source initialization', error);
    });

  console.log(`Listening to request on port: ${PORT}`);
});
