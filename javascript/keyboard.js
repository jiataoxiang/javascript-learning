let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 130;
canvas.height = window.innerHeight - 100;
console.log(canvas);
let ctx = canvas.getContext('2d');


const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';

// function Wall() {
//
// }
const directions = [LEFT, RIGHT, UP, DOWN];

function ballTouchWall(Ball) {
    if ((300 <= Ball.x && Ball.x <= 330) || (0 <= Ball.y && Ball.y <= 400)) {
        return true;
    }else if ((800 <= Ball.x && Ball.x <= 830) || (300 <= Ball.y && Ball.y <= canvas.height)) {
        return true;
    }else if ((300 <= Ball.x && Ball.x <= 1000) || (200 <= Ball.y && Ball.y <= 230)) {
        return true;
    }else if ((1000 <= Ball.x && Ball.x <= 1200) || (400 <= Ball.y && Ball.y <= 430)) {
        return true;
    }else if ((200 <= Ball.x && Ball.x <= 600) || (400 <= Ball.y && Ball.y <= 430)) {
        return true;
    }
    return false;
}

function Ball(x,y,direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 5;
    this.isMoving = true;
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.fillStyle = 'black';
        ctx.fill();
    };

    this.move = function () {
        if(this.direction === UP){
            this.y -= this.speed;
        }else if (this.direction === DOWN) {
            this.y += this.speed;
        }else if (this.direction === RIGHT) {
            this.x += this.speed;
        }else if (this.direction === LEFT) {
            this.x -= this.speed;
        }
        this.draw();
    }
}

function DrawBackGround() {
    ctx.beginPath();
    ctx.fillRect(0, 0, 100, canvas.height); //left pillar
    ctx.fillRect(canvas.width - 100, 0, 100, canvas.height); //right pillar
    ctx.fillRect(0, 0, canvas.width, 100); //up pillar
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100); // bottom pillar
    //blocks
    ctx.fillRect(300, 0, 30, 400);
    ctx.fillRect(800, 300, 30, canvas.height - 300);
    ctx.fillRect(300, 200, 700, 30);
    ctx.fillRect(1000, 400, 200, 30);
    ctx.fillRect(200, 400, 400, 30);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function tankTouchWall(Tank) {
    if ((300 <= Tank.x && Tank.x <= 330) || (0 <= Tank.y && Tank.y <= 400)) {
        return true;
    }else if ((800 <= Tank.x && Tank.x <= 830) || (300 <= Tank.y && Tank.y <= canvas.height)) {
        return true;
    }else if ((300 <= Tank.x && Tank.x <= 1000) || (200 <= Tank.y && Tank.y <= 230)) {
        return true;
    }else if ((1000 <= Tank.x && Tank.x <= 1200) || (400 <= Tank.y && Tank.y <= 430)) {
        return true;
    }else if ((200 <= Tank.x && Tank.x <= 600) || (400 <= Tank.y && Tank.y <= 430)) {
        return true;
    }
    return false;
}


function Tank(robot) {
    this.x = 100 + Math.random() * (canvas.width - 240);
    this.y = 100 + Math.random() * (canvas.height - 240);
    if (robot) {
        this.speed = 1;
        this.color = 'black';
    }else {
        this.speed = 10;
        this.color = 'blue';
    }
    this.balls = [];
    this.direction = directions[Math.floor(Math.random() * 3)];

    this.draw = function () {
        ctx.beginPath();
        if(this.direction === UP){
            ctx.rect(this.x, this.y, 30, 30);
            ctx.rect(this.x + 10, this.y - 10, 10, 10);
        }else if (this.direction === DOWN) {
            ctx.rect(this.x, this.y, 30, 30);
            ctx.rect(this.x + 10, this.y + 30, 10, 10);
        }else if (this.direction === RIGHT) {
            ctx.rect(this.x, this.y, 30, 30);
            ctx.rect(this.x + 30, this.y + 10, 10, 10);
        }else if (this.direction === LEFT) {
            ctx.rect(this.x, this.y, 30, 30);
            ctx.rect(this.x - 10, this.y + 10, 10, 10);
        }
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    this.hit = function () {
        this.balls.push(new Ball(this.x + 10, this.y + 10, this.direction));
        console.log(Tank1.balls);
    };
    this.goingLeft = function () {
        this.x -= this.speed;
        this.direction = LEFT;
        //this.draw();
    };
    this.goingRight = function () {
        this.x += this.speed;
        this.direction = RIGHT;
        //this.draw();
    };
    this.goingUp = function () {
        this.y -= this.speed;
        this.direction = UP;
        // ctx.fillStyle='rgba(119,136,153,0.5)';
        // ctx.fillRect(0,0,canvas.width,canvas.height);
        // this.drawLeap();
    };
    this.goingDown = function () {
        this.y += this.speed;
        this.direction = DOWN;
        // this.drawLeap();
    };
    this.randomMove = function () {
        const val = Math.random();
        if(Math.random() > 0.995) {
            this.hit();
        }
        if(this.direction === LEFT && this.x < 110) {
            if (val < 0.5) {
                this.goingRight();
            } else {
                this.goingUp();
            }
        } else if (this.direction === RIGHT && this.x > canvas.width - 140) {
            if (val < 0.5) {
                this.goingUp();
            } else {
                this.goingDown();
            }
        } else if (this.direction === UP && this.y < 110) {
            if (val < 0.5) {
                this.goingLeft();
            }else {
                this.goingRight();
            }
        } else if (this.direction === DOWN && this.y > canvas.height - 140) {
            if (val < 0.5) {
                this.goingLeft();
            }else {
                this.goingRight();
            }
        } else {
            if(this.direction === UP) {
                    this.goingUp();
                }else if(this.direction === DOWN) {
                    this.goingDown();
                }else if (this.direction === LEFT) {
                    this.goingLeft();
                }else{
                    this.goingRight();
                }
        }
    };
}

let Tank1 = new Tank(false);

let AITtanks = [];

function init() {
    for(var i=0; i < 5; i++) {
        AITtanks.push(new Tank(true));
    }
}


document.onkeydown=function (event) {
    const e = event;
    if (e && e.keyCode===37) {//left
        Tank1.goingLeft();
    } else if (e && e.keyCode===38){ //up
        // Leap();
        Tank1.goingUp();
    } else if (e && e.keyCode===39){ //right
        Tank1.goingRight();
    } else if (e && e.keyCode===40) {//down
        Tank1.goingDown();
        // Tank1.hit();
    } else if (e && e.keyCode=== 32) {//space hit
        Tank1.hit();
    }
};
//get index from ball array.
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
    DrawBackGround();
    ctx.fillStyle='rgba(119,136,153,0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    Tank1.draw();
    Tank1.balls.forEach(ball => {
        if (ball.x >= canvas.width - 110 || ball.x <= 100 || ball.y <= 100 || ball.y >= canvas.height - 110) {
            ball.isMoving = false;
        } else if (ball.isMoving){
            ball.move();
        }
    });
    let index = getBallIndex(Tank1.balls);
    if (index != null) {
        Tank1.balls.splice(index, index + 1);
        //console.log(Tank1.balls);
    }
    AITtanks.forEach(tank => {
        tank.randomMove();
        let index = getBallIndex(tank.balls);
        if (index != null) {
            tank.balls.splice(index, index + 1);
        }
        tank.draw();
        tank.balls.forEach(ball => {
            if (ball.x >= canvas.width - 110 || ball.x <= 100 || ball.y <= 100 || ball.y >= canvas.height - 110) {
                ball.isMoving = false;
            } else if (ball.isMoving){
                ball.move();
            }
        });
    });
}
init();
animate();

