var express = require('express');
var gcm = require('node-gcm');
var config = require('cloud-env');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var gcmApiKey = 'AIzaSyDakLMlJip8_loQIUt-XnEq6kq5xQ-gYNk'; // GCM API KEY OF YOUR GOOGLE CONSOLE PROJECT
var device_tokens = [];
device_tokens.push("c681jp-GCyU:APA91bHAYfg5pWVKHwKM7iaeaA9epfMwGMxE5LhnukF2SDh3gXNw6AUd1naVOnwvUHChMQQXRGFrsegckFOCiQq0RzUfjOju2Qvh4mqygsU9Q37uGYLmDXbGIoebUfZndcBxC5RTHM0j");

var server = app.listen(server_port, function () {
    console.log('server is running at ' + server_ip_address + ': ' + server_port);
});

app.get('/', function (req, res) {
    res.send('server is running at ' + server_ip_address + ': ' + server_port);
});

app.post('addUser', function(req, res){
    this.device_tokens.push(req.token);
    console.log(device_tokens);
});


app.get('/pushToAll', function (req, res) {
    //var device_tokens = []; //create array for storing device tokens
    
    var retry_times = 4; //the number of times to retry sending the message if it fails
    var sender = new gcm.Sender(gcmApiKey); //create a new sender
    var message = new gcm.Message(); //create a new message
    message.addData('title', 'isto é um teste');
    message.addData('message', "testando");
    message.addData('sound', 'default');
    message.collapseKey = 'Testing Push'; //grouping messages
    message.delayWhileIdle = true; //delay sending while receiving device is offline
    message.timeToLive = 3; //number of seconds to keep the message on 
    //server if the device is offline
    
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
});