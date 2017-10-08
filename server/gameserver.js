module.exports = function(newIO) {
	this.players = [];
	this.speed = 8;
	this.MAPSIZE = 100;

	this.addPlayer = function(player) {
		this.players.push(player);
	};

	this.removePlayer = function(player) {
		for (i = 0; i < this.players.length; i++) {
			if (player == this.players[i]) {
				this.players.splice(i, 1);
			}
		}
	};

	this.changeDir = function(player, newDir) {
		if (newDir == "up" && player.dir == "down")
			return;
		if (newDir == "down" && player.dir == "up")
			return;
		if (newDir == "left" && player.dir == "right")
			return;
		if (newDir == "right" && player.dir == "left")
			return;
		player.nextDir = newDir;
	};

	this.update = function() {
		if (this.players != null) {
			for (i = 0; i < this.players.length; i++) {
				if (this.players[i].x % 40 === 0 && this.players[i].y % 40 === 0) {
					this.players[i].dir = this.players[i].nextDir;
				}

				//x
				if (this.players[i].dir == "right") {
					this.players[i].x += this.speed;
				}
				if (this.players[i].dir == "left") {
					this.players[i].x -= this.speed;
				}

				//y
				if (this.players[i].dir == "up") {
					this.players[i].y -= this.speed;
				}
				if (this.players[i].dir == "down") {
					this.players[i].y += this.speed;
				}

				if (this.players[i].x < 0) {
					this.players[i].x = 0;
					this.players[i].dir = "stop";
				} else if (this.players[i].x > (this.MAPSIZE - 1) * 40) {
					this.players[i].x = (this.MAPSIZE - 1) * 40;
					this.players[i].dir = "stop";
				}

				if (this.players[i].y < 0) {
					this.players[i].y = 0;
					this.players[i].dir = "stop";
				} else if (this.players[i].y > (this.MAPSIZE - 1) * 40) {
					this.players[i].y = (this.MAPSIZE - 1) * 40;
					this.players[i].dir = "stop";
				}
			}
		}
	};
};
