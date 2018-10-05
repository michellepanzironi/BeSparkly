import Grid from 'grid';
import Jewel from 'jewel';

export default class Game {
  constructor() {
    this.board = document.getElementById('board');
    this.levelBar = document.getElementById('level-bar');
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modalContent');
    this.level = 1;
    this.modalContent.innerHTML = `Level ${this.level}`;
    this.grid = new Grid(this, this.level);
    this.newLevel = newLevel();
  }
}

  const newLevel = () => {
    this.level.innerHTML = `Level ${this.level}`;
  };

//////////


const loadImages = (queue) => {
  queue.loadFile({ id: 'orange', src: './assets/images/orange_gem_1.png' });
  queue.loadFile({ id: 'green', src: './assets/images/green_gem_3.png' });
  queue.loadFile({ id: 'blue', src: './assets/images/blue_gem_2.png' });
  queue.loadFile({ id: 'cyan', src: './assets/images/cyan_gem_6.png' });
  queue.loadFile({ id: 'pink', src: './assets/images/pink_gem_7.png' });
  queue.loadFile({ id: 'yellow', src: './assets/images/yellow_gem_7.png' });
  queue.loadFile({ id: 'round_rainbow', src: './assets/images/round_gem.png' });
  queue.loadFile({ id: 'teardrop_rainbow', src: './assets/images/standard_gem.png' });
};

 /////////


window.onload = function() {
  let canvas = document.getElementById("game");
  let context = canvas.getContext("2d");

  let lastFrame = 0;
  let framesPerSecond = 0;
  let fpsTime = 0;
  let frameCount = 0;

  let drag = false;

  let currentMove = {
    col1: 0,
    row1: 0,
    col2: 0,
    row2: 0
  };

  let states = { init: 0, ready: 1, resolve: 2 };
  let gamestate = states.init;

  let score = 0;

  let animationState = 0;
  let animationTime = 0;
  let timeTotal = 0.3;

  let gameOver = false;

  const init = () => {
    canvas.addEventListener("mouseMove", onMouseMove);
    canvas.addEventListener("mouseDown", onMouseDown);
    canvas.addEventListener("mouseUp", onMouseUp);
    canvas.addEventListener("mouseOut", onMouseOut);

    for (let i = 0; i < level.columns; i++) {
      level.jewels[i] = [];
      for (let j = 0; i < level.rows; j++) {
        level.jewels[i][j] = { type: 0, shift: 0 };
      }
    }
    newGame();
    main(0);
  };

  const main = (tframe) => {
    window.requestAnimationFrame(main);
    update(tframe);
    render();
  };

  const update = (tframe) => {
    let dt = (tframe - lastframe) / 1000;
    lastframe = tframe;
    updateFps(dt);
  };

  const updateFps = (dts) => {
    if (fpsTime > 0.25) {
      framesPerSecond = Math.round(frameCount / fpsTime);
      fpsTime = 0;
      frameCount = 0;
    }
    fpsTime += dt;
    frameCount++;
  };

  const drawText = (text, x, y, width) => {
    let textWidth = context.measureText(text);
    context.fillText(text, x, (width-textWidth.width)/2, y);
  };

  const render = () => {
    let levelwidth = level.columns * level.tilewidth;
    let levelheight = level.columns * level.tileheight;

    drawFrame();
    // background

    renderTiles();
    renderClusters();

    if (gameOver) {
      context.fillStyle = "rgba(0, 0, 0, 0.8)";
      drawText("Game Over!", level.x, level.y, levelheight / 2 + 10, levelwidth);
    }
  };

  const drawFrame = () => {
    context.fillStyle= "";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  function onMouseMove(e) {}
  function onMouseDown(e) {}
  function onMouseUp(e) {}
  function onMouseOut(e) {}

  const getMousePos = (canvas, e) => {
    let rect = canvas.getBoundingClientRect();
    return {
      x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
      y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
    };
  };

  init();
};
