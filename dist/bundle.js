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

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Husky = __webpack_require__(/*! ./husky */ "./lib/husky.js");

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
  }

  animate(ctx) {
    const animationSet = ANIMATIONS[this.action];
    let animIdx = Math.floor(this.frame / animationSet.delay);
    if (animIdx === animationSet.x.length) {
      this.frame = 0;
      animIdx = 0;
      const changeActionObj = {
        sit: 'sitting',
        stand: 'standing'
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map