function Player(name, color, id) {
	this.name = name;
	this.color = "#" + color;
	this.id = id;
	this.x = 20;
	this.y = 20;
	this.dir = "right";
}

module.exports = Player;
