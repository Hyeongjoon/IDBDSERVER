var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var async = require('async');
var decryptHelper = require('../helper/DecryptHelper.js');
var userDAO = require('../model/UserDAO.js');
var config = require('./config');

FacebookStrategy = require('passport-facebook').Strategy;

var admin = require('firebase-admin');


passport.use( new localStrategy({
        usernameField: 'email',
        passwordField: 'pwd'
      } , function(email, password, done) {
    	  async.series([function(callback){
        	  userDAO.findUserByEmail(email , callback);
    	  }], function(err , result){
    		  if(result[0]==''){
    			  return done(null, false);
    		  } else{
    	        	if(decryptHelper.decryption(result[0][0].pwd)== password){
    	        		  admin.auth().createCustomToken(result[0][0].uid+"")
    		      		    .then(function(customToken) {
    		      			var user = {
    								name : result[0][0].name,
    								email : result[0][0].email,
    								token : customToken
    						}
    		      			    done(null , user); //토큰땜에 여기서 이메일이랑 이름 설정 불가능 ㅠㅠ 
    		      		    })																		//왜냐하면 토큰으로 로그인정보 체크 시 정보 못줌 ㅠㅠ
    		      		    .catch(function(error) {
    		      		      	console.log("Error creating custom token:", error);
    		      		  		done(error , null);
    		      		    });
    	        	} else{
    	        		return done(null, false);
    	        	}
    		  }
    	  });      
      }
));


passport.use(new FacebookStrategy(config.facebookConfig,
  function(accessToken, refreshToken, profile, done) {
		async.waterfall([
		function(callback){ 
				userDAO.findFbUser(profile.id , callback);
		}, function(args1 , callback){
			if(args1.length==0){
				userDAO.insertFbUser(profile.id , profile.displayName , callback);
			} else if(args1.length==1){
				callback(null , args1);
			} else{
				callback('err' , null);
			}
		}], function(err , results){
			if(err){
				return done(err , null);
			} else{
				var tokenId;
				if(results.insertId == undefined){
					tokenId = results[0].uid
				} else{
					tokenId = results.insertId;
				}
				admin.auth().createCustomToken(tokenId+"")
	      		    .then(function(customToken) {
	      			var user = {
							name : profile.displayName,
							email : results.email,
							token : customToken
					}
	      			    done(null , user); //토큰땜에 여기서 이메일이랑 이름 설정 불가능 ㅠㅠ 
	      		    })																		//왜냐하면 토큰으로 로그인정보 체크 시 정보 못줌 ㅠㅠ
	      		    .catch(function(error) {
	      		      	console.log("Error creating custom token:", error);
	      		  		done(error , null);
	      		    });
			}
		});
  }
));

passport.serializeUser( function(user, done) {
    console.log('serialize');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    done(null, user);
});

exports.passport = passport;