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
	mailOption.html = '<div>'+
    '<img class="navbar-brand page-scroll" src="http://52.78.18.19/img/web_logo.png"/>'+
    '</div>'+
	    '</div>'+
	    '<div>'+
	        '<h1 align="center">이메일 인증을 위한 링크입니다.</h1>'+
			'<hr>'+
			'<h3 align="center">이메일은 경품 수령 절차 확인 외 사용되지 않습니다.</h3>'+
	        '<div>'+
	            '<table border="0" cellspacing="0" cellpadding="0" style="width=100%; margin:auto; text-align:center;">'+
				  '<tr>'+
				    '<td>'+
				      '<table border="0" cellspacing="0" cellpadding="0">'+
				        '<tr>'+
				          '<td style="-webkit-border-radius: 3px; text-align: center; vertical-align: middle; -moz-border-radius: 3px; border-radius: 3px;" bgcolor="#004063"><a href="http://52.78.18.19/verify/?'+encryptedSessionId+'" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; padding: 12px 18px; border: 1px solid #e9703e; display: inline-block;">인증하기 &rarr;</a></td>'+
				        '</tr>'+
				      '</table>'+
				    '</td>'+
				  '</tr>'+
				'</table>'+
	    '</div>';
	emailTransport.sendMail(mailOption , function(err , info){
		if(err){
			console.log(err);
		} else{
			console.log(info);
		}
	});
}

exports.makeFbVerifyEmail = function(email , FbId){
	mailOption.to = email;
	mailOption.subject='[IDBD] 이메일 인증을 위한 링크가 발급 되었습니다.';
	mailOption.html = '<div>'+
    '<img class="navbar-brand page-scroll" src="http://52.78.18.19/img/web_logo.png"/>'+
    '</div>'+
	    '</div>'+
	    '<div>'+
	        '<h1 align="center">이메일 인증을 위한 링크입니다.</h1>'+
			'<hr>'+
			'<h3 align="center">이메일은 경품 수령 절차 확인 외 사용되지 않습니다.</h3>'+
	        '<div>'+
	            '<table border="0" cellspacing="0" cellpadding="0" style="width=100%; margin:auto; text-align:center;">'+
				  '<tr>'+
				    '<td>'+
				      '<table border="0" cellspacing="0" cellpadding="0">'+
				        '<tr>'+
				          '<td style="-webkit-border-radius: 3px; text-align: center; vertical-align: middle; -moz-border-radius: 3px; border-radius: 3px;" bgcolor="#004063"><a href="http://52.78.18.19/emailverify_Fb?FbId='+FbId+'&email='+email +'" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; padding: 12px 18px; border: 1px solid #e9703e; display: inline-block;">인증하기 &rarr;</a></td>'+
				        '</tr>'+
				      '</table>'+
				    '</td>'+
				  '</tr>'+
				'</table>'+
	    '</div>';
	emailTransport.sendMail(mailOption , function(err , info){
		if(err){
			console.log(err);
		} else{
			console.log(info);
		}
	});
}

exports.makeUserPhoneEmail = function(phoneNum , pName , uid){
	mailOption.to = 'sendwitch.co@gmail.com';
	mailOption.subject='당첨자가 생겼습니다.';
	mailOption.html = '<p>당첨자 핸드폰 번호 : '+phoneNum+'</p>' + '<p>당첨 상품 : '+pName+'</p>' + '<p>uid : '+uid+'</p>';
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






exports.makeWonEmail = function(email ,url, pid , pName , callback){
	mailOption.to = email;
	mailOption.subject='[IDBD] 축하합니다. 당첨 되었습니다.';
	var email = EncryptHelper.encryptEmail(email);// 이걸로 이메일 온사람 확인시킬것
	mailOption.html =
	        '<div>'+
	                '<img class="navbar-brand page-scroll" src="http://52.78.18.19/img/web_logo.png"/>'+
	        '</div>'+
	            '<div>'+
	                '<h1 id="homeHeading">'+pName+'의 당첨을 축하드립니다.</h1>'+
					'<hr>'+
	                '<div>'+
		                '<div>'+
		                	'<p><img  class="img-responsive" src="https://s3.ap-northeast-2.amazonaws.com/sendwitchtracer/'+url+'"/></p>'+
		                '</div>'+
		                '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width=100%; margin:auto; text-align:center;">'+
						  '<tr>'+
						    '<td>'+
						      '<table border="0" cellspacing="0" cellpadding="0">'+
						        '<tr>'+
						          '<td align="center" style="-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;" bgcolor="#004063"><a href="http://52.78.18.19/phone/'+pid+"/?"+email+'" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; padding: 12px 18px; border: 1px solid #e9703e; display: inline-block;">링크를 눌러 수령을 진행해 주세요 &rarr;</a></td>'+
						        '</tr>'+
						      '</table>'+
						    '</td>'+
						  '</tr>'+
						'</table>'+
	            '</div>';


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
