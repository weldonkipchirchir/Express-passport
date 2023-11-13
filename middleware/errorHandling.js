const errorHandling = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  };

  module.exports = errorHandling;
