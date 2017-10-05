const PORT = 27015;
var io = require('socket.io')(PORT);
var uuid = require('uuid/v4');
var player = require('./player.js');
var gameServer = require('./GameServer.js');

console.log('socket.io:: Listening on port ' + PORT);

io.on('connection', function(client) { // when socket gets connection
	client.on('gameConnect', function(name) { // when game sends gameConnect
		client.name = name; // set client's name
		client.userid = uuid(); // give client's uuid
		client.playerInstance = new player.Player(name); // give client a playerinstance
		gameServer.addPlayer(client.playerInstance);
		client.emit('gameConnected', { // give client it's properties
			name: client.name,
			id: client.userid,
			playerInstance: client.playerInstance
		});
		console.log('socket.io:: client ' + client.name + " (" + client.userid + ') connected');
	});

	client.on('updateLocalDir', function(newDir) {
		client.playerInstance.dir = newDir;
		console.log(client.playerInstance.dir);
	});

	function sendPlayerCoords() {
		console.log("test");
		//client.emit('sendPlayerCoords', client.playerInstance);
	}

	client.on('disconnect', function() {
		console.log('socket.io:: client ' + client.name + " (" + client.userid + ') disconnected');
	});
});
