function modeOne() {
    var counter;
    if (tilesArray.length < 5) {
        let tilesToGenerate = Math.floor(Math.random() * (20 - 1 + 1) + 1);
        while (tilesToGenerate > 0) {
            for (let i = 50; i < 80; i = i + 21) {
                for (let j = 65; j < 575; j = j + 51) {
                    for (counter = 0; counter < tilesArray.length; counter++){
                        if (tilesArray[counter].x == j && tilesArray[counter].y == i) {
                            break;
                        }
                    }
                    if (counter == tilesArray.length) {
                        let random = Math.floor(Math.random() * (100 - 1 + 1) + 1);
                        if (random < 20) {
                            tilesArray.push(new tile(j, i));
                            tilesToGenerate--;
                            if (tilesArray.length >= 25) {
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    else if (tilesArray.length < 25 && tilesArray.length >= 5) {
        for (let i = 50; i < 80; i = i + 21) {
            for (let j = 65; j < 575; j = j + 51) {
                for (counter = 0; counter < tilesArray.length; counter++) {
                    if (tilesArray[counter].x == j && tilesArray[counter].y == i) {
                        break;
                    }
                }
                if (counter == tilesArray.length) {
                    let random = Math.floor(Math.random() * (100 - 1 + 1) + 1);
                    if (random < 20) {
                        tilesArray.push(new tile(j, i));
                        if (tilesArray.length >= 25) {
                            return;
                        }
                    }
                }
            }
        }

    }
}

function modeTwo() {
    for (let i = 0; i < tilesArray.length; i++) {
        tilesArray[i].y += 21;
    }
    let j = 65;
    for (let i = 0; i < 10; i++) {
        tilesArray.push(new tile(j, 50));
        j += 51;
    }
    let lowest = 0;
    if (verticalPlatform) {
        for (let i = 0; i < tilesArray.length; i++) {
            if (tilesArray[i].tileCollision(verticalPlatform)) {
                verticalPlatform.x = tilesArray[i].x + tilesArray[i].height + 3;
                if (verticalPlatform.x + verticalPlatform.height > myGameArea.clear.height) {
                    gameOver();
                }
            }
            if (tilesArray[i].tileCollision(horizontalPlatform)) {
                gameOver();
            }
            if (tilesArray[i].x + tilesArray[i].height > lowest) {
                lowest = tilesArray[i].x + tilesArray[i].height + 60;
            }
        }
    }
    else {
        for (let i = 0; i < tilesArray.length; i++) {
            if (tilesArray[i].tileCollision(horizontalPlatform)) {
                gameOver();
            }
            if (tilesArray[i].x + tilesArray[i].height > lowest) {
                lowest = tilesArray[i].x + tilesArray[i].height + 60;
            }
        }
    }
}

function randomBonus(x, y) {
    let random = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (random < 20) {
        let selector = Math.floor(Math.random() * 5);
        if (selector == 0) {
            bonusArray.push(new bonus("x2", x, y));
        }
        else if (selector == 1) {
            bonusArray.push(new bonus("x5", x, y));
        }
        else if (selector == 2) {
            bonusArray.push(new bonus("sizePlus", x, y));
        }
        else if (selector == 3) {
            bonusArray.push(new bonus("sizeMinus", x, y));
        }
        else {
            bonusArray.push(new bonus("directions", x, y));
        }
    }
}

function checkBonusTimers() {
    if (time - x2Timer > 5 && isX2Active) {
        isX2Active = false;
    }
    if (time - x5Timer > 5 && isX5Active) {
        isX5Active = false;
    }
    if (time - sizeUpgrTimer > 5 && isSizeUpgrActive) {
        isSizeUpgrActive = false;
        horizontalPlatform.width = startingSize;
    }
    if (time - sizeDwngTimer > 5 && isSizeDwngrActive) {
        isSizeDwngrActive = false;
        horizontalPlatform.width = startingSize;
    }
    if (time - dirTimer > 5 && isDirectionsActive) {
        isDirectionsActive = false;
    }
}

function checkForActiveBonus() {
    for (let i = 0; i < bonusArray.length; i++) {
        bonusArray[i].update();
        checkCollision = bonusArray[i].isCaught(horizontalPlatform);
        if (checkCollision == true) {
            if (bonusArray[i].type == "x2") {
                isX2Active = true;
                x2Timer = time;
            }
            else if (bonusArray[i].type == "x5") {
                isX5Active = true;
                x5Timer = time;
            } else if (bonusArray[i].type == "sizePlus") {
                if (isSizeDwngrActive) {
                    isSizeDwngrActive = false;
                    horizontalPlatform.width = startingSize;
                }
                else {
                    isSizeUpgrActive = true;
                    horizontalPlatform.width = startingSize * 1.2;
                    if (horizontalPlatform.x + horizontalPlatform.width > myGameArea.canvas.width) {
                        horizontalPlatform.x = myGameArea.canvas.width - horizontalPlatform.width;
                    }
                }
                sizeUpgrTimer = time;
            } else if (bonusArray[i].type == "sizeMinus") {
                if (isSizeUpgrActive) {
                    isSizeUpgrActive = false;
                    horizontalPlatform.width = startingSize;
                    if (horizontalPlatform.x + horizontalPlatform.width > myGameArea.canvas.width) {
                        horizontalPlatform.x = myGameArea.canvas.width - horizontalPlatform.width;
                    }
                }
                else {
                    isSizeDwngrActive = true;
                    horizontalPlatform.width = startingSize * 0.8;
                }
                sizeDwngTimer = time;
            } else {
                if (isDirectionsActive == true) {
                    isDirectionsActive = false;
                }
                else {
                    isDirectionsActive = true;
                    dirTimer = time;
                }
            }
            bonusArray.splice(i, 1);
            i--;
        }
        else if (bonusArray[i].y > horizontalPlatform.y + horizontalPlatform.height) {
            bonusArray.splice(i, 1);
            i--;
        }
    }
}

function addBall() {
    if (countB >= 5) {
        myBallArray.push(new ball());
        countB = 0;
    }
}

function deleteBall() {
    for (let i = 0; i < myBallArray.length; i++) {
        myBallArray[i].newPos();
        myBallArray[i].update();
        myBallArray[i].checkBallCollision();
        var toDelete = myBallArray[i].checkForDelete();
        if (toDelete == true) {
            myBallArray.splice(i, 1)
            i--;
        }
    }
}

function gamemodeRules() {
    if (mode == false) {
        if (time % 5 == 0 || tilesArray.length < 5) {
            modeOne();
        }
    }
    else {
        if (time % 30 == 0 && time != 0 && block == false) {
            modeTwo();
            block = true;
        }
        else if (time % 30 != 0) {
            block = false;
        }
    }
}
