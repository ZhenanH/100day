
var container = document.querySelector('.container');
var glass = <FrostedGlass singer = {"JJ Lin"} from = {"Singapore"}/>;
ReactDOM.render(<div style={{height:"100%",width:"100%",position:"relative",display:"-webkit-flex", display:"flex",WebkitJustifyContent:"center", justifyContent:"center", backgroundColor: "rgba(23, 37, 61,0.8)"}}><MusicCard glass = {glass} /><div className="up" onClick={slideUp} style={{position:"absolute",color:"white",fontSize:"1.5em",bottom:"10%",left:"50%",transform:"translate(-50%,0)"}}><i className="fa fa-angle-double-up" aria-hidden="true"></i></div></div>,container);



function slideUp(){

	var dismiss = container.animate(
			[
				{transform:"translate(0,0)"},
				{transform:"translate(0,-100%)"}
			],500
		);
	dismiss.onfinish = function(){
		ReactDOM.unmountComponentAtNode(container);

		ReactDOM.render(<div style={{overflow:"hidden",height:"100%",width:"100%",position:"relative", display:"flex", backgroundColor: "#eaeaec",alignItems:"center"}}>
	<div className="track" style={{display:"flex",flexDirection:"row",position:"relative",left:"calc(50% - 144px)",height: "800px",top:"150px"}}>
		<MoodCard cover="adventure.jpg" theme="Adventure" listen="143"/>
		<MoodCard cover="quiet.jpg" theme="Quiet" listen="23"/>
		<MoodCard cover="roadtrip.jpg" theme="Road Trip" listen="103"/>
		<MoodCard cover="vacation.jpg" theme="Vacation" listen="43"/>
		</div>
	<div className="centerCard" style={{pointerEvents:"none",position:"absolute",width:"288px",left:"50%",transform:"translate(-50%,0)",height:"100%"}}></div>
	<div className = "header">
		<div style={{height:"64px",width:"64px",backgroundColor:"#f2f2f2",borderRadius:"2px",boxShadow:"2px 2px 5px rgba(0,0,0,0.3)",display:"flex",justifyContent:"center",alignItems:"center"}}>
			<i className="fa fa-bars" aria-hidden="true"></i>
		</div>
		<div style={{flex:1}}></div>
		<div className="account">
			<img src="./designer.png" width="30px" height="30" style={{borderRadius:"50%",margin:"10px"}}/>
			<div style={{color:"#5ec3f1"}}>@</div><span>zhenan</span>
			<div style={{backgroundColor:"rgba(0,0,0,0.2)",width:"1px",height:"20px",margin:"10px"}}></div>
			<div><i className="fa fa-chevron-right" aria-hidden="true" style={{transform:"rotate(90deg)",margin:"0 25px 0 15px",fontSize:"0.7em"}}></i></div>
		</div>
	</div>
	<div className = "footer">
		<div style={{flex:1}}></div>
		<div className="moods" style= {{color:"white",fontSize:"3em",fontFamily:"Helvetica Neue",fontWeight:"600",transform: "translate(-200px,0)"}}>Moods</div>
		<div style={{flex:1}}></div>
		<div style= {{color:"#999",fontSize:"0.8em"}}>Calibrate</div>
		<div style={{flex:1}}></div>
		<div className = "setting" style= {{transform:"translate(0,100px)",color:"#333", width:"40px",height:"40px",backgroundColor:"rgba(0,0,0,0.2)",borderRadius:"50%",fontSize:"3em",display:"flex",justifyContent:"center",alignItems:"center"}}><i className="fa fa-cog" style={{fontSize:"0.3em"}} aria-hidden="true"></i></div>
		<div style={{flex:1}}></div>
	</div>
	</div>,container);

		 track = document.querySelector('.track');

		if (window.PointerEvent) {
		  track.addEventListener('pointerdown',handleGestureStart, true);
		  track.addEventListener('pointermove',handleGestureMove, true);
		  track.addEventListener('pointerup',handleGestureEnd, true);
		  track.addEventListener('pointercancel',handleGestureEnd, true);
		}else{
		   // Add Touch Listener
		  track.addEventListener('touchstart', handleGestureStart, true);
		  track.addEventListener('touchmove', handleGestureMove, true);
		  track.addEventListener('touchend', handleGestureEnd, true);
		  track.addEventListener('touchcancel', handleGestureEnd, true);

		  // Add Mouse Listener
		  track.addEventListener('mousedown', handleGestureStart, true);
		}

		snapToCube();
	
	}
	
}
var track;
var initialTouchPos = null;
var rafPending = false;
var lastDifferentInX = null;
var differenceInX = null;
var lastTouchPos = null;




function handleGestureStart(evt){
  //console.log("start");
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
 //console.log("move");
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



  var swipeFrontElement = document.querySelector(".track");
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
  // console.log("end");
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
  snapToCube(evt);
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

function snapToCube(evt){
  if(!evt){
  	var inners = document.querySelectorAll(".moodCardInner");
  	setTimeout(function(){
  		 inners[0].classList ='moodCardInner focusCard';
  		},100);
  	 
  
  	return;
  }
  var cubes = document.querySelectorAll('.moodCardContainer');

  var detailSpan = document.querySelector('.centerCard');
  var closestCubeIndex = 0;
  var diff = null;
  var transformDelta;
  cubes.forEach(function(e,i){
     if(diff === null){
     diff = Math.abs(e.getBoundingClientRect().left - (detailSpan.getBoundingClientRect().left + 10));
     transformDelta =  e.getBoundingClientRect().left - (detailSpan.getBoundingClientRect().left + 10);
     closestCubeIndex = i;
   }else{
    if(Math.abs(e.getBoundingClientRect().left - (detailSpan.getBoundingClientRect().left + 10))<diff){
      diff = Math.abs(e.getBoundingClientRect().left - (detailSpan.getBoundingClientRect().left + 10));
      transformDelta = e.getBoundingClientRect().left - (detailSpan.getBoundingClientRect().left + 10);
      closestCubeIndex = i;
    }
   }

  });
  
  if(!differenceInX)
    differenceInX = 0;

  if(transformDelta===0){

    //handleGestureMove(evt);
    lastTouchPos = getGesturePointFromEvent(evt);
    console.log(initialTouchPos);
    console.log(lastTouchPos);
     differenceInX = initialTouchPos.x - lastTouchPos.x;


  if(lastDifferentInX)
    differenceInX = differenceInX + lastDifferentInX;

   lastDifferentInX =  differenceInX + transformDelta;
    return;
  }


  var snap = track.animate([
      {transform:'translateX('+(-differenceInX)+'px)'},
      {transform:'translateX('+(-differenceInX-transformDelta)+'px)'}
    ],{duration:300,easing:"ease-out"});

  snap.onfinish = function(){

    track.style.transform = 'translateX('+(-differenceInX-transformDelta)+'px)';
    lastDifferentInX =  differenceInX+transformDelta;

      var inners = document.querySelectorAll(".moodCardInner");
  	  inners.forEach(function(inner,i){
  	  	if(i===closestCubeIndex)
  	  		inner.classList ='moodCardInner focusCard';
  	  	else
  	  		inner.classList = 'moodCardInner';
  	  });


  };
}
