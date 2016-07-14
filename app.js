var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Session = require('express-session');

var config = require('./helper/config.js');

var CookiePaser = cookieParser(config.secretKey);


var passport = require('./helper/passport.js').passport;




var session = new Session({
	//store: sessionStore,
	cookie:{
		maxAge: 1000 * 60 * 60
	},
	key : config.sessionKey,
	resave : false,
    saveUninitialized : false,
    secret: config.secretKey
});


var app = express();

/*app.set('port', 80);
app.listen(app.get('port'));*/
//ejs

var engine = require('ejs-locals');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.engine('ejs', engine);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(CookiePaser);
app.use(session);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

exports.passport = passport;

app.use(express.static(path.join(__dirname, 'public')));








var sharedsession = require("express-socket.io-session");
var io = require('socket.io').listen(80);

exports.tmp = io.use(sharedsession(session));

var socketT = require('./routes/SocketTracer');
var signUp = require('./routes/signUp');

app.use('/', socketT);
app.use('/signUp' , signUp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
