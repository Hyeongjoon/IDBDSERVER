var express = require('express');
var router = express.Router();
var async = require('async');
var prizeDAO = require('../model/PrizeDAO');
var admin = require('firebase-admin');

router.get('/:token' , function(req, res, next){
	var idToken = req.params.token;
		async.parallel([function(callback){
			prizeDAO.getNotWon(callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false' , content:'server'});
			} else{
				console.log(results[0]);
				res.json({result:'true' , content : results[0]});
			}
		});
});

module.exports = router;