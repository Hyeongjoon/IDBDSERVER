
exports.mysql = {
		host : 'superstar.cakmmqoiibzo.ap-northeast-2.rds.amazonaws.com',
		user : 'Hyeongjoon',
		database : 'tracer',
		password : '7557523m',
		port : '3306'
};

//exports.socketIODomain = "192.168.0.6";

exports.google_place_apikey = 'AIzaSyAvIRqfsgaawrUYCzpvMbka71o37gSyVkU';

/*exports.redisConfig = {
		host : '127.0.0.1',
		port : '6379'
};*/

exports.secretKey = 'NodeSibal';
	
exports.sessionKey = 'sid';

exports.dbSecretKey = 'akwWkdwkfEmsi';
	
exports.emailSecretKey = 'audclakwdmffo';

exports.emailConfig = {
						host : 'smtp.gmail.com' ,
						port :465,
						secure : true,
						auth : {
								user : 'sendwitch.co@gmail.com',
								pass : '7557523m'
							}
						};

exports.awsS3UploadConfig = {
		Bucket : 'sendwitchtracer',
		Key : 'tmptmp.png',
		ACL : 'public-read-write',
		Body : '',
		ContentType : 'image/png'	
};

exports.awsS3GetConfig = {
	Bucket : 'sendwitchtracer',
	Key : 'temp123.png'
		
};