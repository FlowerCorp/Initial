module.exports = function(app, passport, conversation) {

  // API ENDPOINTS
  app.get('/api/messages', function(req, res) {
      return conversation.getAllMessages();
  });
  
  app.get('/api/conversations/:conversation_id/messages', function(req, res) {
      return conversation.getAllConversationMessages(conversation_id);
  });
  
  app.get('/api/conversations/:conversation_id/messages/:message_id', function(req, res) {
      return conversation.getMessage(conversation_id, message_id);
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
      res.sendFile(__dirname + '/index.html');
  });
  
};
