var express = require('express');
var router = express.Router();

var https = require('https');

var config = require('../helper/config');
var admin = require('firebase-admin');
var grDAO = require('../model/GroupDAO');
var belongDAO = require('../model/Belong_grDAO');
var async =require('async');

router.post('/' , function(request , response, next){
	var idToken = request.query.token; // 경로가 /<<<<<<이거 하나일때는 :token 붙여서 해도 못들어옴 왜그런진 글쎄...............시발것 !!!!!!!!아니.......내가 요청주소를 잘못보낸거임........나중에 고칠것 
	admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
		async.parallel([function(callback){
			grDAO.findNotikey(request.body.gid , callback);
		} , function(callback){
			grDAO.updateTime(request.body.gid , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false' , content:'server'});
			} else{
				var req = https.request(config.sendMessageConfig , function(res) {
					  console.log('Status: ' + res.statusCode);
					  console.log('Headers: ' + JSON.stringify(res.headers));
					  res.setEncoding('utf8');
					  res.on('data', function (body) {
						response.json({result : 'success'});
					  });
					});
					req.on('error', function(e) {
						response.json({result : 'false' , content:'server'});
					});
					
					req.write(
							'{'+
						   '"to": "'+results[0][0].notify_key+'"'+
							'"data" : {"text" : "'+request.body.text+'" , "title": "새로운 메세지가 도착했습니다.", "gid" : "'+request.body.gid +'" , "writer" : "' +decodedToken.uid+'",'+  
							'}}'
						);
					req.end();
			}
		});
	}).catch(function(error){
		//토큰 로드 실패했을때
		response.json({result : 'false' , content:'server'});
	});
});

router.post('/add_num/:token' , function(req, res , next){
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.parallel([function(callback){
			 belongDAO.addNewTalkNum(req.body.gid , decodedToken.uid , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false' , content:'server'});
			} else{
				res.json({result:'success'});
			}
		});
	}).catch(function(error){
		//토큰 로드 실패했을때
		res.json({result : 'false' , content:'server'});
	});
});

router.get('/reset_num/:token/:gid' , function(req , res , next){
	admin.auth().verifyIdToken(req.params.token).then(function(decodedToken) {
		async.parallel([function(callback){
			belongDAO.resetTalkNum(req.params.gid , decodedToken.uid , callback);
		}] , function(err , results){
			if(err){
				res.json({result : 'false' , content:'server'});
			} else{
				res.json({result:'success'});
			}
		});
	}).catch(function(error){
		//토큰 로드 실패했을때
		res.json({result : 'false' , content:'server'});
	});
});
				
module.exports = router;