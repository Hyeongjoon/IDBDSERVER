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

exports.getProfileByUid = function(uidArr , callback){
	var sqlQuery = 'SELECT uid , profile from user WHERE profile != \'\' AND (';
	for (var i = 0 ; i<uidArr.length ; i++){
		sqlQuery = sqlQuery + 'uid = ' + mysql.escape(uidArr[i]) + ' OR '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-4);
	sqlQuery = sqlQuery + ');'
	
	base.select(sqlQuery , callback);
}

/*
exports.certifyEmail = function(userEmail, callback) {
	var sqlQuery = 'SELECT * from account WHERE email = ' + mysql.escape(userEmail);
	base.select(sqlQuery, callback);
};

exports.certifyNick = function(nickname, callback) {
	var sqlQuery = 'SELECT * from account WHERE nickname = '
			+ mysql.escape(nickname);
	base.select(sqlQuery, callback);
};

exports.changeInterestingCity = function(inform, cityString, callback) {
	var sqlQuery = 'UPDATE account SET interesting_city_code = '
			+ mysql.escape(cityString) + ' WHERE nickname = '
			+ mysql.escape(inform.nick) + ' AND email = '
			+ mysql.escape(inform.email);
	base.update(sqlQuery, callback);
}

exports.changePassword = function(password, email , callback){
	var sqlQuery = 'UPDATE account SET password = '+mysql.escape(password) + ' WHERE email = ' + mysql.escape(email);
	base.update(sqlQuery, callback);
}

exports.deleteAccount = function(email , nickName , callback){
	var sqlQuery = 'DELETE FROM account WHERE email = ' + mysql.escape(email) + ' AND nickname = ' + mysql.escape(nickName);
	base.deletion(sqlQuery , callback);
}

exports.changePageLang = function(email , pageLang , callback){
	var sqlQuery = 'UPDATE account SET page_language = ' + mysql.escape(pageLang) + ' WHERE email = ' + mysql.escape(email);
	base.update(sqlQuery, callback);
}

exports.changeDefalutLang = function(email , DLang , callback){
	var sqlQuery = 'UPDATE account SET default_language = ' + mysql.escape(DLang) + ' WHERE email = ' +mysql.escape(email);
	base.update(sqlQuery, callback);
}

exports.changeAddLang = function(email , AddLang , callback){
	var sqlQuery = 'UPDATE account SET addtional_language = ' + mysql.escape(AddLang) + ' WHERE email = ' +mysql.escape(email);
	base.update(sqlQuery, callback);
}

exports.changeProhibitAccount = function (email , prohibitNick , callback){
	var sqlQuery = 'UPDATE account SET prohibit_account = ' + mysql.escape(prohibitNick) + ' WHERE email = ' + mysql.escape(email);
	base.update(sqlQuery, callback);
	
}*/