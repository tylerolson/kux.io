module.exports = {
	Player: function(name) {
		this.name = name;
		this.x = 0;
		this.y = 0;
		this.velX;
		this.velY;
		this.dir;
		this.color = "#E84A5F";

		this.draw = function() {
			ctx.beginPath();
			ctx.fillStyle = this.color; //set color player color
			ctx.rect(this.x, this.y, 40, 40);
			ctx.fill();
		}
	}
}
