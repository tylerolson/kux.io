var socket = io.connect('http://localhost/');
const prefix = "[CLIENT]";

socket.on('connect', function() {
  console.log(prefix + "connected to server");

  socket.on('mapSize', function(data) { //wait for mapSize
    mapSize = data;
    console.log(prefix + " got mapSize");
  });

  socket.on('tileSize', function(data) { //wait for tileSize
    tileSize = data;
    console.log(prefix + " got tileSize");
  });

  socket.on('newPlayer', function(data) { //get player from server
    clientPlayers.push(data);
    console.log(prefix + " got player from server");
  });

  socket.on('init', function(data) {
    init();
  });

  socket.on('start', function(data) { //wait for start flag from server
    start();
  });
});

function addLocal(Player) { //send local player to server
  socket.emit('addLocal', Player);
  console.log(prefix + " send local player to server");
}
