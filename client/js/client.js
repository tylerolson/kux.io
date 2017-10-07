var socket;

var playing = false;

function playClicked() {
	document.getElementById("playButton").disabled = true;
	if (!playing) {
		play();
	}
}

function play() {
	console.log("Connecting to server");
	socket = io.connect("http://66.234.215.128:27015/");

	socket.emit("gameConnect", document.getElementById("name").value);
	socket.on("gameConnected", function(response) {
		localPlayer = response.playerInstance;
		console.log('Connected successfully to the server (' + response.playerInstance.name + " " + response.playerInstance.id + ")");
		document.getElementById("title").remove();
		document.getElementById("panel").remove();
		playing = true;
	});

	socket.on("playerList", function(players) {
		for (i = 0; i < players.length; i++) {
			if (players[i] != null) {
				if (players[i].id != localPlayer.id) {
					otherPlayers.push(players[i]);
				}
			}
		}
	});

	socket.on("updatePlayers", function(players) {
		otherPlayers = [];
		for (i = 0; i < players.length; i++) {
			if (players[i] != null && localPlayer != null) {
				if (localPlayer.id == players[i].id) {
					localPlayer = players[i];
				} else {
					otherPlayers.push(players[i]);
				}
			}
		}
	});
}

function updateDir(dir) {
	socket.emit("updateDir", dir);
}
