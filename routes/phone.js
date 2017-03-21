var express = require('express');
var router = express.Router();
var async = require('async');
var admin = require('firebase-admin');
var prizeDAO = require('../model/PrizeDAO');
var mailHelper = require('../helper/EmailMake');
var userDAO = require('../model/UserDAO');


router.get('/' , function(req , res , next){
	console.log('여긴오냐');//링크타고 들어오면 여기부텋마ㅕㄴ됨
});

module.exports = router;