var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');
var async = require('async');
var userDAO = require('../model/UserDAO');

var encryptHelper = require('../helper/EncryptHelper');

router.get('/modify/:token' , function(req, res, next){
	var idToken = req.params.token+""
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		res.render('modify_pwd' , {token : idToken});
	}).catch(function(error){
		res.redirect('/invalid');
	});
});

router.post('/:token' , function(req , res, next){
	console.log("여긴오냐");
	var idToken = req.params.token+""
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		if(req.body.pwd != req.body.pwd_con){
			res.json({reuslt : false});
		} else{
			async.parallel([function(callback){
				userDAO.changePwd(decodedToken.uid, encryptHelper.encryption(req.body.pwd) ,callback);
			}] , function(err , results){
				if(err){
					res.json({result : false});
				} else{
					res.json({result : true});
				}
			});
		}
	}).catch(function(error){
		res.json({result : false});
	});
});

router.get('/suc' , function(req , res, next){
	console.log("여긴오냐");
	res.render('modify_pwd_suc' , {});
});

module.exports = router;