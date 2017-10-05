
class DispersingButton extends React.Component {
	
	constructor(props) {
	    super(props);
	    //this.state = {date: new Date()};
        
	  }

  	componentDidMount() {
  		//add canvas
        this.targetEle
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "fixed";
         this.canvas.style.pointerEvents="none";
        this.targetEle.parentNode.appendChild(this.canvas);

	    this.ctx = this.canvas.getContext("2d");
		this.resize();
        window.addEventListener('resize',this.resize.bind(this));
        this.stage();


        //click event
        this.targetEle.addEventListener('click', ()=>{
		  if(!this.dispersed){
		    this.startAnimation();
		  }
		});

	  }

  	componentWillUnmount() {
	  	window.removeEventListener('resize',this.resize.bind(this));
	  }


  	resize(){
  	    

 	 	this.canvas.width = window.innerWidth;//this.props.host.offsetWidth;
      	this.canvas.height =window.innerHeight;// this.props.host.offsetHeight;
        this.canvas.style.top = 0; //this.props.host.getBoundingClientRect().top;
        this.canvas.style.left = 0; //this.props.host.getBoundingClientRect().left;

	    if(this.ctx){
	      this.stage();
	    }
		  
	  }


	redrawContext(){
	  if(this.ctx){
		  //this.ctx.fillStyle = 'white';
		  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		}
	}

	stage(){

	  this.redrawContext();
	  this.particleWidth = this.props.particleWidth||4;
	  this.targetCoord = {};
	  this.targetCoord.x = this.targetEle.getBoundingClientRect().left;// - this.targetEle.parentNode.getBoundingClientRect().left;
	  this.targetCoord.y = this.targetEle.getBoundingClientRect().top;// - this.targetEle.parentNode.getBoundingClientRect().top;
	  this.objectWidth = this.targetEle.offsetWidth;
	  this.objectHeight = this.targetEle.offsetHeight;
	  this.animationId = undefined;
	  this.animationCount = 0;
	  this.particles = this.createRectParticles();
	  this.dispersed = false;
	  //this.drawOriginalRect(this.targetCoord.x,this.targetCoord.y,this.objectWidth,this.objectHeight);

	}

	createRectParticles(){

	}

	drawOriginalRect(x,y,w,h){
		this.ctx.fillStyle = getStyle(this.targetEle,"backgroundColor");
  		this.ctx.fillRect(x,y,w,h);
	}


	drawEach(p){
	  this.ctx.fillStyle = p.color;
	  this.ctx.fillRect(p.x,p.y,p.w,p.h);
	}

	RectParticles(x, y, w, h, vx, vy,color,opacity,delay){
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

	createRectParticles(x,y){
	  var rects = [];
	  var num = Math.floor((this.objectWidth*this.objectHeight)/(this.particleWidth*this.particleWidth));
	  var width = Math.floor(this.objectWidth/this.particleWidth);
	  var height = Math.floor(this.objectHeight/this.particleWidth);

	  for(var i = 0; i< width; i++){
	    for(var j = 0; j< height; j++){
	      var vx = Math.random()*10;//randn_bm()*5;
	      var vy = Math.random()*10;
	      var color = getStyle(this.targetEle, "backgroundColor");
	      rects.push(new this.RectParticles(x+i*this.particleWidth, y+j*this.particleWidth,this.particleWidth,this.particleWidth,vx,vy,color,1,0.5*Math.random()*(height-j)));
	      
	    }
	  }

	  return rects;
	}

	drawRectFrames(t){
  
  	   	  this.redrawContext();
  
  	       //quick heck
  	       var p = this.particles[0];
  	       var oldColor = p.color.slice(p.color.indexOf("(")+1,p.color.indexOf(")")).split(",").slice(0,3).join(",");


  	      
		  for(var i=0;i<this.particles.length;i++){
		     
		    var p = this.particles[i];
		    this.drawEach(p);

		    p.delay -= 0.3;
		    if(p.delay<=0)
		    {
		      p.color = "rgba("+oldColor+","+p.opacity+")";
		      p.vx += 0.01;
		      p.x += 2*Math.sin(p.vx);
		      p.vy += 0.02;
		      p.y -= p.vy;
		      p.opacity -= 0.01*p.vy;
		      p.w -=0.1;
		      p.h -=0.1;

		      if(p.w<=0 && !p.disappeared){
		        this.animationCount +=1;
		        p.disappeared =true;
		      }
		    }  
		    
		  }

		  this.animationId = requestAnimationFrame(this.drawRectFrames.bind(this));

	      if( this.animationCount === this.particles.length ){
	      this.stopAnimation();
	     
	    }
	}

	startAnimation(){
	  if(!this.animationId){
	      this.targetEle.style.display = "none";
	      this.animationId = requestAnimationFrame(this.drawRectFrames.bind(this));
	      this.animationCount = 0;
	      this.particles = this.createRectParticles(this.targetCoord.x,this.targetCoord.y); 

	      this.dispersed = true;
	    }
	}

	stopAnimation(){
	  if(this.animationId){

	        cancelAnimationFrame(this.animationId);
	        this.animationId = undefined;
	        
	        this.dispersed = false;
	        this.targetEle.style.display = "flex";
	        this.stage();
	      }
	}

	render(){

        var style = this.props.style || {};
		var buttonStyle = style;

		buttonStyle.display = "flex";
	    buttonStyle.alignItems = "center";
	    buttonStyle.justifyContent = "center";
	    buttonStyle.cursor = "pointer";


	    buttonStyle.backgroundColor = style.backgroundColor || "black";
	    buttonStyle.color = style.color || "white";
	
		return(

				<div ref = {(target) =>{this.targetEle = target; }} style = {buttonStyle} className = "button" >{ this.props.name }</div>
				//<canvas style={{position:"fixed",pointerEvents:"none"}}ref={(canvas) => { this.canvas = canvas; }} ></canvas>

		)
	}
	
}


ReactDOM.render(
<div style={{position:"relative"}}>	
  <DispersingButton style={{backgroundColor:"black",padding:"5px",border:"1px solid black",top:"100px",width:"200px",position:"absolute"}} name = "dispose 1"/>
  <DispersingButton style={{backgroundColor:"rgb(44, 99, 183)",padding:"5px",position:"absolute",top:"200px",right:0,width:"200px"}} name = "dispose 2"/>
  <DispersingButton style={{backgroundColor:"green",padding:"5px",position:"absolute",top:"300px",left:"50%",width:"200px",transform:"translateX(-50%)"}} name = "dispose 3"/>
  </div>,
  document.querySelector('.screen')
);