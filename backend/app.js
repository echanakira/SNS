var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var path = require('path');
var validator = require('express-validator');
var p_routes = require("./routes/p_routes.js");
var r_routes = require("./routes/r_routes.js");
var app = express();
var oracledb = require('oracledb');
oracledb.autoCommit = true;
var config = {
  user          : "ORDS_PUBLIC_USER",
  password      : "oracle",
  connectString : "LOCALHOST:1521/XE"
}
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//tells express to accept JSON and url encoded values
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

//routes(app);
app.use('/pub', p_routes);
app.use('/', r_routes);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
