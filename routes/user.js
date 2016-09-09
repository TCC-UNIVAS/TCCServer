var express = require('express');
var user_middleware = require('../middlewares/user_middleware');
var user_service = require('../services/user/user_service');

var router = express.Router();



//get all tokens
router.get('/token', function(req, res){
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
    var sendData = function(confirm){
        if(confirm){
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

    console.log(req.body.email +  '  ' + req.body.token);
    user_service.addToken(req.body.email, req.body.token, sendData);
});

//get a 'user' json with data to insert in db
//before insert it's necessary verify if the email exists in db, so the middleware is called to check the email
router.post('/', user_middleware.checkEmail, function(req, res){
         user_service.addUser(req);
         res.status(200).json({
             message: "User added",
             status: 200
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




module.exports = router;
