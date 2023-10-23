const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasksRouter');

const port = 5000;

// MIDDLEWARE

app.use(express.json());

// ROUTES
app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
