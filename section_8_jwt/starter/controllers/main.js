const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors/index');

const loginController = (async = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest('Please provide email and password');
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
    msg: `hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { loginController, dashboardController };
