
var container = document.querySelector(".container");
var cards = document.querySelector(".cards");





if (window.PointerEvent) {
  cards.addEventListener('pointerdown',handleGestureStart, true);
  cards.addEventListener('pointermove',handleGestureMove, true);
  cards.addEventListener('pointerup',handleGestureEnd, true);
  cards.addEventListener('pointercancel',handleGestureEnd, true);
}else{
   // Add Touch Listener
  cards.addEventListener('touchstart', this.handleGestureStart, true);
  cards.addEventListener('touchmove', this.handleGestureMove, true);
  cards.addEventListener('touchend', this.handleGestureEnd, true);
  cards.addEventListener('touchcancel', this.handleGestureEnd, true);

  // Add Mouse Listener
  cards.addEventListener('mousedown', this.handleGestureStart, true);
}

initialTouchPos = null;
rafPending = false;
lastDifferentInX = null;
differenceInX = null;
lastOpacity = 1;

snapToCard();

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

   setColor();
   
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

 

  rafPending = false;
}

function updateSwipeRestPosition(){
  lastDifferentInX = differenceInX;
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
  snapToCard();
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


function snapToCard(){

  var currentTransform = Number(cards.style.transform.replace('translateX(','').replace("px)",''));
  var cardsWidth = cards.offsetWidth;
  var cardWidth = (cards.offsetWidth - 48)/4;
  var screenWidth = cards.parentNode.offsetWidth;

  var n = 0;
  var gap = (5-n)*6;

  var cardsLength = 4
  var lowBound = [];
  var highBound = [];

  for(var i = 0; i<cardsLength; i++){
    

    var left =  0;
    var right =  0;

    if(i===0){
      right = screenWidth;

    }

    if(i===cardsLength-1){
      left = screenWidth;
    }

    lowBound.push((-cardWidth*i + gap - screenWidth/2 - left));
    highBound.push(( -cardWidth*i + gap + screenWidth/2 + right));


    if(currentTransform > lowBound[i] && currentTransform <= highBound[i]){
      n = i;
    }


  }
  
  if(currentTransform > lowBound[n]  && currentTransform <= highBound[n]){
    //snap to n
    console.log("snapping to: "+n);
    var snapping = cards.animate([
      {transform:"translateX("+currentTransform+"px)"},
      {transform:"translateX("+(-cardWidth*n+gap)+"px)"}
      ],{duration:300,easing:"ease-in"});

      snapping.onfinish = function(){
        cards.style.transform = "translateX("+(-cardWidth*n + gap)+"px)";
        lastDifferentInX =  cardWidth*n - gap;
      };

     var containerLast = document.querySelector(".container_"+(n-1));
     var container = document.querySelector(".container_"+n);
     document.querySelectorAll(".progress").forEach(function(e){
            e.classList = "progress p"+n;
        });
     if(n===0){
       return;
     }
 

      var colorAnimation = containerLast.animate([
      {opacity:lastOpacity},
      {opacity:0}
      ],{duration:300,easing:"ease-out"});

       var colorAnimationNow = container.animate([
      {opacity:1-lastOpacity},
      {opacity:1}
      ],{duration:300,easing:"ease-out"});


      colorAnimation.onfinish = function(){
        containerLast.style.opacity = 0;
        
      };

       colorAnimationNow.onfinish = function(){

        container.style.opacity = 1;

        

      };


    

  }
}



  function setColor(){
    // var currentTransform = Number(cards.style.transform.replace('translateX(','').replace("px)",''));
    // console.log(currentTransform);
    //container
    var currentTransform = Number(cards.style.transform.replace('translateX(','').replace("px)",''));

  var cardsWidth = cards.offsetWidth;
  var cardWidth = (cards.offsetWidth - 48)/4;
  var screenWidth = cards.parentNode.offsetWidth;

    var n = 0;
    var cardsLength = 4
    var lowBound = [];
    var highBound = [];
    var gap = 6;
    var ruler = [];
    for(var i = 0; i<=cardsLength; i++){
      

      var left =  0;
      var right =  0;

      if(i===0){
        right = screenWidth;

      }

      if(i===cardsLength-1){
        left = screenWidth;
      }

      lowBound.push((-cardWidth*i + gap*(5-n) - screenWidth/2 - left));
      highBound.push(( -cardWidth*i + gap*(5-n) + screenWidth/2 + right));


      if(currentTransform > lowBound[i] && currentTransform <= highBound[i]){
        n = i;
      }

      ruler.push(-cardWidth*i + gap*(5-n));

    }
   
    //console.log("n: "+n+" low: "+lowBound[n]+" high: "+highBound[n]+" current: "+currentTransform);
    // console.log("------------------------------------------");

    // console.log("current: "+currentTransform);
    //  //console.log(n);
    //  console.log("cacl: "+(-cardWidth*n + gap*(5-n)));
    //  console.log("ratio: "+((currentTransform-ruler[n])/(ruler[n]-ruler[n+1])));
    //var opacityLevel = Math.abs(Math.abs(currentTransform%(cardWidth +2*gap)) - (cardWidth +2*gap));
    //var opacity = opacityLevel/(cardWidth +2*gap);

    var opacity;
    if(n<=cardsLength-1){
      opacity = ((currentTransform-ruler[n])/(ruler[n]-ruler[n+1]))>=0?((currentTransform-ruler[n])/(ruler[n]-ruler[n+1])):1+((currentTransform-ruler[n])/(ruler[n]-ruler[n+1]));
    }

    

    //make sure it not equals to 1;
    if(opacity>=0.99)
      opacity = 0.99;

    


  

   var backgroundPane0 = document.querySelector(".container_0");
   var backgroundPane1 = document.querySelector(".container_1");
   var backgroundPane2 = document.querySelector(".container_2");
   var backgroundPane3 = document.querySelector(".container_3");

    if(currentTransform>=ruler[0]){

      return;
    }

    if(currentTransform<ruler[0]&&currentTransform>=ruler[1]){

      backgroundPane0.style.opacity = opacity;
       backgroundPane1.style.opacity = 0.99;
    }
    if(currentTransform<ruler[1]&&currentTransform>=ruler[2]){

      backgroundPane0.style.opacity = 0;
      backgroundPane1.style.opacity = opacity;
       backgroundPane2.style.opacity = 0.99;
    }
    if(currentTransform<ruler[2]&&currentTransform>=ruler[3]){
     // console.log("purple");
       backgroundPane1.style.opacity = 0;
      backgroundPane2.style.opacity = opacity;
       backgroundPane3.style.opacity = 0.99;
    }

   
    lastOpacity = opacity;

    

  }











