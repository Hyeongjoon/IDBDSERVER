var express = require('express');
var router = express.Router();
var passport = require('../app').passport;

router.get('/' , function(req , res , next){
	res.render('login' , {});
});

router.post('/' , function(req , res , next){
	if(req.body.email==null || req.body.pwd == null){
		res.json({result : 'fail' , content : '내부 서버오류입니다. 잠시후에 시도해 주세요'});//어떤새끼가 악의적으로 접근한듯.........
	} else{
		 passport.authenticate('local', function(err, user, info) {
			    if (err) { return next(err); }
			    if (!user) { return res.json({result:'fail' , content:'Email이나 비밀번호가 틀렸습니다.'});}
			    req.logIn(user, function(err) {
			      if (err) { return next(err); }
			      return res.json({result:'success'});
			    });
			  })(req, res, next);
	}
});


module.exports = router;