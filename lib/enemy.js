class Enemy {
  constructor(game, husky) {
    this.game = game;
    this.husky = husky;
    this.frame = 0;
    this.width = 32;
    this.height = 32;
    this.xPos = 280;
    this.yPos = 108;
    this.velX = -.5;
    this.velY = 0;
    this.sprites = new Image();
    this.bound = false;
  }

  move() {
    if (!this.bound) {
      if (this.yPos < 108) {
        this.velY += .3;
      }
      if (this.yPos >= 108) {
        this.yPos = 108;
        this.velY = 0;
      }
      if (this.velX > -.5) {
        this.velX -= .5;
      }
      this.xPos += this.velX - (this.husky.speed);
    } else {
      this.xPos += this.velX;
    }
    this.yPos += this.velY;
  }

  tick(ctx) {
    let animIdx = Math.floor(this.frame / this.animationSet.delay);
    if (animIdx === this.animationSet.x.length) {
      this.frame = 0;
      animIdx = 0;
    } else {
      this.frame = this.frame + 1;
    }
    let x = this.animationSet.x[animIdx || 0];
    this.move();
    ctx.drawImage(this.sprites, x, this.animationSet.y, this.animationSet.width, this.animationSet.height, this.xPos, this.yPos, this.width, this.height);
    if (this.xPos < -10) {
      this.game.delEnemy(this);
    }
  }

}

module.exports = Enemy;