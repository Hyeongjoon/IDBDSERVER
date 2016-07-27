var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';

router.get('/' , function(req ,res ,next){
	var s3 = new AWS.S3();
	var params = {Bucket : 'sendwitchtracer' , Key : 'profile/temp.png'};
	var file = require('fs').createWriteStream('./temp/temp1.png');
	s3.getObject(params).createReadStream().pipe(file);
	
});



module.exports = router;