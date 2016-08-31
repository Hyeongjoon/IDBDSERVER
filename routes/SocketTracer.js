var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;
var async = require('async');
var author = require('../helper/authorize');
var userDAO = require('../model/UserDAO');
var belong_grDAO = require('../model/Belong_grDAO');
var alramDAO = require('../model/AlramDAO');
var groupDAO = require('../model/GroupDAO');
var locationDAO = require('../model/LocationDAO');
var decryptHelper = require('../helper/DecryptHelper');
var encryptHelper = require('../helper/EncryptHelper');
var EmailHelper = require('../helper/EmailMake');
var alramHelper = require('../helper/AlramHelper');
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
	
	socket.on('getAlram' , function(data){
		if(socket.handshake.session.uid==null){
			//세션 만료됐을때
		}else{
			var alramInfo;
			var tempUIDArr;
			var profileArr;
			var alramOrder = [];
			async.waterfall([ function(callback){
				alramDAO.findAlramByUid(socket.handshake.session.uid , callback)	
			} , function(args , callback){
				var classifiedAlram;
				if(args[0] == ''){
					callback('null alram' , false)
				} else{
					for(var i = 0 ; i < args.length; i++){
						alramOrder.push(args[i].aid);
					}
					classifiedAlram = alramHelper.classifyAlram(args);
				}
				async.series([function(subCallback){
					if(classifiedAlram.location.length==0){
						subCallback(null , null);
					} else{
						alramDAO.findLocationWriter(classifiedAlram.location ,subCallback); 
					}
				} , function(subCallback){
					if(classifiedAlram.like.length==0){
						subCallback(null , null);
					} else{
						alramDAO.findLikeUser(classifiedAlram.like , subCallback);
					}
				}, function(subCallback){
					if(classifiedAlram.dislike.length==0){
						subCallback(null , null);
					} else{
						alramDAO.findDislikeUser(classifiedAlram.dislike , subCallback);
					}
				}, function(subCallback){
					if(classifiedAlram.reply.length==0){
						subCallback(null , null);
					} else{
						alramDAO.findReplyUser(classifiedAlram.reply , subCallback);
					}
				}, function(subCallback){
					if(classifiedAlram.re_reply.length==0){
						subCallback(null , null);
					} else{
						alramDAO.findReReplyUser(classifiedAlram.re_reply ,subCallback);
					}
				}, function(subCallback){
					if(classifiedAlram.like_reply.length==0){
						subCallback(null , null);
					} else{
						alramDAO.findLikeReplyUser(classifiedAlram.like_reply , subCallback);
					}
				}, function(subCallback){
					if(classifiedAlram.like_re_reply.length==0){
						subCallback(null , null);
					} else{
						alramDAO.findLikeReReplyUser(classifiedAlram.like_reply , subCallback);
					}
				}] , function(subErr , subResult){
					if(subErr){
						console.log(subErr);
						//subErr 처리할곳
					} else{
						alramHelper.addProfileUID(classifiedAlram , subResult , callback);
					}
				});//시발 너무 쓰레기같다 접근이 한번하는데 디비에 몇번접근하는거야 슈발
			}, function(args1 , args2 , callback){
				alramInfo =args1;
				var temp = args2.sort();
				var uidArr = []
				uidArr.push(temp[0]);
				for (var i = 1 ; i <temp.length ; i++){
					if(temp[i-1] !== temp[i]){
						uidArr.push(temp[i]);
					}
				}
				tempUIDArr = uidArr;
				userDAO.getProfileByUid(tempUIDArr , callback);
			} ,function(args1 , callback){
				var params = config.awsS3GetConfig;
				for(var i = 0 ; i <args1.length ; i++){
				params.Key = args1[i].profile;
				s3.getSignedUrl('getObject', params, function (err, url) {
					url = url.replace("https://" , "http://")
					args1[i].profile = url;
				}); //https -> http로 바꾸기
				}
				profileArr = args1;
				userDAO.getUserNameByUID(tempUIDArr , callback);
			}] , function(err , results){
				if(err){
					socket.emit("alramResult" , null);
				}else{
				console.log(alramOrder);
				var order = {order : alramOrder};
				alramInfo = alramHelper.finalAlramInfo(results , profileArr , alramInfo);
				console.log(alramInfo);
				socket.emit("alramResult" , alramInfo , order);
				}
			});
		}
	});
	
	
	//이거 시발 날잡고 갈아엎자
	socket.on('getGroupImage', function(data){
		var group;
		var groupNum = {groupNum : 0}; // 이거 마지막으로 넘길것
		var groupInfo;
		var tempGroup;
		async.waterfall([ function(callback) {
			userDAO.findUserByEmail(socket.handshake.session.email , callback);
		}, function(args1, callback){ 
			if(args1[0]==''){
				callback('err' , false);
			} else{
				socket.handshake.session.uid = args1[0].uid;
				socket.handshake.session.save();
				// 세션에다가 uid 저장
				belong_grDAO.getGidByUid(args1[0].uid , callback);}
		}, function(args1, callback){
			if(args1[0]==''){
				callback('nullGroup' , false);
			} else{
				tempGroup = args1;
				groupNum.groupNum = args1.length;       //이거 마지막으로 넘길것
				groupDAO.getGroupBygid(args1 , callback);
			}
		}, function (args1 , callback) {
			group = args1;
			locationDAO.findRecentLocationByGid(args1 , callback);
		}, function(args1 , callback){
			if(args1[0] == '') {
				callback('nullPhoto' , false);
			} else {
				var params = config.awsS3GetConfig;
				for(var i = 0 ; i <args1.length ; i++){
				params.Key = args1[i].file_location;
				s3.getSignedUrl('getObject', params, function (err, url) {
					url = url.replace("https://" , "http://")
					args1[i].file_location = url;
				}); //https -> http로 바꾸기
				}
				callback(null , args1);
			}
		} , function(args1 , callback){
			for (var i = 0 ; i <group.length; i++){
				group[i].file_location = null;
				for (var j = 0 ; j < args1.length; j++){
					if(group[i].gid == args1[j].belonged_gid){
					group[i].file_location = args1[j].file_location;
					break;
					}
				}
				for(var j = 0 ; j < tempGroup.length ; j++){
					if(group[i].gid == tempGroup[j].gid){
						group[i].name = tempGroup[j].name;
					}
				}
			}
			belong_grDAO.getUidInGroupNotMe(group , socket.handshake.session.uid , callback);
		} , function(args1 , callback){
				if(args1[0] == ''){
					callback('noMember' , null);
				} else {
					console.log(args1);
					var tempArr = [];
					tempArr.push(args1[0].uid);
					var tempGid = args1[0].gid;
					var tempNum =0;
					for(var i = 1 ; i < args1.length ; i++){
						if(tempGid!==args1[i].gid){
							tempGid = args1[i].gid;
							tempNum = 1;
							tempArr.push(args1[i].uid);
						} else if(tempNum >=3){
							++tempNum;
						} else{
							++tempNum;
							tempArr.push(args1[i].uid);
						}
					}
					console.log(tempArr);
				}
		}] , function (err , results) {
			if(err){
				console.log(err);
				//에러처리 나중에 꼭하기
			} else {
			
			/*
				for(var i = 0 ; i < groupInfo.length ; i++){
					if(groupInfo[i].name==null){
						for(var j = 0 ; j <group.length ; j++){
							if(groupInfo[i].gid == group[j].gid){
							for(var k = 0 ; k<results.length ; k++){
								if(group[j].uid == results[k].uid){
									groupInfo[i].name = ''+ groupInfo[i].name + ',' + results[k].name;//붙일것 이름
									}
								}
							} 
						}
					}
				}
				for(var i = 0 ; i <groupInfo.length ; i++){
					groupInfo[i].name = groupInfo[i].name.slice(5);
					if(groupInfo[i].number>4){
						groupInfo[i].name = groupInfo[i].name +'...';
					}
				}
				socket.emit('GroupImageResult' , groupProfile , group , groupNum , groupInfo);*/
			}
		});
	});
});



module.exports = router;