var buttonColor = ['red', 'green', 'blue', 'yellow']
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false

function playSound(name) {
    var sound = new Audio("./assets/sounds/" + name + ".mp3");
    sound.play();

    sound.onended = function(){
        this.currentSrc = null;
        this.src = "";
        this.srcObject = null;
        this.remove();
    };
}

function animatePress(name) {
    var activeButton = '#' + name
    $(activeButton).addClass('pressed')
    setTimeout(function() {
        $(activeButton).removeClass('pressed')
    }, 100)
}

$('.btn-play').click(function() {
    if(!started) {
        $('#level-title').text('Level ' + level)
        started = true
        $(this).addClass('active')
        setTimeout(function() {
            nextSequence()
        }, 2000)
        setTimeout(function() {
            $('.how-to-play').css('display', 'none')
        }, 1000)
    }
})

$('.btn').click(function() {
    var userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswers(userClickedPattern.length - 1)
})

function checkAnswers(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            var levelGame = $('.btn-play.active').text()
            switch (levelGame) {
                case 'Easy' :
                    setTimeout(function() {
                        nextSequence()
                    }, 1200)
                    break;
                case 'Medium' :
                    setTimeout(function() {
                        nextSequence()
                    }, 700)
                    break;
                case 'Hard' :
                    setTimeout(function() {
                        nextSequence()
                    }, 200)
                    break;
            }
        }
    } else {

        playSound('wrong')
        $('body').addClass('game-over')
        setTimeout(function() {
            $('body').removeClass('game-over')
        }, 200)

        $('#level-title').text('Game over. Good luck next time')
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
    $('.btn-play.active').removeClass('active')
    setTimeout(function() {
        $('.how-to-play').css('display', 'block')
    }, 2000)
}


function nextSequence() {
    userClickedPattern = []
    level++
    $('#level-title').text('Level ' + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColor[randomNumber]

    gamePattern.push(randomChosenColor)
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}
