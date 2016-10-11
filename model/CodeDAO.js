var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.insertCode = function( gid , check ,callback){
	var sqlQuery = 'INSERT INTO code_table SET ?'
	var inform = {
			'code' : '',
			'gid' : gid
	}
	base.whileInsert(sqlQuery , inform , check , callback);
}