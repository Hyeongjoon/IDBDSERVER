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
		}, function(callback){
			if(req.isAuthenticated()){
				if(req.session.passport.user.email == null){
					userDAO.findUserInfo(req.session.passport.user.uid , callback);
				} else{
					callback(null , null);
				}
			} else{
				callback(null , null);
			}
		}] , function(err , results){
			if(err){
				res.send('/invaild');
			} else{
				if(req.isAuthenticated()){
					if(req.session.passport.user.email==null){
						if(results[1][0].email==null){
							res.redirect('/emailverify');
						} else{
							req.session.passport.user.email =results[1][0].email;
							res.render('mining' , { login:true ,item :  results[0], name : req.session.passport.user.name, token : req.session.passport.user.token});
						};
					} else{
						res.render('mining' , { login:true ,item :  results[0], name : req.session.passport.user.name, token : req.session.passport.user.token});
					}
				} else{
					res.render('mining' , { login:false ,item :  results[0]  });
				}
			}
		});
});

module.exports = router;