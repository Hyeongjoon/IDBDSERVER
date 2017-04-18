function modify(token){
	if($('#modify_pw').val().length<8 ||$('#modify_pw').val().length>16){
		$("#modal-title").text("비밀번호 입력오류");
		$("#modal-content").text("비밀번호는 8자리 이상 16자리 이하로 설정해주세요.");
		$('#modal').modal();
	} else if(!($("#modify_pw").val()==$("#modify_pw_confirm").val())){
		$("#modal-title").text("비밀번호 입력오류");
		$("#modal-content").text("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		$('#modal').modal();
	} else{
		$.ajax({
			url: 'http://idbd.co.kr/modify_pwd/'+token,
			dataType: 'json',
			type: 'POST',
			data: {
					'pwd' : $("#modify_pw").val(),
					'pwd_con' : $("#modify_pw_confirm").val()
			},
			success: function(result) {
			if (result['result'] == true) {
					location.replace("/modify_pwd/suc");
				} else {
					$("#modal-title").text("비밀번호 변경 실패");
					$("#modal-content").text("비밀번호 변경에 실패 했습니다. 잠시후에 시도해 주세요");
					$('#modal').modal();
				}
			}
		});
	}
}
 