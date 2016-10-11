var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.insertCode = function( gid , callback){
	var sqlQuery = 'INSERT INTO code_table SET ?'
	var inform = {
			'code' : '',
			'gid' : gid
	}
	base.whileInsert(sqlQuery , inform , callback);
}