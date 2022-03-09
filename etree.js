let goalRange;
const fr = 60;

let step = 0.25;
let interStep;
let amount = 0;
let split = 5;
let splitGoalVectors = [];
let lineSplitCounter = 0;
let splitCounter = 0;



function setup(){
  createCanvas( windowWidth, windowHeight);
  background(240);
  splitGoalVectors[0] = [];
  splitGoalVectors[0][0] = createVector(0, height / 2);
  calculateSplitGoals(width/2, height/2);
  interStep= step;
  goalRange = width/height*35;
  stroke(color('#94EE2D'));
  background(color('#251818'));
}

function draw() {
  if(frameCount%(fr)==0)
    {
      updatePos();f
    }
  // drawing and lerping
	if(amount<1&&splitCounter < split){
	amount += interStep;
      
      // if(splitCounter<splits)
      for(i = 0;  i < splitGoalVectors[splitCounter].length; i++){
        for(j = i*2;  j < i*2+2; j++){
          let l = p5.Vector.lerp(splitGoalVectors[splitCounter][i], splitGoalVectors[splitCounter+1][j], amount);
          line(splitGoalVectors[splitCounter][i].x, splitGoalVectors[splitCounter][i].y, l.x,l.y);	
          	
	  }
    }
	}else if (splitCounter < split) {
    amount = 0;
	splitCounter++;
      interStep -= step/split;
	}
}

function updatePos()
{  
  clear();
  background(color('#251818'));
  amount=0;
  interStep = step;
  splitCounter = 0;
  calculateSplitGoals(winMouseX, winMouseY);
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
}
        
    
  }
}