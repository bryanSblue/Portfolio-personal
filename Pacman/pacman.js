class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction_right;
        this.currentFrame = 1;
        this.frameCount = 7;

        setInterval(() => {
            this.changeAnimation();
        }, 100);
    }

    moveProcess() {
        this.changeDirectionIfPosible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
        }
    }

    eat() {

    }

    moveBackwards() {
        switch(this.direction) {
            case direction_right:
                this.x -= this.speed;
                break;
            case direction_up:
                this.y += this.speed;
                break;
            case direction_left:
                this.x += this.speed;
                break;
            case direction_bottom:
                this.y -= this.speed;
                break;
        }
    }

    moveForwards() {
        switch(this.direction) {
            case direction_right:
                this.x += this.speed;
                break;
            case direction_up:
                this.y -= this.speed;
                break;
            case direction_left:
                this.x -= this.speed;
                break;
            case direction_bottom:
                this.y += this.speed;
                break;
        }
    }

    checkCollision() {
        let isCollided = false;
        if (mapa[this.getMapY()][this.getMapX()] == 1 ||
            mapa[this.getMapYRightSide()][this.getMapX()] == 1 ||
            mapa[this.getMapY()][this.getMapXRightSide] == 1 ||
            mapa[this.getMapYRightSide()][this.getMapXRightSide] == 1) {
                return true;
        }
        return isCollided;
    }

    checkGhostCollision() {

    }

    changeDirectionIfPosible() {

    }

    changeAnimation() {
        if (this.currentFrame == this.frameCount) {
            this.currentFrame == 1;
        } else {
            this.currentframe + 1;
        }
    }

    draw() {
        canvasContext.save();
        canvasContext.translate(this.x + oneBlockSize / 2, this.y + oneBlockSize / 2);
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
        canvasContext.translate(-this.x - oneBlockSize / 2, -this.y - oneBlockSize / 2);
        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    getMapX() {
        return parseInt(this.x / oneBlockSize);
    }

    getMapY() { 
        return parseInt(this.y / oneBlockSize);
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize);
    }

    getMapYRightSide() {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize);
    }
 }