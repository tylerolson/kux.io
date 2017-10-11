function Player(name, color, id) {
	this.name = name;
	this.color = "#" + color;
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.oldX = 0;
	this.oldY = 0;
	this.dir = "stop";
	this.nextDir = "stop";
}

module.exports = Player;
