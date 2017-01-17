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

exports.findFileByFid = function(fid ,timeZone ,callback){
	var sqlQuery = 'SELECT * , DATE_FORMAT( convert_tz(upload_time , \'GMT\' , \''+timeZone+'\'), "%Y-%m-%d") as `d` FROM file_table WHERE fid = ' + mysql.escape(fid);
	base.select(sqlQuery , callback);
}

exports.findDateFile = function(gid , date, timeZone , callback){
	var sqlQuery = 'select fid , gid , uid , location , image , convert_tz(upload_time , \'GMT\' , \'' + 
	                 timeZone + '\') as upload_time FROM file_table WHERE gid = ' +mysql.escape(gid)+ ' AND  date_format(convert_tz(upload_time , \'GMT\' , \'' + timeZone +'\'), "%Y-%m-%d") = ' + mysql.escape(date) + ';'
	base.select(sqlQuery , callback);
}

exports.findGrFileNum = function(gid , callback){ //그룹 코드로 추가할때 새로운 파일 넘을 원래 있던 파일 개수로 셋팅하려고 >.< 근데 ㅅㅂ 255개 넘어가면 어카지?
	var sqlQuery = 'SELECT count(*) AS new_file_num FROM file_table WHERE gid = ' + mysql.escape(gid);
	base.select(sqlQuery , callback);
}