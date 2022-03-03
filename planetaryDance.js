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



function setup() {
  var soundCanvas = createCanvas(soundwidth, soundheight);
  soundCanvas.parent('soundimg');
  angleMode(DEGREES);
  translateByX = width /2;
  translateByY = height /2;
}



function draw() {
  background(color(bg));
  
  
  fill(color(bg));
  stroke(color(g));
  //check if reached frameNum;
  if(frameCount%frameToLine===0)
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
    line(lines[i].ex, lines[i].ey,lines[i].jx,lines[i].jy);
  }
  //earth
  push();
  translate(translateByX, translateByY);
  earthPos = createVector(0,0);
  earthPos.set(50,50).rotate(frameCount*8);
  ellipse(earthPos.x,earthPos.y, 10, 10);
  pop();
   
  //jupiter
  push();
  translate(translateByX, translateByY);
  jupPos = createVector(0,0);
  jupPos.set(abs(winMouseX -width/2), abs(winMouseX -width/2)).rotate(frameCount);
  ellipse(jupPos.x,jupPos.y, 20, 20);
  pop();
  ellipse(width/2,height/2,100,100);
}


function mousePressed() {
  overwriteLines = 0;
  lines = [];
}
