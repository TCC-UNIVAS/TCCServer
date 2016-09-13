var express = require('express');
var mark_service = require('../services/mark/mark_service');
var push_service = require('../services/push/push_service');

var router = express.Router();

router.get('/', function(req, res){
    var callback = function(response){
        res.status(200).send(response);
    };
    mark_service.getAll(callback);
});


router.post('/', function(req,res){
     var callback = function(confirm){
       if(confirm){
            res.status(200).json({
                message: 'mark added with success',
                status: 200
            });
            //after add a mark, send  a push notification to user that live around to 800 meters the mark 
            push_service.push(req.body.lat, req.body.lng, req.body.user_id);
        }
        else{
            res.status(400).json({
                message: 'An error occour when added the mark, try later',
                status: 400
            });
        }
    };
    mark_service.addMark(req.body, callback);   
});

module.exports = router;