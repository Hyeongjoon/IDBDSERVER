var express = require('express');
var router = express.Router();
var async = require('async');
var userDAO = require('../model/UserDAO');
var prizeDAO = require('../model/PrizeDAO');

var admin = require('firebase-admin');

/* GET home page. */
router.get('/', function(req, res, next){
		async.parallel([function(callback){
			prizeDAO.getNoWonInform(callback);
		}] , function(err , results){
			if(err){
				res.send('/invaild');
			} else{
				if(req.isAuthenticated()){
					res.render('mining' , { login:true ,item :  results[0], name : req.session.passport.user.name, token : req.session.passport.user.token});
				} else{
					res.render('mining' , { login:false ,item :  results[0]  });
				}
			}
		});
});

module.exports = router;