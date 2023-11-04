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
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomApiError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `hello ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomApiError('Not authorized to access route', 401);
  }
};

module.exports = { loginController, dashboardController };
