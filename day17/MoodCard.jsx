
window.MoodCard = class MoodCard extends React.Component {
	
	constructor(props) {
	    super(props);
	    //this.state = {date: new Date()};
        
	  }

  	componentDidMount() {
  		//add canvas

  
  			// this.host.animate([
  			// 	{opacity:0, transform:"translate(0,100px)"},
  			// 	{opacity:1, transform:"translate(0,0)"}
  			// 	],200);
  			

  	


  		//setTimeout(born,100);

	  }

  	componentWillUnmount() {
	  	
	  }

	componentDidUpdate(){
		
	}



  	

	render(){

      	var hostStyle = {
      		display:"flex",
      		flexDirection:"column",
      		position:"relative",
      		color:"rgba(0,0,0,0.3)",
      		backgroundColor:"white",
      		width:"288px",
      		height:"60%",
      		boxShadow:"2px 12px 20px rgba(0,0,0,0.4)",
      		borderRadius:"3px",
      		overflow:"hidden",
      		wiilChange:"transform",
      		margin:"10px",
      		pointerEvents:"none"
      	};

      

		return(

				<div className="moodCardContainer" ref={self =>this.host = self}style={hostStyle} >
				  <div className="moodCardInner" style = {{width:"100%",height:"100%",backgroundImage:"url('./"+this.props.cover+"')",backgroundSize:"cover"}}></div>
				  <div className="moodCardContent">
				  	<div className="cardTitle"><div>{this.props.theme}</div></div>
				  	<div className="playMood"><i className="fa fa-play" aria-hidden="true"></i></div>
				  	<div className="playStat">
				  		<i className="fa fa-heart" aria-hidden="true"></i><span>Last listen: 2 days ago</span>
				  		<br/>
				  		<br/>
				  		<div style={{color:"white"}}><i className="fa fa-align-right" aria-hidden="true" style={{transform:"rotate(90deg)"}}></i><span>{this.props.listen}k listening now</span></div>
				  	</div>

				  </div>
				   <style dangerouslySetInnerHTML={{__html: `
				      	.moodCardContainer{
				      		animation:cardup 500ms ease-out;
				      		cursor:pointer;
				      	}

				      	@keyframes cardup {
				      		0% { transform:translate(0,100%);}
				      		100% { transform:translate(0,0);}
				      	}

				      	.moodCardInner{
				      		position:relative;
				      		transform:scale(1.3);
				      		
				      		transition:transform 1000ms ease-out;
				      	}

				      	.moodCardInner:after {
				      		content:"";
				      		position:absolute;
				      		top:0;
				      		left:0;
				      		width:100%;
				      		height:100%;
				      		background-color:rgba(0,0,0,0.2);

				      	}

				      	@keyframes innerscale {
				      		0% { transform:scale(1.3);}
				      		100% { transform:scale(1);}
				      	}

				      	.moodCardContent {
				      		position:absolute;
				      		top:0;
				      		left:0;
				      		right:0;
				      		bottom:0;
				      		display:flex;
				      		flex-direction:column;
				      		justify-content:center;
				      		align-items:center;
				      	}

				      	.moodCardContent .cardTitle {
				      		position:relative;
				      		color:white;
				      		font-size:1.9em;
				      		font-family:Helvetica Neue;
				      		font-weight:300;
				      		overflow:hidden;
				      		
				      	}

				      	.moodCardContent .cardTitle div {
				      		will-change:transfrom;	      		
				      		/*animation:fontup 500ms forwards;*/
				      		animation-delay:500ms;
				      		transform:translate(0,100%);
				      		transition:transform 500ms ease-out;
				      	}
				      	

				      	@keyframes fontup {
				      		0% { transform:translate(0,100%);}
				      		100% { transform:translate(0,0);}
				      	}

				      	.playMood{
				      		margin-top:40px;
				      		width:50px;
				      		height:50px;
				      		border-radius:50%;
				      		background-color:rgba(255,255,255,0.5);
				      		display:flex;
				      		justify-content:center;
				      		align-items:center;
				      		color:rgba(0,0,0,0.5);
				      		transition:opacity 500ms ease-out;
				      		opacity:0;
				      	}


				      	.playMood i{
				      		position:relative;
				      		left:2px;
				      	}

				      	.playStat{
				      		opacity:0;
				      		transition:opacity 500ms ease-out;
				      		
				      		margin-top:80px;
				      		color:rgb(242, 94, 156);
				      		font-size:0.7em;
				      	}

				      	.playStat i {
				      		margin-right:5px;
				      		position:relative;
				      		top:-2px;
				      	}


				    `}} />
						
				</div>
				

		)
	}
	
}



