module.exports = function(mapSize, tileSize, innerTileSize) {
	this.map = [];
	this.updateTiles = [];
	this.mapSize = mapSize;
	this.tileSize = tileSize;
	this.innerTileSize = innerTileSize;

	this.testMap = function() {
		var size = 10;
		var lineCells = [];
		var testMap = [
			[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];

		var minX = 2,
			maxX = 7;
		var minY = 0,
			maxY = 3;

		for (i = 0; i < lineCells.length; i++) {
			//console.log(lineCells[i]);
		}
	};
	this.testMap();

	this.setCellData = function(x, y, id, color) {
		this.map[x][y] = {
			x: x,
			y: y,
			id: id,
			color: color
		};
		this.updateTiles.push(this.map[x][y]);
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
