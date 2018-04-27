const PORT = process.env.PORT || 3000;
const express = require('express');
const uuid = require('uuid/v4');
const Player = require('./player.js');
const GameServer = require('./gameserver.js');
var gameServer = new GameServer(50, 40, 30, 20);
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('../client/'));
http.listen(PORT, function() {
	console.log('socket.io:: Listening on port ' + PORT);
});

//while (gameServer == null) {}

io.on('connection', function(client) { //when socket gets connection
	client.on('gameConnect', function(properties) { //when game sends gameConnect
		var tempID = uuid();
		gameServer.addPlayer(new Player(properties.name, properties.color, tempID, Math.floor(Math.random() * (gameServer.gameMap.mapSize - 5)), Math.floor(Math.random() * gameServer.gameMap.mapSize)));
		var tempPlayer = gameServer.getPlayer(tempID);
		client.GAMEID = tempID;

		client.emit('gameConnected', { //give client it's properties
			id: client.GAMEID,
			name: properties.name,
			color: properties.color,
			x: tempPlayer.x,
			y: tempPlayer.y,
			map: gameServer.gameMap.map,
			mapSize: gameServer.gameMap.mapSize,
			tileSize: gameServer.gameMap.tileSize,
			innerTileSize: gameServer.gameMap.innerTileSize,
			trailTileSize: gameServer.gameMap.trailTileSize
		});

		for (var i = 0; i < gameServer.players.length; i++) {
			io.emit("playerAdded", {
				id: gameServer.players[i].id,
				name: gameServer.players[i].name,
				color: gameServer.players[i].color,
				x: gameServer.players[i].x,
				y: gameServer.players[i].y,
			}); //tell all that new players
		}

		console.log('socket.io:: client ' + gameServer.getPlayer(client.GAMEID).name + " (" + client.GAMEID + ') connected');
	});

	client.on('updateDir', function(response) {
		gameServer.changeDir(response.GAMEID, response.newDir);
	});

	client.on('disconnect', function() {
		if (gameServer.getPlayer(client.GAMEID) != null) {
			console.log('socket.io:: client ' + gameServer.getPlayer(client.GAMEID).name + " (" + client.GAMEID + ') disconnected');
			gameServer.removePlayer(client.GAMEID);
			io.emit("playerRemoved", client.GAMEID);
		} else {
			console.log('socket.io:: client ' + client.id + ' disconnected');
		}
	});
});

function update() {
	if (gameServer.players.length > 0) {
		gameServer.update();
		for (var i = 0; i < gameServer.players.length; i++) {
			if (gameServer.players[i].oldX != gameServer.players[i].x || gameServer.players[i].oldY != gameServer.players[i].y) {
				io.emit("updatePlayer", {
					id: gameServer.players[i].id,
					x: gameServer.players[i].x,
					y: gameServer.players[i].y,
				});
			}
		}
		if (gameServer.gameMap.updateTiles.length > 0) {
			io.emit("updateTiles", gameServer.gameMap.updateTiles);
			gameServer.gameMap.updateTiles = [];
		}
	}
}
setInterval(update, 1000 / 30);