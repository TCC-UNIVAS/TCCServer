var gcm = require('node-gcm');
var db = require('../../util/db_conn');

var getByNeighborhood = function (callback) {
    db.query('SELECT cases.neighborhood,  ' +
            'COUNT(case cases.category_id when 1 then 1 else null end) as foco, ' +
            'COUNT(case cases.category_id when 2 then 1 else null end) as dengue, ' +
            'COUNT(case cases.category_id when 3 then 1 else null end) as zika, ' +
            'COUNT(case cases.category_id when 4 then 1 else null end) as chikungunya ' +
            'FROM cases ' +
            'INNER JOIN category ' +
            'ON cases.category_id = category.category_id ' +
            'GROUP BY cases.neighborhood ' +
            'order by cases.neighborhood'  , function (err, rows, fields) {
            if (err) {
                throw err;
            } else {
                callback(rows);
            }
        });
};

module.exports.getByNeighborhood = getByNeighborhood;
