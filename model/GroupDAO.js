var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGroupBygid  = function(gidArr , callback){
	var sqlQuery = 'SELECT * from gr WHERE gid = ';
	
	for (var i = 0 ; i < gidArr.length ; i++){
		sqlQuery = sqlQuery + gidArr[i].gid + ' or gid = '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-10);
	sqlQuery = sqlQuery + ' ORDER BY view_order ASC';
	base.select(sqlQuery , callback);
}