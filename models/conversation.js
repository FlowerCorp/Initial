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
        var id = db.one('INSERT INTO conversations (message, user_id, parent_id)' + 'VALUES($1, $2, $3) RETURNING id;', [msg, userId, parentId])
            .then(function(id) {
                return id;
            }).catch(function(err) {
                return err;
            });
        return id;
    }

    module.updateMessage = function(msg, userId, parentId) {
    }

    module.deleteMessage = function(id) {
        var message = db.none('DELETE FROM conversations WHERE id = $1', [id])
            .then(function(response) {
                return response;
            }).catch(function(err) {
                return err;
            })
        return message;
    }

    module.getParent = function(id) {
        var parent_id = db.any('SELECT * FROM conversations WHERE id = $1', [id])
            .then(function(data) {
                return data[0].parent_id;
            }).catch(function(err) {
                return "root";
            });
        return parent_id;
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
