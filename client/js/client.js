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
		document.getElementById("title").remove();
		document.getElementById("panel").remove();
		playing = true;
		console.log('Connected successfully to the server (' + response.playerInstance.name + " " + response.playerInstance.id + ")");
	});

	socket.on("updatePlayers", function(players) { //updatePlayers which is sent at 30hz
		otherPlayers = [];
		for (i = 0; i < players.length; i++) {
			if (players[i] != null && localPlayer != null) {
				if (players[i].id != localPlayer.id) {
					otherPlayers.push(players[i]);
				} else {
					localPlayer = players[i];
				}
			}
		}
	});
}

function updateDir(dir) {
	socket.emit("updateDir", dir);
}
