var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGidByUid = function(uid , callback){
	var sqlQuery = 'SELECT * from belong_gr WHERE uid = ' + mysql.escape(uid);
	base.select(sqlQuery, callback);
};

exports.getUidInGroup = function(gidArr , callback){
	var sqlQuery = 'Select * from belong_gr WHERE (gid = ';
	for (var i = 0 ; i < gidArr.length ; i ++){
		sqlQuery = sqlQuery + gidArr[i].gid + 'OR'
	}
	sqlQuery = sqlQuery.substring(0,sqlQuery.length-2);
	sqlQuery = sqlQuery + ') AND  (uid != ' + mysql.escape(gidArr[0].uid) + ')';
	console.log(sqlQuery);
	//base.select(sqlQuery , callback);
};