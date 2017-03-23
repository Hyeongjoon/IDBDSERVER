function goSubmit(encryptEmail){
	alert(encryptEmail);
	var phoneExp =  /^[0-9]{6,15}$/;
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
					encryptEmail : encrytEmail 
			},
			success: function(result) {
				if(result==false || result == undefined){
					$('#common-modal-title').text('서버 오류');
					$('#common-modal-content').text('잠시후에 사용해 주세요');
					$('#common-modal').modal('show');
				} else {
					$('#common-modal-title').text('입력 오류');
					$('#common-modal-content').text('정확한 핸드폰 번호를 입력해 주세요');
					$('#common-modal').modal('show');
				}
			}
		});
	}
}