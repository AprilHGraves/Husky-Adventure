const Enemy = require('./enemy');

class Bat extends Enemy {
  constructor(game, husky) {
    super(game, husky);
    this.yPos = Math.floor(Math.random() * 68) + 30;
    this.sprites.src = './assets/images/enemy_bat.png';
    this.animationSet = {
      width: 32,
      height: 32,
      delay: 15,
      y: 96,
      x: [0, 32, 64, 96]
    }
  }

  move() {
    super.move();
    if (!this.bound && this.yPos > 75 && this.velY > -3 && Math.random() > .7) {
      this.velY = -2;
    }
  }

}

module.exports = Bat;