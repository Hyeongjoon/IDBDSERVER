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
var codeDAO = require('../model/CodeDAO');
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
	
/*	socket.on('getAlram' , function(data){
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
	});*/
	
	
	//이거 시발 날잡고 갈아엎자
	socket.on('getGroupImage', function(data){
		var group;
		var groupNum = {groupNum : 0}; // 이거 마지막으로 넘길것
		var groupMember = [];
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
				for (var j = 0 ; j < args1.length; j++){
					if(group[i].gid == args1[j].belonged_gid){
					group[i].file_location = args1[j].file_location;
					break;
					}
				}
				for(var j = 0 ; j < tempGroup.length ; j++){
					if(group[i].gid == tempGroup[j].gid){
						group[i].name = tempGroup[j].name;
						group[i].updated = tempGroup[j].updated;
					}
				}
			}
			var realTemp =[];
			for(var i = 0 ; i < tempGroup.length ; i++){
				for(var j = 0 ; j <group.length;j++){
					if(tempGroup[i].gid == group[j].gid){
						realTemp.push(group[j]);
						break;
					}
				}
			}
			group = realTemp;
			belong_grDAO.getUidInGroupNotMe(group , socket.handshake.session.uid , callback);
		} , function(args1 , callback){
				if(args1[0] == ''){
					callback('noMember' , null);
				} else {
					var tempArr = [];
					groupMember.push(args1[0]);
					tempArr.push(args1[0].uid);
					var tempGid = args1[0].gid;
					var tempNum =0;
					for(var i = 1 ; i < args1.length ; i++){
						if(tempGid!==args1[i].gid){
							tempGid = args1[i].gid;
							tempNum = 0;
							tempArr.push(args1[i].uid);
							groupMember.push(args1[i]);
						} else if(tempNum >=3){
							++tempNum;
						} else{
							++tempNum;
							tempArr.push(args1[i].uid);
							groupMember.push(args1[i]);
						}
					}
					tempArr = tempArr.sort();
					var resultArr = [];
					resultArr.push(tempArr[0]);
					for ( var i = 1 ; i < tempArr.length ; i++ ){
						if(tempArr[i-1]!=tempArr[i]){
							resultArr.push(tempArr[i]);
						}
					}
					userDAO.getUserNameByUID(resultArr , callback);
				}
		}] , function (err , results) {
			if(err){
				console.log(err);
				//에러처리 나중에 꼭하기
			} else {
				for(var i = 0 ; i <groupMember.length ; i++){
					for (var j = 0 ; j<results.length ; j++){
						if(groupMember[i].uid == results[j].uid){
							groupMember[i].name = results[j].name;
						}
					}
				}
				for(var i = 0 ; i < group.length ; i++){
					group[i].memberName = '';
					for (var j = 0 ; j <groupMember.length ; j++){
						if(group[i].gid == groupMember[j].gid){
							group[i].memberName = group[i].memberName + groupMember[j].name + ','; 
						}
					}
				}
				for (var i = 0 ; i <group.length ; i++){
					group[i].memberName = group[i].memberName.substring(0 , group[i].memberName.length-1);
					if(group[i].file_location == undefined){
						group[i].file_location = null;
					}
				}
				socket.emit('GroupImageResult' , group );
			}
		});
	});
	
	socket.on('changedList' , function(data){
		if(socket.handshake.session.uid==null){
			//세션 만료됐을때
		} else{
			async.waterfall([function(callback){
				belong_grDAO.switchGrOrderByGid(data , socket.handshake.session.uid , callback);
			}] , function(err , results){
				if(err){
					console.log(err);
					console.log("순서 변경 오류생김");	
				} else{
					console.log("순서변경 완료");
				}
			});
		}
	});
	
	socket.on('addGroup' , function(data){
		if(socket.handshake.session.uid==null){
			//세션 만료됐을때
		} else{
			var gid;
			var errCheck = false;
			async.waterfall([function(callback){
				belong_grDAO.addViewOrder(socket.handshake.session.uid , callback);
			} , function(args1 , callback){
				groupDAO.addGroupReturnID(callback);
			} , function(args1 , callback){
				gid = args1.insertId;
				belong_grDAO.addBelong_gr(socket.handshake.session.uid , gid , data , callback);
			} , function(args1 , callback){
				var check = true;
				async.whilst(
						function(){return check==true},
						function(subCallback){
							async.parallel([function(sub2Callback){
								var key = encryptHelper.codeGen();
								codeDAO.insertCode( gid  , key , sub2Callback);
							}] , function(err ,results){
								if((err+"").indexOf('PRIMARY')!=-1){
									console.log('코드가 중복');
								} else if(err){
									//이거 에러처리해야됨 코드 삽입 안됐을때(중복빼고) 어캐할껀지....슈벌탱
									check=false;
									console.log('삽입중 알수업는 오류');
									console.log(err);
								} else{
									check=false;
								}
							});
							setTimeout(function() {
								subCallback(null, check);
					        }, 1000);
						},
						function(err , check){
							if(err){
								callback(err , false);
							} else{
								callback(null , true);
							}
						}
				);
			}] , function(err , results){
				if(err){
					//에러처리
				} else {
					var inform = {
							gid :gid,
							member_number : 1,
							name : data,
							updated : 0,
							memberName : '',
							file_location : null
					}
					socket.emit('addGroupResult' , inform);
				}
			});
		}
	});
	
	socket.on('deleteGroup' , function(data1 , data2){
		async.waterfall([function(callback) {
			belong_grDAO.deleteBelong_gr(socket.handshake.session.uid , data1[0] , callback);
		} , function(args1 , callback) {
			groupDAO.findGrInfrom(data1[0] , callback);
		} , function(args1 , callback) {
			if (args1.length==0) {
				console.log("델레트할 그룹이 없다는데 없으면 안되는데...");
			} else if (args1[0].member_number==1) {
				groupDAO.deleteGroup(data1[0] , callback);
			} else {
				groupDAO.subtractGroupNum(data1[0] , callback);
			}
		} , function(args1 , callback) {
			belong_grDAO.subtractViewOrder(socket.handshake.session.uid ,data1 ,data2 , callback);
		}] , function(err , results) {
			if(err){
				console.log("그룹삭제 실패");
			} else{
				console.log("그룹삭제 성공");
			}
		});
	});
	
	socket.on('changeGroupName' , function(data1 , data2) {
		async.series([function(callback){
			belong_grDAO.changeGrName(socket.handshake.session.uid , data2 , data1 , callback);//이름바꾸는것부터 하면됨
		} , function(callback){
			belong_grDAO.findViewOrder(socket.handshake.session.uid , data2 , callback);
		}], function(err , results){
			if(err){
				console.log("그룹 이름 변경에 오류가 생겨부렀어");
			} else{
				var inform = results[1][0];
				socket.emit('changeGroup' , inform );
			}
		});
	});
	
	socket.on('getCode' , function(data){
		async.series([function(callback){
			codeDAO.findCode(data , callback);
		}] , function (err, results) {
			if(err || (results.length!=1)){
				socket.emit( 'codeResult' , false );
			} else {
				socket.emit( 'codeResult' , results[0][0].code );
			}
		});
	});
	
	socket.on('addCode' , function(data1 , data2){
		var grName = data2;
		var gid;
		async.waterfall([function(callback){
			codeDAO.findGid(data1 , callback); //코드해당하는 gid 찾기
		} , function(args1 , callback){
			if(args1.length == 0){
			 callback('noCode' , null);	
			}else{
			 gid = args1[0].gid;
			 belong_grDAO.findBelongByUidGid(socket.handshake.session.uid  ,gid , callback );
			} 			//코드 해당하는  gid없으면 err 있으면  belong_gr에 이미 존재하는지 안하는지 확인
		} , function(args1 , callback){
			if(args1.length==0){
				belong_grDAO.addViewOrder(socket.handshake.session.uid , callback);
			} else{
			    callback('alreadyExist' , null);
			} 			//존재 안하면 자기가 속한 belong_gr view order 1개씩 증가  이미 존재한다는 err발생s
		} , function(args1 , callback){
			belong_grDAO.addBelong_gr(socket.handshake.session.uid , gid , grName , callback);
		}] , function(err , result){
			var resultInform;
			if(err){ 			//result true로 나오면 됐다는 표시 아니면 err에 따른 에러 안드에 보내기
				if(err == 'noCode'){
					resultInform = 'noCode'; 
				} else if(err == 'alreadyExist'){
					resultInform = 'alreadyExist';
				}else {
					resultInform = 'err';
				}
			} else{
				resultInform = 'true';
			}
			socket.emit('addCodeResult' , resultInform);
		});
	});
});



module.exports = router;