
var programs = [
  {cover:"./Asset1.png",progress:25,currentEpisode:{podcast:"99% INVISIBILE",episode:"",time:"",since:""}},
  {cover:"./Asset2.png",progress:75,currentEpisode:{podcast:"UX COFFEE",episode:"",time:"",since:""}},
  {cover:"./Asset3.png",progress:15,currentEpisode:{podcast:"HOW I BUILT THIS",episode:"",time:"",since:""}},
  {cover:"./Asset4.png",progress:100,currentEpisode:{podcast:"IDEO U",episode:"",time:"",since:""}},
  {cover:"./Asset5.png",progress:67,currentEpisode:{podcast:"HIGHT RESOLUTION",episode:"",time:"",since:""}},
  {cover:"./Asset6.png",progress:0,currentEpisode:{podcast:"PLANET MONEY",episode:"",time:"",since:""}},
  {cover:"./Asset7.png",progress:10,currentEpisode:{podcast:"STARTUP",episode:"",time:"",since:""}},
  {cover:"./Asset8.png",progress:55,currentEpisode:{podcast:"THE CRAZY ONE",episode:"",time:"",since:""}}
];

var track = document.querySelector(".verticle-track");

programs.forEach(function(e){
  var cube = document.createElement("div");
  cube.classList = "cube";
  cube.style.backgroundImage = "url('"+e.cover+"')";
  cube.style.backgroundSize = "cover";
  track.appendChild(cube);
});

snapToCube();

if (window.PointerEvent) {
  track.addEventListener('pointerdown',handleGestureStart, true);
  track.addEventListener('pointermove',handleGestureMove, true);
  track.addEventListener('pointerup',handleGestureEnd, true);
  track.addEventListener('pointercancel',handleGestureEnd, true);
}else{
   // Add Touch Listener
  track.addEventListener('touchstart', this.handleGestureStart, true);
  track.addEventListener('touchmove', this.handleGestureMove, true);
  track.addEventListener('touchend', this.handleGestureEnd, true);
  track.addEventListener('touchcancel', this.handleGestureEnd, true);

  // Add Mouse Listener
  track.addEventListener('mousedown', this.handleGestureStart, true);
}


var initialTouchPos = null;
var rafPending = false;
var lastDifferentInY = null;
var differenceInY = null;
var lastTouchPos = null;

function handleGestureStart(evt){
  evt.preventDefault();
  
  if(evt.touches && evt.touches.length > 1) {
    return;
  }

   if (window.PointerEvent) {

    evt.target.setPointerCapture(evt.pointerId);
  } else {
    // Add Mouse Listeners
    document.addEventListener('mousemove', this.handleGestureMove, true);
    document.addEventListener('mouseup', this.handleGestureEnd, true);
  }
  initialTouchPos = getGesturePointFromEvent(evt);

}

function handleGestureMove(evt){
   evt.preventDefault();

   if(!initialTouchPos){
    return;
   }

   lastTouchPos = getGesturePointFromEvent(evt);
   
   if(rafPending){
     return;
   } 

   rafPending = true;

   requestAnimationFrame(onAnimFrame);

   
}

function onAnimFrame() {
  if(!rafPending) {
    return;
  }

  differenceInY = initialTouchPos.y - lastTouchPos.y;


  if(lastDifferentInY)
    differenceInY = differenceInY + lastDifferentInY;


  //var newXTransform = (currentXPosition - differenceInX)+'px';
  var transformStyle = 'translateY('+(-differenceInY)+'px)';


  var swipeFrontElement = document.querySelector(".verticle-track")
  swipeFrontElement.style.webkitTransform = transformStyle;
  swipeFrontElement.style.MozTransform = transformStyle;
  swipeFrontElement.style.msTransform = transformStyle;
  swipeFrontElement.style.transform = transformStyle;

 

  rafPending = false;
}

function updateSwipeRestPosition(){
  lastDifferentInY = differenceInY;
}


function handleGestureEnd(evt){
  evt.preventDefault();
  
  if(evt.touches && evt.touches.length > 0) {
    return;
  }

  rafPending = false;

  // Remove Event Listeners
  if (window.PointerEvent) {
    evt.target.releasePointerCapture(evt.pointerId);
  } else {
    // Remove Mouse Listeners
    document.removeEventListener('mousemove', this.handleGestureMove, true);
    document.removeEventListener('mouseup', this.handleGestureEnd, true);
  }

  updateSwipeRestPosition();
  initialTouchPos = null;
  snapToCube();
}

function getGesturePointFromEvent(evt){

  var point = {};
  if(evt.targetTouches){
    point.x = evt.targetTouches[0].clientX;
    point.y = evt.targetTouches[0].clientY;
  }else{
    point.x = evt.clientX;
    point.y = evt.clientY;
  }

  return point;
}

function snapToCube(){
  var cubes = document.querySelectorAll('.cube');
  var detailSpan = document.querySelector('.current');
  var closestCubeIndex = 0;
  var diff = null;
  var transformDelta;
  cubes.forEach(function(e,i){
     if(diff === null){
     diff = Math.abs(e.getBoundingClientRect().top - (detailSpan.getBoundingClientRect().top + 10));
     transformDelta =  e.getBoundingClientRect().top - (detailSpan.getBoundingClientRect().top + 10);
     closestCubeIndex = i;
   }else{
    if(Math.abs(e.getBoundingClientRect().top - (detailSpan.getBoundingClientRect().top + 10))<diff){
      diff = Math.abs(e.getBoundingClientRect().top - (detailSpan.getBoundingClientRect().top + 10));
      transformDelta = e.getBoundingClientRect().top - (detailSpan.getBoundingClientRect().top + 10);
      closestCubeIndex = i;
    }
   }

  });

  if(!differenceInY)
    differenceInY = 0;

  var snap = track.animate([
      {transform:'translateY('+(-differenceInY)+'px)'},
      {transform:'translateY('+(-differenceInY-transformDelta)+'px)'}
    ],{duration:200,easing:"ease-out"});

  snap.onfinish = function(){
    track.style.transform = 'translateY('+(-differenceInY-transformDelta)+'px)';
    lastDifferentInY =  differenceInY+transformDelta;
  };
  
  var progress = document.querySelector('.progress');
  progress.style.width = programs[closestCubeIndex].progress+"%";

  cubes.forEach(function(e,i){
    if(i===closestCubeIndex){
      cubes[i].classList = "cube highlight";
    }else{
      cubes[i].classList = "cube";
    }

  });

  document.querySelector(".podcastName").innerHTML = programs[closestCubeIndex].currentEpisode.podcast;
    
}














