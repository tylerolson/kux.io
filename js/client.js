var socket;

var playing = false;

function playClicked() {
	if (!playing) {
		play();
	}
}

function play() {
	console.log("Connecting to server");
	socket = io.connect("http://localhost:27015/");

	socket.emit("gameConnect", document.getElementById("name").value);
	socket.on("gameConnected", function(response) {
		localPlayer = response.playerInstance;
		console.log('Connected successfully to the server (' + response.name + " " + response.id + ")");
		document.getElementById("title").remove();
		document.getElementById("panel").remove();
		playing = true;
	});

	socket.on("test", function() {
		console.log("test");
	});

	socket.on("updatePlayers", function(players) {
		for (i = 0; i < players.length; i++) {
			console.log(players[i].id + " " + localPlayer.id);
			if (localPlayer.id == players[i].id) {
				localPlayer = players[i];
			}
		}

	});
}

function updateDir(dir) {
	socket.emit("updateDir", dir);
}
