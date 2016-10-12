var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.insertCode = function( gid ,code ,callback){
	var sqlQuery = 'INSERT INTO code_table SET ?'
	var inform = {
			'code' : code,
			'gid' : gid
	}
	base.insert(sqlQuery , inform ,  callback);
}

exports.findCode = function(gid , callback){
	var sqlQuery = 'SELECT * FROM code_table WHERE gid = ' + mysql.escape(gid);
	base.select(sqlQuery , callback);
}