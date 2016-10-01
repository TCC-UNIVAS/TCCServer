var express = require('express');
var config = require('cloud-env');
var router_user = require('./routes/user');
var router_mark = require('./routes/mark');
var router_cases = require('./routes/cases');

var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 80;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen(server_port, server_ip_address, function () {
    console.log('server is running at ' +  server_ip_address + ': ' +server_port);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
    res.send('server is running at ' +  server_ip_address + ': ' + server_port);
});

app.use('/user', router_user);
app.use('/mark', router_mark);
app.use('/cases', router_cases);
