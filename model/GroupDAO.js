var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGroupBygid  = function(gidArr , callback){
	var sqlQuery = 'SELECT gid , member_number from gr WHERE gid = ';
	
	for (var i = 0 ; i < gidArr.length ; i++){
		sqlQuery = sqlQuery + gidArr[i].gid + ' or gid = '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-10);
	base.select(sqlQuery , callback);
}

exports.addGroupReturnID = function(callback){
	var sqlQuery = ' INSERT INTO gr() VALUES();';
	base.lastInsertId(sqlQuery , callback);
}

exports.findGrInfrom = function(gid , callback){
	var sqlQuery = ' SELECT gid , member_number FROM gr WHERE = ' + mysql.escape(gid);
	base.select(sqlQuery , callback);
}

exports.subtractGroupNum = function(gid , callback){
	var sqlQuery = 'UPDATE member_number SET member_number = member_number - 1 WHERE gid = ' + mysql.escape(gid);
	base.update(sqlQuery , callback);
}