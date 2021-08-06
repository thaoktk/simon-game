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
        $(this).addClass('active') // this là cái nút mà dc bấm vào
        setTimeout(function() {
            $('.how-to-play').css('display', 'none')
        }, 1000)
        var levelGame = $(this).text()
        switch (levelGame) {
            case 'Easy' :
                setTimeout(function() {
                    nextSequenceEasy()
                }, 2000)
                break;
            case 'Medium' :
                setTimeout(function() {
                    nextSequenceMedium()
                }, 2000)
                break;
            case 'Hard' :
                setTimeout(function() {
                    nextSequenceHard()
                }, 2000)
                break;
        }
    }
})

$('.btn').click(function() {
    var userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswers(userClickedPattern.length - 1)  // ktra ptu cuối của cái mảng ng dùng click có đúng với mảng game cho hay ko
    // ví dụ bấm đúng đến số 3, nó nhảy số 3 ô hàm check, ktra ptu ở vtri thứ 3 của user có đúng với ptu ở vtri thứ 3 mảng game hay ko
})

function checkAnswers(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) { // độ dài 2 mảng bằng nhau mới cho đi tiếp
            var levelGame = $('.btn-play.active').text()
            switch (levelGame) {
                case 'Easy' :
                    setTimeout(function() {
                        nextSequenceEasy()
                    }, 1000)
                    break;
                case 'Medium' :
                    setTimeout(function() {
                        nextSequenceMedium()
                    }, 1000)
                    break;
                case 'Hard' :
                    setTimeout(function() {
                        nextSequenceHard()
                    }, 1000)
                    break;
            }
        }
    } else {

        playSound('wrong')
        $('body').addClass('game-over') // vl thẻ body cũng thêm class dc à
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


// level easy
function nextSequenceEasy() {
    userClickedPattern = [] // đặt lại làm mảng rỗng để ng chơi bấm lại từ đầu
    level++;
    $('#level-title').text('Level ' + level)

    var randomNumber = Math.floor(Math.random() * 4)

    var randomChosenColor = buttonColor[randomNumber]
    gamePattern.push(randomChosenColor)

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100) // animate flash
    makeSound(randomChosenColor);
}

// level medium
function nextSequenceMedium() {
    userClickedPattern = [] // đặt lại làm mảng rỗng để ng chơi bấm lại từ đầu
    level++
    $('#level-title').text('Level ' + level)
    var randomNumber1 = Math.floor(Math.random() * 4)
    var randomChosenColor1 = buttonColor[randomNumber1]

    gamePattern.push(randomChosenColor1)
    $('#' + randomChosenColor1).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor1)

    var randomNumber2 = Math.floor(Math.random() * 4)
    var randomChosenColor2 = buttonColor[randomNumber2]

    gamePattern.push(randomChosenColor2)
    setTimeout(function() {
        $('#' + randomChosenColor2).fadeIn(100).fadeOut(100).fadeIn(100)
        playSound(randomChosenColor2)
    }, 500)
}


// level hard
function nextSequenceHard() {
    userClickedPattern = [] // đặt lại làm mảng rỗng để ng chơi bấm lại từ đầu
    level++
    $('#level-title').text('Level ' + level)
    var randomNumber1 = Math.floor(Math.random() * 4)
    var randomChosenColor1 = buttonColor[randomNumber1]

    gamePattern.push(randomChosenColor1)
    $('#' + randomChosenColor1).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor1)

    var randomNumber2 = Math.floor(Math.random() * 4)
    var randomChosenColor2 = buttonColor[randomNumber2]

    gamePattern.push(randomChosenColor2)
    setTimeout(function() {
        $('#' + randomChosenColor2).fadeIn(100).fadeOut(100).fadeIn(100)
        playSound(randomChosenColor2)
    }, 500)

    var randomNumber3 = Math.floor(Math.random() * 4)
    var randomChosenColor3 = buttonColor[randomNumber3]

    gamePattern.push(randomChosenColor3)
    setTimeout(function() {
        $('#' + randomChosenColor3).fadeIn(100).fadeOut(100).fadeIn(100)
        playSound(randomChosenColor3)
    }, 1000)
}