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
		myUUID = response.id;
		localPlayer = response.playerInstance;
		console.log('Connected successfully to the server (' + response.name + " " + response.id + ")");
		document.getElementById("title").remove();
		document.getElementById("panel").remove();
		playing = true;
	});
}

function updateLocalPlayer(dir) {
	socket.emit("updateLocalDir", dir);
}
