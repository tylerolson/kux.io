function Player(name) {
	this.name = name;
	this.x = 0;
	this.y = 0;
	this.velX = 0;
	this.velY = 0;
	this.color = "red";

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = this.color; //set color player color
		ctx.rect(this.x, this.y, 40, 40);
		ctx.fill();
	}

	this.update = function() {
		this.x += this.velX;
		this.y += this.velY;
	}
}
