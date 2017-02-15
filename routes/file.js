var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');
var async = require('async');
var fileDAO  = require('../model/FileDAO');
var belongDAO = require('../model/Belong_grDAO');
var config = require('../helper/config');

var AWS = require('aws-sdk');


AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();

router.post('/upload/:token' , function(req, res, next){ 
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.parallel([function(callback){
			var input = {
					uid : decodedToken.uid, 
					gid : req.body.gid,
					location : req.body.location
			};
			if(req.body.image=='true'){
				input.image = true;
			} else{
				input.image = false;
			}
			fileDAO.insertFile(input , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false'});
			} else{
				res.json({result: 'true' , fid: results[0].insertId});
			}
		});
	}).catch(function(error) {
		//토큰 로드 실패했을때
		res.json({result : 'false'});
	});
});


router.get('/:token/:gid' , function(req , res , next){
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.parallel([function(callback){
			fileDAO.findFileByGid(req.params.gid , callback);
		} , function(callback){
			belongDAO.resetFileNum(decodedToken.uid , req.params.gid , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false'});
			} else{
				var params = config.awsS3GetConfig;
				
				for(var i = 0 ; i <results[0].length ; i++){
					params.Key = results[0][i].location;				
					s3.getSignedUrl('getObject', params, function (err, url) {
						if(err){
							console.log(err)
						}
						results[0][i].location = url;
					}); 
					}
				var finalArr = [];
				var temp = [];
				
				for(var i = 0 ; i < results[0].length-1 ; i++){
					
					if(i == 0){
						temp.push(results[0][0]);
					}
					
					if(results[0][i].d == results[0][i+1].d){
						temp.push(results[0][i+1]);
					} else{
						finalArr.push(temp);
						temp = [];
						temp.push(results[0][i+1]);
					}
				}
				
				if(temp.length != 0){
					finalArr.push(temp);
				}                        //여기코드 겁나 맘에안든다 나중에 다 고치자
				res.json({result:'true' , file_list : finalArr});
			}
		});
	}).catch(function(error) {
		res.json({result : 'false'});
	})
});
module.exports = router;