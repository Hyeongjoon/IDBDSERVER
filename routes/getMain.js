var express = require('express');
var router = express.Router();
var async = require('async');
var admin = require('firebase-admin');
var belong_grDAO = require('../model/Belong_grDAO');
var grDAO = require('../model/GroupDAO');
var config = require('../helper/config');

var AWS = require('aws-sdk');

AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();

router.post('/' , function(req , res , next){
	
	var params = config.awsS3GetConfig;
	params.Key = "mainImage/Main.png";
	s3.getSignedUrl('getObject', params, function (err, url) {
		if(err){
			console.log(err)
		} else{
			res.json({url : url});
		}
	});
});

module.exports = router;