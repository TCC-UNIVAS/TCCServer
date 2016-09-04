var express = require('express');
var user_middleware = require('../middlewares/user_middleware');
var gcm = require('node-gcm');
var user_service = require('../services/user/user_service');

var router = express.Router();

var gcmApiKey = 'AIzaSyDakLMlJip8_loQIUt-XnEq6kq5xQ-gYNk'; // GCM API KEY OF YOUR GOOGLE CONSOLE PROJECT
var device_tokens = [];
device_tokens.push("c681jp-GCyU:APA91bHAYfg5pWVKHwKM7iaeaA9epfMwGMxE5LhnukF2SDh3gXNw6AUd1naVOnwvUHChMQQXRGFrsegckFOCiQq0RzUfjOju2Qvh4mqygsU9Q37uGYLmDXbGIoebUfZndcBxC5RTHM0j");


//get all tokens
router.get('/tokens', function(req, res){
    res.send(device_tokens);
});

//get all user in db
router.get('/', function(req, res){
    var sendResponse = function(response){
        res.send(response)
    };
    var allUser = user_service.getAll(sendResponse);
});

// add a user token in a db
router.post('/token', function(req, res){
    //callback function
    var sendData = function(affectedRows){
        if(affectedRows){
            res.status(200).json({
                message: 'token registred with success',
                status: 200
            });
        }
        else{
            res.status(400).json({
                message: 'An error occour when set the token, try later',
                status: 400
            });
        }
    }

    user_service.addToken(req.body.email, req.body.token, sendData);
});

//get a 'user' json with data to insert in db
//before insert it's necessary verify if the email exists in db, so the middleware is called to check the email
router.post('/', user_middleware.checkEmail, function(req, res){
         user_service.addUser(req);
         res.status(200).json({
             massege : "User added"
         });
    }
);

//make the user authentication, return all data of user if the username e password are corect.
router.post('/auth', function(req, res){
    var sendData = function(auth){
        if(auth)
            res.send(auth).status(200);
        else
            res.status(400).json({
                message: 'user not authenticated'
            });
    };

    user_service.auth(req.body.email, req.body.password, sendData);
});


//send push message to all devices
router.get('/push', function (req, res) {
    var retry_times = 4; //the number of times to retry sending the message if it fails
    var sender = new gcm.Sender(gcmApiKey); //create a new sender
    var message = new gcm.Message(); //create a new message
    message.addData('title', 'isto é um teste');
    message.addData('message', "testando");
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
});

module.exports = router;
