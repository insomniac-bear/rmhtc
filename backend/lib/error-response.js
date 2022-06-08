const CustomError = require('./custom-error');

module.exports = (err, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({
        service_data: {
          status: err.code,
          message: err.message,
        },
        client_data: {}
      });
  } else {
    return next(err);
  }
}