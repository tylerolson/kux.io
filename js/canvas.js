var canvas = document.getElementById('gameCanvas'); // gets html canvas
var ctx = canvas.getContext('2d'); // gets 2d element of canvas

function draw() {
	ctx.save();

	ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen
	//draw gradient
	var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 5, canvas.width / 2, canvas.height / 2, canvas.width);
	grd.addColorStop(0, "#27363B");
	grd.addColorStop(1, "#27363B");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (playing)
		drawPlayer();

	ctx.restore();
}

function drawPlayer() {
	ctx.beginPath();
	ctx.fillStyle = localPlayer.color; //set color player color
	ctx.rect(localPlayer.x, localPlayer.y, 40, 40);
	ctx.fill();
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
