var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var localStrategy = require('passport-local').Strategy;

// postgres dependencies, bluebird promise library (and override pg-promise)
var promise = require('bluebird');
var options = { promiseLib: promise };
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://oeupplkqmvjyik:j-USwIR_qmpHvvctYfiLigVkao@ec2-54-221-226-148.compute-1.amazonaws.com:5432/d1ab48uu38khao';
var db = pgp(connectionString);

// models
var conversation = require('./models/conversation')(io, db);
var user = require('./models/user')(passport, db, localStrategy, bcrypt);

// User dependencies (cookie parsing, login strategy, flash messages)
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'zomaareenstukjetekstDatjenietzomaarbedenkt'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// allow serving of static files (ie in public), set default view directory to public/views and allow embedded javascript
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

// routes
require('./routes')(app, passport, conversation);

// server
http.listen(3500, function() {
    console.log('listening on port:3500');
});