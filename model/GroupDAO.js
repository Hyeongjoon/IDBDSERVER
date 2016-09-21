var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGroupBygid  = function(gidArr , callback){
	var sqlQuery = 'SELECT * from gr WHERE gid = ';
	
	for (var i = 0 ; i < gidArr.length ; i++){
		sqlQuery = sqlQuery + gidArr[i].gid + ' or gid = '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-10);
	base.select(sqlQuery , callback);
}

exports.addGroupReturnID = function(callback){
	//var sqlQuery = ' INSERT INTO gr() VALUES();';
	var sqlQuery = 'INSERT INTO belong_gr(uid , gid , name , view_order) values(1 , last_insert_id() , "쮸뿌쮸뿌" , 0);'
	base.insert(sqlQuery , callback);
}