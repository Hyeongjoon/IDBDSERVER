var cryptoJS = require('crypto-js');
var config = require('./config.js');

var char = 'abcdefghijklmnopqrstuvwxyz';

exports.encryption = function(input){
	var result = cryptoJS.AES.encrypt(input , config.dbSecretKey);
	return result;
}

exports.encryptEmail = function(input){
	var result = cryptoJS.AES.encrypt(input , config.emailSecretKey);
	return result;
}

exports.codeGen = function(){
	var result='';
	var stringLength = 5;
	for( var i = 0 ; i < stringLength ; i++ ) {
		result = result + char[Math.floor(Math.random()*26)];
	}
	return result;
}