document.querySelector(".cards").addEventListener('pointerdown',handleGestureStart, true);
document.querySelector(".cards").addEventListener('pointermove',handleGestureMove, true);
document.querySelector(".cards").addEventListener('pointerup',handleGestureEnd, true);
document.querySelector(".cards").addEventListener('pointercancel',handleGestureEnd, true);


initialTouchPos = null;
rafPending = false;
lastDifferentInX = null;

function handleGestureStart(evt){
  evt.preventDefault();

  evt.target.setPointerCapture(evt.pointerId);
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

  differenceInX = initialTouchPos.x - lastTouchPos.x;
 

  if(lastDifferentInX)
    differenceInX = differenceInX + lastDifferentInX;

 
  //var newXTransform = (currentXPosition - differenceInX)+'px';
  var transformStyle = 'translateX('+(-differenceInX)+'px)';


  var swipeFrontElement = document.querySelector(".cards")
  swipeFrontElement.style.webkitTransform = transformStyle;
  swipeFrontElement.style.MozTransform = transformStyle;
  swipeFrontElement.style.msTransform = transformStyle;
  swipeFrontElement.style.transform = transformStyle;

  //console.log(swipeFrontElement.style.transform);

  rafPending = false;
}

function updateSwipeRestPosition(){
  lastDifferentInX = differenceInX;
}


function handleGestureEnd(evt){
  evt.preventDefault();

  rafPending = false;

  evt.target.releasePointerCapture(evt.pointerId);
  updateSwipeRestPosition();
  initialTouchPos = null;
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