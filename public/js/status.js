$(document).ready(function(){
	$("#delete_id").on('click' , function(){
		$("#modal-title").text("회원 탈퇴");
		$("#modal-content").text("정말로 탈퇴하시겠습니까?? ㅠㅠ");
		$('#modal').modal();
	});
	
	$("#modal_delete_id_btn").on('click' , function(){
		firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
			$.ajax({
				url: 'http://idbd.co.kr/delete/'+idToken,
				dataType: 'json',
				type: 'POST',
				data: {
					
				},
				success: function(result) {
				if (result['result'] == true) {
						location.replace("/logout");
					} else {
						$("#com-modal-title").text("회원탈퇴 실패");
						$("#com-modal-content").text("내부 서버오류입니다. 잠시후에 다시 시도해주세요");
						$('#com-modal').modal();
					}
				}
			});
			}).catch(function(error) {
				location.replace("/invaild");
			});
	});
	
	
	$("#change_pwd_btn").on('click' , function(){
		$('#change_modal').modal();
	});
	
	$("#confirm_btn").on('click' , function(){
		if($('#confirm_pwd').val().length==0){
			$("#com-modal-title").text("비밀번호 입력 오류");
			$("#com-modal-content").text("비밀번호를 제대로 입력해 주세요");
			$('#com-modal').modal();
		} else{
			$('#change_modal').modal('hide');
			var temp = $("#confirm_pwd").val();
			$("#confirm_pwd").val('');
			firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
				$.ajax({
					url: 'http://idbd.co.kr/status/change_pwd/'+idToken,
					dataType: 'json',
					type: 'POST',
					data: {
						pwd : temp
					},
					success: function(result) {
					if (result['result'] == 'true') {
							$("#com-modal-title").text("메일 발송");
							$("#com-modal-content").text("비밀번호 변경 이메일이 발송되었습니다.");
							$('#com-modal').modal();
						} else {
							$("#com-modal-title").text("비밀번호 오류");
							$("#com-modal-content").text("비밀번호가 일치하지 않습니다.");
							$('#com-modal').modal();
						}
					}
				});
		}).catch(function(error) {
			location.replace("/invaild");
		});
		}
	});
	
});