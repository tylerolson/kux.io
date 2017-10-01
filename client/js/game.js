var player = new Player('ad');

requestAnimationFrame(loop);

function loop() {
	// update
	player.update();

	// draw
	draw();

	requestAnimationFrame(loop);
}

window.addEventListener("keydown", function(event) {
	switch (event.keyCode) {
		case 65: //a
			break;
		case 87: //w
			break;
		case 68: //d
			break;
		case 83: //s
			break;
		case 80: //p
	}
});
