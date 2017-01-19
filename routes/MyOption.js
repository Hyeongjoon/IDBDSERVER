var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var async = require('async');
var scheDAO = require('../model/ScheduleDAO');

router.get('/getSche/:token' , function(req, res, next){
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.parallel([function(callback){
			scheDAO.findSche(decodedToken.uid , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false'});
			} else{
				var result = results[0][0];
				if(result==undefined){
					result = "null";
				}
				res.json({result: 'success' , content : result});
			}
		});
	}).catch(function(error){
		//토큰 로드 실패했을때
		res.json({result : 'false'});
	});
});

router.post('/sche_save/:token' , function(req, res, next){
	console.log(req.body)
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.waterfall([function(callback){
			scheDAO.findExistByUid(decodedToken.uid , callback);
		} , function(args1 , callback){
			if(args1.length==0){
				scheDAO.regSche(req.body, decodedToken.uid, callback);
			} else {
				scheDAO.correctSche(req.body, decodedToken.uid, callback);
			}
		}] , function(err ,results){
			if(err){
				res.json({result : 'false'});
			} else{
				res.json({result : 'success'});
			}
		});
	}).catch(function(error){
		//토큰 로드 실패했을때
		res.json({result : 'false'});
	});;
});


module.exports = router;