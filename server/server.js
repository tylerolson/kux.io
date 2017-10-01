const PORT = 3000;
var io = require('socket.io')(PORT);
var uuid = require('uuid/v4');

console.log('\t socket.io:: Listening on port ' + PORT);

io.sockets.on('connection', function(client) { //when socket gets connection
	client.userid = uuid();
	client.emit('onconnected', {
		id: client.userid
	});
	console.log('\t socket.io:: client ' + client.userid + ' connected');
	client.on('disconnect', function() {
		console.log('\t socket.io:: client ' + client.userid + ' disconnected');
	}); //client.on disconnect
});
