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
	var tempProfileUid = [];
	for(var i = 0 ; i < addTarget.location.length ; i++){
		addTarget.location[i].alramProfileUid = contentsArr[0][i].writer;
		tempProfileUid.push(contentsArr[0][i].writer);
	}//location 정보처리
	
	for(var i = 0 ; i < addTarget.like.length ; i++){
		addTarget.like[i].alramProfileUid = contentsArr[1][i].uid;
		tempProfileUid.push(contentsArr[1][i].uid);
	}//like 정보처리
	
	for(var i = 0 ; i < addTarget.dislike.length ; i++){
		addTarget.dislike[i].alramProfileUid = contentsArr[2][i].uid;
		tempProfileUid.push(contentsArr[2][i].uid);
	}//dislike 정보처리
	
	for(var i = 0 ; i < addTarget.reply.length ; i++){
		addTarget.reply[i].alramProfileUid = contentsArr[3][i].writer;
		var temp = contentsArr[3][i].contents.substring(0,MaxTextLength) +'...';
		addTarget.reply[i].replyText = temp;
		tempProfileUid.push(contentsArr[3][i].writer);
	}//reply 정보처리
	
	for(var i = 0 ; i < addTarget.re_reply.length ; i++){
		addTarget.re_reply[i].alramProfileUid = contentsArr[4][i].writer;
		var temp = contentsArr[4][i].contents.substring(0,MaxTextLength) +'...';
		addTarget.re_reply[i].re_replyText = temp;
		tempProfileUid.push(contentsArr[4][i].writer);
	}//re_reply 정보처리
	
	for(var i = 0 ; i < addTarget.like_reply.length ; i++){
		addTarget.like_reply[i].alramProfileUid = contentsArr[5][i].belong_uid;
		tempProfileUid.push(contentsArr[5][i].belong_uid);
	}//like_reply 정보처리
	
	for(var i = 0 ; i < addTarget.like_re_reply.length ; i++){
		addTarget.dislike[i].alramProfileUid = contentsArr[6][i].belong_uid;
		tempProfileUid.push(contentsArr[6][i].belong_uid);
	}//like_re_reply 정보처리
	
	callback(null , addTarget , tempProfileUid);
}

exports.finalAlramInfo = function(nameArr , profileArr , alramInfo){
	console.log(nameArr);
	console.log(profileArr);
	for(var i = 0 ; i <alramInfo.location.length ; i++){
		for(var j = 0 ; j < nameArr.length ; j++){
			if(alramInfo.location[i].alramProfileUid == nameArr[j].uid){
				alramInfo.location[i].alramName =  nameArr[j].name;
				break;
			}
		}
		for(var j = 0 ; j < profileArr.length ; j++){
			if(alramInfo.location[i].alramProfileUid == profileArr[j].uid){
				alramInfo.location[i].profile =  profileArr[j].profile;
				break;
			}
		}
	}
	
	for(var i = 0 ; i <alramInfo.like.length ; i++){
		for(var j = 0 ; j < nameArr.length ; j++){
			if(alramInfo.like[i].alramProfileUid == nameArr[j].uid){
				alramInfo.like[i].alramName =  nameArr[j].name;
				break;
			}
		}
		for(var j = 0 ; j < profileArr.length ; j++){
			if(alramInfo.like[i].alramProfileUid == profileArr[j].uid){
				alramInfo.like[i].profile =  profileArr[j].profile;
				break;
			}
		}
	}
	
	for(var i = 0 ; i <alramInfo.dislike.length ; i++){
		for(var j = 0 ; j < nameArr.length ; j++){
			if(alramInfo.dislike[i].alramProfileUid == nameArr[j].uid){
				alramInfo.dislike[i].alramName =  nameArr[j].name;
				break;
			}
		}
		for(var j = 0 ; j < profileArr.length ; j++){
			if(alramInfo.dislike[i].alramProfileUid == profileArr[j].uid){
				alramInfo.dislike[i].profile =  profileArr[j].profile;
				break;
			}
		}
	}
	
	for(var i = 0 ; i <alramInfo.reply.length ; i++){
		for(var j = 0 ; j < nameArr.length ; j++){
			if(alramInfo.reply[i].alramProfileUid == nameArr[j].uid){
				alramInfo.reply[i].alramName =  nameArr[j].name;
				break;
			}
		}
		for(var j = 0 ; j < profileArr.length ; j++){
			if(alramInfo.reply[i].alramProfileUid == profileArr[j].uid){
				alramInfo.reply[i].profile =  profileArr[j].profile;
				break;
			}
		}
	}
	
	for(var i = 0 ; i <alramInfo.re_reply.length ; i++){
		for(var j = 0 ; j < nameArr.length ; j++){
			if(alramInfo.re_reply[i].alramProfileUid == nameArr[j].uid){
				alramInfo.re_reply[i].alramName =  nameArr[j].name;
				break;
			}
		}
		for(var j = 0 ; j < profileArr.length ; j++){
			if(alramInfo.re_reply[i].alramProfileUid == profileArr[j].uid){
				alramInfo.re_reply[i].profile =  profileArr[j].profile;
				break;
			}
		}
	}
	
	for(var i = 0 ; i <alramInfo.like_reply.length ; i++){
		for(var j = 0 ; j < nameArr.length ; j++){
			if(alramInfo.like_reply[i].alramProfileUid == nameArr[j].uid){
				alramInfo.like_reply[i].alramName =  nameArr[j].name;
				break;
			}
		}
		for(var j = 0 ; j < profileArr.length ; j++){
			if(alramInfo.like_reply[i].alramProfileUid == profileArr[j].uid){
				alramInfo.like_reply[i].profile =  profileArr[j].profile;
				break;
			}
		}
	}
	
	for(var i = 0 ; i <alramInfo.like_re_reply.length ; i++){
		for(var j = 0 ; j < nameArr.length ; j++){
			if(alramInfo.like_re_reply[i].alramProfileUid == nameArr[j].uid){
				alramInfo.like_re_reply[i].alramName =  nameArr[j].name;
				break;
			}
		}
		for(var j = 0 ; j < profileArr.length ; j++){
			if(alramInfo.like_re_reply[i].alramProfileUid == profileArr[j].uid){
				alramInfo.like_re_reply[i].profile =  profileArr[j].profile;
				break;
			}
		}
	}
	console.log(alramInfo);
	return;
} 