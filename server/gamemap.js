module.exports = function(mapSize, tileSize, innerTileSize) {
	this.map = [];
	this.updateTiles = [];
	this.mapSize = mapSize;
	this.tileSize = tileSize;
	this.innerTileSize = innerTileSize;

	this.setCellData = function(x, y, id, color) {
		this.map[x][y] = {
			x: x,
			y: y,
			id: id,
			color: color
		};
		this.updateTiles.push(this.map[x][y]);
	};

	this.clearPlayerLand = function(id) {
		for (i = 0; i < this.mapSize; i++) {
			for (j = 0; j < this.mapSize; j++) {
				if (this.map[i][j].id == id) {
					this.setCellData(i, j, 0, "#3a4f56");
				}
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
					color: "#3a4f56"
				};
			}
		}
	};
	this.clearMap();
};
