var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//       console.log('user disconnected');
//     });
// });
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', function(socket){

	io.emit('connections',Object.keys(io.sockets.connected).length)
	 
	socket.on('disconnect', function(){
      console.log('user disconnected');
   });


  socket.on('Created', (data)=>{
    socket.broadcast.emit('Created', (data));
  });

  socket.on('chat-message', (data)=>{
    socket.broadcast.emit('chat-message', (data));
  });

  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing', (data));
  });

  socket.on('stopTyping', (data)=>{
    socket.broadcast.emit('stopTyping', (data));
  });

   socket.on('joined', (data)=>{
    socket.broadcast.emit('joined', (data));
  });

   socket.on('leaved', (data)=>{
    socket.broadcast.emit('leaved', (data));
  });


});


http.listen(3000, function(){
  console.log('listening on *:3000');
});	