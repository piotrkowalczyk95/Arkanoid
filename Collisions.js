function checkObjectsCollision() {
    if (verticalPlatform) {
        horizontalPlatform.newPosVer(verticalPlatform);
        horizontalPlatform.update();
        verticalPlatform.newPos(horizontalPlatform);
        verticalPlatform.update();
        for (let i = 0; i < myBallArray.length; i++) {
            myBallArray[i].checkHorizontalPlatform(horizontalPlatform);
            myBallArray[i].checkVerticalPlatform(verticalPlatform);
        }
    }
    else {
        horizontalPlatform.newPos();
        horizontalPlatform.update();
        for (let i = 0; i < myBallArray.length; i++) {
            myBallArray[i].checkHorizontalPlatform(horizontalPlatform);
        }
    }
    var checkCollision;
    for (let i = 0; i < tilesArray.length; i++) {
        tilesArray[i].update();
        for (let j = 0; j < myBallArray.length; j++) {
            checkCollision = myBallArray[j].checkCollisionTile(tilesArray[i]);
            if (checkCollision == true) {
                if (tilesArray[i].type == 'B') {
                    countB++;
                }
                else {
                    randomBonus(tilesArray[i].x, tilesArray[i].y);
                }
                tilesArray.splice(i, 1);
                i--;
                let toAdd = 1;
                if (isX2Active) {
                    toAdd *= 2;
                }
                if (isX5Active) {
                    toAdd *= 5;
                }
                score += toAdd;
                break;
            }
        }
    }

}