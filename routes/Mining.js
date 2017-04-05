var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');

/* GET home page. */
router.get('/', function(req, res, next){
	if(req.session.passport.user.eamil==undefined){
		res.redirect("/emailverify");
	} else{
		res.render('mining' , {token : req.session.passport.user.token});
	}
});

module.exports = router;