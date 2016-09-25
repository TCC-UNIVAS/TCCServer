var db = require('../../util/db_conn');

var getAll = function(callback){
    db.query('select * from cases', function(err, rows, fields){
           if (err)
                throw err;
            else
                callback(rows);
    });
};

var addMark = function(data, urlImg, callback){
    db.query('insert into cases (user_id, category_id, lat, lng, comments, create_date, image) values(?,?,?,?,?,?,?)',
        [data.user_id, data.category_id, data.lat, data.lng, data.comments, new Date(), urlImg], function(err, result){
           // console.log(result);
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
