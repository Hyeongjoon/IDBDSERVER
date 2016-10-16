var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findFileByDate = function ( gid , callback){
	var sqlQuery = 'SELECT * FROM file_table WHERE gid = ' + mysql.escape(gid) + ' group by date(upload_time)';
	base.select(sqlQuery , callback);
}