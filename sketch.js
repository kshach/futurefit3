const string = "Future Fit #3"; //words to be displayed
const size = 92; //font size
const showText = true; //whether or not to have an overlay of the original text (in the background color)
const textAlpha = 255; //the alpha of the text if displayed (low value will make it slowly fade in)
const strokeAlpha = 20; //the alpha of the lines (lower numbers are more transparent)
const strokeColor = '#EFA89B'; //the line color

const fontSampleFactor = 0.02; //How many points there are: the higher the number, the closer together they are (more detail)

// These set how many particles wide and tall the cloth is:
var cloth_particles_wide = 20;
var cloth_particles_tall = 1;

// These set the width and height of the cloth (in pixels):
var cloth_width = 300;
var cloth_height = 300;

var stiffness = 1; //spring stiffness
var gravStr = 2;
//***********************************************************

var physics; 
var particles = []; // this will become a 2D array that will store all the particles

// var x_spacing = cloth_width/cloth_particles_wide;
var x_spacing = cloth_width/cloth_particles_wide;
var y_spacing = cloth_height/cloth_particles_tall;

var i0 = cloth_particles_wide-1;
var j0 = cloth_particles_tall-1;

var mouseRnd = 10;

let start;
let end;

var points = [];
var mouseExtra = [];
var startingPoints;

let abrahamReg;
let abrahamBlack;
function preload() {
  abrahamReg = loadFont('https://cdn.statically.io/gh/kshach/futurefit5/77f87b14759547a81c2ac71d8843805ed3696332/Fonts/AbrahamTRIAL-Regular.otf');
  abrahamBlack = loadFont('https://cdn.statically.io/gh/kshach/futurefit5/f040c02eecbed106645d15421f731d4150b7a2c3/Fonts/AbrahamTRIAL-Black.otf');
}

// const capturer = new CCapture({
//   framerate: 60,
//   format: "png",
//   name: "movie",
//   quality: 100,
//   verbose: true,
// });

function setup() {
  cnv = createCanvas(0.8*windowHeight, windowHeight);
  x_spacing = windowHeight/4*3/cloth_particles_wide;
  backgroundColor = color('#251818');
	background(backgroundColor);
	textFont(abrahamBlack);
	textSize(size);
	fill(color('#94EE2D'), textAlpha);
	stroke(color('#94EE2D'), strokeAlpha);
  //frameRate(25);
	startingPoints = abrahamBlack.textToPoints(string, width/8, height/8*7, size, {"sampleFactor": fontSampleFactor});
    
	for (let p = 0; p < startingPoints.length; p++) {
		points[p] = startingPoints[p];
    mouseExtra[p] = createVector(0,0);
	}
  
  noCursor();
   physics=new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, gravStr)));

  // Set the world's bounding box (particles can't leave this box)
  physics.setWorldBounds(new Rect(0,0,width,height));

  for(var i = 0; i<cloth_particles_wide; i++){

    // this is how we create a 2D array
    particles[i] = []; 

    // Go through each row of the cloth..
    for(var j = 0; j < points.length ; j++){
    
      // This is where we create the particles 
      particles[i][j] = new Particle(new Vec2D(points[j].x+i*x_spacing, points[j].y));
      //particles[i0][j0].lock(); 
      // And add the particle to the physics workd
      physics.addParticle(particles[i][j]);

    }
  }
    
  // Go through each column of the cloth..
  for(var i = 0; i<cloth_particles_wide; i++){
    
    // Go through each row of the cloth..
    for(var j = 0; j<points.length; j++){
      particles[0][j].lock();
      if(i>0){
        // then make a spring connecting this particle (i,j) to the particle to its left (i-1,j)
        physics.addSpring(new VerletSpring2D(particles[i][j],particles[i-1][j],x_spacing,stiffness));
      }
    }
  }
}

function draw() {


background(backgroundColor);
    stroke(color('#94EE2D'));
	strokeWeight(1);

 // if (frameCount === 1) capturer.start();
    
      
  physics.update();
  noFill();
  smooth();
	for (let pt = 0; pt < points.length; pt++) {
        let p = points[pt];
        if(frameCount % 5===0)
        {
          console.log("switching it up");
          mouseExtra[pt] = createVector(random(-mouseRnd,mouseRnd), random(-mouseRnd,mouseRnd));
        } 
        //end = createVector(mouseX + mouseExtra[pt].x, mouseY + mouseExtra[pt].y);
        end = createVector(width/10*9+sin(frameCount/20)*50 + mouseExtra[pt].x, height/10*4 + mouseExtra[pt].y);
        start = createVector(p.x, p.y);
      // cloth_width = start.dist(end);
      // x_spacing = cloth_width/cloth_particles_wide;
      particles[cloth_particles_wide-1][pt].lock();
      particles[cloth_particles_wide-1][pt].x=end.x;
      particles[cloth_particles_wide-1][pt].y=end.y;
      particles[cloth_particles_wide-1][pt].unlock();
    }
       
  for(var i = 0; i < cloth_particles_wide; i++){
    for(var j = 0; j < points.length; j++){
      if(i>0){
        // then make a spring connecting this particle (i,j) to the particle to its left (i-1,j)
        
        line(particles[i][j].x,particles[i][j].y,particles[i-1][j].x,particles[i-1][j].y);
      }
    }
  }
  push();
	    //noFill();
      fill(color('#94EE2D'));
      noStroke();
      //stroke('#EFA89B');
      //strokeWeight(2);
	  text("Future Fit #3",  width/8, height/8*7);
    pop();

   // capturer.capture(cnv.canvas);
}

function mousePressed() {
    noLoop();
    capturer.stop();
    capturer.save();
}

