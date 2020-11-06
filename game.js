// Create and array with four colors
let buttonColors = ["red", "blue", "green", "yellow"];
// Create an empty array gamePattern
let gamePattern = [];
// Create an empty array userClickedPattern
let userClickedPattern = [];
// Game level
var level = 0;
// Game status
var started = false;

// Start the game
// detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
  // Store the id of the button that got clicked
  var userChosenColour = this.id;
  // Add the contents of the variable userChosenColour to the end of userClickedPattern
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Function to chose random colour-button, add it to the gamePattern, makes fade effect and play sound
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  //Create a variable randomChosenColour
  var randomChosenColour = buttonColors[randomNumber];
  // Add the new randomChosenColour to the end of the gamePattern
  gamePattern.push(randomChosenColour);
  // Select the button with the same id as the randomChosenColour, flash animation
  $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);
  // play the sound for the selected button
  playSound(randomChosenColour);
}


// Create a function checkAnswer
function checkAnswer(currentLevel) {
  //if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Function to play right sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to toggle css class .pressed for 100 miliseconds
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function start-Over
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
