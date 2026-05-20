var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").on("click", function(event){
    var userChosenColor = event.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);

    if(!checkAnswer()){
        gameOver();
        $("h1").text("Game Over, Press Any Key to Restart");
    }
    else if( userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
           }, 1000);
    }
})

$(document).keypress(function(event){
    if(!gameStarted){
        gameStarted = true;
         $("h1").text(`Level ${level}`);
        nextSequence();
    }
})

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("h1").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
}


function playSound(name){
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    },100);
}

function checkAnswer(){
  if(gamePattern[userClickedPattern.length-1] === userClickedPattern[userClickedPattern.length-1]) return true;
  return false;
}
function gameOver(){
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startOver();
}
function startOver(){
        gamePattern = [];
        level = 0;
        gameStarted = false;
}