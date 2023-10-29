const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasksRouter');
const connectDb = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/notFound');

const port = 5000;

// MIDDLEWARE
app.use(express.static('./public'));
app.use(express.json());

// ROUTES

app.use('/api/v1/tasks', tasksRouter);

app.use(notFound);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
