
$(document).ready(function(){
	$("#code_random").on('click' , function(){
		var code = "";
		for(var i = 0 ; i < 4 ; i++){
			code = code + Math.floor(Math.random() * 10);
		}
		$("#code_input").val(code);
	});
	
	$("#mining_btn").on('click' , function(){
		var codeExp =  /^[0-9]{4}$/;
		if(!codeExp.test($("#code_input").val())){
			$("#modal-title").text("코드 오류");
			$("#modal-content").text("0000 ~ 9999로 입력해 주세요");
			$("#modal").modal('show');
		} else{
			firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
				var code = $('#code_input').val();
				$.ajax({url: 'http://idbd.co.kr/confirm/'+ idToken,
					dataType: 'json',
					type: 'POST',
					data: {
							code : code
					},
					success: function(result) {
						if(result['result']=='false'){
							if(result['content']=='non'){
								$('#modal-title').text('Retry');
								var temp = "남아 있는 item list" + "<br/>";
								for(var i = 0 ; i < result['list'].length ; i++){
									temp = temp + result['list'][i].pname + "<br/>";
								}
								$('#modal-content').html(temp);
								$('#modal').modal('show');
							} else if(result['content'] == 'selected'){
								$('#modal-title').text('Retry');
								$('#modal-content').text('당첨이 완료된 상품입니다. ㅠㅠ 아쉽지만 다른 번호를 입력해 주세요');
								$('#modal').modal('show');
							} else {
								$('#modal-title').text('서버 오류');
								$('#modal-content').text('내부 서버 오류입니다. 잠시후에 이용해 주세요');
								$('#modal').modal('show');
							}
						} else {
							$('#modal-title').text('전송 완료');
							$('#modal-content').text('본인 확인을 위해 1 ~ 2일 이내 연락을 드리겠습니다.');
							$('#modal').modal('show');
						}
					}
				});
				}).catch(function(error) {
					location.replace("/invaild");
				});
		}
	});
});