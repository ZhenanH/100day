
window.FrostedGlass = class FrostedGlass extends React.Component {
	
	constructor(props) {
	    super(props);
	    //this.state = {date: new Date()};
        
	  }

	componentWillMount(){
		// var copyContent = this.frame.parentNode.cloneNode(true);
  //       console.log(copyContent);
	}

  	componentDidMount() {
  		//add canvas
  		

        var copyContent = this.frame.parentNode.cloneNode(true);
        copyContent.removeChild(copyContent.querySelector('.frame'));
        copyContent.style.width = Number(this.getElementStyle(this.frame.parentNode,"width").slice(0,-2))+"px";
  		copyContent.style.height = Number(this.getElementStyle(this.frame.parentNode,"height").slice(0,-2))+"px";
  		copyContent.querySelector(".tobecovered").style.filter = "blur(8px)";

  		copyContent.style.position = "absolute";
  		copyContent.style.top = this.frame.parentNode.getBoundingClientRect().top - this.frame.getBoundingClientRect().top+"px";
  		copyContent.style.left = "-"+Number(this.getElementStyle(this.frame,"left").slice(0,-2))+"px";
  		console.log(this.frame.parentNode.getBoundingClientRect().top - this.frame.getBoundingClientRect().top);
  		var innerContent = document.createElement("div");
  		innerContent.style.width = Number(this.getElementStyle(this.frame,"width").slice(0,-2))+"px";
  		innerContent.style.height = Number(this.getElementStyle(this.frame,"height").slice(0,-2))+"px";
  		innerContent.style.backgroundColor = "rgba(255,255,255,0.25)";
  		innerContent.style.position = "absolute";
  		innerContent.style.top = this.frame.getBoundingClientRect().top - this.frame.parentNode.getBoundingClientRect().top+"px";
  		innerContent.style.left = Number(this.getElementStyle(this.frame,"left").slice(0,-2))+"px";
  		innerContent.style.display = "flex";
  		innerContent.style.flexDirection = "column";
  		innerContent.style.justifyContent = "center";
  		

  		var singer  = document.createElement("div");
  		singer.style.fontSize = "2.3em";
  		singer.style.fontFamily = "Helvetica Neue";
  		singer.style.display = "flex";
  		singer.style.fontWeight = "200";
  		singer.style.width ="100%";
  		singer.style.left="10%";
  		singer.style.justifyContent = "flex-start";
  		singer.style.position = "relative";
  		singer.style.color ="#555";
  		singer.innerHTML = this.props.singer || "";
  		

  		var from  = document.createElement("div");
  		from.style.fontSize = "1em";
  		from.style.fontFamily = "Helvetica Neue";
  		from.style.fontWeight = "300";
  		from.style.display = "flex";
  		from.style.width ="100%";
  		from.style.left="10%";
  		from.style.position = "relative";
  		from.style.top = "5px";
  		from.style.justifyContent = "flex-start";
  		from.style.color ="#555";
  		from.innerHTML = this.props.from || "";


  		innerContent.appendChild(singer);
  		innerContent.appendChild(from);
  		copyContent.appendChild(innerContent);
        this.frame.appendChild(copyContent);
        
	  }

  	componentWillUnmount() {
	  	
	  }

	componentDidUpdate(){
		
	}

	getElementStyle(ele,attribute){
    var style = window.getComputedStyle(ele, null)[attribute];
    return style;
  }

  	

	render(){

      	var hostStyle = {
      		display:"flex",
      		color:"rgba(0,0,0,0.3)",
      		flexDirection:"column",
      		height:"40%",
      		width:"100%",
      		overflow:"hidden",
      		position:"absolute",
      		bottom:"0"
      	};

      	
		return(

				<div className="frame" style={hostStyle} ref = { div => this.frame = div}>
					
				</div>
				

		)
	}
	
}



