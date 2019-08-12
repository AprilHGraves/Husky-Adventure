class Enemy {
  constructor(game, husky) {
    this.game = game;
    this.husky = husky;
    this.frame = 0;
    this.width = 32;
    this.height = 32;
    this.xPos = 290;
    this.yPos = 129;
    this.velX = -.5;
    this.velY = 0;
    this.sprites = new Image();
    this.bound = false;
    this.stunCount = 0;
    this.deathSound = new Audio('./assets/audio/retro_die_02.ogg');   
  }

  die() {
    this.dead = true;
    this.velY = 0;
    this.frame = 0;
    this.sprites.src = './assets/images/explosion.png';
    this.enemyAnimation = {
      width: 32,
      height: 32,
      delay: 10,
      y: 0,
      x: [0, 32, 64, 96, 128, 160]
    };
    this.game.addScore(5);
    this.game.playSound(this.deathSound);
    setTimeout(() => {
      this.game.delEnemy(this)
    }, 500);
  }

  move() {
    if (this.dead) {
      this.xPos -= this.husky.speed;
    } else if (!this.bound) {
      if (this.yPos < 129) {
        this.velY += .3;
      }      
      if (this.velX > -.5 && (this.stunCount === 0 || this.dead)) {
        this.velX -= .5;
      }      
      this.xPos += this.velX - (this.husky.speed);
    } else {
      this.xPos += this.velX;
    }
    this.yPos += this.velY;
    if (this.yPos >= 129) {
      this.yPos = 129;
      if (this.velY > 6) {
        if (!this.dead) {
          this.die();
        }        
      } else {
        this.velY = 0;
      }
    }
  }

  tick(ctx) {      
    if (this.stunCount > 0) {
      this.stunCount -= 1;
    }    
    this.move();
    this.draw(ctx);
    if (this.xPos < -30) {
      this.game.delEnemy(this);
    }
    this.frame = this.frame + 1;
  }

  draw(ctx) {
    let animIdx = Math.floor(this.frame / this.enemyAnimation.delay);
    if (this.stunCount === 0 && animIdx === this.enemyAnimation.x.length) {
      this.frame = 0;
      animIdx = 0;
    }
    let x = this.enemyAnimation.x[animIdx || 0];
    ctx.drawImage(this.sprites, x, this.enemyAnimation.y, this.enemyAnimation.width, this.enemyAnimation.height, this.xPos - (this.width/2), this.yPos - (this.height/1.5), this.width, this.height);
  }
}

module.exports = Enemy;