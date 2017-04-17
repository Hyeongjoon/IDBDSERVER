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
						$("#modal-title").text("회원탈퇴 실패");
						$("#modal-content").text("내부 서버오류입니다. 잠시후에 다시 시도해주세요");
						$('#modal').modal();
					}
				}
			});
			}).catch(function(error) {
				location.replace("/invaild");
			});
	});
});