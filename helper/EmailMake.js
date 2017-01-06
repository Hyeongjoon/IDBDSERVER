var EncryptHelper = require('../helper/EncryptHelper.js');
var email = require('nodemailer');
var config = require('../helper/config.js');

var emailTransport = email.createTransport(config.emailConfig);


var mailOption = {
		from : '"sendwitch" <sendwitch.co@gmail.com>',
		to : '',
		subject : '',
		html : ''
}


exports.makeEmail = function(email , sessionId){
	mailOption.to = email;
	mailOption.subject='[campoint] 이메일 인증을 위한 링크가 발급 되었습니다.';
	var encryptedSessionId = EncryptHelper.encryptEmail(sessionId);
	mailOption.html = '<a href="http://52.78.18.19/verify/?'+encryptedSessionId+'">인증하기</a>';
	emailTransport.sendMail(mailOption , function(err , info){
		if(err){
			console.log(err);
		} else{
			console.log(info);
		}
	});
}

exports.makeFindPwdEmail = function(email , code){
	mailOption.to = email;
	mailOption.subject='[campoint] 비밀번호를 찾기 위한 코드가 발급되었습니다.';
	mailOption.html = '<p>'+code+'</p>';
	emailTransport.sendMail(mailOption , function(err , info){
		if(err){
			console.log(err);
		} else{
			console.log(info);
		}
	});
}