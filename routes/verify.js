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
			console.log(tmp);
			var tmpEmail = tmp.slice(8);
			var email = DecryptHelper.decryptEmail(tmpEmail);
			console.log(email);
			UserDAO.findUserByEmail(email , callback);
		}, function(args1 , callback){
			console.log(args1);
			
		}], function(err , results){
			
		});
	}
});


module.exports = router;