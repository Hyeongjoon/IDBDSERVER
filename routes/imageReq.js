var express = require('express');
var config =require('../helper/config.js');
var router = express.Router();


var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';

router.get('/' , function(req ,res ,next){
	var s3 = new AWS.S3();
	var params = config.awsS3GetConfig;
	var file = require('fs').createWriteStream('./temp/temp444.png');
	s3.getObject(params , function(err , data){
		console.log(err);
		console.log(data);
	});
});



module.exports = router;