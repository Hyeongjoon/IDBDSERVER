var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGidByUid = function(uid , callback){
	var sqlQuery = 'SELECT * from belong_gr WHERE uid = ' + mysql.escape(uid);
	base.select(sqlQuery, callback);
};

exports.getUidInGroup = function(gidArr , callback){
	console.log(gidArr);
};