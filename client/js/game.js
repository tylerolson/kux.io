var player = new Player('ad');

window.onload = function init() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	loop();
}

function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

function update() {
	player.update();
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
