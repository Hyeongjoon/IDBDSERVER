var express = require('express');
var router = express.Router();

router.get('/service' , function(req, res, next){
	res.render('policy_service');
});

router.get('/individual' , function(req, res, next){
	res.render('policy_individual')
});

module.exports = router;