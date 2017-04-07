var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.confirmCode = function(code , callback){
	var sqlQuery =  'SELECT * FROM prize WHERE prize_code = ' + mysql.escape(code);
	base.select(sqlQuery , callback);
};

exports.selectedPrize = function(code , uid , callback){
	var sqlQuery =  'UPDATE prize SET `uid` ='+ mysql.escape(uid) + ' , `end_date` = now() WHERE `prize_code` = ' + mysql.escape(code);
	base.update(sqlQuery , callback);
};

exports.verifyPrize = function(email , pid ,callback){
	var sqlQuery = 'SELECT p.pid, p.pname , p.imageURL, u.uid from prize AS p , (SELECT uid from user WHERE email = ' + mysql.escape(email) + ') AS u WHERE p.pid = '+ mysql.escape(pid) + ' AND u.uid = p.uid;';
	base.select(sqlQuery , callback);
}

exports.getNotWon = function(callback){
	var sqlQuery = 'SELECT pname from prize WHERE uid is NULL';
	base.select(sqlQuery , callback);
}

exports.getNoWonInform = function(callback){
	var sqlQuery = 'SELECT pname , imageURL from prize WHERE uid is NULL';
	base.select(sqlQuery , callback);
}