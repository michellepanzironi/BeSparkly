import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.grid = game.grid;
});
