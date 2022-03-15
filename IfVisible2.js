var mainimgtf = true;
const mainevent = new Event('maintrigger');

var sndsketchtf = true;
const sndevent = new Event('sndtrigger');

var etexsketchtf = true;
const etexevent = new Event('etextrigger');

var iotimgtf = true;
const iotevent = new Event('iotevent');

var emotionimgtf = true;
const emotionevent = new Event('emotiontrigger');

var breaksimgtf = true;
const breaksevent = new Event('breakstrigger');

var autodrawimgtf = true;
const autodrawevent = new Event('autodrawtrigger');

var scanimgtf = true;
const scanevent = new Event('scantrigger');

var touchdimgdtf = true;
const touchdevent = new Event('tdtrigger');

var mainp5;
var sndimgp5;
var etexp5;
var iotimgp5;
var etreep5;
var breaksp5;
var autodrawp5;
var scanp5;
var tdp5;
var ids = ['introContainer', 'soundimg', 'eteximg', 'iotimg', 'emotionimg', 'breaksimg', 'autodrawimg', 'scanimg', 'touchDimg'];


window.addEventListener('load', (event) => {
    console.log("start loaded");
       ids.forEach(entry => {elementObs(entry)});
    });

function testSketches() {
    ids.forEach(entry => {elementObs(entry)});
}

function elementObs(elid){
    var isElement = document.getElementById(elid);
    let options = {
        root: document.getElementById(elid),
        rootMargin: '0px',
        threshold: [0, 0.8, 1]
      };
    if(!!window.IntersectionObserver){
    let observer = new IntersectionObserver((entries, options) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                console.log("got here with "+isElement);
                switch (elid) {
                    case "introContainer":
                       
                        // if (mainp5==null) mainp5 = new p5(mainImageSketch, document.getElementById('introContainer'));
                        mainimgtf = true;
                        document.dispatchEvent(mainevent);
                        break;

                    case "soundimg":
                        // if (sndimgp5==null) sndimgp5 = new p5(soundImgSketch, document.getElementById('soundimg'));
                        sndsketchtf = true;
                        document.dispatchEvent(sndevent);
                        break;

                    case 'eteximg':
                        // if (etexp5==null) etexp5 = new p5(noisingSketch, document.getElementById('eteximg'));
                        etexsketchtf= true;
                        document.dispatchEvent(etexevent);
                        break; 

                    case 'iotimg':
                        // if (iotimgp5==null) iotimgp5 = new p5(fallingAttractorsSketch, document.getElementById('iotimg'));
                        iotimgtf = true;
                        document.dispatchEvent(iotevent);
                        break;

                    case 'emotionimg':
                        // if (etreep5==null) etreep5 = new p5(etreeSketch, document.getElementById('emotionimg'));
                        emotionimgtf = true;
                        document.dispatchEvent(emotionevent);
                        break;

                    case 'breaksimg':
                        // if (breaksp5==null) breaksp5 = new p5(recraftEleSketch, document.getElementById('breaksimg'));
                        breaksimgtf = true;
                        document.dispatchEvent(breaksevent);
                        break;

                    case 'autodrawimg':
                        // if (autodrawp5==null) autodrawp5 = new p5(autodrawSketch, document.getElementById('autodrawimg'));
                        autodrawimgtf = true;
                        document.dispatchEvent(autodrawevent);
                        break;

                    case 'scanimg':
                        // if (scanp5==null) scanp5 = new p5(scanImgSketch, document.getElementById('scanimg'));
                        scanimgtf = true;
                        document.dispatchEvent(scanevent);
                        break;
                    case 'touchDimg':
                        // if (tdp5==null) tdp5 = new p5(tdSketch, document.getElementById('touchDimg'));
                        touchdimgdtf = true;
                        document.dispatchEvent(touchdevent);
                        break;
                }
            }
            else{
                switch (elid) {
                    case "introContainer":
                       
                        // if (mainp5==null) mainp5 = new p5(mainImageSketch, document.getElementById('introContainer'));
                        mainimgtf = false;
                        console.log("mainimgtf false");
                        document.dispatchEvent(mainevent);
                        break;

                    case "soundimg":
                        // if (sndimgp5==null) sndimgp5 = new p5(soundImgSketch, document.getElementById('soundimg'));
                        sndsketchtf = false;
                        console.log("sndsketchtf false");
                        document.dispatchEvent(sndevent);
                        break;

                    case 'eteximg':
                        // if (etexp5==null) etexp5 = new p5(noisingSketch, document.getElementById('eteximg'));
                        etexsketchtf= false;
                        console.log("etexsketchtf false");
                        document.dispatchEvent(etexevent);
                        break; 

                    case 'iotimg':
                        // if (iotimgp5==null) iotimgp5 = new p5(fallingAttractorsSketch, document.getElementById('iotimg'));
                        iotimgtf = false;
                        console.log("iotimgtf false");
                        document.dispatchEvent(iotevent);
                        break;

                    case 'emotionimg':
                        // if (etreep5==null) etreep5 = new p5(etreeSketch, document.getElementById('emotionimg'));
                        emotionimgtf = true;
                        console.log("emotionimgtf false");
                        document.dispatchEvent(emotionevent);
                        break;

                    case 'breaksimg':
                        // if (breaksp5==null) breaksp5 = new p5(recraftEleSketch, document.getElementById('breaksimg'));
                        breaksimgtf = false;
                        console.log("breaksimgtf false");
                        document.dispatchEvent(breaksevent);
                        break;

                    case 'autodrawimg':
                        // if (autodrawp5==null) autodrawp5 = new p5(autodrawSketch, document.getElementById('autodrawimg'));
                        autodrawimgtf = false;
                        console.log("autodrawimgtf false");
                        document.dispatchEvent(autodrawevent);
                        break;

                    case 'scanimg':
                        // if (scanp5==null) scanp5 = new p5(scanImgSketch, document.getElementById('scanimg'));
                        scanimgtf = false;
                        console.log("mainimscanimgtfgtf false");
                        document.dispatchEvent(scanevent);
                        break;
                    case 'touchDimg':
                        // if (tdp5==null) tdp5 = new p5(tdSketch, document.getElementById('touchDimg'));
                        touchdimgdtf = false;
                        console.log("touchdimgdtf false");
                        document.dispatchEvent(touchdevent);
                        break;
                }

            }
        });
    }, {});
    
    observer.observe(isElement);
    
}}
function getRnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function msin (angle) {
  return Math.sin(angle * (Math.PI / 180));
}