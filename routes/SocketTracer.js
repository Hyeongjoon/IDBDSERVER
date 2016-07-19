var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;
var async = require('async');
var author = require('../helper/authorize');
var userDAO = require('../model/UserDAO');
var decryptHelper = require('../helper/DecryptHelper');
var encryptHelper = require('../helper/EncryptHelper');
var EmailHelper = require('../helper/EmailMake');

var config = require('../helper/config.js');



var io = require('../app.js').tmp;


io.on('connection', function(socket) {
	socket.on('login', function(data) {
		console.log(data);
		async.series([function(callback){
      	  userDAO.findUserByEmail(data.email , callback);
  	  }], function(err , result){
			if(result[0]==''){
				console.log("그딴 이메일 없음");
				var result = {result : "false"};
				socket.emit('login_result' , result);
				return;
			} else{
				if(decryptHelper.decryption(result[0][0].password)== data.password){
					if(result[0].phone_verify==true){
					var result = {result : "true"};
					socket.emit('login_result' , result);
					socket.handshake.session.login = true;
					socket.handshake.session.save();
					return;
					} else{
						console.log(result[0]);
						var result = {result : "verify",
									email : result[0].email
						};
						socket.emit('login_result' , result);
					}
	        	} else{
	        		console.log("암호화 풀었더니 틀림");
	        		var result = {result : "false"};
	        		socket.emit('login_result' , result);
	        		return;
	        	}
			}
		})
	});
	
	socket.on('signUp',function(data){
		console.log(data);
		var result = {result : ""};
		if(data==undefined||data.password!==data.password_confirm||data.email==''||data.password==''||data.name==''||data.password_confirm==''){
			console.log("이상하게 안걸러지네?");
			result.result = "inner Server error";
			socket.emit('signUp_result' , result);
			return;
		} else{
			async.waterfall([function(callback){
				userDAO.findUserByEmail(data.email , callback);
			} , function(args1 , callback){
				if(args1.length!==0){
					callback('existed email' , false);
				} else{
					var tmpPassword = encryptHelper.encryption(data.password).toString();
					var insert = {
							'email' : data.email,
			        		'password' : tmpPassword,
			        		'name' : data.name};
					userDAO.register(insert , callback);
				}
			}] , function(err , results){
				if(err!==null){
					result.result = err;
				} else {
					result.result = true;
				}
				socket.emit('signUp_result' , result);
				if(result.result==true){
				EmailHelper.makeEmail(data.email);
				}
				return;
			});
		}
	});
	
	socket.on('reEmail' , function(data){
		EmailHelper.makeEmail(data.email);
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