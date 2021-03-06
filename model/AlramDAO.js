var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findAlramByUid = function(uid , callback){
	
	sqlQuery = 'SELECT * from alram where unconfirmed = ' + mysql.escape(true) + ' AND row_count() < 50 AND target_uid = ' + mysql.escape(uid) + ' ORDER BY updated_time desc';
	
	base.select(sqlQuery , callback);
}

exports.findLocationWriter = function(AlramArr , callback){
	sqlQuery = 'SELECT lid , writer from location WHERE lid = '
	for(var i = 0 ; i < AlramArr.length ; i++){
		sqlQuery = sqlQuery + mysql.escape(AlramArr[i].target_lid) + ' OR lid = '
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-9);
	base.select(sqlQuery , callback);
}

exports.findLikeUser = function(AlramArr , callback){
	sqlQuery = 'SELECT * from like_location WHERE ( '
	for(var i = 0 ; i <AlramArr.length ; i ++){
		sqlQuery = sqlQuery +'aid = ' + mysql.escape(AlramArr[i].aid) + ' OR ';
	}
	
    sqlQuery = sqlQuery.substring(0 , sqlQuery.length-3) + ')';
	base.select(sqlQuery , callback);
}

exports.findDislikeUser = function(AlramArr , callback){
	sqlQuery = 'SELECT * from dislike_location WHERE ( '
		for(var i = 0 ; i <AlramArr.length ; i ++){
			sqlQuery = sqlQuery +'aid = ' + mysql.escape(AlramArr[i].aid) + ' OR ';
		}
	    sqlQuery = sqlQuery.substring(0 , sqlQuery.length-3) + ')';
		base.select(sqlQuery , callback);
	
}

exports.findReplyUser = function(AlramArr , callback){
	sqlQuery = 'SELECT aid , writer , contents from reply WHERE aid = '
		for(var i = 0 ; i <AlramArr.length ; i ++){
			sqlQuery = sqlQuery + mysql.escape(AlramArr[i].aid) + ' OR aid = '
		}
		sqlQuery = sqlQuery.substring(0 , sqlQuery.length-9);
		base.select(sqlQuery , callback);
}

exports.findReReplyUser = function(AlramArr , callback){
	sqlQuery = 'SELECT aid, writer, contents from re_reply WHERE aid = '
		for(var i = 0 ; i <AlramArr.length ; i ++){
			sqlQuery = sqlQuery + mysql.escape(AlramArr[i].aid) + ' OR aid = '
		}
		sqlQuery = sqlQuery.substring(0 , sqlQuery.length-9);
		base.select(sqlQuery , callback);
}

exports.findLikeReplyUser = function(AlramArr , callback){
	sqlQuery = 'SELECT * from like_reply WHERE ( '
		for(var i = 0 ; i <AlramArr.length ; i ++){
			sqlQuery = sqlQuery +'aid = ' + mysql.escape(AlramArr[i].aid) + ' OR ';
		}
	    sqlQuery = sqlQuery.substring(0 , sqlQuery.length-3) + ')';
		base.select(sqlQuery , callback);
}

exports.findLikeReReplyUser = function(AlramArr , callback){
	sqlQuery = 'SELECT * from like_re_reply WHERE ( '
		for(var i = 0 ; i <AlramArr.length ; i ++){
			sqlQuery = sqlQuery +'aid = ' + mysql.escape(AlramArr[i].aid) + ' OR ';
		}
	    sqlQuery = sqlQuery.substring(0 , sqlQuery.length-3) + ')';
		base.select(sqlQuery , callback);
}