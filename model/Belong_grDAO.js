var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.getGidByUid = function(uid , callback){
	var sqlQuery = 'SELECT * from belong_gr WHERE uid = ' + mysql.escape(uid);
	sqlQuery = sqlQuery +  ' ORDER BY view_order ASC';
	base.select(sqlQuery, callback);
};

exports.getGrInfo = function(uid , callback){
	var sqlQuery = 'SELECT straight_join gr.member_num , gr.gid , belong_gr.new_file_num , belong_gr.new_talk_num' +
					', belong_gr.name from gr LEFT JOIN belong_gr ON belong_gr.gid = gr.gid WHERE uid = ' + mysql.escape(uid) + 'ORDER by gr.update_time DESC';
		base.select(sqlQuery , callback);
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
	var sqlQuery = 'UPDATE belong_gr SET view_order = case gid';
	for(var i = 0 ; i < gidArr.length ; i++){
		sqlQuery = sqlQuery + ' WHEN ' + gidArr[i] + ' THEN ' + i
	}
	sqlQuery = sqlQuery + ' ELSE view_order END WHERE uid = ' + mysql.escape(uid);
	base.update(sqlQuery , callback);
}

exports.addViewOrder = function(uid , callback){
	var sqlQuery = 'UPDATE belong_gr SET view_order = view_order + 1 WHERE uid = ' + mysql.escape(uid);
	base.update(sqlQuery , callback);
}

exports.addBelong_gr = function(uid , gid , title ,callback){
	var sqlQuery = 'INSERT INTO belong_gr SET ?';
	var inform = {
			'uid' : uid,
			'gid' : gid,
			'name' : title,
			'new_file_num' : 0,
			'new_talk_num' : 0
	}
	base.insert(sqlQuery , inform , callback);
}

exports.deleteBelong_gr = function(uid , gid , callback){
	var sqlQuery = 'DELETE FROM belong_gr WHERE uid = ' + mysql.escape(uid) + ' AND gid = ' + mysql.escape(gid);
	base.deletion(sqlQuery , callback);
}

exports.subtractViewOrder = function(uid , gidArr , viewOrder , callback){
	var sqlQuery = 'UPDATE belong_gr SET view_order = case gid ';
	for(var i = 0 ; i < gidArr.length-1 ; i++){
		sqlQuery = sqlQuery + ' WHEN ' + gidArr[i+1] + ' THEN ' + (viewOrder+i);
	}
	sqlQuery = sqlQuery + ' ELSE view_order END WHERE uid = ' + mysql.escape(uid);
	base.update(sqlQuery , callback);
}

exports.changeGrName = function(uid , gid , name , callback){
	var sqlQuery = 'UPDATE belong_gr SET name = ' + mysql.escape(name) + ' WHERE uid = ' + mysql.escape(uid) + ' AND gid = ' + mysql.escape(gid);
	base.update(sqlQuery , callback);
}

exports.findViewOrder = function(uid , gid , callback){
	var sqlQuery = 'SELECT gid , name , view_order FROM belong_gr WHERE uid = ' + mysql.escape(uid) + ' AND gid = ' + mysql.escape(gid);
	base.select(sqlQuery, callback);
} // 아래꺼랑 겹치는데....이름땜에 슈벌탱

exports.findBelongByUidGid = function(uid , gid , callback){
	var sqlQuery = 'SELECT uid , gid FROM belong_gr WHERE uid = ' + mysql.escape(uid) + ' AND gid = ' + mysql.escape(gid);
	base.select(sqlQuery , callback);
}