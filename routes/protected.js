const express = require('express');
const router = express.Router();

// Example route that requires authentication
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'Protected route accessed successfully' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
module.exports = router;
