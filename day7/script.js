var canvas = document.getElementById("canvas");
resize();
this.canvasWidth = canvas.offsetWidth;
this.canvasHeight = canvas.offsetHeight;

window.onresize = resize;

var ctx = canvas.getContext("2d");

function resize(){
 
  if(canvas.offsetWidth!==this.canvasWidth||canvas.offsetHeight!==this.canvasHeight){
      //upate canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      //update stored canvas size
      this.canvasWidth = canvas.offsetWidth;
      this.canvasHeight = canvas.offsetHeight;

      //redraw
    
      
      //draw();
  }
  if(ctx){
      stage();
    }
  
}

function redrawContext(){
  //console.log("redraw");
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}




// var particleWidth = 4;
// var objectWidth = 150;
// var objectHeight = 50;
// var coord = {};
// var host = document.querySelector("#button");
// coord.x = host.getBoundingClientRect().left - host.parentNode.getBoundingClientRect().left;
// coord.y = host.getBoundingClientRect().top -host.parentNode.getBoundingClientRect().top;
// console.log(coord);
// var animationId;
// var animationCount = 0;
// var particles = createRectParticles();
// var dispersed = false;

//drawOriginalRect(coord.x,coord.y,objectWidth,objectHeight);
stage();

function stage(){
  console.log("stage");
  redrawContext();
  window.particleWidth = 4;
  window.objectWidth = 150;
  window.objectHeight = 50;
  window.coord = {};
  window.host = document.querySelector("#button");
  window.coord.x = host.getBoundingClientRect().left - host.parentNode.getBoundingClientRect().left;
  window.coord.y = host.getBoundingClientRect().top -host.parentNode.getBoundingClientRect().top;
  window.animationId = undefined;
  window.animationCount = 0;
  window.particles = createRectParticles();
  this.dispersed = false;
  drawOriginalRect(coord.x,coord.y,objectWidth,objectHeight);
};


function drawOriginalRect(x,y,width,height){

  ctx.fillStyle = "black";
  ctx.fillRect(x,y,width,height);


}


function drawEach(p){
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x,p.y,p.w,p.h);
}



function RectParticles(x, y, w, h, vx, vy,color,opacity,delay){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = vx;
  this.vy =vy;
  this.color = color;
  this.opacity = opacity;
  this.delay = delay;
}



function createRectParticles(x,y){
  var rects = [];
  var num = Math.floor((objectWidth*objectHeight)/(particleWidth*particleWidth));
  var width = Math.floor(objectWidth/particleWidth);
  var height = Math.floor(objectHeight/particleWidth);

  for(var i = 0; i< width; i++){
    for(var j = 0; j< height; j++){
      var vx = Math.random()*10;//randn_bm()*5;
      var vy = Math.random()*10;
      rects.push(new RectParticles(x+i*particleWidth, y+j*particleWidth,particleWidth,particleWidth,vx,vy,"rgba(0,0,0,1)",1,0.5*Math.random()*(height-j)));
      
    }
  }

  return rects;
}

function drawRectFrames(t){
  
  redrawContext();
  
  for(var i=0;i<particles.length;i++){
     
    var p = particles[i];
    drawEach(p);

    p.delay -= 0.3;
    if(p.delay<=0)
    {
      p.color = "rgba(0,0,0,"+p.opacity+")";
      p.vx += 0.01;
      p.x += 2*Math.sin(p.vx);
      p.vy += 0.02;
      p.y -= p.vy;
      p.opacity -= 0.01*p.vy;
      p.w -=0.1;
      p.h -=0.1;

      if(p.w<=0 && !p.disappeared){
        animationCount +=1;
        p.disappeared =true;
      }
    }
    
    
  }



    animationId = requestAnimationFrame(drawRectFrames);

    if( animationCount === particles.length ){
      stopAnimation();
      
    }

  
}

function startAnimation(){
  if(!animationId){
      host.style.display = "none";
      animationId = requestAnimationFrame(drawRectFrames);
      animationCount = 0;
      particles = createRectParticles(coord.x,coord.y); 

      dispersed = true;
    }
}

function stopAnimation(){
  if(animationId){

        cancelAnimationFrame(animationId);
        animationId = undefined;
        
        dispersed = false;
        host.style.display = "flex";
        stage();
      }
}





host.addEventListener('click', function(){

  if(!dispersed){

    startAnimation();
  }
});






function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}




