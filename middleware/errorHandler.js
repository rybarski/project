// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
  
    res.status(500).json({
      message: 'Server Error',
      error: err.message // Optional: Include error details in development
    });
  };
  
  module.exports = errorHandler;
  