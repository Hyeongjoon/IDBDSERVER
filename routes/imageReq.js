var express = require('express');
var config =require('../helper/config.js');
var router = express.Router();


var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';

router.get('/' , function(req ,res ,next){
	var s3 = new AWS.S3();
	var params = config.awsS3GetConfig;
	s3.getSignedUrl('getObject', params, function (err, url) {
		console.log(err);
		  console.log("The URL is", url);
	});
});



module.exports = router;