const errorHandler = (err, req, res, next) => {
  let status;
  if (res) {
    status = res.statusCode ? res.statusCode : 500;
    res.status(status).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = errorHandler;
