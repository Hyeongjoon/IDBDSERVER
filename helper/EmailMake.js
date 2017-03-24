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


'<!DOCTYPE html>'+
'<html lang="kr">'+
'<head>'+
    '<meta charset="utf-8">'+
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<meta name="description" content="">'+
    '<meta name="author" content="">'+

    '<title>IDBD</title>'+

    '<!-- Bootstrap Core CSS -->'+
    '<link href="http://52.78.18.19/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">'+

    '<!-- Custom Fonts -->'+
    '<link href="http://52.78.18.19/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">'+
    '<link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">'+
    '<link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic" rel="stylesheet" type="text/css">'+
    '<!-- Plugin CSS -->'+
    '<link href="http://52.78.18.19/vendor/magnific-popup/magnific-popup.css" rel="stylesheet">'+
    '<!-- Theme CSS -->'+
    '<link href="http://52.78.18.19/css/creative.css" rel="stylesheet">'+
    '<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->'+
    '<!-- WARNING: Respond.js doesn`t work if you view the page via file -->'+
    '<!--[if lt IE 9]>'+
        '<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>'+
        '<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>'+
    '<![endif]-->'+

'</head>'+

'<body id="page-top">'+

    '<nav id="mainNav" class="navbar navbar-default navbar-fixed-top">'+
        '<div class="container-fluid">'+
            '<!-- Brand and toggle get grouped for better mobile display -->'+
            '<div class="navbar-header">'+
                '<img class="navbar-brand page-scroll" src="http://52.78.18.19/img/web_logo.png"/>'+
            '</div>'+
            '<!-- /.navbar-collapse -->'+
        '</div>'+
        '<!-- /.container-fluid -->'+
    </nav>
    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1 id="homeHeading"><%=pName%>의 당첨을 축하드립니다.</h1>
				<hr>
                <div class="row">
	                <div class="col-md-4">
	                	<p><img  class="img-responsive" src="https://s3.ap-northeast-2.amazonaws.com/sendwitchtracer/<%=url%>"/></p>
	                </div>
	                <button type="button" class="btn btn-primary btn-xl" onclick="goSubmit('<%=encryptEmail%>' , '<%=pid%>')">제출</button>
                </div>
            </div>
        </div>
    </header>
    
    <!-- jQuery -->
    <script src="/vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="/vendor/scrollreveal/scrollreveal.min.js"></script>
    <script src="/vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
	
    <!-- Theme JavaScript -->
    <script src="/js/creative.min.js"></script>

</body>

</html>



exports.makeWonEmail = function(email ,url, pid , pName , callback){
	mailOption.to = email;
	mailOption.subject='[IDBD] 축하합니다. 당첨 되었습니다.';
	var email = EncryptHelper.encryptEmail(email);// 이걸로 이메일 온사람 확인시킬것
	mailOption.html ='<p> '+ pName+ ' 당첨을 축하드립니다.</p><img src="https://s3.ap-northeast-2.amazonaws.com/sendwitchtracer/'+url+'"/>'+
	'<a href="http://52.78.18.19/phone/'+pid+"/?"+email+'">링크를 눌러 수령을 진행해 주세요</a>';
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