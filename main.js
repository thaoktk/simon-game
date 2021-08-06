var buttonColors = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false


function makeSound(name) {
    var sound = new Audio('./assets/sounds/' + name + '.mp3');
    sound.play();

    sound.onended = function(){
        this.currentSrc = null;
        this.src = "";
        this.srcObject = null;
        this.remove();
    };
}

function animatePress(currentColor) {
    var activeButton = $('#' + currentColor)
    activeButton.addClass('pressed');
    setTimeout(function() {
        activeButton.removeClass('pressed');
    }, 100)
}

function checkAnswers(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) { // nếu bấm đúng hết thì đi tiếp
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    } else {
        makeSound('wrong') // chạy nhạc wrong
        $('body').addClass('game-over') // vl thẻ body cũng thêm class dc à
        setTimeout(function() {
            $('body').removeClass('game-over')
        }, 200)

        $('#level-title').text('Game Over, Press Any Key to Restart')
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}

$(document).keypress(function() {
    if (!started) {
        $('#level-title').text('Level ' + level)
        nextSequence()
        started = true
    }
})

$('.btn').click(function() {
    var userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor)
    animatePress(userChosenColor)

    checkAnswers(userClickedPattern.length - 1) // ktra ptu cuối của cái mảng ng dùng click có đúng với mảng game cho hay ko
    // ví dụ bấm đúng đến số 3, nó nhảy số 3 ô hàm check, ktra ptu ở vtri thứ 3 của user có đúng với ptu ở vtri thứ 3 mảng game hay ko
})

function nextSequence() {
    userClickedPattern = [] // đặt lại làm mảng rỗng để ng chơi bấm lại từ đầu
    level++;
    $('#level-title').text('Level ' + level)

    var randomNumber = Math.floor(Math.random() * 4)

    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100) // animate flash
    makeSound(randomChosenColor);
}



