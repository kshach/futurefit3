//broken objs
let breaks = [];
//let breakGoals = [(-50+rnd1,-20+rnd2,400+rnd1),(-63+rnd1,-150+rnd3,300+rnd1),(150+rnd2,100+rnd1,340+rnd3)];
//whole obj
let unbroken;

let rnd1;
let rnd2;
let rnd3;

let breaks = document.getElementById('breaksimg');
var positionInfobreaks = breaks.getBoundingClientRect();
var breaksheight = positionInfobreaks.height;
console.log('elment height is: '+breaksheight);
var breakswidth = positionInfobreaks.width;
console.log('elment width is: '+breakswidth);

function preload() {
  for(let i = 0; i < 20; i++){
    breaks[i] = loadModel('https://cdn.rawgit.com/kshach/futurefit3/main/objs/break'+(i+1)+'.obj');
  }
  //unbroken
  unbroken = loadModel('https://cdn.rawgit.com/kshach/futurefit3/main/objs/unbroken.obj');
}


function setup() {
  var myCanvas = createCanvas(breakswidth, breaksheight, WEBGL);
  myCanvas.parent('breaksimg');
  angleMode(DEGREES);
  rnd1 = random(-5,5);
  rnd2 = random(-5,5);
  rnd3 = random(-5,5);
  stroke(color('#94EE2D'));
  strokeWeight(1.5);
  fill(color('#251818'));
}

function draw() {
  background(color('#251818'));
  rotateY(-frameCount/2);
  //rotateY(180);
  // for(let i = 0; i<breaks.length; i++){
  //   push();
  //   fill(255/breaks.length*i)
  //     model(breaks[i]);
  //   pop();
  // }
  if(mouseX<=100) model(unbroken);
  else if(mouseX>100) brokenUpdate();
  
}

function brokenUpdate(){
  t = map(mouseX,100,width,0,1);
  let zero = createVector(0,0,0);
  if(frameCount%4==0){
  rnd1 = random(-5,5);
  rnd2 = random(-5,5);
  rnd3 = random(-5,5);
   translate(t*rnd1,t*rnd2,t*rnd3);
  }
    // for(let i = 0; i < breaks.length; i++){
    // push();
    //   let goal = p5.Vector.lerp(zero, breakGoals[i], t);
    //   translate(goal);
    //   model(breaks[i]);
    // pop();
// }
  //1
  push();
   let break1 = createVector(-50,-20,400)
   let b1goal = p5.Vector.lerp(zero, break1, t);
   rotateX(t*15);
   translate(b1goal);
    model(breaks[0]);
  pop();
  //2
  push();
   let break2 = createVector(-63+rnd1,-150+rnd3,300+rnd1);
   let b2goal = p5.Vector.lerp(zero, break2, t);
   rotateY(t*-5);
   rotateZ(t*-45);
   translate(b2goal);
   model(breaks[1]);
  pop();
  //3
  push();
   let break3 = createVector(150+rnd2,100+rnd1,340+rnd3);
   let b3goal = p5.Vector.lerp(zero, break3, t);
   rotateY(t*-1.2);
   rotateZ(t*-10);
   translate(b3goal);
   model(breaks[2]);
  pop();
  //4
  push();
   let break4 = createVector(-360+rnd2,0+rnd1,0+rnd1);
   let b4goal = p5.Vector.lerp(zero, break4, t);
   rotateY(t*-1.2);
   rotateX(t*-100);
   translate(b4goal);
   model(breaks[3]);
  pop();
  //5
  push();
   let break5 = createVector(-10+rnd3,300+rnd2,0+rnd1);
   let b5goal = p5.Vector.lerp(zero, break5, t);
   rotateY(t*-100);
   rotateX(t*-1.4);
   translate(b5goal);
   model(breaks[4]);
  pop();
  //6
  push();
   let break6 = createVector(-3+rnd1,-70+rnd2,300+rnd3);
   let b6goal = p5.Vector.lerp(zero, break6, t);
   rotateZ(t*45);
   rotateX(t*-1.4);
   rotateY(t*1.3);
   translate(b6goal);
   model(breaks[5]);
  pop();
  //7
  push();
   let break7 = createVector(-3+rnd2,-53+rnd1,-300+rnd2);
   let b7goal = p5.Vector.lerp(zero, break7, t);
   rotateZ(t*-50);
   //rotateX(t*1.2);
   rotateY(t*14);
   translate(b7goal);
   model(breaks[6]);
  pop();
  //8
  push();
   let break8 = createVector(-400+rnd1,-78+rnd3,-100+rnd2);
   let b8goal = p5.Vector.lerp(zero, break8, t);
   rotateX(t*-50);
   //rotateX(t*1.2);
   rotateY(t*14);
   translate(b8goal);
   model(breaks[7]);
  pop();
  //9
  push();
   let break9 = createVector(-60+rnd2,33+rnd1,400+rnd3);
   let b9goal = p5.Vector.lerp(zero, break9, t);
   rotateZ(t*22);
   //rotateX(t*1.2);
   rotateY(t*-2);
   translate(b9goal);
   model(breaks[8]);
  pop();
  //10
  push();
   let break10 = createVector(300+rnd3,300+rnd3,13+rnd3);
   let b10goal = p5.Vector.lerp(zero, break10, t);
   rotateX(t*-30);
   //rotateX(t*1.2);
   rotateZ(t*-1.2);
   translate(b10goal);
   model(breaks[9]);
  pop();
  //11
  push();
   let break11 = createVector(-2+rnd1,-350+rnd3,-14+rnd2);
   let b11goal = p5.Vector.lerp(zero, break11, t);
   rotateY(t*-144);
   //rotateX(t*1.2);
   rotateX(t*-1.2);
   translate(b11goal);
   model(breaks[10]);
  pop();
  //12
  push();
   let break12 = createVector(350+rnd2,-100+rnd2,6+rnd2);
   let b12goal = p5.Vector.lerp(zero, break12, t);
   rotateX(t*-81);
   //rotateX(t*1.2);
     rotateZ(t*-1.2);
   translate(b12goal);
   model(breaks[11]);
  pop();
  //13
  push();
   let break13 = createVector(-247+rnd2,208+rnd2,-140+rnd1);
   let b13goal = p5.Vector.lerp(zero, break13, t);
   rotateZ(t*-18);
   //rotateX(t*1.2);
     rotateX(t*-7);
   translate(b13goal);
   model(breaks[12]);
  pop();
  //14
  push();
   let break14 = createVector(84+rnd1,-26+rnd2,361+rnd3);
   let b14goal = p5.Vector.lerp(zero, break14, t);
   rotateZ(t*-18);
   //rotateX(t*1.2);
     rotateX(t*-7);
   translate(b14goal);
   model(breaks[13]);
  pop();
  //15
  push();
   let break15 = createVector(-377+rnd3,-26+rnd2,-60+rnd3);
   let b15goal = p5.Vector.lerp(zero, break15, t);
   // rotateZ(t*-18);
   //rotateY(t*1.2);
   rotateX(t*66);
   translate(b15goal);
   model(breaks[14]);
  pop();
  //16
  push();
   let break16 = createVector(189+rnd1,110+rnd1,-279+rnd2);
   let b16goal = p5.Vector.lerp(zero, break16, t);
   rotateZ(t*-24);
   //rotateY(t*1.2);
   // rotateX(t*66);
   translate(b16goal);
   model(breaks[15]);
  pop();
  //17
  push();
   let break17 = createVector(144+rnd3,180+rnd1,-132+rnd3);
   let b17goal = p5.Vector.lerp(zero, break17, t);
   rotateZ(t*14);
   rotateY(t*4);
   // rotateX(t*66);
   translate(b17goal);
   model(breaks[16]);
  pop();
  //18
  push();
   let break18 = createVector(-21+rnd2,-224+rnd2,-166+rnd2);
   let b18goal = p5.Vector.lerp(zero, break18, t);
   rotateZ(t*-2.2);
   rotateY(t*32);
   rotateX(t*-4);
   translate(b18goal);
   model(breaks[17]);
  pop();
  //19
  push();
   let break19 = createVector(-146+rnd2,93+rnd2,-312+rnd2);
   let b19goal = p5.Vector.lerp(zero, break19, t);
   rotateZ(t*-8);
   // rotateY(t*32);
   rotateX(t*2);
   translate(b19goal);
   model(breaks[18]);
  pop();
  //20
  push();
   let break20 = createVector(146+rnd2,-212+rnd2,-112+rnd2);
   let b20goal = p5.Vector.lerp(zero, break20, t);
   rotateZ(t*2);
   rotateY(t*21);
   rotateX(t*-4);
   translate(b20goal);
   model(breaks[19]);
  pop();
  }
