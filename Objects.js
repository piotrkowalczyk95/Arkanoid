class platformHorizontal {
    constructor(width, height, x, y) {
        this.speedX = 0;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "hPlatform.png";
    }
    update() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    newPosVer(obj) {
        if (this.speedX < 0) {
            if (this.x > 0 && (this.x > obj.x + obj.width || this.y > obj.y + obj.height)) {
                this.x += this.speedX;
            }
        }
        else if (this.speedX > 0) {
            if ((this.x + this.width) < myGameArea.canvas.width) {
                this.x += this.speedX;
            }
        }
    }
    newPos() {
        if (this.speedX < 0) {
            if (this.x > 0) {
                this.x += this.speedX;
            }
        }
        else if (this.speedX > 0) {
            if ((this.x + this.width) < myGameArea.canvas.width) {
                this.x += this.speedX;
            }
        }
    }
}

class platformVertical {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.scr = "vPlatform.png";
    }
    update() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    newPos(obj) {
        if (this.speedY < 0) {
            if (this.y > 100) {
                this.y += this.speedY;
            }
        }
        else if (this.speedY > 0) {
            if (this.y + this.height < myGameArea.canvas.height && (this.y + this.height < obj.y || this.x + this.width < obj.x)) {
                this.y += this.speedY;
            }
        }
    }
}

class ball {
    constructor() {
        this.x = Math.floor(Math.random() * (400 - 100 + 1) + 100);
        this.y = Math.floor(Math.random() * ((lowest + 50) - lowest + 1) + lowest);
        this.radius = 8;
        var selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
            this.speedX = -3;
        }
        else {
            this.speedX = 3;
        }
        this.speedY = 3;
        this.image = new Image();
        this.image.src = "ball.png";
    }
    update() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius);
    }
    newPos() {
        if (this.speedX < 0) {
            if (this.x - this.radius <= 0) {
                this.speedX = this.speedX * (-1);
            }
        }
        else if (this.speedX > 0) {
            if (this.x + this.radius >= myGameArea.canvas.width) {
                this.speedX = this.speedX * (-1);
            }
        }
        if (this.speedY < 0) {
            if (this.y - this.radius <= 0) {
                this.speedY = this.speedY * (-1);
            }
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkHorizontalPlatform(obj) {
        if (this.speedY > 0) {
            if (this.y >= obj.y) {
                if (this.x + this.radius > obj.x && this.x < obj.x ||
                    this.x - this.radius < obj.x + obj.width && this.x > obj.x + obj.width) {
                    this.speedX = this.speedX * (-1);
                } 
            }
            else if (this.y + this.radius >= obj.y) {
                if (this.speedX < 0) {
                    this.speedX = -3;
                }
                else if (this.speedX > 0) {
                    this.speedX = 3;
                }

                if ((this.x >= obj.x && this.x <= obj.x + 0.1 * obj.width)
                    || (this.x >= obj.x + 0.9 * obj.width && this.x <= obj.x + obj.width)) {
                    this.speedX = this.speedX * 3;
                    this.speedY = this.speedY * (-1);
                }
                else if ((this.x <= obj.x + 0.3 * obj.width && this.x > obj.x + 0.1 * obj.width)
                    || (this.x >= obj.x + 0.7 * obj.width && this.x < obj.x + 0.9 * obj.width)) {
                    this.speedX = this.speedX * 2;
                    this.speedY = this.speedY * (-1);
                }
                else if ((this.x <= obj.x + 0.4 * obj.width && this.x > obj.x + 0.3 * obj.width)
                    || (this.x >= obj.x + 0.6 * obj.width && this.x < obj.x + 0.7 * obj.width)) {
                    this.speedX = this.speedX * 1.5;
                    this.speedY = this.speedY * (-1);
                }
                else if (this.x > obj.x + 0.4 * obj.width && this.x < obj.x + 0.6 * obj.width) {
                    this.speedY = this.speedY * (-1);
                }
            }
        }
    }

    checkVerticalPlatform(obj) {
        if (this.speedY > 0) {
            if (this.x < obj.x + obj.width && this.y + this.radius > obj.y && this.y < obj.y) {
                this.speedY = this.speedY * (-1);
            }
        }
        else if (this.speedY < 0) {
            if (this.x < obj.x + obj.width && this.y - this.radius < obj.y + obj.height && this.y > obj.y + obj.height) {
                this.speedY = this.speedY * (-1);
            }
        }
        if (this.speedX < 0) {
            if (this.speedY < 0) {
                this.speedY = -3;
            }
            else if (this.speedY > 0) {
                this.speedY = 3;
            }

            if (this.x - this.radius <= obj.x + obj.width) {
                if ((this.y <= obj.y + 0.1 * obj.height && this.y > obj.y)
                    || (this.y >= obj.y + 0.9 * obj.height && this.y < obj.y + obj.height)) {
                    this.speedY = this.speedY * 3;
                    this.speedX = this.speedX * (-1);
                }
                else if ((this.y <= obj.y + 0.3 * obj.height && this.y > obj.y + 0.1 * obj.height)
                    || (this.y >= obj.y + 0.7 * obj.height && this.y < obj.y + 0.9 * obj.height)) {
                    this.speedY = this.speedY * 2;
                    this.speedX = this.speedX * (-1);
                }
                else if ((this.y <= obj.y + 0.4 * obj.height && this.y > obj.y + 0.3 * obj.height)
                    || (this.y >= obj.y + 0.6 * obj.height && this.y < obj.y + 0.7 * obj.height)) {
                    this.speedY = this.speedY * 1.5;
                    this.speedX = this.speedX * (-1);
                }
                else if (this.y > obj.y + 0.4 * obj.height && this.y < obj.y + 0.6 * obj.height) {
                    this.speedX = this.speedX * (-1);
                }
            }
        }
    }

    checkCollisionTile(obj) {
        if (this.speedY < 0) {
            if ((this.y <= obj.y + obj.height && this.y >= obj.y)) {
                if (this.x + this.radius >= obj.x && this.x < obj.x ||
                    this.x - this.radius <= obj.x + obj.width && this.x > obj.x + obj.width) {
                    this.speedX *= (-1);
                    return true;
                }
            }
            else if (this.y - this.radius <= obj.y + obj.height && this.y > obj.y + obj.height
                && this.x >= obj.x && this.x <= obj.x + obj.width) {
                this.speedY *= (-1);
                return true;
            }
        }
        else if (this.speedY > 0) {
            if ((this.y <= obj.y + obj.height && this.y >= obj.y)) {
                if (this.x + this.radius >= obj.x && this.x < obj.x ||
                    this.x - this.radius <= obj.x + obj.width && this.x > obj.x + obj.width) {
                    this.speedX *= (-1);
                    return true;
                }
            }
            else if (this.y + this.radius >= obj.y && this.y < obj.y
                && this.x >= obj.x && this.x <= obj.x + obj.width) {
                this.speedY *= (-1);
                return true;
            }
        }
    }

    angle() {
        return Math.atan2(this.speedY, this.speedX);
    }

    speed() {
        return Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
    }

    checkBallCollision() {
        for (let i = 0; i < myBallArray.length; i++) {
            if (myBallArray[i] != this) {
                if (Math.sqrt((this.y - myBallArray[i].y) * (this.y - myBallArray[i].y) + (this.x - myBallArray[i].x) * (this.x - myBallArray[i].x)) <= this.radius + myBallArray[i].radius) {
                    let theta1 = this.angle();
                    let theta2 = myBallArray[i].angle();
                    let p = Math.atan2(myBallArray[i].y - this.y, myBallArray[i].x - this.x);
                    let mass1 = this.radius * this.radius * this.radius;
                    let mass2 = myBallArray[i].radius * myBallArray[i].radius * myBallArray[i].radius;
                    let velocity1 = this.speed();
                    let velocity2 = myBallArray[i].speed();

                    let speedX1New = (velocity1 * Math.cos(theta1 - p) * (mass1 - mass2) + 2 * mass2 * velocity2 * Math.cos(theta2 - p)) /
                        (mass1 + mass2) * Math.cos(p) + velocity1 * Math.sin(theta1 - p) * Math.cos(p + Math.PI / 2);
                    let speedY1New = (velocity1 * Math.cos(theta1 - p) * (mass1 - mass2) + 2 * mass2 * velocity2 * Math.cos(theta2 - p)) /
                        (mass1 + mass2) * Math.sin(p) + velocity1 * Math.sin(theta1 - p) * Math.sin(p + Math.PI / 2);
                    let speedX2New = (velocity2 * Math.cos(theta2 - p) * (mass2 - mass1) + 2 * mass1 * velocity1 * Math.cos(theta1 - p)) /
                        (mass1 + mass2) * Math.cos(p) + velocity2 * Math.sin(theta2 - p) * Math.cos(p + Math.PI / 2);
                    let speedY2New = (velocity2 * Math.cos(theta2 - p) * (mass2 - mass1) + 2 * mass1 * velocity1 * Math.cos(theta1 - p)) /
                        (mass1 + mass2) * Math.sin(p) + velocity2 * Math.sin(theta2 - p) * Math.sin(p + Math.PI / 2);

                    this.speedX = speedX1New;
                    this.speedY = speedY1New;
                    myBallArray[i].speedX = speedX2New;
                    myBallArray[i].speedY = speedY2New;
                }
            }
        }
    }

    checkForDelete() {
        if (this.speedY > 0) {
            if (this.y + this.radius > myGameArea.canvas.height) {
                return true;
            }
        }
    }
}

class tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 20;
        this.image = new Image();
        var selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
            this.type = 'A';
            this.image.src = "tileA.png"
        }
        else {
            this.type = 'B';
            this.image.src = "tileB.png"
        }
    }
    update() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    tileCollision(obj) {
        if (this.y + this.height >= obj.y && (this.x >= obj.x + obj.width || this.x + this.width <= obj.x)) {
            return true;
        }
    }
}

class bonus {
    constructor(bonusType, x, y) {
        this.image = new Image();
        if (bonusType == "x2" || bonusType == "x5") {
            this.x = x + 6;
            this.y = y + 15;
            this.width = 38;
            this.height = 20;
            if (bonusType == "x2") {
                this.image.src = "scoreX2.png";
            }
            else {
                this.image.src = "scoreX5.png";
            }
        }
        else if (bonusType == "sizePlus" || bonusType == "sizeMinus") {
            this.x = x - 10;
            this.y = y + 15;
            this.width = 70;
            this.height = 20;
            if (bonusType == "sizePlus") {
                this.image.src = "sizePlus.png";
            }
            else {
                this.image.src = "sizeMinus.png";
            }
        }
        else {
            this.x = x + 11;
            this.y = y + 15;
            this.width = 28;
            this.height = 20;
            this.image.src = "directions.png";
        }
        this.type = bonusType;
        this.speedY = 2;
    }

    update() {
        this.y += this.speedY;
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isCaught(obj) {
        if (this.y + this.height >= obj.y && (this.x + this.width >= obj.x && this.x <= obj.x + obj.width)) {
            return true;
        }
        else if (this.y > obj.y + obj.height) {
            return false;
        }
    }
}
