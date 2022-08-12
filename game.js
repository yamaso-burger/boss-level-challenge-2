
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var isStarted = false;

function playSound(name, isRight) {
    if(isRight){
        var beep = new Audio("sounds/" + name + ".mp3");
    }else {
        var beep = new Audio("sounds/wrong.mp3");
    }
    beep.play();
}

function animatePress(userChosenColour) {
    var button = $("#" + userChosenColour)[0];
    button.classList.add("pressed");
    setTimeout(function(){
        button.classList.remove("pressed");
    }, 100);
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour = buttonColours[randomNumber];

    level++;
    $("#level-title").text("Level " + level);


    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).animate({opacity: 0.5}, 80).animate({opacity: 1} , 80);
    playSound(randomChosenColour, true);

}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if(currentLevel + 1 === level){
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        return true;
    } else {
        console.log("wrong");
        $('body').addClass("red");
        setTimeout(function(){
            $('body').removeClass("red");
        }, 200);
        return false;
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    isStarted = false;
    $("#level-title").text("Game Over");
    setTimeout(function(){
        $('#level-title').text("Press A Key to Restart");
    }, 1500);
}


$(".btn").on("click", function(event){
    if(isStarted) {

        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        var isRight = checkAnswer(userClickedPattern.length - 1);
        playSound(userChosenColour, isRight);
        animatePress(userChosenColour);
        if(!isRight) {
            startOver();
        }
    }
});

$("html").keydown(function(e) {
    if(!isStarted) {
        nextSequence();
        isStarted = true;
    }
});




