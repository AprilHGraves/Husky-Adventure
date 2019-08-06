
const Husky = require('./husky');

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")
    this.height = canvas.height;
    this.width = canvas.width;
    this.audio = new Audio('./assets/audio/Radio Etalia.mp3');
    this.audio.loop = true;
    this.paused = true;
    document.addEventListener("mousedown", (event) => {
      if (canvas.contains(event.target)) {
        if (this.paused) {
          this.play();
        } else {
          this.pause();
        }
      }
    });
  }

  animate() {
    if (!this.paused) {
      this.ctx.clearRect(0, 0, 750, 500);
      this.husky.animate(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  pressKey(e) {
    this.husky.pressKey(e.key);
  }

  releaseKey(e) {
    this.husky.releaseKey(e.key);
  }

  play() {
    if (!this.husky) {
      this.restart();
    }
    this.paused = false;
    this.audio.play();
    document.addEventListener('keydown', this.pressKey.bind(this));
    document.addEventListener('keyup', this.releaseKey.bind(this));
    this.animate();
  }

  pause() {
    this.paused = true;
    this.audio.pause();
    document.removeEventListener('keydown', this.pressKey);
    document.removeEventListener('keyup', this.releaseKey);
  }

  restart() {
    this.husky = new Husky(this.width, this.height);
    this.audio.currentTime = 0;
  }

}

module.exports = Game;