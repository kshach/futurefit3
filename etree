const golden = 1.61803399;
let goalRange;
const fr = 60;

let step = 0.25;
let interStep;
let amount = 0;
let split = 5;
let splitGoalVectors = [];
let lineCounter = 0;
let lineSplitCounter = 0;
let splitCounter = 0;
let expecLines;
let check = false;



function setup(){
  createCanvas( windowWidth, windowHeight);
//   expecLines = pow(2, split);
  background(240);
  splitGoalVectors[0] = [];
  splitGoalVectors[0][0] = createVector(0, height / 2);
  calculateSplitGoals(width/2, height/2);
  interStep= step;
  goalRange = width/height*35;
  console.log("goal range is: "+goalRange);
}

function draw() {
  //background(240);
  if(frameCount%(fr)==0)
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
          line(splitGoalVectors[splitCounter][i].x, splitGoalVectors[splitCounter][i].y, l.x,l.y);	
          ellipse(splitGoalVectors[splitCounter][i].x, splitGoalVectors[splitCounter][i].y, 10,10);	
	  }
    }
	}else if (splitCounter < split) {
    amount = 0;
	splitCounter++;
      interStep -= step/split;
	}
	// keep drawn lines after they're done
	// for(let sp = 0; sp < splitCounter; sp++){
	// for(let i = 0; i < splitGoalVectors[sp-1].length; i++){
	// for (let j = i*2; j < i*2+2; j++){
	// line(splitGoalVectors[sp][i].x, splitGoalVectors[sp][i].y, splitGoalVectors[sp+1][j].x, splitGoalVectors[sp+1][j].y);
	// }
	// }
	// }
}

function mousePressed(){
  updatePos();
  //console.log("goal split vector are: " + splitGoalVectors);
}

function updatePos()
{  
  clear();
  background(240);
  amount=0;
  lineCounter = 0;
  interStep = step;
  splitCounter = 0;
  calculateSplitGoals(mouseX, mouseY);
}

//calculating splits and points
function calculateSplitGoals(goalX, goalY){

  let yjump = (goalY-height/2)/split;
  for(let i = 0; i < split; i++){
      splitGoalVectors[i+1] = [];
        for(let j = 0; j<splitGoalVectors[i].length*2;j++){
	      splitGoalVectors[i+1][j] = createVector(
           (splitGoalVectors[i][0].x + goalX/split)+ random(-goalRange*i, goalRange*i),
          splitGoalVectors[i][i%2].y+yjump*i + random(-goalRange*i, goalRange*i)
          );
	  //ellipse(splitGoalVectors[i+1][j].x, splitGoalVectors[i+1][j].y, 10,10);	
      }
        
    
  }
}
