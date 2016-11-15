// conversations have many users
module.exports = function(io, db) {
  
  io.on('connection', function(socket) {
      db.any('select * from conversations').then(function(data) {
          for (var i = 0; i < data.length; i++) { io.emit('chat message', data[i].message); };
      });
      socket.on('disconnect', function() {
          io.emit('clear messages');
      });
      socket.on('chat message', function (msg) {
          io.emit('chat message', msg);
          // inserting these into the database in a bad way for now (no user id, 1 row per message)
          db.none('INSERT INTO conversations (message, user_id)' + 'VALUES($1, $2);', [msg, 42])
              .then(function(response) { console.log("message inserted"); });
      });
  });
  
  // API endpoints
  var getAllMessages = function() {
      db.any('SELECT * FROM conversations').then(function(data) {
          return data;
      }).catch(function (err) { return next(err); });
  }
  
  var getAllConversationMessages = function(id) {
      db.any('SELECT * FROM conversations WHERE parent_id = $1;', [id]).then(function(data) {
          return data;
      }).catch(function (err) { return next(err); });
  }
  
  var getMessage = function(id) {
      // get
  }
  
  var createMessage = function(msg, userId, parentId) {
      db.none('INSERT INTO conversations (message, user_id, parent_id)' + 'VALUES($1, $2, $3);', [msg, userId, parentId])
          .then(function(response) {
              return response;
          }).catch(function (err) { return next(err); });
  }
  
  var updateMessage = function(msg, userId, parentId) {
      // update
  }
  
  var deleteMessage = function(id) {
      // delete
  }
  
  var getParent = function(id) {
      // when parentId isn't enough, only one of these may be necessary
  }
  
  var getAncestors = function(id) {
      // all ancestors, for breadcrumbs
  }
  
  var getChildren = function(id) {
      // just first children, for performance
  }
  
  var getDescendents = function(id) {
      // all descendents
  }
  
};