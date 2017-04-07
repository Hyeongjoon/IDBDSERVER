var express = require('express');
var router = express.Router();
var async = require('async');
var userDAO = require('../model/UserDAO');
var prizeDAO = require('../model/PrizeDAO');

var admin = require('firebase-admin');

/* GET home page. */
router.get('/', function(req, res, next){
	async.parallel([function(callback){
		userDAO.findEmailByUid(req.session.passport.user.uid , callback);
	}] , function(err , results){
		if(err){
			res.redirect('/invaild');
		} else if(results[0][0].email==null){
			res.redirect("/emailverify");
		} else{
			async.parallel([function(callback){
				prizeDAO.getNoWonInform(callback);
			}] , function(err , results){
				if(err){
					res.send('/invaild');
				} else{
					res.render('mining' , {token : req.session.passport.user.token , name : req.session.passport.user.name , item :  results[0]});
				}
			});
			
		}
	});
});

module.exports = router;