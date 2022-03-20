  //Code and p5js sketches were written by Shachar Kantor, shachar.kantor@gmail.com

  //#region p5sketches
  //get if this is desktop
  let desktop;
      if(window.innerWidth>991) {desktop = true; console.log("desktop true");}
      else {desktop = false; console.log("desktop false");}
  //main image
  var mainImageSketch = function(mainImageSketch) {
      
      const stringy = "Future Fit #3"; //words to be displayed
      let sizer = 92; //font size
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

      let abrahamBlack;
      let intro;
      
    

      p5.disableFriendlyErrors = true;

      mainImageSketch.preload = function(){
          abrahamReg = mainImageSketch.loadFont('https://cdn.rawgit.com/kshach/futurefit3/main/Fonts/AbrahamTRIAL-Regular.otf');
          abrahamBlack = mainImageSketch.loadFont('https://cdn.rawgit.com/kshach/futurefit3/main/Fonts/AbrahamTRIAL-Black.otf');
        };

        mainImageSketch.windowResized = function(){
          // mainImageSketch.resizeCanvas(mainImageSketch.windowWidth, mainImageSketch.windowHeight);
          introSetup();
        }

      mainImageSketch.setup = function() {
        introSetup();
        };
    function introSetup(){
        if(desktop) {intro = document.getElementById('introContainer');}
        else{intro = document.getElementById('introContainer-mobile');}
        var positionInfo = intro.getBoundingClientRect();
        var introheight = positionInfo.height;
        // console.log('intro height is: ' + introheight);
        var introwidth = positionInfo.width;
        // console.log('intro width is: ' + introwidth);
          mainImageSketch.createCanvas(introwidth, introheight);
          mainImageSketch.frameRate(30);
          document.addEventListener('maintrigger', () => {
            if(mainimgtf) mainImageSketch.loop();
            else mainImageSketch.noLoop();
          });
          if(!desktop) {
            sizer = 92 * (mainImageSketch.width/mainImageSketch.height);
            cloth_width = 150;
            x_spacing = mainImageSketch.windowHeight/4*2/cloth_particles_wide;
        } else x_spacing = mainImageSketch.windowHeight/4*3/cloth_particles_wide;
          
          backgroundColor = mainImageSketch.color('#251818');
            mainImageSketch.background(backgroundColor);
            mainImageSketch.textFont(abrahamBlack);
            
            mainImageSketch.fill(mainImageSketch.color('#94EE2D'), textAlpha);
            mainImageSketch.stroke(mainImageSketch.color('#94EE2D'), strokeAlpha);
            
          startingPoints = abrahamBlack.textToPoints(stringy, mainImageSketch.width/8, mainImageSketch.height/8*7, sizer, {"sampleFactor": fontSampleFactor});
          mainImageSketch.textSize(sizer);
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
              particles[i][j] = new Particle(new Vec2D(points[j].x+i*x_spacing, points[j].y));
              // And add the particle to the physics world
              physics.addParticle(particles[i][j]);
        
            }
          }
            
          for(var i = 0; i<cloth_particles_wide; i++){
            
            for(var j = 0; j<points.length; j++){
              particles[0][j].lock();
              if(i>0){
                physics.addSpring(new VerletSpring2D(particles[i][j],particles[i-1][j],x_spacing,stiffness));
              }
            }
          }
    }
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
                end = mainImageSketch.createVector(mainImageSketch.winMouseX + mouseExtra[pt].x, mainImageSketch.winMouseY + mouseExtra[pt].y);
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
    if(desktop) new p5(mainImageSketch, document.getElementById('introContainer'));
    else new p5(mainImageSketch, document.getElementById('introContainer-mobile'));
    
  //sound img
  var soundImgSketch = function(soundsketch) {
      
    //colors
  let bg = '#251818';
  let g = '#94EE2D';

  //init basics
  let translateByX;
  let translateByY;
  let earthPos;
  let jupPos;
  let rotScale;
  let mousePosPlanetary;
  //lines
  let lines = [];
  const maxLines = 180;
  let overwriteLines = 0;
  const frameToLine = 2;
  // let soundimgg;
  // if(desktop){ soundimgg = document.getElementById('soundimg');}
  // else{ soundimgg = document.getElementById('soundimg-mobile');}
  //     var positionInfosound = soundimgg.getBoundingClientRect();
  //     var soundheight = positionInfosound.height;
  //     console.log('sound height is: '+soundheight);
  //     var soundwidth = positionInfosound.width;
  //     console.log('sound width is: '+soundheight);

      p5.disableFriendlyErrors = true;


      soundsketch.windowResized = function(){
        soundsketch.resizeCanvas(soundsketch.windowWidth, soundsketch.windowHeight);
      }
  soundsketch.setup = function() {
    
    soundsketch.createCanvas(soundsketch.windowWidth, soundsketch.windowHeight);
    soundsketch.angleMode(soundsketch.DEGREES);
    soundsketch.frameRate(30);
    document.addEventListener('sndtrigger', () => {
      if(sndsketchtf) soundsketch.loop();
      else soundsketch.noLoop();
    });
    translateByX = soundsketch.width /2;
    translateByY = soundsketch.height /2;
    mousePosPlanetry = soundsketch.width/2;
  }



  soundsketch.draw = function() {
    //fit for screens
    if(soundsketch.width>500){translateByX = soundsketch.width/3;
                  translateByY = soundsketch.height / 2;
                  soundsketch.strokeWeight(1.5);
                }
    else {
      soundsketch.scale(0.5);
      translateByX = soundsketch.width;
      // translateByY = soundsketch.height / 2*3;
      translateByY = soundsketch.height*1.25;
      soundsketch.strokeWeight(2);
    }
    if(soundsketch.winMouseX>0) mousePosPlanetry = soundsketch.winMouseX;
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
    jupPos.set(soundsketch.abs(soundsketch.map(mousePosPlanetry,0,soundsketch.width,60,translateByX-80)), soundsketch.abs(soundsketch.map(mousePosPlanetry,0,soundsketch.width,60,translateByX-80))).rotate(soundsketch.frameCount);
    soundsketch.ellipse(jupPos.x,jupPos.y, 20, 20);
    soundsketch.pop();
    soundsketch.ellipse(translateByX,translateByY,100,100);
  }
  }
  if(desktop) new p5(soundImgSketch, document.getElementById('soundimg'));
  else new p5(soundImgSketch, document.getElementById('soundimg-mobile'));

  //noising sketch etextile
  var noisingSketch = function(etexS) {
    const wid = 40;
    const hei = 40;
    const theOne = 50;
    const noiseScale = 15;
    let rotExp = 5;
    let margin;
    
    //colors
    const bg = '#251818';
    const green = '#94EE2D'
    
    let xjump;
    let yjump;
    let t = 0;
    let inter = 0.01;
    // let img2;
    // if(desktop) {img2 = document.getElementById('eteximg');}
    // else {img2 = document.getElementById('etexsketch-mobile');}
    // var positionInfoetex = img2.getBoundingClientRect();
    // var introheightetex = positionInfoetex.height;
    // console.log('etex height is: '+introheightetex);
    // var introwidthetex = positionInfoetex.width;
    // console.log('etex width is: '+introwidthetex);
    
    p5.disableFriendlyErrors = true;

    etexS.windowResized = function(){
      etexS.resizeCanvas(etexS.windowWidth, etexS.windowHeight);
    }
    
    etexS.setup = function() {
      margin = etexS.width/2;
      etexS.createCanvas(etexS.windowWidth, etexS.windowHeight, etexS.WEBGL);

      document.addEventListener('etextrigger', () => {
        if(etexsketchtf) etexS.loop();
        else etexS.noLoop();
      });
      etexS.frameRate(30);
      xjump = (etexS.width-margin*2) / theOne;
      if(etexS.width<500) xjump *=3;
      yjump = (etexS.height-margin*2) / theOne;
      etexS.strokeWeight(1.5);
      etexS.stroke(etexS.color(green));
      etexS.ortho(-etexS.width / 2, etexS.width / 2, etexS.height / 2, -etexS.height / 2, 6000, -6000);
    }
    
    etexS.draw = function() {
      //fit for screens
      if(etexS.width>500){ etexS.translate(-etexS.width/6,0,0);
      etexS.scale(0.8)
                }
    
    else {
      etexS.scale(0.45);
      etexS.translate(0,-etexS.height/6,0);
    }
    etexS.scale(msin(etexS.frameCount / 60)*0.1+0.3,0.4,0.4);
    if(0<etexS.winMouseX<etexS.width&&0<etexS.mouseY<etexS.height){
      //etexS.translate((etexS.winMouseX-etexS.width/2)/2, (etexS.winMouseY-etexS.height/2)/2,0);
      etexS.rotateY(etexS.map(etexS.winMouseX,0,etexS.width,-3,3));
      etexS.rotateX(etexS.map(etexS.winMouseY,0,etexS.height,-3,3));
    }
      etexS.background(etexS.color(bg));
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
  if(desktop)new p5(noisingSketch, document.getElementById('eteximg'));
  else new p5(noisingSketch, document.getElementById('etexsketch-mobile'));

  //iot falling attractors sketch
  var fallingAttractorsSketch = function(iotAttrct) 
  {
    let num_particles;
    const stiffness = 0.01;
    const ellipseSize = 8;
    
    var physics; 
    var particles = [];
    
    let wasPressed = false;
  let pressCounter = 0;

  p5.disableFriendlyErrors = true;

  iotAttrct.windowResized = function(){
    iotAttrct.resizeCanvas(iotAttrct.windowWidth, iotAttrct.windowHeight);
  }

  iotAttrct.setup = function() {
    iotAttrct.createCanvas(iotAttrct.windowWidth, iotAttrct.windowHeight);

    document.addEventListener('iotevent', () => {
      if(iotimgtf) iotAttrct.loop();
      else iotAttrct.noLoop();
    });
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
          physics.addBehavior(new   AttractionBehavior(particles[i][j], iotAttrct.height/8, -0.3, 0.5));
        }
        physics.addSpring(new VerletSpring2D(particles[i][0],particles[i][1],iotAttrct.sqrt(iotAttrct.width)*4, stiffness));
      }
    }
    
    
    
    iotAttrct.draw = function() {
        if(wasPressed && iotAttrct.width < 991) {
          pressCounter++;
          if(pressCounter>=iotAttrct.frameRate()*1.5) releaser();
        }
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
        }
    }
    
    iotAttrct.mousePressed = function(){
      wasPressed=true;
      if(iotAttrct.winMouseX > 0 && iotAttrct.winMouseX< iotAttrct.width&&iotAttrct.winMouseY>0&&iotAttrct.winMouseY<iotAttrct.height)
      {mousePos = new Vec2D(iotAttrct.winMouseX, iotAttrct.winMouseY);
      mouseAttractor = new AttractionBehavior(mousePos, iotAttrct.height, 3);
      physics.addBehavior(mouseAttractor);}
    }
    
    iotAttrct.mouseDragged = function(){
      wasPressed = true;
      if(iotAttrct.winMouseX > 0 && iotAttrct.winMouseX< iotAttrct.width&&iotAttrct.winMouseY>0&&iotAttrct.winMouseY<iotAttrct.height) mousePos.set(iotAttrct.winMouseX, iotAttrct.winMouseY);
    }
    
    iotAttrct.mouseReleased = function(){
      releaser();
    }
    function releaser(){
      wasPressed = false;
      pressCounter = 0;
      physics.removeBehavior(mouseAttractor);
    }
  }
  if(desktop){new p5(fallingAttractorsSketch, document.getElementById('iotimg'));}
  else new p5(fallingAttractorsSketch, document.getElementById('iotSketch-mobile'));

  //etree
  var etreeSketch = function(etreeskch){

    let goalRange;
  const fr = 30;

  let step = 0.6;
  let interStep;
  let amount = 0;
  let split = 5;
  let splitGoalVectors = [];
  let splitCounter = 0;
  let mouseVec;
  let bptranslateby=0;

    p5.disableFriendlyErrors = true;

    etreeskch.windowResized = function(){
      etreeskch.resizeCanvas(etreeskch.windowWidth, etreeskch.windowHeight);
    }

  etreeskch.setup = function(){
    etreeSetup();
  }
  function etreeSetup() {
    let etreecnv = etreeskch.createCanvas(etreeskch.windowWidth, etreeskch.windowHeight);

    document.addEventListener('emotiontrigger', () => {
      if (emotionimgtf)
        etreeskch.loop();
      else
        etreeskch.noLoop();
    });
    etreeskch.frameRate(fr);
    etreecnvbounds = etreecnv.elt.getBoundingClientRect();
    splitGoalVectors[0] = [];
    splitGoalVectors[0][0] = etreeskch.createVector(0, etreeskch.height / 2);
    interStep = fr * step;
    goalRange = etreeskch.width / etreeskch.height * 10;
    etreeskch.stroke(etreeskch.color('#94EE2D'));
    etreeskch.background(etreeskch.color('#251818'));
    mouseVec = etreeskch.createVector(etreeskch.width / 2, etreeskch.height / 2);
    updatePos(mouseVec);
  }

  etreeskch.draw = function() {
    if(etreeskch.width<500){bptranslateby= etreeskch.height/2;  etreeskch.translate(0,bptranslateby,0); etreeskch.scale(0.5);}
    
    if( etreeskch.frameCount%(fr)==0)
          {
            updatePos(mouseVec);
          }
    
    if( etreeskch.winMouseX > etreecnvbounds.left &&
      etreeskch.winMouseX < etreecnvbounds.right &&
      etreeskch.winMouseY > etreecnvbounds.top &&
      etreeskch.winMouseY < etreecnvbounds.bottom) {
      mouseVec = etreeskch.createVector(etreeskch.winMouseX, etreeskch.winMouseY);
      }
    
    // drawing and lerping
    if(amount<1&&splitCounter < split){
    amount += interStep;

        for(i = 0;  i < splitGoalVectors[splitCounter].length; i++){
          for(j = i*2;  j < i*2+2; j++){
            let l = p5.Vector.lerp(splitGoalVectors[splitCounter][i], splitGoalVectors[splitCounter+1][j], amount);
            etreeskch.line(splitGoalVectors[splitCounter][i].x, splitGoalVectors[splitCounter][i].y, l.x,l.y);
      }
      }
    }else if (splitCounter < split) {
      amount = 0;
    splitCounter++;
        interStep -= step / split;
    }
  }

  function updatePos(upVector)
  { 
    if( etreeskch.frameCount%(fr*4)==0){
      etreeskch.clear();
    etreeskch.background( etreeskch.color('#251818'));  
    }

    amount=0;
    lineCounter = 0;
    interStep = step;
    splitCounter = 0;
    calculateSplitGoals(upVector.x, upVector.y);
  }

  //calculating splits and points
  function calculateSplitGoals(goalX, goalY){

    let yjump = (goalY-( etreeskch.height+bptranslateby)/2)/split;
    for(let i = 0; i < split; i++){
        splitGoalVectors[i+1] = [];
          for(let j = 0; j<splitGoalVectors[i].length*2;j++){
          splitGoalVectors[i+1][j] =  etreeskch.createVector(
            (splitGoalVectors[i][0].x + goalX/split)+ getRnd(-goalRange*i, goalRange*i),
            splitGoalVectors[i][i%2].y+yjump*i + getRnd(-goalRange*i, goalRange*i)
            );
  }
    }
  }


  }
  if(desktop) new p5(etreeSketch, document.getElementById('emotionimg'));
  else new p5(etreeSketch, document.getElementById('emotion-mobile'));

  //recraft ele
  var recraftEleSketch = function(elesketch)
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

  elesketch.windowResized = function(){
    elesketch.resizeCanvas(elesketch.windowWidth, elesketch.windowHeight);
  }


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
  elesketch.createCanvas(elesketch.windowWidth, elesketch.windowHeight, elesketch.WEBGL);

  document.addEventListener('breakstrigger', () => {
    if(breaksimgtf) elesketch.loop();
    else elesketch.noLoop();
  });

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
    //fit for screens
    if(elesketch.width>500) elesketch.translate(-elesketch.width/6,0,0);
    else {
      elesketch.scale(0.6);
      elesketch.translate(0,elesketch.height/6,0);
    }
    elesketch.background(elesketch.color('#251818'));
    elesketch.rotateY(-elesketch.frameCount/2);
    elesketch.scale(elesketch.map(elesketch.winMouseY,0,elesketch.height,1.1,1),elesketch.map(elesketch.winMouseY,0,elesketch.height,1.25,1),elesketch.map(elesketch.winMouseY,0,elesketch.height,1.1,1));
    if(elesketch.winMouseX<=100) elesketch.model(unbroken);
    else if(elesketch.winMouseX>100) brokenUpdate();
    for(let i = 0; i< particlesLocations.length;i++){
      let thisParticDist = zero.dist(particlesLocations[i]);
          thisParticDist = particMax/thisParticDist;
      let lerpPartic = p5.Vector.lerp(zero, particlesLocations[i], 1+t*thisParticDist);
      elesketch.push();
      elesketch.translate(lerpPartic);
      elesketch.sphere(1,1,1);
      elesketch.pop();
    }
    
  }

  function brokenUpdate(){
    t = elesketch.map(elesketch.winMouseX,100,elesketch.width,0,1);
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
    //elesketch.rotateX(t*1.2);
    elesketch.rotateY(t*14);
    elesketch.translate(b7goal);
    elesketch.model(breaks[6]);
    elesketch.pop();
    //8
    elesketch.push();
    let break8 = elesketch.createVector(-400+rnd1,-78+rnd3,-100+rnd2);
    let b8goal = p5.Vector.lerp(zero, break8, t);
    elesketch.rotateX(t*-50);
    //elesketch.rotateX(t*1.2);
    elesketch.rotateY(t*14);
    elesketch.translate(b8goal);
    elesketch.model(breaks[7]);
    elesketch.pop();
    //9
    elesketch.push();
    let break9 = elesketch.createVector(-60+rnd2,33+rnd1,400+rnd3);
    let b9goal = p5.Vector.lerp(zero, break9, t);
    elesketch.rotateZ(t*22);
    //elesketch.rotateX(t*1.2);
    elesketch.rotateY(t*-2);
    elesketch.translate(b9goal);
    elesketch.model(breaks[8]);
    elesketch.pop();
    //10
    elesketch.push();
    let break10 = elesketch.createVector(300+rnd3,300+rnd3,13+rnd3);
    let b10goal = p5.Vector.lerp(zero, break10, t);
    elesketch.rotateX(t*-30);
    //elesketch.rotateX(t*1.2);
    elesketch.rotateZ(t*-1.2);
    elesketch.translate(b10goal);
    elesketch.model(breaks[9]);
    elesketch.pop();
    //11
    elesketch.push();
    let break11 = elesketch.createVector(-2+rnd1,-350+rnd3,-14+rnd2);
    let b11goal = p5.Vector.lerp(zero, break11, t);
    elesketch.rotateY(t*-144);
    //elesketch.rotateX(t*1.2);
    elesketch.rotateX(t*-1.2);
    elesketch.translate(b11goal);
    elesketch.model(breaks[10]);
    elesketch.pop();
    //12
    elesketch.push();
    let break12 = elesketch.createVector(350+rnd2,-100+rnd2,6+rnd2);
    let b12goal = p5.Vector.lerp(zero, break12, t);
    elesketch.rotateX(t*-81);
    //elesketch.rotateX(t*1.2);
      elesketch.rotateZ(t*-1.2);
    elesketch.translate(b12goal);
    elesketch.model(breaks[11]);
    elesketch.pop();
    //13
    elesketch.push();
    let break13 = elesketch.createVector(-247+rnd2,208+rnd2,-140+rnd1);
    let b13goal = p5.Vector.lerp(zero, break13, t);
    elesketch.rotateZ(t*-18);
    //elesketch.rotateX(t*1.2);
      elesketch.rotateX(t*-7);
    elesketch.translate(b13goal);
    elesketch.model(breaks[12]);
    elesketch.pop();
    //14
    elesketch.push();
    let break14 = elesketch.createVector(84+rnd1,-26+rnd2,361+rnd3);
    let b14goal = p5.Vector.lerp(zero, break14, t);
    elesketch.rotateZ(t*-18);
    //elesketch.rotateX(t*1.2);
      elesketch.rotateX(t*-7);
    elesketch.translate(b14goal);
    elesketch.model(breaks[13]);
    elesketch.pop();
    //15
    elesketch.push();
    let break15 = elesketch.createVector(-377+rnd3,-26+rnd2,-60+rnd3);
    let b15goal = p5.Vector.lerp(zero, break15, t);
    // elesketch.rotateZ(t*-18);
    //elesketch.rotateY(t*1.2);
    elesketch.rotateX(t*66);
    elesketch.translate(b15goal);
    elesketch.model(breaks[14]);
    elesketch.pop();
    //16
    elesketch.push();
    let break16 = elesketch.createVector(189+rnd1,110+rnd1,-279+rnd2);
    let b16goal = p5.Vector.lerp(zero, break16, t);
    elesketch.rotateZ(t*-24);
    //elesketch.rotateY(t*1.2);
    // elesketch.rotateX(t*66);
    elesketch.translate(b16goal);
    elesketch.model(breaks[15]);
    elesketch.pop();
    //17
    elesketch.push();
    let break17 = elesketch.createVector(144+rnd3,180+rnd1,-132+rnd3);
    let b17goal = p5.Vector.lerp(zero, break17, t);
    elesketch.rotateZ(t*14);
    elesketch.rotateY(t*4);
    // elesketch.rotateX(t*66);
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
    // elesketch.rotateY(t*32);
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
  if(desktop) new p5(recraftEleSketch, document.getElementById('breaksimg'));
  else new p5(recraftEleSketch, document.getElementById('recraftingele-mobile'));

  //auto draw
  var autodrawSketch = function(autosk){

    let xScales = [0];
  let xRots = [];
  let thisScale = 0;
  let totalLength;
  let kababs;
  let mousePos;
  const bgcol= '#251818';
  const greencol = '#94EE2D';
  const whiteCol = '#F0ECF4';

  p5.disableFriendlyErrors = true;

  let autodrawcnv;
  autosk.windowResized = function(){
    autosk.resizeCanvas(autosk.windowWidth, autosk.windowHeight);
    autodrawsetup();
  }

  autosk.setup = function() {
    autodrawsetup();
    }
  function autodrawsetup(){
    if(autodrawcnv == null) {
      autodrawcnv = autosk.createCanvas(autosk.windowWidth, autosk.windowHeight, autosk.WEBGL);
      document.addEventListener('autodrawtrigger', () => {
        if(autodrawimgtf) autosk.loop();
        else autosk.noLoop();
        });
      }
      autosk.frameRate(30);
      autosk.background(autosk.color('#251818'));
      autosk.ortho(-autosk.width / 2, autosk.width / 2, autosk.height / 2, -autosk.height / 2, 6000, -6000);
        autosk.push();
        autosk.angleMode(autosk.RADIANS);
        autosk.perspective(autosk.PI / 8, autosk.width / autosk.height, 0.1, 1500);
        autosk.pop();
      mousePos = autosk.createVector(autosk.width/4*3,-autosk.height/6*5.5);
        kababs = autosk.round(2+autosk.width/40);
      for(let i = 0; i< kababs; i++){
        xRots[i] = getRnd(-1,1);
      }
        autosk.angleMode(autosk.DEGREES);
        autosk.strokeWeight(1.5);
  }

    autosk.draw = function() {
      //fit for screens
    if(autosk.width>500) autosk.translate(-autosk.width/6,-autosk.height/6,0);
    else {
      autosk.translate(0,-autosk.height/8,0);
      autosk.scale(3);

    }
    autosk.background(autosk.color(bgcol));
    autosk.rotateY(-90);
    autosk.noFill();
    autosk.stroke(autosk.color(greencol))
      if(autosk.winMouseX>0&&autosk.winMouseY>0) mousePos = autosk.createVector(autosk.winMouseX, autosk.winMouseY)
      kababs = autosk.round(autosk.map(mousePos.x,0, autosk.width, 2,autosk.width/40));
      totalLength = 0;
      for(let i = 0; i< xScales.length; i++){
        totalLength+=xScales[i];
      }
      autosk.translate(-totalLength/2,0,0);
      autosk.rotateX(autosk.map(autosk.winMouseX, 0, autosk.width,5,-5));
      autosk.rotateZ(autosk.map(autosk.winMouseY, 0, autosk.height,1,-1));
      for (let i = 0; i < kababs; i++) {
          autosk.push();
              autosk.noiseDetail(2, 0.2);
              xScales[i] = -autosk.noise ( i * 100 + autosk.winMouseX / 300, autosk.height/2, 0)*300;
              thisScale = 0;
              for (let d = i; d > 0; d--) {
                thisScale += xScales[d];
              }
              autosk.translate(thisScale - (xScales[i]/2-i) ,0,0);
              autosk.scale(i/14);
              let yScale = autosk.height/8+(msin(i*10+autosk.frameCount)*10);
              let zScale = autosk.height/8+(msin(30+i*10+autosk.frameCount)*10);
              autosk.rotateX(-i*5+autosk.frameCount/kababs-i);
              autosk.rotateZ(-i*autosk.winMouseX/1000/(kababs-i)+msin(-autosk.frameCount/95)*4);
              autosk.rotateY(i*autosk.winMouseY/1000/(kababs-i)+msin(autosk.frameCount/100)*5);
              autosk.box(xScales[i], yScale, zScale,1,1);   
          autosk.pop();
      }
  }  
  }
  if(desktop) new p5(autodrawSketch, document.getElementById('autodrawimg'));
  else new p5(autodrawSketch, document.getElementById('autodrawsketch-mobile'));

  //scan img
  var scanImgSketch = function(scnimage){

      const howmany = 12;
      let yspacing = 50;
      let minifier = 0.4;
      
      
      let rotdivivder;
      let facingRot;
      let m = true;
      
      p5.disableFriendlyErrors = true;
    
      let scncnv;
  scnimage.windowResized = function(){
    scansetup();
    // scnimage.resizeCanvas(scnimage.windowWidth, scnimage.windowHeight);
  }

      scnimage.setup = function() {
        scansetup();
      }
      
      
      function scansetup() {
        scnimage.frameRate(30);
        if (scncnv == null) {
        scncnv = scnimage.createCanvas(scnimage.windowWidth, scnimage.windowHeight, scnimage.WEBGL);
        document.addEventListener('scantrigger', () => {
          if (scanimgtf)
            scnimage.loop();
          else
            scnimage.noLoop();
        });
      }
        scnimage.angleMode(scnimage.DEGREES);
        rotdivider = 360 / howmany;
        facingRot = 90 / howmany;
        scnimage.ortho(-scnimage.width / 2, scnimage.width / 2, scnimage.height / 2, -scnimage.height / 2, 6000, -6000);
        let d = msin(270);
      }

      scnimage.draw = function() {
        if(scnimage.width>500) {
          scnimage.scale(1.3); 
          scnimage.translate(-scnimage.width/6,-scnimage.height/6,0);
        } else scnimage.translate(0,-scnimage.height/10,-1500);
        scnimage.background(scnimage.color('#251818'));
        scnimage.noFill();
        
        scnimage.strokeWeight(1.5);
        scnimage.stroke(scnimage.color('#94EE2D'));
        
        yspacing = scnimage.map(scnimage.mouseY, 0, scnimage.height, -scnimage.height/10, scnimage.height/10);
        facingRot = scnimage.map(scnimage.mouseY, 0, scnimage.height, 90, -90)/howmany;
        let xCalc = scnimage.abs(scnimage.map(scnimage.mouseX,0,scnimage.width,2,-2));
        minifier = 0.4-scnimage.abs(scnimage.map(scnimage.mouseX,0,scnimage.width,-0.1,0.1))
        scnimage.scale(minifier);
        scnimage.push();
          scnimage.fill(scnimage.color('#251818'));
          scnimage.strokeWeight(2.5);
          scnimage.sphere(50,5,5);
        scnimage.pop();
      
        scnimage.rotateY(scnimage.frameCount/5);
        scnimage.push();
        scnimage.translate(0,((1-xCalc)*yspacing*-howmany)/2, 0);
        for(let j = 0; j< howmany/2;j++){
          scnimage.rotateZ(scnimage.map(scnimage.winMouseX,0,scnimage.width,-45,45));
          
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
        scnimage.pop();
        m = false;
        }
      
    }
    if(desktop) new p5(scanImgSketch, document.getElementById('scanimg'));
    else new p5(scanImgSketch, document.getElementById('scanssketch-mobile'));
    
  //td sketch
  var tdSketch = function(touchskch)
  {

    const wormHoleloops = 15;
    const loopDist = 10;
    const loopBaseSize = 50;
    
    const bg ='#251818';
    const green = '#94EE2D';
    
    let mousePos;

  p5.disableFriendlyErrors = true;

  touchskch.windowResized = function(){
    touchskch.resizeCanvas(touchskch.windowWidth, touchskch.windowHeight);
  }

  touchskch.setup = function() {
    touchskch.frameRate(30);
    touchskch.createCanvas(touchskch.windowWidth, touchskch.windowHeight, touchskch.WEBGL);

  document.addEventListener('tdtrigger', () => {
    if(touchdimgdtf) touchskch.loop();
    else touchskch.noLoop();
  });

  touchskch.angleMode(touchskch.DEGREES);
  }
    
  touchskch.draw = function() {
    touchskch.background(touchskch.color(bg));
      
      if(touchskch.width>500) {touchskch.translate(-touchskch.width/6,touchskch.height/6,0);
      touchskch.scale(1.35,1.35,1.35);
                    }
      else {
        touchskch.scale(0.8);
        touchskch.translate(0,touchskch.height/6,0);
      }
    touchskch.stroke(touchskch.color('#94EE2D'));
    touchskch.noFill();
    //rotate around
    touchskch.rotateY(touchskch.frameCount/2);
    touchskch.rotateX(45+msin(touchskch.frameCount/2)*45);
    //calc the mosue x pos
    mousePos = touchskch.map(touchskch.winMouseX, 0, touchskch.width, 0, 720);
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
  if(desktop) new p5(tdSketch, document.getElementById('touchDimg'));
  else new p5(tdSketch, document.getElementById('touchDsketch-mobile'));

  //#endregion

  //#region sketch observer for performance
  var mainimgtf = true;
  const mainevent = new Event('maintrigger');

  var sndsketchtf = true;
  const sndevent = new Event('sndtrigger');

  var etexsketchtf = true;
  const etexevent = new Event('etextrigger');

  var iotimgtf = true;
  const iotevent = new Event('iotevent');

  var emotionimgtf = true;
  const emotionevent = new Event('emotiontrigger');

  var breaksimgtf = true;
  const breaksevent = new Event('breakstrigger');

  var autodrawimgtf = true;
  const autodrawevent = new Event('autodrawtrigger');

  var scanimgtf = true;
  const scanevent = new Event('scantrigger');

  var touchdimgdtf = true;
  const touchdevent = new Event('tdtrigger');

  var ids = ['introContainer', 'soundimg', 'eteximg', 'iotimg', 'emotionimg', 'breaksimg', 'autodrawimg', 'scanimg', 'touchDimg'];
  var idsmob = ['introContainer-mobile', 'soundimg-mobile', 'etexsketch-mobile', 'iotSketch-mobile', 'emotion-mobile', 'recraftingele-mobile', 'autodrawsketch-mobile', 'scanssketch-mobile', 'touchDsketch-mobile'];


  window.addEventListener('DOMContentLoaded', (event) => {
      console.log("dom loaded");
        if(desktop){
          ids.forEach(entry => {elementObs(entry)});
          }
        else{
          idsmob.forEach(entry => {elementObs(entry)});
          }
      });

  function elementObs(elid){
      var isElement = document.getElementById(elid);
      let options = {
          root: document.getElementById(elid),
          rootMargin: '0px',
          threshold: [0, 0.8, 1]
        };
      if(!!window.IntersectionObserver){
      let observer = new IntersectionObserver((entries, options) => {
          entries.forEach(entry => {
              if(entry.isIntersecting){
                  switch (elid) {
                      case "introContainer":
                          mainimgtf = true;
                          document.dispatchEvent(mainevent);
                          break;
                      
                      case "introContainer-mobile":
                        
                          
                            mainimgtf = true;
                            document.dispatchEvent(mainevent);
                            break;

                      case "soundimg":
                          sndsketchtf = true;
                          document.dispatchEvent(sndevent);
                          break;

                          case "soundimg-mobile":
                          sndsketchtf = true;
                          document.dispatchEvent(sndevent);
                          break;

                      case 'eteximg':
                          etexsketchtf= true;
                          document.dispatchEvent(etexevent);
                          break; 

                          case 'etexsketch-mobile':
                          etexsketchtf= true;
                          document.dispatchEvent(etexevent);
                          break; 

                      case 'iotimg':
                          iotimgtf = true;
                          document.dispatchEvent(iotevent);
                          break;

                      case 'iotSketch-mobile':
                          iotimgtf = true;
                          document.dispatchEvent(iotevent);
                          break;
                      
                      case 'emotionimg':
                          emotionimgtf = true;
                          document.dispatchEvent(emotionevent);
                          break;

                          case 'emotion-mobile':
                            emotionimgtf = true;
                            document.dispatchEvent(emotionevent);
                            break;

                      case 'breaksimg':
                          breaksimgtf = true;
                          document.dispatchEvent(breaksevent);
                          break;

                          case 'recraftingele-mobile':
                          breaksimgtf = true;
                          document.dispatchEvent(breaksevent);
                          break;

                      case 'autodrawimg':
                          autodrawimgtf = true;
                          document.dispatchEvent(autodrawevent);
                          break;

                          case 'autodrawsketch-mobile':
                            autodrawimgtf = true;
                            document.dispatchEvent(autodrawevent);
                            break;
                      case 'scanimg':
                          scanimgtf = true;
                          document.dispatchEvent(scanevent);
                          break;
                      
                          case 'scanssketch-mobile':
                          scanimgtf = true;
                          document.dispatchEvent(scanevent);
                          break;
                      case 'touchDimg':
                          touchdimgdtf = true;
                          document.dispatchEvent(touchdevent);
                          break;

                          case 'touchDsketch-mobile':
                          touchdimgdtf = true;
                          document.dispatchEvent(touchdevent);
                          break;
                  }
              }
              else{
                  switch (elid) {
                      case "introContainer":
                        
                          mainimgtf = false;
                          console.log("mainimgtf false");
                          document.dispatchEvent(mainevent);
                          break;

                      case "soundimg":
                          sndsketchtf = false;
                          console.log("sndsketchtf false");
                          document.dispatchEvent(sndevent);
                          break;

                      case 'eteximg':
                          etexsketchtf= false;
                          console.log("etexsketchtf false");
                          document.dispatchEvent(etexevent);
                          break; 

                      case 'iotimg':
                          iotimgtf = false;
                          console.log("iotimgtf false");
                          document.dispatchEvent(iotevent);
                          break;

                      case 'emotionimg':
                          emotionimgtf = true;
                          console.log("emotionimgtf false");
                          document.dispatchEvent(emotionevent);
                          break;

                      case 'breaksimg':
                          breaksimgtf = false;
                          console.log("breaksimgtf false");
                          document.dispatchEvent(breaksevent);
                          break;

                      case 'autodrawimg':
                          autodrawimgtf = false;
                          console.log("autodrawimgtf false");
                          document.dispatchEvent(autodrawevent);
                          break;

                      case 'scanimg':
                          scanimgtf = false;
                          console.log("mainimscanimgtfgtf false");
                          document.dispatchEvent(scanevent);
                          break;
                      case 'touchDimg':
                          touchdimgdtf = false;
                          console.log("touchdimgdtf false");
                          document.dispatchEvent(touchdevent);
                          break;

                          //mobile
                          case "introContainer-mobile":
                        
                            mainimgtf = false;
                            console.log("mainimgtf false");
                            document.dispatchEvent(mainevent);
                            break;
    
                        case "soundimg-mobile":
                            sndsketchtf = false;
                            console.log("sndsketchtf false");
                            document.dispatchEvent(sndevent);
                            break;
    
                        case 'etexsketch-mobile':
                            etexsketchtf= false;
                            console.log("etexsketchtf false");
                            document.dispatchEvent(etexevent);
                            break; 
    
                        case 'iotSketch-mobile':
                            iotimgtf = false;
                            console.log("iotimgtf false");
                            document.dispatchEvent(iotevent);
                            break;
    
                        case 'emotion-mobile':
                            emotionimgtf = true;
                            console.log("emotionimgtf false");
                            document.dispatchEvent(emotionevent);
                            break;
    
                        case 'recraftingele-mobile':
                            breaksimgtf = false;
                            console.log("breaksimgtf false");
                            document.dispatchEvent(breaksevent);
                            break;
    
                        case 'autodrawsketch-mobile':
                            autodrawimgtf = false;
                            console.log("autodrawimgtf false");
                            document.dispatchEvent(autodrawevent);
                            break;
    
                        case 'scanssketch-mobile':
                            scanimgtf = false;
                            console.log("mainimscanimgtfgtf false");
                            document.dispatchEvent(scanevent);
                            break;
                        case 'touchDsketch-mobile':
                            touchdimgdtf = false;
                            console.log("touchdimgdtf false");
                            document.dispatchEvent(touchdevent);
                            break;
                  }

              }
          });
      }, {});
      
      observer.observe(isElement);
      
  }}
  function getRnd(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  function msin (angle) {
    return Math.sin(angle * (Math.PI / 180));
  }
  //#endregion
