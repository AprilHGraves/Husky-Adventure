const Enemy = require('./enemy');

class Skeleton extends Enemy {
  constructor(game, husky) {
    super(game, husky);
    this.sprites.src = './assets/images/enemy_skeleton.png';
    this.animationSet = {
      width: 32,
      height: 32,
      delay: 15,
      y: 32,
      x: [0, 32, 64]
    }
  }
}

module.exports = Skeleton;