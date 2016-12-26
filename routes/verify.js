var express = require('express');
var router = express.Router();
var async = require('async');
var DecryptHelper = require('../helper/DecryptHelper');
var UserDAO = require('../model/UserDAO');


router.get('/' , function(req , res , next){
	async.parallel([function(callback){
		UserDAO.register(req.session.inform , callback);
	}] , function(err ,results){
		if(results[0] == true){
			res.send('회원가입 완료'); //완료 페이지 html 만들것
		} else{
			res.send('회원가입 실패');
		}
	});
});


module.exports = router;