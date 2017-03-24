var express = require('express');
var router = express.Router();
var async = require('async');
var admin = require('firebase-admin');
var prizeDAO = require('../model/PrizeDAO');
var mailHelper = require('../helper/EmailMake');
var userDAO = require('../model/UserDAO');
var prizeDAO
var decryptHelper = require('../helper/DecryptHelper');

var async = require('async');


var url = require('url');  //토큰이 안되는게 ㅎㅎㅎㅎ Encrypt로 날려버려서 그래 ㅎㅎ

router.get('/:pid' , function(req , res , next){
	
	var parseObject = url.parse(req.url);
	if(parseObject.query==null){
		res.send('잘못된 접근입니다');
	} else{
		async.parallel([function(callback){
			prizeDAO.verifyPrize(decryptHelper.decryptEmail(parseObject.query), req.params.pid , callback);
		}] , function(err , results){
			if(err){
				res.send('잘못된 접근입니다.');
			} else if(results[0].length!=1){
				res.send('잘못된 접근입니다.');
			} else{
				//encryptEmail 이거 안넘어간다 확인해야함 시벌탱
				res.render('phone_input' , {url : results[0][0].imageURL , pName: results[0][0].pname , pid: results[0][0].pid  ,encryptEmail : parseObject.query});
			}
		});
	}
});

//핸드폰입력 계속 받지않게 막는방법 생각하기!!!

module.exports = router;