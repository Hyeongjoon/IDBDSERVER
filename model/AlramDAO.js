var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findAlramByUid = function(uid , callback){
	sqlQuery = 'SELECT * from alram where unconfirmed = ' + mysql.escape(false) + ' AND target_uid = ' + mysql.escape(uid) + ' ORDER BY updated_time desc';
	
	console.log(sqlQuery);
	//base.select(sqlQuery , callback);
}