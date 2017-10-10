module.exports = function() {
	this.players = [];
	this.speed = 8;
	this.map = [
		[]
	];

	this.update = function() {
		if (this.players != null) {
			for (i = 0; i < this.players.length; i++) {
				if (this.players[i].x % this.tileSize === 0 && this.players[i].y % this.tileSize === 0) {
					this.players[i].dir = this.players[i].nextDir;
				}

				this.map[[this.players[i].x / this.playerSize, this.players[i].y / this.playerSize]] = this.players[i].id;

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
				} else if (this.players[i].x > (this.mapSize - 1) * this.tileSize) {
					this.players[i].x = (this.mapSize - 1) * this.tileSize;
					this.players[i].dir = "stop";
				}

				if (this.players[i].y < 0) {
					this.players[i].y = 0;
					this.players[i].dir = "stop";
				} else if (this.players[i].y > (this.mapSize - 1) * this.tileSize) {
					this.players[i].y = (this.mapSize - 1) * this.tileSize;
					this.players[i].dir = "stop";
				}
			}
		}
	};

	this.makeMap = function(mapSize, tileSize, playerSize) {
		this.mapSize = mapSize;
		this.tileSize = tileSize;
		this.playerSize = playerSize;

		for (i = 0; i < this.mapSize; i++) {
			for (j = 0; j < this.mapSize; j++) {
				this.map[[i, j]] = 0;
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
};
