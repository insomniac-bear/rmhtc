const CustomError = require('./custom-error');

module.exports = (err, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({
        status: err.code,
        client_data: null
      });
  } else {
    return next(err);
  }
}