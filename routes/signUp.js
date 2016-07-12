var express = require('express');
var router = express.Router();
var userDAO = require('../model/UserDAO.js');
var async = require('async');
var encryptHelper = require('../helper/EncryptHelper.js');



router.get('/' , function(req , res , next){
	res.render('signUp' , {});
});

router.post('/' , function(req , res, next){
	async.series([function(callback){
        req.body.password = encryptHelper.encryption(req.body.password).toString();
        var insert = {
        		'email' : req.body.email,
        		'password' : req.body.password,
        		'name' : req.body.name
        }
		userDAO.register(insert , callback);
	}],function(err , result){
		if(result[0]==true){
			console.log("회원가입 성공");
		} else{
			console.log("회원가입 실패")
		}
	});
});





module.exports = router;