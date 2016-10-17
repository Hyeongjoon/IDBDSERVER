var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findFileByDate = function ( gid , callback){
	var sqlQuery = 'SELECT fid, gid, uid, location , date(upload_time) , image FROM file_table WHERE gid = ' + mysql.escape(gid) + ' group by date(upload_time)';
	base.select(sqlQuery , callback);
}