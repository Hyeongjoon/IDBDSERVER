var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findFileByDate = function ( gid , callback){
	var sqlQuery = 'SELECT fid, gid, uid, location , date(upload_time) , image , MOD(`fid`,3) as `md`, DATE_FORMAT(`upload_time`, "%Y-%m-%d") as `d` FROM file_table WHERE gid = ' + mysql.escape(gid) + ' GROUP BY `d` , `md`';
	base.select(sqlQuery , callback);
}