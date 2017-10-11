const PORT = 27015;
const express = require('express');
const uuid = require('uuid/v4');
const player = require('./player.js');
const gameServer = require('./gameserver.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gs = new gameServer();

app.use(express.static('../client/'));
http.listen(PORT, function() {
	console.log('socket.io:: Listening on port ' + PORT);
});

gs.makeMap(20, 48, 38);

io.on('connection', function(client) { //when socket gets connection
	client.on('gameConnect', function(properties) { //when game sends gameConnect
		client.playerInstance = new player(properties.name, properties.color, uuid()); //give client a playerinstance
		gs.addPlayer(client.playerInstance); //add the player to the gameServer

		client.emit('gameConnected', { //give client it's properties
			playerInstance: client.playerInstance,
			map: gs.map,
			mapSize: gs.mapSize,
			tileSize: gs.tileSize,
			playerSize: gs.playerSize
		});

		for (i = 0; i < gs.mapSize; i++) {
			for (j = 0; j < gs.mapSize; j++) {
				//client.emit('update', {mapUpdate: gs.map[[i, j]]});
			}
		}

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
	io.emit("update", {
		players: gs.players,
	});

	io.emit("updateMap", gs.map);
}
setInterval(update, 1000 / 30);
