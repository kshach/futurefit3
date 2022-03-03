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
console.log('elment height is: '+introheight);
var introwidthetex = positionInfoetex.width;
console.log('elment width is: '+introwidth);

function setup() {
  margin = width/2;
  var noisingCanvas = createCanvas(introwidth, introheight, WEBGL);
  noisingCanvas.parent('eteximg');
  xjump = (width-margin*2) / theOne;
  yjump = (height-margin*2) / theOne;
  strokeWeight(1);
  stroke(color('#94EE2D'));
}

function draw() {
  scale(0.5,0.5,0.5);
  if(0<mouseX<width&&0<mouseY<height){
  translate(mouseX-width/2, mouseY-height/2,-mouseX-mouseY);
  rotateY(mouseX/100);
  rotateX(mouseY/100);
  }
  //let rotExp = sin(frameCount/1000000)
  background(color('#251818'));
  noFill();
  orbitControl();
  //scale(0.5,1,1);
  for(let hi = 0; hi< theOne; hi++){
    smooth();
    let y = -margin*2+yjump*hi/2;
    beginShape();
    for(i = 0; i < theOne; i++){
      rotateY(frameCount*i/1000000);
      rotateX(frameCount*i/1000000);
        vertex(-margin*2+xjump*i,
      y+noiseScale*noise(xjump*i,y, t),noiseScale*noise(xjump*i, y, t))
    }
    endShape();
  }
  t+=inter;
  // console.log(t/100);
}
