var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.addCount = function(callback){
	var sqlQuery = 'UPDATE count SET count.count = count.count+1';
	base.update(sqlQuery , callback)
}