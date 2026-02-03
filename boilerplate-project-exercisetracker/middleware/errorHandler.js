const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Database errors
  if (err.code && err.code.startsWith('SQLITE_')) {
    return res.status(500).json({
      error: 'Database error occurred'
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error'
  });
};

module.exports = errorHandler;
