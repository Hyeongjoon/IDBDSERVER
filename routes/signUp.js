var express = require('express');
var router = express.Router();
var userDAO = require('../model/UserDAO');
var async = require('async');
var mailHelper = require('../helper/EmailMake');
var encryptHelper = require('../helper/EncryptHelper');

router.post('/' , function(req , res, next){
	 if(req.body.pwd == req.body.pwd_con){
		async.parallel([function(callback){
			userDAO.findUserByEmail(req.body.email , callback);
		}] , function(err , results){
			if(results[0].length ==0){
				var tmpPwd = encryptHelper.encryption(req.body.pwd);
				req.session.inform = {
						email : req.body.email,
						name : req.body.name,
						pwd : tmpPwd
				}
				mailHelper.makeEmail(req.body.email , req.sessionID);
				res.json({result : 'success' , content : '인증메일이 발송되었습니다.'});
			} else{
				res.json({result : 'fail' , content : '이미 가입된 Email입니다.'});
			}
		});
	 } else{
		 res.json({result : 'fail' , content : '내부 서버 오류 입니다.'});
	 }
});


module.exports = router;


