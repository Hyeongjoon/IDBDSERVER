function commit(token){
	var code = $('#code_input').val();
	$.ajax({url: 'http://idbd.co.kr/confirm/' + token,
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
				} else if(result['content'] == 'won'){
					$('#suc-modal-title').text('당첨 되었습니다.');
					var temp = "당첨된 상품을 수령하기 위해선 로그인이 필요합니다. 로그인후에 다시 입력해 주세요!!!" + "<br/>";
					temp= temp + "상품명 : " +result['name'];
					$('#suc-modal-content').html(temp);
					$('#suc-modal').modal('show');
				} else {
					$('#modal-title').text('서버 오류');
					$('#modal-content').text('내부 서버 오류입니다. 잠시후에 이용해 주세요');
					$('#modal').modal('show');
				}
			} else {
				$('#modal-title').text('당첨 되었습니다.');
				$('#modal-content').text('당첨 상품 결과와 상품수령 절차를 진행하기 위한 메일이 전송되었습니다.');
				$('#modal').modal('show');
			}
		}
	});
};

function mining(){
	var codeExp =  /^[0-9]{4}$/;
	if(!codeExp.test($("#code_input").val())){
		$("#modal-title").text("코드 오류");
		$("#modal-content").text("0000 ~ 9999로 입력해 주세요");
		$("#modal").modal('show');
	} else{
		var user = firebase.auth().currentUser;
		var token = "asd";
		if (user) {
			firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
				  commit(idToken)
				}).catch(function(error) {
					location.replace("/invaild");
				});
		} else{
			commit(token);
		}	
	}
}

$(document).ready(function(){
	$("#code_random").on('click' , function(){
		var code = "";
		for(var i = 0 ; i < 4 ; i++){
			code = code + Math.floor(Math.random() * 10);
		}
		$("#code_input").val(code);
	});
	
	$("#code_input").keypress(function(e){
		if(e.which==13){
			mining();
		}
	});
	
	$("#mining_btn").on('click' , function(){
		mining();
	});
});