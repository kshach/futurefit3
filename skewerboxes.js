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

function setup() {
    var drawCanvas = createCanvas(drawwidth, drawheight, WEBGL);
    drawCanvas.parent('autodrawimg');
  background(color('#251818'));
    push();
    angleMode(RADIANS);
        perspective(PI / 8, width / height, 0.1, 1500);
    pop();
    kababs = round(2+width/40);
  console.log("num of kababs "+kababs);
  for(let i = 0; i< kababs; i++){
    xRots[i] = random(-1,1);
  }
    angleMode(DEGREES);
  }
  function draw() {
    background(color(bgcol));
    //orbitControl();
    rotateY(-90);
    noFill();
    // fill(color(bgcol));
    stroke(color(greencol))
    //rotateY(90);
    // kababs = round(2+mouseX/75);
    kababs = round(map(mouseX,0, width, 2,width/40));
    //if(frameCount%10==0) console.log("num of kababs "+kababs);
    totalLength = 0;
    for(let i = 0; i< xScales.length; i++){
      totalLength+=xScales[i];
      //console.log(totalLength);
    }
    translate(-totalLength/2 -300,0,0);
    rotateX(map(mouseX, 0, width,5,-5));
    rotateZ(map(mouseY, 0, height,1,-1));
    for (let i = 0; i < kababs; i++) {
        push();
            noiseDetail(2, 0.2);
            //stroke(100*i,0,0)
            xScales[i] = -noise(i*100+mouseX/300,height/2,0)*300;
            thisScale = 0;
            for (let d = i; d > 0; d--) {
               thisScale += xScales[d];
            }
            translate(thisScale - (xScales[i]/2-i) ,0,0);
            let weight = 1-(i/(kababs*i+1));
                //if(frameCount%120==0) console.log("weight is "+weight);
            strokeWeight(weight);
            let yScale = height/8+(sin(i*10+frameCount)*10);
            let zScale = height/8+(sin(30+i*10+frameCount)*10);
            //console.log("scale for obj "+i+": "+yScale)
            rotateX(-i*5+frameCount/kababs-i);
            box(xScales[i], yScale, zScale,1,1);   
        pop();
    }
    
}
