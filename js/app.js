// Enemies our player must avoid

// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
let level = 1;

class Entity {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 101;
    this.dy = 83;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/*
We want range of X values to be between 0 and this.dx*4
We want range of Y values to be between this.dy - 20 and this.dy * 3 - 20;
*/

class Enemy extends Entity {
  constructor(x, y, speed) {
    super();
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.x >= 500) {
      let thisIndex = allEnemies.indexOf(this);
      allEnemies.splice(thisIndex, 1);
      generateNewEnemy();
    } else {
      this.x += Math.floor(dt * this.speed * 75);
    }
  }
}

let allEnemies = [];
generateEnemy(level);

function checkCollisions() {
  allEnemies.forEach(enemyBug => {
    let aRange = player.x - 50;
    let bRange = player.x + 40;
    if (
      enemyBug.x >= aRange &&
      enemyBug.x <= bRange &&
      enemyBug.y === player.y
    ) {
      player.x = player.dx * 2;
      player.y = player.dy * 5 - 20;
    }
  });
}

/* 10 levels
1 - 3 bugs | speed 1-4
2 - 3 bugs | speed 1-5
3 - 4 bugs | speed 1 - 6
4 - 4 bugs | speed 2-6
5 - 5 bugs | speed 2-7
6 - 6 bugs | speed 3 - 7
7 - 7 bugs | speed 4 - 7
8 - 8 bugs | speed 4-8
9 - 9 bugs | speed 4-9
10 - 10 bugs | speed 5-9
*/
function generateEnemy(level) {
  let yRandom = Math.floor(Math.random() * 3) + 1;
  let y = 83 * yRandom - 20;
  let x = -100;
  switch (level) {
    case 1:
      for (let i = 0; i < 3; i++) {
        let speed = Math.floor(Math.random() * 4 + 1);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 2:
      for (let i = 0; i < 3; i++) {
        let speed = Math.floor(Math.random() * 5 + 1);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 3:
      for (let i = 0; i < 4; i++) {
        let speed = Math.floor(Math.random() * 6 + 1);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 4:
      for (let i = 0; i < 4; i++) {
        let speed = Math.floor(Math.random() * 6 + 2);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 5:
      for (let i = 0; i < 5; i++) {
        let speed = Math.floor(Math.random() * 7 + 2);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 6:
      for (let i = 0; i < 6; i++) {
        let speed = Math.floor(Math.random() * 7 + 3);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 7:
      for (let i = 0; i < 7; i++) {
        let speed = Math.floor(Math.random() * 7 + 4);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 8:
      for (let i = 0; i < 8; i++) {
        let speed = Math.floor(Math.random() * 8 + 4);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 9:
      for (let i = 0; i < 9; i++) {
        let speed = Math.floor(Math.random() * 9 + 4);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
    case 10:
      for (let i = 0; i < 10; i++) {
        let speed = Math.floor(Math.random() * 10 + 5);
        allEnemies.push(new Enemy(x, y, speed));
      }
      break;
  }
}

function generateNewEnemy() {
  let speed = Math.floor(Math.random() * 6 + 1);
  let yRandom = Math.floor(Math.random() * 3) + 1;
  let y = 83 * yRandom - 20;
  let x = -100;
  allEnemies.push(new Enemy(x, y, speed));
}

function clearEnemies() {}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Entity {
  constructor() {
    super();
    this.sprite = "images/char-boy.png";
    this.x = this.dx * 2;
    this.y = this.dy * 5 - 20;
  }
  handleInput(inputKey) {
    switch (inputKey) {
      case "up":
        if (this.y > -20) {
          this.y -= this.dy;
        }
        break;
      case "down":
        if (this.y < 395) {
          this.y += this.dy;
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x -= this.dx;
        }
        break;
      case "right":
        if (this.x < 404) {
          this.x += this.dx;
        }
        break;
      default:
        break;
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
const player = new Player();
