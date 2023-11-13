const passport = require('passport');

const authenticate = (req, res, next) => {
  passport.authenticate('local', { session: true })(req, res, next);
};

module.exports = authenticate;
