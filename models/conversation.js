// conversations have many users

module.exports = function(io) {
  
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
  
};