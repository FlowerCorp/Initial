var socket = io();

$('form').submit(function(evt) {
    evt.preventDefault();
    socket.emit('chat message', [$('#msg').val(), $('#conversationId').data("id")]);
    $('#msg').val('');
})

socket.on('current conversation', function(id_array) {
    $('#messages').prepend('<div><div class="btn btn-outline-warning drillUp" data-parentId='+ id_array[1] +' style="margin-bottom: 50px;">drill up</div><div>')
    $('#messages').prepend('<h3 id="conversationId" class="display-4" style="font-weight: bold;" data-id="' + id_array[0] + '">Current Conversation #: ' + id_array[0] + '</h3>')
});

socket.on('chat message', function(msg) {
    $('#messages').append('<div data-id="'+msg[1]+'" data-cid="'+msg[2]+'" style="display: inline-block;"><div class="btn btn-primary btn-outline-info drillDown" style="margin: 5px;">'+msg[0]+'</div><a class="btn btn-default delete" style="margin:0;padding:0;"><i class="fa fa-trash""></i></a></div>');
    $('#messages').scrollTop($('#messages').prop("scrollHeight"));
});

socket.on('clear messages', function() {
    $('#messages').empty();
});

// remove deleted message from ui
socket.on('message deleted', function(id) {
    $('[data-id='+id+']').remove();
});

// delete message on delegated event (can use live() or on() for this)
$('#messages').delegate('.delete', 'click', function(evt) {
    console.log('deleting clicked message');
    socket.emit('delete message', evt.currentTarget.parentElement.attributes[0].value);
});

$('#messages').delegate('.drillDown', 'click', function(evt) {
    console.log('drilling into message!');
    socket.emit('drill down', [evt.currentTarget.parentElement.attributes[0].value, $('#conversationId').attr("data-id")]);
});

$('#messages').delegate('.drillUp', 'click', function(evt) {
    if (evt.currentTarget.attributes[1].value !== "root") {
        console.log('drilling up to parent!');
        socket.emit('drill up', evt.currentTarget.attributes[1].value);
    } else {
        console.log('you are in the root conversation');
    }
});