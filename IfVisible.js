var mainimgtf = false;
var sndsketchtf = false;
var etexsketchtf = false;
var iotimgtf = false;
var emotionimgtf = false;
var breaksimgtf = false;
var autodrawimgtf = false;
var scanimgtf = false;
var touchdimgdtf = false;

var mainp5;
var sndimgp5;
var etexp5;
var iotimgp5;
var etreep5;
var breaksp5;
var scanp5;
var tdp5;

window.addEventListener("DOMContentLoaded", function(){testSketches()}, false);
window.addEventListener("load", function(){testSketches();}, false);
window.addEventListener("wheel", function(){testSketches();}, false);
window.addEventListener("scroll", function(){testSketches();}, false);
window.addEventListener("resize", function(){testSketches();}, false);
window.addEventListener("onDOMContentLoaded", function(){testSketches();}, false);
window.addEventListener("onload", function(){testSketches();}, false);
window.addEventListener("onscroll", function(){testSketches();}, false);
window.addEventListener("onresize", function(){testSketches();}, false);

function testSketches() {
    mainimgtf = checkvis('#introContainer');
    sndsketchtf = checkvis('#soundimg');
   etexsketchtf = checkvis('#eteximg');
   iotimgtf = checkvis('#iotimg');
   emotionimgtf = checkvis('#emotionimg');
   breaksimgtf = checkvis('#breaksimg');
   autodrawimgtf = checkvis('#autodrawimg');
   scanimgtf = checkvis('#scanimg');
   touchdimgdtf = checkvis('#touchDimg');

    if(mainimgtf) {
        mainp5 = new p5(mainImageSketch, document.getElementById('introContainer'));
    }
    else { mainp5 = null; }
   if(sndsketchtf) {
       sndimgp5 = new p5(soundImgSketch, document.getElementById('soundimg'));
    }
   else {sndimgp5 = null;}
   if(etexsketchtf) {
       etexp5 = new p5(noisingSketch, document.getElementById('eteximg'));
   }
   else{ etexp5 = null;}
   if(iotimgtf) {
       iotimgp5 = new p5(fallingAttractorsSketch, document.getElementById('iotimg'));
    } else {iotimgp5 = null;}
   if(emotionimgtf){
        etreep5 = new p5(etreeSketch, document.getElementById('emotionimg'));
    } else etree = null;
   if(breaksimgtf) {
       breaksp5 = new p5(recraftEleSketch, document.getElementById('breaksimg'));
    } else breaksp5 = null;
   if(autodrawimgtf) {
       autodrawp5 = new p5(autodrawSketch, document.getElementById('autodrawimg'));
    } else autodrawp5 = null;
   if(scanimgtf) {
       scanp5 = new p5(scanImgSketch, document.getElementById('scanimg'));
    } else scanp5 = null;
   if(touchdimgdtf) {
       tdp5 = new p5(tdSketch, document.getElementById('touchDimg'));
    } else tdp5 = null;
}

function checkvis(elid) {
	var element = document.querySelector(elid);
    if(element == null) console.log(elid +" is null/ could not find");
	else{
        var position = element.getBoundingClientRect();
        console.log("found "+elid);
    }

	// checking for partial visibility
	if(position.top < window.innerHeight && position.bottom >= 0){
        return true;
    }
    else return false;
}

function getRnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function msin (angle) {
  return Math.sin(angle * (Math.PI / 180));
}