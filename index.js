var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./models/conversation');
var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// User dependencies (cookie parsing, login strategy, flash messages)
require('./models/user')(passport); // pass passport for configuration
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'zomaareenstukjetekstDatjenietzomaarbedenkt'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


io.on('connection', function(socket) {
    // socket.broadcast.emit('Welcome to Flower Chat!');
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
});

// allow serving of static files (ie in public), set default view directory to public/views and allow embedded javascript
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

// routes
require('./routes')(app, passport, unsplash);

app.listen(process.env.PORT || 3500)