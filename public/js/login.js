function login(){
	var emailRegExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if(!emailRegExp.test($("#email").val())){
		$("#modal-title").text("이메일 입력 오류");
		$("#modal-content").text("올바른 이메일을 입력해 주세요.");
		$('#modal').modal();
	} else if($('#pwd').val().length==0){
		$("#modal-title").text("비밀번호 입력 오류");
		$("#modal-content").text("비밀번호를 입력해 주세요.");
		$('#modal').modal();
	} else{
		$.ajax({
			url: 'http://idbd.co.kr/login',
			dataType: 'json',
			type: 'POST',
			data: {
					'email': $("#email").val(),
					'pwd' : $("#pwd").val(),
					'web' : true
			},
			success: function(result) {
			if (result['result'] == 'success') {
				location.replace("/");
				} else {
					$("#modal-title").text("로그인 실패");
					$("#modal-content").text(result['content']);
					$('#modal').modal();
				}
			}
		});
	}
}



$(document).ready(function(){
	
	$('#email').keypress(function(e) {
		if (e.which == 13) {/* 13 == enter key@ascii */
			login();
		}
	});
	
	$('#pwd').keypress(function(e) {
		if (e.which == 13) {/* 13 == enter key@ascii */
			login();
		}
	});
	
	
	$("#call_sign_up_modal").on('click' , function(){
		$("#sign_up_modal").modal();
	});
	
	var emailRegExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	
	$("#sign_up").on('click' , function(){
		if(!emailRegExp.test($("#sign_email").val())){
			$("#modal-title").text("이메일 입력오류");
			$("#modal-content").text("올바른 이메일을 입력해 주세요.");
			$('#modal').modal();
		} else if($('#sign_name').val().length==0 ||$('#sign_name').val().length>30) {
			$("#modal-title").text("이름 입력오류");
			$("#modal-content").text("이름은 30자이하로 해주세요.");
			$('#modal').modal();
		} else if($('#sign_pw').val().length<8 ||$('#sign_pw').val().length>16){
			$("#modal-title").text("비밀번호 입력오류");
			$("#modal-content").text("비밀번호는 8자리 이상 16자리 이하로 설정해주세요.");
			$('#modal').modal();
		} else if(!($("#sign_pw").val()==$("#sign_pw_confirm").val())){
			$("#modal-title").text("비밀번호 입력오류");
			$("#modal-content").text("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
			$('#modal').modal();
		} else if(!$("input:checkbox[id=service]").is(":checked")){
			$("#modal-title").text("오류");
			$("#modal-content").text("서비스 이용약관에 동의하셔야 합니다.");
			$('#modal').modal();
		} else if(!$("input:checkbox[id=individual]").is(":checked")){
			$("#modal-title").text("오류");
			$("#modal-content").text("개인정보 이용약관에 동의하셔야 합니다.");
			$('#modal').modal();}
		else{
			$.ajax({
				url: 'http://idbd.co.kr/signUp',
				dataType: 'json',
				type: 'POST',
				data: {
						'email': $("#sign_email").val(),
						'pwd' : $("#sign_pw").val(),
						'pwd_con' : $("#sign_pw_confirm").val(),
						'name' : $("#sign_name").val()
				},
				success: function(result) {
				if (result['result'] == 'success') {
						location.replace("/mail_send");
					} else {
						$("#modal-title").text("회원가입 실패");
						$("#modal-content").text(result['content']);
						$('#modal').modal();
					}
				}
			});
		}
	});
});