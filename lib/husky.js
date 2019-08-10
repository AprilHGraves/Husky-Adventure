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
    this.direction = "right";
    this.frame = 0;
    this.width = 48;
    this.height = 32;
    this.xPos = 20;
    this.yPos = 108;
    this.speed = 0;
    this.velX = 0;
    this.velY = 0;
    this.hp = 3;
    this.energy = 50;
    this.huskyPng = new Image();
    this.huskyPng.src = './assets/images/husky.png';
    this.heartPng = new Image();
    this.heartPng.src = './assets/images/heart.png';
    this.bark = new Audio('./assets/audio/lubark.mp3');
    this.whine = new Audio('./assets/audio/dogwhine.mp3');
    this.heldKeys = {
      a: false,
      d: false
    };
  }

  pressKey(key) {
    this.heldKeys[key] = true;
    if (key === " " && this.energy < 100) {
      const rem = this.game.beat % 90;
      if ((rem <= 20 || rem >= 70)) {
        this.energy += this.action === "sitting" ? 10:2;
        this.energy = this.energy > 100 ? 100:this.energy;
      } else if (this.energy > 3) {
        this.energy -= 4;
        this.energy = this.energy < 0 ? 0:this.energy;
      }
    } else if (key === "w" && this.action === "sitting") {
      this.frame = 0;
      this.action = "stand";
    } else if (key === "a" && (this.action === "standing" && this.energy >= 3)) {
      this.frame = 0;
      this.action = "barking";
      this.bark.currentTime = 0;
      setTimeout(() => {        
        this.bark.play();
        this.game.enemies.forEach(enemy => {
          enemy.velX += 15;
        })
      }, 400);
      this.energy -= 3;
    } else if (key === "w" && this.action === "running" && this.energy >= 5 && this.yPos === 108) {
      this.frame = 0;
      this.action = "jumping";
      this.velY = -5;
      this.energy -= 5;
    } else if (key === "s" && (this.action === "standing")) {
      this.velX = 0;
      this.frame = 0;
      this.action = "sit";
    } else if (key === "d") {
      if (this.direction === "left") {
        this.direction = "right";
        this.velX = 0;
      }
    }

  }

  releaseKey(key) {
    this.heldKeys[key] = false;
  }

  checkCollision() {
    const enemies = this.game.enemies;
    if (this.action === "sitting") {
      console.log(this);
    }
    for (let i=0,fin=enemies.length; i<fin; i++) {
      const enemy = enemies[i];
      if (Math.abs(this.xPos - enemy.xPos) < 20 && Math.abs(this.yPos - enemy.yPos) < 13) {
        if (enemy.bound ) {
          this.game.delEnemy(enemy);
        } else {
          this.hp -= 1;
          this.game.delEnemy(enemy);
          this.whine.play();
          if (this.hp === 0) {
            this.game.restart();
          }
        }
        break
      }
    }
  }

  move() {
    if (this.heldKeys.d && this.velX < 20) {
      this.velX += 1;
    } else {
      if (this.velX > 0 ) {
        this.velX -= 1;
      }
    }

    if (this.heldKeys.w && this.action === "jumping" && this.energy > 0) {
      this.velY -= .15;
      this.energy -= .05;
    }
    
    if (this.yPos < 108) {
      this.velY += .3;
    }
    this.yPos += this.velY;
    if (this.yPos >= 108) {
      this.yPos = 108;
      this.velY = 0;
    }
  }

  tick(ctx) {
    // calc husky sprite
    const animationSet = ANIMATIONS[this.action];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    if (animIdx === animationSet.x.length) {
      this.frame = 0;
      animIdx = 0;
      const changeActionObj = {
        sit: 'sitting',
        stand: 'standing',
        jumping: 'running',
        barking: 'standing'
      };
      if (changeActionObj[this.action]) {
        this.action = changeActionObj[this.action];
      }
    } else {
      this.frame = this.frame + 1;
    }
    let x = animationSet.x[animIdx || 0];
    x = (540 - x) - 90;
    // calc husky position
    this.move();
    // draw husky
    ctx.drawImage(this.huskyPng, x, animationSet.y, 90, 58, this.xPos, this.yPos, this.width, this.height);
    this.checkCollision();
    // draw hearts
    for (let i=0, fin=this.hp; i < fin; i++) {
      ctx.drawImage(this.heartPng, (20 * i) + 5, 5, 16, 16);
    }
    // add to energy then draw energy
    ctx.strokeText(`Energy: ${Math.floor(this.energy)}`, this.hp * 25, 16);

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