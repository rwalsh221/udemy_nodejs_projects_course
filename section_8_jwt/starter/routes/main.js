const express = require('express');
const mainRouter = express.Router();

const { loginController, dashboardController } = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth');

mainRouter
  .route('/dashboard')
  .get(authenticationMiddleware, dashboardController);
mainRouter.route('/login').post(loginController);

module.exports = mainRouter;
