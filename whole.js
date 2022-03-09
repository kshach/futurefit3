//main image
var mainImageSketch = function( mainImageSketch ) {
    const stringy = "Future Fit #3"; //words to be displayed
    const sizer = 92; //font size
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

    let intro = document.getElementById('introContainer');
    var positionInfo = intro.getBoundingClientRect();
    var introheight = positionInfo.height;
    console.log('intro height is: ' + introheight);
    var introwidth = positionInfo.width;
    console.log('intro width is: ' + introwidth);

    p5.disableFriendlyErrors = true;

    mainImageSketch.preload = function(){
        abrahamReg = mainImageSketch.loadFont('https://cdn.rawgit.com/kshach/futurefit3/main/Fonts/AbrahamTRIAL-Regular.otf');
        abrahamBlack = mainImageSketch.loadFont('https://cdn.rawgit.com/kshach/futurefit3/main/Fonts/AbrahamTRIAL-Black.otf');
      };

    mainImageSketch.setup = function() {
        // var introCanvas = createCanvas(introwidth, introheight);
        // introCanvas.parent('introContainer');

        mainImageSketch.createCanvas(introwidth, introheight);
        mainImageSketch.frameRate(30);
        x_spacing = mainImageSketch.windowHeight/4*3/cloth_particles_wide;
        backgroundColor = mainImageSketch.color('#251818');
          mainImageSketch.background(backgroundColor);
          mainImageSketch.textFont(abrahamBlack);
          mainImageSketch.textSize(sizer);
          mainImageSketch.fill(mainImageSketch.color('#94EE2D'), textAlpha);
          mainImageSketch.stroke(mainImageSketch.color('#94EE2D'), strokeAlpha);
          startingPoints = abrahamBlack.textToPoints(stringy, mainImageSketch.width/8, mainImageSketch.height/8*7, sizer, {"sampleFactor": fontSampleFactor});
          
          for (let pt = 0; pt < startingPoints.length; pt++) {
              points[pt] = startingPoints[pt];
          mouseExtra[pt] = mainImageSketch.createVector(0,0);
          }
        
        //noCursor();
         physics=new VerletPhysics2D();
        physics.addBehavior(new GravityBehavior(new Vec2D(0, gravStr)));
      
        // Set the world's bounding box (particles can't leave this box)
        physics.setWorldBounds(new Rect(0,0,mainImageSketch.width,mainImageSketch.height));
      
        for(var i = 0; i<cloth_particles_wide; i++){
      
          // 2D array
          particles[i] = [];
          // Go through each row of the ropes
          for(var j = 0; j < points.length ; j++){
            // This is where we create the particles 
            particles[i][j] = new Particle(new Vec2D(points[j].x+i*x_spacing, points[j].y));
            // And add the particle to the physics world
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
      };
  
    mainImageSketch.draw = function() {
      if(mainimgtf){
        mainImageSketch.background(backgroundColor);
        mainImageSketch.stroke(mainImageSketch.color('#94EE2D'));
         mainImageSketch.strokeWeight(1);
        physics.update();
        mainImageSketch.noFill();
        mainImageSketch.smooth();
          for (let pt = 0; pt < points.length; pt++) {
              let pz = points[pt];
              if(mainImageSketch.frameCount % 5===0)
              {
                //console.log("switching it up");
                mouseExtra[pt] = mainImageSketch.createVector(getRnd(-mouseRnd,mouseRnd), getRnd(-mouseRnd,mouseRnd));
              } 
              end = mainImageSketch.createVector(mainImageSketch.mouseX + mouseExtra[pt].x, mainImageSketch.mouseY + mouseExtra[pt].y);
              start = mainImageSketch.createVector(pz.x, pz.y);
            particles[cloth_particles_wide-1][pt].lock();
            particles[cloth_particles_wide-1][pt].x=end.x;
            particles[cloth_particles_wide-1][pt].y=end.y;
            particles[cloth_particles_wide-1][pt].unlock();
          }
             
        for(var i = 0; i < cloth_particles_wide; i++){
          for(var j = 0; j < points.length; j++){
            if(i>0){
              mainImageSketch.line(particles[i][j].x,particles[i][j].y,particles[i-1][j].x,particles[i-1][j].y);
            }
          }
        }
        mainImageSketch.push();
            mainImageSketch.fill(mainImageSketch.color('#94EE2D'));
            mainImageSketch.noStroke();
            mainImageSketch.text(stringy,  mainImageSketch.width/8, mainImageSketch.height/8*7);
          mainImageSketch.pop();}
      };
  };
  new p5(mainImageSketch, document.getElementById('introContainer'));

  //sound img
var soundImgSketch = function( soundsketch ) {
    //colors
    let bg = '#251818';
    let g = '#94EE2D';

    //init basics
    let translateByX;
    let translateByY;
    let earthPos;
    let jupPos;

    //lines
    let lines = [];
    const maxLines = 200;
    let overwriteLines = 0;
    const frameToLine =2;

    let soundimgg = document.getElementById('soundimg');
    var positionInfosound = soundimgg.getBoundingClientRect();
    var soundheight = positionInfosound.height;
    console.log('sound height is: '+soundheight);
    var soundwidth = positionInfosound.width;
    console.log('sound width is: '+soundheight);

    p5.disableFriendlyErrors = true;

    soundsketch.setup = function() {
      soundsketch.frameRate(30);
      soundsketch.createCanvas(soundwidth, soundheight);
      soundsketch.angleMode(soundsketch.DEGREES);
      translateByX = soundsketch.width /2;
      translateByY = soundsketch.height /2;
    }



    soundsketch.draw = function() {
      if(sndsketchtf){
      soundsketch.background(soundsketch.color(bg));
      
      
      soundsketch.fill(soundsketch.color(bg));
      soundsketch.stroke(soundsketch.color(g));
      //check if reached frameNum;
      if(soundsketch.frameCount%frameToLine===0)
        {
          if(lines.length<maxLines)
            {
              lines.push({
              ex: earthPos.x+translateByX,
              ey: earthPos.y+translateByY,
              jx: jupPos.x+translateByX,
              jy: jupPos.y+translateByY
              });    
            }
          else
            {
              lines[overwriteLines] =
              {
              ex: earthPos.x+translateByX,
              ey: earthPos.y+translateByY,
              jx: jupPos.x+translateByX,
              jy: jupPos.y+translateByY
              };
              overwriteLines++;
              if (overwriteLines>=maxLines)
                {
                  overwriteLines=0;
                }
            }
          
        }
      for(i=0; i < lines.length; i++)
      {
        soundsketch.line(lines[i].ex, lines[i].ey,lines[i].jx,lines[i].jy);
      }
      //earth
      soundsketch.push();
      soundsketch.translate(translateByX, translateByY);
      earthPos = soundsketch.createVector(0,0);
      earthPos.set(50,50).rotate(soundsketch.frameCount*8);
      soundsketch.ellipse(earthPos.x,earthPos.y, 10, 10);
      soundsketch.pop();
      
      //jupiter
      soundsketch.push();
      soundsketch.translate(translateByX, translateByY);
      jupPos = soundsketch.createVector(0,0);
      jupPos.set(soundsketch.abs(soundsketch.winMouseX -soundsketch.width/2), soundsketch.abs(soundsketch.winMouseX -soundsketch.width/2)).rotate(soundsketch.frameCount);
      soundsketch.ellipse(jupPos.x,jupPos.y, 20, 20);
      soundsketch.pop();
      soundsketch.ellipse(soundsketch.width/2,soundsketch.height/2,100,100);}
    }


    soundsketch.mousePressed = function() {
      overwriteLines = 0;
      lines = [];
  }
}
new p5(soundImgSketch, document.getElementById('soundimg'));

//noising sketch etextile
var noisingSketch = function( etexS ) {
  const wid = 40;
  const hei = 40;
  const theOne = 50;
  const noiseScale = 15;
  let rotExp = 5;
  let margin;
  
  let xjump;
  let yjump;
  let t = 0;
  let inter = 0.01;
  
  
  let img2 = document.getElementById('eteximg');
  var positionInfoetex = img2.getBoundingClientRect();
  var introheightetex = positionInfoetex.height;
  console.log('etex height is: '+introheightetex);
  var introwidthetex = positionInfoetex.width;
  console.log('etex width is: '+introwidthetex);
  
  p5.disableFriendlyErrors = true;

   etexS.setup = function() {
    etexS.frameRate(30);
    margin = etexS.width/2;
    etexS.createCanvas(introwidthetex, introheightetex, etexS.WEBGL);
    xjump = (etexS.width-margin*2) / theOne;
    yjump = (etexS.height-margin*2) / theOne;
    etexS.strokeWeight(1);
    etexS.stroke(etexS.color('#94EE2D'));
  }
  
  etexS.draw = function() {
    if(etexsketchtf){
    etexS.scale(0.5,0.5,0.5);
    if(0<etexS.mouseX<etexS.width&&0<etexS.mouseY<etexS.height){
      etexS.translate(etexS.mouseX-etexS.width/2, etexS.mouseY-etexS.height/2,-etexS.mouseX-etexS.mouseY);
      etexS.rotateY(etexS.mouseX/100);
      etexS.rotateX(etexS.mouseY/100);
    }
    
    etexS.background(etexS.color('#251818'));
    etexS.noFill();
    for(let hi = 0; hi< theOne; hi++){
      etexS.smooth();
      let y = -margin*2+yjump*hi/2;
      etexS.beginShape();
      for(i = 0; i < theOne; i++){
        etexS.rotateY(etexS.frameCount*i/1000000);
        etexS.rotateX(etexS.frameCount*i/1000000);
        etexS.vertex(-margin*2+xjump*i,
        y+noiseScale*etexS.noise(xjump*i,y, t),noiseScale*etexS.noise(xjump*i, y, t))
      }
      etexS.endShape();
    }
    t+=inter;
  }
  
 }
}
new p5(noisingSketch, document.getElementById('eteximg'));

//iot falling attractors sketch
var fallingAttractorsSketch = function( iotAttrct ) 
{
let num_particles;
const stiff = 0.01;
const ellipseSize = 8;

var physics; 
var particles = []; 

let iotimgg = document.getElementById('iotimg');
var positionInfoiot = iotimgg.getBoundingClientRect();
var iotheight = positionInfoiot.height;
console.log('iot height is: '+iotheight);
var iotwidth = positionInfoiot.width;
console.log('iot width is: '+iotwidth);

p5.disableFriendlyErrors = true;

iotAttrct.setup = function() {
  iotAttrct.createCanvas(iotwidth, iotheight);
  physics=new VerletPhysics2D();
  physics.setDrag(0.08);
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.05)));
  num_particles = iotAttrct.width/10;
  // Set the world's bounding box (particles can't leave this box)
  physics.setWorldBounds(new Rect(0,-0.5*iotAttrct.height,iotAttrct.width,iotAttrct.height*2+20));
  
  for(var i = 0; i < num_particles; i++){
    // this is how we create a 2D array
    particles[i] = []; 

    // Go through each row of the cloth..
    for(let j = 0; j < 2 ; j++){
      // This is where we create the particles 
      particles[i][j] = new Particle(new Vec2D(getRnd(0,iotAttrct.width), getRnd(-0.5*iotAttrct.height, 0)));
      
      // And add the particle to the physics world
      physics.addParticle(particles[i][j]);
      physics.addBehavior(new   AttractionBehavior(particles[i][j], iotAttrct.height/8, -0.8, 0.5));
    }
    physics.addSpring(new VerletSpring2D(particles[i][0],particles[i][1],iotAttrct.height/5, stiff));
  }
}



iotAttrct.draw = function() {
  if(iotimgtf){
  iotAttrct.background(iotAttrct.color('#251818'));
  physics.update();
  iotAttrct.stroke(iotAttrct.color('#94EE2D'));
  
  for (let i = 0; i< particles.length;i++)
    {
      
      if(particles[i][0].y > iotAttrct.height+ellipseSize && particles[i][1].y > iotAttrct.height+ellipseSize
        ){
           particles[i][0].y -=iotAttrct.height*1.5;
           particles[i][1].y -=iotAttrct.height*1.5;
         }
      
      iotAttrct.line(particles[i][0].x, particles[i][0].y, particles[i][1].x, particles[i][1].y);
      iotAttrct.push();
        iotAttrct.fill(iotAttrct.color('#251818'));
        iotAttrct.ellipse(particles[i][0].x, particles[i][0].y, 8, 8);
        iotAttrct.ellipse(particles[i][1].x, particles[i][1].y, 8, 8);
      iotAttrct.pop();
    }}
}

iotAttrct.mousePressed = function(){
  mousePos = new Vec2D(iotAttrct.mouseX, iotAttrct.mouseY);
  mouseAttractor = new AttractionBehavior(mousePos, iotAttrct.height, 3);
  physics.addBehavior(mouseAttractor);
}

iotAttrct.mouseDragged = function(){
  mousePos.set(iotAttrct.mouseX, iotAttrct.mouseY);
}

iotAttrct.mouseReleased = function (){
  physics.removeBehavior(mouseAttractor);
}}
new p5(fallingAttractorsSketch, document.getElementById('iotimg'));

//etree
var etreeSketch = function( etreeskch ){
let goalRange;
const fr = 60;

let step = 0.25;
let interStep;
let amount = 0;
let split = 5;
let splitGoalVectors = [];
let splitCounter = 0;


let etreebounding = document.getElementById('eteximg');
  var positionInfoetree = etreebounding.getBoundingClientRect();
  var introheightetree = positionInfoetree.height;
  console.log('etex height is: '+introheightetree);
  var introwidthetree = positionInfoetree.width;
  console.log('etex width is: '+introwidthetree);

  p5.disableFriendlyErrors = true;

etreeskch.setup = function(){
  etreeskch.frameRate(30);
  etreeskch.createCanvas( introwidthetree, introheightetree);
  splitGoalVectors[0] = [];
  splitGoalVectors[0][0] = etreeskch.createVector(0, etreeskch.height / 2);
  calculateSplitGoals(etreeskch.width/2, etreeskch.height/2);
  interStep= step;
  goalRange = etreeskch.width/etreeskch.height*35;
  etreeskch.stroke(etreeskch.color('#94EE2D'));
  etreeskch.background(etreeskch.color('#251818'));
}

etreeskch.draw = function() {
  if(emotionimgtf){
  if(etreeskch.frameCount%(fr)==0)
    {
      updatePos();
    }
  // drawing and lerping
	if(amount<1&&splitCounter < split){
	amount += interStep;
      
      // if(splitCounter<splits)
      for(i = 0;  i < splitGoalVectors[splitCounter].length; i++){
        for(j = i*2;  j < i*2+2; j++){
          let l = p5.Vector.lerp(splitGoalVectors[splitCounter][i], splitGoalVectors[splitCounter+1][j], amount);
          etreeskch.line(splitGoalVectors[splitCounter][i].x, splitGoalVectors[splitCounter][i].y, l.x,l.y);	
          	
	  }
    }
	}else if (splitCounter < split) {
    amount = 0;
	splitCounter++;
      interStep -= step/split;
	}}
}

function updatePos()
{  
  etreeskch.clear();
  etreeskch.background(etreeskch.color('#251818'));
  amount=0;
  interStep = step;
  splitCounter = 0;
  calculateSplitGoals(etreeskch.winMouseX, etreeskch.winMouseY);
}

//calculating splits and points
function calculateSplitGoals(goalX, goalY){

  let yjump = (goalY-etreeskch.height/2)/split;
  for(let i = 0; i < split; i++){
      splitGoalVectors[i+1] = [];
        for(let j = 0; j<splitGoalVectors[i].length*2;j++){
	      splitGoalVectors[i+1][j] = etreeskch.createVector(
           (splitGoalVectors[i][0].x + goalX/split)+ getRnd(-goalRange*i, goalRange*i),
          splitGoalVectors[i][i%2].y+yjump*i + getRnd(-goalRange*i, goalRange*i)
          );
}
        
    
  }
}
}
new p5(etreeSketch, document.getElementById('emotionimg'));


//recraft ele
var recraftEleSketch = function( elesketch )
{
//broken objs
let breaks = [];
const numOfPartic = 75;
const particMin = 35;
const particMax = 500;
let particlesLocations = [];

let zero;
let t = 0;

//whole obj
let unbroken;

let rnd1;
let rnd2;
let rnd3;

let breakss = document.getElementById('breaksimg');
var positionInfobreaks = breakss.getBoundingClientRect();
var breaksheight = positionInfobreaks.height;
console.log('recraft breaks height is: '+breaksheight);
var breakswidth = positionInfobreaks.width;
console.log('recraft breaks is: '+breakswidth);

elesketch.preload=function () {
  for(let i = 0; i < 20; i++){
    breaks[i] = elesketch.loadModel('https://cdn.rawgit.com/kshach/futurefit3/main/objs/break'+(i+1)+'.obj');
  }
  //unbroken
  unbroken = elesketch.loadModel('https://cdn.rawgit.com/kshach/futurefit3/main/objs/unbroken.obj');
}

p5.disableFriendlyErrors = true;

 elesketch.setup = function() {
  elesketch.frameRate(30);
 elesketch.createCanvas(breakswidth, breaksheight, elesketch.WEBGL);

  elesketch.angleMode(elesketch.DEGREES);
  rnd1 = getRnd(-5,5);
  rnd2 = getRnd(-5,5);
  rnd3 = getRnd(-5,5);
  elesketch.stroke(elesketch.color('#94EE2D'));
  elesketch.strokeWeight(1.5);
  elesketch.fill(elesketch.color('#251818'));
  for(let i = 0;i<numOfPartic;i++){
    particlesLocations[i] =
      elesketch.createVector(findRndLocation(),findRndLocation(),findRndLocation());
  }
  zero = elesketch.createVector(0,0,0);
}

function findRndLocation(){
  let rndNum = 0;
    while(rndNum < particMin && rndNum > -particMin){
      rndNum = getRnd(-particMax, particMax);
    }
    return rndNum;
  }


elesketch.draw = function() {
  if(breaksimgtf){
  elesketch.background(elesketch.color('#251818'));
  elesketch.rotateY(-elesketch.frameCount/2);
  elesketch.scale(elesketch.map(elesketch.mouseY,0,elesketch.height,1.1,1),elesketch.map(elesketch.mouseY,0,elesketch.height,1.25,1),elesketch.map(elesketch.mouseY,0,elesketch.height,1.1,1));
  if(elesketch.mouseX<=100) elesketch.model(unbroken);
  else if(elesketch.mouseX>100) brokenUpdate();
  for(let i = 0; i< particlesLocations.length;i++){
    let thisParticDist = zero.dist(particlesLocations[i]);
        thisParticDist = particMax/thisParticDist;
    let lerpPartic = p5.Vector.lerp(zero, particlesLocations[i], 1+t*thisParticDist);
    elesketch.push();
      elesketch.translate(lerpPartic);
      elesketch.sphere(1,1,1);
    elesketch.pop();
  }}
}

function brokenUpdate(){
  t = elesketch.map(elesketch.mouseX,100,elesketch.width,0,1);
  let zero = elesketch.createVector(0,0,0);
  if(elesketch.frameCount%4==0){
  rnd1 = getRnd(-5,5);
  rnd2 = getRnd(-5,5);
  rnd3 = getRnd(-5,5);
  elesketch.translate(t*rnd1,t*rnd2,t*rnd3);
  }
  //1
  elesketch.push();
   let break1 = elesketch.createVector(-50,-20,400)
   let b1goal = p5.Vector.lerp(zero, break1, t);
   elesketch.rotateX(t*15);
   elesketch.translate(b1goal);
   elesketch.model(breaks[0]);
   elesketch.pop();
  //2
  elesketch.push();
   let break2 = elesketch.createVector(-63+rnd1,-150+rnd3,300+rnd1);
   let b2goal = p5.Vector.lerp(zero, break2, t);
   elesketch.rotateY(t*-5);
   elesketch.rotateZ(t*-45);
   elesketch.translate(b2goal);
   elesketch.model(breaks[1]);
  elesketch.pop();
  //3
  elesketch.push();
   let break3 = elesketch.createVector(150+rnd2,100+rnd1,340+rnd3);
   let b3goal = p5.Vector.lerp(zero, break3, t);
   elesketch.rotateY(t*-1.2);
   elesketch.rotateZ(t*-10);
   elesketch.translate(b3goal);
   elesketch.model(breaks[2]);
  elesketch.pop();
  //4
  elesketch.push();
   let break4 = elesketch.createVector(-360+rnd2,0+rnd1,0+rnd1);
   let b4goal = p5.Vector.lerp(zero, break4, t);
   elesketch.rotateY(t*-1.2);
   elesketch.rotateX(t*-100);
   elesketch.translate(b4goal);
   elesketch.model(breaks[3]);
  elesketch.pop();
  //5
  elesketch.push();
   let break5 = elesketch.createVector(-10+rnd3,300+rnd2,0+rnd1);
   let b5goal = p5.Vector.lerp(zero, break5, t);
   elesketch.rotateY(t*-100);
   elesketch.rotateX(t*-1.4);
   elesketch.translate(b5goal);
   elesketch.model(breaks[4]);
  elesketch.pop();
  //6
  elesketch.push();
   let break6 = elesketch.createVector(-3+rnd1,-70+rnd2,300+rnd3);
   let b6goal = p5.Vector.lerp(zero, break6, t);
   elesketch.rotateZ(t*45);
   elesketch.rotateX(t*-1.4);
   elesketch.rotateY(t*1.3);
   elesketch.translate(b6goal);
   elesketch.model(breaks[5]);
  elesketch.pop();
  //7
  elesketch.push();
   let break7 = elesketch.createVector(-3+rnd2,-53+rnd1,-300+rnd2);
   let b7goal = p5.Vector.lerp(zero, break7, t);
   elesketch.rotateZ(t*-50);
   //rotateX(t*1.2);
   elesketch.rotateY(t*14);
   elesketch.translate(b7goal);
   elesketch.model(breaks[6]);
 elesketch.pop();
  //8
  elesketch.push();
   let break8 = elesketch.createVector(-400+rnd1,-78+rnd3,-100+rnd2);
   let b8goal = p5.Vector.lerp(zero, break8, t);
   elesketch.rotateX(t*-50);
   //rotateX(t*1.2);
   elesketch.rotateY(t*14);
   elesketch.translate(b8goal);
   elesketch.model(breaks[7]);
  elesketch.pop();
  //9
  elesketch.push();
   let break9 = elesketch.createVector(-60+rnd2,33+rnd1,400+rnd3);
   let b9goal = p5.Vector.lerp(zero, break9, t);
   elesketch.rotateZ(t*22);
   //rotateX(t*1.2);
   elesketch.rotateY(t*-2);
   elesketch.translate(b9goal);
   elesketch.model(breaks[8]);
  elesketch.pop();
  //10
  elesketch.push();
   let break10 = elesketch.createVector(300+rnd3,300+rnd3,13+rnd3);
   let b10goal = p5.Vector.lerp(zero, break10, t);
   elesketch.rotateX(t*-30);
   //rotateX(t*1.2);
   elesketch.rotateZ(t*-1.2);
   elesketch.translate(b10goal);
   elesketch.model(breaks[9]);
  elesketch.pop();
  //11
  elesketch.push();
   let break11 = elesketch.createVector(-2+rnd1,-350+rnd3,-14+rnd2);
   let b11goal = p5.Vector.lerp(zero, break11, t);
   elesketch.rotateY(t*-144);
   //rotateX(t*1.2);
   elesketch.rotateX(t*-1.2);
   elesketch.translate(b11goal);
   elesketch.model(breaks[10]);
  elesketch.pop();
  //12
  elesketch.push();
   let break12 = elesketch.createVector(350+rnd2,-100+rnd2,6+rnd2);
   let b12goal = p5.Vector.lerp(zero, break12, t);
   elesketch.rotateX(t*-81);
   //rotateX(t*1.2);
   elesketch.rotateZ(t*-1.2);
   elesketch.translate(b12goal);
   elesketch.model(breaks[11]);
  elesketch.pop();
  //13
  elesketch.push();
   let break13 = elesketch.createVector(-247+rnd2,208+rnd2,-140+rnd1);
   let b13goal = p5.Vector.lerp(zero, break13, t);
   elesketch.rotateZ(t*-18);
   //rotateX(t*1.2);
   elesketch.rotateX(t*-7);
   elesketch.translate(b13goal);
   elesketch.model(breaks[12]);
  elesketch.pop();
  //14
  elesketch.push();
   let break14 = elesketch.createVector(84+rnd1,-26+rnd2,361+rnd3);
   let b14goal = p5.Vector.lerp(zero, break14, t);
   elesketch.rotateZ(t*-18);
   //rotateX(t*1.2);
   elesketch.rotateX(t*-7);
   elesketch.translate(b14goal);
   elesketch.model(breaks[13]);
  elesketch.pop();
  //15
  elesketch.push();
   let break15 = elesketch.createVector(-377+rnd3,-26+rnd2,-60+rnd3);
   let b15goal = p5.Vector.lerp(zero, break15, t);
   // rotateZ(t*-18);
   //rotateY(t*1.2);
   elesketch.rotateX(t*66);
   elesketch.translate(b15goal);
   elesketch.model(breaks[14]);
  elesketch.pop();
  //16
  elesketch.push();
   let break16 = elesketch.createVector(189+rnd1,110+rnd1,-279+rnd2);
   let b16goal = p5.Vector.lerp(zero, break16, t);
   elesketch.rotateZ(t*-24);
   //rotateY(t*1.2);
   // rotateX(t*66);
   elesketch.translate(b16goal);
   elesketch.model(breaks[15]);
  elesketch.pop();
  //17
  elesketch.push();
   let break17 = elesketch.createVector(144+rnd3,180+rnd1,-132+rnd3);
   let b17goal = p5.Vector.lerp(zero, break17, t);
   elesketch.rotateZ(t*14);
   elesketch.rotateY(t*4);
   // rotateX(t*66);
   elesketch.translate(b17goal);
   elesketch.model(breaks[16]);
  elesketch.pop();
  //18
  elesketch.push();
   let break18 = elesketch.createVector(-21+rnd2,-224+rnd2,-166+rnd2);
   let b18goal = p5.Vector.lerp(zero, break18, t);
   elesketch.rotateZ(t*-2.2);
   elesketch.rotateY(t*32);
   elesketch.rotateX(t*-4);
   elesketch.translate(b18goal);
   elesketch.model(breaks[17]);
  elesketch.pop();
  //19
  elesketch.push();
   let break19 = elesketch.createVector(-146+rnd2,93+rnd2,-312+rnd2);
   let b19goal = p5.Vector.lerp(zero, break19, t);
   elesketch.rotateZ(t*-8);
   // rotateY(t*32);
   elesketch.rotateX(t*2);
   elesketch.translate(b19goal);
   elesketch.model(breaks[18]);
  elesketch.pop();
  //20
  elesketch.push();
   let break20 = elesketch.createVector(146+rnd2,-212+rnd2,-112+rnd2);
   let b20goal = p5.Vector.lerp(zero, break20, t);
   elesketch.rotateZ(t*2);
   elesketch.rotateY(t*21);
   elesketch.rotateX(t*-4);
   elesketch.translate(b20goal);
   elesketch.model(breaks[19]);
  elesketch.pop();
  }
}
new p5(recraftEleSketch, document.getElementById('breaksimg'));

//auto draw
var autodrawSketch = function( autosk ){
  let xScales = [0];
  let xRots = [];
   let thisScale = 0;
  let totalLength;
  let kababs;
  const bgcol= '#251818';
  const greencol = '#94EE2D';
  const whiteCol = '#F0ECF4';
  
  let drawimg = document.getElementById('autodrawimg');
  var positionInfodraw = drawimg.getBoundingClientRect();
  var drawheight = positionInfodraw.height;
  console.log('draw height is: '+ drawheight);
  var drawwidth = positionInfodraw.width;
  console.log('draw width is: '+ drawwidth);
  
  p5.disableFriendlyErrors = true;

  autosk.setup = function() {
    autosk.frameRate(30);
    autosk.createCanvas(drawwidth, drawheight, autosk.WEBGL);
    autosk.background(autosk.color('#251818'));
    autosk.push();
    autosk.angleMode(autosk.RADIANS);
    autosk.perspective(autosk.PI / 8, autosk.width / autosk.height, 0.1, 1500);
      autosk.pop();
        kababs = autosk.round(2+autosk.width/40);
    // console.log("num of kababs "+kababs);
    for(let i = 0; i< kababs; i++){
      xRots[i] = getRnd(-1,1);
    }
    autosk.angleMode(autosk.DEGREES);
    }
    autosk.draw = function() {
      if(autodrawimgtf){
      autosk.background(autosk.color(bgcol));
      autosk.rotateY(-90);
      autosk.noFill();
      autosk.stroke(autosk.color(greencol))
      kababs = autosk.round(autosk.map(autosk.mouseX,0, autosk.width, 2,autosk.width/40));
      totalLength = 0;
      for(let i = 0; i< xScales.length; i++){
        totalLength+=xScales[i];
      }
      autosk.translate(-totalLength/2 -300,0,0);
      autosk.rotateX(autosk.map(autosk.mouseX, 0, autosk.width,5,-5));
      autosk.rotateZ(autosk.map(autosk.mouseY, 0, autosk.height,1,-1));
      for (let i = 0; i < kababs; i++) {
      autosk.push();
              autosk.noiseDetail(2, 0.2);
              xScales[i] = -autosk.noise(i*100+autosk.mouseX/300,autosk.height/2,0)*300;
              thisScale = 0;
              for (let d = i; d > 0; d--) {
                 thisScale += xScales[d];
              }
              autosk.translate(thisScale - (xScales[i]/2-i) ,0,0);
              let weight = 1-(i/(kababs*i+1));
              autosk.strokeWeight(weight);
              let yScale = autosk.height/8+(msin(i*10+autosk.frameCount)*10);
              let zScale = autosk.height/8+(msin(30+i*10+autosk.frameCount)*10);
              autosk.rotateX(-i*5+autosk.frameCount/kababs-i);
              autosk.box(xScales[i], yScale, zScale,1,1);   
        autosk.pop();
      }
      }
  }
  
}
new p5(autodrawSketch, document.getElementById('autodrawimg'));

//scan img
var scanImgSketch = function( scnimage ){

  const howmany = 12;
  let yspacing = 50;
  let minifier = 0.4;
  
  
  let rotdivivder;
  let facingRot;
  let m = true;
  
  p5.disableFriendlyErrors = true;
  
  scnimage.setup = function() {
    scnimage.frameRate(30);
    scnimage.createCanvas(scnimage.windowWidth, scnimage.windowWidth, scnimage.WEBGL);
    
    scnimage.angleMode(scnimage.DEGREES);
    rotdivider = 360/howmany;
    facingRot = 90/howmany;
    scnimage.ortho(-scnimage.width / 2, scnimage.width / 2, scnimage.height / 2, -scnimage.height / 2, 1500, -1500);
    let d = msin(270);
  }
  
  scnimage.draw = function() {
    if(scanimgtf){
    scnimage.background(scnimage.color('#251818'));
    scnimage.noFill();
    
    scnimage.strokeWeight(1);
    scnimage.stroke(scnimage.color('#94EE2D'));
    
    yspacing = scnimage.map(scnimage.mouseY, 0, scnimage.height, -scnimage.height/10, scnimage.height/10);
    facingRot = scnimage.map(scnimage.mouseY, 0, scnimage.height, 90, -90)/howmany;
    scnimage.orbitControl();
    minifier = 0.4-scnimage.abs(scnimage.map(scnimage.mouseX,0,scnimage.width,-0.1,0.1))
    scnimage.scale(minifier);
    scnimage.push();
      scnimage.fill(scnimage.color('#251818'));
      scnimage.strokeWeight(2.5);
      scnimage.sphere(50,5,5);
    scnimage.pop();
  
    scnimage.rotateY(scnimage.frameCount/5);
    scnimage.translate(0,(yspacing*-howmany)/2, 0);
    for(let j = 0; j< howmany/2;j++){
      scnimage.rotateZ(scnimage.map(scnimage.mouseX,0,scnimage.width,-45,45));
      
      for(let i = 0; i< howmany;i++){
        scnimage.rotateY(rotdivider);
      scnimage.push();
        scnimage.translate(300, i*yspacing, 0);
        scnimage.rotateZ(-90+facingRot*msin(scnimage.map(i,0,howmany,90,270))*5);   
        scnimage.rotateY(45);
        scnimage.cone(50,100,5,1, false);
      scnimage.pop();
      }
    }
    m = false;
    }}
  }
  new p5(scanImgSketch, document.getElementById('scanimg'));

//td sketch
var tdSketch = function(touchskch)
{
const wormHoleloops = 15;
const loopDist = 10;
const loopBaseSize = 50;

let mousePos;

let tdImg = document.getElementById('touchDimg');
var tDpositionInfo = tdImg.getBoundingClientRect();
var tdheight = tDpositionInfo.height;
console.log('wormhole height is: '+tdheight);
var tdwidth = tDpositionInfo.width;
console.log('wormhole width is: '+tdwidth);

p5.disableFriendlyErrors = true;

touchskch.setup = function() {
  touchskch.frameRate(30);
touchskch.createCanvas(tdwidth, tdheight, touchskch.WEBGL);
touchskch.angleMode(touchskch.DEGREES);
}

touchskch.draw = function() {
  if(touchdimgdtf){
  touchskch.background(touchskch.color('#251818'));
  touchskch.stroke(touchskch.color('#94EE2D'));
  touchskch.noFill();
  //rotate around
  touchskch.rotateY(touchskch.frameCount/2);
  touchskch.rotateX(45+msin(touchskch.frameCount/2)*45);
  //calc the mosue x pos
  mousePos = touchskch.map(touchskch.mouseX, 0, touchskch.width, 0, 720);
  //arcs going in
  for(let i = 0; i< wormHoleloops; i++){
  touchskch.push();
    touchskch.rotateY(360/wormHoleloops*i);
    let wid = loopBaseSize*2.2;
    let hei = loopDist*wormHoleloops*1.2;
    let place = wid / 2;
    touchskch.arc(place, 0, wid, hei, 0+mousePos*-2, 15+mousePos*-2);
    touchskch.arc(place, 0, wid, hei, 20+mousePos*-2, 35+mousePos*-2);
    touchskch.arc(place, 0, wid, hei, 40+mousePos*-2, 55+mousePos*-2);
    touchskch.arc(place, 0, wid, hei, 60+mousePos*-2, 75+mousePos*-2);
    touchskch.arc(place, 0, wid, hei, 80+mousePos*-2, 95+mousePos*-2);
  touchskch.pop();}
  
  //worm hole moving
    for(let i = 0; i< wormHoleloops; i++)
      {
      touchskch.push();
        touchskch.translate(0,-loopDist*wormHoleloops/2,0);
          let scaler = 0.05 +  touchskch.abs(msin(touchskch.map(i,0,wormHoleloops-1,90,270)))*2  * (msin(i*2+mousePos))*2;
        //console.log(scaler);
        touchskch.scale(scaler, 1, scaler);
        touchskch.translate(0, loopDist*i, 0);
        touchskch.rotateX(90);
        touchskch.ellipse(0,0, loopBaseSize,loopBaseSize);
      touchskch.pop();
      }}
}
}
new p5(tdSketch, document.getElementById('touchDimg'));