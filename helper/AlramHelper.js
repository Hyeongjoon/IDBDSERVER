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