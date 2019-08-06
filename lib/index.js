const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas);
});