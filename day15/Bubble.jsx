window.Bubble = class Bubble extends React.Component {

  constructor(props) {
      super(props);
      //this.state = {date: new Date()};
        
    }

  componentDidMount() {



      this.mainBall.style.width =  Number(this.getElementStyle(this.outterDiv,"width").slice(0,-2))/2 +"px";
      this.mainBall.style.height = Number(this.getElementStyle(this.outterDiv,"height").slice(0,-2))/2 + "px";
      this.mainBall.classList += "bigBall";

      this.smallBubbles = document.querySelectorAll('.smallBubbles');

      var r = 0.8*Number(this.getElementStyle(this.outterDiv,"width").slice(0,-2))/2;
      this.smallBubbles.forEach(function(s){

        var theta = Math.random()*2*Math.PI;
        var duration = (Math.random()+1)*1500;
        var flyout = s.animate([
          {transform:"translate(0,0)",opacity:1},
           {transform:"translate("+Math.cos(theta)*r+"px,"+Math.sin(theta)*r+"px)",opacity:0.5}
          ],duration);

        flyout.onfinish = function(){
          flyout.play();
        };



        });




  }


  componentWillUnmount() {
     



  }


  getElementStyle(ele,attribute){
    var style = window.getComputedStyle(ele, null)[attribute];
    return style;
  }


  render(){

    var count = 20;
    var smallBubbles = [];
    for(var i=0;i<count;i++){
      var r = 20*(Math.random()+1);
      smallBubbles.push(<div key = {i} className="smallBubbles" style={{position:"absolute", width:r+"px",height:r+"px", backgroundColor:"rgb(65, 244, 217",borderRadius:"50%"}}></div>);
    }

    return (
      <div ref={(div)=>{this.outterDiv = div;}} className = {this.props.className +" liquid"}>
        <div ref={(div)=>{this.mainBall = div;}} style={{position:"absolute", backgroundColor:"rgb(65, 244, 217",borderRadius:"50%"}}></div>
          { smallBubbles}  
      </div>
      )
  }
}