module.exports = function(newIO) {
	this.players = [];
	this.speed = 8;

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

				switch (this.players[i].dir) {
					case "left":
						this.players[i].x -= this.speed;
						break;
					case "right":
						this.players[i].x += this.speed;
						break;
					case "down":
						this.players[i].y += this.speed;
						break;
					case "up":
						this.players[i].y -= this.speed;
						break;
					default:
				}
			}
		}
	};
};
