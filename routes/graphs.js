var express = require('express');
var graph_service = require('../services/graphs/graphs_service');

var router = express.Router();

router.get('/numbercases', function (req, res) {
    var callback = function(response) {
        res.status(200).send(response);
    };
   graph_service.getByNeighborhood(callback);

});

module.exports = router;
