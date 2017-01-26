var express = require('express');
var router = express.Router();

var https = require('https');

var options = {
		  hostname: 'android.googleapis.com',
		  path: '/gcm/notification',
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
			'Authorization':'key=AAAAe5dZOPA:APA91bGB7cKW4yQLivtOYmGdJUle7KV00Tu6jQXGZqeABbOGaJciMKYVANxAFEtG0-fQF_mg2U3MPGpGnOdW7MxYPOo5sdHUoK3eagFGXowoCz1-V_Fe3x4FvRXaPAHNYvqDUHlpiQz3',
			'project_id':'530820184304'
		  }
		  
		};

var tempoptions = {
		  hostname: 'fcm.googleapis.com',
		  path: '/fcm/send',
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
			'Authorization':'key=AAAAe5dZOPA:APA91bGB7cKW4yQLivtOYmGdJUle7KV00Tu6jQXGZqeABbOGaJciMKYVANxAFEtG0-fQF_mg2U3MPGpGnOdW7MxYPOo5sdHUoK3eagFGXowoCz1-V_Fe3x4FvRXaPAHNYvqDUHlpiQz3'
		  }
		}; 

router.get('/' , function(request , response, next){
	var req = https.request(tempoptions, function(res) {
		  console.log('Status: ' + res.statusCode);
		  console.log('Headers: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (body) {
		    console.log('Body: ' + body);
		  });
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});
		req.write(
				'{'+
			   '"to": "APA91bGOlOPKxcT-QIOvIhPhfZtDRB8eJTkozcltea_i6XjJa73U_Qz-5J72IEbicwgpNX54RRcxOddiHSbUaSxu-ZznfZTDesgY91mmr0hscFm8xRn4CaI",'+
				'"notification": {'+
				'"title": "Portugal vs. Denmark",'+
				    '"text": "5 to 1"'+
				  '}}'
			);
		req.end();
		response.send("ads");
});
				
module.exports = router;