var socket = io();

$('form').submit(function(evt) {
    evt.preventDefault();
    socket.emit('chat message', $('#msg').val());
    $('#msg').val('');
})

socket.on('chat message', function(msg) {
    $('#messages').append('<div class="btn btn-primary btn-outline-info" style="margin: 5px;">'+msg+'<a class="fa fa-trash" style="margin-left: 30px;" aria-hidden="true"></a></div>');
    $('#messages').scrollTop($('#messages').prop("scrollHeight"));
});

socket.on('clear messages', function() {
    $('#messages').empty();
});