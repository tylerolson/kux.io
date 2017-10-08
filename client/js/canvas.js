var canvas = document.getElementById('gameCanvas'); // gets html canvas
var ctx = canvas.getContext('2d'); // gets 2d element of canvas

var cameraX = 0;
var cameraY = 0;

function draw() {

	if (localPlayer != null) {
		cameraX = -localPlayer.x + canvas.width / 2;
		cameraY = -localPlayer.y + canvas.height / 2;
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
		drawPlayer(localPlayer.color, localPlayer.x, localPlayer.y);
		for (i = 0; i < otherPlayers.length; i++) {
			drawPlayer(otherPlayers[i].color, otherPlayers[i].x, otherPlayers[i].y);
		}
	}
	ctx.restore();

	if (playing)
		drawUI();
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

function drawMap() {
	for (i = 0; i < mapSize; i++) {
		for (j = 0; j < mapSize; j++) {
			ctx.fillStyle = "#3a4f56";
			ctx.fillRect(tileSize * i + 5, tileSize * j + 5, playerSize, playerSize);
		}
	}

	//borders
	ctx.fillStyle = "#262626";
	ctx.fillRect(-playerSize, -playerSize, playerSize, mapSize * tileSize + playerSize * 2);
	ctx.fillRect(mapSize * tileSize, -playerSize, playerSize, mapSize * tileSize + playerSize * 2);
	ctx.fillRect(0, -playerSize, mapSize * tileSize, playerSize);
	ctx.fillRect(0, mapSize * tileSize, mapSize * tileSize, playerSize);
}

function drawPlayer(color, x, y) {
	ctx.fillStyle = color;
	ctx.fillRect(x + (tileSize - playerSize) / 2, y + (tileSize - playerSize) / 2, playerSize, playerSize);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
