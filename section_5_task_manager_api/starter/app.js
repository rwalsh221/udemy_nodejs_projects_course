const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasksRouter');
const connectDb = require('./db/connect');
require('dotenv').config();

const port = 5000;

// MIDDLEWARE

app.use(express.json());

// ROUTES
app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasksRouter);

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
