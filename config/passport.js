const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const {User} = require('../models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find the user by username
      const user = await User.findOne({ username });

      // If the user doesn't exist, return error
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      // If the passwords don't match, return error
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      // If the user exists and the password matches, return the user
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
