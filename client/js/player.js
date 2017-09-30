var clientPlayers = [];
var localPlayer;

function Player(color, name, local) {
  this.width = 24;
  this.height = 30;
  this.color = color;
  this.name = name;
  this.local = local;
  this.speed = 4;
  this.dir;
  this.nextDir;
  this.inSqaure = true;

  this.getSqaureX = function() {
    return -Math.round(offsetX / tileSize);
  }
  this.getSqaureY = function() {
    return -Math.round(offsetY / tileSize);
  }

  this.update = function() {
    if (offsetX % tileSize === 0 && offsetY % tileSize === 0) { //if offsetx is in a sqaure
      this.inSqaure = true;
    } else
      this.inSqaure = false;

    if (this.inSqaure) {
      this.dir = this.nextDir;
    }

    //x
    if (offsetX < 0) { //x inside the area
      if (offsetX > (mapSize - 1) * -40) {
        if (this.dir == "left") { //dir left
          offsetX += this.speed; //go left
        } else if (this.dir == "right") { //dir right
          offsetX -= this.speed; //go right
        }
      } else if (this.dir == "left") {
        offsetX += this.speed;
      }
    } else if (this.dir == "right") { //check if going right to prevent getting stuck
      offsetX -= this.speed; //go right
    }

    //y
    if (offsetY < 0) { //y inside the area
      if (offsetY > (mapSize - 1) * -40) {
        if (this.dir == "up") {
          offsetY += this.speed;
        } else if (this.dir == "down") {
          offsetY -= this.speed;
        }
      } else if (this.dir == "up") {
        offsetY += this.speed;
      }
    } else if (this.dir == "down") { //check if going down to prevent getting stuck
      offsetY -= this.speed;
    }

    mapArea[[this.getSqaureX(), this.getSqaureY()]] = this.name;
  }
  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color; //set color player color
    ctx.arc(canvas.width / 2 - offsetX + 15, canvas.height / 2 - offsetY + 15, this.width, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function checkPlayerInSqaure(playerComponent) {
  return this.playerComponent.inSqaure;
}

function changeDir(newDir, oppDir, Player) {
  if (this.Player.dir != this.oppDir) {
    if (this.Player.inSqaure) {
      this.Player.dir = this.newDir;
      this.Player.nextDir = "";
      console.log(this.Player.dir);
    } else {
      this.Player.nextDir = this.newDir;
    }
  }
}

//event listeners
window.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 65: //a
      console.log(localPlayer);
      if (localPlayer.dir != "right") {
        if (checkPlayerInSqaure(localPlayer)) {
          localPlayer.dir = "left";
          localPlayer.nextDir = "";
        } else {
          localPlayer.nextDir = "left";
        }
      }
      break;
    case 87: //w
      changeDir("up", "down");
      break;
    case 68: //d
      changeDir("right", "left");
      break;
    case 83: //s
      changeDir("down", "up");
      break;
    case 80: //p
      changeDir("pause", "pause");
  }
});
