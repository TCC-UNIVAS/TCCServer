var gcm = require('node-gcm');
var db = require('../../util/db_conn');

var getCasesFromLastWeekByUserId = function(lat, lng, userId, callback) {
    db.query('SELECT * ' +
            'FROM cases c ' +
            'WHERE ((( ACOS( COS( ( 90 - ? ) * PI() / 180 ) * ' +
            		'COS( ( 90 - c.lat ) * PI() / 180 ) + SIN( ( 90 - ? ) * PI() / 180 ) * SIN( ( 90 - c.lat ) * ' +
            		'PI() / 180 ) * COS( ABS( ( ( 360 + ? ) * PI() / 180 ) - ( ( 360 + c.lng ) * PI() / 180 ) ) ) ) ) * ' +
            		'6371.004 ) * 1000' +
            	  ') <= 800 ' +
            'AND c.user_id != ? ' +
            'AND c.create_date >= DATE(NOW()) - INTERVAL 7 DAY ' +
            'ORDER BY c.case_id DESC;', [lat, lat, lng, userId], function(err, rows, fields) {
            if (err) {
                throw err;
            } else {
               callback(rows);
            }
    });
};

module.exports.getCasesFromLastWeekByUserId = getCasesFromLastWeekByUserId;
