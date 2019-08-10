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
    delay: 20,
    y: 262
  }
};

class Light {
  constructor(game, husky) {
    this.game = game;
    this.husky = husky;
    this.state = "default";
    this.frame = 0;
    this.width = 48;
    this.height = 48;
    this.xPos = 135;
    this.yPos = 70;
    this.velX = 0;
    this.velY = 0;
    this.lightPng = new Image();
    this.lightPng.src = './assets/images/magic.png';
    this.heldKeys = {};
  }

  pressKey(key) {
    this.heldKeys[key] = true;
    if (key === " " && this.husky.energy > 4) {
      if (!this.heldEnemy && this.husky.energy > 4) {
        this.checkCollision();
      } else {
        this.heldEnemy.bound = false;
        this.heldEnemy = false;
      }
    }
  }

  releaseKey(key) {
    this.heldKeys[key] = false;
  }

  checkCollision() {
    const enemies = this.game.enemies;
    for (let i = 0, fin = enemies.length; i < fin; i++) {
      const enemy = enemies[0];
      if (Math.abs(this.xPos - enemy.xPos) < 20 && Math.abs(this.yPos - enemy.yPos) < 13) {
        this.husky.energy -= 5;
        enemy.bound = true;
        this.heldEnemy = enemy;
        break;
      }
    }
  }

  move() {
    if (this.heldKeys.j && this.velX > -5) {
      this.velX -= 1;
    } else if (this.heldKeys.l && this.velX < 5) {
      this.velX += 1;
    } else {
      if (this.velX > 0) {
        this.velX -= .5;
      } else if (this.velX < 0) {
        this.velX += .5;
      }
    }

    if (this.heldKeys.i && this.velY > -5) {
      this.velY -= 1;
    } else if (this.heldKeys.k && this.velY < 5) {
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
    if (this.xPos >= 275) {
      this.xPos = 275;
      this.velX = 0;
    } else if (this.xPos <= 0) {
      this.xPos = 0;
      this.velX = 0;
    }
    if (this.yPos >= 115) {
      this.yPos = 115;
      this.velY = 0;
    } else if (this.yPos  <= 0) {
      this.yPos = 0;
      this.velY = 0;
    }
    if (this.heldEnemy) {
      this.heldEnemy.velX = this.velX;
      this.heldEnemy.velY = this.velY;
    }
  }

  tick(ctx) {
    const animationSet = ANIMATIONS[this.state];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    if (animIdx === ANIMATIONS.x.length) {
      this.frame = 0;
      animIdx = 0;
      const changeStateObj = {
        burst: 'default',
      };
      if (changeStateObj[this.state]) {
        this.state = changeStateObj[this.state];
      }  
    } else {
      this.frame = this.frame + 1;
    }
    const x = ANIMATIONS.x[animIdx || 0];
    this.move();
    ctx.drawImage(this.lightPng, x, animationSet.y, 150, 150, this.xPos, this.yPos, this.width, this.height);
    const rem = this.game.beat % 90;
    if ((rem <= 20 || rem >= 70)) {
      ctx.strokeText(String.fromCharCode(9835), this.xPos + (this.width / 2 - 6), this.yPos + (this.height / 2));
    }

  }
}

module.exports = Light;