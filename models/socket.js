module.exports = function(io, db, conversation) {
  io.on('connection', function(socket) {
      conversation.getAllMessages().then(function(data) {
          for (var i = 0; i < data.length; i++) { io.emit('chat message', data[i].message); };
      });
      socket.on('disconnect', function() {
          io.emit('clear messages');
      });
      socket.on('chat message', function (msg) {
          conversation.createMessage(msg, 30, 42).done(function(data) {
              io.emit('chat message', msg);
          })
      });
  });
}