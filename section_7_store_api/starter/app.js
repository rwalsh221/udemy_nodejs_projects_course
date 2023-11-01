require('dotenv').config();
require('express-async-errors');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const connectDB = require('./db/connect');
const productsRouter = require('./routes/productsRouter');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// product routes

// error middleware not found triggers if route not found
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
