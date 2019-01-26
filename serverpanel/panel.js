var socket = io.connect('http://localhost:3000');
var players = [];

socket.emit("panel");
socket.on("players", function (data) {
  players = data;
  for (var i = 0; i < data.length; i++) {
    addPlayerRow(data[i]);
  }
});

socket.on("playerAdded", function (player) {
  players.push(player);
  addPlayerRow(player);
});

socket.on("playerRemoved", function (id) {
  for (var i = 0; i < players.length; i++) {
    if (players[i].id == id) {
      removePlayerRow(players[i]);
    }
  }
});

function addPlayerRow(player) {
  var row = document.createElement("div");
  row.classList.add("playerRow");
  row.innerHTML = player.name;
  document.body.appendChild(row);
}

function removePlayerRow(player) {
  var playerRows = document.getElementsByClassName("playerRow");
  for (var i = 0; i < playerRows.length; i++) {
    if (playerRows[i].innerHTML == player.name) {
      playerRows[i].parentNode.removeChild(playerRows[i]);
    }
  }
}