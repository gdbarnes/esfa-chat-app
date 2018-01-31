const socket = io.connect();

socket.on('connect', function() {
  $('.js-chat').addClass('connected');
});

socket.on('announcement', function(msg) {
  $('.js-lines').append($('<p>').append($('<em>').text(msg)));
});

socket.on('nicknames', function(nicknames) {
  $('.js-nicknames')
    .empty()
    .append($('<span>Online: </span>'));
  for (var i in nicknames) {
    $('.js-nicknames').append($('<span>').text(nicknames[i]));
  }
});

socket.on('user message', message);
socket.on('reconnect', function() {
  $('.js-lines').remove();
  message('System', 'Reconnected to the server');
});

socket.on('reconnecting', function() {
  message('System', 'Attempting to re-connect to the server');
});

socket.on('error', function(e) {
  message('System', e ? e : 'A unknown error occurred');
});

function message(from, msg) {
  $('.js-lines').append($('<p>').append($('<b>').text(from), msg));
  const chatBoxEl = $('.js-lines').get(0);
  chatBoxEl.scrollTop = chatBoxEl.scrollHeight;
}

// dom manipulation
$(function() {
  $('.js-set-nickname').submit(function(ev) {
    socket.emit('nickname', $('.js-nickname-input').val(), function(set) {
      if (!set) {
        clear();
        return $('.js-chat').addClass('nickname-set');
      }
      $('.js-nickname-err').css('visibility', 'visible');
    });
    return false;
  });

  $('.js-send-message').submit(function() {
    message('me', $('.js-message').val());
    socket.emit('user message', $('.js-message').val());
    clear();
    return false;
  });

  function clear() {
    $('.js-message')
      .val('')
      .focus();
  }
});
