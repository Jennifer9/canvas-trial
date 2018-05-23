console.log('start!!');
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.fillStyle = "blue";

// c.fillStyle = 'rgba(255, 0, 0, 0.1)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 90, 60, 0.5)';
// c.fillRect(200, 300, 100, 100);
// c.fillRect(300, 600, 50, 100);
// c.fillStyle = 'rgba(100, 90, 60, 0.5)';
// c.fillRect(400, 500, 100, 100);
//
// console.log(canvas);

//lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "rgba(30,208,59,1)";
// c.stroke();

//arc/circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (var i = 0; i < 10; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue"
//   c.stroke();
//
// }
var mouse = {
  x: undefined,
  y: undefined
}

var maxRad = 40;
//var minRad = 2;

var colorArray = [
  '#7C5AD1',
  '#AB90F0',
  '#F5C293',
  '#FAE8C3',
  '#EDEDED'
];

window.addEventListener('mousemove',
function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function Circle(x, y, dx, dy, radius) { //capitalize to indicate its an object
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRad = radius;
  this.color = this.color;

  this.draw = function() {
    //draw the Circle
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
    c.fill();
    // c.strokeStyle = 'blue';
    // c.stroke();
  }

  this.update = function() {

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
      //bound back;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
      //bound back;
    }

    this.x += this.dx;  //speed;
    this.y += this.dy;


    //interactivity
    //get dis
   if ( mouse.x - this.x < 50 && mouse.x - this.x > -50
     && mouse.y - this.y < 50 && mouse.y - this.y > -50
   ) {
     if (this.radius < maxRad) {
       this.radius += 1;
     }
    }
    else if (this.radius > this.minRad){
      this.radius -= 1;
    }
    this.draw();
  }
}




var circleArray = [];

//math.random give from 0 to 1

function init() {
 circleArray = [];

  for (var i = 0; i < 800; i++) { //gen circles
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius; //random position
    var dx = (Math.random() - 0.5);  //-0.5 to 0.5
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
