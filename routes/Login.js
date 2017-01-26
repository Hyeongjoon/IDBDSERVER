var express = require('express');
var router = express.Router();
var passport = require('../app').passport;
var async = require('async');
var decryptHelper = require('../helper/DecryptHelper');
var userDAO = require('../model/UserDAO');
var scheduleDAO = require('../model/ScheduleDAO');


var admin = require('firebase-admin');

var serviceAccount = require('../helper/tracer-6de9934918ad.json');

admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount) 
	});

router.get('/' , function(req , res , next){
	res.render('login' , {});
});

router.post('/' , function(req , res , next){
	if(req.body.email==null || req.body.pwd == null){
		res.json({result : 'fail' , content : '내부 서버오류입니다. 잠시후에 시도해 주세요'});//어떤새끼가 악의적으로 접근한듯.........
	} else{
		  var userInfo = {};
		  async.waterfall([function(callback){
        	  userDAO.findUserByEmail(req.body.email , callback);
    	  } , function(args , callback){
    		  if(args.length==0){
    			callback(null , null);  
    		  } else{
    			  userInfo = args[0]
    			  scheduleDAO.findExistByUid(userInfo.uid , callback);
    		  }
    	  }], function(err , result){
    		  if(err){
    			  return res.json({result:'fail' , content:'내부 서버 오류입니다.'});
    		  }else if(userInfo.uid==null){
    			  return res.json({result:'fail' , content:'Email이나 비밀번호가 틀렸습니다.'})
    		  } else{
    	        	if(decryptHelper.decryption(userInfo.pwd)== req.body.pwd){
    	        		var goMain = true; //처음에 메인으로 보낼지 시간표 받는곳으로 보낼지 정하는것 (맨처음 가입하고 스케쥴 안만들었을때만 관여하겠지
    	        		if(result.length!=1){
    	        			goMain = false;
    	        		}
    	        		admin.auth().createCustomToken(userInfo.uid+"")
    	      		    .then(function(customToken) {
    	      			  	console.log(customToken);
    	      			  	res.json({result:'success' , content:customToken , goMain:goMain }); //토큰땜에 여기서 이메일이랑 이름 설정 불가능 ㅠㅠ 
    	      		    })																		//왜냐하면 토큰으로 로그인정보 체크 시 정보 못줌 ㅠㅠ
    	      		    .catch(function(error) {
    	      		      	console.log("Error creating custom token:", error);
    	      		  		return res.json({result:'fail' , content:'내부 서버 오류입니다.'});
    	      		    });
    	        	} else{
    	        		return res.json({result:'fail' , content:'Email이나 비밀번호가 틀렸습니다.'});
    	        	}
    		  }
    	  });
	}
});

module.exports = router;