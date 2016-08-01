var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;
var async = require('async');
var author = require('../helper/authorize');
var userDAO = require('../model/UserDAO');
var belong_grDAO = require('../model/Belong_grDAO');
var decryptHelper = require('../helper/DecryptHelper');
var encryptHelper = require('../helper/EncryptHelper');
var EmailHelper = require('../helper/EmailMake');
var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();

var config = require('../helper/config.js');

var io = require('../app.js').tmp;

io.on('connection', function(socket) {
	socket.on('login', function(data) {
		async.series([function(callback){
      	  userDAO.findUserByEmail(data.email , callback);
  	  }], function(err , result){
			if(result[0]==''){
				var result = {result : "false"};
				socket.emit('login_result' , result);
				return;
			} else{
				if(decryptHelper.decryption(result[0][0].password)== data.password){
					if(result[0][0].email_verify==true){
					var results = {result : "true"};
					socket.emit('login_result' , results);
					socket.handshake.session.email = result[0][0].email; 
					socket.handshake.session.login = true;
					socket.handshake.session.save();
					return;
					} else{
						var result = {
										result : "verify",
										email : result[0][0].email
									 };
						socket.emit('login_result' , result);
						return;
					}
	        	} else{
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
	
	socket.on('getGroupImage', function(data){
		var group;
		async.waterfall([function(callback){
			userDAO.findUserByEmail(socket.handshake.session.email , callback);
		}, function(args1, callback){ 
			if(args1[0]==''){
				callback('err' , false);
			} else{
			belong_grDAO.getGidByUid(args1[0].uid , callback);}
		},function(args1, callback){
			if(args1[0]==''){
				callback('nullGroup' , false);
			} else{
				belong_grDAO.getUidInGroupNotMe(args1 , callback);
			}
		},function(args1 , callback){
			group = args1;
			console.log(group);
			var temp= args1[0].gid;
			var result = {};
			var count = 0;
			var lengths = 0;
			for (var i = 0 ; i < args1.length ; i++){
				var tmp;
				tmp = args1[i].gid;
					if(temp != tmp){
						result.(lengths+"") = args1[i].uid;
						++lengths;
						count =0;
					} else if(count >= 4){
						++count;
						continue;
					} else {
						++count;
						result.(lengths+"") = args1[i].uid;
						++lengths;
					}
					
			} //그거임 그거 그룹내 중복 UID 없에서 요청보내는거 최소화
			
			console.log(result);
		}, function(args1 , callback){
			var params = config.awsS3GetConfig;
			params.Key = args1[0].profile;
			s3.getSignedUrl('getObject', params, function (err, url) {
				console.log("The URL is", url); // https 주소 http로 바꿀것
				callback(null , url);
			});
		}] , function(err , results){
			var result = {URL : results};
			//var tempResult = {result : "abc"}
			socket.emit('GroupImageResult' , result);
		});
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