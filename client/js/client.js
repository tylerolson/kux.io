var socket;

var playing = false;
var GAMEID;
var map = [];
var ip;

var localPlayer;

var playerProperties;

if (getQueryVariable("server") != false) {
	var tempName = getQueryVariable("name");
	var tempColor = getQueryVariable("color");
	if (tempName == false) {
		tempName = "Player";
	}
	if (tempColor == false) {
		tempColor = "#4286f4";
	} else {
		tempColor = "#" + tempColor;
	}

	play(getQueryVariable("server"), tempName, tempColor);
}

function playClicked() {
	if (document.getElementById("name").value == "") {
		alert("You must put a name");
		return;
	}
	document.getElementById("playButton").disabled = true;
	if (!playing) {
		play(document.getElementById("serverSelect").value, document.getElementById("name").value, "#" + document.getElementById("color").value);
	}
}

function play(serverName, playerName, playerColor) {
	for (i = 0; i < servers.length; i++) {
		if (servers[i].name == name) {
			ip = "http://" + servers[i].ip + ":" + servers[i].port + "/";
		}
	}
	if (ip == "") {
		console.log("invalid server");
		return;
	}
	console.log(playerName, playerColor);

	console.log("Connecting to server");
	socket = io.connect(ip);

	socket.emit("gameConnect", { //tell server youre connected with your preferences
		name: playerName,
		color: playerColor
	});

	socket.on("gameConnected", function(response) { //once connected set localplayer to server's player
		console.log(response);
		localPlayer = {
			name: response.name,
			color: response.color,
			x: response.x,
			y: response.y
		};
		GAMEID = response.id;

		map = response.map;
		mapSize = response.mapSize;
		tileSize = response.tileSize;
		innerTileSize = response.innerTileSize;
		document.getElementById("title").remove();
		document.getElementById("panel").remove();
		playing = true;
		console.log('Connected successfully to the server (' + localPlayer.name + " " + GAMEID + ")");
	});

	socket.on("playerAdded", function(player) {
		if (player.id == GAMEID)
			return;
		for (i = 0; i < otherPlayers.length; i++) {
			if (otherPlayers[i].id == player.id) {
				return; //found someone
			}
		}
		otherPlayers.push(player); //if not returned add player to otherplayers if its not yours
	});

	socket.on("playerRemoved", function(id) {
		//no need to check for localplayer
		for (i = 0; i < otherPlayers.length; i++) {
			if (otherPlayers[i].id == id) {
				otherPlayers.splice(otherPlayers[i], 1);
			}
		}
		console.log(localPlayer);
	});

	socket.on("updatePlayer", function(player) {
		if (player.id == GAMEID) {
			localPlayer.x = player.x;
			localPlayer.y = player.y;
		}
		for (i = 0; i < otherPlayers.length; i++) {
			if (otherPlayers[i].id == player.id) {
				otherPlayers[i].x = player.x;
				otherPlayers[i].y = player.y;
			}
		}
	});

	socket.on("updateTiles", function(updateTiles) {
		for (i = 0; i < updateTiles.length; i++) {
			map[updateTiles[i].x][updateTiles[i].y] = updateTiles[i];
		}
	});

	socket.on("connect_falied", function() {
		console.log("Connection to server failed");
	});

	socket.on("connect_error", function() {
		alert("Connection error! Server may be offline.");
		location.reload();
	});
}

function updateDir(newDir) {
	socket.emit("updateDir", {
		GAMEID: GAMEID,
		newDir: newDir
	});
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}
