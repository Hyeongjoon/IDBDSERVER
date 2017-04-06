var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(Session);


var passport = require('./helper/passport.js').passport;

var config = require('./helper/config');

var client = redis.createClient(config.redisConfig.port , config.redisConfig.host , {no_ready_check: true});

var admin = require('firebase-admin');

var serviceAccount = require('./helper/tracer-6de9934918ad.json');

admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount) 
	});

var CookiePaser = cookieParser(config.secretKey);
var sessionStore = new redisStore({client : client});


var session = new Session({
	store: sessionStore,
	cookie:{
		maxAge: 1000 * 60 * 60
	},
	key : config.sessionKey,
	resave : false,
    saveUninitialized : false,
    secret: config.secretKey
});


var app = express();

//app.set('port', 80);
//app.listen(app.get('port'));

//ejs

var engine = require('ejs-locals');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.engine('ejs', engine);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(CookiePaser);
app.use(session);

app.use(passport.initialize());
app.use(passport.session());

exports.passport = passport;

app.use(express.static(path.join(__dirname, 'public')));




var sharedsession = require("express-socket.io-session");
var io = require('socket.io').listen(3000);

exports.tmp = io.use(sharedsession(session));

//var socketT = require('./routes/SocketTracer');
var signUp = require('./routes/signUp');
var verify = require('./routes/verify');
var login = require('./routes/Login');
var index = require('./routes/Index');
var findEmail = require('./routes/FindPwd');
var main = require('./routes/getMain');
var confirm = require('./routes/confirm');
var phone = require('./routes/phone');
var getList = require('./routes/GetList');
var auth = require('./routes/Auth');
var logout = require('./routes/Logout');
var mining = require('./routes/Mining');
var mail_send = require('./routes/Mail_send');
var emailverify = require('./routes/email_verify');
var FbVerify = require('./routes/Fbverify');

//app.use('/', socketT);
app.use('/' , index);
app.use('/signUp',notensureAuthenticated, signUp);
app.use('/login' ,notensureAuthenticated, login);
app.use('/findPwd' , findEmail);
app.use('/mail_send' , mail_send);
app.use('/main' , main);
app.use('/confirm' , confirm);
app.use('/phone' , phone);
app.use('/getList' , getList);
app.use('/auth' , auth);
app.use('/emailverify' ,ensureAuthenticated , emailverify );
app.use('/emailverify_Fb' ,FbVerify);
app.use('/logout', ensureAuthenticated , logout);
app.use('/mining' , function(req, res, next){
	if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, 만료된 페이지 
    res.redirect('/login');
} , mining);

var url = require('url');
var decryptHelper = require('./helper/DecryptHelper');

function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, 만료된 페이지 
    res.render('invalid', {});
}


function notensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { res.redirect('/'); }
    // 로그인이 안되어 있으면, 만료된 페이지 
    return next();
}


app.use('/verify', function(req , res , next){
	var parseObject = url.parse(req.url);
	if(parseObject.query==null){
		res.redirect('/invaild');
	} else{
		var sessionId = decryptHelper.decryptEmail(parseObject.query);
		sessionStore.get(sessionId , function(err , session){
			if(session==undefined){
				res.send('만료된 세션입니다 새로 가입해 주세요');//여기 페이지도 만들것
			} else{				
				req.session.inform = session.inform;
				sessionStore.destroy(sessionId , function(err){
					//세선 스토어에서 임시저장해놨던거 디스트로이 했을때 에러나면 처리해야할 구간
				});
				next();
			}
		});
	}
} , verify);

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