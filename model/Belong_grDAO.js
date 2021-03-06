var base = require('./BaseDAO.js');

var mysql = require('mysql');
var makeColor = require('../helper/MakeColorNum');

exports.getGidByUid = function(uid , callback){
	var sqlQuery = 'SELECT * from belong_gr WHERE uid = ' + mysql.escape(uid);
	sqlQuery = sqlQuery +  ' ORDER BY view_order ASC';
	base.select(sqlQuery, callback);
};

exports.getGrInfo = function(uid , callback){
	var sqlQuery = 'SELECT straight_join gr.member_num , gr.gid ,gr.notify_key ,belong_gr.new_file_num , belong_gr.new_talk_num , belong_gr.color' +
					', belong_gr.name from gr LEFT JOIN belong_gr ON belong_gr.gid = gr.gid WHERE uid = ' + mysql.escape(uid) + 'ORDER by gr.update_time DESC';
		base.select(sqlQuery , callback);
};

exports.addNewTalkNum = function(gid , uid , callback){
	var sqlQuery = 'UPDATE belong_gr SET new_talk_num = new_talk_num + 1 WHERE gid = ' + mysql.escape(gid) + ' AND uid = ' + mysql.escape(uid);
	base.update(sqlQuery , callback);
}

exports.resetTalkNum = function(gid , uid , callback){
	var sqlQuery = 'UPDATE belong_gr SET new_talk_num = 0 WHERE gid = ' + mysql.escape(gid) + ' AND uid = ' + mysql.escape(uid);
	base.update(sqlQuery , callback);
}

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

exports.addBelong_gr = function(uid , gid , title , new_file_num, color ,callback){
	var sqlQuery = 'INSERT INTO belong_gr SET ?';
	var inform = {
			'uid' : uid,
			'gid' : gid,
			'name' : title,
			'new_file_num' : new_file_num,
			'new_talk_num' : 0,
			'color' : color
	}
	base.insert(sqlQuery , inform , callback);
}

exports.deleteBelong_gr = function(uid , gid , callback){
	var sqlQuery = 'DELETE FROM belong_gr WHERE uid = ' + mysql.escape(uid) + ' AND gid = ' + mysql.escape(gid);
	base.deletion(sqlQuery , callback);
}

exports.changeColor = function(uid, gid, color, callback){
	var sqlQuery = 'UPDATE belong_gr SET `color` = ' + mysql.escape(color) + ' WHERE uid = ' + mysql.escape(uid) + ' AND gid = ' + mysql.escape(gid);
	base.update(sqlQuery, callback);
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

exports.findNameIngr = function(gid ,callback){
	var sqlQuery = 'SELECT straight_join user.name , user.uid from user left JOIN belong_gr ON belong_gr.gid= '+ mysql.escape(gid)+ 'WHERE user.uid = belong_gr.uid';
	base.select(sqlQuery , callback);
}

exports.resetFileNum = function(uid , gid , callback){
	var sqlQuery = 'UPDATE belong_gr SET new_file_num = 0 WHERE gid = '+mysql.escape(gid)+' AND uid = ' + mysql.escape(uid);
	base.update(sqlQuery , callback);
}

exports.findGrSche = function(gid , callback){
	var sqlQuery = 'SELECT a.* From (SELECT uid FROM belong_gr WHERE gid = ' + mysql.escape(gid) + ') AS b join schedule_table AS a on a.uid = b.uid';
	base.select(sqlQuery , callback);
}