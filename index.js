var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  socket.on('add user',function(msg){
    socket.username = msg.username;
    socket.location = msg.location;
  io.emit('add user',{username: socket.username,
                     location: socket.location
                     });
  });
  
  socket.on('chat message', function(msg){
    io.emit('chat message', {username: socket.username,
                            msg:msg});
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
