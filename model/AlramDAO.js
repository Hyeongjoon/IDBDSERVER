var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findAlramByUid = function(uid , callback){
	
	sqlQuery = 'SELECT * from alram where unconfirmed = ' + mysql.escape(true) + ' AND row_count() < 50 AND target_uid = ' + mysql.escape(uid) + ' ORDER BY updated_time desc';
	
	base.select(sqlQuery , callback);
}