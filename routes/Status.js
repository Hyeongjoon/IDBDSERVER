var express = require('express');
var router = express.Router();
var async = require('async');
var userDAO = require('../model/UserDAO');

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



module.exports = router;