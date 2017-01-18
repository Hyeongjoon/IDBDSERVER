var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findExistByUid = function(uid , callback){
	var sqlQuery = 'SELECT uid from schedule_table WHERE uid = ' + mysql.escape(uid);
	base.select(sqlQuery , callback);
}

exports.regSche = function( array, uid , callback){
	var sqlQuery = 'INSERT INTO schedule_table( `uid` , ';
	for(var i = 0 ; i < array.size ; i++){ 	//array 마지막에서 앞에서 1번째가 size 마지막에 token 딸려있음 그래서 그거빼고 삽입시킬라고 그러는거
		sqlQuery = sqlQuery + '`'+array[i]+'`,';
	}
	sqlQuery = sqlQuery.substring(0 ,sqlQuery.length - 1) + ') VALUES (' + uid + ',';
	for(var i = 0 ; i <array.size ; i++){
		sqlQuery = sqlQuery + mysql.escape(true) + ',';
	}
	sqlQuery = sqlQuery.substring(0 ,sqlQuery.length - 1) + ')';
	base.update(sqlQuery , callback); // 쿼리에 숫자안들어가고 바꾸는법모르겠고 차피 셀렉트도 걍 쿼리 1회실행하고 결과를 콜백에 넣는거여서...ㅠㅠ
}

exports.findSche = function(uid , callback){
	var sqlQuery = "SELECT `0` , `1` , `2` , `3` , `4` , `5` , `6` , `7` , `8` , `9` , `10` , `11` ,`12` ,`13`,`14`,`15` ,`16`, `17`, `18`, `19`, `20` ,`21`,`22`,`23`,`24`,`25`,`26`,`27`,`28`,`29`,`30`,`31`,`32`,`33`,`34`,`35`,`36`,`37`,`38`,`39`,`40`,`41`,`42`,`43`,`44`,`45`,`46`,`47`,`48`,`49`,`50`,`51`,`52`,`53`,`54`,`55`,`56`,`57`,`58`,`59`,`60`,`61`,`62`,`63`,`64`,`65`,`66`,`67`,`68`,`69`,`70`,`71`,`72`,`73`,`74`,`75`,`76`,`77`,`78`,`79`,`80`,`81`,`82`,`83`,`84`,`85`,`86`,`87`,`88`,`89`,`90`,`91`,`92`,`93`,`94`,`95`,`96`,`97`,`98`,`99`,`100`,`101`,`102`,`103`,`104`,`105`,`106`,`107`,`108`,`109`,`110`,`111`,`112`,`113`,`114`,`115`,`116`,`117`,`118`,`119`" 
						+" FROM schedule_table WHERE uid = " + mysql.escape(uid);
	base.select(sqlQuery , callback);
}

exports.correctSche = function(array, uid , callback){
	var sqlQuery = "UPDATE schedule_table SET "
	var temp={}
	for(var i = 0 ; i <120 ; i++){
		temp[i]=false;
	}
	for(var i = 0 ; i < array.size; i++){
		temp[array[i]] = true;
	}
	for(var i = 0 ; i <120; i++){
		sqlQuery = sqlQuery + "`" +i+"` = " + mysql.escape(temp[i]) + ", "
	}
	sqlQuery = sqlQuery.substring(0 , sqlQuery.length-2);
	sqlQuery = sqlQuery + " WHERE uid = " + mysql.escape(uid);
	base.update(sqlQuery , callback);
}