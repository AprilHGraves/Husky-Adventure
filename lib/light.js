const ANIMATIONS = {
  x: [0, 131, 262, 393, 524],
  default: {
    delay: 10,
    y: 0,
    
  },
  burst: {
    delay: 10,
    y: 131
  },
  explosion: {
    delay: 5,
    y: 262
  },
  swirl: {
    delay: 10,
    y: 393
  }
};

class Light {
  constructor(game, husky) {
    this.game = game;
    this.husky = husky;
    this.state = "default";
    this.frame = 0;
    this.xPos = 135;
    this.yPos = 70;
    this.velX = 0;
    this.velY = 0;
    this.lightPng = new Image();
    this.lightPng.src = './assets/images/magic.png';
    this.heldKeys = {};
    this.heldEnemies = [];
  }

  pressKey(code) {
    this.heldKeys[code] = true;
    if (code === "ShiftLeft" && this.husky.energy > 4 && this.heldEnemies.length < 6) {
      this.capture();
      this.husky.energy -= 5;
      this.frame = 0;
      this.state = "swirl";
    } else if (code === "ShiftRight") {
      if (this.heldEnemies.length > 0) {
        this.frame = 0;
        this.state = "default";
        this.heldEnemies.forEach(enemy => {
          enemy.velX = this.velX * 2;
          enemy.velY = this.velY * 2;
          enemy.bound = false;
          enemy.stunCount = 30;
        })
        this.heldEnemies = [];
      }
    }
  }

  releaseKey(code) {
    this.heldKeys[code] = false;
  }

  capture() {
    const enemies = this.game.enemies;
    for (let i = 0, fin = enemies.length; i < fin; i++) {
      const enemy = enemies[i];
      if (!enemy.bound) {
        if (Math.abs(this.xPos - enemy.xPos) < 30 && Math.abs(this.yPos - enemy.yPos) < 20) {
          enemy.bound = true;
          this.heldEnemies.push(enemy);
        }
      }
    }
  }

  move() {
    if (this.heldKeys.KeyJ && this.velX > -5) {
      this.velX -= 1;
    } else if (this.heldKeys.KeyL && this.velX < 5) {
      this.velX += 1;
    } else {
      if (this.velX > 0) {
        this.velX -= .5;
      } else if (this.velX < 0) {
        this.velX += .5;
      }
    }

    if (this.heldKeys.KeyI && this.velY > -5) {
      this.velY -= 1;
    } else if (this.heldKeys.KeyK && this.velY < 5) {
      this.velY += 1;
    } else {
      if (this.velY > 0) {
        this.velY -= .5
      } else if (this.velY < 0) {
        this.velY += .5
      }
    }

    this.xPos += this.velX;
    this.yPos += this.velY;
    if (this.xPos >= 290) {
      this.xPos = 290;
      this.velX = 0;
    } else if (this.xPos <= 10) {
      this.xPos = 10;
      this.velX = 0;
    }
    if (this.yPos >= 130) {
      this.yPos = 130;
      this.velY = 0;
    } else if (this.yPos  <= 30) {
      this.yPos = 30;
      this.velY = 0;
    }
    this.heldEnemies.forEach(enemy => {
      enemy.velX = this.velX;
      enemy.velY = this.velY;
    })
  }

  tick(ctx) {
    const animationSet = ANIMATIONS[this.state];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    if (animIdx === ANIMATIONS.x.length) {
      this.frame = 0;
      animIdx = 0;
      if (this.state === "swirl") {
        if (this.heldEnemies.length > 0) {
          this.state = "burst";
        } else {
          this.state = "default";
        }
      }
    } else {
      this.frame = this.frame + 1;
    }
    const x = ANIMATIONS.x[animIdx || 0];
    this.move();
    ctx.drawImage(this.lightPng, x, animationSet.y, 150, 150, this.xPos - 24, this.yPos - 24, 48, 48);

  }
}

module.exports = Light;