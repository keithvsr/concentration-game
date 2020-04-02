var firstSquare = null;
var resetButton = document.getElementById("reset-button");
var colors = [];
var gameSquares = [];
var maxGametiles = 16;  // total number of tiles you can support
for (var i = 0; i < maxGametiles; i++) {
  // var elements = document.getElementsByClassName('.square-' + i);
  // console.log("Before: " + elements.length);
  colors.push('square-' + i);
  // console.log("After: " + elements.length);
}

/* resetButton.addEventListener("click", clearGame); */

if (resetButton.addEventListener)
	resetButton.addEventListener("click", clearGame, false);
else if (resetButton.attachEvent)
	resetButton.attachEvent('onClick', clearGame);

function GameSquare(el, color) {
	this.el = el;
  this.isOpen = false;
  this.isLocked = false;
  this.el.addEventListener("click", this, false);
  this.setColor(color);
}

GameSquare.prototype.handleEvent = function(e) {
	switch (e.type) {
  	case "click":
    	if (this.isOpen || this.isLocked) {
      	return;
      }
      this.isOpen = true;
      this.el.classList.add('flip');
      checkGame(this); // <- this runs the logic of the game on click
  }
}

GameSquare.prototype.reset = function() {
	this.isOpen = false;
  this.isLocked = false;
  this.el.classList.remove('flip');
}

GameSquare.prototype.lock = function() {
	this.isLocked = true;
  this.isOpen = true;
}

GameSquare.prototype.setColor = function(color) {
	this.el.children[0].children[1].classList.remove(this.color);
  this.color = color;
  this.el.children[0].children[1].classList.add(color);
}

function randomizeColors() {
	var randomColors = getSomeColors();
  gameSquares.forEach(function(gameSquare) {
  	var color = randomColors.splice(random(randomColors.length),1)[0];
    gameSquare.setColor(color);
  });
}

function clearGame() {
	gameSquares.forEach(function(gameSquare) {
  	gameSquare.reset();
  }); // reset the game objects
  setTimeout(function() {
  	randomizeColors();
  }, 400); // randomize the color class selection
  setTimeout(function() {
    for (var i = 0; i < maxGametiles; i++) { // reshuffle bg color selection
      var thing = "square-" + i;
      console.log(thing);
      attachHexToColor(thing);
    }
  },500);
}

function setupGame() {
	var array = document.getElementsByClassName("game-square");
  var randomColors = getSomeColors();										// Get an array of 8 random colors
  for (var i = 0; i < array.length; i++) {
  	var index = random(randomColors.length);
    var color = randomColors.splice(index,1)[0];				// Get the color at a random index
    // Use that color to set the GameSquare
    gameSquares.push(new GameSquare(array[i],color));
  	/* gameSquares.push(new GameSquare(array[i], colors[0])); */ // OLD
  }
}

function random(n) {
	return Math.floor(Math.random() * n);
}

function getSomeColors() {
	var colorsCopy = colors.slice();
  var randomColors = [];
  for (var i = 0; i < 8; i++) {
  	var index = random(colorsCopy.length);
    randomColors.push(colorsCopy.splice(index,1)[0]);
  }
  return randomColors.concat(randomColors.slice());
}

function checkGame(gameSquare) {
	if (firstSquare === null) {
  	firstSquare = gameSquare;
    return;
  }
  
  if (firstSquare.color === gameSquare.color) {
  	firstSquare.lock();
    gameSquare.lock();
  } else {
  	var a = firstSquare;
    var b = gameSquare;
    setTimeout(function() {
    	a.reset();
      b.reset();
      firstSquare = null;
    }, 400);
  }
  firstSquare = null;
}

function getColorHex() {
  var randomColor = manyColors[Math.floor(Math.random() * manyColors.length)];
  // console.log(randomColor);
  return randomColor;
}

function attachHexToColor(color) {
  var hexColor = getColorHex();
  var elements = document.getElementsByClassName(color);
  for (var i = 0; i < elements.length; i++) {
    // elements[i].style.background-color = hexColor;
    elements[i].style.backgroundColor = hexColor;
  }
}

setupGame();
// getColorHex();
// attachHexToColor();
for (var i = 0; i < maxGametiles; i++) {
  var thing = "square-" + i;
  // console.log(thing);
  attachHexToColor(thing);
}
