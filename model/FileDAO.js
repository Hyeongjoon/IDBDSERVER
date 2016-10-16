var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findFileByDate = function ( gid , callback){
	var sqlQuery = 'SELECT * FROM file_table group by date(upload_time) WHERE gid = ' + mysql.escape(gid);
	base.select(sqlQuery , callback);
}