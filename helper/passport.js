var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var async = require('async');
var decryptHelper = require('../helper/DecryptHelper.js');
var userDAO = require('../model/UserDAO.js');


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
    	        		  delete result[0][0].pwd;
    	    	          return done(null, result[0][0]);
    	        		
    	        	} else{
    	        		return done(null, false);
    	        	}
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