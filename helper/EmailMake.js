var EncryptHelper = require('../helper/EncryptHelper.js');
var email = require('nodemailer');
var config = require('../helper/config.js');

var emailTransport = email.createTransport(config.emailConfig);




var mailOption = {
		from : '"sendwitch" <sendwitch.co@gmail.com>',
		to : '',
		subject : '인증메일입니당',
		html : ''
}


exports.makeEmail = function(email){
	mailOption.to = email;
	var encryptedEmail = EncryptHelper.encryptEmail(email).toString();
	mailOption.html = '<a href="http://52.78.18.19/verify/'+encryptedEmail+'">인증하기</a>';
	emailTransport.sendMail(mailOption , function(err , info){
		if(err){
			return console.log(err);
		}
		console.log(info.response);
	});
}