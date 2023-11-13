const express = require('express')
const router = express.Router()
const passport = require('passport');

 // User login route
 router.post('/', passport.authenticate('local', { session: true }),
  (req, res) => {
    res.json({ message: 'User logged in successfully' });
  }
);

module.exports = router;
