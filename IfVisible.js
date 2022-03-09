var mainimgtf = false;
var sndsketchtf = false;
var etexsketchtf = false;
var iotimgtf = false;
var emotionimgtf = false;
var breaksimgtf = false;
var autodrawimgtf = false;
var scanimgtf = false;
var touchdimgdtf = false;

if (window.addEventListener) {
    addEventListener('DOMContentLoaded', testSketches(), false);
    addEventListener('load', testSketches(), false);
    addEventListener('scroll', testSketches(), false);
    addEventListener('resize', testSketches(), false);
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
    attachEvent('onload', testSketches());
    attachEvent('onscroll', testSketches());
    attachEvent('onresize', testSketches());
}

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
}

function checkvis(elid) {
	var element = document.querySelector(elid);
	var position = element.getBoundingClientRect();

	// checking for partial visibility
	if(position.top < window.innerHeight && position.bottom >= 0){
        console.log("now in view: "+elid)
        return true;
    }
    else return false;
}

function getRnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}