var db = require('../../util/db_conn'); 


 var getAll = function(sendResponse){
    db.query('SELECT * from tcc.user', function(err, rows, fields) {
        if (err) throw err;
        
      
        sendResponse(rows);
    });
};

//add a new user
var addUser = function(req, callback){
    var user = req.body;
    db.query('insert into user(name, email, password, lat, lng, sign_date) ' +
        'values (?, ?, ?, ?, ?, ?)', [user.name, user.email, user.password, user.lat, user.lng, new Date()],function(err, result) {
        if (err)
             throw err;        
        else{
            var id = result.insertId;
            db.query('SELECT * FROM user WHERE user.user_id = ?' , [id],function(err, rows) {
                 if (err)
                     throw err;        
                else{
                    callback(rows[0]);
                }
            });
        } 
    });
};

//authenticate the user, and send the data of the user
var auth = function(email, password, callback){
    db.query('SELECT * from tcc.user where user.password = ? and user.email = ?', [password, email], function(err, rows, fields){
       callback(rows[0]);
    });
};

//add a token in a user register
var addToken = function (email, token, callback){
    db.query('update user set user.token = ? where user.email = ?', [token, email], function(err, result){
        
        if (err)
            throw err;
        if(result.affectedRows)
            callback(true);
        else        
            callback(false);
    });
};


var deleteUser = function (email, callback){
    db.query('delete from user where email = ?', [email], function(err, result){
        if (err)
            throw err;
        if(result.affectedRows)
            callback(true);
        else        
            callback(false);
    });
};

module.exports.getAll = getAll;
module.exports.addUser = addUser;
module.exports.auth = auth;
module.exports.addToken = addToken;
module.exports.deleteUser = deleteUser;
