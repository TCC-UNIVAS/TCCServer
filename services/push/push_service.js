var gcm = require('node-gcm');
var db = require('../../util/db_conn');

var gcmApiKey = 'AIzaSyDakLMlJip8_loQIUt-XnEq6kq5xQ-gYNk'; // GCM API KEY OF GOOGLE CONSOLE PROJECT
var device_tokens = [];

//send push message to all devices
var push = function(lat, lng, user) {
    //db.query('call distance(?,?,?)',[lat,lng,user], function(err, rows){
     db.query('SELECT user.user_id, user.token FROM user  WHERE ((( ACOS( COS( ( 90 - ? ) * PI() / 180 ) * ' +
     'COS( ( 90 - user.lat ) * PI() / 180 ) + SIN( ( 90 - ? ) * PI() / 180 ) * SIN( ( 90 - user.lat ) * ' +
      'PI() / 180 ) * COS( ABS( ( ( 360 + ? ) * PI() / 180 ) - ( ( 360 + user.lng ) * PI() / 180 ) ) ) ) ) * ' +
      '6371.004 ) * 1000) < 800 and ? != user.user_id;', [lat, lat, lng, user], function(err, rows){
        if (err)
            throw err;

        console.log(rows.length + ' registros retornados');

        console.log('user\'s tokens');
        for(var i = 0; i < rows.length; i++){
                 //var row = rowJson[i];
                 console.log(rows[i].token + '\n' );
                 device_tokens.push(rows[i].token);
        }
    });

    var retry_times = 4; //the number of times to retry sending the message if it fails
    var sender = new gcm.Sender(gcmApiKey); //create a new sender
    var message = new gcm.Message(); //create a new message
    message.addData('title', 'Novo caso registrado');
    message.addData('message', 'Um novo caso foi registrado proximo a sua residencia ');
    message.addData('sound', 'default');
    // message.addData('actions', [
    //     { "icon": "emailGuests", "title": "VISUALIZAR", "callback": "app.openCloseCases", "foreground": false, "inline": true},
    // ]);
    message.collapseKey = 'Testing Push'; //grouping messages
    message.delayWhileIdle = true; //delay sending while receiving device is offline
    message.timeToLive = 999999; //number of seconds to keep the message on server if the device is offline

    //Take the registration id(lengthy string) that you logged
    //in your ionic v2 app and update device_tokens[0] with it for testing.
    //Later save device tokens to db and
    //get back all tokens and push to multiple devices

    sender.send(message, device_tokens, retry_times, function (result) {
        //console.log('push sent to: ' + device_tokens);
        device_tokens = [];

    }, function (err) {
        console.log('failed to push notification ');
        device_tokens= [];
    });
};

module.exports.push = push;
