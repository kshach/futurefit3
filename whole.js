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

    mainImageSketch.preload = function(){
        abrahamReg = mainImageSketch.loadFont('https://cdn.rawgit.com/kshach/futurefit3/main/Fonts/AbrahamTRIAL-Regular.otf');
        abrahamBlack = mainImageSketch.loadFont('https://cdn.rawgit.com/kshach/futurefit3/main/Fonts/AbrahamTRIAL-Black.otf');
      };

    mainImageSketch.setup = function() {
        // var introCanvas = createCanvas(introwidth, introheight);
        // introCanvas.parent('introContainer');
        mainImageSketch.createCanvas(introwidth, introheight);
        x_spacing = mainImageSketch.windowHeight/4*3/cloth_particles_wide;
        backgroundColor = mainImageSketch.color('#251818');
          mainImageSketch.background(backgroundColor);
          mainImageSketch.textFont(abrahamBlack);
          mainImageSketch.textSize(sizer);
          mainImageSketch.fill(mainImageSketch.color('#94EE2D'), textAlpha);
          mainImageSketch.stroke(mainImageSketch.color('#94EE2D'), strokeAlpha);
        //frameRate(25);
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
                mouseExtra[pt] = mainImageSketch.createVector(mainImageSketch.random(-mouseRnd,mouseRnd), mainImageSketch.random(-mouseRnd,mouseRnd));
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
          mainImageSketch.pop();
      };
  };
//   var p5sk;
// window.onload = () => {
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



    soundsketch.setup = function() {
      soundsketch.createCanvas(soundwidth, soundheight);
      soundsketch.angleMode(soundsketch.DEGREES);
      translateByX = soundsketch.width /2;
      translateByY = soundsketch.height /2;
    }



    soundsketch.draw = function() {
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
      soundsketch.ellipse(soundsketch.width/2,soundsketch.height/2,100,100);
    }


    soundsketch.mousePressed = function() {
      overwriteLines = 0;
      lines = [];
  }
}
new p5(soundImgSketch, document.getElementById('soundimg'));

var soundImgSketch = function( p ) {

}
new p5(soundImgSketch, document.getElementById('soundimg'));
