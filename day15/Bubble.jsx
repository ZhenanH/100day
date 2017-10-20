window.Bubble = class Bubble extends React.Component {

  constructor(props) {
      super(props);
      //this.state = {date: new Date()};
        
    }

  componentDidMount() {



    this.canvas.width = Number(this.getElementStyle(this.outterDiv,"width").slice(0,-2));
    this.canvas.height = Number(this.getElementStyle(this.outterDiv,"height").slice(0,-2));
    this.canvas.style.filter = "url('#liquid')";
    this.ctx = this.canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled=true;

    this.bigBubble();
    this.smallBubbles = this.generateSmallBubble(200);
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

   // window.addEventListener('resize',this.resizeCanvas.bind(this));

    //img


    this.draw();


  }


  componentWillUnmount() {
      window.removeEventListener('resize',this.resizeCanvas.bind(this));
    }



  redrawContext(){
    if(this.ctx){
      //this.ctx.fillStyle = 'white';
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
  }

  bigBubble(){

    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width/2,this.canvas.height/2, 100 ,0, 2*Math.PI);
    this.R = Math.min(this.canvas.width/2,this.canvas.height/2);
    this.ctx.fillStyle = "rgb(66, 244, 179)";
    this.ctx.fill();
  }

  smallBubble(x,y,r){
    this.ctx.beginPath();
    this.ctx.arc(x,y,r,0, 2*Math.PI);
    this.ctx.fillStyle = "rgb(66, 244, 179)";
    this.ctx.fill();
  }

  generateSmallBubble(count){
    var bubbles = [];
    for(var i=0;i<count;i++){
      var bubble = {};
      bubble.x = this.canvas.width/2;
      bubble.y = this.canvas.height/2;
      bubble.theta = Math.random()*2*Math.PI;
      var v = (Math.random()-1)*2;
      bubble.vx = Math.cos(bubble.theta)*v;
      bubble.vy = Math.sin(bubble.theta)*v;
      bubble.r = Math.random()*30;
      bubbles.push(bubble);
    }

    return bubbles;
  }

  draw(){

      this.redrawContext();
      this.bigBubble();
      for(var i=0;i<this.smallBubbles.length;i++){
          var b = this.smallBubbles[i];
          this.smallBubble(b.x,b.y,b.r);

          // b.vx += 0.01;
          // b.vy += 0.01;
          b.x += b.vx*4;
          b.y += b.vy*4;

          //console.log("sides: "+Math.pow(Math.cos(b.x),2) + Math.pow(Math.sin(b.y),2));
          //console.log("r: "+ Math.abs(Math.cos(b.theta)*b.y));
          if(Math.abs(Math.cos(b.theta)*b.y) >= this.R*1.5 ) {

            b.x = this.canvas.width/2;
            b.y =  this.canvas.height/2;
          }

      }
    

      requestAnimationFrame(this.draw.bind(this));

  }



  getElementStyle(ele,attribute){
    var style = window.getComputedStyle(ele, null)[attribute];
    return style;
  }

  randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}




  render(){


    return (
      <div ref={(div)=>{this.outterDiv = div;}} className = {this.props.className}>
        <canvas ref={(div)=>{this.canvas = div;}} width={this.props.width} height={this.props.height}></canvas>
      </div>
      )
  }
}