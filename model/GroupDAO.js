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