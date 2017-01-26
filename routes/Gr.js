var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');
var groupDAO = require('../model/GroupDAO');
var belongDAO = require('../model/Belong_grDAO');
var userDAO = require('../model/UserDAO');
var fileDAO = require('../model/FileDAO');
var encryptHelper = require('../helper/EncryptHelper');
var colorMake = require('../helper/MakeColorNum');
var config = require('../helper/config');

var async = require('async');

var https = require('https');

router.get('/' , function(req, res, next){
	var idToken = req.query.token;
	var uid;
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		uid = decodedToken.uid;
		async.parallel([function(callback){
			userDAO.findUserInfo(uid , callback);
		}, function(callback){
			belongDAO.getGrInfo(uid, callback);
		}] , function(err , results){
			if(err){
				res.json({result:'false'});
			} else{
				res.json({result:'success' , userInfo : results[0] , grInfo : results[1]});
			}
		});
	});
});

router.post('/add' , function(req , res, next){	
	var idToken = req.body.token;
	var uid;
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
			uid = decodedToken.uid;
			var resultId;
			var color = colorMake.makeColor();
		  async.waterfall([function(callback){
			  var check = true;
				async.whilst(
						function(){return check==true},
						function(subCallback){
							async.parallel([function(sub2Callback){
								var key = encryptHelper.codeGen();
								groupDAO.addGroupReturnID(uid , key , sub2Callback);
							}] , function(err ,results){
								if((err+"").indexOf('ER_DUP_ENTRY')!=-1){  //에러메세지에서 저거 있으면 중복처리된거고 아니면 아닌거...이래도 되는지 나중에 확인
									console.log('코드가 중복');
								} else if(err){
									//이거 에러처리해야됨 코드 삽입 안됐을때(중복빼고) 어캐할껀지....슈벌탱
									check=false;
								} else{
									resultId = results[0].insertId
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
								callback(null , resultId);
							}
						}
				);
		  } , function(args1 , callback){
			  belongDAO.addBelong_gr(uid, args1, req.body.title, 0, color ,callback);
		  }] , function(err ,results){
			  if(err){
				  res.json({result : 'false'});
			  }else{
					var request = https.request(config.addNotificationConfig, function(response) {
						  response.setEncoding('utf8');
						  response.on('data', function (body) {
							key = body.substring(21 , body.length-2);
							async.parallel([function(callback){
								groupDAO.updateNotikey(resultId , key , callback);
							}] , function(err , results){
								if(err){
									res.json({result : 'false'});
								} else{
									res.json({result : 'success' , gid : resultId , name : req.body.title, color:color ,member_num : 1 ,new_file_num : 0 , new_talk_num : 0, notify_key : key});
								}
							});
						  });
						});
						request.on('error', function(e) {
							console.log('problem with request: ' + e.message);
							res.json({result : 'false'});
						});
						request.write(
								'{'+
								'"operation": "create",'+
								'"notification_key_name":'+ '"'+resultId+'",'+
								'"registration_ids"'+'["'+req.body.reg_id+'"]'+
							   '}'
							);
						request.end();
			  }
		  });
		}).catch(function(error) {
			//토큰 로드 실패했을때
			res.json({result : 'false'});
		});
});

router.post('/addByCode/:token', function(req , res, next){
	var idToken = req.params.token;
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		var uid = decodedToken.uid;
		var gid;
		var new_file_num;
		var member_num;      //코드가 맞는지 확인하는 과정에서 gid 얻어오는데 같이 그룹 멤버넘버까지 따오는데....아직 우리껀 추가안됐으므로 +1해서 넘겨야함
		var notify_key
		var color = colorMake.makeColor()
		async.waterfall([function(callback){
			groupDAO.findGrByCode(req.body.code , callback);
		} , function(args1 , callback){
			if(args1.length==1){
				gid = args1[0].gid;
				member_num = args1[0].member_num;
				notify_key = args1[0].notify_key;
				fileDAO.findGrFileNum(gid , callback);
			} else{
				callback('wrong_code' , null);
			}
		} , function(args1 , callback){
			new_file_num = args1[0].new_file_num;
			if(new_file_num>255){
				new_file_num = 255;
			}
			var request = https.request(config.addNotificationConfig, function(response) {
					  response.setEncoding('utf8');
					  response.on('data', function (body) {
							callback(null, true);
					  });
					});
					request.on('error', function(e) {
						console.log('problem with request: ' + e.message);
						callback('fail_add_noti' , null);
					});
					request.write(
							'{'+
							'"operation": "add",'+
							'"notification_key_name":'+ '"'+gid+'",'+
							'"notification_key":'+ '"'+notify_key+'",'+
							'"registration_ids"'+'["'+req.body.reg_id+'"]'+
						   '}'
						);
					request.end();
		} , function(args1 , callback){
			belongDAO.addBelong_gr(uid, gid, req.body.name, new_file_num,color ,callback);
		}] , function(err ,results){
			if(err=='wrong_code'){
				res.json({result:'false' , content:'code'});
			} else if(err =='fail_add_noti'){
				res.json({result : 'false' , content:'server'});
			}else if(err){
				res.json({result:'false' , content:'duplication'});
			} else {
				res.json({result:'true' , gid : gid , name : req.body.name, color:color , new_file_num : new_file_num , new_talk_num : 0 , member_num : member_num + 1 , notify_key : notify_key});
			}
		});
	}).catch(function(error){
		//토큰 로드 실패했을때
		res.json({result : 'false' , content:'server'});
	});
});

router.post('/changeGrName/:token' , function(req, res ,next){
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.parallel([function(callback){
			belongDAO.changeGrName(decodedToken.uid , req.body.gid , req.body.name , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false'});
			} else{
				res.json({result : 'success'});
			}
		});
	}).catch(function(error) {
		//토큰 로드 실패했을때
		res.json({result : 'false'});
	});  
});

router.post('/delete/:token' , function(req , res , next){
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.series([function(callback){
			var request = https.request(config.addNotificationConfig, function(response) {
				  response.setEncoding('utf8');
				  response.on('data', function (body) {
						console.log(body);
						callback(null, true);
				  });
				});
				request.on('error', function(e) {
					console.log('problem with request: ' + e.message);
					callback('fail' , null);
				});
				request.write(
						'{'+
						'"operation": "remove",'+
						'"notification_key_name":'+ '"'+req.body.gid+'",'+
						'"notification_key":'+ '"'+req.body.notify_key+'",'+
						'"registration_ids"'+'["'+req.body.reg_id+'"]'+
					   '}'
					);
				request.end();
		} , function(callback){
			belongDAO.deleteBelong_gr(decodedToken.uid , req.body.gid ,callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false'});
			} else{
				res.json({result : 'success'});
			}
		});
	}).catch(function(error) {
		console.log(error);
		//토큰 로드 실패했을때
		res.json({result : 'false'});
	});
});

router.post('/change_color/:token' , function(req , res, next){
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.parallel([function(callback){
			belongDAO.changeColor(decodedToken.uid , req.body.gid , req.body.color , callback);
		}] , function(err ,results){
			if(err){
				res.json({result : 'false'});
			} else{
				res.json({result : 'success'});
			}
		});
	}).catch(function(error) {
		//토큰 로드 실패했을때
		res.json({result : 'false'});
	});
});

module.exports = router;