var express = require('express');
var router = express.Router();
var async = require('async');
var admin = require('firebase-admin');
var prizeDAO = require('../model/PrizeDAO');
var mailHelper = require('../helper/EmailMake');
var userDAO = require('../model/UserDAO');


router.post('/:token' , function(req , res , next){
	var idToken = req.params.token;
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		var uid = decodedToken.uid;
		var Imageurl;
		async.waterfall([function(callback){
			prizeDAO.confirmCode(req.body.code , callback);
		} , function(args1 , callback){
			if(args1.length==0){
				callback('non' , null);
			} else if(args1[0].uid==null){
				Imageurl = args1[0].imageURL; 
				prizeDAO.selectedPrize(req.body.code, uid , callback);
				//여기서 메일보내기
			} else{
				callback('selected' , null);
			}
		}, function(args1 , callback){
			userDAO.findEmailByUid(uid , callback);
		}, function(args1 , callback){
			mailHelper.makeWonEmail(args1[0].email, Imageurl , callback);
		}] ,function(err ,results){
			if(err=='non'){
				res.json({result : 'false' , content:'non'});
			} else if(err == 'selected'){
				res.json({result : 'false' , content:'selected'});
			} else if(err){
				res.json({result : 'false' , content:'server'});
			}else{
				res.json({result : 'true'});
			}
		});	
	}).catch(function(error){
		//토큰 로드 실패했을때
		res.json({result : 'false' , content:'server'});
	});
});

module.exports = router;