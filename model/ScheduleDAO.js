var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findExistByUid = function(uid , callback){
	var sqlQuery = 'SELECT uid from schedule_table WHERE uid = ' + mysql.escape(uid);
	base.select(sqlQuery , callback);
}

exports.regScher = function( arrary, uid , callback){
	var sqlQuery = 'INSERT INTO schedule_table( `uid` , ';
	for(var i = 0 ; i < arrary.size ; i++){ 	//array 마지막에서 앞에서 1번째가 size 마지막에 token 딸려있음 그래서 그거빼고 삽입시킬라고 그러는거
		sqlQuery = sqlQuery + '`'+arrary[i]+'`,';
	}
	sqlQuery = sqlQuery.substring(0 ,sqlQuery.length - 1) + ') VALUES (' + uid + ',';
	for(var i = 0 ; i <arrary.size ; i++){
		sqlQuery = sqlQuery + mysql.escape(true) + ',';
	}
	sqlQuery = sqlQuery.substring(0 ,sqlQuery.length - 1) + ')';
	base.update(sqlQuery , callback); // 쿼리에 숫자안들어가고 바꾸는법모르겠고 차피 셀렉트도 걍 쿼리 1회실행하고 결과를 콜백에 넣는거여서...ㅠㅠ
}