module.exports = function(newIO) {
	this.players = [];
	this.speed = 4;

	this.addPlayer = function(player) {
		this.players.push(player);
		console.log(this.players.name);
		console.log(this.players.length);
	}

	this.removePlayer = function(player) {
		for (i = 0; i < this.players.length; i++) {
			if (player == this.players[i]) {
				this.players.splice(i, 1);
			}
		}
		console.log(this.players.name);
		console.log(this.players.length);
	}

	this.update = function() {
		if (this.players != null) {
			for (i = 0; i < this.players.length; i++) {
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
				//this.players[i].x = 20;
			}
		}
	}

}
