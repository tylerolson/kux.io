module.exports = function(boundsArray, minX, maxX, minY, maxY, landId) {

	console.log("flooding", minX, maxX, minY, maxY);

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
					boundsArray[i].color = "#FFFFFF";
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
	var outside = [];

	for (var i = 0; i < boundsArray.length; i++) {
		console.log(boundsArray[i].id);
		if (boundsArray[i].id == -1) {
			boundsArray[i].id = 0; //This line right here drove me insane for months
			outside.push(boundsArray[i]);
		} else {
			//console.log(boundsArray[i].x, boundsArray[i].y);
			boundsArray[i].id = landId;
			inside.push(boundsArray[i]);
		}
	}

	return boundsArray;
};