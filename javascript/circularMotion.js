let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//console.log(canvas);
let context = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined
};

const colors = [
    '#00bdff',
    '#4d39ce',
    '#088eff',
];

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

function randIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randColor() {
    return colors[Math.floor(Math.random()*colors.length)];
}

//define an object
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distFromCenter = randIntFromRange(50,120);

    this.update = function () {
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        //Move points over time
        this.radians += this.velocity;
        this.x = x + Math.cos(this.radians) * this.distFromCenter;
        this.y = y + Math.sin(this.radians) * this.distFromCenter;
        this.draw(lastPoint);
    };

    this.draw = lastPoint => {
        context.beginPath();
        // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // context.fillStyle = this.color;
        // context.fill();
        context.strokeStyle = this.color;
        context.lineWidth = this.radius;
        context.moveTo(lastPoint.x, lastPoint.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }
}


// Implementation
let particles = [];
function init() {
    particles = [];
    //particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, 'blue'));
    for (let i = 0; i < 50 ; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(innerWidth / 2, innerHeight / 2, radius, randColor()));
    }
}

function animate() {
    requestAnimationFrame(animate);
    //context.clearRect(0, 0, innerWidth, innerHeight);
    context.fillStyle = 'rgba(255,255,255,0.05)';
    context.fillRect(0,0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}
init();
animate();