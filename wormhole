const wormHoleloops = 15;
const loopDist = 10;
const loopBaseSize = 50;

const bg ='#251818';
const green = '#94EE2D';

let mousePos;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(color(bg));
  //orbitControl();
  stroke(color('#94EE2D'));
  noFill();
  //rotate around
  rotateY(frameCount/2);
  rotateX(45+sin(frameCount/2)*45);
  //calc the mosue x pos
  mousePos = map(mouseX, 0, width, 0, 720);
  //arcs going in
  for(let i = 0; i< wormHoleloops; i++){
  push();
    rotateY(360/wormHoleloops*i);
    let wid = loopBaseSize*2.2;
    let hei = loopDist*wormHoleloops*1.2;
    let place = wid / 2;
    arc(place, 0, wid, hei, 0+mousePos*-2, 15+mousePos*-2);
    arc(place, 0, wid, hei, 20+mousePos*-2, 35+mousePos*-2);
    arc(place, 0, wid, hei, 40+mousePos*-2, 55+mousePos*-2);
    arc(place, 0, wid, hei, 60+mousePos*-2, 75+mousePos*-2);
    arc(place, 0, wid, hei, 80+mousePos*-2, 95+mousePos*-2);
  pop();}
  
  //worm hole moving
  
    for(let i = 0; i< wormHoleloops; i++)
      {
        push();
        translate(0,-loopDist*wormHoleloops/2,0);
          let scaler = 0.05 +  abs(sin(map(i,0,wormHoleloops-1,90,270)))*2  * (sin(i*2+mousePos))*2;
        //console.log(scaler);
          scale(scaler, 1, scaler);
          translate(0, loopDist*i, 0);
          rotateX(90);
          ellipse(0,0, loopBaseSize,loopBaseSize);
        pop();
      }
}
