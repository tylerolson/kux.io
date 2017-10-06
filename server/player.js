function Player(name, id) {
	this.name = name;
	this.id = id;
	this.x = 1;
	this.y = 0;
	this.dir = "stop";
	this.color = "#E84A5F";
}

module.exports = Player;
