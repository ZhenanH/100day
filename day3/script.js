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
  
}

function redrawContext(){

  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

//draw();

function drawDot(){
  
  ctx.beginPath();
  ctx.arc(100, 100, 10, 0, 2 * Math.PI, true);
  ctx.fill();

}

function drawParticlte(x, y, radius, color, ctx){
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  ctx.fill();
} 

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function Particle(){
  
  var centerX = 0.5*canvas.width;
  var centerY = 0.5*canvas.height;

  var theta = Math.random()*2*Math.PI;
  var radius = 0.5*canvas.width*0.6 + randn_bm()*20;
  //var range = radius -0.5*canvas.width*0.5;
  this.fixedR = 0.5*canvas.width*0.5;
  this.theta = theta;
  this.x = Math.cos(theta)*radius+centerX;
  this.y = Math.sin(theta)*radius+centerY;
  this.vx = (Math.random()+0.1)*5;
  this.vy = (Math.random()+0.1)*5;
  this.radius = 2;
  this.color = "hsla("+theta/2*Math.PI+", 60%, 70%, 0.3)";
  this.ctx = ctx;
  this.grow =true;
}

var particles = [];

for(var i = 0; i<2000; i++){
    particles.push(new Particle());
  }

function generateParticles(){
  redrawContext();

  for(var i = 0;i<particles.length;i++){

    var p = particles[i];

    drawParticlte(p.x,p.y,p.radius,p.color,p.ctx);
    
    p.vx += 0.05;
    p.x += 0.1*Math.sin(p.vx);

    p.vy += 0.05;
    p.y += 0.1*Math.sin(p.vy);

    p.color = "hsla("+(Math.sin(p.vy*0.1)+1)*180+", 80%, 50%, "+(0.25*(Math.sin(p.vx*0.1)+1)+0.2)+")";
    //p.radius = (Math.sin(p.vy)+1)*2;
    // var currentR = Math.sqrt(Math.pow((p.x - 0.5*canvas.width),2)+Math.pow((p.y - 0.5*canvas.height),2));

    // //var range = currentR - 0.5*canvas.width*0.5;
    
    //  if(currentR <= p.fixedR*1.2&& p.grow && currentR!==0){
    //   //console.log(currentR);
    //   p.x = 0.1*Math.cos(p.theta)*p.vx + p.x;
    //   p.y = 0.1*Math.sin(p.theta)*p.vy + p.y;

    // }else{
    //   p.grow = false;
    //   p.x = p.x - 0.1*Math.cos(p.theta)*p.vx;
    //   p.y = p.y - 0.1*Math.sin(p.theta)*p.vy;
    //   if(currentR <= p.fixedR*0.8 && !p.grow ){
    //     p.grow = true;
    //   }
    // }
    
    //Mathsin
    //p.color = "hsla(120, 60%, 70%, 0.3)";
   //p.x += Math.cos(p.theta)*p.radius+p.vx;
   //p.y += Math.sin(p.theta)*p.radius+p.vy;

    


    
  }
  requestAnimationFrame(generateParticles);
}


//

generateParticles();

