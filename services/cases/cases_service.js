var gcm = require('node-gcm');
var db = require('../../util/db_conn');

var getCasesFromLastWeekByUserId = function(lat, lng, userId, callback) {
    db.query('SELECT ' +
            'c.case_id, c.user_id, c.category_id, c.lat, c.lng' +
        	', c.comments, DATE_FORMAT(c.create_date,'%d %b %Y %T:%f')' +
        	', c.image, c.address, c.neighborhood' +
        	', case c.category_id' +
                'when 1 then "Suspeita de focos do mosquito Aedes aegypti" ' +
                'when 2 then "Suspeita de Dengue" ' +
        		'when 3 then "Suspeita de Zica" ' +
        		'when 4 then "Supeita de Chikungunya" ' +
            'end as category_description' +
        	', ct.name as category_name' +
            'FROM cases c ' +
            'JOIN category ct ON c.category_id = ct.category_id ' +
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
