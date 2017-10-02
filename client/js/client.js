var socket;

var playing = false;

function playClicked() {
	if (!playing) {
		play();
	}
}

function play() {
	console.log("Connecting to server");
	socket = io.connect("http://127.0.0.1:3000/");
	socket.emit("gameConnect", document.getElementById("name").value);

	socket.on("gameConnected", function(response) {
		myUUID = response.id;
		localPlayer = response.playerInstance;
		console.log('Connected successfully to the server (' + response.name + " " + response.id + ")");
		playing = true;
	});
}
