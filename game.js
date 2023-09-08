var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length-1);
});


function nextSequence(){
    userClickPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(randomChosenColor){
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);

}

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("Success");
        if (userClickPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    }
    else
    {
        console.log("Wrong");
        gameOverSound();
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function gameOverSound(){
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


//nextSequence();




