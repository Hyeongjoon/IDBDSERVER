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
	mailOption.subject='[IDBD] 이메일 인증을 위한 링크가 발급 되었습니다.';
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
	mailOption.subject='[IDBD] 비밀번호를 찾기 위한 코드가 발급되었습니다.';
	mailOption.html = '<p>'+code+'</p>';
	emailTransport.sendMail(mailOption , function(err , info){
		if(err){
			console.log(err);
		} else{
			console.log(info);
		}
	});
}

exports.makeWonEmail = function(email ,url , callback){
	mailOption.to = email;
	mailOption.subject='[IDBD] 축하합니다. 당첨 되었습니다.';
	var email = EncryptHelper.encryptEmail(email);// 이걸로 이메일 온사람 확인시킬것
	var pid = EncryptHelper.encryptEmail(pid);
	mailOption.html ='<p>당첨된 상품입니다</p><img src="https://s3.ap-northeast-2.amazonaws.com/sendwitchtracer/'+url+'"/>'+
	'<a href="http://52.78.18.19/phone/?'+email+"/?"+pid+'">링크를 눌러 수령을 진행해 주세요</a>';
	emailTransport.sendMail(mailOption , function(err , info){
		if(err){
			console.log(err);
			callback('server' , null);
		} else{
			console.log(info);
			callback(null , true);
		}
	});
}