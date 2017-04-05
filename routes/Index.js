var express = require('express');
var router = express.Router();

router.get('/' , function(req , res , next){
	console.log(req.session.passport);
	if(req.session.passport==undefined){
		res.render('index' , {login : false});
	} else{
		res.render('index' , {login : true, name : req.session.passport.user.name});
	}
	
});



module.exports = router;