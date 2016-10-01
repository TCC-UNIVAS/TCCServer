var express = require('express');
var cases_service = require('../services/cases/cases_service');

var router = express.Router();

router.get('/lastWeek', function(req, res) {
    var userId = req.query.userId;
    var callback = function(response) {
        res.status(200).send(response);
    };
    cases_service.getCasesFromLastWeekByUserId(userId, callback);
});

module.exports = router;
