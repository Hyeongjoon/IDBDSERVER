var express = require('express');
var router = express.Router();

router.get('/' , function(req , res , next){
	console.log("여긴오냐");
});


module.exports = router;