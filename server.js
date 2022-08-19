// load the env consts
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


// session middleware.js
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');


// required routers
const profilesRouter = require('./routes/profiles');
const ticketsRouter = require('./routes/tickets');
const festivalsRouter = require('./routes/festivals');


// create the Express app
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware.js
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Add this middleware.js BELOW passport middleware.js
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRoutes);

// mount the profile route
app.use('/profile', profilesRouter);
// mount the ticket route
app.use('/tickets', ticketsRouter);
// mount the festival route
app.use('/festivals', festivalsRouter);


// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
