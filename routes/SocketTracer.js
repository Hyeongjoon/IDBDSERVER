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
		var groupNum = {groupNum : 0};
		var groupInfo;
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
				groupNum.groupNum = args1.length;
				groupInfo = args1;
				belong_grDAO.getUidInGroupNotMe(args1 , callback);
			}
		},function(args1 , callback){
			if(args1[0]== ''){
				callback('nullMemberNotMe' , false);
			}else{
			var temp= args1[0].gid;
			var tempArr = [];
			var count = 0;
			var deleteNum = [];
			for (var i = 0 ; i < args1.length ; i++){
				var tmp;
				tmp = args1[i].gid;
					if(temp != tmp){
						temp = tmp;
						tempArr.push(args1[i].uid);
						count =1;
					} else if(count >= 4){
						++count;
						deleteNum.push(i);
						continue;
					} else {
						++count;
						tempArr.push(args1[i].uid);
					}
			} //그거임 그거 그룹내 중복 UID 없에서 요청보내는거 최소화
			tempArr.sort();
			var tmpCount = 0;
			for(var i = 0 ; i < deleteNum.length ; i++){
				 args1.splice(deleteNum[i] - tmpCount , 1);
				 ++tmpCount;
			} //그룹별 4개 이상인거 다지울꺼
			group = args1;
			var result = [];
			result.push(tempArr[0]);
			for(var i = 1 ; i < tempArr.length ; i++){
				if(tempArr[i-1]!=tempArr[i]){
					result.push(tempArr[i]);
				}
			}
			belong_grDAO.getProfileByUid(result , callback);
			}
		}, function(args1 , callback){
			if(args1[0] == ''){
				callback('nullURL' , false);
			} else{
				var params = config.awsS3GetConfig;
				for(var i = 0 ; i <args1.length ; i++){
				params.Key = args1[i].profile;
				s3.getSignedUrl('getObject', params, function (err, url) {
					url = url.replace("https://" , "http://")
					args1[i].profile = url;
				}); //https -> http로 바꾸기
				}
				callback(null , args1);
			}
		}] , function(err , results){
			if(err){
				console.log(err);
				//에러처리 나중에 꼭하기
			}else{
				console.log(results);
				console.log(group);
				console.log(groupInfo);
				socket.emit('GroupImageResult' , results , group , groupNum , groupInfo);
			}
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