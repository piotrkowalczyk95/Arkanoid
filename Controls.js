function moveleft() {
    if (isDirectionsActive) {
        horizontalPlatform.speedX = 5;
    }
    else {
        horizontalPlatform.speedX = -5;
    }   
}

function moveright() {
    if (isDirectionsActive) {
        horizontalPlatform.speedX = -5;
    }
    else {
        horizontalPlatform.speedX = 5;
    }
}

function moveup() {
    if (verticalPlatform) {
        if (isDirectionsActive) {
            horizontalPlatform.speedY = -5;
        }
        else {
            horizontalPlatform.speedY = 5;
        }
    }
}

function movedown() {
    if (verticalPlatform) {
        if (isDirectionsActive) {
            horizontalPlatform.speedX = 5;
        }
        else {
            horizontalPlatform.speedX = -5;
        }
    }
}

function clearmove() {
    if (verticalPlatform) {
        verticalPlatform.speedY = 0;
    }
    horizontalPlatform.speedX = 0;
}

function pause() {
    if (!gamePaused) {
        for (let i = 0; i < myBallArray.length; i++) {
            tempBallSpeedX.push(myBallArray[i].speedX);
            tempBallSpeedY.push(myBallArray[i].speedY);
            myBallArray[i].speedX = 0;
            myBallArray[i].speedY = 0;
        }
        gamePaused = true;
    }
}

function start() {
    if (gamePaused) {
        for (let i = 0; i < myBallArray.length; i++) {
            myBallArray[i].speedX = tempBallSpeedX.shift();
            myBallArray[i].speedY = tempBallSpeedY.shift();
        }
        gamePaused = false;
    }
}

function gameOver() {
    keyPressed = false;
    clearmove();
    window.alert("You lost");
    addScore(db);
    clearInterval(myGameArea.interval);
    score = 0;
    verticalPlatform = null;
    player = null;
    startGame();
}

function gameWin() {
    keyPressed = false;
    clearmove();
    window.alert("You won!");
    addScore(db);
    clearInterval(myGameArea.interval);
    score = 0;
    verticalPlatform = null;
    player = null;
    startGame();
}