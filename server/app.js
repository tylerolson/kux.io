const PORT = 3000;
var io = require('socket.io')(PORT);
var uuid = require('uuid/v4');
var player = require('./player.js');

console.log('socket.io:: Listening on port ' + PORT);

io.sockets.on('connection', function(client) { //when socket gets connection
	client.on('gameConnect', function(name) {
		client.name = name;
		client.userid = uuid();
		client.playerInstance = new player.Player(name);
		client.emit('gameConnected', {
			name: client.name,
			id: client.userid,
			playerInstance: client.playerInstance
		});
		console.log('socket.io:: client ' + client.name + " (" + client.userid + ') connected');
	});


	client.on('disconnect', function() {
		console.log('socket.io:: client ' + client.name + " (" + client.userid + ') disconnected');
	});
});
