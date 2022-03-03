let num_particles;
const stiff = 0.01;
const ellipseSize = 8;

var physics; 
var particles = []; 

let iotimgg = document.getElementById('iotimg');
var positionInfoiot = iotimgg.getBoundingClientRect();
var iotheight = positionInfo.height;
console.log('elment height is: '+iotheight);
var iotwidth = positionInfo.width;
console.log('elment width is: '+iotwidth);

function setup() {
  var myCanvas = createCanvas(iotwidth, iotheight);
  myCanvas.parent('introContainer');
  physics=new VerletPhysics2D();
  physics.setDrag(0.08);
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.05)));
  num_particles = width/10;
  // Set the world's bounding box (particles can't leave this box)
  physics.setWorldBounds(new Rect(0,-0.5*height,width,height*2+20));
  
  for(var i = 0; i < num_particles; i++){
    // this is how we create a 2D array
    particles[i] = []; 

    // Go through each row of the cloth..
    for(let j = 0; j < 2 ; j++){
      // This is where we create the particles 
      particles[i][j] = new Particle(new Vec2D(random(0,width), random(-0.5*height, 0)));
      
      // And add the particle to the physics world
      physics.addParticle(particles[i][j]);
      physics.addBehavior(new   AttractionBehavior(particles[i][j], height/8, -0.8, 0.5));
    }
    physics.addSpring(new VerletSpring2D(particles[i][0],particles[i][1],height/5, stiff));
  }
}



function draw() {
  background(color('#251818'));
  physics.update();
  stroke(color('#94EE2D'));
  
  for (let i = 0; i< particles.length;i++)
    {
      
      if(particles[i][0].y > height+ellipseSize && particles[i][1].y > height+ellipseSize
        ){
           particles[i][0].y -=height*1.5;
           particles[i][1].y -=height*1.5;
         }
      
      line(particles[i][0].x, particles[i][0].y, particles[i][1].x, particles[i][1].y);
      push();
        fill(color('#251818'));
        ellipse(particles[i][0].x, particles[i][0].y, 8, 8);
        ellipse(particles[i][1].x, particles[i][1].y, 8, 8);
      pop();
    }
}

function mousePressed(){
  mousePos = new Vec2D(mouseX, mouseY);
  mouseAttractor = new AttractionBehavior(mousePos, height, 3);
  physics.addBehavior(mouseAttractor);
}

function mouseDragged(){
  mousePos.set(mouseX, mouseY);
}

function mouseReleased(){
  physics.removeBehavior(mouseAttractor);
}
