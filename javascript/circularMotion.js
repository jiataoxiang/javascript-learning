var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//console.log(canvas);
var context = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    });
window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

//define an object
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false, );
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    this.update = function () {
        this.draw();
    }
}


// Implementation
let particles = [];
function init() {
    particles.push(new Particle(100,100,30,'#FF0000'))
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0,0, innerWidth, innerHeight);
    particles[0].update();
}

init();
animate();