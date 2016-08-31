var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findRecentLocationByGid = function(gidArr , callback){
	var sqlQuery = 'select * from location where (belonged_gid, updated_time) in' + 
		'(select belonged_gid,max(updated_time) from location WHERE belonged_gid =';
	for (var i = 0 ; i < gidArr.length ; i++){
		sqlQuery = sqlQuery + gidArr[i].gid + ' OR belonged_giod = ';
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-16);
	console.log(sqlQuery);
};

 // GROUP by belonged_gid)