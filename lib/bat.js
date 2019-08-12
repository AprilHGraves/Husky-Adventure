const Enemy = require('./enemy');

class Bat extends Enemy {
  constructor(game, husky) {
    super(game, husky);
    this.yPos = Math.floor(Math.random() * 80) + 40;
    this.sprites.src = './assets/images/enemy_bat.png';
    this.enemyAnimation = {
      width: 32,
      height: 32,
      delay: 15,
      y: 96,
      x: [0, 32, 64, 96]
    }
  }

  move() {
    super.move();
    if (!this.bound && !this.dead && this.stunCount === 0 && this.yPos > 75 && this.velY > -3) {
      if (this.yPos > 120) {
        this.velY = -2;
      } else if (Math.random() > .8) {        
        this.velY = -2;
      }
    }
  }

}

module.exports = Bat;