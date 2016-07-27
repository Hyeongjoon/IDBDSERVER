var express = require('express');
var AWS = require('aws-sdk');
var router = express.Router();

AWS.config.region = 'ap-northeast-2';

router.get('/' , function(req ,res ,next){
	console.log("여긴오냐?");
	var s3 = new AWS.s3();
	var params = {Bucket : 'sendwitchtracer' , Key : 'temp.png'};
	var file = require('fs').createWriteStream('/logo.png');
	s3.getObject(params, function(err , data){
		console.log(err);
		console.log(data);
	});	
});



module.exports = router;