 function verify(){
    	var user = firebase.auth().currentUser;
    	if (user) {
    		var emailRegExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			  if(!emailRegExp.test($('#email').val())){
				$("#modal-title").text("이메일 입력오류");
				$("#modal-content").text("올바른 이메일을 입력해 주세요.");
				$('#modal').modal();
			  } else{ 
				  $.ajax({url: 'http://idbd.co.kr/emailverify',
						dataType: 'json',
						type: 'POST',
						data: {
								token : user.ld,
								email :$('#email').val() 
						},
						success: function(result) {
							if(result['result']==false){
								$('#modal-title').text('이메일 오류');
								$('#modal-content').text(result['content']);
								$('#modal').modal('show');
							} else {
								location.replace('/mail_send');
							}
						}
					});
			  }
    	} else {
    		location.replace("/invaild");
    	}
	}
 
 $(document).ready(function(){
		$("#email").keypress(function(e){
			if(e.which==13){
				verify();
			}
		});
});