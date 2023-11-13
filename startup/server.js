const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const register = require('../routes/register');
const login = require('../routes/login');
const protected = require('../routes/protected');

const authenticate = require('../middleware/authentification');
const errorHandling = require('../middleware/errorHandling');
const connectDB = require('./db');
const passport = require('passport');
const passportConfig = require('../config/passport');


const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set up session management
// Set up session management
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/myapp',
    collection: 'sessions',
  });

  store.on('error', (error) => {
    console.error(error);
  });

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Set up routes
app.use('/register', register);
app.use('/login', login);
app.use('/protected', protected);

// Error handling middleware
app.use(errorHandling);

module.exports = app;
