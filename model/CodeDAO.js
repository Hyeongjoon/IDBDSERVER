var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.insertCode = function(code , gid , callback){
	var sqlQuery = 'INSERT INTO code_table SET ?'
	var inform = {
			'code' : 'ABCDE',
			'gid' : gid
	}
	base.insert(sqlQuery , inform , callback);
}