var canvas = document.getElementById('gameCanvas'); // gets html canvas
var ctx = canvas.getContext('2d'); // gets 2d element of canvas

var cameraX = 0;
var cameraY = 0;

function draw() {
	if (localPlayer != null) {
		cameraX = -localPlayer.x * tileSize + canvas.width / 2;
		cameraY = -localPlayer.y * tileSize + canvas.height / 2;
	}
	ctx.save();

	ctx.translate(cameraX, cameraY);
	ctx.clearRect(-cameraX, -cameraY, canvas.width, canvas.height); // clear screen

	//draw gradient
	var grd = ctx.createRadialGradient(-cameraX + canvas.width / 2, -cameraY + canvas.height / 2, 5, -cameraX + canvas.width / 2, -cameraY + canvas.height / 2, canvas.width);
	grd.addColorStop(0, "#27363B");
	grd.addColorStop(1, "#2A363B");
	ctx.fillStyle = grd;
	ctx.fillRect(-cameraX, -cameraY, canvas.width, canvas.height);


	if (playing) {
		drawMap();
		//draw players
		drawPlayer(localPlayer.color, localPlayer.x, localPlayer.y, localPlayer.name);
		for (i = 0; i < otherPlayers.length; i++) {
			drawPlayer(otherPlayers[i].color, otherPlayers[i].x, otherPlayers[i].y, otherPlayers[i].name);
		}
	}
	ctx.restore();

	if (playing)
		drawUI();
}

function drawMap() {
	for (i = 0; i < mapSize; i++) {
		for (j = 0; j < mapSize; j++) {
			ctx.fillStyle = map[i][j].color;
			if (map[i][j].type == "land") {
				ctx.fillRect(tileSize * i + (tileSize - innerTileSize) / 2, tileSize * j + (tileSize - innerTileSize) / 2, innerTileSize, innerTileSize);
			} else if (map[i][j].type == "trail") {
				ctx.fillRect(tileSize * i + (tileSize - trailTileSize) / 2, tileSize * j + (tileSize - trailTileSize) / 2, trailTileSize, trailTileSize);
			}
		}
	}

	//borders
	ctx.fillStyle = "#262626";
	ctx.fillRect(-innerTileSize, -innerTileSize, innerTileSize, mapSize * tileSize + innerTileSize * 2);
	ctx.fillRect(mapSize * tileSize, -innerTileSize, innerTileSize, mapSize * tileSize + innerTileSize * 2);
	ctx.fillRect(0, -innerTileSize, mapSize * tileSize, innerTileSize);
	ctx.fillRect(0, mapSize * tileSize, mapSize * tileSize, innerTileSize);
}

function drawPlayer(color, x, y, name) {
	ctx.fillStyle = color;
	ctx.strokeStyle = "#444";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, innerTileSize / 1.45, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();

	ctx.font = "32pt Panama-Light";
	ctx.textAlign = "center";
	ctx.fillStyle = "#ffffff";
	ctx.lineWidth = 1;
	ctx.fillText(name, x * tileSize + tileSize / 2, y * tileSize - 10);
	ctx.strokeText(name, x * tileSize + tileSize / 2, y * tileSize - 10);
}

function drawUI() {
	//draw player list
	ctx.fillStyle = "#6297A8";
	ctx.font = "32pt Panama-Light";
	ctx.textAlign = "right";
	ctx.fillText("Players", canvas.width, 33);
	ctx.fillStyle = localPlayer.color;
	ctx.fillText(localPlayer.name, canvas.width, 73);
	for (i = 0; i < otherPlayers.length; i++) {
		ctx.fillStyle = otherPlayers[i].color;
		ctx.fillText(otherPlayers[i].name, canvas.width, 113 + (i * 40));
	}
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
