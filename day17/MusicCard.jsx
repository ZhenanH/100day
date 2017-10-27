
window.MusicCard = class MusicCard extends React.Component {
	
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
      		width:"80%",
      		height:"65%",
      		boxShadow:"0px 10px 20px rgba(0,0,0,0.4)",
      		borderRadius:"3px",
      		marginTop:"20%"
      	};

      

		return(

				<div className = "MusicCardHost" ref={self =>this.host = self}style={hostStyle} >
					<div style={{height:"55%",backgroundSize:"cover",position:"relative",overflow:"hidden"}}>
						<div className="tobecovered" style={{height:"100%",backgroundImage:"url('./jj2.jpg')",backgroundSize:"cover",width:"100%",position:"absolute",transform:"scale(1.1)",left:0,top:0}}></div>
						{this.props.glass}
					</div>
					<div style={{height:"64px",borderBottom:"1px solid rgba(0,0,0,0.15)",display:"flex",fontSize:"0.9em",fontWeight:"600",fontFamily:"Helvetica Neue"}}>
						<div style={{width:"calc( 50% - 1px)", borderRight:"1px solid rgba(0,0,0,0.1)", backgroundColor:"rgba(142, 174, 229,0.2)",display:"flex",justifyContent:"center",alignItems:"center"}}>FEED</div>
						<div style={{width:"50%",backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>LISTEN</div>
					</div>
					<div style={{height:"64px",borderBottom:"1px solid rgba(0,0,0,0.1)",backgroundColor: "rgba(142, 174, 229,0.2)",display:"flex",fontSize:"0.8em"}}>
						<div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center"}}>
							<i className="fa fa-share-alt" aria-hidden="true" style={{}}></i>
							<span style={{position:"relative",top:"1px",left:"10px"}}>2.3k</span>
						</div>
						<span style={{width:"1px",backgroundColor:"rgba(0,0,0,0.15)",height:"40%",position:"relative",top:"50%",transform:"translateY(-50%)"}}></span>	
						<div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center"}}>
							<i className="fa fa-heart-o" aria-hidden="true" style={{color:"rgb(229, 41, 160)"}}></i>
							<span style={{position:"relative",top:"1px",left:"10px"}}>230k</span>
						</div>
						<span style={{width:"1px",backgroundColor:"rgba(0,0,0,0.15)",height:"40%",position:"relative",top:"50%",transform:"translateY(-50%)"}}></span>	
						<div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center"}}>
							<i className="fa fa-user-circle-o" aria-hidden="true" style={{}}></i>
							<span style={{position:"relative",top:"1px",left:"10px"}}>15k</span>

						</div>	
					</div>
					<div style={{flex:1,backgroundColor: "rgba(23, 37, 61,0.6)"}}></div>
					<div style={{position:"absolute",top:"10px",left:"10px"}}>
					    <label className = "switch">
						  <input type="checkbox"/>

						   <span className = "slider">
						   		follow
						   </span>
						   <i className="fa fa-check" aria-hidden="true" style={{position:"absolute",top:"3px",left:"10px",pointerEvents: "none",zIndex: 1}}></i>
						
						   <style dangerouslySetInnerHTML={{__html: `
						      .switch {
								  position: relative;
								  display: inline-block;
								  width: 60px;
								  height: 18px;
								}

								/* Hide default HTML checkbox */
								.switch input {display:none;}

								/* The slider */
								.slider {
								  position: absolute;
								  cursor: pointer;
								  display:flex;
								  justify-content:flex-end;
								  padding-right:5px;
								  align-items:center;
								  font-size:0.8em;
								  top: 0;
								  left: 0;
								  right: 0;
								  bottom: 0;
								  background-color: rgba(255,255,255,0.6);
								  -webkit-transition: .4s;
								  transition: .4s;
								}

								.slider:after {
								  position: absolute;
								  content: "";
								  height: 20px;
								  width: 20px;
								  left: -2px;
								  bottom: -1px;
								  background-color: white;
								  -webkit-transition: .4s;
								  transition: 1px 2px 15px rgba(0, 0, 0 ,0.4); 
								}

								

								input:checked + .slider {
								  background-color: rgba(100, 100, 100, 0.8);
								   color:rgba(0,0,0,0);
								}

								input:focus + .slider {
								  box-shadow: 0 0 1px rgba(100, 100, 100, 0.8);
								}

								input:checked + .slider:after {
								  -webkit-transform: translateX(42px);
								  -ms-transform: translateX(42px);
								  transform: translateX(42px);
								  background-color:#999;

								}

								.switch i.fa {
									opacity:0;
									transition:all 0.1s;
									color:rgb(67, 232, 124);
									
									font-size:0.8em;
								}

								input:checked ~ i.fa {
									opacity:1;
									transition:all 0.8s;
								}


								.MusicCardHost {
								  animation: animation 1000ms linear both;

								}

								/* Generated with Bounce.js. Edit at https://goo.gl/UbTHNh */

								@keyframes animation { 
								  0% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 200, 0, 1); }
								  1.3% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 169.654, 0, 1); }
								  2.55% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 134.711, 0, 1); }
								  5.71% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 44.865, 0, 1); }
								  6.61% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 22.866, 0, 1); }
								  8.81% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -18.899, 0, 1); }
								  9.91% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -32.806, 0, 1); }
								  11.96% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -46.848, 0, 1); }
								  13.21% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -48.838, 0, 1); }
								  15.07% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -44.914, 0, 1); }
								  17.12% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -34.46, 0, 1); }
								  20.92% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -10.743, 0, 1); }
								  24.82% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 5.984, 0, 1); }
								  27.58% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10.368, 0, 1); }
								  28.63% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10.648, 0, 1); }
								  40.09% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1.234, 0, 1); }
								  43.94% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -2.322, 0, 1); }
								  50% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1.002, 0, 1); }
								  59.36% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.506, 0, 1); }
								  74.77% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.11, 0, 1); }
								  90.19% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.024, 0, 1); }
								  100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
								}





						    `}} />
						    </label>
						</div>
				</div>
				

		)
	}
	
}



