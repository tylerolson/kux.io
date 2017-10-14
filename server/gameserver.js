module.exports = function() {
	this.speed = 8;
	this.players = [];
	this.map = [];
	this.updateTiles = [];

	this.update = function() {
		if (this.players != null) {
			for (i = 0; i < this.players.length; i++) {
				this.players[i].oldX = this.players[i].x;
				this.players[i].oldY = this.players[i].y;
				this.updateTiles = [];
				if (this.players[i].x % this.tileSize === 0 && this.players[i].y % this.tileSize === 0) { //when in sqaure
					this.players[i].dir = this.players[i].nextDir;
					if (this.map[this.players[i].x / this.tileSize][this.players[i].y / this.tileSize].id != this.players[i].id) {
						this.map[this.players[i].x / this.tileSize][this.players[i].y / this.tileSize] = {
							x: this.players[i].x / this.tileSize,
							y: this.players[i].y / this.tileSize,
							id: this.players[i].id,
							color: this.players[i].color
						};
						this.updateTiles.push(this.map[this.players[i].x / this.tileSize][this.players[i].y / this.tileSize]);
					}
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
		this.map = [];

		for (i = 0; i < mapSize; i++) {
			this.map[i] = [];
			for (j = 0; j < mapSize; j++) {
				this.map[i][j] = {
					x: i,
					y: j,
					id: 0,
					color: "#3a4f56"
				};
			}
		}
	};

	this.changeDir = function(player, newDir) {
		if (player == null)
			return;
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
		this.players.splice(this.players.indexOf(player), 1);
	};
};
