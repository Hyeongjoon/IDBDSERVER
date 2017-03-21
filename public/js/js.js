$(document).ready(function(){
	$('#free_register').on('click' , function(){
		if($('#input-title').val().trim().length==0){
			$('#common-modal-title').text('입력 오류');
			$('#common-modal-content').text('제목을 입력해 주세요');
			$('#common-modal').modal('show');
		} else if($('#input-content').val().trim().length==0){
			$('#common-modal-title').text('입력 오류');
			$('#common-modal-content').text('내용을 입력해 주세요');
			$('#common-modal').modal('show');
		} else{
			var tmp = $('#input-content').val().trim();
			tmp = tmp.replace(/\n/g, '<br/>');
			tmp = tmp.replace(/\s/g, '&nbsp;');
			
			$.ajax({url: 'http://52.78.208.137/commu/free_register',
				dataType: 'json',
				type: 'POST',
				data: {
						'title': $('#input-title').val().trim(),
						'content': tmp
				},
				success: function(result) {
					if(result==false || result == undefined){
						
					} else {
						location.replace("/commu?tab=1");
					}
				}
			});
		}
	});
});