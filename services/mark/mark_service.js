var db = require('../../util/db_conn');

var getAll = function(callback){
    db.query('SELECT cases.*, category.name FROM cases JOIN category ON cases.category_id = category.category_id ' +
        'ORDER BY cases.case_id  DESC', function(err, rows, fields){
           if (err)
                throw err;
            else
                callback(rows);
    });
};

var getByUserId = function(userId, callback){
    db.query('SELECT cases.*, category.name FROM cases JOIN category ON cases.category_id = category.category_id ' +
        'WHERE user_id = ? ORDER BY cases.case_id  DESC', [userId], function(err, rows, fields) {
           if (err) {
            throw err;
           } else {
            callback(rows);
           }
    });
};

var addMark = function(data, urlImg, callback){
    db.query('insert into cases (user_id, category_id, lat, lng, comments, create_date, image, address, neighborhood) values(?,?,?,?,?,?,?,?,?)',
        [data.user_id, data.category_id, data.lat, data.lng, data.comments, new Date(), urlImg, data.address, data.neighborhood], function(err, result){
            if (err)
                throw err;
            if(result.affectedRows)
                callback(true);
            else
                callback(false);
        })
};

module.exports.getAll = getAll;
module.exports.getByUserId = getByUserId;
module.exports.addMark = addMark;
