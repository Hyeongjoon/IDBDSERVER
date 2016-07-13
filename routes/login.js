var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;
var author = require('../helper/authorize');

var io = require('../app.js').tmp;


io.on('connection', function(socket) {
	socket.on('login', function(data) {
		console.log("뿌잉");
		console.log(data);
	});
});
/*
router.get('/', function(req, res, next) {
	res.render('login', {
		
	});
});
router.get('/login',
	   // passport.authenticate('local', { failureRedirect: '/login_fail', failureFlash: true }),
	    function(req, res) {
	console.log(req.body);
	console.log("여기2번");
	        res.redirect('/login_success');
	    });

router.post('/login_chk' , function(req, res, next){
			req.body.email = "wkdwns00@gmail.com";
			req.body.password = "7557523m";
			console.log(req.body);
			console.log("여기1번");
			res.redirect('/login');
});


router.get('/login_success', author.ensureAuthenticated, function(req, res, next){
	console.log(req.session);
	res.send(req.session.passport);
});


router.get('/login_fail' , function(req, res, next){
	res.send("로긴실패");
});*/



module.exports = router;