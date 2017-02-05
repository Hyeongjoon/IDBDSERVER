var express = require('express');
var router = express.Router();
var async = require('async');
var admin = require('firebase-admin');
var belong_grDAO = require('../model/Belong_grDAO');
var grDAO = require('../model/GroupDAO');

router.post('/' , function(req , res , next){
	var idToken = req.query.token;
	console.log(req.body.gid);
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		async.parallel([function(callback){
			belong_grDAO.findNameIngr(req.body.gid , callback);
		} , function(callback){
			grDAO.findMasterInGr(req.body.gid  , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false' , content:'server'})
			} else{
				res.json({result : 'success' , user_list : results[0] , gr_master : results[1][0].master , gr_code : results[1][0].gr_code})
			}
		});
	}).catch(function(error){
		res.json({result : 'false' , content:'server'});
	});
});

module.exports = router;