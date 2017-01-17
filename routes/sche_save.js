var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var async = require('async');
var scheDAO = require('../model/ScheduleDAO');

router.post('/' , function(req, res, next){
	var temp = req.body;
	var idToken = req.body.token;
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		  var uid = decodedToken.uid;
		  async.parallel([function(callback){
			  scheDAO.regScher(temp,uid , callback);
		  }] , function(err ,results){
			  if(err || results[0]!==true){ 
				  res.json({result :'false'});
			  } else{
				  res.json({result : 'true'});
			  }
		  });
		}).catch(function(error) {
			//토큰 로드 실패했을때
			res.json({result : 'false'});
			
		});
});

module.exports = router;