function Player(name, color, id, x, y) {
	this.id = id;
	this.name = name;
	this.color = color;
	this.x = x;
	this.y = y;
	this.oldX = 0;
	this.oldY = 0;
	this.dir = "stop";
	this.nextDir = "stop";
}

module.exports = Player;
