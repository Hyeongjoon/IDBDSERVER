var express = require('express');
var router = express.Router();

router.get('/' , function(req , res , next){
	console.log("여긴오냐??");
	console.log(req.url);
	var tmp = req.url;
	console.log(tmp.slice(8));
});


module.exports = router;