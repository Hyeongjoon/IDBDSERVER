var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGidByUid = function(uid , callback){
	var sqlQuery = 'SELECT * from belong_gr WHERE uid = ' + mysql.escape(uid);
	base.select(sqlQuery, callback);
};

exports.getUidInGroupNotMe = function(gidArr , callback){
	var sqlQuery = 'Select * from belong_gr WHERE (gid = ';
	for (var i = 0 ; i < gidArr.length ; i ++){
		sqlQuery = sqlQuery + gidArr[i].gid + ' OR '
	}
	sqlQuery = sqlQuery.substring(0,sqlQuery.length-4);
	sqlQuery = sqlQuery + ') AND  (uid != ' + mysql.escape(gidArr[0].uid) + ') ORDER BY gid ASC';
	console.log(sqlQuery);
	base.select(sqlQuery , callback);
};

exports.getProfileByUid = function(uidArr , callback){
	var sqlQuery = 'SELECT uid , profile from user WHERE profile != \'\' AND (';
	for (var i = 0 ; i<uidArr.length ; i++){
		sqlQuery = sqlQuery + 'uid = ' + mysql.escape(uidArr[i]) + ' OR '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-4);
	sqlQuery = sqlQuery + ');'
	console.log(sqlQuery);
	base.select(sqlQuery , callback);
}