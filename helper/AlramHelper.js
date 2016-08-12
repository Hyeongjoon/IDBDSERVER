exports.classifyAlram = function(args){
	var kind = {'0': [] , '1' : [] , '2': [] , '3': [] , '4': [] , '5': [] , '6': [] };
	for(var i = 0 ; i < args.length ; i++){
		switch(args[i].kind){
		case 0 : kind.0.push(args[i]); 
				 break;
		case 1 : kind.1.push(args[i]); 
		 break;
		 
		case 2 : kind.2.push(args[i]); 
		 break;
		case 3 : kind.3.push(args[i]); 
		 break;
		case 4 : kind.4.push(args[i]); 
		 break;
		case 5 : kind.5.push(args[i]); 
		 break;
		case 6 : kind.6.push(args[i]); 
		 break;
		}
	}
	console.log(kind);
};