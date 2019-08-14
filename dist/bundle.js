/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/background.js":
/*!***************************!*\
  !*** ./lib/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Background {
  constructor(husky) {
    this.bgClouds = new Image();
    this.bgClouds.src = './assets/images/bg_clouds.png';
    this.bgTrees1 = new Image();
    this.bgTrees1.src = './assets/images/bg_trees_1.png';
    this.bgTrees2 = new Image();
    this.bgTrees2.src = './assets/images/bg_trees_2.png';
    this.envAssets = new Image();
    this.envAssets.src = './assets/images/env_assets.png';
    this.xCloud = 0;
    this.xTree1 = 0;
    this.xTree2 = 0;
    this.xGround = 0;
    this.husky = husky;
  }

  draw(ctx) {
    ctx.drawImage(this.bgClouds, this.xCloud, 0);
    ctx.drawImage(this.bgClouds, this.xCloud - 384, 0);
    ctx.drawImage(this.bgClouds, this.xCloud + 384, 0);
    ctx.drawImage(this.bgTrees1, this.xTree1, 0);
    ctx.drawImage(this.bgTrees1, this.xTree1 + 384, 0);
    ctx.drawImage(this.bgTrees2, this.xTree2, 0);
    ctx.drawImage(this.bgTrees2, this.xTree2 + 384, 0);
    for (let i=0; i < 15; i++) {
      ctx.drawImage(this.envAssets, 150, 32, 32, 16, this.xGround + (i * 32), 140, 32, 16);
    }
    this.xCloud = (this.xCloud >= 384 || this.xCloud <= -384) ? 0 : (this.xCloud + .2 - (this.husky.speed * .25));
  }

  tick(ctx) {
    this.draw(ctx);
    this.xTree1 = this.xTree1 <= -384 ? 0 : (this.xTree1 - (this.husky.speed * .5));
    this.xTree2 = this.xTree2 <= -384 ? 0 : (this.xTree2 - (this.husky.speed * .75));
    this.xGround = this.xGround <= -100 ? 0 : (this.xGround - (this.husky.speed));
  }
}

module.exports = Background;

/***/ }),

/***/ "./lib/bat.js":
/*!********************!*\
  !*** ./lib/bat.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Enemy = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");

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

/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Background = __webpack_require__(/*! ./background */ "./lib/background.js");
const Husky = __webpack_require__(/*! ./husky */ "./lib/husky.js");
const Bat = __webpack_require__(/*! ./bat */ "./lib/bat.js");
const Skeleton = __webpack_require__(/*! ./skeleton */ "./lib/skeleton.js");
const Light = __webpack_require__(/*! ./light */ "./lib/light.js");

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

/***/ }),

/***/ "./lib/husky.js":
/*!**********************!*\
  !*** ./lib/husky.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    this.bark = new Audio('./assets/audio/lubark.mp3');
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
      this.bark.currentTime = 0;
      setTimeout(() => {
        this.game.playSound(this.bark);
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
    }
    let x = animationSet.x[animIdx || 0];
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

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./lib/game.js");

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);
});

/***/ }),

/***/ "./lib/light.js":
/*!**********************!*\
  !*** ./lib/light.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

const ANIMATIONS = {
  x: [0, 131, 262, 393, 524],
  default: {
    delay: 10,
    y: 0,
    
  },
  burst: {
    delay: 10,
    y: 131
  },
  explosion: {
    delay: 5,
    y: 262
  },
  swirl: {
    delay: 10,
    y: 393
  }
};

class Light {
  constructor(game, husky) {
    this.game = game;
    this.husky = husky;
    this.state = "default";
    this.frame = 0;
    this.xPos = 135;
    this.yPos = 70;
    this.velX = 0;
    this.velY = 0;
    this.lightPng = new Image();
    this.lightPng.src = './assets/images/magic.png';
    this.heldKeys = {};
    this.heldEnemies = [];
  }

  pressKey(code) {
    this.heldKeys[code] = true;
    if (code === "ShiftLeft" && this.husky.energy > 4 && this.heldEnemies.length < 6) {
      this.capture();
      this.husky.energy -= 5;
      this.frame = 0;
      this.state = "swirl";
    } else if (code === "ShiftRight") {
      if (this.heldEnemies.length > 0) {
        this.frame = 0;
        this.state = "default";
        this.heldEnemies.forEach(enemy => {
          enemy.velX = this.velX * 2;
          enemy.velY = this.velY * 2;
          enemy.bound = false;
          enemy.stunCount = 30;
        })
        this.heldEnemies = [];
      }
    }
  }

  releaseKey(code) {
    this.heldKeys[code] = false;
  }

  capture() {
    const enemies = this.game.enemies;
    for (let i = 0, fin = enemies.length; i < fin; i++) {
      const enemy = enemies[i];
      if (!enemy.bound) {
        if (Math.abs(this.xPos - enemy.xPos) < 30 && Math.abs(this.yPos - enemy.yPos) < 20) {
          enemy.bound = true;
          this.heldEnemies.push(enemy);
        }
      }
    }
  }

  move() {
    if (this.heldKeys.KeyJ && this.velX > -5) {
      this.velX -= 1;
    } else if (this.heldKeys.KeyL && this.velX < 5) {
      this.velX += 1;
    } else {
      if (this.velX > 0) {
        this.velX -= .5;
      } else if (this.velX < 0) {
        this.velX += .5;
      }
    }

    if (this.heldKeys.KeyI && this.velY > -5) {
      this.velY -= 1;
    } else if (this.heldKeys.KeyK && this.velY < 5) {
      this.velY += 1;
    } else {
      if (this.velY > 0) {
        this.velY -= .5
      } else if (this.velY < 0) {
        this.velY += .5
      }
    }

    this.xPos += this.velX;
    this.yPos += this.velY;
    if (this.xPos >= 290) {
      this.xPos = 290;
      this.velX = 0;
    } else if (this.xPos <= 10) {
      this.xPos = 10;
      this.velX = 0;
    }
    if (this.yPos >= 130) {
      this.yPos = 130;
      this.velY = 0;
    } else if (this.yPos  <= 30) {
      this.yPos = 30;
      this.velY = 0;
    }
    this.heldEnemies.forEach(enemy => {
      enemy.velX = this.velX;
      enemy.velY = this.velY;
    })
  }

  tick(ctx) {
    const animationSet = ANIMATIONS[this.state];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    if (animIdx === ANIMATIONS.x.length) {
      this.frame = 0;
      animIdx = 0;
      if (this.state === "swirl") {
        if (this.heldEnemies.length > 0) {
          this.state = "burst";
        } else {
          this.state = "default";
        }
      }
    } else {
      this.frame = this.frame + 1;
    }
    const x = ANIMATIONS.x[animIdx || 0];
    this.move();
    ctx.drawImage(this.lightPng, x, animationSet.y, 150, 150, this.xPos - 24, this.yPos - 24, 48, 48);

  }
}

module.exports = Light;

/***/ }),

/***/ "./lib/skeleton.js":
/*!*************************!*\
  !*** ./lib/skeleton.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Enemy = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");

class Skeleton extends Enemy {
  constructor(game, husky) {
    super(game, husky);
    this.sprites.src = './assets/images/enemy_skeleton.png';
    this.enemyAnimation = {
      width: 32,
      height: 32,
      delay: 15,
      y: 32,
      x: [0, 32, 64]
    }
  }
}

module.exports = Skeleton;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map