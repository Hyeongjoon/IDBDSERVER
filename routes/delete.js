var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var async = require('async');
var userDAO = require('../model/UserDAO');

router.post('/:token' , function(req , res, next){
	var idToken = req.params.token+"";
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
	  var uid = decodedToken.uid;
	  async.parallel([function(callback){
		  userDAO.deleteUser(uid , callback);
	  }] , function(err , results){
		  if(err){
			  res.json({result : false , content : "server"});
		  } else{
			  res.json({result : true});
		  }
	  });
	}).catch(function(error) {
		res.json({result : false , content : "server"});
	  // Handle error
	});
});

module.exports = router;