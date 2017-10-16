const PORT = 27015;
const express = require('express');
const uuid = require('uuid/v4');
const player = require('./player.js');
const map = require('./gamemap.js');
const GameServer = require('./gameserver.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gameMap = new map(50, 40, 30);
var gameServer = new GameServer(gameMap);

app.use(express.static('../client/'));
http.listen(PORT, function() {
	console.log('socket.io:: Listening on port ' + PORT);
});

io.on('connection', function(client) { //when socket gets connection
	client.on('gameConnect', function(properties) { //when game sends gameConnect
		client.playerInstance = new player(properties.name, properties.color, uuid()); //give client a playerinstance
		gameServer.addPlayer(client.playerInstance); //add the player to the gameServer

		client.emit('gameConnected', { //give client it's properties
			playerInstance: client.playerInstance,
			map: gameMap.map,
			mapSize: gameMap.mapSize,
			tileSize: gameMap.tileSize,
			innerTileSize: gameMap.innerTileSize
		});

		for (i = 0; i < gameServer.players.length; i++) {
			io.emit("playerAdded", gameServer.players[i]); //tell all that new players
		}

		console.log('socket.io:: client ' + client.playerInstance.name + " (" + client.playerInstance.id + ') connected');
	});

	client.on('updateDir', function(newDir) {
		gameServer.changeDir(client.playerInstance, newDir);
	});

	client.on('disconnect', function() {
		gameServer.removePlayer(client.playerInstance);
		if (client.playerInstance != null) {
			io.emit("playerRemoved", client.playerInstance);
			console.log('socket.io:: client ' + client.playerInstance.name + " (" + client.playerInstance.id + ') disconnected');
		} else {
			console.log('socket.io:: client ' + client.id + ' disconnected');
		}
	});
});

function update() {
	if (gameServer.players.length > 0) {
		gameServer.update();
		for (i = 0; i < gameServer.players.length; i++) {
			if (gameServer.players[i].oldX != gameServer.players[i].x || gameServer.players[i].oldY != gameServer.players[i].y) {
				io.emit("updatePlayer", {
					id: gameServer.players[i].id,
					x: gameServer.players[i].x,
					y: gameServer.players[i].y,
				});
			}
		}
		if (gameMap.updateTiles.length > 0) {
			io.emit("updateTiles", gameMap.updateTiles);
		}
	}
}
setInterval(update, 1000 / 30);
