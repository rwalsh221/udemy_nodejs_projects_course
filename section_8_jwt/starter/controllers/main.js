const jwt = require('jsonwebtoken');

const CustomApiError = require('../errors/custom-error');

const loginController = (async = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomApiError('Please provide email and password', 400);
  }

  // DUMMY USER ID
  const uid = new Date().getTime();

  const jwtToken = jwt.sign({ username, uid }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', jwtToken });
});

const dashboardController = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello john doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { loginController, dashboardController };
