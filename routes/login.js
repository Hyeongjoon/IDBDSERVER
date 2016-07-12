var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;
var author = require('../helper/authorize');

router.get('/', function(req, res, next) {
	res.render('login', {
		
	});
});
router.post('/login',
	    passport.authenticate('local', { failureRedirect: '/login_fail', failureFlash: true }),
	    function(req, res) {
	        res.redirect('/login_success');
	    });

router.post('/login_chk' , function(req, res, next){
			console.log("여긴되냐??");
});


router.get('/login_success', author.ensureAuthenticated, function(req, res, next){
	console.log(req.session);
	res.send(req.session.passport);
});


router.get('/login_fail' , function(req, res, next){
	res.send("로긴실패");
});



module.exports = router;