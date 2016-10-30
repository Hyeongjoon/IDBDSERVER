var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findFileByGid = function ( gid ,timeZone, callback){
	var sqlQuery = 'SELECT fid, gid, uid, location , upload_time ,  image , MOD(`fid`,3) as `md`, DATE_FORMAT( convert_tz(upload_time , \'GMT\' , \''+timeZone+'\'), "%Y-%m-%d") as `d` FROM file_table WHERE gid = ' + mysql.escape(gid) + ' GROUP BY `d` , `md`';
	base.select(sqlQuery , callback);
}

exports.insertFile = function(input , callback){
	var sqlQuery = 'INSERT INTO file_table SET ?';
	base.lastInsertId (sqlQuery,  callback , input );
}

exports.findFileByFid = function(fid , callback){
	var sqlQuery = 'SELECT * from file_table WHERE fid = ' + mysql.escape(fid);
	base.select(sqlQuery , callback);
}