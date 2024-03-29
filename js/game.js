var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false,
  bgImage = new Image();

bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = "images/background.png";

var heroReady = false,
  heroImage = new Image();
heroImage.onload = function() {
  heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false,
  monsterImage = new Image();
monsterImage.onload = function() {
  monsterReady = true;
};
monsterImage.src = "images/monster.png";

var hero = {
  speed: 256,
  x: 0,
  y: 0
};

var monster = {
  x: 0,
  y: 0
};

var monstersCaught = 0;


var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);


addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

var reset = function() {
  hero.x = canvas.width / 2;
  hero.x = canvas.height / 2;

  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};


var update = function(modifier) {
  if (38 in keysDown) {
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) {
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
  }

  if (
    hero.x <= (monster.x + 32) &&
    monster.x <= (hero.x + 32) &&
    hero.y <= (monster.y + 32) &&
    monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
};

var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;
};

reset();
var then = Date.now();
setInterval(main, 1);
