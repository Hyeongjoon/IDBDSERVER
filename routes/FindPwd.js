var express = require('express');
var router = express.Router();

var userDAO = require('../model/UserDAO');
var async = require('async');
var encryptHelper = require('../helper/EncryptHelper');
var makeEmail = require('../helper/EmailMake');

router.post('/' , function(req , res , next){
	async.parallel([function(callback){
		userDAO.findUserByEmail(req.body.email , callback);
	}] , function(err , results){
		if(err){
			res.json({result : "fail" , content : "내부 서버오류입니다. 잠시후에 이용해 주세요"});
		} else if(results[0].length==0){
			res.json({result : "fail" , content : "해당하는 Email은 존재하지 않습니다."});
		} else{
			req.session.code = encryptHelper.findPwdCode();
			console.log(req.sessionID);
			makeEmail.makeFindPwdEmail(req.body.email , req.session.code);
			res.json({result : "success" , email : req.body.email , sessionID : req.sessionId});
		}
	});
});

router.post('/modify' , function(req , res, next){
	console.log(req.session);
	console.log(req.sessionID);
	console.log(req.body);
	console.log(req);
});

module.exports = router;