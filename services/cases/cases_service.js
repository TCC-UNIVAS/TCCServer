var gcm = require('node-gcm');
var db = require('../../util/db_conn');

var getCasesFromLastWeekByUserId = function(userId, callback) {
    db.query('SELECT * c.case_id, c.user_id, c.category_id, c.lat, c.lng, c.comments, c.create_date, c.image, c.address, c.neighborhood ' +
            'FROM user u ' +
            'INNER JOIN cases c ON u.user_id = c.user_id ' +
            'WHERE ((( ACOS( COS( ( 90 - (-22.225180449741952) ) * PI() / 180 ) * ' +
            		'COS( ( 90 - u.lat ) * PI() / 180 ) + SIN( ( 90 - (-22.225180449741952) ) * PI() / 180 ) * SIN( ( 90 - u.lat ) * ' +
            		'PI() / 180 ) * COS( ABS( ( ( 360 + (-45.930930376052856) ) * PI() / 180 ) - ( ( 360 + u.lng ) * PI() / 180 ) ) ) ) ) * ' +
            		'6371.004 ) * 1000' +
            	  ') <= 800 ' +
            'AND u.user_id != ? ' +
            'AND c.create_date >= DATE(NOW()) - INTERVAL 7 DAY ' +
            'ORDER BY c.case_id DESC;', [userId], function(err, rows, fields) {
            if (err) {
                throw err;
            } else {
               callback(rows);
            }
    });
};

module.exports.getCasesFromLastWeekByUserId = getCasesFromLastWeekByUserId;
