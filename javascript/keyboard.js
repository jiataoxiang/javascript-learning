let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 130;
canvas.height = window.innerHeight - 100;
console.log(canvas);
let ctx = canvas.getContext('2d');

const defaultX = 200;
const defaultY = 200;

function Ball(x,y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.isMoving = true;
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.fillStyle = 'black';
        ctx.fill();
    };
    this.move = function () {
      this.x += this.speed;
      this.draw();
    }
}

function People() {
    this.x = defaultX;
    this.y = defaultY;
    this.speed = 10;
    this.balls = [];

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 30, 30);
        ctx.rect(this.x - 10, this.y + 30, 50, 60);
        ctx.rect(this.x, this.y + 90, 10, 60);
        ctx.rect(this.x + 20, this.y + 90, 10, 60);
        ctx.fillStyle = 'black';
        ctx.fill();
    };
    this.hit = function () {
        this.balls.push(new Ball(this.x + 5, this.y -10));
        console.log(human1.balls);
    };
    this.goingLeft = function () {
        this.x -= this.speed;
        //this.draw();
    };
    this.goingRight = function () {
        this.x += this.speed;
        //this.draw();
    };
    this.goingUp = function () {
        this.y -= this.speed*5;
        // ctx.fillStyle='rgba(119,136,153,0.5)';
        // ctx.fillRect(0,0,canvas.width,canvas.height);
        // this.drawLeap();
    };
    this.goingDown = function () {
        this.y += this.speed*5;
        // this.drawLeap();
    }
}

let human1 = new People();

function Leap() {
    human1.goingUp();
    setTimeout(function () {
        human1.goingDown();
    }, 200);
}


document.onkeydown=function (event) {
    const e = event;
    if (e && e.keyCode===37) {//left
        human1.goingLeft();
    }else if (e && e.keyCode===38){ //up
        Leap();
    }else if (e && e.keyCode===39){ //right
        human1.goingRight();
    }else if (e && e.keyCode===40) {//down
        // human1.goingDown();
        human1.hit();
    }
};
function getBallIndex(array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].isMoving){
            return i;
        }
    }
    return null;
}

function animate () {
    requestAnimationFrame(animate);
    ctx.fillStyle='rgba(119,136,153,0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    human1.draw();
    human1.balls.forEach(ball => {
        if (ball.x > canvas.width - 200) {
            ball.isMoving = false;
        } else if (ball.isMoving){
            ball.move();
        }
    });
    let index = getBallIndex(human1.balls);
    if (index != null) {
        human1.balls.splice(index, index + 1);
        console.log(human1.balls);
    }
}

animate();

