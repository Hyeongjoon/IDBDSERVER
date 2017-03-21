var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.confirmCode = function(code , callback){
	var sqlQuery =  'SELECT * FROM prize WHERE prize_code = ' + mysql.escape(code);
	base.select(sqlQuery , callback);
};

exports.selectedPrize = function(code , uid , callback){
	var sqlQuery =  'UPDATE prize SET `uid` ='+ mysql.escape(uid) + ' AND `end_date` = now() WHERE `prize_code` = ' + mysql.escape(code);
	base.update(sqlQuery , callback);
};