var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findRecentLocationByGid = function(gidArr , callback){
	var sqlQuery = 'select lid , file_location , belonged_gid from location where (belonged_gid, updated_time) in' + 
		'(select belonged_gid,max(updated_time) from location WHERE belonged_gid =';
	for (var i = 0 ; i < gidArr.length ; i++){
		sqlQuery = sqlQuery + gidArr[i].gid + ' OR belonged_gid = ';
	}
	
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-19);
	sqlQuery = sqlQuery + ' GROUP BY belonged_gid)';
	base.select(sqlQuery , callback);
};

