var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findAlramByUid = function(uid , callback){
	
	sqlQuery = 'SELECT * from alram where unconfirmed = ' + mysql.escape(true) + ' AND row_count() < 50 AND target_uid = ' + mysql.escape(uid) + ' ORDER BY updated_time desc';
	
	base.select(sqlQuery , callback);
}

exports.findLocationWriter = function(AlramArr , callback){
	sqlQuery = 'SELECT lid , writer from location WHERE lid = '
	for(var i = 0 ; i < AlramArr.length ; i++){
		sqlQuery = sqlQuery + mysql.escape(AlramArr[i].target_lid) + ' AND lid = '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-10);
	base.select(sqlQuery , callback);
}

exports.findLikeUser = function(AlramArr , callback){
	sqlQuery = 'SELECT * from like_location WHERE lid = '
	for(var i = 0 ; i <AlramArr.length ; i ++){
		sqlQuery = sqlQuery + mysql.escape(AlramArr[i].target_lid) + ' AND lid = '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-10);
	base.select(sqlQuery , callback);
}