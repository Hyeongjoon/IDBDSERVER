var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var async = require('async');
var userDAO = require('../model/UserDAO');

router.get('/' , function(req, res, next){
	if(req.session.passport.user.email==undefined){
		res.render("email_verify" , {token : req.session.passport.user.token});
	} else{
		res.render("invalid" , {});
	}
});

router.post('/' , function(req , res , next){
	admin.auth().verifyIdToken(req.body.token).then(function(decodedToken) {
		// 여기서부터 userDAO에서 페이스북 아이디 불러와서 인코딩해서 메일보내는거 할것
		console.log(decodedToken);
	});
});

module.exports = router;