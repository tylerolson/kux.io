var servers = ["localhost", "127.0.0.1:3000"];

var socket = io.connect('http://127.0.0.1:3000/');
try {
	servers.forEach(function(element) {
		console.log(element);
	});
} catch (err) {
	console.log(err);
}
socket.on("onconnected", function(response) {
	console.log('Connected successfully to the socket.io server with UUID of ' + response.id);
});
