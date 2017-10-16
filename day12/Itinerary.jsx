
window.Itinerary = class Itinerary extends React.Component {
	
	constructor(props) {
	    super(props);
	    //this.state = {date: new Date()};
        
	  }

  	componentDidMount() {
  		//add canvas



	  }

  	componentWillUnmount() {
	  	
	  }

	componentDidUpdate(){
		
	}



  	

	render(){

      	var hostStyle = {
      		dipsplay:"flex",
      		padding:"10% 10% 0 10%",
      		color:"rgba(0,0,0,0.3)"
      	};

      	var row

		return(

				<div style={hostStyle} >
					<div style={{display:"flex",flexDirection:"row",paddingBottom:"15px",borderBottom:"1px solid #eee"}}>
						<div style={{color:"#444",font:"500 30px/1.3 Lato, 'Helvetica Neue', Helvetica, arial, sans-serif",flex:"1"}}>
							<span style={{fontSize:"0.5em",position:"relative",top:"-10px",marginRight:"5px"}}>$</span>
							<span>{this.props.price}</span>
						</div>
						<div style={{flex:"1",alignItems:"flex-end",flexDirection:"column",display:"flex"}}><img src={"./"+this.props.air} style={{width:"36px"}}/></div>
					</div>

					<div style={{display:"flex",flexDirection:"row",padding:"10px 0 10px 0",borderBottom:"1px solid #eee"}}>
						<div style={{flex:"1"}}>LEAVE</div>
						<div style={{flex:"1"}}>
							<div style={{display:"flex",flexDirection:"row",paddingBottom:"5px"}}><span style={{flex:"1",color:"#444",fontWeight:"bolder",font:"500 16px/1.3 'Helvetica Neue'"}}>25 OCT, FRI </span><i className="fa fa-plane" style={{transform:"rotate(45deg)"}} aria-hidden="true"></i></div>
							<div>12:50 | 15:50</div>
						</div>
					</div>

					<div style={{display:"flex",flexDirection:"row",padding:"10px 0 10px 0"}}>
						<div style={{flex:"1"}}>RETURN</div>
						<div style={{flex:"1"}}>
							<div style={{display:"flex",flexDirection:"row",paddingBottom:"5px"}}><span style={{flex:"1",color:"#444",fontWeight:"bolder",font:"500 16px/1.3 'Helvetica Neue'"}}>9 NOV, FRI</span><i className="fa fa-plane" style={{transform:"rotate(225deg)"}} aria-hidden="true"></i></div>
							<div>17:50 | 16:50</div>
						</div>
					</div>
				</div>
				

		)
	}
	
}



