var express = require('express');
var mark_service = require('../services/mark/mark_service');
var push_service = require('../services/push/push_service');
var cloudinary = require('cloudinary');

var router = express.Router();

cloudinary.config({ 
  cloud_name: 'ricardo-faria', 
  api_key: '694593793983267', 
  api_secret: '-XJ-XNtAy0CjJIJUXMMg32JZa9s' 
});

router.get('/', function(req, res){
    var callback = function(response){
        res.status(200).send(response);
    };
    mark_service.getAll(callback);
});

router.post('/', function(req,res){
    var urlImg;

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


    cloudinary.uploader.upload(req.body.picture, function(result) { 
        console.log('url to image: ' + result.url);   
        urlImg = result.url;     
    }).then(function(){
        mark_service.addMark(req.body, urlImg, callback);
    });
     

    // //upload the image and after save the case
    // uploadImg(req.body.picture).then(function(urlImg){
    //     mark_service.addMark(req.body, urlImg, callback);
    // });
       
});

// var uploadImg = function(picture){
//     cloudinary.uploader.upload(picture, function(result) { 
//         console.log(result);
//         console.log(result.url);
        
//     });
//     return result.url;
// }

module.exports = router;