var socket;

var playing = false;

function playClicked() {
	if (document.getElementById("name").value == "") {
		alert("You must put a name");
		return;
	}
	document.getElementById("playButton").disabled = true;
	if (!playing) {
		play();
	}
}

function play() {
	console.log("Connecting to server");
	socket = io.connect("http://66.234.215.128:27015/");

	socket.emit("gameConnect", { //tell server youre connected with your preferences
		name: document.getElementById("name").value,
		color: document.getElementById("color").value
	});

	socket.on("gameConnected", function(response) { //once connected set localplayer to server's player
		localPlayer = response.playerInstance;
		map = response.map;
		console.log(response);
		mapSize = response.mapSize;
		tileSize = response.tileSize;
		playerSize = response.playerSize;
		document.getElementById("title").remove();
		document.getElementById("panel").remove();
		playing = true;
		console.log('Connected successfully to the server (' + response.playerInstance.name + " " + response.playerInstance.id + ")");
	});

	socket.on("update", function(response) { //updatePlayers which is sent at 30hz
		otherPlayers = [];
		for (i = 0; i < response.players.length; i++) {
			if (response.players[i] != null && localPlayer != null) {
				if (response.players[i].id != localPlayer.id) {
					otherPlayers.push(response.players[i]);
				} else {
					localPlayer = response.players[i];
				}
			}
		}
	});

	socket.on("updateMap", function(map) {
		console.log(map);
	});
}

function updateDir(dir) {
	socket.emit("updateDir", dir);
}
