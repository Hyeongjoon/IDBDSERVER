var express = require('express');
var router = express.Router();
var async = require('async');
var DecryptHelper = require('../helper/DecryptHelper');
var UserDAO = require('../model/UserDAO');

router.get('/' , function(req , res , next){
	if(req.url.length <= 8){
		res.render('failReq', {});
	} else{
		async.waterfall([function(callback){ 
			var tmp = req.url;
			var tmpEmail = tmp.slice(8);
			var email = DecryptHelper.decryptEmail(tmpEmail);
			UserDAO.findUserByEmail(email , callback);
		}, function(args1 , callback){
			if(args1.length!==1){
				callback(true , false);
			} else{
				UserDAO.verifyEmail(args1[0].email , callback);
			}
		}], function(err , results){
			if(err){
				res.render('veryfyAlready' , {});
			} else{
				console.log(results);
			}
		});
	}
});


module.exports = router;