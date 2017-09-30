// main varibles
var canvas = document.getElementById('gameCanvas'); // gets html canvas
var ctx = canvas.getContext('2d'); // gets 2d element of canvas
var mapArea = [
	[]
];
var offsetX,
	offsetY;

const MAP_SIZE = 128;
const TILE_SIZE = 40;

init();

function init() {
	console.log('init')
	updateSize(); // get size of page
	console.log(clientPlayers.length);
	localPlayer = new Player('#30a828', 'player1'); // add local player
	// addLocal(localPlayer);

	// set offset to nearest sqaure
	offsetX = Math.floor(-(canvas.width / 2) / TILE_SIZE) * TILE_SIZE;
	offsetY = Math.floor(-(canvas.height / 2) / TILE_SIZE) * TILE_SIZE;
	start();
}

function start() {
	console.log('started');
	// once we get ok from server add player to list
	clientPlayers.push(localPlayer);

	console.log(clientPlayers.length);

	makeMap();
	requestAnimationFrame(loop); // start loop
}

function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

function update() {
	localPlayer.update();
	//console.log(localPlayer.dir);
}

function draw() {
	updateSize();
	ctx.save();
	ctx.translate(offsetX, offsetY);

	ctx.clearRect(-offsetX, -offsetY, canvas.width, canvas.height); // clear screen

	ctx.fillStyle = '#202c39'; // set bg color
	ctx.fillRect(-offsetX, -offsetY, canvas.width, canvas.height); // draw bg

	drawMap(); // draw map

	for (var i = 0; i < clientPlayers.length; i++) { // draw players
		clientPlayers[i].draw();
	}
	ctx.restore();
	UI();
}

function UI() {
	ctx.fillStyle = '#fff';
	ctx.font = '30px Arial';
	ctx.fillText('Players:', canvas.width - 150, 50);
	ctx.font = '20px Arial';
	for (var i = 0; i < clientPlayers.length; i++) {
		ctx.fillText(clientPlayers[i].name, canvas.width - 150, (i * 30) + 85);
	}
}

function drawMap() {
	for (row = 0; row < MAP_SIZE; row++) {
		for (col = 0; col < MAP_SIZE; col++) {
			x = (TILE_SIZE * row) + canvas.width / 2;
			y = (TILE_SIZE * col) + canvas.height / 2;
			if (mapArea[[row, col]] == '*') {
				ctx.fillStyle = '#283845';
			} else if ((mapArea[[row, col]] == '-')) {
				ctx.fillStyle = '#fff';
			} else if ((mapArea[[row, col]] == localPlayer.name)) {
				ctx.fillStyle = localPlayer.color;
			}

			ctx.fillRect(x, y, 30, 30);
		}
	}
}

function makeMap() {
	for (row = 0; row < MAP_SIZE; row++) {
		for (col = 0; col < MAP_SIZE; col++) {
			mapArea[[row, col]] = ['*']; // fill map empty
		}
	}

	mapArea[[27, 15]] = ['-'];

	drawTest();

	console.log(mapArea[[0]].length);
	console.log(mapArea.length);
}

function drawTest() {
	for (row = 0; row < 7; row++) { // T
		mapArea[[row + 2, 2]] = ['-'];
	}
	for (col = 0; col < 8; col++) { // T
		mapArea[[5, col + 3]] = ['-'];
	}

	for (row = 0; row < 5; row++) { // E
		mapArea[[row + 11, 2]] = ['-'];
	}
	for (row = 0; row < 5; row++) { // E
		mapArea[[row + 11, 6]] = ['-'];
	}
	for (row = 0; row < 5; row++) { // E
		mapArea[[row + 11, 10]] = ['-'];
	}
	for (col = 0; col < 8; col++) { // E
		mapArea[[11, col + 3]] = ['-'];
	}

	for (row = 0; row < 5; row++) { // S
		mapArea[[row + 18, 2]] = ['-'];
	}
	for (col = 0; col < 5; col++) { // S
		mapArea[[18, col + 2]] = ['-'];
	}
	for (row = 0; row < 5; row++) { // S
		mapArea[[row + 18, 6]] = ['-'];
	}
	for (col = 0; col < 5; col++) { // S
		mapArea[[22, col + 6]] = ['-'];
	}
	for (row = 0; row < 5; row++) { // S
		mapArea[[row + 18, 10]] = ['-'];
	}

	for (row = 0; row < 7; row++) { // T
		mapArea[[row + 25, 2]] = ['-'];
	}
	for (col = 0; col < 8; col++) { // T
		mapArea[[28, col + 3]] = ['-'];
	}
}

function updateSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('resize', function(event) {
	updateSize();
	draw();
});
