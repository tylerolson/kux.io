const PORT = 27015;
const express = require('express');
const uuid = require('uuid/v4');
const player = require('./player.js');
const gameServer = require('./GameServer.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gs = new gameServer(io);

app.use(express.static('../client/'));
http.listen(PORT, function() {
	console.log('socket.io:: Listening on port ' + PORT);
});

io.on('connection', function(client) { //when socket gets connection
	client.on('gameConnect', function(properties) { //when game sends gameConnect
		client.playerInstance = new player(properties.name, properties.color, uuid()); //give client a playerinstance
		gs.addPlayer(client.playerInstance); //add the player to the gameServer

		client.emit('gameConnected', { //give client it's properties
			playerInstance: client.playerInstance
		});

		console.log('socket.io:: client ' + client.playerInstance.name + " (" + client.playerInstance.id + ') connected');
	});

	client.on('updateDir', function(newDir) {
		gs.changeDir(client.playerInstance, newDir);
	});

	client.on('disconnect', function() {
		gs.removePlayer(client.playerInstance);
		if (client.playerInstance != null) {
			console.log('socket.io:: client ' + client.playerInstance.name + " (" + client.playerInstance.id + ') disconnected');
		} else {
			console.log('socket.io:: client ' + client.id + ' disconnected');
		}
	});
});

function update() {
	gs.update();
	io.emit("updatePlayers", gs.players);
}
setInterval(update, 1000 / 30);
