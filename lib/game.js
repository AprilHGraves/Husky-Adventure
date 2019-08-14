
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
    this.muted = false;
    this.audio.currentTime = 0;
    this.hiScore = 0;
    this.restart();
    document.addEventListener('keydown', this.pressKey.bind(this));
    this.drawOpening();
  }

  drawOpening() {
    this.ctx.clearRect(0, 0, 750, 500);
    this.background.draw(this.ctx); 
    this.husky.draw(this.ctx);
    this.ctx.strokeText("Press enter to play", (this.width / 2) - 45, 50);
    if (this.paused) {
      requestAnimationFrame(this.drawOpening.bind(this));
    }
  }

  addScore(amount) {
    this.score += amount;
    if (this.husky.hp < 3 && this.score % 100 === 0) {
      this.husky.hp += 1;
    }
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
  }

  tick() {
    this.ctx.clearRect(0, 0, 750, 500);
    if (this.paused) {
      this.background.draw(this.ctx);
      this.husky.draw(this.ctx);
      this.enemies.forEach(enemy => enemy.tick(this.ctx));
      this.ctx.strokeText("Press enter to unpause", (this.width / 2) - 50, 50);
    } else {
      this.background.tick(this.ctx);
      this.husky.tick(this.ctx);
      this.light.tick(this.ctx);
      this.enemies.forEach(enemy => enemy.tick(this.ctx));
      for (let i1=0,fin1=this.enemies.length; i1<fin1; i1++) {
        const enemy = this.enemies[i1];
        if ((Math.abs(enemy.velX) > 6 || Math.abs(enemy.velY) > 6) && (!enemy.bound || enemy.dead)) {
          for (let i2=0,fin2=this.enemies.length; i2<fin2; i2++) {
            const otherEnemy = this.enemies[i2];
            if (i1 !== i2 && (!otherEnemy.bound || otherEnemy.dead)) {
              if (Math.abs(enemy.xPos - otherEnemy.xPos) < 13 && Math.abs(enemy.yPos - otherEnemy.yPos) < 13) {
                enemy.die();
                otherEnemy.die();
                break
              }
            }
          }
        }
      }
    }
    this.ctx.strokeText(`Score: ${this.score}`, 140, 16);
    this.ctx.strokeText(`High Score: ${this.hiScore}`, 210, 16);
    if (!this.paused) {
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  pressKey(e) {
    e.preventDefault(); 
    if (e.code === "Enter") {
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
    } else if (e.code === "KeyM") {
      this.audio.muted = !this.audio.muted;
      this.muted = !this.muted;
    } else if (!this.paused) {
      this.husky.pressKey(e.code);
      this.light.pressKey(e.code);
    }
  }

  releaseKey(e) {
    this.husky.releaseKey(e.code);
    this.light.releaseKey(e.code);
  }

  playSound(sound) {
    if (!this.muted) {
      sound.play()
    }
  }

  play() {
    this.paused = false;
    this.audio.play();    
    document.addEventListener('keyup', this.releaseKey.bind(this));
    this.enemySpawner = setInterval(() => {
      this.addEnemy();
    }, 2000);
    this.tick();
  }

  pause() {
    clearInterval(this.enemySpawner);
    this.paused = true;
    this.audio.pause();
    document.removeEventListener('keyup', this.releaseKey);
  }

  restart() {
    this.husky = new Husky(this);
    this.background = new Background(this.husky);
    this.enemies = [new Bat(this, this.husky)];
    this.light = new Light(this, this.husky);
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
    }
    this.score = 0;
  }

}

module.exports = Game;