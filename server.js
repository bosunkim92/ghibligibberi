var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// session middleware
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

// load the env vars
require('dotenv').config();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');
const commentsRouter = require('./routes/comments');
const myActivitiesRouter = require('./routes/myActivities');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
  secret: 'SEI Rocks!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/movies', moviesRouter);
moviesRouter.use('/:id/reviews', reviewsRouter);
app.use('/movies/:id/reviews/:id', commentsRouter);
app.use('/', myActivitiesRouter);

// app.use('/movies/:id/reviews', reviewsRouter);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
