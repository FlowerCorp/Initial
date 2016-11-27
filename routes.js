module.exports = function(app, passport, conversation) {

  app.get('/api/messages', function(req, res) {
      conversation.getAllMessages().done(function(messages) {
          res.status(200).json({ data: messages });
      });
  });
  app.get('/api/conversations/:conversation_id/messages', function(req, res) {
      conversation.getAllConversationMessages().done(function(messages) {
          res.status(200).json({ data: messages });
      });
  });
  app.get('/api/conversations/:conversation_id/messages/:message_id', function(req, res) {
      conversation.getMessage(conversation_id, message_id).done(function(message) {
          res.status(200).json({ data: message });
      });
  });
  app.post('api/conversations/:conversation_id/messages/:message_id', function(req, res) {
      
  });
  
  app.patch('api/conversations/:conversation_id/messages/:message_id', function(req, res) {
    
  });
  
  app.delete('api/conversations/:conversation_id/messages/:message_id', function(req, res) {
    
  });
  
  app.get('api/messages/:message_id/parents', function(req, res) {
    
  });
  
  app.get('api/messages/:message_id/ancestors', function(req, res) {
    
  });
  
  app.get('api/messages/:message_id/children', function(req, res) {
    
  });
  
  app.get('api/messages/:message_id/descendents', function(req, res) {
    
  });
  
  app.get('/', function(req, res) {
      res.sendFile(__dirname + '/public/index.html');
  });
  
};
