// Enemies our player must avoid

// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
let level = 1;
let lives = 3;
let lifeInnerHTML = ``;
let allowMove = true;

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
function newGame() {
  lives = 3;
  level = 1;
  player.reset();
  clearEnemies();
  generateEnemy(level);
  player.livesTracker();
  allowMove = true;
}
/*
We want range of X values to be between 0 and this.dx*4
We want range of Y values to be between this.dy - 20 and this.dy * 3 - 20;
*/

class Enemy extends Entity {
  constructor(x, y, speed) {
    super();
    this.sprite = "images/octopus.png";
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.x >= 700) {
      let thisIndex = allEnemies.indexOf(this);
      allEnemies.splice(thisIndex, 1);
      generateNewEnemy();
    } else {
      this.x += Math.floor(dt * this.speed * 75);
    }
  }

  updateBackwards(dt) {
    if (this.x <= -100) {
      let thisIndex = allBackwardEnemies.indexOf(this);
      allBackwardEnemies.splice(thisIndex, 1);
      generateNewBackwardEnemy();
    } else {
      this.x -= Math.floor(dt * this.speed * 75);
    }
  }
}

let allEnemies = [];
let allBackwardEnemies = [];
generateEnemy(level);

function checkCollisions() {
  allEnemies.forEach(enemyBug => {
    let aRange = player.x - 60;
    let bRange = player.x + 60;
    if (
      enemyBug.x >= aRange &&
      enemyBug.x <= bRange &&
      enemyBug.y === player.y - 20
    ) {
      player.x = player.dx * 3;
      player.y = player.dy * 5;
      lives--;
      player.livesTracker();
    }
  });
  allBackwardEnemies.forEach(enemyBug => {
    let aRange = player.x - 60;
    let bRange = player.x + 60;
    if (
      enemyBug.x >= aRange &&
      enemyBug.x <= bRange &&
      enemyBug.y === player.y - 20
    ) {
      player.x = player.dx * 3;
      player.y = player.dy * 5;
      lives--;
      player.livesTracker();
    }
  });
}

class Gem extends Entity {
  constructor() {
    super();
    //this.x = player.dx * 1;
    //this.y = player.dy * 5 - 20;
    this.x = -100;
    this.y = -100;
    this.sprite = this.generateItem();
  }
  generateItem() {
    let itemSprites = [
      "images/bluegem.png",
      "images/orangegem.png",
      "images/greengem.png"
    ];
    return itemSprites[Math.floor(Math.random() * itemSprites.length)];
  }
}

function generateEnemy(level) {
  let x = -100;
  let backwardx = 650;
  let levelP = document.querySelector(".level");

  switch (level) {
    case 1:
      for (let i = 0; i < 3; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 4 + 1);
        allEnemies.push(new Enemy(x, y, speed));
      }
      for (let i = 0; i < 3; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 4 + 1);
        allBackwardEnemies.push(new Enemy(backwardx, y, speed));
      }
      levelP.innerText = "Level 1";
      break;
    case 2:
      for (let i = 0; i < 3; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 5 + 1);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 2";
      break;
    case 3:
      for (let i = 0; i < 4; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 6 + 1);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 3";
      break;
    case 4:
      for (let i = 0; i < 4; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 6 + 2);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 4";
      break;
    case 5:
      for (let i = 0; i < 5; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 7 + 2);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 5";
      break;
    case 6:
      for (let i = 0; i < 6; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 7 + 3);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 6";
      break;
    case 7:
      for (let i = 0; i < 7; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 7 + 4);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 7";
      break;
    case 8:
      for (let i = 0; i < 8; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 8 + 4);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 8";
      break;
    case 9:
      for (let i = 0; i < 9; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 9 + 4);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 9";
      break;
    case 10:
      for (let i = 0; i < 10; i++) {
        let yRandom = Math.floor(Math.random() * 3) + 1;
        let y = 83 * yRandom - 20;
        let speed = Math.floor(Math.random() * 10 + 5);
        allEnemies.push(new Enemy(x, y, speed));
      }
      levelP.innerText = "Level 10";
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
function generateNewBackwardEnemy() {
  let speed = Math.floor(Math.random() * 6 + 1);
  let yRandom = Math.floor(Math.random() * 3) + 1;
  let y = 83 * yRandom - 20;
  let x = 650;
  allBackwardEnemies.push(new Enemy(x, y, speed));
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
    this.sprite = this.randomSprite();
    this.x = this.dx * 3;
    this.y = this.dy * 5;
  }
  handleInput(inputKey) {
    if (allowMove === true) {
      switch (inputKey) {
        case "up":
          if (this.y > 0) {
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
          if (this.x < 604) {
            this.x += this.dx;
            this.handleComplete();
          }
          break;
        default:
          break;
      }
    }
  }
  handleComplete() {
    if (this.y === 0) {
      setTimeout(() => {
        this.reset();
      }, 200);

      clearEnemies();
      if (level < 10) {
        level++;
        generateEnemy(level);
      } else if (level === 10) {
        generateEnemy(level);
        clearEnemies();
        this.handleModal();
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
      clearEnemies();
      allowMove = false;
      this.handleModal();
    }

    this.lifeUpdater();
    lifeInnerHTML = "";
  }
  lifeUpdater() {
    let livesDiv = document.querySelector(".lives-container");
    livesDiv.innerHTML = lifeInnerHTML;
  }
  reset() {
    this.x = this.dx * 3;
    this.y = this.dy * 5;
  }
  randomSprite() {
    let playerSprites = [
      "images/sub-pink.png",
      "images/sub-yellow.png",
      "images/sub-orange.png",
      "images/sub-green.png",
      "images/sub-purple.png",
      "images/sub-blue.png"
    ];
    return playerSprites[Math.floor(Math.random() * playerSprites.length)];
  }
  handleModal() {
    let modal = document.querySelector(".modal");
    if (lives == 0 && level != 10) {
      modal.style.display = "flex";
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close"><i class="fa fa-times"></i></span>
        <div class="modal-text">
          <h2 class="lose">Out Of Lives</h2>
          <h3>You made it to Level ${level}.</h3>
        </div>
        <button class="try-again">Try Again</button>
        `;

      let tryAgain = document.getElementsByClassName("try-again")[0];
      tryAgain.onclick = () => {
        modal.style.display = "none";
        newGame();
      };
    } else if (level == 10 && lives > 0) {
      modal.style.display = "flex";
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close"><i class="fa fa-times"></i></span>
        <div class="modal-text">
          <h2 class="win">Congratulations</h2>
          <h3>You made it to level 10 with ${lives} lives left.</h3>
        </div>
        <button class="try-again">Play Again</button>
        `;

      let tryAgain = document.getElementsByClassName("try-again")[0];
      tryAgain.onclick = () => {
        modal.style.display = "none";
        newGame();
      };
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", keyupListener);

function keyupListener(e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
}
const player = new Player();
const gem = new Gem();
startGame();
