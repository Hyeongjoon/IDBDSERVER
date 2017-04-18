var express = require('express');
var router = express.Router();
var async = require('async');
var userDAO = require('../model/UserDAO');
var decrptHelper = require('../helper/DecryptHelper');
var mailHelper = require('../helper/EmailMake');

var admin = require('firebase-admin');

router.get('/' , function(req , res, next){
	async.parallel([function(callback){
		userDAO.findFbIdByUid(req.session.passport.user.uid , callback);
	}],function(err , results){
		var facebook = true;
		if(err){
			res.redirect('invalid');
		} else if(results[0][0].facebook_id==null){
			var facebook = false;
		}
		res.render('status' , {name : req.session.passport.user.name, email : req.session.passport.user.email , token:req.session.passport.user.token , facebook : facebook});
	});
	
});

router.post('/change_pwd/:token' , function(req, res, next){
	var idToken = req.params.token+""
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		async.parallel([function(callback){
			userDAO.findPwd(decodedToken.uid , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false' , content:'server'});
			} else{
				if(req.body.pwd===decrptHelper.decryption(results[0][0].pwd)){
					res.json({result : 'true'});
					mailHelper.makeModifyEmail(results[0][0].email , idToken);
				} else{
					res.json({result : 'false' , content:'differ'});
				};
			}
		});
	}).catch(function(error){
		console.log(error);
		res.json({result : 'false' , content:'server'});
	});
});




module.exports = router;