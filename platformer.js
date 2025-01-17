// var LEVELS=[];
// LEVELS[0]=[
//   "   =xxx   |            v     |o x",
//   "=   x!x                         x",
//   "     o          	  o o   o      x",
//   "xxx                           o x",
//   "v x          x=    x x   x  xxxxx",
//   "  x         o o    x!x o x!!x o x",
//   "  x @      xxxxx   x!x   xxxx = x",
//   "  xxx x|           x!x          x",
//   "    x!x!!!!!!!!!!!!x!x          x",
//   "    xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//   "                               "
// ];


// function Level(plan) {
//   this.width = plan[0].length;
//   this.height = plan.length;
//   this.grid = [];
//   this.actors = [];

//   for (var y = 0; y < this.height; y++) {
//     var line = plan[y], gridLine = [];
//     for (var x = 0; x < this.width; x++) {
//       var ch = line[x], fieldType = null;
//       var Actor = actorChars[ch];
//       if (Actor)
//         this.actors.push(new Actor(new Vector(x, y), ch));
//       else if (ch == "x")
//         fieldType = "wall";
//       else if (ch == "!")
//         fieldType = "lava";
//       gridLine.push(fieldType);
//     }
//     this.grid.push(gridLine);
//   }

//   this.player = this.actors.filter(function(actor) {
//     return actor.type == "player";
//   })[0];
//   this.status = this.finishDelay = null;
// }
// Level.prototype.isFinished = function() {
//   return this.status != null && this.finishDelay < 0;
// };
// function Vector(x, y) {
//   this.x = x; this.y = y;
// }
// Vector.prototype.plus = function(other) {
//   return new Vector(this.x + other.x, this.y + other.y);
// };
// Vector.prototype.times = function(factor) {
//   return new Vector(this.x * factor, this.y * factor);
// };
// var actorChars = {
//   "@": Player,
//   "o": Coin,
//   "=": Lava, "|": Lava, "v": Lava
// };
// function Player(pos) {
//   this.pos = pos.plus(new Vector(0, -0.5));
//   this.size = new Vector(0.8, 1.5);
//   this.speed = new Vector(0, 0);
// }
// Player.prototype.type = "player";
// function Lava(pos, ch) {
//   this.pos = pos;
//   this.size = new Vector(1, 1);
//   if (ch == "=") {
//     this.speed = new Vector(2, 0);
//   } else if (ch == "|") {
//     this.speed = new Vector(0, 2);
//   } else if (ch == "v") {
//     this.speed = new Vector(0, 3);
//     this.repeatPos = pos;
//   }
// }
// Lava.prototype.type = "lava";
// function Coin(pos) {
//   this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
//   this.size = new Vector(0.6, 0.6);
//   this.wobble = Math.random() * Math.PI * 2;
// }
// Coin.prototype.type = "coin";


// function elt(name, className) {
//   var elt = document.createElement(name);
//   if (className) elt.className = className;
//   return elt;
// }
// function DOMDisplay(parent, level) {
//   this.wrap = parent.appendChild(elt("div", "game"));
//   this.level = level;

//   this.wrap.appendChild(this.drawBackground());
//   this.actorLayer = null;
//   this.drawFrame();
// }
// var scale = 20;

// DOMDisplay.prototype.drawBackground = function() {
//   var table = elt("table", "background");
//   table.style.width = this.level.width * scale + "px";
//   this.level.grid.forEach(function(row) {
//     var rowElt = table.appendChild(elt("tr"));
//     rowElt.style.height = scale + "px";
//     row.forEach(function(type) {
//       rowElt.appendChild(elt("td", type));
//     });
//   });
//   return table;
// };
// DOMDisplay.prototype.drawActors = function() {
//   var wrap = elt("div");
//   this.level.actors.forEach(function(actor) {
//     var rect = wrap.appendChild(elt("div",
//                                     "actor " + actor.type));
//     rect.style.width = actor.size.x * scale + "px";
//     rect.style.height = actor.size.y * scale + "px";
//     rect.style.left = actor.pos.x * scale + "px";
//     rect.style.top = actor.pos.y * scale + "px";
//   });
//   return wrap;
// };
// DOMDisplay.prototype.drawFrame = function() {
//   if (this.actorLayer)
//     this.wrap.removeChild(this.actorLayer);
//   this.actorLayer = this.wrap.appendChild(this.drawActors());
//   this.wrap.className = "game " + (this.level.status || "");
//   this.scrollPlayerIntoView();
// };
// DOMDisplay.prototype.scrollPlayerIntoView = function() {
//   var width = this.wrap.clientWidth;
//   var height = this.wrap.clientHeight;
//   var margin = width / 3;

//   // The viewport
//   var left = this.wrap.scrollLeft, right = left + width;
//   var top = this.wrap.scrollTop, bottom = top + height;

//   var player = this.level.player;
//   var center = player.pos.plus(player.size.times(0.5))
//                  .times(scale);

//   if (center.x < left + margin)
//     this.wrap.scrollLeft = center.x - margin;
//   else if (center.x > right - margin)
//     this.wrap.scrollLeft = center.x + margin - width;
//   if (center.y < top + margin)
//     this.wrap.scrollTop = center.y - margin;
//   else if (center.y > bottom - margin)
//     this.wrap.scrollTop = center.y + margin - height;
// };
// DOMDisplay.prototype.clear = function() {
//   this.wrap.parentNode.removeChild(this.wrap);
// };
// Level.prototype.obstacleAt = function(pos, size) {
//   var xStart = Math.floor(pos.x);
//   var xEnd = Math.ceil(pos.x + size.x);
//   var yStart = Math.floor(pos.y);
//   var yEnd = Math.ceil(pos.y + size.y);

//   if (xStart < 0 || xEnd > this.width || yStart < 0)
//     return "wall";
//   if (yEnd > this.height)
//     return "lava";
//   for (var y = yStart; y < yEnd; y++) {
//     for (var x = xStart; x < xEnd; x++) {
//       var fieldType = this.grid[y][x];
//       if (fieldType) return fieldType;
//     }
//   }
// };
// Level.prototype.actorAt = function(actor) {
//   for (var i = 0; i < this.actors.length; i++) {
//     var other = this.actors[i];
//     if (other != actor &&
//         actor.pos.x + actor.size.x > other.pos.x &&
//         actor.pos.x < other.pos.x + other.size.x &&
//         actor.pos.y + actor.size.y > other.pos.y &&
//         actor.pos.y < other.pos.y + other.size.y)
//       return other;
//   }
// };
//  var maxStep = 0.05;

// Level.prototype.animate = function(step, keys) {
//   if (this.status != null)
//     this.finishDelay -= step;

//   while (step > 0) {
//     var thisStep = Math.min(step, maxStep);
//     this.actors.forEach(function(actor) {
//       actor.act(thisStep, this, keys);
//     }, this);
//     step -= thisStep;
//   }
// };
//  Lava.prototype.act = function(step, level) {
//   var newPos = this.pos.plus(this.speed.times(step));
//   if (!level.obstacleAt(newPos, this.size))
//     this.pos = newPos;
//   else if (this.repeatPos)
//     this.pos = this.repeatPos;
//   else
//     this.speed = this.speed.times(-1);
// };
// var wobbleSpeed = 8, wobbleDist = 0.07;

// Coin.prototype.act = function(step) {
//   this.wobble += step * wobbleSpeed;
//   var wobblePos = Math.sin(this.wobble) * wobbleDist;
//   this.pos = this.basePos.plus(new Vector(0, wobblePos));
// };
//  var playerXSpeed = 7;

// Player.prototype.moveX = function(step, level, keys) {
//   this.speed.x = 0;
//   if (keys.left) this.speed.x -= playerXSpeed;
//   if (keys.right) this.speed.x += playerXSpeed;

//   var motion = new Vector(this.speed.x * step, 0);
//   var newPos = this.pos.plus(motion);
//   var obstacle = level.obstacleAt(newPos, this.size);
//   if (obstacle)
//     level.playerTouched(obstacle);
//   else
//     this.pos = newPos;
// };
// var gravity = 30;
// var jumpSpeed = 17;

// Player.prototype.moveY = function(step, level, keys) {
//   this.speed.y += step * gravity;
//   var motion = new Vector(0, this.speed.y * step);
//   var newPos = this.pos.plus(motion);
//   var obstacle = level.obstacleAt(newPos, this.size);
//   if (obstacle) {
//     level.playerTouched(obstacle);
//     if (keys.up && this.speed.y > 0)
//       this.speed.y = -jumpSpeed;
//     else
//       this.speed.y = 0;
//   } else {
//     this.pos = newPos;
//   }
// };
//  Player.prototype.act = function(step, level, keys) {
//   this.moveX(step, level, keys);
//   this.moveY(step, level, keys);

//   var otherActor = level.actorAt(this);
//   if (otherActor)
//     level.playerTouched(otherActor.type, otherActor);

//   // Losing animation
//   if (level.status == "lost") {
//     this.pos.y += step;
//     this.size.y -= step;
//   }
// };
// Level.prototype.playerTouched = function(type, actor) {
//   if (type == "lava" && this.status == null) {
//     this.status = "lost";
//     this.finishDelay = 1;
//   } else if (type == "coin") {
//     this.actors = this.actors.filter(function(other) {
//       return other != actor;
//     });
//     if (!this.actors.some(function(actor) {
//       return actor.type == "coin";
//     })) {
//       this.status = "won";
//       this.finishDelay = 1;
//     }
//   }
// };
// var arrowCodes = {37: "left", 38: "up", 39: "right"};

// function trackKeys(codes) {
//   var pressed = Object.create(null);
//   function handler(event) {
//     if (codes.hasOwnProperty(event.keyCode)) {
//       var down = event.type == "keydown";
//       pressed[codes[event.keyCode]] = down;
//       event.preventDefault();
//     }
//   }
//   addEventListener("keydown", handler);
//   addEventListener("keyup", handler);
//   return pressed;
// }
// function runAnimation(frameFunc) {
//   var lastTime = null;
//   function frame(time) {
//     var stop = false;
//     if (lastTime != null) {
//       var timeStep = Math.min(time - lastTime, 100) / 1000;
//       stop = frameFunc(timeStep) === false;
//     }
//     lastTime = time;
//     if (!stop)
//       requestAnimationFrame(frame);
//   }
//   requestAnimationFrame(frame);
// }
// var arrows = trackKeys(arrowCodes);

// function runLevel(level, Display, andThen) {
//   var display = new Display(document.body, level);
//   runAnimation(function(step) {
//     level.animate(step, arrows);
//     display.drawFrame(step);
//     if (level.isFinished()) {
//       display.clear();
//       if (andThen)
//         andThen(level.status);
//       return false;
//     }
//   });
// }
// function runGame(plans, Display) {
//   function startLevel(n) {
//     runLevel(new Level(plans[n]), Display, function(status) {
//       if (status == "lost")
//         startLevel(n);
//       else if (n < plans.length - 1)
//         startLevel(n + 1);
//       else{
// 		 document.body.innerHTML='<div class="won">YOU WON !</div>';
// 	  }
//     });
//   }
//   startLevel(0);
// }
// runGame(LEVELS, DOMDisplay);











































// /*
// Copyright (c) 2013 dissimulate at codepen

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// */

// /* Customisable map data */

// var map = {

//   tile_size: 16,

//   /*
  
//   Key vairables:
  
//   id       [required] - an integer that corresponds with a tile in the data array.
//   colour   [required] - any javascript compatible colour variable.
//   solid    [optional] - whether the tile is solid or not, defaults to false.
//   bounce   [optional] - how much velocity is preserved upon hitting the tile, 0.5 is half.
//   jump     [optional] - whether the player can jump while over the tile, defaults to false.
//   friction [optional] - friction of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
//   gravity  [optional] - gravity of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
//   fore     [optional] - whether the tile is drawn in front of the player, defaults to false.
//   script   [optional] - refers to a script in the scripts section, executed if it is touched.
  
//   */
  
//   keys: [
//       {id: 0, colour: '#333', solid: 0},
//       {id: 1, colour: '#888', solid: 0},
//       {id: 2,colour: '#555',solid: 1,bounce: 0.35},
//       {id: 3,colour: 'rgba(121, 220, 242, 0.4)',friction: {x: 0.9,y: 0.9},gravity: {x: 0,y: 0.1},jump: 1,fore: 1},
//       {id: 4,colour: '#777',jump: 1},
//       {id: 5,colour: '#E373FA',solid: 1,bounce: 1.1},
//       {id: 6,colour: '#666',solid: 1,bounce: 0},
//       {id: 7,colour: '#73C6FA',solid: 0,script: 'change_colour'},
//       {id: 8,colour: '#FADF73',solid: 0,script: 'next_level'},
//       {id: 9,colour: '#C93232',solid: 0,script: 'death'},
//       {id: 10,colour: '#555',solid: 1},
//       {id: 11,colour: '#0FF',solid: 0,script: 'unlock'}
//   ],

//   /* An array representing the map tiles. Each number corresponds to a key */
//   data: [
//       [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 6, 6, 6, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 4, 2, 2, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 2, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2],
//       [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
//       [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
//       [2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
//       [2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
//       [2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 8, 1, 1, 1, 2],
//       [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2],
//       [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 9, 9, 9, 2, 10, 10, 10, 10, 10, 10, 1, 1, 1, 1, 1, 1, 1, 11, 2, 2, 2, 2, 4, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2],
//       [2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 1, 1, 1, 1, 1, 2],
//       [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
//       [2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 6, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
//       [2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
//       [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
//       [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
//   ],

//   /* Default gravity of the map */
  
//   gravity: {
//       x: 0,
//       y: 0.3
//   },
  
//   /* Velocity limits */

//   vel_limit: {
//       x: 2,
//       y: 16
//   },

//   /* Movement speed when the key is pressed */
  
//   movement_speed: {
//       jump: 6,
//       left: 0.3,
//       right: 0.3
//   },
  
//   /* The coordinates at which the player spawns and the colour of the player */

//   player: {
//       x: 2,
//       y: 2,
//       colour: '#FF9900'
//   },
  
//   /* scripts refered to by the "script" variable in the tile keys */

//   scripts: {
//       /* you can just use "this" instead of your engine variable ("game"), but Codepen doesn't like it */
//       change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
//       /* you could load a new map variable here */
//       next_level: 'alert("Yay! You won! Reloading map.");game.load_map(map);',
//       death: 'alert("You died!");game.load_map(map);',
//       unlock: 'game.current_map.keys[10].solid = 0;game.current_map.keys[10].colour = "#888";'
//   }
// };

// /* Clarity engine */

// var Clarity = function () {

//   this.alert_errors   = false;
//   this.log_info       = true;
//   this.tile_size      = 16;
//   this.limit_viewport = false;
//   this.jump_switch    = 0;
  
//   this.viewport = {
//       x: 200,
//       y: 200
//   };
  
//   this.camera = {
//       x: 0,
//       y: 0
//   };
  
//   this.key = {
//       left: false,
//       right: false,
//       up: false
//   };

//   this.player = {

//       loc: {
//           x: 0,
//           y: 0
//       },
      
//       vel: {
//           x: 0,
//           y: 0
//       },
      
//       can_jump: true
//   };

//   window.onkeydown = this.keydown.bind(this);
//   window.onkeyup   = this.keyup.bind(this);
// };

// Clarity.prototype.error = function (message) {

//   if (this.alert_errors) alert(message);
//   if (this.log_info) console.log(message);
// };

// Clarity.prototype.log = function (message) {

//   if (this.log_info) console.log(message);
// };

// Clarity.prototype.set_viewport = function (x, y) {

//   this.viewport.x = x;
//   this.viewport.y = y;
// };

// Clarity.prototype.keydown = function (e) {

//   var _this = this;

//   switch (e.keyCode) {
//   case 37:
//       _this.key.left = true;
//       break;
//   case 38:
//       _this.key.up = true;
//       break;
//   case 39:
//       _this.key.right = true;
//       break;
//   }
// };

// Clarity.prototype.keyup = function (e) {

//   var _this = this;

//   switch (e.keyCode) {
//   case 37:
//       _this.key.left = false;
//       break;
//   case 38:
//       _this.key.up = false;
//       break;
//   case 39:
//       _this.key.right = false;
//       break;
//   }
// };

// Clarity.prototype.load_map = function (map) {

//   if (typeof map      === 'undefined'
//    || typeof map.data === 'undefined'
//    || typeof map.keys === 'undefined') {

//       this.error('Error: Invalid map data!');

//       return false;
//   }

//   this.current_map = map;

//   this.current_map.background = map.background || '#333';
//   this.current_map.gravity = map.gravity || {x: 0, y: 0.3};
//   this.tile_size = map.tile_size || 16;

//   var _this = this;
  
//   this.current_map.width = 0;
//   this.current_map.height = 0;

//   map.keys.forEach(function (key) {

//       map.data.forEach(function (row, y) {
          
//           _this.current_map.height = Math.max(_this.current_map.height, y);

//           row.forEach(function (tile, x) {
              
//               _this.current_map.width = Math.max(_this.current_map.width, x);

//               if (tile == key.id)
//                   _this.current_map.data[y][x] = key;
//           });
//       });
//   });
  
//   this.current_map.width_p = this.current_map.width * this.tile_size;
//   this.current_map.height_p = this.current_map.height * this.tile_size;

//   this.player.loc.x = map.player.x * this.tile_size || 0;
//   this.player.loc.y = map.player.y * this.tile_size || 0;
//   this.player.colour = map.player.colour || '#000';

//   this.key.left  = false;
//   this.key.up    = false;
//   this.key.right = false;
  
//   this.camera = {
//       x: 0,
//       y: 0
//   };
  
//   this.player.vel = {
//       x: 0,
//       y: 0
//   };

//   this.log('Successfully loaded map data.');

//   return true;
// };

// Clarity.prototype.get_tile = function (x, y) {

//   return (this.current_map.data[y] && this.current_map.data[y][x]) ? this.current_map.data[y][x] : 0;
// };

// Clarity.prototype.draw_tile = function (x, y, tile, context) {

//   if (!tile || !tile.colour) return;

//   context.fillStyle = tile.colour;
//   context.fillRect(
//       x,
//       y,
//       this.tile_size,
//       this.tile_size
//   );
// };

// Clarity.prototype.draw_map = function (context, fore) {

//   for (var y = 0; y < this.current_map.data.length; y++) {

//       for (var x = 0; x < this.current_map.data[y].length; x++) {

//           if ((!fore && !this.current_map.data[y][x].fore) || (fore && this.current_map.data[y][x].fore)) {

//               var t_x = (x * this.tile_size) - this.camera.x;
//               var t_y = (y * this.tile_size) - this.camera.y;
              
//               if(t_x < -this.tile_size
//               || t_y < -this.tile_size
//               || t_x > this.viewport.x
//               || t_y > this.viewport.y) continue;
              
//               this.draw_tile(
//                   t_x,
//                   t_y,
//                   this.current_map.data[y][x],
//                   context
//               );
//           }
//       }
//   }

//   if (!fore) this.draw_map(context, true);
// };

// Clarity.prototype.move_player = function () {

//   var tX = this.player.loc.x + this.player.vel.x;
//   var tY = this.player.loc.y + this.player.vel.y;

//   var offset = Math.round((this.tile_size / 2) - 1);

//   var tile = this.get_tile(
//       Math.round(this.player.loc.x / this.tile_size),
//       Math.round(this.player.loc.y / this.tile_size)
//   );
   
//   if(tile.gravity) {
      
//       this.player.vel.x += tile.gravity.x;
//       this.player.vel.y += tile.gravity.y;
      
//   } else {
      
//       this.player.vel.x += this.current_map.gravity.x;
//       this.player.vel.y += this.current_map.gravity.y;
//   }
  
//   if (tile.friction) {

//       this.player.vel.x *= tile.friction.x;
//       this.player.vel.y *= tile.friction.y;
//   }

//   var t_y_up   = Math.floor(tY / this.tile_size);
//   var t_y_down = Math.ceil(tY / this.tile_size);
//   var y_near1  = Math.round((this.player.loc.y - offset) / this.tile_size);
//   var y_near2  = Math.round((this.player.loc.y + offset) / this.tile_size);

//   var t_x_left  = Math.floor(tX / this.tile_size);
//   var t_x_right = Math.ceil(tX / this.tile_size);
//   var x_near1   = Math.round((this.player.loc.x - offset) / this.tile_size);
//   var x_near2   = Math.round((this.player.loc.x + offset) / this.tile_size);

//   var top1    = this.get_tile(x_near1, t_y_up);
//   var top2    = this.get_tile(x_near2, t_y_up);
//   var bottom1 = this.get_tile(x_near1, t_y_down);
//   var bottom2 = this.get_tile(x_near2, t_y_down);
//   var left1   = this.get_tile(t_x_left, y_near1);
//   var left2   = this.get_tile(t_x_left, y_near2);
//   var right1  = this.get_tile(t_x_right, y_near1);
//   var right2  = this.get_tile(t_x_right, y_near2);


//   if (tile.jump && this.jump_switch > 15) {

//       this.player.can_jump = true;
      
//       this.jump_switch = 0;
      
//   } else this.jump_switch++;
  
//   this.player.vel.x = Math.min(Math.max(this.player.vel.x, -this.current_map.vel_limit.x), this.current_map.vel_limit.x);
//   this.player.vel.y = Math.min(Math.max(this.player.vel.y, -this.current_map.vel_limit.y), this.current_map.vel_limit.y);
  
//   this.player.loc.x += this.player.vel.x;
//   this.player.loc.y += this.player.vel.y;
  
//   this.player.vel.x *= .9;
  
//   if (left1.solid || left2.solid || right1.solid || right2.solid) {

//       /* fix overlap */

//       while (this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near1).solid
//           || this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y_near2).solid)
//           this.player.loc.x += 0.1;

//       while (this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near1).solid
//           || this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y_near2).solid)
//           this.player.loc.x -= 0.1;

//       /* tile bounce */

//       var bounce = 0;

//       if (left1.solid && left1.bounce > bounce) bounce = left1.bounce;
//       if (left2.solid && left2.bounce > bounce) bounce = left2.bounce;
//       if (right1.solid && right1.bounce > bounce) bounce = right1.bounce;
//       if (right2.solid && right2.bounce > bounce) bounce = right2.bounce;

//       this.player.vel.x *= -bounce || 0;
      
//   }
  
//   if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {

//       /* fix overlap */
      
//       while (this.get_tile(x_near1, Math.floor(this.player.loc.y / this.tile_size)).solid
//           || this.get_tile(x_near2, Math.floor(this.player.loc.y / this.tile_size)).solid)
//           this.player.loc.y += 0.1;

//       while (this.get_tile(x_near1, Math.ceil(this.player.loc.y / this.tile_size)).solid
//           || this.get_tile(x_near2, Math.ceil(this.player.loc.y / this.tile_size)).solid)
//           this.player.loc.y -= 0.1;

//       /* tile bounce */
      
//       var bounce = 0;
      
//       if (top1.solid && top1.bounce > bounce) bounce = top1.bounce;
//       if (top2.solid && top2.bounce > bounce) bounce = top2.bounce;
//       if (bottom1.solid && bottom1.bounce > bounce) bounce = bottom1.bounce;
//       if (bottom2.solid && bottom2.bounce > bounce) bounce = bottom2.bounce;
      
//       this.player.vel.y *= -bounce || 0;

//       if ((bottom1.solid || bottom2.solid) && !tile.jump) {
          
//           this.player.on_floor = true;
//           this.player.can_jump = true;
//       }
      
//   }
  
//   // adjust camera

//   var c_x = Math.round(this.player.loc.x - this.viewport.x/2);
//   var c_y = Math.round(this.player.loc.y - this.viewport.y/2);
//   var x_dif = Math.abs(c_x - this.camera.x);
//   var y_dif = Math.abs(c_y - this.camera.y);
  
//   if(x_dif > 5) {
      
//       var mag = Math.round(Math.max(1, x_dif * 0.1));
  
//       if(c_x != this.camera.x) {
          
//           this.camera.x += c_x > this.camera.x ? mag : -mag;
          
//           if(this.limit_viewport) {
              
//               this.camera.x = 
//                   Math.min(
//                       this.current_map.width_p - this.viewport.x + this.tile_size,
//                       this.camera.x
//                   );
              
//               this.camera.x = 
//                   Math.max(
//                       0,
//                       this.camera.x
//                   );
//           }
//       }
//   }
  
//   if(y_dif > 5) {
      
//       var mag = Math.round(Math.max(1, y_dif * 0.1));
      
//       if(c_y != this.camera.y) {
          
//           this.camera.y += c_y > this.camera.y ? mag : -mag;
      
//           if(this.limit_viewport) {
              
//               this.camera.y = 
//                   Math.min(
//                       this.current_map.height_p - this.viewport.y + this.tile_size,
//                       this.camera.y
//                   );
              
//               this.camera.y = 
//                   Math.max(
//                       0,
//                       this.camera.y
//                   );
//           }
//       }
//   }
  
//   if(this.last_tile != tile.id && tile.script) {
  
//       eval(this.current_map.scripts[tile.script]);
//   }
  
//   this.last_tile = tile.id;
// };

// Clarity.prototype.update_player = function () {

//   if (this.key.left) {

//       if (this.player.vel.x > -this.current_map.vel_limit.x)
//           this.player.vel.x -= this.current_map.movement_speed.left;
//   }

//   if (this.key.up) {

//       if (this.player.can_jump && this.player.vel.y > -this.current_map.vel_limit.y) {
          
//           this.player.vel.y -= this.current_map.movement_speed.jump;
//           this.player.can_jump = false;
//       }
//   }

//   if (this.key.right) {

//       if (this.player.vel.x < this.current_map.vel_limit.x)
//           this.player.vel.x += this.current_map.movement_speed.left;
//   }

//   this.move_player();
// };

// Clarity.prototype.draw_player = function (context) {

//   context.fillStyle = this.player.colour;

//   context.beginPath();

//   context.arc(
//       this.player.loc.x + this.tile_size / 2 - this.camera.x,
//       this.player.loc.y + this.tile_size / 2 - this.camera.y,
//       this.tile_size / 2 - 1,
//       0,
//       Math.PI * 2
//   );

//   context.fill();
// };

// Clarity.prototype.update = function () {

//   this.update_player();
// };

// Clarity.prototype.draw = function (context) {

//   this.draw_map(context, false);
//   this.draw_player(context);
// };

// /* Setup of the engine */

// window.requestAnimFrame =
// window.requestAnimationFrame ||
// window.webkitRequestAnimationFrame ||
// window.mozRequestAnimationFrame ||
// window.oRequestAnimationFrame ||
// window.msRequestAnimationFrame ||
// function(callback) {
//   return window.setTimeout(callback, 1000 / 60);
// };

// var canvas = document.getElementById('canvas'),
//   ctx = canvas.getContext('2d');

// canvas.width = 400;
// canvas.height = 400;

// var game = new Clarity();
//   game.set_viewport(canvas.width, canvas.height);
//   game.load_map(map);

//   /* Limit the viewport to the confines of the map */
//   game.limit_viewport = true;

// var Loop = function() {

// ctx.fillStyle = '#333';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// game.update();
// game.draw(ctx);

// window.requestAnimFrame(Loop);
// };

// Loop();