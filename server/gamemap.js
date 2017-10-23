module.exports = function(mapSize, tileSize, innerTileSize, trailTileSize) {
	this.map = [];
	this.updateTiles = [];
	this.mapSize = mapSize;
	this.tileSize = tileSize;
	this.innerTileSize = innerTileSize;
	this.trailTileSize = trailTileSize;

	this.setCellData = function(x, y, id, color, type) {
		this.map[x][y] = {
			x: x,
			y: y,
			id: id,
			color: color,
			type: type
		};
		this.updateTiles.push(this.map[x][y]);
	};

	this.clearPlayerLand = function(id) {
		for (i = 0; i < this.mapSize; i++) {
			for (j = 0; j < this.mapSize; j++) {
				if (this.map[i][j].id == id) {
					this.setCellData(i, j, 0, "#3a4f56", "land");
				}
			}
		}
	};

	this.addPlayerLand = function(player) {
		for (i = -1; i < 2; i++) {
			for (j = -1; j < 2; j++) {
				this.setCellData(player.x + i, player.y + j, player.id, player.color, "land");
			}
		}
	};

	this.clearMap = function() {
		for (i = 0; i < this.mapSize; i++) {
			this.map[i] = [];
			for (j = 0; j < this.mapSize; j++) {
				this.map[i][j] = {
					x: i,
					y: j,
					id: 0,
					color: "#3a4f56",
					type: "land"
				};
			}
		}
	};
	this.clearMap();
};
