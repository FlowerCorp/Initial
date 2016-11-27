module.exports = function(db) {

    var module = {};

    module.getAllMessages = function() {
        var messages = db.any('SELECT * FROM conversations')
            .then(function(data) {
                return data;
            }).catch(function(err) {
                return err;
            });
        return messages;
    }

    module.getAllConversationMessages = function(id) {
        var messages = db.any('SELECT * FROM conversations WHERE parent_id = $1;', [id])
            .then(function(data) {
                return data;
            }).catch(function(err) {
              return err;
            });
        return messages;
    }

    module.getMessage = function(id) {
        var message = db.any('SELECT * FROM conversations WHERE id = $1', [id])
            .then(function(data) {
                return data;
            }).catch(function(err) {
                return err;
            });
        return message;
    }

    module.createMessage = function(msg, userId, parentId) {
        var message = db.none('INSERT INTO conversations (message, user_id, parent_id)' + 'VALUES($1, $2, $3);', [msg, userId, parentId])
            .then(function(response) {
                return response;
            }).catch(function(err) {
              return err;
            });
        return message;
    }

    module.updateMessage = function(msg, userId, parentId) {
    }

    module.deleteMessage = function(id) {
    }

    module.getParent = function(id) {
    }

    module.getAncestors = function(id) {
        // all ancestors, for breadcrumbs
    }

    module.getChildren = function(id) {
        // just first children, for performance
    }

    module.getDescendents = function(id) {
        // all descendents
    }

    return module;
}
