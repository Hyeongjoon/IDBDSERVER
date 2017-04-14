var express = require('express');
var router = express.Router();
var url = require('url');
var decryptHelper  = require('../helper/DecryptHelper');
var async = require('async');
var userDAO = require('../model/UserDAO');

var querystring = require('querystring');


router.get('/' , function(req, res, next){
	var parseObj = url.parse(req.url);
	console.log(parseObj.query);
	var qObj = querystring.parse(parseObj.query);
	console.log(qObj);
	async.waterfall([function(callback){
		userDAO.findFbUser(qObj.FbId , callback);
	}, function(args1 , callback){
		if(args1.length!=1){
			callback('err' , null);
		} else if(args1[0].email != null){
			callback('already' , null);
		} else{
			userDAO.updateEmail(args1[0].uid , qObj.email , callback);
		}
	}] , function(err , results){
		if(err =='already'){
			res.render('verifyAlready' , {});
		} else if(err){
			res.redirect('/invalid');
		} else{
			res.render('emailVerifSuccess' , {});
		}
	});
});

module.exports = router;