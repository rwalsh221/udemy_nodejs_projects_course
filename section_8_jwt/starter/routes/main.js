const express = require('express');
const mainRouter = express.Router();

const { loginController, dashboardController } = require('../controllers/main');

mainRouter.route('/dashboard').get(dashboardController);
mainRouter.route('/login').post(loginController);

module.exports = mainRouter;
