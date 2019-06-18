let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');

let letters = "abcdefghijklmnopqrstuvwxyz";
letters = letters.split("");

var frameSize = 20;
var columns = canvas.width / frameSize;

//initialize
var drops = [];
for(var i = 0; i < columns; i++) {
    drops[i] = 1;
}
//console.log(drops);

function draw() {
    // context.clearRect(0,0, innerWidth, innerHeight);
    context.fillStyle = "rgba(0,0,0,0,0.5)";
    context.clearRect(0,0, canvas.width, canvas.height);

    context.fillStyle = "#0f0";
    context.font = frameSize + "px arial";
    for(var i = 0; i < drops.length; i++) {
        console.log(drops);
        var text = letters[Math.floor(Math.random() * letters.length)];
        //console.log(text);
        context.fillText(text, i * frameSize, drops[i] * frameSize);
        // console.log("my current x is " + i*frameSize + " my current height is " + drops[i] * frameSize);
        drops[i]++;
        if(drops[i] * frameSize > canvas.height && Math.random() > 0.9) {
            drops[i] = 1;
        }
    }
}

window.setInterval(draw, 50);