const ANIMATIONS = {
  barking: {
    delay: 15,
    y: 0,
    x: [0, 90, 180, 270]
  },
  walking: {
    delay: 15,
    y: 58,
    x: [0, 90, 180, 270, 360, 450]
  },
  running: {
    delay: 10,
    y: 116,
    x: [0, 90, 180, 270, 360]
  },
  jumping: {
    delay: 10,
    y: 116,
    x: [0, 90, 180, 270, 360]
  },
  sitting: {
    delay: 50,
    y: 174,
    x: [0, 90, 180, 270]
  },
  sit: {
    delay: 10,
    y: 232,
    x: [0, 90, 180]
  },
  stand: {
    delay: 10,
    y: 232,
    x: [180, 90, 0]
  },
  standing: {
    delay: 50,
    y: 290,
    x: [0, 90, 180, 270]
  }
};

class Husky {
  constructor(game) {
    this.game = game;
    this.action = "standing";
    this.frame = 0;
    this.width = 48;
    this.height = 32;
    this.xPos = 30;
    this.yPos = 129;
    this.speed = 0;
    this.velX = 0;
    this.velY = 0;
    this.hp = 3;
    this.energy = 75;
    this.huskyPng = new Image();
    this.huskyPng.src = './assets/images/husky.png';
    this.heartPng = new Image();
    this.heartPng.src = './assets/images/heart.png';
    this.barkMP3 = new Audio('./assets/audio/lubark.mp3');
    this.whine = new Audio('./assets/audio/dogwhine.mp3');
    this.heldKeys = {
      a: false,
      d: false
    };
  }

  pressKey(code) {
    this.heldKeys[code] = true;    
    if (code === "Space") {
      this.energy += this.action === "sitting" ? 5 : 1;
      if (this.energy > 100) {
        this.energy = 100;        
      }
    } else if (code === "KeyW" && this.action === "sitting") {
      this.frame = 0;
      this.action = "stand";
    } else if (code === "KeyA" && (this.action === "standing" && this.energy >= 3)) {
      this.frame = 0;
      this.action = "barking";
      this.barkMP3.currentTime = 0;
      setTimeout(() => {
        this.game.playSound(this.barkMP3);
        this.game.enemies.forEach(enemy => {
          enemy.velX += 15;
        })
      }, 400);
      this.energy -= 3;
    } else if (code === "KeyW" && this.action === "running" && this.energy >= 5 && this.yPos === 129) {
      this.frame = 0;
      this.action = "jumping";
      this.velY = -5;
      this.energy -= 5;
    } else if (code === "KeyS" && (this.action === "standing")) {
      this.velX = 0;
      this.frame = 0;
      this.action = "sit";
    }

  }

  releaseKey(code) {
    this.heldKeys[code] = false;
  }

  checkCollision() {
    const enemies = this.game.enemies;
    for (let i=0,fin=enemies.length; i<fin; i++) {
      const enemy = enemies[i];
      if (Math.abs(this.xPos - enemy.xPos) < 20 && Math.abs(this.yPos - enemy.yPos) < 13) {
        if (!enemy.bound && !enemy.dead) {
          this.hp -= 1;
          this.game.playSound(this.whine);
          enemy.die();
          if (this.hp === 0) {
            this.game.restart();
          }
        }
        break
      }
    }
  }

  move() {
    if (this.heldKeys.KeyD && this.velX < 20) {
      this.velX += 1;
    } else {
      if (this.velX > 0 ) {
        this.velX -= 1;
      }
    }

    if (this.heldKeys.KeyW && this.action === "jumping" && this.energy > 0) {
      this.velY -= .15;
      this.energy -= .02;
    }
    
    if (this.yPos < 129) {
      this.velY += .3;
    }
    this.yPos += this.velY;
    if (this.yPos >= 129) {
      this.yPos = 129;
      this.velY = 0;
    }
  }

  draw(ctx) {
    const animationSet = ANIMATIONS[this.action];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    // at the end of the animation, either loop the same animation or start a different animation
    if (animIdx === animationSet.x.length) {
      this.frame = 0;
      animIdx = 0;
      const changeActionObj = {
        sit: 'sitting',
        stand: 'standing',
        jumping: 'running',
        barking: 'standing'
      };
      if (this.action in changeActionObj) {
        this.action = changeActionObj[this.action];
      }
    }
    let x = animationSet.x[animIdx];
    // because the art asset was flipped
    x = (540 - x) - 90;
    // draw husky
    ctx.drawImage(this.huskyPng, x, animationSet.y, 90, 58, this.xPos - (this.width/2), this.yPos - (this.height/1.5), this.width, this.height);

    // draw hearts
    for (let i=0, fin=this.hp; i < fin; i++) {
      ctx.drawImage(this.heartPng, (20 * i) + 5, 5, 16, 16);
    }
    if (this.energy < 0) {
      this.energy = 0;
    }
    // draw energy
    ctx.strokeText(`Energy: ${Math.floor(this.energy)}`, this.hp * 25, 16);
  }

  tick(ctx) {
    this.move();
    this.checkCollision();
    this.frame = this.frame + 1;
    this.draw(ctx);
    
    if (this.action !== "walking" && this.velX > 0 && this.velX < 10) {
      this.frame = 0;
      this.action = "walking";
      this.speed = 1;
    } else if (this.action === "walking" && this.velX > 9) {
      this.frame = 0;
      this.action = "running";
      this.speed = 2;
    } else if (this.action === "walking" && this.velX === 0) {
      this.frame = 0;
      this.action = "standing";
      this.speed = 0;
    }

  }

}

module.exports = Husky;