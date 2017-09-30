var canvas = document.getElementById('gameCanvas'); // gets html canvas
var ctx = canvas.getContext('2d'); // gets 2d element of canvas
const MAP_SIZE = 100;

var browserZoomLevel;
var scale;

function draw() {
	browserZoomLevel = Math.round(window.devicePixelRatio * 100) / 100;
	ctx.save();
	//ctx.translate(offsetX, offsetY);

	ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen
	var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 5, canvas.width / 2, canvas.height / 2, canvas.width);
	grd.addColorStop(0, "#F0FAFC");
	grd.addColorStop(1, "#BDCCD1");
	// Fill with gradient
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//drawMap(); // draw map

	//.9 = .9 + Math.abs(.9 - 1)


	scale = 2 * (1 - browserZoomLevel) + browserZoomLevel;
	//ctx.scale(scale, scale);
	player.draw();
	ctx.restore();
}

function resize() {

	draw();
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
