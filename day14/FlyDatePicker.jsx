
window.FlyDatePicker = class FlyDatePicker extends React.Component {
	
	constructor(props) {
	    super(props);
	    //this.state = {date: new Date()};
        
	  }

  	componentDidMount() {
  		//add canvas
  		var animationPrice = function(){this.priceColumnDiv.classList = "";}
  		setTimeout(animationPrice.bind(this),100);
  		


	  }

  	componentWillUnmount() {
	  	
	  }

	componentDidUpdate(){
		
	}



  	

	render(){

      	var hostStyle = {
      		display:"flex",
      		color:"rgba(0,0,0,0.3)",
      		flexDirection:"column"
      	};

      	var row

      	var prices = this.props.prices;
      	var self = this;

      	var plane = <i className="fa fa-plane" style={{transform:"rotate(45deg)",color:"#333",height:"19px"}} aria-hidden="true"></i>;
    	var seletedColor = "66, 223, 244";
      	if(this.props.leave === "RETURN"){
      		plane = <i className="fa fa-plane" style={{transform:"rotate(225deg)",color:"#333",height:"19px"}} aria-hidden="true"></i>;
      		seletedColor = "244, 65, 178";
      	}
		return(

				<div style={hostStyle} >
					<div style={{display:"flex",flexDirection:"row",padding:"10%"}}>
						<div style={{flex:1,display:"flex",justifyContent:"flex-start"}}>{this.props.leave}</div>
						<div style={{flex:1,display:"flex",justifyContent:"flex-end",color:"333"}}>{this.props.month}<i className="fa fa-sort-desc" aria-hidden="true" style={{position:"relative",top:"-5px",paddingLeft:"10px"}}></i></div>
					</div>

					<div ref={(div)=>{this.priceColumnDiv = div;}} className="zeroHeight" style={{display:"flex",flexDirection:"row",height:"200px"}}>
						{
							
							prices.map((e,i)=>{
								var today = new Date();
								today.setDate(today.getDate()+i);
								var selectPrice = function(evt){
								
									
									if(!evt.target.parentNode.isClicked){

										if(self.lastClicked){
											self.lastClicked.parentNode.style.transform="scale(1)";
									 		self.lastClicked.style.background = "rgba(239, 239, 239,0.6)";
									 		self.lastClicked.querySelector('div').style.opacity = 0;
											self.lastClicked.parentNode.style.boxShadow = "initial";
											self.lastClicked.parentNode.querySelector('.weekday').style.transform = "translate(0,-33%)";
											self.lastClicked.parentNode.style.zIndex = 0;
											self.lastClicked.parentNode.style.borderRight="1px solid rgba(0,0,0,0.05)";
											self.lastClicked.parentNode.isClicked = false;
										}

								 		evt.target.parentNode.style.transform="scale(1.2)";
								 		evt.target.style.background = "rgb("+seletedColor+")";
								 		evt.target.querySelector('div').style.opacity = 1;
								 		evt.target.parentNode.style.boxShadow = "0 10px 20px rgba("+seletedColor+",0.4)";
								 		evt.target.parentNode.style.borderRight="0px solid rgba(0,0,0,0.05)";
								 		evt.target.parentNode.querySelector('.weekday').style.transform = "translate(0,0)";
								 		evt.target.parentNode.style.zIndex = 10;
								 		evt.target.parentNode.isClicked = true;
								 		self.lastClicked = evt.target;

								 		if(self.props.leave==="RETURN"){
								 			document.querySelector("#selectdateButton").style.display = "none";
								 			document.querySelector("#purchaseButton").style.transition = "all 400ms ease-out";
								 			document.querySelector("#purchaseButton").style.width="80%";
								 			document.querySelector("#purchaseButton span").style.opacity = 1;
								 		}
								 	}else{

								 		evt.target.parentNode.style.transform="scale(1)";
								 		evt.target.style.background = "rgba(239, 239, 239,0.6)";
								 		evt.target.querySelector('div').style.opacity = 0;
										evt.target.parentNode.style.boxShadow = "initial";
										evt.target.parentNode.querySelector('.weekday').style.transform = "translate(0,-33%)";
										evt.target.parentNode.style.zIndex = 0;
										evt.target.parentNode.style.borderRight="1px solid rgba(0,0,0,0.05)";
										evt.target.parentNode.isClicked = false;
										self.lastClicked = evt.target;
										if(self.props.leave==="RETURN"){
								 		    document.querySelector("#purchaseButton").style.transition = "initial";
								 			document.querySelector("#purchaseButton").style.width="0%";
								 			document.querySelector("#purchaseButton span").style.opacity = 0;
								 			document.querySelector("#selectdateButton").style.display = "flex";
								 		}
								 	}
								};
								return <div key ={i} style={{flex:1,display:"flex",flexDirection:"column",borderRight:"1px solid rgba(0,0,0,0.05)", background:"white",transition:"transform 200ms ease-out"}}>
											<div style={{flex:1,maxHeight:"38px",overflow:"hidden"}}>
												<div className="weekday" style={{display:"flex",flexDirection:"column",overflow:"hidden",transform:"translate(0,-33%)",transition:"all 200ms ease-out",transitionDelay:"400ms"}}>	
													<div style={{textAlign:"center"}}>{plane}</div>
													<div style={{textAlign:"center",color:"#333"}}>{today.getDate()}</div>
													<div style={{textAlign:"center"}}>{today.toLocaleString('en-us', {  weekday: 'short' })}</div>
												</div>
											</div>
											<div style={{flex:1}}></div>
											<div onClick={selectPrice} style={{cursor:"pointer",transition:"all 400ms ease-out",transitionDelay:i*50+"ms",minHeight:(e/1000)*100+"%",background:"rgba(239, 239, 239,0.6)",borderRight:"1px solid rgba(0,0,0,0.05)",borderTop:"1px solid rgba(0,0,0,0.05)",borderBottom:"1px solid rgba(0,0,0,0.05)",justifyContent:"center",display:"flex",alignItems:"flex-end"}}>
												<div style={{pointerEvents:"none",opacity:0,color:"white",fontSize:"0.9em",paddingBottom:"10px"}}><span>$</span>{e}</div>
											</div>
										</div>
							})
						}
					</div>

					  

				</div>
				

		)
	}
	
}



