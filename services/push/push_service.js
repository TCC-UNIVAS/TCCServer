var gcm = require('node-gcm');
var db = require('../../util/db_conn'); 

var gcmApiKey = 'AIzaSyDakLMlJip8_loQIUt-XnEq6kq5xQ-gYNk'; // GCM API KEY OF YOUR GOOGLE CONSOLE PROJECT
var device_tokens = [];
//device_tokens.push("c681jp-GCyU:APA91bHAYfg5pWVKHwKM7iaeaA9epfMwGMxE5LhnukF2SDh3gXNw6AUd1naVOnwvUHChMQQXRGFrsegckFOCiQq0RzUfjOju2Qvh4mqygsU9Q37uGYLmDXbGIoebUfZndcBxC5RTHM0j");


//send push message to all devices
var push = function(lat, lng, user) {
    db.query('call distance(?,?,?)',[lat,lng,user], function(err, rows){
        if (err)
            throw err;        
        
        console.log(rows[0]);
        console.log(rows.length);
        var rowString = JSON.stringify(rows);
        var rowJson = JSON.parse(rowString);
        console.log(rowJson + '\n\n');
        console.log(rowJson.token + '\n\n');
        console.log(rowJson[0].token + '\n\n');
        console.log(rowJson[0] + '\n\n');
        //  for(var i = 0; i < rowJson.length; i++){
        //          //var row = rowJson[i];
        //          console.log(rowJson.token );
        //          device_tokens.push(rowJson.token);
        // }
        // for(var i = 0; i < device_tokens.length; i++){
        //     console.log(device_tokens[i]);
        // }
    });

  


    /*
    var retry_times = 4; //the number of times to retry sending the message if it fails
    var sender = new gcm.Sender(gcmApiKey); //create a new sender
    var message = new gcm.Message(); //create a new message
    message.addData('title', 'Novo caso registrado');
    message.addData('message', 'Um novo caso foi registrado proximo a sua residencia ');
    message.addData('sound', 'default');
    message.collapseKey = 'Testing Push'; //grouping messages
    message.delayWhileIdle = true; //delay sending while receiving device is offline
    message.timeToLive = 999999; //number of seconds to keep the message on server if the device is offline

    //Take the registration id(lengthy string) that you logged
    //in your ionic v2 app and update device_tokens[0] with it for testing.
    //Later save device tokens to db and
    //get back all tokens and push to multiple devices

    sender.send(message, device_tokens, retry_times, function (result) {
        console.log('push sent to: ' + device_tokens);
        res.status(200).send('Pushed notification ' + device_tokens);
    }, function (err) {
        res.status(500).send('failed to push notification ');
    });
    */
};

module.exports.push = push;