module.exports = function(boundsArray, minX, maxX, minY, maxY, landId) {

	console.log("flooding", minX, minY);

	function floodFillMap(x, y) {
		if (x < minX || x > maxX || y < minY || y > maxY) {
			return;
		}

		for (var i = 0; i < boundsArray.length; i++) {
			if (boundsArray[i].x == x && boundsArray[i].y == y) {
				if (boundsArray[i].id == landId || boundsArray[i].id == -1) {
					return;
				} else {
					boundsArray[i].id = -1;
				}
			}
		}

		floodFillMap(x + 1, y);
		floodFillMap(x - 1, y);
		floodFillMap(x, y + 1);
		floodFillMap(x, y - 1);
	}

	floodFillMap(minX, minY);

	var inside = [];

	for (var i = 0; i < boundsArray.length; i++) {
		if (boundsArray[i].id == 0) {
			boundsArray[i].id = landId;
		}
		if (boundsArray[i].id != -1) {
			inside.push(boundsArray[i]);
		}
	}

	return inside;
};