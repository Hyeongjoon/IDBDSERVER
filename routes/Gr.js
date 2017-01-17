var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');
var groupDAO = require('../model/GroupDAO');
var belongDAO = require('../model/Belong_grDAO');
var userDAO = require('../model/UserDAO');
var fileDAO = require('../model/FileDAO');
var encryptHelper = require('../helper/EncryptHelper');

var async = require('async');

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
			  belongDAO.addBelong_gr(uid, args1, req.body.title, 0 ,callback);
		  }] , function(err ,results){
			  if(err){
				  res.json({result : 'false'});
			  }else{
				  res.json({result : 'success' , gid : resultId , name : req.body.title, member_num : 1 ,new_file_num : 0 , new_talk_num : 0});
			  }
		  });
		}).catch(function(error) {
			//토큰 로드 실패했을때
			res.json({result : 'false'});
		});
});

router.post('/addByCode/:token', function(req , res, next){
	var idToken = req.params.token;
	console.log(req.body.name);
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		var uid = decodedToken.uid;
		var gid;
		var new_file_num;
		var member_num;      //코드가 맞는지 확인하는 과정에서 gid 얻어오는데 같이 그룹 멤버넘버까지 따오는데....아직 우리껀 추가안됐으므로 +1해서 넘겨야함
		async.waterfall([function(callback){
			groupDAO.findGrByCode(req.body.code , callback);
		} , function(args1 , callback){
			if(args1.length==1){
				gid = args1[0].gid;
				member_num = args1[0].member_num;
				fileDAO.findGrFileNum(gid , callback);
			} else{
				callback('wrong_code' , null);
			}
		} , function(args1 , callback){
			new_file_num = args1[0].new_file_num;
			 belongDAO.addBelong_gr(uid, gid, req.body.name, new_file_num ,callback);
		}] , function(err ,results){
			if(err=='wrong_code'){
				res.json({result:'false' , content:'code'});
			} else if(err){
				res.json({result:'false' , content:'duplication'});
			} else {
				res.json({result:'true' , gid : gid , name : req.body.name , new_file_num : new_file_num , new_talk_num : 0 , member_num : member_num + 1});
			}
		});
	}).catch(function(error) {
		//토큰 로드 실패했을때
		res.json({result : 'false' , content:'server'});
	});
});

module.exports = router;