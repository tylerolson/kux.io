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
		for (var i = 0; i < this.mapSize; i++) {
			for (var j = 0; j < this.mapSize; j++) {
				if (this.map[i][j].id == id) {
					this.setCellData(i, j, 0, "#3a4f56", "land");
				}
			}
		}
	};

	this.addPlayerLand = function(player) {
		for (var i = -1; i < 2; i++) {
			for (var j = -1; j < 2; j++) {
				this.setCellData(player.x + i, player.y + j, player.id, player.color, "land");
			}
		}
	};

	this.getMinMaxPlayerCoords = function(id) {
		var tempMinX = this.mapSize;
		var tempMinY = this.mapSize;
		var tempMaxX = 0;
		var tempMaxY = 0;
		for (var i = 0; i < this.mapSize; i++) {
			for (var j = 0; j < this.mapSize; j++) {
				if (this.map[i][j].id == id) {
					if (this.map[i][j].x < tempMinX) {
						tempMinX = this.map[i][j].x;
					}
					if (this.map[i][j].y < tempMinY) {
						tempMinY = this.map[i][j].y;
					}
					if (this.map[i][j].x > tempMaxX) {
						tempMaxX = this.map[i][j].x;
					}
					if (this.map[i][j].y > tempMaxY) {
						tempMaxY = this.map[i][j].y;
					}
				}
			}
		}
		var output = {
			minX: tempMinX,
			minY: tempMinY,
			maxX: tempMaxX,
			maxY: tempMaxY
		};
		return output;
	};

	this.clearMap = function() {
		for (var i = 0; i < this.mapSize; i++) {
			this.map[i] = [];
			for (var j = 0; j < this.mapSize; j++) {
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