var config = require('cloud-env');
var mysql = require ('mysql');
        
var db_conn = mysql.createConnection({
    host : process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
    port : process.env.OPENSHIFT_MYSQL_DB_PORT || '3306',
    user : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'adminsmWHkUU',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD ||  'f25X1Z6F84kl',
    database : 'tcc'
});

db_conn.connect(function(err) {
if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}
console.log('connected as id ' + db_conn.threadId);
});

module.exports = db_conn;