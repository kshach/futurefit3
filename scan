const bg = '#251818';
const green = '#94EE2D';

const howmany = 12;
let yspacing = 50;
let minifier = 0.4;


let rotdivivder;
let facingRot;
let m = true;


function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  rotdivider = 360/howmany;
  facingRot = 90/howmany;
  ortho(-width / 2, width / 2, height / 2, -height / 2, 1500, -1500);
  let d = sin(270);
  console.log(d);
}

function draw() {
  background(color(bg));
  noFill();
  
  strokeWeight(1);
  stroke(color(green));
  yspacing = map(mouseY, 0, height, -50, 50);
  facingRot = map(mouseY, 0, height, 90, -90)/howmany;
  //orbitControl();
  minifier = 0.4-abs(map(mouseX,0,width,-0.1,0.1))
  scale(minifier);
  push();
    fill(color(bg));
    strokeWeight(2.5);
    sphere(50,5,5);
  pop();
  //rotateX(map(mouseY,0,height,-5,5));
  rotateY(frameCount/5);
  translate(0,-(yspacing*howmany)/2, 0);
  for(let j = 0; j< howmany/2;j++){
    //rotateX(map(mouseX,0,width,-35,35));
    rotateZ(map(mouseX,0,width,-45,45));
    
    for(let i = 0; i< howmany;i++){
    rotateY(rotdivider);
    push();
      translate(300, i*yspacing, 0);
    rotateZ(-90+facingRot*sin(map(i,0,howmany,90,270))*5);   
      rotateY(45);
      // rotateX(5*i)
      //rotateY(90);
      //rotateX(90);
      //rotateZ(90);
      
      cone(50,100,5,1, false);
    pop();
    

    }
  }
  m = false;
}
