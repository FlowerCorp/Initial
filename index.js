var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

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

http.listen(3500, function() {
    console.log('listening on port:3500');
});