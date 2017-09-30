var express = require('express');
var socket = require('socket.io');

var app = express();
var server = require('http').Server(app);
var io = socket(server);

const prefix = "[SERVER]";

var mapArea = [
  []
];
var serverPlayers = [];

var mapSize = 128,
  tileSize = 40;

server.listen(80);

io.on('connection', function(socket) { //when socket gets connection
  console.log(prefix + "socket connection"); //state connection

  socket.emit('mapSize', mapSize);
  console.log(prefix + "sent mapsize");

  socket.emit('tileSize', tileSize);
  console.log(prefix + "sent tilesize");

  socket.emit('init', 'init');
  console.log(prefix + "send init flag");

  socket.on('addLocal', function(data) {
    serverPlayers.push(data);
    console.log(prefix + "got local player from client");
    socket.emit('start', 'start'); //send start flag to client
    console.log(prefix + "sent start");
  });

  socket.on('addPlayer', function(data) { //get player from client
    serverPlayers.push(data);
    console.log(prefix + "got player from client");
    socket.emit('newPlayer', data);
    console.log(prefix + "sent player back to client");
  });

  socket.on('disconnect', function() {
    console.log(prefix + "disconnect");
    console.log(prefix);
  });
});
