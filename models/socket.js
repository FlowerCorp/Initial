module.exports = function(io, db, conversation) {
  io.on('connection', function(socket) {
      conversation.getAllConversationMessages(1).then(function(data) {
          for (var i = 0; i < data.length; i++) { io.emit('chat message', [data[i].message, data[i].id, 1]); };
      });
      io.emit('current conversation', [1, 0]);
      socket.on('disconnect', function() {
          io.emit('clear messages');
      });
      socket.on('chat message', function(msg) {
          conversation.createMessage(msg[0], 1, msg[1]).done(function(data) {
              io.emit('chat message', [msg[0], data.id, msg[1]]);
          });
      });
      socket.on('delete message', function(id) {
          conversation.deleteMessage(id).done(function(data) {
              io.emit('message deleted', id);
          });
      });
      socket.on('drill down', function(array) {
          io.emit('clear messages');
          conversation.getAllConversationMessages(array[0]).then(function(data) {
              for (var i = 0; i < data.length; i++) {
                io.emit('chat message', [data[i].message, data[i].id, 1]);
              };
          })
          io.emit('current conversation', array);
      })
      socket.on('drill up', function(id) {
          io.emit('clear messages');
          conversation.getAllConversationMessages(id).then(function(data) {
              for (var i = 0; i < data.length; i++) {
                io.emit('chat message', [data[i].message, data[i].id, 1]);
              };
          })
          conversation.getParent(id).then(function(parentId) {
              io.emit('current conversation', [id, parentId]);
          })
      })
  });
}