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

	if (playing) {
		//draw players
		drawPlayer(ctx, localPlayer.color, localPlayer.x, localPlayer.y);
		for (i = 0; i < otherPlayers.length; i++) {
			drawPlayer(ctx, otherPlayers[i].color, otherPlayers[i].x, otherPlayers[i].y);
		}

		//draw player list
		ctx.fillStyle = "#fff";
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

	ctx.restore();
}

function drawPlayer(ctx, color, x, y) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.rect(x, y, 40, 40);
	ctx.fill();
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
