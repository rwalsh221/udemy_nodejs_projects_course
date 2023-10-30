const { CustomApiError } = require('../errors/CustomError');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: 'Something went wrong please try agiain' });
};

module.exports = errorHandlerMiddleware;
