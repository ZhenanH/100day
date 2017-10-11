window.Halo = class Halo extends React.Component {

  constructor(props) {
      super(props);
      //this.state = {date: new Date()};
        
    }

  componentDidMount() {


    console.log(this.canvas.width);
    this.canvas.width = Number(this.getElementStyle(this.outterDiv,"width").slice(0,-2));
    this.canvas.height = Number(this.getElementStyle(this.outterDiv,"height").slice(0,-2));

    this.ctx = this.canvas.getContext("2d");
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    window.addEventListener('resize',this.resizeCanvas.bind(this));

    this.ring();

    this.draw();


  }


  componentWillUnmount() {
      window.removeEventListener('resize',this.resizeCanvas.bind(this));
    }

  resizeCanvas(){


    
  }

  ring(){
    var R = 0.5*Math.min(this.canvas.width,this.canvas.height)*0.8;
    var ox = 0.5*this.canvas.width;
    var oy = 0.5*this.canvas.height;

    var thick = 4;
    var count = 1000;//Math.round(2*R*Math.PI);

    var dots = [];
    for(var i = 0;i<count; i++){

        var x = ox + R*Math.cos(i*(2*Math.PI/count));
        var y = oy + R*Math.sin(i*(2*Math.PI/count));
        var dot = {};
        dot.x = x;
        dot.y = y;
        dot.vr = i*0.36;
        dot.hcolor = i*0.36;
        dot.thick = thick;
        dots.push(dot);
  
    }

    this.dots = dots;
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
        var dot = dots[i];
        this.ctx.beginPath();
        this.ctx.fillStyle = "hsla("+dot.hcolor+",100%,50%,0.5)";
        this.ctx.arc(dot.x, dot.y, dot.thick, 0, 2 * Math.PI, true);
        this.ctx.fill();


        //dot.vr += 0.1;
        //dot.x += 0.4*Math.cos(0.8*dot.vr/(Math.PI*2));
        //dot.y += 0.4*Math.sin(0.8*dot.vr/(Math.PI*2));
        //dot.thick = 2*(Math.cos(dot.vr)+1);
        dot.hcolor += 3;
        if(dot.hcolor>=360){
          dot.hcolor = 0;
        }


      }  
      requestAnimationFrame(this.draw.bind(this));

  }

  getElementStyle(ele,attribute){
    var style = window.getComputedStyle(ele, null)[attribute];
    return style;
  }






  render(){


    return (
      <div ref={(div)=>{this.outterDiv = div;}} className = {this.props.className}>
        <canvas ref={(div)=>{this.canvas = div;}} width={this.props.width} height={this.props.height}></canvas>
      </div>
      )
  }
}