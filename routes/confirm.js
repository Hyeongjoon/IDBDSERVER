var express = require('express');
var router = express.Router();
var async = require('async');
var admin = require('firebase-admin');
var prizeDAO = require('../model/PrizeDAO');
var mailHelper = require('../helper/EmailMake');
var userDAO = require('../model/UserDAO');
var won_logDAO = require('../model/Won_logDAO');
var conuntDAO = require('../model/CountDAO');
var decryptHelper = require('../helper/DecryptHelper');


/*router.post('/:token' , function(req , res , next){
	var idToken = req.params.token+"";
	console.log(idToken);
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		var uid = decodedToken.uid;
		var Imageurl;
		var pid;
		var pName;
		async.waterfall([function(callback){
			prizeDAO.confirmCode(req.body.code , callback);
		} , function(args1 , callback){
			if(args1.length==0){
				callback('non' , null);
			} else if(args1[0].uid==null){
				Imageurl = args1[0].imageURL;
				pid = args1[0].pid;
				pName = args1[0].pname;
				prizeDAO.selectedPrize(req.body.code, uid , callback);
			} else{
				callback('selected' , null);
			}
		}, function(args1 , callback){
			userDAO.findEmailByUid(uid , callback);
		}, function(args1 , callback){
			mailHelper.makeWonEmail(args1[0].email, Imageurl , pid, pName ,callback);
		}] ,function(err ,results){
			if(err=='non'){
				async.parallel([function(callback){
					prizeDAO.getNotWon(callback)
				}] , function(err , results){
					console.log(results[0]);
					res.json({result : 'false' , content:'non' , list : results[0]});
				});
			} else if(err == 'selected'){
				async.parallel([function(callback){
					prizeDAO.getNotWon(callback)
				}] , function(err , results){
					res.json({result : 'false' , content:'selected' , list : results[0]});
				});
			} else if(err){
				res.json({result : 'false' , content:'server'});
			}else{
				res.json({result : 'true'});
			}
		});	
	}).catch(function(error){
		//토큰 로드 실패했을때
		console.log(error);
		res.json({result : 'false' , content:'server'});
	});
});*/

router.post('/:token' , function(req, res, next){
	var idToken = req.params.token+"";
	var uid;
	var Imageurl;
	var pid;
	var pName;
	var email;
	async.waterfall([function(callback){
		conuntDAO.addCount(callback);
	},function(args1, callback){
		prizeDAO.confirmCode(req.body.code , callback);
		} , function(args1 , callback){
			if(args1.length==0){
				callback('non' , null);
			}  else if(args1[0].uid==null){
				if(idToken=="asd"){
					callback('notLogin' , args1[0].pname);
				} else{
					admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
						uid = decodedToken.uid;
						Imageurl = args1[0].imageURL;
						pid = args1[0].pid;
						pName = args1[0].pname;
						prizeDAO.selectedPrize(req.body.code, uid , callback);
						}).catch(function(error){
							console.log(error);
							res.json({result : 'false' , content:'server'});
						});
				}
			} else{
				callback('selected' , null);
			}
			},function(args1 , callback){
				userDAO.findEmailByUid(uid , callback);
			}], function(err , results){
				if(err=='non'){
					async.parallel([function(callback){
						prizeDAO.getNotWon(callback)
					}] , function(err , subResults){
						res.json({result : 'false' , content:'non' , list : subResults[0]});
					});
				} else if(err == 'selected'){
					async.parallel([function(callback){
						prizeDAO.getNotWon(callback)
					}] , function(err , subResults){
						res.json({result : 'false' , content:'selected' , list : subResults[0]});
					});
				} else if(err == 'notLogin'){
						console.log(results);
						res.json({result : 'false' , content:'won' , name : results});
				} else if(err){
					res.json({result : 'false' , content:'server'});
				} else {
					mailHelper.makeWonEmail(results[0].email, Imageurl , pid, pName);
					res.json({result : 'true'});
				}
		});
});
/*
router.post('/' , function(req , res, next){
	var pName;
	var uid;
	async.waterfall([function(callback){
		prizeDAO.verifyPrize(decryptHelper.decryptEmail(req.body.encryptEmail), req.body.pid , callback);
	} , function(args1 , callback){
		pName = args1[0].pname;
		uid = args1[0].uid; 
		won_logDAO.addLog(args1[0].uid , args1[0].pid , args1[0].pname , callback);
	}] , function(err ,results){
		if(err){
			res.json(false)
		} else{
			mailHelper.makeUserPhoneEmail(req.body.phone_num , pName , uid);
			res.json(true);
		}
	});
});*/

module.exports = router;