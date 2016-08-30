var db = require('../util/db_conn'); 

//verify if the email yet was used
// this middleware return true if the email yet was used, and false if it's not
var checkEmail = function(req, res, next){
    db.query('SELECT * from tcc.user where tcc.user.email = ?',[req.body.email], function(err, rows, fields){
        console.log(rows);
        if(rows[0])
            return res.status(400).json({
                message: "email yet registred"
            });
        return next();
       
    });
};

module.exports.checkEmail = checkEmail;