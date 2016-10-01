var express = require('express');
var cases_service = require('../services/cases/cases_service');

var router = express.Router();

router.get('/lastWeek', function(req, res) {
    var lat = req.query.lat;
    var lng = req.query.lng;
    var userId = req.query.userId;
    var callback = function(response) {
      var others = { ok: "dani1", ok2: "Dani2" };
      var json = JSON.stringify({
        dani: others
    });
    response.end(json);

        res.status(200).send(response);
    };
    cases_service.getCasesFromLastWeekByUserId(lat, lng, userId, callback);
});

module.exports = router;
