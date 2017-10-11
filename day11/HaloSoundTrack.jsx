window.HaloSoundTrack = class HaloSoundTrack extends React.Component {

  constructor(props) {
      super(props);
      //this.state = {date: new Date()};
        
    }

  componentDidMount() {


    console.log(this.canvas.width);
    this.canvas.width = Number(this.getElementStyle(this.outterDiv,"width").slice(0,-2));
    this.canvas.height = Number(this.getElementStyle(this.outterDiv,"height").slice(0,-2));

    this.ctx = this.canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled=true;
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    window.addEventListener('resize',this.resizeCanvas.bind(this));

    //img

    console.log(this.img);
    this.img.width = 0.5*Math.min(this.canvas.width,this.canvas.height)*0.9;
    this.img.style.borderRadius = "50%";
    this.img.style.position = "absolute";
    this.img.style.zIndex = -1;
    //this.ring();
    this.dots = this.sunbust();
    this.draw();


  }


  componentWillUnmount() {
      window.removeEventListener('resize',this.resizeCanvas.bind(this));
    }

  resizeCanvas(){


    
  }



  sunbust(){
    var dots = [];
    var R = 0.5*Math.min(this.canvas.width,this.canvas.height)*0.5;
    this.R = R;
    var width = 5;
    var height = 1;
    this.ox = 0.5*this.canvas.width;
    this.oy = 0.5*this.canvas.height;

    var bustCount = 200;//Math.round(2*R*Math.PI)/height;

    for(var i=0;i<bustCount;i++){
      var bust = [];
      //var eachBustParticleCount = Math.round(30*Math.random());
      var eachBustParticleCount = Math.abs(this.randn_bm())*10;
      for(var j=0;j<eachBustParticleCount;j++){
        var dot = {};
        dot.gap = 30*Math.random();
        if(j<=Math.random()*100)
          dot.gap = 0;
        dot.x = this.ox + (R+j+dot.gap)*Math.cos(i*(2*Math.PI/bustCount));
        dot.y = this.oy + (R+j+dot.gap)*Math.sin(i*(2*Math.PI/bustCount));
        dot.hcolor = i*0.36;
        dot.R = R;
        dot.j = j;
        dot.i = i;
        dot.theta = i*(2*Math.PI/bustCount);
        dot.vr = Math.random()*2*Math.PI;

        dot.viberate = Math.random();
 
        dot.h = height;
        dot.bustCount = bustCount;
        dot.dx = 0;
        dot.dy = 0;
        dot.progress = 0;
        bust.push(dot);
      }
      dots.push(bust);
    }
//ctx.fillRect(p.x,p.y,p.w,p.h);
    
    return dots;
  }

  redrawContext(){
    if(this.ctx){
      //this.ctx.fillStyle = 'white';
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
  }

  draw(){

      this.redrawContext();
      
      var dots = this.dots;

     

      for(var i = 0; i<dots.length;i++){
        for(var j = 0; j<dots[i].length;j++){
        var dot = dots[i][j];
        //console.log();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "hsla("+200+",100%,50%,"+(Math.sin(dot.vr)+1)*0.5+")";
        //hereh
        if(Math.pow((dot.x + dot.dx - this.ox ),2)+Math.pow((dot.y+ dot.dy - this.oy ),2) >= Math.pow(dot.R,2))
          this.ctx.translate(dot.dx,dot.dy);
       

        this.ctx.arc(dot.x, dot.y, dot.h, 0, 2 * Math.PI, true);
        
      
        this.ctx.fill();
        this.ctx.restore();
        

        
        
         //dot.vvr += 0.01

         dot.vr += dot.viberate*0.5;//(Math.sin(dot.theta)+Math.cos(dot.theta))*0.1;
         if(dot.vr >= 2*Math.PI){
          dot.vr = 0;
         }


        dot.dx += dot.R*Math.cos(dot.theta)*Math.sin(dot.vr)*0.02;
        dot.dy += dot.R*Math.sin(dot.theta)*Math.sin(dot.vr)*0.02;
    


        }

      }
        dots[0][0].progress +=0.01;
        if(dots[0][0].progress>=2*Math.PI){
          dots[0][0].progress = 0;
        }

        
        this.ctx.beginPath();
        this.ctx.arc(this.ox,this.oy,dots[0][0].R*0.9,0,2*Math.PI);
        this.ctx.lineWidth = 15;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.ox,this.oy,dots[0][0].R*0.85,0*Math.PI,dots[0][0].progress);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "hsla("+200+",100%,50%,1";
        this.ctx.stroke();

     

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
        <img src="./cover.jpg" ref={(div)=>{this.img = div;}}/>
        <canvas ref={(div)=>{this.canvas = div;}} width={this.props.width} height={this.props.height}></canvas>
      </div>
      )
  }
}