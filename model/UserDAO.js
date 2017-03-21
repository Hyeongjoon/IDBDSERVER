var base = require('./BaseDAO.js');
var mysql = require('mysql');



exports.findUserByEmail = function(userEmail, callback) {
	var sqlQuery = 'SELECT * from user WHERE email = ' + mysql.escape(userEmail);
	base.select(sqlQuery, callback);
};

exports.register = function(inform, callback) {
	var sqlQuery = 'INSERT INTO user set ?';
	base.insert(sqlQuery, inform, callback);
};

exports.findUserByName = function(userName , callback){
	var sqlQuery = 'SELECT * from user WHERE name = ' + mysql.escape(userName);
	base.select(sqlQuery, callback);
}

exports.verifyEmail = function(userEmail , callback){
	var sqlQuery = 'UPDATE user SET email_verify =' +mysql.escape(true) + ' WHERE email = ' + mysql.escape(userEmail);
	base.update(sqlQuery , callback);
}

exports.findEmailByUid = function(uid , callback){
	var sqlQuery = 'SELECT email FROM user WHERE uid = ' + mysql.escape(uid);
	base.select(sqlQuery , callback);
}

exports.getProfileByUid = function(uidArr , callback){
	var sqlQuery = 'SELECT uid , profile from user WHERE profile != \'\' AND (';
	for (var i = 0 ; i<uidArr.length ; i++){
		sqlQuery = sqlQuery + 'uid = ' + mysql.escape(uidArr[i]) + ' OR '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-4);
	sqlQuery = sqlQuery + ');'	
	base.select(sqlQuery , callback);
}

exports.getUserNameByUID = function( uidArr , callback ){
	var sqlQuery = 'SELECT uid , name from user WHERE '
		for(var i = 0 ; i < uidArr.length ; i++ ){
			sqlQuery = sqlQuery + 'uid = ' + mysql.escape(uidArr[i]) + ' OR '
		}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-4);
	sqlQuery = sqlQuery+';'
	base.select(sqlQuery , callback);
}

exports.findUserInfo = function(uid , callback){
	var sqlQuery = 'SELECT email , name FROM user WHERE uid = ' + mysql.escape(uid);
	base.select(sqlQuery , callback);
}

