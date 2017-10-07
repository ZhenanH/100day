window.FrostedGlass = class FrostedGlass extends React.Component {

  constructor(props) {
      super(props);
      //this.state = {date: new Date()};
        
    }

  componentDidMount() {

    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.props.host.insertBefore(this.canvas,this.canvasContainer);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.props.width,this.props.height);
    this.generateScreenShot();
    window.addEventListener('resize',this.generateScreenShot.bind(this));
    this.motion = 0;

    this.startMoving();
  }

  getElementStyle(ele,attribute){
    var style = window.getComputedStyle(ele, null)[attribute];
    return style;
  }

  componentWillUnmount() {
      window.removeEventListener('resize',this.generateScreenShot.bind(this));
    }

  resizeCanvas(){


    this.canvasContainer.width = Number(this.getElementStyle(this.canvasContainer,"width").slice(0,-2));
    this.canvasContainer.height = Number(this.getElementStyle(this.canvasContainer,"height").slice(0,-2));
    this.canvasContainer.relativeX =this.canvasContainer.getBoundingClientRect().x - this.props.host.getBoundingClientRect().x;
    this.canvasContainer.relativeY =this.canvasContainer.getBoundingClientRect().y - this.props.host.getBoundingClientRect().y;


    this.canvas.width = this.props.host.offsetWidth;
    this.canvas.height = this.props.host.offsetHeight;
  }

  generateScreenShot(){
              this.resizeCanvas();

              

              var ele = this.props.host;
              this.img = new Image(); //creates a variable for a new image
              this.img.src = 'http://media.idownloadblog.com/wp-content/uploads/2016/06/macOS-Sierra-Wallpaper-Macbook-Wallpaper.jpg';

              this.drawGlass(this.img);
             
              
              

  }

  drawGlass(img){

          //clear
          this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

          var scaleWidth = 0;
          var scaleHeight = 0;

          if(img.width / img.height > this.canvas.width / this.canvas.height){
            scaleHeight = this.canvas.height;
            scaleWidth = scaleHeight * img.width / img.height;
          }else{
            scaleWidth = this.canvas.width;
            scaleHeight = scaleWidth * img.height / img.width;
           }



          var hostRect = this.props.host.getBoundingClientRect();
          this.ctx.filter = 'blur(15px)';


          img.onload = this.ctx.drawImage(img, this.canvasContainer.relativeX*img.width/scaleWidth-5 ,this.canvasContainer.relativeY*img.height/scaleHeight-5, this.canvasContainer.width*img.width/scaleWidth+5, this.canvasContainer.height*img.height/scaleHeight+5,this.canvasContainer.relativeX-5,this.canvasContainer.relativeY-5,this.canvasContainer.width+5,this.canvasContainer.height+5);// draws the image at the specified x and y location
              
  }

  startMoving(){

    //this.canvasContainer.relativeX = 

    this.drawGlass(this.img);
    this.motion += 0.01
    this.canvasContainer.relativeX = this.canvas.width/2-this.canvasContainer.width/2+100*Math.cos(this.motion);
    this.canvasContainer.relativeY=  this.canvas.height/2-this.canvasContainer.height/2+100*Math.sin(this.motion);
    this.canvasContainer.style.transform = "translate("+(this.canvasContainer.relativeX-100)+"px,"+(this.canvasContainer.relativeY-100)+"px)"
    //console.log(this.canvasContainer.relativeX);
    requestAnimationFrame(this.startMoving.bind(this));
  }

  render(){

    var canvasStyle = {
      position:"absolute",
      top:this.props.host.getBoundingClientRect().top,
      left:this.props.host.getBoundingClientRect().left,
    }

    console.log(canvasStyle);

    return (
      <div ref={(div)=>{this.canvasContainer = div;}} className = {this.props.className}>
        <span>This glass layer will blur the background in realtime, it only works in Chrome now.</span>
      </div>
      )
  }
}