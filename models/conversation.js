// conversations have many users

module.exports = function(io, db) {
  
  io.on('connection', function(socket) {
    
      console.log('Hello!');
      
      db.any('select * from conversations').then(function(data) {
          for (var i = 0; i < data.length; i++) {
              io.emit('chat message', data[i].message);
          };
      });

      socket.on('disconnect', function() {
          io.emit('clear messages');
          console.log('GoodBye!');
      });
      
      socket.on('chat message', function(msg) {
          console.log(typeof(msg));
          io.emit('chat message', msg);
          // inserting these into the database in a bad way for now (no user id, 1 row per message)
          db.none('INSERT INTO conversations (message, user_id)' + 'VALUES($1, $2);', [msg, 42])
              .then(function (response) {
                  console.log("message inserted");
              });
      });
      
  });
  
};