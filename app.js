/**
 * Module dependencies
 */

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 * App routes
 */

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname);

/**
 * App listen
 */

const port = process.env.PORT || 3000;
server.listen(port, function() {
  // console.log(this.address());
  const addr = this.address();
  console.log('ESFA chat app listening on port ' + addr.port);
});

/**
 * Socket.IO server
 */

const nicknames = {};

// io.set('transports', ['xhr-polling']);
io.set('polling duration', 20);

io.on('connection', function(socket) {
  socket.on('user message', function(msg) {
    socket.broadcast.emit('user message', socket.nickname, msg);
  });

  socket.on('nickname', function(nick, fn) {
    if (nicknames[nick]) {
      fn(true);
    } else {
      fn(false);
      nicknames[nick] = socket.nickname = nick;
      socket.broadcast.emit('announcement', nick + ' connected');
      io.emit('nicknames', nicknames);
    }
  });

  socket.on('disconnect', function() {
    if (!socket.nickname) return;

    delete nicknames[socket.nickname];
    socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
    socket.broadcast.emit('nicknames', nicknames);
  });
});
