function goSubmit(encryptEmail , pid){
	var phoneExp =  /^[0-9]{10,11}$/;
	if(!phoneExp.test($('#phone_num').val())){
		$('#common-modal-title').text('입력 오류');
		$('#common-modal-content').text('정확한 핸드폰 번호를 입력해 주세요');
		$('#common-modal').modal('show');
	} else{
		var phone_num = $('#phone_num').val();
		$.ajax({url: 'http://52.78.18.19/confirm',
			dataType: 'json',
			type: 'POST',
			data: {
					phone_num : phone_num,
					encryptEmail : encryptEmail,
					pid : pid
			},
			success: function(result) {
				if(result==false){
					$('#common-modal-title').text('전송이 이미 완료되었습니다.');
					$('#common-modal-content').text('본인 확인을 위해 1 ~ 2일 이내 연락을 드리겠습니다.');
					$('#common-modal').modal('show');
				} else {
					$('#common-modal-title').text('전송 완료');
					$('#common-modal-content').text('본인 확인을 위해 1 ~ 2일 이내 연락을 드리겠습니다.');
					$('#common-modal').modal('show');
				}
			}
		});
	}
}

function logout(){
	firebase.auth().signOut().then(function() {
		  location.replace("/logout");
		}, function(error) {
			location.replace("/fail");
		});
}