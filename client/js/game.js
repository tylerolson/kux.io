var localPlayer;
var otherPlayers = [];

requestAnimationFrame(loop);

function loop() {
	if (localPlayer != null) {
		cameraX = -localPlayer.x + canvas.width / 2;
		cameraY = -localPlayer.y + canvas.height / 2;
	}
	draw();
	requestAnimationFrame(loop);
}

function setDir(newDir) {
	if (localPlayer.dir != newDir) {
		localPlayer.dir = newDir;
		updateDir(localPlayer.dir);
	}
}

window.addEventListener("keydown", function(event) {
	if (!playing)
		return;
	switch (event.keyCode) {
		case 65: //a
			setDir("left");
			break;
		case 87: //w
			setDir("up");
			break;
		case 68: //d
			setDir("right");
			break;
		case 83: //s
			setDir("down");
			break;
		case 80: //p
			setDir("stop");
			break;
	}
});
