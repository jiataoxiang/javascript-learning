let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 130;
canvas.height = window.innerHeight - 100;
console.log(canvas);
let ctx = canvas.getContext('2d');

const defaultX = 200;
const defaultY = 200;

function People() {
    this.x = defaultX;
    this.y = defaultY;
    this.speed = 20;

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 30, 30);
        ctx.rect(this.x - 10, this.y + 30, 50, 60);
        ctx.rect(this.x, this.y + 90, 10, 60);
        ctx.rect(this.x + 20, this.y + 90, 10, 60);
        ctx.fillStyle = 'black';
        ctx.fill();
    };
    this.goingLeft = function () {
        this.x -= this.speed;
    };
    this.goingRight = function () {
        this.x += this.speed;
    };
    this.goingUp = function () {
        this.y -= this.speed;
    };
    this.goingDown = function () {
        this.y += this.speed;
    }
}

let human1 = new People();

document.onkeydown=function (event) {
    const e = event;
    if (e && e.keyCode===37) {//left
        human1.goingLeft();
    }else if (e && e.keyCode===38){ //up
        human1.goingUp();
        // animateLeap();
    }else if (e && e.keyCode===39){ //right
        human1.goingRight();
    }else if (e && e.keyCode===40) {//down
        human1.goingDown();
    }
};
// function animateLeap() {
//     requestAnimationFrame(animate);
//     let i;
//     for( i = 0; i < 20; i ++) {
//         ctx.fillStyle='rgba(119,136,153,0.5)';
//         ctx.fillRect(0,0,canvas.width,canvas.height);
//         human1.goingUp();
//         human1.draw();
//     }
//     console.log("(my x: " + human1.x + ", my y: " + human1.y + ")");
//     for(i = 0; i < 20; i ++) {
//         ctx.fillStyle='rgba(119,136,153,0.5)';
//         ctx.fillRect(0,0,canvas.width,canvas.height);
//         human1.goingDown();
//         human1.draw();
//     }
//     console.log("(my x: " + human1.x + ", my y: " + human1.y + ")");
// }
function animate () {
    requestAnimationFrame(animate);
    ctx.fillStyle='rgba(119,136,153,0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    human1.draw();
}

animate();

