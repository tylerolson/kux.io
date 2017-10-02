var localPlayer;

var myUUID;

requestAnimationFrame(loop);

function loop() {
	draw();
	if (playing) {}
	requestAnimationFrame(loop);
}

window.addEventListener("keydown", function(event) {
	if (!playing)
		return;
	switch (event.keyCode) {
		case 65: //a
			localPlayer.dir = "left";
			break;
		case 87: //w
			localPlayer.dir = "up";
			break;
		case 68: //d
			localPlayer.dir = "right";
			break;
		case 83: //s
			localPlayer.dir = "down";
			break;
		case 80: //p
			localPlayer.dir = "stop";
			break;
	}
});
