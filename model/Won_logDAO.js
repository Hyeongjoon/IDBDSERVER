var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.addLog = function(uid , pid , pname , callback){
	var inform = {
			uid : uid,
			pid : pid,
			pname : pname
	}
	var sqlQuery = 'INSERT INTO won_log set ?';
	base.insert(sqlQuery, inform, callback);
};