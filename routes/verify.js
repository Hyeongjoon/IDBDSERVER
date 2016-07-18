var express = require('express');
var router = express.Router();

router.get('/' , function(req , res , next){
	console.log("여기까지옴");
	res.send("시발련아");
});


module.exports = router;