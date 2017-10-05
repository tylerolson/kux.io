module.exports = function() {
	this.players = [];
	this.client;
	console.log("init yeah");

	this.addPlayer = function(player) {
		this.players.push(player);
	}

	this.update = function() {
		//console.log("update");
		for (i = 0; i < players.length; i++) {
			players[i].x += velX;
			players[i].y += velY;
		}

	}

	setInterval(this.update, 1000 / 30);
}
