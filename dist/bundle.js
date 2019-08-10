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
    this.xCloud = (this.xCloud >= 384 || this.xCloud <= -384) ? 0 : (this.xCloud + .25 - (this.husky.speed * .25));
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
    this.xPos = 280;
    this.yPos = 108;
    this.velX = -.5;
    this.velY = 0;
    this.sprites = new Image();
    this.bound = false;
  }

  move() {
    if (!this.bound) {
      if (this.yPos < 108) {
        this.velY += .3;
      }
      if (this.yPos >= 108) {
        this.yPos = 108;
        this.velY = 0;
      }
      if (this.velX > -.5) {
        this.velX -= .5;
      }
      this.xPos += this.velX - (this.husky.speed);
    } else {
      this.xPos += this.velX;
    }
    this.yPos += this.velY;
  }

  tick(ctx) {
    let animIdx = Math.floor(this.frame / this.animationSet.delay);
    if (animIdx === this.animationSet.x.length) {
      this.frame = 0;
      animIdx = 0;
    } else {
      this.frame = this.frame + 1;
    }
    let x = this.animationSet.x[animIdx || 0];
    this.move();
    ctx.drawImage(this.sprites, x, this.animationSet.y, this.animationSet.width, this.animationSet.height, this.xPos, this.yPos, this.width, this.height);
    if (this.xPos < -10) {
      this.game.delEnemy(this);
    }
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
    delay: 20,
    y: 262
  }
};

class Light {
  constructor(game, husky) {
    this.game = game;
    this.husky = husky;
    this.state = "default";
    this.frame = 0;
    this.width = 48;
    this.height = 48;
    this.xPos = 135;
    this.yPos = 70;
    this.velX = 0;
    this.velY = 0;
    this.lightPng = new Image();
    this.lightPng.src = './assets/images/magic.png';
    this.heldKeys = {};
  }

  pressKey(key) {
    this.heldKeys[key] = true;
    if (key === " " && this.husky.energy > 4) {
      if (!this.heldEnemy && this.husky.energy > 4) {
        this.checkCollision();
      } else {
        this.heldEnemy.bound = false;
        this.heldEnemy = false;
      }
    }
  }

  releaseKey(key) {
    this.heldKeys[key] = false;
  }

  checkCollision() {
    const enemies = this.game.enemies;
    for (let i = 0, fin = enemies.length; i < fin; i++) {
      const enemy = enemies[0];
      if (Math.abs(this.xPos - enemy.xPos) < 20 && Math.abs(this.yPos - enemy.yPos) < 13) {
        this.husky.energy -= 5;
        enemy.bound = true;
        this.heldEnemy = enemy;
        break;
      }
    }
  }

  move() {
    if (this.heldKeys.j && this.velX > -5) {
      this.velX -= 1;
    } else if (this.heldKeys.l && this.velX < 5) {
      this.velX += 1;
    } else {
      if (this.velX > 0) {
        this.velX -= .5;
      } else if (this.velX < 0) {
        this.velX += .5;
      }
    }

    if (this.heldKeys.i && this.velY > -5) {
      this.velY -= 1;
    } else if (this.heldKeys.k && this.velY < 5) {
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
    if (this.xPos >= 275) {
      this.xPos = 275;
      this.velX = 0;
    } else if (this.xPos <= 0) {
      this.xPos = 0;
      this.velX = 0;
    }
    if (this.yPos >= 115) {
      this.yPos = 115;
      this.velY = 0;
    } else if (this.yPos  <= 0) {
      this.yPos = 0;
      this.velY = 0;
    }
    if (this.heldEnemy) {
      this.heldEnemy.velX = this.velX;
      this.heldEnemy.velY = this.velY;
    }
  }

  tick(ctx) {
    const animationSet = ANIMATIONS[this.state];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    if (animIdx === ANIMATIONS.x.length) {
      this.frame = 0;
      animIdx = 0;
      const changeStateObj = {
        burst: 'default',
      };
      if (changeStateObj[this.state]) {
        this.state = changeStateObj[this.state];
      }  
    } else {
      this.frame = this.frame + 1;
    }
    const x = ANIMATIONS.x[animIdx || 0];
    this.move();
    ctx.drawImage(this.lightPng, x, animationSet.y, 150, 150, this.xPos, this.yPos, this.width, this.height);
    const rem = this.game.beat % 90;
    if ((rem <= 20 || rem >= 70)) {
      ctx.strokeText(String.fromCharCode(9835), this.xPos + (this.width / 2 - 6), this.yPos + (this.height / 2));
    }

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map