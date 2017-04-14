var express = require('express');
var router = express.Router();
var async = require('async');
var userDAO = require('../model/UserDAO');

var emailHelper = require('../helper/EmailMake');

router.post('/' , function(req, res, next){
	async.parallel([function(callback){
		userDAO.findFbIdByUid(req.body.uid , callback);
	} , function(callback){
		userDAO.findEmailByUid(req.body.uid , callback);
	} ,function(callback){
		userDAO.findUserByEmail(req.body.email , callback);
	}] , function(err , results){
		console.log(results);
		if(results[0].length!=1 || results[1].length!=1 || results[1][0].email!=null){
			res.json({result:false , content : "내부 서버 오류입니다."});
		} else if(err){
			res.json({result:false, content : "내부 서버 오류입니다."});
		} else if(results[2].length!=0){
			res.json({result:false, content : "이미 존재하는 이메일입니다. 다른 이메일을 이용해 주세요"});
		} else{
			emailHelper.makeFbVerifyEmail(req.body.email , results[0][0].facebook_id);
			res.json({
				result : true
			});
		}
	});
});

module.exports = router;