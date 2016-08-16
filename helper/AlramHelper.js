exports.classifyAlram = function(args){
	var kind = {location : [] , like : [] , dislike : [] , reply: [] , re_reply: [] , like_reply: [] , like_re_reply: [] };
	for(var i = 0 ; i < args.length ; i++){
		switch(args[i].kind){
		case 0 : kind.location.push(args[i]); 
				 break;
		case 1 : kind.like.push(args[i]); 
		 break;
		 
		case 2 : kind.dislike.push(args[i]); 
		 break;
		 
		case 3 : kind.reply.push(args[i]); 
		 break;
		 
		case 4 : kind.re_reply.push(args[i]); 
		 break;
		 
		case 5 : kind.like_reply.push(args[i]); 
		 break;
		 
		case 6 : kind.like_re_reply.push(args[i]); 
		 break;
		}
	}
	return kind;
};

exports.addProfileUID  = function(addTarget , contentsArr , callback){
	console.log(addTarget);
	console.log(contentsArr);
	var MaxTextLength = 10;
	for(var i = 0 ; i < addTarget.location.length ; i++){
		addTarget.location[i].alramProfileUid = contentsArr[0][i].writer;
	}//location 정보처리
	
	for(var i = 0 ; i < addTarget.like.length ; i++){
		addTarget.like[i].alramProfileUid = contentsArr[1][i].uid;
	}//like 정보처리
	
	for(var i = 0 ; i < addTarget.dislike.length ; i++){
		addTarget.dislike[i].alramProfileUid = contentsArr[2][i].uid;
	}//dislike 정보처리
	
	for(var i = 0 ; i < addTarget.reply.length ; i++){
		addTarget.reply[i].alramProfileUid = contentsArr[3][i].writer;
		var temp = contentsArr[3][i].contents.substring(0,MaxTextLength) +'...';
		addTarget.reply[i].replyText = temp;
	}//reply 정보처리
	
	for(var i = 0 ; i < addTarget.re_reply.length ; i++){
		addTarget.re_reply[i].alramProfileUid = contentsArr[4][i].writer;
		var temp = contentsArr[4][i].contents.substring(0,MaxTextLength) +'...';
		addTarget.re_reply[i].re_replyText = temp;
	}//re_reply 정보처리
	
	for(var i = 0 ; i < addTarget.like_reply.length ; i++){
		addTarget.like_reply[i].alramProfileUid = contentsArr[5][i].belong_uid;
	}//like_reply 정보처리
	
	for(var i = 0 ; i < addTarget.like_re_reply.length ; i++){
		addTarget.dislike[i].alramProfileUid = contentsArr[6][i].belong_uid;
	}//like_re_reply 정보처리
	
	callback(null , addTarget);
}