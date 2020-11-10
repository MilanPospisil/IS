var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var sessionstore = require('sessionstore');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entityRouter = require('./routes/entity');

var { connection } = require('./connection.js');

const {Model_db} = require("./model_db.js");
const {model} = require("./model/model.js");

connection.connect();
//Model_db.synchronizeModel(model, connection.client);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(session(
  {
    store: sessionstore.createSessionStore(),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  }
));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/entity', entityRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
