
var container = document.querySelector(".container");
var cards = document.querySelector(".cards");
tempColor ="linear-gradient(rgba(98, 165, 213, 0.99), rgba(82, 104, 224, 0.99))";
snapToCard();

//set inline style for backgrounds;
document.querySelector(".container").style.background = "linear-gradient(rgba(98, 165, 213, 0.99), rgba(82, 104, 224, 0.99))";
document.querySelector(".container_1").style.background = "linear-gradient(rgba(249, 175, 83, 0.99), rgba(240, 93, 113, 0.99))";
document.querySelector(".container_2").style.background = "linear-gradient(rgba(133, 219, 178, 0.99), rgba(82, 224, 157, 0.99))";
document.querySelector(".container_3").style.background = "linear-gradient(rgba(184, 133, 219, 0.99), rgba(158, 77, 214, 0.99))";


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

console.log(tempColor);
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
  //console.log(currentTransform);
  //console.log("total: "+cardsWidth+" each:"+cardWidth);
  //console.log("n: "+ Math.ceil(cardsWidth/currentTransform));
  var gap = 6;
  var n = 0;
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
      {transform:"translateX("+(-cardWidth*n+gap*(5-n))+"px)"}
      ],{duration:300,easing:"ease-in"});

      snapping.onfinish = function(){
        cards.style.transform = "translateX("+(-cardWidth*n + gap*(5-n))+"px)";
        lastDifferentInX =  cardWidth*n - gap*(5-n);
      };

      var container = document.querySelector(".container_"+n);
      if(n===0)
        container = document.querySelector(".container");


      var setColor = "";
      if(n===0){
        setColor = "linear-gradient(rgba(98, 165, 213, 0.99), rgba(82, 104, 224, 0.99))";
      }else if(n===1){
        setColor = "linear-gradient(rgba(249, 175, 83, 0.99), rgba(240, 93, 113, 0.99))";
      }else if(n===2){
        setColor = "linear-gradient(rgba(133, 219, 178, 0.99), rgba(82, 224, 157, 0.99))";
      }else if(n===3){
        setColor = "linear-gradient(rgba(184, 133, 219, 0.99), rgba(158, 77, 214, 0.99))";
      }

      console.log(tempColor);
      var colorAnimation = container.animate([
      {background:tempColor},
      {background:setColor}
      ],{duration:300,easing:"ease-out"});



      snapping.colorAnimation = function(){
        cards.style.background = setColor;
        
      };


    

  }
}

  function setBackgroundColor(n){
    var colorTransformFrom ="linear-gradient(rgb(98, 165, 213),rgb(82, 104, 224))";
    var colorTransformTo = "linear-gradient(rgb(219, 119, 85),rgb(224, 72, 21)";
    if(n=1){
      colorTransformTo ="linear-gradient(rgb(219, 119, 85),rgb(224, 72, 21)";
    }

    return [colorTransformFrom, colorTransformTo];
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
    for(var i = 0; i<cardsLength; i++){
      

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
    //console.log("d: "+(cardWidth +2*gap));
    //console.log("current: "+currentTransform);
     //console.log(n);
     //console.log("cacl: "+(-cardWidth*n + gap*(5-n)));
    var opacityLevel = Math.abs(Math.abs(currentTransform%(cardWidth +2*gap)) - (cardWidth +2*gap));
    var opacity = opacityLevel/(cardWidth +2*gap);
    //make sure it not equals to 1;
    if(opacity>=0.99)
      opacity = 0.99;
    //console.log(opacity);
  //console.log(ruler);
    


    var backgroundPaneClass = ".container"


    if(currentTransform<ruler[0]&&currentTransform>=ruler[1]){
      backgroundPaneClass=".container";
    }
    if(currentTransform<ruler[1]&&currentTransform>=ruler[2]){
      backgroundPaneClass=".container_1";
    }
    if(currentTransform<ruler[2]&&currentTransform>=ruler[3]){
      backgroundPaneClass=".container_2";
    }



    var backgroundPane = document.querySelector(backgroundPaneClass);
    
    
    //set background in real time
    if(currentTransform>=ruler[0]){
      return;
    }
    var temp = backgroundPane.style.background.split(" ");
    temp[3]=opacity+"),";
    temp[7]=opacity+"))";
    backgroundPane.style.background = temp.join(" ");
    tempColor = backgroundPane.style.background;
    //console.log(backgroundPane);
    console.log("b"+n+": "+backgroundPane.style.background);

  }











