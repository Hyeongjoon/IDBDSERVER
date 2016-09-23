var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGidByUid = function(uid , callback){
	var sqlQuery = 'SELECT * from belong_gr WHERE uid = ' + mysql.escape(uid);
	sqlQuery = sqlQuery +  ' ORDER BY view_order ASC';
	base.select(sqlQuery, callback);
};

exports.getUidInGroupNotMe = function(gidArr , uid, callback){
	var sqlQuery = 'SELECT * from belong_gr WHERE ( ';
	for (var i = 0 ; i < gidArr.length ; i ++){
		sqlQuery = sqlQuery + ' gid = ' + gidArr[i].gid + ' OR '
	}
	sqlQuery = sqlQuery.substring(0,sqlQuery.length-4);
	sqlQuery = sqlQuery + ') AND  (uid != ' + mysql.escape(uid) + ') ORDER BY gid ASC';
	
	base.select(sqlQuery , callback);
};

exports.switchGrOrderByGid = function(gidArr , uid , callback){
	var sqlQuery = 'UPDATE belong_gr SET view_order = case gid'
		console.log(gidArr);
	for(var i = 0 ; i < gidArr.length ; i++){
		sqlQuery = sqlQuery + ' WHEN ' + gidArr[i] + ' THEN ' + i
	}
	sqlQuery = sqlQuery + ' ELSE view_order END WHERE uid = ' + mysql.escape(uid);
	base.update(sqlQuery , callback);
}

exports.addViewOrder = function(uid , callback){
	var sqlQuery = 'UPDATE belong_gr SET view_order = view_order + 1 WHERE uid = ' + mysql.escape(uid) +';';
	base.update(sqlQuery , callback);
}

exports.addBelong_gr = function(uid , grInform , title ,callback){
	var sqlQuery = 'INSERT INTO belong_gr SET ?';
	var inform = {
			'uid' : uid,
			'gid' : grInform.insertId,
			'name' : title,
			'view_order' : 0
	}
	base.insert(sqlQuery , inform , callback);
}

exports.deleteBelong_gr = function(uid , gid , callback){
	var sqlQuery = 'DELETE FROM belong_gr WHERE uid = ' + mysql.escape(uid) + ' AND gid = ' + mysql.escape(gid);
	console(sqlQuery);
}



