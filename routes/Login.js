var express = require('express');
var router = express.Router();

var passport = require('../app').passport;
var async = require('async');
var decryptHelper = require('../helper/DecryptHelper');

var userDAO = require('../model/UserDAO');
var scheduleDAO = require('../model/ScheduleDAO');

var admin = require('firebase-admin');


router.get('/' , function(req , res , next){
	res.render('login' , {});
});

router.post('/' , function(req , res , next){
	if(req.body.email==null || req.body.pwd == null){
		res.json({result : 'fail' , content : '내부 서버오류입니다. 잠시후에 시도해 주세요'});//어떤새끼가 악의적으로 접근한듯.........
	} else if(req.body.web=='true'){
		 passport.authenticate('local', function(err, user, info) {
			    if (err){
			    		return res.json({result:'fail' , content:'내부 서버 오류입니다.'}); 
			    	}
			    if (!user){ 
			    		return res.json({result:'fail' , content:'Email이나 비밀번호가 틀렸습니다.'});
			    	}
			    req.logIn(user, function(err){
			      if (err) { return next(err);}
			      return res.json({result:'success'});
			    });
			  })(req, res, next);
	} else{
		  var userInfo = {};
		  async.waterfall([function(callback){
        	  userDAO.findUserByEmail(req.body.email , callback);
    	  } , function(args , callback){
    		  if(args.length==0){
    			callback(null , null);  
    		  } else{
    			  userInfo = args[0];
    			  scheduleDAO.findExistByUid(userInfo.uid , callback);
    		  }
    	  }], function(err , result){
    		  if(err){
    			  return res.json({result:'fail' , content:'내부 서버 오류입니다.'});
    		  }else if(userInfo.uid==null){
    			  return res.json({result:'fail' , content:'Email이나 비밀번호가 틀렸습니다.'})
    		  } else{
    	        	if(decryptHelper.decryption(userInfo.pwd)== req.body.pwd){
    	        		admin.auth().createCustomToken(userInfo.uid+"")
    	      		    .then(function(customToken) {
    	      			  	res.json({result:'success' , content:customToken }); //업데이트 끝나면 지울것
    	      			  	//토큰땜에 여기서 이메일이랑 이름 설정 불가능 ㅠㅠ 
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

router.post('/fb' , function(req , res , next){
	async.waterfall([
		function(callback){ 
				userDAO.findFbUser(req.body.facebook_id , callback);
		}, function(args1 , callback){
			if(args1.length==0){
				userDAO.insertFbUser(req.body.facebook_id , req.body.name , callback);
			} else if(args1.length==1){
				callback(null , args1);
			} else{
				callback('err' , null);
			}
		}], function(err , results){
				console.log(results);
			if(err){
				res.json({result : false});
			} else{
				var tokenId;
				var email = null
				if(results.insertId == undefined){
					tokenId = results[0].uid
					email = results[0].email;
				} else{
					tokenId = results.insertId;
				}
				admin.auth().createCustomToken(tokenId+"")
	      		    .then(function(customToken) {
	      			var user = {
	      					result : true,
	      					uid : tokenId,
							name : req.body.name,
							email : email,
							token : customToken
					}
	      			console.log(user);
	      			    res.json(user) //토큰땜에 여기서 이메일이랑 이름 설정 불가능 ㅠㅠ 
	      		    })																		//왜냐하면 토큰으로 로그인정보 체크 시 정보 못줌 ㅠㅠ
	      		    .catch(function(error) {
	      			  	res.json({result : false});
	      		    });
			}
		});
});


module.exports = router;