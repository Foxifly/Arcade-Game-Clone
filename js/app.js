// Enemies our player must avoid

// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
let level = 1;
let lives = 3;
let lifeInnerHTML = ``;

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

function startGame() {
  player.livesTracker();
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
      lives--;
      player.livesTracker();
    }
  });
}

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

function clearEnemies() {
  allEnemies = [];
}
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
          this.handleComplete();
        }
        break;
      case "down":
        if (this.y < 395) {
          this.y += this.dy;
          this.handleComplete();
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x -= this.dx;
          this.handleComplete();
        }
        break;
      case "right":
        if (this.x < 404) {
          this.x += this.dx;
          this.handleComplete();
        }
        break;
      default:
        break;
    }
  }
  handleComplete() {
    if (this.y === -20) {
      this.reset();
      clearEnemies();
      if (level < 10) {
        level++;
        generateEnemy(level);
      } else if (level === 10) {
        generateEnemy(level);
        alert("WinnerWinner");
      }
    }
  }

  livesTracker() {
    if (lives > 0) {
      for (let i = lives; i > 0; i--) {
        lifeInnerHTML += `
      <div class="life-heart"><img class="heart-image" alt="heart icon" src="images/Heart.png"></div>
      `;
      }
    } else {
      alert("game over");
    }

    this.lifeUpdater();
    lifeInnerHTML = "";
  }
  lifeUpdater() {
    let livesDiv = document.querySelector(".lives-container");
    livesDiv.innerHTML = lifeInnerHTML;
  }
  reset() {
    this.x = this.dx * 2;
    this.y = this.dy * 5 - 20;
  }
}

const handleModal = () => {
  let modal = document.querySelector(".modal");
  modal.style.display = "flex";
  modal.innerHTML = `
  <div class="modal-content">
    <span class="close"><i class="fa fa-times"></i></span>
    <div class="modal-text">
      <h2 class="lose">Out Of Lives</h2>
      <h3>You are out of lives, please try again. </h3>
    </div>
    <button class="try-again">Try Again</button>
    `;

  let tryAgain = document.getElementsByClassName("try-again")[0];
  tryAgain.onclick = () => {
    modal.style.display = "none";
  };
};
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
startGame();
