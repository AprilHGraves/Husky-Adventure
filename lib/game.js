
const Background = require('./background');
const Husky = require('./husky');
const Bat = require('./bat');
const Skeleton = require('./skeleton');
const Light = require('./light');

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")
    this.height = canvas.height;
    this.width = canvas.width;
    this.audio = new Audio('./assets/audio/Radio Etalia.mp3');
    this.audio.loop = true;
    this.paused = true;    
    this.audio.currentTime = 0;
    this.beat = 0;
    this.restart();
    
    document.addEventListener("mousedown", (event) => {
      if (canvas.contains(event.target)) {
        if (this.paused) {
          this.enemySpawner = setInterval(() => {
            this.addEnemy();
          }, 2000);
          this.play();
        } else {
          clearInterval(this.enemySpawner);
          this.pause();
        }
      }
    });
  }

  addEnemy() {
    const maxEnemies = Math.ceil(this.score / 10) || 1;
    if (this.enemies.length < maxEnemies) {
      const newEnemy = Math.random() > .4 ? new Skeleton(this, this.husky):new Bat(this, this.husky);
      this.enemies.push(newEnemy);
    }
  }

  delEnemy(enemy) {
    const idx = this.enemies.indexOf(enemy);
    this.enemies.splice(idx, 1);
    this.score += 5;
  }

  tick() {
    this.beat += 1;
    this.ctx.clearRect(0, 0, 750, 500);
    this.background.draw(this.ctx);
    this.husky.tick(this.ctx);
    this.light.tick(this.ctx);
    this.enemies.forEach(enemy => enemy.tick(this.ctx));
    this.ctx.strokeText(`Score: ${this.score}`, 140, 16);
    if (!this.paused) {
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  pressKey(e) {
    this.husky.pressKey(e.key);
    this.light.pressKey(e.key);
  }

  releaseKey(e) {
    this.husky.releaseKey(e.key);
    this.light.releaseKey(e.key);
  }

  play() {
    this.paused = false;
    this.audio.play();
    document.addEventListener('keydown', this.pressKey.bind(this));
    document.addEventListener('keyup', this.releaseKey.bind(this));
    this.tick();
  }

  pause() {
    this.paused = true;
    this.audio.pause();
    document.removeEventListener('keydown', this.pressKey);
    document.removeEventListener('keyup', this.releaseKey);
  }

  restart() {
    this.husky = new Husky(this);
    this.background = new Background(this.husky);
    this.enemies = [new Bat(this, this.husky)];
    this.light = new Light(this, this.husky);
    this.score = 0;
  }

}

module.exports = Game;