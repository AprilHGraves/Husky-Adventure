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
  constructor(width, height) {
    this.action = "standing";
    this.direction = "right";
    this.frame = 0;
    this.width = 48;
    this.height = 32;
    this.xPos = (width / 2) - (this.width / 2);
    this.yPos = 100;
    this.velX = 0;
    this.velY = 0;
    this.sprites = new Image();
    this.heldKeys = {
      a: false,
      d: false
    };
    
  }

  pressKey(key) {
    this.heldKeys[key] = true;
    if (key === "w" && this.action === "sitting") {
      this.frame = 0;
      this.action = "stand";
    } else if (key === "w" && this.action === "running") {
      this.frame = 0;
      this.action = "jumping";
      this.velY = 7;
    } else if (key === "s" && this.action === "standing") {
      this.frame = 0;
      this.action = "sit";
    } else if (key === "a") {
      if (this.direction === "right") {
        this.direction = "left";
        this.velX = 0;
      }
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

  move() {
    if (this.heldKeys.a && this.velX > -20) {
      this.velX -= 1;
    } else if (this.heldKeys.d && this.velX < 20) {
      this.velX += 1;
    } else {
      if (this.velX > 0 ) {
        this.velX -= 1;
      } else if (this.velX < 0) {
        this.velX += 1;
      }
    }
    const absVel = Math.abs(this.velX);
    if (this.action !== "walking" && absVel > 0 && absVel < 10) {
      this.frame = 0;
      this.action = "walking";
    } else if (this.action === "walking" && absVel > 9) {
      this.frame = 0;
      this.action = "running";
    } else if (this.action === "walking" && absVel === 0) {
      this.frame = 0;
      this.action = "standing";
    }

    if (this.yPos < 100) {
      if (this.velY > 0) {
        this.velY -= .5;
      }
      this.yPos += (1 - this.velY);
    } else if (this.velY > 0) {
      this.yPos -= this.velY;
    }
  }

  animate(ctx) {
    const animationSet = ANIMATIONS[this.action];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    if (animIdx === animationSet.x.length) {
      this.frame = 0;
      animIdx = 0;
      const changeActionObj = {
        sit: 'sitting',
        stand: 'standing',
        jumping: 'running'
      };
      if (changeActionObj[this.action]) {
        this.action = changeActionObj[this.action];
      }
    } else {
      this.frame = this.frame + 1;
    }
    let x = animationSet.x[animIdx || 0];
    if (this.direction === "right") {
      x = (540 - x) - 90;
      this.sprites.src = './assets/images/dog_right.png';
    } else {
      this.sprites.src = './assets/images/dog_left.png';
    }
    this.move();
    ctx.drawImage(this.sprites, x, animationSet.y, 90, 58, this.xPos, this.yPos, this.width, this.height);
  }

}

module.exports = Husky;